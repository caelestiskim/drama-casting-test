import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { UploadPanel } from "@/components/upload-panel";
import { getCopy } from "@/lib/copy";
import { assertLocale } from "@/lib/i18n";

export default async function UploadPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const copy = getCopy(locale);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">{copy.upload.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {copy.upload.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="/upload" />
          <Link
            href={`/${locale}`}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {copy.nav.backHome}
          </Link>
        </div>
      </header>

      <section className="mt-10">
        <UploadPanel locale={locale} />
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
