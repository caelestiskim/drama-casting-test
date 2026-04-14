import type { ReactNode } from "react";

import { assertLocale } from "@/lib/i18n";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  assertLocale(locale);

  return children;
}
