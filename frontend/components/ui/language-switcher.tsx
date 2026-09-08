"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLanguage, type Language } from "@/lib/language-context";
import { cn } from "@/lib/utils";

/**
 * High-definition, pixel-perfect SVG Flag for Cambodia 🇰🇭
 */
export function FlagCambodia({ className = "h-4 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={cn("rounded-[2px] shadow-xs object-cover inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <rect width="640" height="480" fill="#032ea6" />
      <rect y="120" width="640" height="240" fill="#e00025" />
      {/* Stylized Angkor Wat Silhouette in crisp white */}
      <g fill="#ffffff" transform="translate(192, 145) scale(0.68)">
        {/* Base foundation steps */}
        <path d="M 0 170 L 376 170 L 376 156 L 0 156 Z" />
        <path d="M 24 156 L 352 156 L 352 142 L 24 142 Z" />
        {/* Central tower */}
        <path d="M 164 142 L 212 142 L 204 40 L 196 20 L 188 0 L 180 20 L 172 40 Z" />
        {/* Left inner tower */}
        <path d="M 94 142 L 138 142 L 130 55 L 122 35 L 116 22 L 110 35 L 102 55 Z" />
        {/* Right inner tower */}
        <path d="M 238 142 L 282 142 L 274 55 L 266 35 L 260 22 L 254 35 L 246 55 Z" />
        {/* Left outer tower */}
        <path d="M 44 142 L 78 142 L 72 75 L 66 58 L 61 45 L 56 58 L 50 75 Z" />
        {/* Right outer tower */}
        <path d="M 298 142 L 332 142 L 326 75 L 320 58 L 315 45 L 310 58 L 304 75 Z" />
      </g>
    </svg>
  );
}

/**
 * High-definition, pixel-perfect SVG Flag for English / UK 🇬🇧
 */
export function FlagUK({ className = "h-4 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 480"
      className={cn("rounded-[2px] shadow-xs object-cover inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <clipPath id="uk-flag-clip">
        <path d="M0 0v480h640V0z" />
      </clipPath>
      <g clipPath="url(#uk-flag-clip)">
        <path fill="#012169" d="M0 0v480h640V0z" />
        <path stroke="#fff" strokeWidth="60" d="m0 0 640 480M640 0 0 480" />
        <path stroke="#c8102e" strokeWidth="40" d="m0 0 640 480M640 0 0 480" />
        <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640" />
        <path stroke="#c8102e" strokeWidth="60" d="M320 0v480M0 240h640" />
      </g>
    </svg>
  );
}

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  subtitle: string;
  flag: typeof FlagCambodia;
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: "KH",
    label: "Khmer",
    nativeLabel: "ភាសាខ្មែរ",
    subtitle: "Cambodia",
    flag: FlagCambodia
  },
  {
    code: "EN",
    label: "English",
    nativeLabel: "English",
    subtitle: "Global",
    flag: FlagUK
  }
];

interface LanguageSwitcherProps {
  variant?: "dropdown" | "segmented" | "compact";
  className?: string;
  size?: "sm" | "md";
}

export function LanguageSwitcher({
  variant = "dropdown",
  className,
  size = "md"
}: LanguageSwitcherProps) {
  const { language, setLanguage, isKhmer } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) ?? LANGUAGE_OPTIONS[1];
  const CurrentFlag = currentOption.flag;

  // Handle outside click & escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // SEGMENTED VARIANT (ideal for mobile menu drawers or modals)
  if (variant === "segmented") {
    return (
      <div
        className={cn(
          "inline-flex items-center p-1 rounded-xl border border-slate-200 bg-slate-100/80 dark:border-white/10 dark:bg-slate-900/80 backdrop-blur-sm",
          className
        )}
      >
        {LANGUAGE_OPTIONS.map((opt) => {
          const Flag = opt.flag;
          const isActive = opt.code === language;
          return (
            <button
              key={opt.code}
              type="button"
              onClick={() => setLanguage(opt.code)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                isActive
                  ? "bg-white text-blue-600 shadow-xs dark:bg-slate-800 dark:text-cyan-300 ring-1 ring-black/5"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <Flag className="h-3.5 w-4.5" />
              <span>{opt.nativeLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // COMPACT TOGGLE VARIANT
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={() => setLanguage((prev) => (prev === "EN" ? "KH" : "EN"))}
        className={cn(
          "group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur transition hover:border-blue-300 hover:bg-blue-50/50 hover:text-blue-600 dark:border-white/10 dark:bg-white/8 dark:text-slate-200 dark:hover:bg-white/15",
          className
        )}
        title={isKhmer ? "ប្តូរទៅជាភាសាអង់គ្លេស (Switch to English)" : "Switch to Khmer (ប្តូរជាភាសាខ្មែរ)"}
      >
        <CurrentFlag className="h-3.5 w-4.5" />
        <span className="font-bold">{language}</span>
      </button>
    );
  }

  // DEFAULT PROFESSIONAL DROPDOWN VARIANT
  return (
    <div className={cn("relative inline-block text-left", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={cn(
          "group inline-flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/95 px-3 font-semibold text-slate-800 shadow-xs backdrop-blur transition-all duration-200 hover:border-blue-300 hover:bg-blue-50/60 hover:text-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-white/8 dark:text-slate-100 dark:hover:bg-white/15",
          size === "sm" ? "h-9 py-1 text-xs" : "h-10 py-1.5 text-xs sm:text-sm"
        )}
      >
        <CurrentFlag className="h-4 w-5" />
        <span className="font-medium tracking-tight">
          {currentOption.nativeLabel}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:text-blue-600",
            isOpen && "rotate-180 text-blue-600"
          )}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-56 origin-top-right rounded-2xl border border-slate-200/90 bg-white/95 p-1.5 shadow-xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 dark:border-white/10 dark:bg-slate-900/95"
        >
          <div className="px-3 py-2 border-b border-slate-100 dark:border-white/10 mb-1">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <Globe className="h-3.5 w-3.5 text-blue-500" />
              <span>{isKhmer ? "ជ្រើសរើសភាសា" : "Select Language"}</span>
            </div>
          </div>

          <div className="space-y-1">
            {LANGUAGE_OPTIONS.map((opt) => {
              const Flag = opt.flag;
              const isSelected = opt.code === language;

              return (
                <button
                  key={opt.code}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setLanguage(opt.code);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition-colors duration-150",
                    isSelected
                      ? "bg-blue-50/80 font-bold text-blue-700 dark:bg-blue-950/40 dark:text-cyan-300"
                      : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Flag className="h-4.5 w-6 shadow-xs" />
                    <div>
                      <p className="font-semibold leading-snug">{opt.nativeLabel}</p>
                      <p className="text-[10px] text-slate-400 font-normal leading-tight">
                        {opt.label} &bull; {opt.subtitle}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-cyan-300 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
