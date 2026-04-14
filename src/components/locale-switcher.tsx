"use client";

import Link from "next/link";

import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
  path: string;
};

export function LocaleSwitcher({ locale, path }: LocaleSwitcherProps) {
  const copy = getCopy(locale);

  return (
    <div className="inline-flex rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm">
      {(["ko", "en", "ja"] as const).map((item) => (
        <Link
          key={item}
          href={`/${item}${path}`}
          className={
            item === locale
              ? "rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white"
              : "rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-950"
          }
        >
          {copy.localeNames[item]}
        </Link>
      ))}
    </div>
  );
}
