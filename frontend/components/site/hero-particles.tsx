"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's animated field — a direct port of Antigravity's
 * `MainParticlesComponent` (WebGL2, no dependencies).
 *
 * How it works, mirroring theirs:
 *   1. ~12k points are scattered once with Poisson-disc sampling in a 500×500
 *      box, normalised to [-1, 1] and uploaded into a 256×256 RGBA32F texture
 *      (one texel per particle).
 *   2. A ping-pong fragment shader advects them each frame with simplex noise
 *      plus a ring that chases the cursor — writing back (x, y, scale,
 *      velocity) per texel.
 *   3. The points are drawn with `gl.POINTS`; each sprite is a soft horizontal
 *      capsule rotated to face the ring, tinted by a three-stop noise colour
 *      ramp and dimmed by its own velocity.
 *
 * Camera, scale, colour ramps, ring constants and type sizes are the measured
 * Antigravity values: PerspectiveCamera(40°, z = 3.1), mesh scale 5,
 * ring 0.006 / 0.107 / displacement 0.62, particles-scale 0.59. Density (272)
 * and AMBIENT_SPEED are ours: ~2x the points, drifting ~3x slower.
 */

const SIM_SIZE = 256;
const SIM_SIZE_F = SIM_SIZE.toFixed(1);
const FOV = 40;
const CAM_Z = 3.1;
const NEAR = 0.1;
const FAR = 1000;
const MESH_SCALE = 5;
const PARTICLES_SCALE = 0.70;
const DENSITY = 272;
/** Global clock divisor — the field drifts ~3x slower than the raw sim. */
const AMBIENT_SPEED = 0.15;
/** Per-frame ring easing. Hover lags the cursor so it reads as a slow wave. */
const HOVER_EASE = 0.02;
const IDLE_EASE = 0.002;
/** Extra ink over the middle of the field, where the headline sits. */
const CENTRE_LIFT_RADIUS = 0.3;
const CENTRE_LIFT_AMOUNT = 0.3;
const RING_WIDTH = 0.06;
const RING_WIDTH2 = 0.006;
const RING_DISPLACEMENT = 0.62;
/** Antigravity multiplies the raycast hit by 0.175 to reach sim space. */
const CURSOR_GAIN = 0.175;
const MAX_PARTICLES = SIM_SIZE * SIM_SIZE;

type Palette = {
  c1: [number, number, number];
  c2: [number, number, number];
  c3: [number, number, number];
  scheme: number;
};

const hex = (v: string): [number, number, number] => [
  parseInt(v.slice(1, 3), 16) / 255,
  parseInt(v.slice(3, 5), 16) / 255,
  parseInt(v.slice(5, 7), 16) / 255
];

const LIGHT: Palette = { c1: hex("#2c64ed"), c2: hex("#f84242"), c3: hex("#ffcf03"), scheme: 1 };
const DARK: Palette = { c1: hex("#7189ff"), c2: hex("#3074f9"), c3: hex("#000000"), scheme: 0 };

const NOISE = `
  // MATHS
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  //	Simplex 3D Noise — by Ian McEwan, Ashima Arts
  float snoise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 =   v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute( permute( permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    float n_ = 1.0/7.0;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
`;

