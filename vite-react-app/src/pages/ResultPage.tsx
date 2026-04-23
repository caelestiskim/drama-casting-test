import { Link } from "react-router-dom";

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
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">{copy.result.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            {copy.result.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="/result" />
          <Link
            to={buildLocalePath(locale, "/upload")}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {copy.nav.retry}
          </Link>
          <Link
            to={buildLocalePath(locale)}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {copy.nav.home}
          </Link>
        </div>
      </header>

      <div className="mt-10">
        <CharacterMatchSection locale={locale} />
      </div>

      <SiteFooter locale={locale} />
    </main>
  );
}
