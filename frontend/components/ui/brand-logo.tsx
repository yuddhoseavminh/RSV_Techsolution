"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/lib/settings-context";
import { LogoPlaceholder } from "@/components/ui/logo-placeholder";

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
      badge: "h-8 w-8",
      name: "text-sm",
      sub: "text-[10px]"
    },
    md: {
      image: "h-10 max-w-[140px]",
      badge: "h-10 w-10",
      name: "text-base",
      sub: "text-xs"
    },
    lg: {
      image: "h-12 max-w-[180px]",
      badge: "h-12 w-12",
      name: "text-lg",
      sub: "text-xs"
    }
  }[size];

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoUrl && !imageError ? (
        <Image
          src={logoUrl}
          alt={companyName}
          width={160}
          height={40}
          unoptimized
          className={`${sizeStyles.image} object-contain transition-transform duration-200 hover:scale-105 ${imageClassName}`}
          onError={() => setImageError(true)}
        />
      ) : (
        <LogoPlaceholder
          className={`${sizeStyles.badge} shrink-0 transition-transform duration-200 hover:scale-105 ${badgeClassName}`}
        />
      )}

      {showText && (
        <div className="flex flex-col text-left">
          <span className={`font-semibold leading-tight text-slate-950 dark:text-white ${sizeStyles.name} ${textClassName}`}>
            {companyName}
          </span>
          {subText && (
            <span className={`font-medium leading-tight text-navy-600 ${sizeStyles.sub}`}>{subText}</span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className="inline-flex items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-400/60"
      >
        {content}
      </Link>
    );
  }

  return content;
}