const SIM_VS = `
  attribute vec2 aPos;
  void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const SIM_FS = `
  precision highp float;
  uniform sampler2D uPosition;
  uniform sampler2D uPosRefs;
  uniform vec2 uRingPos;
  uniform float uTime;
  uniform float uRingRadius;
  uniform float uRingWidth;
  uniform float uRingWidth2;
  uniform float uRingDisplacement;
  ${NOISE}

  void main() {
    vec2 simTexCoords = gl_FragCoord.xy / vec2(${SIM_SIZE_F}, ${SIM_SIZE_F});
    vec4 pFrame = texture2D(uPosition, simTexCoords);

    float scale = pFrame.z;
    float velocity = pFrame.w;
    vec2 refPos = texture2D(uPosRefs, simTexCoords).xy;

    float time = uTime * .5;
    vec2 curentPos = refPos;

    vec2 pos = pFrame.xy;
    pos *= .8;

    float dist = distance(curentPos.xy, uRingPos);
    float ripple = 1. - smoothstep(.1, .45, dist);
    float noise0 = snoise(vec3(curentPos.xy * .2 + vec2(18.4924, 72.9744), time * 0.5));
    float dist1 = distance(curentPos.xy + (noise0 * .005), uRingPos);

    float t = smoothstep(uRingRadius - (uRingWidth * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth, dist1);
    float t2 = smoothstep(uRingRadius - (uRingWidth2 * 2.), uRingRadius, dist) - smoothstep(uRingRadius, uRingRadius + uRingWidth2, dist1);
    float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius, dist);

    t = pow(t, 2.);
    t2 = pow(t2, 3.);

    t += t2 * 3.;
    t += t3 * .4;
    t += snoise(vec3(curentPos.xy * 30. + vec2(11.4924, 12.9744), time * 0.5)) * t3 * .5;

    float nS = snoise(vec3(curentPos.xy * 2. + vec2(18.4924, 72.9744), time * 0.5));
    t += pow((nS + 1.5) * .5, 2.) * .6;
    t += (1. - smoothstep(0., ${CENTRE_LIFT_RADIUS}, length(curentPos))) * ${CENTRE_LIFT_AMOUNT};

    float noise1 = snoise(vec3(curentPos.xy * 4. + vec2(88.494, 32.4397), time * 0.35));
    float noise2 = snoise(vec3(curentPos.xy * 4. + vec2(50.904, 120.947), time * 0.35));

    float noise3 = snoise(vec3(curentPos.xy * 20. + vec2(18.4924, 72.9744), time * .5));
    float noise4 = snoise(vec3(curentPos.xy * 20. + vec2(50.904, 120.947), time * .5));

    vec2 disp = vec2(noise1, noise2) * .03;
    disp += vec2(noise3, noise4) * .005;

    disp.x += sin((refPos.x * 20.) + (time * 4.)) * .008 * ripple;
    disp.y += cos((refPos.y * 20.) + (time * 3.)) * .008 * ripple;

    pos -= (uRingPos - (curentPos + disp)) * pow(t2, .75) * uRingDisplacement;

    float scaleDiff = t - scale;
    scaleDiff *= mix(.03, .2, ripple);
    scale += scaleDiff;

    vec2 finalPos = curentPos + disp + (pos * .25);

    velocity *= .5;
    velocity += scale * .25;

    gl_FragColor = vec4(finalPos, scale, velocity);
  }
`;

const DRAW_VS = `
  precision highp float;
  attribute vec2 uv;
  uniform sampler2D uPosition;
  uniform float uParticleScale;
  uniform float uPixelRatio;
  uniform mat4 uViewProj;
  varying vec2 vLocalPos;
  varying float vScale;
  varying float vVelocity;

  void main() {
    vec4 pos = texture2D(uPosition, uv);
    vVelocity = pos.w;
    vScale = pos.z;
    vLocalPos = pos.xy;
    gl_Position = uViewProj * vec4(vec3(pos.xy, 0.), 1.0);
    gl_PointSize = ((vScale * 7.) * (uPixelRatio * 0.5) * uParticleScale);
  }
