"use client";

import { useLanguage } from "@/lib/language-context";
import { getLandingContent, type LandingContent } from "./content";

/** Returns the landing-page copy for the active language. */
export function useLandingContent(): LandingContent {
  const { language } = useLanguage();
  return getLandingContent(language);
}
