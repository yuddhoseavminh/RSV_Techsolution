import type { Language } from "@/lib/i18n/translations";
import type { LandingContent } from "./types";
import { en } from "./en";
import { km } from "./km";

export type { LandingContent } from "./types";

const content: Record<Language, LandingContent> = { EN: en, KH: km };

export function getLandingContent(language: Language): LandingContent {
  return content[language] ?? en;
}
