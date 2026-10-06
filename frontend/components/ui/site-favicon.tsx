"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/lib/settings-context";

/** Advisory MIME types for the icon link, by extension. */
const ICON_TYPES: Array<[RegExp, string]> = [
  [/\.svg(?:[?#]|$)/i, "image/svg+xml"],
  [/\.png(?:[?#]|$)/i, "image/png"],
  [/\.webp(?:[?#]|$)/i, "image/webp"],
  [/\.gif(?:[?#]|$)/i, "image/gif"],
  [/\.jpe?g(?:[?#]|$)/i, "image/jpeg"],
  [/\.ico(?:[?#]|$)/i, "image/x-icon"]
];

/**
 * Points the document's icon at the favicon uploaded in admin settings
 * (`seo.favicon`), so the tab mark comes from the backend like the logo does.
 *
 * The static `app/icon.svg` stays the default: it is what the HTML ships with,
 * and this swaps it only once settings actually carry a favicon — restoring it
 * verbatim (href *and* type) whenever the setting is cleared or the backend is
 * unreachable. Swaps reuse the existing `<link>` so browsers do not end up
 * with parallel icon hints.
 */
export function SiteFavicon() {
  const { seo } = useSettings();
  const href = seo.favicon?.trim() || null;
  const fallback = useRef<{ href: string; type: string } | null>(null);

  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]');
    if (!link) return;

    if (fallback.current === null) {
      fallback.current = { href: link.getAttribute("href") ?? "", type: link.type };
    }

    if (!href) {
      link.href = fallback.current.href;
      if (fallback.current.type) link.type = fallback.current.type;
      else link.removeAttribute("type");
      return;
    }

    link.href = href;
    const type = ICON_TYPES.find(([pattern]) => pattern.test(href))?.[1];
    if (type) link.type = type;
    else link.removeAttribute("type");
  }, [href]);

  return null;
}
