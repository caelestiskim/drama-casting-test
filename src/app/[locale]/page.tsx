import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { getCopy } from "@/lib/copy";
import { assertLocale } from "@/lib/i18n";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = assertLocale(rawLocale);
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
            href={`/${locale}/upload`}
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
              href={`/${locale}/upload`}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {copy.home.startTest}
            </Link>
            <a
              href="#notice"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
            >
              {copy.home.noticeLink}
            </a>
          </div>
        </div>

        <aside className="rounded-[2.25rem] bg-slate-950 p-8 text-white shadow-[0_30px_100px_rgba(15,23,42,0.18)]">
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">{copy.home.stepsTitle}</p>
          <div className="mt-6 space-y-4">
            {copy.home.steps.map((step, index) => (
              <article key={step.title} className="rounded-[1.5rem] border border-white/10 bg-white/6 p-5">
                <p className="text-sm text-cyan-200">STEP {index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.description}</p>
              </article>
            ))}
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
