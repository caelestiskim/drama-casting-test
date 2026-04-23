import { useMemo } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

export const locales = ["ko", "en", "ja"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function coerceLocale(value: string | undefined): Locale {
  return isLocale(value ?? "") ? (value as Locale) : "ko";
}

export function buildLocalePath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

export function useLocale(): Locale {
  const { locale } = useParams();

  return useMemo(() => coerceLocale(locale), [locale]);
}

export function LocaleRouteGuard() {
  const { locale } = useParams();
  const location = useLocation();

  if (isLocale(locale ?? "")) {
    return <Outlet />;
  }

  return <Navigate to={`/ko${location.pathname.replace(/^\/[^/]+/, "")}${location.search}`} replace />;
}