`;

const DRAW_FS = `
  precision highp float;
  varying vec2 vLocalPos;
  varying float vScale;
  varying float vVelocity;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec2 uRingPos;
  uniform float uAlpha;
  uniform float uTime;
  uniform int uColorScheme;
  ${NOISE}

  float sdRoundBox(in vec2 p, in vec2 b, in vec4 r) {
    r.xy = (p.x > 0.0) ? r.xy : r.zw;
    r.x  = (p.y > 0.0) ? r.x  : r.y;
    vec2 q = abs(p) - b + r.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
  }

  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    mat2 m = mat2(c, s, -s, c);
    return m * v;
  }

  void main() {
    float noiseAngle = snoise(vec3(vLocalPos * 10. + vec2(18.4924, 72.9744), uTime * .85));
    float noiseColor = snoise(vec3(vLocalPos * 2. + vec2(74.664, 91.556), uTime * .5));
    noiseColor = (noiseColor + 1.) * .5;

    float angle = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);

    vec2 uv = gl_PointCoord.xy;
    uv -= vec2(0.5);
    uv.y *= -1.;
    uv = rotate(uv, -angle + (noiseAngle * .5));

    float h = 0.8;
    float progress = smoothstep(0., .75, pow(noiseColor, 2.));
    vec3 col = mix(mix(uColor1, uColor2, progress / h), mix(uColor2, uColor3, (progress - h) / (1.0 - h)), step(h, progress));
    vec3 color = col;

    float rounded = sdRoundBox(uv, vec2(0.5, 0.2), vec4(.25));
    rounded = smoothstep(.1, 0., rounded);

    float a = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);
    if (a < 0.01) discard;

    color = clamp(color, 0., 1.);
    color = mix(color, color * clamp(vVelocity, 0., 1.), float(uColorScheme));

    gl_FragColor = vec4(color, clamp(a, 0., 1.));
  }
