import { Link } from "react-router-dom";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, useLocale } from "@/lib/i18n";

export function HomePage() {
  const locale = useLocale();
  const copy = getCopy(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">{copy.home.eyebrow}</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
            {copy.home.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="" />
          <Link
            to={buildLocalePath(locale, "/upload")}
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {copy.nav.start}
          </Link>
        </div>
      </header>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.18fr_0.82fr]">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/92 p-8 shadow-[0_30px_100px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">{copy.home.heroEyebrow}</p>
          <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl">
            {copy.home.heroTitleA}
            <span className="block text-slate-500">{copy.home.heroTitleB}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{copy.home.heroDescription}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to={buildLocalePath(locale, "/upload")}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {copy.home.startTest}
            </Link>
            <Link
              to={buildLocalePath(locale, "/about")}
              className="inline-flex items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-6 py-3 text-sm font-semibold text-cyan-800 transition hover:border-cyan-300 hover:bg-cyan-100"
            >
              {copy.nav.about}
            </Link>
            <a
              href="#notice"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              {copy.home.noticeLink}
            </a>
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[2.25rem] border border-slate-200/70 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_28%),linear-gradient(180deg,#dfe9f7_0%,#cfddee_100%)] p-8 shadow-[0_26px_90px_rgba(71,85,105,0.16)]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28)_0%,transparent_34%,rgba(255,255,255,0.12)_100%)]" />
          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-[0.2em] text-sky-700">{copy.home.stepsTitle}</p>
              <span className="rounded-full border border-white/60 bg-white/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                flow
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {copy.home.steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-[1.5rem] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(248,250,252,0.9)_100%)] p-5 shadow-[0_14px_34px_rgba(71,85,105,0.14)] backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a_0%,#334155_100%)] text-sm font-semibold text-white shadow-[0_12px_24px_rgba(15,23,42,0.18)]">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-600">
                        STEP {index + 1}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-950">{step.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {copy.home.features.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white/88 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
          >
            <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] border border-amber-100 bg-[linear-gradient(180deg,#fffaf3_0%,#ffffff_100%)] p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-amber-600">{copy.home.guideTitle}</p>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          {copy.home.guideItems.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <section id="notice" className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50/90 p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-slate-500">{copy.home.noticeTitle}</p>
        <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
          {copy.home.notices.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
