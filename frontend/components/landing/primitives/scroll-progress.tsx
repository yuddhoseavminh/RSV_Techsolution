"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });
  return <motion.div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-gradient-to-r from-navy-400 via-brand-cyan to-violet-500" style={{ scaleX }} />;
}
