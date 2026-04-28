export const runtime = "edge";

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
    <main
      className="mx-auto flex min-h-screen w-full max-w-2xl flex-col px-5 py-7 sm:px-8"
      style={{ color: "#2d2f30" }}
    >
      {/* 헤더 — 랜딩 페이지와 동일 감성 */}
      <header className="anim-fade-in flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span style={{ color: "#a8275a" }}>✦</span>
          <span className="text-sm font-bold tracking-[0.14em]" style={{ color: "#a8275a" }}>
            DRAMA CASTING
          </span>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="/upload" />
          <Link
            href={`/${locale}`}
            className="rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
            style={{ borderColor: "#e8dde6", color: "#9c8fa0", background: "#ffffff" }}
          >
            {copy.nav.backHome}
          </Link>
        </div>
      </header>

      <section className="anim-fade-up mt-8 flex-1">
        <UploadPanel locale={locale} />
      </section>

      {/* 프리미엄 teaser — 업로드 후 어떤 경험이 기다리는지 미리 안내 */}
      <section className="mt-6 overflow-hidden rounded-[1.7rem] border border-violet-200/60 bg-[linear-gradient(135deg,#1e1b4b_0%,#4c1d95_70%,#701a75_100%)] px-5 py-4 shadow-[0_8px_32px_rgba(168,85,247,0.18)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">💎</span>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-white/60">PREMIUM · $0.99</p>
              <p className="text-sm font-semibold text-white">
                {locale === "en"
                  ? "5 characters · Trait breakdown · Poster card · Share"
                  : locale === "ja"
                    ? "5キャラクター · 特性分析 · ポスターカード · シェア"
                    : "캐릭터 5개 · 특성 분석 · 포스터 카드 · 공유"}
              </p>
            </div>
          </div>
          <p className="text-xs text-white/45">
            {locale === "en"
              ? "Unlock after seeing your free result"
              : locale === "ja"
                ? "無料結果を確認後に解放"
                : "무료 결과 확인 후 업그레이드 가능"}
          </p>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
