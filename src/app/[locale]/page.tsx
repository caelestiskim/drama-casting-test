export const runtime = "edge";

import Link from "next/link";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { getCopy } from "@/lib/copy";
import { assertLocale } from "@/lib/i18n";
import { blogPosts } from "@/data/blogPosts";

const FEATURE_ICONS = ["📷", "🎭", "✨"];
const STEP_EMOJIS   = ["📁", "👀", "🎬"];

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

      {/* ── 헤더 ── */}
      <header className="anim-fade-in flex items-center justify-between py-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-pink-400">
            {copy.home.eyebrow}
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl">
            {copy.home.title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="" />
          <Link
            href={`/${locale}/blog`}
            className="hidden rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-800 hover:text-slate-800 sm:inline-flex"
          >
            {locale === "en" ? "Blog" : locale === "ja" ? "ブログ" : "블로그"}
          </Link>
          <Link
            href={`/${locale}/upload`}
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(168,85,247,0.30)] transition-all duration-200 hover:scale-[1.05] hover:shadow-[0_6px_20px_rgba(168,85,247,0.42)] active:scale-[0.97]"
          >
            {copy.nav.start}
          </Link>
        </div>
      </header>

      {/* ── 히어로 ── */}
      <section className="mt-10 grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">

        {/* 왼쪽: 메인 카드 */}
        <div className="anim-fade-up relative overflow-hidden rounded-[2.5rem] border border-pink-100/80 bg-[linear-gradient(145deg,#fff7fb_0%,#f8f5ff_50%,#ffffff_100%)] p-8 shadow-[0_24px_80px_rgba(244,114,182,0.10)] sm:p-10">
          {/* 배경 블러 오브 */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-pink-200/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-6 h-40 w-40 rounded-full bg-violet-200/25 blur-3xl" />

          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full border border-pink-200/70 bg-pink-50 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-pink-500">
              <span className="anim-soft-pulse inline-block h-1.5 w-1.5 rounded-full bg-pink-400" />
              {copy.home.heroEyebrow}
            </p>

            <h2 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.15] tracking-tight text-slate-950 sm:text-6xl">
              {copy.home.heroTitleA}
              <span className="block bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                {copy.home.heroTitleB}
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-500">
              {copy.home.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/upload`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(168,85,247,0.32)] transition-all duration-200 hover:scale-[1.05] hover:shadow-[0_8px_24px_rgba(168,85,247,0.44)] active:scale-[0.97]"
              >
                {copy.home.startTest}
                <span className="anim-float inline-block">✨</span>
              </Link>
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-6 py-3.5 text-sm font-semibold text-violet-600 transition-all duration-200 hover:scale-[1.04] hover:border-violet-300 hover:bg-violet-100 hover:shadow-[0_4px_14px_rgba(139,92,246,0.18)] active:scale-[0.97]"
              >
                {copy.nav.about}
              </Link>
              <a
                href="#notice"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-500 transition-all duration-200 hover:scale-[1.04] hover:border-slate-300 hover:text-slate-700 active:scale-[0.97]"
              >
                {copy.home.noticeLink}
              </a>
            </div>
          </div>
        </div>

        {/* 오른쪽: 스텝 카드 */}
        <aside className="anim-fade-up-d1 relative overflow-hidden rounded-[2.25rem] border border-pink-100/60 bg-[radial-gradient(circle_at_top_left,rgba(251,191,214,0.35),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(196,181,253,0.35),transparent_30%),linear-gradient(160deg,#fff1f8_0%,#f5f0ff_100%)] p-7 shadow-[0_20px_70px_rgba(244,114,182,0.12)]">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.4)_0%,transparent_50%)]" />

          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-[0.22em] text-pink-400">
                {copy.home.stepsTitle}
              </p>
              <span className="rounded-full border border-pink-200/60 bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400">
                flow
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {copy.home.steps.map((step, index) => (
                <article
                  key={step.title}
                  className={`rounded-[1.4rem] border border-white/70 bg-white/75 p-4 shadow-[0_8px_24px_rgba(244,114,182,0.09)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(244,114,182,0.15)] anim-fade-up-d${index + 2}`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-violet-500 text-lg shadow-[0_6px_16px_rgba(168,85,247,0.28)]">
                      {STEP_EMOJIS[index]}
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-pink-400">
                        STEP {index + 1}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-5 text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* ── 피처 카드 ── */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {copy.home.features.map((item, index) => (
          <article
            key={item.title}
            className={`group rounded-[1.75rem] border border-white/80 bg-white/90 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(244,114,182,0.12)] anim-fade-up-d${index + 2}`}
          >
            <div className="mb-3 text-2xl">{FEATURE_ICONS[index]}</div>
            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-500">{item.description}</p>
          </article>
        ))}
      </section>

      {/* ── 프리미엄 리포트 showcase ── */}
      <section className="anim-fade-up-d3 mt-8 overflow-hidden rounded-[2rem] border border-violet-200/60 bg-[linear-gradient(135deg,#1e1b4b_0%,#312e81_40%,#4c1d95_70%,#701a75_100%)] shadow-[0_16px_60px_rgba(168,85,247,0.20)]">
        <div className="grid gap-0 md:grid-cols-[1fr_auto]">
          {/* 왼쪽 콘텐츠 */}
          <div className="p-7 sm:p-9">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/70">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400" />
              PREMIUM
            </p>
            <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
              {locale === "en"
                ? "Go deeper with the Premium Report"
                : locale === "ja"
                  ? "プレミアムレポートでもっと深く"
                  : "프리미엄 리포트로 더 깊이 보기"}
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-7 text-white/60">
              {locale === "en"
                ? "The free result shows your top match. Premium unlocks all 5 characters, a full trait breakdown, a save-ready poster card, and a shareable result — all for less than a coffee."
                : locale === "ja"
                  ? "無料では1キャラクターのみ表示。プレミアムで全5キャラクター・詳細分析・ポスターカード保存・シェアカードがコーヒー1杯以下の価格で解放されます。"
                  : "무료 결과는 메인 캐릭터 1개만 보여줘요. 프리미엄은 전체 캐릭터 5개 + 인상 상세 분석 + 포스터 카드 저장 + 공유 카드까지, 커피 한 잔보다 저렴하게 제공합니다."}
            </p>

            {/* 기능 그리드 */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(locale === "en"
                ? [
                    { icon: "🎭", label: "5 Characters" },
                    { icon: "📊", label: "Trait Analysis" },
                    { icon: "🖼️", label: "Poster Card" },
                    { icon: "📤", label: "Share Card" },
                  ]
                : locale === "ja"
                  ? [
                      { icon: "🎭", label: "5キャラクター" },
                      { icon: "📊", label: "特性分析" },
                      { icon: "🖼️", label: "ポスターカード" },
                      { icon: "📤", label: "シェアカード" },
                    ]
                  : [
                      { icon: "🎭", label: "캐릭터 5개" },
                      { icon: "📊", label: "특성 분석" },
                      { icon: "🖼️", label: "포스터 카드" },
                      { icon: "📤", label: "공유 카드" },
                    ]
              ).map(({ icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-[1.1rem] border border-white/10 bg-white/8 p-3 text-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="text-xs font-semibold text-white/80">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/upload`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(168,85,247,0.40)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_8px_24px_rgba(168,85,247,0.55)] active:scale-[0.97]"
              >
                {locale === "en"
                  ? "Try Free First ✨"
                  : locale === "ja"
                    ? "まず無料で試す ✨"
                    : "먼저 무료로 보기 ✨"}
              </Link>
              <span className="text-sm text-white/50">
                {locale === "en"
                  ? "Upgrade after seeing your result"
                  : locale === "ja"
                    ? "結果を見てからアップグレード"
                    : "결과 확인 후 업그레이드 가능"}
              </span>
            </div>
          </div>

          {/* 오른쪽: 가격 배지 */}
          <div className="flex items-center justify-center border-t border-white/10 p-7 md:border-l md:border-t-0">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.18em] text-white/50">
                {locale === "en" ? "ONE-TIME" : locale === "ja" ? "一回払い" : "일회 결제"}
              </p>
              <p
                className="mt-1 text-5xl font-black"
                style={{
                  background: "linear-gradient(135deg,#f472b6,#a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                $0.99
              </p>
              <p className="mt-1 text-xs text-white/40">USD</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 사진 팁 ── */}
      <section className="anim-fade-up-d3 mt-8 rounded-[2rem] border border-amber-100 bg-[linear-gradient(160deg,#fffcf0_0%,#fffaf3_100%)] p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-amber-500">
          <span>💡</span>
          {copy.home.guideTitle}
        </p>
        <ul className="mt-4 space-y-2">
          {copy.home.guideItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-600">
              <span className="mt-1 shrink-0 text-amber-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 이용 안내 ── */}
      <section id="notice" className="anim-fade-up-d4 mt-8 rounded-[2rem] border border-slate-200/80 bg-slate-50/80 p-6 sm:p-8">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-slate-400">
          <span>📋</span>
          {copy.home.noticeTitle}
        </p>
        <ul className="mt-4 space-y-2">
          {copy.home.notices.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-7 text-slate-500">
              <span className="mt-1 shrink-0 text-slate-300">•</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 블로그 미리보기 ── */}
      <section className="anim-fade-up-d4 mt-8">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold tracking-[0.18em] text-violet-500">
            {locale === "en" ? "FROM THE BLOG" : locale === "ja" ? "ブログ" : "블로그"}
          </p>
          <Link
            href={`/${locale}/blog`}
            className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
          >
            {locale === "en" ? "All articles →" : locale === "ja" ? "すべての記事 →" : "전체 글 보기 →"}
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/${locale}/blog/${post.slug}`}
              className="group rounded-[1.5rem] border border-slate-200 bg-white/80 p-5 transition hover:shadow-md"
            >
              <p className="text-sm font-semibold leading-snug text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-2">
                {post.title[locale]}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500 line-clamp-2">
                {post.description[locale]}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
