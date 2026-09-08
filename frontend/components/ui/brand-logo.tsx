"use client";

import { useState } from "react";
import Link from "next/link";
import { useSettings } from "@/lib/settings-context";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  subText?: string;
  className?: string;
  imageClassName?: string;
  badgeClassName?: string;
  textClassName?: string;
  onClick?: () => void;
};

export function BrandLogo({
  href,
  size = "md",
  showText = true,
  subText,
  className = "",
  imageClassName = "",
  badgeClassName = "",
  textClassName = "",
  onClick
}: BrandLogoProps) {
  const { logoUrl, companyName } = useSettings();
  const [imageError, setImageError] = useState(false);

  const sizeStyles = {
    sm: {
      image: "h-8 max-w-[110px]",
      badge: "h-8 w-8 text-xs",
      name: "text-sm",
      sub: "text-[10px]"
    },
    md: {
      image: "h-10 max-w-[140px]",
      badge: "h-10 w-10 text-sm",
      name: "text-base",
      sub: "text-xs"
    },
    lg: {
      image: "h-12 max-w-[180px]",
      badge: "h-12 w-12 text-base",
      name: "text-lg",
      sub: "text-xs"
    }
  }[size];

  // Initials fallback
  const initials = (companyName || "KT")
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 3)
    .join("")
    .toUpperCase();

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoUrl && !imageError ? (
        <img
          src={logoUrl}
          alt={companyName}
          className={`${sizeStyles.image} object-contain transition-transform duration-200 hover:scale-105 ${imageClassName}`}
          onError={() => setImageError(true)}
        />
      ) : (
        <span
          className={`flex ${sizeStyles.badge} items-center justify-center rounded-lg bg-brand-slate font-bold text-white shadow-sm ${badgeClassName}`}
        >
          {initials || "KT"}
        </span>
      )}

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold leading-tight text-slate-950 dark:text-white ${sizeStyles.name} ${textClassName}`}>
            {companyName}
          </span>
          {subText && (
            <span className={`font-medium leading-tight text-blue-600 ${sizeStyles.sub}`}>{subText}</span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex items-center focus:outline-hidden">
        {content}
      </Link>
    );
  }

  return content;
}
