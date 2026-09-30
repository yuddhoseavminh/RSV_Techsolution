"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { translations, type Language, type Translations } from "@/lib/i18n/translations";

export { translations };
export type { Language, Translations };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language | ((prev: Language) => Language)) => void;
  toggleLanguage: () => void;
  t: (key: keyof Translations, fallback?: string) => string;
  isKhmer: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("rvs-lang") as Language | null;
      if (stored === "EN" || stored === "KH") {
        setLanguageState(stored);
      }
    } catch {
      // LocalStorage access failsafe
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "KH" ? "km" : "en";
    }
  }, [language]);

  const setLanguage = useCallback((updater: Language | ((prev: Language) => Language)) => {
    setLanguageState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try {
        window.localStorage.setItem("rvs-lang", next);
      } catch {
        // LocalStorage access failsafe
      }
      return next;
    });
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "EN" ? "KH" : "EN"));
  }, [setLanguage]);

  const t = useCallback(
    (key: keyof Translations, fallback?: string): string => {
      return translations[language]?.[key] ?? translations.EN[key] ?? fallback ?? String(key);
    },
    [language]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isKhmer: language === "KH"
    }),
    [language, setLanguage, toggleLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "EN",
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (key, fallback) => translations.EN[key] ?? fallback ?? String(key),
      isKhmer: false
    };
  }
  return context;
}
