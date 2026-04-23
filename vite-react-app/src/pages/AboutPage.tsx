import { Link } from "react-router-dom";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { getCopy } from "@/lib/copy";
import { buildLocalePath, useLocale } from "@/lib/i18n";

export function AboutPage() {
  const locale = useLocale();
  const copy = getCopy(locale);

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-cyan-700">{copy.nav.about}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{copy.about.title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="/about" />
          <Link
            to={buildLocalePath(locale)}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {copy.nav.home}
          </Link>
        </div>
      </header>

      <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white/92 p-8 shadow-[0_20px_70px_rgba(15,23,42,0.06)]">
        <p className="text-base leading-8 text-slate-700">{copy.about.intro}</p>
      </section>

      <section className="mt-8 grid gap-5">
        {copy.about.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white/88 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
          >
            <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 grid gap-5">
        {copy.about.detailSections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.85rem] border border-slate-200 bg-white/92 p-6 shadow-[0_14px_44px_rgba(15,23,42,0.05)]"
          >
            <h2 className="text-xl font-semibold text-slate-950">{section.title}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
            {"bullets" in section && section.bullets ? (
              <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-600">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>• {bullet}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] border border-amber-100 bg-[linear-gradient(180deg,#fffaf3_0%,#ffffff_100%)] p-6 sm:p-8">
        <p className="text-sm font-semibold tracking-[0.18em] text-amber-600">{copy.about.faqTitle}</p>
        <div className="mt-5 space-y-4">
          {copy.about.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[1.5rem] border border-amber-100 bg-white/88 p-5"
            >
              <h3 className="text-base font-semibold text-slate-950">{faq.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