`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function link(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const v = compile(gl, gl.VERTEX_SHADER, vs);
  const f = compile(gl, gl.FRAGMENT_SHADER, fs);
  if (!v || !f) return null;
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(v);
    gl.deleteShader(f);
    return null;
  }
  gl.attachShader(program, v);
  gl.attachShader(program, f);
  gl.linkProgram(program);
  gl.deleteShader(v);
  gl.deleteShader(f);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/** Bridson Poisson-disc sampling — same (shape, min, max, tries) contract. */
function poissonDisc(shape: number, minDistance: number, maxDistance: number, tries: number) {
  const cell = minDistance / Math.SQRT2;
  const cols = Math.ceil(shape / cell);
  const grid = new Int32Array(cols * cols).fill(-1);
  const pts: number[] = [];
  const active: number[] = [];

  const cellOf = (v: number) => Math.min(cols - 1, Math.max(0, Math.floor(v / cell)));
  const fits = (x: number, y: number) => {
    const cx = cellOf(x);
    const cy = cellOf(y);
    for (let j = cy - 2; j <= cy + 2; j++) {
      if (j < 0 || j >= cols) continue;
      for (let i = cx - 2; i <= cx + 2; i++) {
        if (i < 0 || i >= cols) continue;
        const k = grid[j * cols + i];
        if (k < 0) continue;
        const dx = pts[k * 2] - x;
        const dy = pts[k * 2 + 1] - y;
        if (dx * dx + dy * dy < minDistance * minDistance) return false;
      }
    }
    return true;
  };
  const push = (x: number, y: number) => {
    const idx = pts.length / 2;
    pts.push(x, y);
    grid[cellOf(y) * cols + cellOf(x)] = idx;
    active.push(idx);
  };

  push(Math.random() * shape, Math.random() * shape);

  while (active.length > 0 && pts.length / 2 < MAX_PARTICLES) {
    const pick = Math.floor(Math.random() * active.length);
    const base = active[pick] * 2;
    const px = pts[base];
    const py = pts[base + 1];
    let placed = false;

    for (let t = 0; t < tries; t++) {
      const a = Math.random() * Math.PI * 2;
      const r = minDistance + Math.random() * (maxDistance - minDistance);
      const nx = px + Math.cos(a) * r;
      const ny = py + Math.sin(a) * r;
      if (nx < 0 || ny < 0 || nx >= shape || ny >= shape) continue;
      if (!fits(nx, ny)) continue;
      push(nx, ny);
      placed = true;
      break;
    }

    if (!placed) {
      active[pick] = active[active.length - 1];
      active.pop();
    }
  }

  return pts;
}

/** 1D value noise in [0, 1] — stands in for Antigravity's `noise.getVal`. */
function valueNoise(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  const h = (n: number) => {
    const s = Math.sin(n) * 43758.5453123;
    return s - Math.floor(s);
  };
  return h(i) * (1 - u) + h(i + 1) * u;
}

export function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance"
    });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;

    const simProgram = link(gl, SIM_VS, SIM_FS);
    const drawProgram = link(gl, DRAW_VS, DRAW_FS);
    if (!simProgram || !drawProgram) return;

    /* --- geometry ------------------------------------------------------ */
    const minDist = 10 + ((2 - 10) * DENSITY) / 300;
    const maxDist = 11 + ((3 - 11) * DENSITY) / 300;
    const raw = poissonDisc(500, minDist, maxDist, 20);
    const count = raw.length / 2;
    if (count === 0) return;

    const refs = new Float32Array(MAX_PARTICLES * 4);
    const uvData = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      refs[i * 4] = (raw[i * 2] - 250) / 250;
      refs[i * 4 + 1] = (raw[i * 2 + 1] - 250) / 250;
      uvData[i * 2] = ((i % SIM_SIZE) + 0.5) / SIM_SIZE;
      uvData[i * 2 + 1] = (Math.floor(i / SIM_SIZE) + 0.5) / SIM_SIZE;
    }

    /* --- textures + framebuffers --------------------------------------- */
    const makeTex = (data: Float32Array | null) => {
      const tex = gl.createTexture();
      if (!tex) return null;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA32F, SIM_SIZE, SIM_SIZE, 0, gl.RGBA, gl.FLOAT, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      return tex;
    };
    const makeFbo = (tex: WebGLTexture | null) => {
      const fbo = gl.createFramebuffer();
      if (!fbo || !tex) return null;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      if (!ok) {
        gl.deleteFramebuffer(fbo);
        return null;
      }
      return fbo;
    };

    const refTex = makeTex(refs);
    const texA = makeTex(null);
    const texB = makeTex(null);
    const fboA = makeFbo(texA);
    const fboB = makeFbo(texB);
    if (!refTex || !texA || !texB || !fboA || !fboB) return;

    /* --- buffers -------------------------------------------------------- */
    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const uvBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, uvData, gl.STATIC_DRAW);

    /* --- locations ------------------------------------------------------ */
    const simLoc = {
      aPos: gl.getAttribLocation(simProgram, "aPos"),
      uPosition: gl.getUniformLocation(simProgram, "uPosition"),
      uPosRefs: gl.getUniformLocation(simProgram, "uPosRefs"),
      uRingPos: gl.getUniformLocation(simProgram, "uRingPos"),
      uTime: gl.getUniformLocation(simProgram, "uTime"),
      uRingRadius: gl.getUniformLocation(simProgram, "uRingRadius"),
      uRingWidth: gl.getUniformLocation(simProgram, "uRingWidth"),
      uRingWidth2: gl.getUniformLocation(simProgram, "uRingWidth2"),
      uRingDisplacement: gl.getUniformLocation(simProgram, "uRingDisplacement")
    };
    const drawLoc = {
      uv: gl.getAttribLocation(drawProgram, "uv"),
      uPosition: gl.getUniformLocation(drawProgram, "uPosition"),
      uParticleScale: gl.getUniformLocation(drawProgram, "uParticleScale"),
      uPixelRatio: gl.getUniformLocation(drawProgram, "uPixelRatio"),
      uViewProj: gl.getUniformLocation(drawProgram, "uViewProj"),
      uColor1: gl.getUniformLocation(drawProgram, "uColor1"),
      uColor2: gl.getUniformLocation(drawProgram, "uColor2"),
      uColor3: gl.getUniformLocation(drawProgram, "uColor3"),
      uRingPos: gl.getUniformLocation(drawProgram, "uRingPos"),
      uAlpha: gl.getUniformLocation(drawProgram, "uAlpha"),
      uTime: gl.getUniformLocation(drawProgram, "uTime"),
      uColorScheme: gl.getUniformLocation(drawProgram, "uColorScheme")
    };
    if (simLoc.aPos < 0 || drawLoc.uv < 0 || !drawLoc.uViewProj || !drawLoc.uPosition) return;

    /* --- view-projection (PerspectiveCamera 40°, z 3.1, mesh scale 5) ---- */
    const fovScale = 1 / Math.tan((FOV * Math.PI) / 360);
    const projection = new Float32Array(16);
    projection[5] = fovScale;
    projection[10] = (FAR + NEAR) / (NEAR - FAR);
    projection[11] = -1;
    projection[14] = (2 * FAR * NEAR) / (NEAR - FAR);
    const modelView = new Float32Array([
      MESH_SCALE, 0, 0, 0,
      0, MESH_SCALE, 0, 0,
      0, 0, 1, 0,
      0, 0, -CAM_Z, 1
    ]);
    const viewProj = new Float32Array(16);

    const rebuildViewProj = (aspect: number) => {
      projection[0] = fovScale / aspect;
      viewProj.fill(0);
      for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
          let sum = 0;
          for (let k = 0; k < 4; k++) sum += projection[k * 4 + r] * modelView[c * 4 + k];
          viewProj[c * 4 + r] = sum;
        }
      }
    };

    /* --- runtime state --------------------------------------------------- */
    let readTex: WebGLTexture = refTex;
    let writeIsA = true;
    let everRendered = false;

    const ringPos = { x: 0, y: 0 };
    const pointer = { ndcX: 0, ndcY: 0, active: false };
    let pixelRatio = 1;
    let cssW = 1;
    let cssH = 1;
    let running = false;
    let onScreen = true;
    let frame = 0;
    let started = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const palette = (): Palette =>
      document.documentElement.classList.contains("dark") ? DARK : LIGHT;

    const radiusAt = (time: number) => 0.175 + Math.sin(time) * 0.03 + Math.cos(time * 3) * 0.02;

    const updateRing = (time: number) => {
      const t = valueNoise(time * 0.66 + 94.234) * 2 - 1;
      const n = valueNoise(time * 0.75 + 21.028) * 2 - 1;
      let cx: number;
      let cy: number;
      let ease: number;

      if (pointer.active) {
        const tanHalf = Math.tan((FOV * Math.PI) / 360);
        const aspect = cssW / cssH;
        cx = pointer.ndcX * tanHalf * aspect * CAM_Z * CURSOR_GAIN + t * 0.1;
        cy = pointer.ndcY * tanHalf * CAM_Z * CURSOR_GAIN + n * 0.1;
        ease = HOVER_EASE;
      } else {
        cx = t * 0.2;
        cy = n * 0.1;
        ease = IDLE_EASE;
      }
      ringPos.x += (cx - ringPos.x) * ease;
      ringPos.y += (cy - ringPos.y) * ease;
    };

    const simStep = (time: number, radius: number) => {
      const fbo = writeIsA ? fboA : fboB;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.viewport(0, 0, SIM_SIZE, SIM_SIZE);
      gl.disable(gl.BLEND);
      gl.useProgram(simProgram);

      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.enableVertexAttribArray(simLoc.aPos);
      gl.vertexAttribPointer(simLoc.aPos, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, readTex);
      gl.uniform1i(simLoc.uPosition, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, refTex);
      gl.uniform1i(simLoc.uPosRefs, 1);

      gl.uniform2f(simLoc.uRingPos, ringPos.x, ringPos.y);
      gl.uniform1f(simLoc.uTime, time);
      gl.uniform1f(simLoc.uRingRadius, radius);
      gl.uniform1f(simLoc.uRingWidth, RING_WIDTH);
      gl.uniform1f(simLoc.uRingWidth2, RING_WIDTH2);
      gl.uniform1f(simLoc.uRingDisplacement, RING_DISPLACEMENT);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      gl.disableVertexAttribArray(simLoc.aPos);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      readTex = writeIsA ? texA : texB;
      writeIsA = !writeIsA;
      everRendered = true;
    };

    const draw = (time: number) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      const p = palette();
      gl.useProgram(drawProgram);

      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
      gl.enableVertexAttribArray(drawLoc.uv);
      gl.vertexAttribPointer(drawLoc.uv, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, everRendered ? readTex : refTex);
      gl.uniform1i(drawLoc.uPosition, 0);

      gl.uniform1f(drawLoc.uParticleScale, (canvas.width / pixelRatio / 2000) * PARTICLES_SCALE);
      gl.uniform1f(drawLoc.uPixelRatio, pixelRatio);
      gl.uniformMatrix4fv(drawLoc.uViewProj, false, viewProj);
      gl.uniform3f(drawLoc.uColor1, p.c1[0], p.c1[1], p.c1[2]);
      gl.uniform3f(drawLoc.uColor2, p.c2[0], p.c2[1], p.c2[2]);
      gl.uniform3f(drawLoc.uColor3, p.c3[0], p.c3[1], p.c3[2]);
      gl.uniform2f(drawLoc.uRingPos, ringPos.x, ringPos.y);
      gl.uniform1f(drawLoc.uAlpha, 1);
      gl.uniform1f(drawLoc.uTime, time);
      gl.uniform1i(drawLoc.uColorScheme, p.scheme);

      gl.drawArrays(gl.POINTS, 0, count);
      gl.disableVertexAttribArray(drawLoc.uv);
    };

    /** Reduced motion: advance the simulation once, then paint a still frame. */
    const settle = () => {
      for (let i = 0; i < 180; i++) {
        const time = (i / 60) * AMBIENT_SPEED;
        updateRing(time);
        simStep(time, radiusAt(time));
      }
      draw(0);
    };

    const tick = () => {
      if (!running) return;
      const time = ((performance.now() - started) / 1000) * AMBIENT_SPEED;
      updateRing(time);
      const radius = radiusAt(time);
      simStep(time, radius);
      draw(time);
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reducedMotion.matches) return;
      running = true;
      started = performance.now();
      frame = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };
    const syncRun = () => {
      if (onScreen && !document.hidden && !reducedMotion.matches) start();
      else stop();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      cssW = Math.max(1, rect.width);
      cssH = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * pixelRatio);
      canvas.height = Math.round(cssH * pixelRatio);
      rebuildViewProj(cssW / cssH);
      if (reducedMotion.matches) settle();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.ndcY = 1 - ((event.clientY - rect.top) / rect.height) * 2;
      pointer.active = true;
      if (reducedMotion.matches) draw(0);
    };
    const onPointerLeave = () => {
      pointer.active = false;
      if (reducedMotion.matches) draw(0);
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      syncRun();
    });
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    host.addEventListener("pointermove", onPointerMove);
    host.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", syncRun);
    reducedMotion.addEventListener("change", syncRun);

    resize();
    if (!reducedMotion.matches) {
      // Warm the field so it is not blank on the very first frames.
      for (let i = 0; i < 60; i++) {
        const time = i / 60;
        updateRing(time);
        simStep(time, radiusAt(time));
      }
      draw(0);
    }
    syncRun();

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", syncRun);
      reducedMotion.removeEventListener("change", syncRun);
      gl.deleteTexture(refTex);
      gl.deleteTexture(texA);
      gl.deleteTexture(texB);
      gl.deleteFramebuffer(fboA);
      gl.deleteFramebuffer(fboB);
      gl.deleteBuffer(quad);
      gl.deleteBuffer(uvBuf);
      gl.deleteProgram(simProgram);
      gl.deleteProgram(drawProgram);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
