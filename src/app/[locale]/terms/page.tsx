import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { getCopy } from "@/lib/copy";
import { assertLocale } from "@/lib/i18n";

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
  const copy = getCopy(locale);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">{copy.nav.terms}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            {copy.termsPage.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="/terms" />
          <Link
            href={`/${locale}`}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {copy.nav.home}
          </Link>
        </div>
      </header>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white/92 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
        <p className="text-sm leading-7 text-slate-600">{copy.termsPage.intro}</p>
      </section>

      <section className="mt-8 grid gap-5">
        {copy.termsPage.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
          >
            <h2 className="text-lg font-semibold text-slate-950">{section.title}</h2>
            <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              {section.bullets.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
