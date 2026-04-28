import { Link } from "react-router-dom";
import { Suspense } from "react";

import { CharacterMatchSection } from "@/components/character-match-section";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, useLocale } from "@/lib/i18n";

export function ResultPage() {
  const locale = useLocale();
  const copy = getCopy(locale);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8 sm:px-10">
      <header className="flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">{copy.result.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {copy.result.title}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <LocaleSwitcher locale={locale} path="/result" />
          <Link
            to={buildLocalePath(locale, "/upload")}
            className="whitespace-nowrap rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {copy.nav.retry}
          </Link>
          <Link
            to={buildLocalePath(locale)}
            className="whitespace-nowrap rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {copy.nav.home}
          </Link>
        </div>
      </header>

      <div className="mt-10">
        <Suspense
          fallback={
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/92 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="space-y-5 p-6 sm:p-8">
                <p className="text-sm font-semibold tracking-[0.2em] text-pink-600">
                  {copy.resultUi.loadingTitle}
                </p>
                {["1", "2", "3"].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-center gap-4 rounded-[1.4rem] border border-pink-100 bg-[linear-gradient(180deg,#fff8fc_0%,#ffffff_100%)] px-4 py-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 text-sm font-semibold text-white">
                      {step}
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-36 animate-pulse rounded-full bg-slate-200" />
                      <div className="mt-3 h-3 w-56 animate-pulse rounded-full bg-slate-100" />
                    </div>
                    <div className={`h-3 w-3 rounded-full ${index === 0 ? "animate-ping bg-pink-400" : "bg-slate-200"}`} />
                  </div>
                ))}
              </div>
            </section>
          }
        >
          <CharacterMatchSection locale={locale} />
        </Suspense>
      </div>

      <SiteFooter locale={locale} />
    </main>
  );
}
