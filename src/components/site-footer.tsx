import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const footer = getCopy(locale).footer;

  return (
    <footer className="mt-12 rounded-[2rem] border border-slate-200 bg-white/88 px-6 py-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] sm:px-8">
      <div className="grid gap-5 md:grid-cols-3">
        <section>
          <p className="text-sm font-semibold text-slate-950">{footer.privacyTitle}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{footer.privacyBody}</p>
        </section>
        <section>
          <p className="text-sm font-semibold text-slate-950">{footer.termsTitle}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{footer.termsBody}</p>
        </section>
        <section>
          <p className="text-sm font-semibold text-slate-950">{footer.contactTitle}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{footer.address}</p>
          <a
            href={`mailto:${footer.email}`}
            className="mt-2 inline-block text-sm font-medium text-cyan-700 transition hover:text-cyan-900"
          >
            {footer.email}
          </a>
        </section>
      </div>
    </footer>
  );
}
