"use client";

import { Link } from "react-router-dom";

import { getCopy } from "@/lib/copy";
import { buildLocalePath, type Locale } from "@/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
  path: string;
};

export function LocaleSwitcher({ locale, path }: LocaleSwitcherProps) {
  const copy = getCopy(locale);

  return (
    <div className="inline-flex shrink-0 rounded-full border border-slate-200 bg-white/90 p-1 shadow-sm">
      {(["ko", "en", "ja"] as const).map((item) => (
        <Link
          key={item}
          to={buildLocalePath(item, path)}
          className={
            item === locale
              ? "whitespace-nowrap rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white"
              : "whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:text-slate-950"
          }
        >
          {copy.localeNames[item]}
        </Link>
      ))}
    </div>
  );
}
