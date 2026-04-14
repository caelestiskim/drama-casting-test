import { redirect } from "next/navigation";

export const locales = ["ko", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) {
    redirect("/ko");
  }

  return value;
}
