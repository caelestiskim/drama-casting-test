import Link from "next/link";

import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const footer = copy.footer;
  const year = new Date().getFullYear();
  const blogLabel =
    locale === "en" ? "Blog" : locale === "ja" ? "ブログ" : "블로그";

  const navItems = [
    { href: `/${locale}/blog`, label: blogLabel },
    { href: `/${locale}/about`, label: copy.nav.about },
    { href: `/${locale}/privacy`, label: footer.privacyTitle },
    { href: `/${locale}/terms`, label: footer.termsTitle },
  ];

  return (
    <footer className="mt-12 overflow-hidden rounded-[2.25rem] border border-violet-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(250,247,255,0.96)_100%)] px-6 py-8 shadow-[0_20px_60px_rgba(168,85,247,0.08)] sm:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-500">
              Drama Casting Test
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
              {locale === "ko"
                ? "재미있게 보고, 안심하고 쓰는 캐릭터 테스트"
                : locale === "ja"
                  ? "気軽に楽しめて、安心して使えるキャラクターテスト"
                  : "A character test that feels fun and trustworthy"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-violet-100 pt-4 text-center text-sm leading-6 text-slate-500">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="font-medium text-slate-700">Drama Casting Test</span>
            <span className="text-slate-300">·</span>
            <span>{footer.address}</span>
            <span className="text-slate-300">·</span>
            <a
              href={`mailto:${footer.email}`}
              className="font-semibold text-cyan-700 transition hover:text-cyan-900"
            >
              {footer.email}
            </a>
          </p>
          <p className="mt-1">© {year} Drama Casting Test. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
