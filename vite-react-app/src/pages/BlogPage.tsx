import { Link } from "react-router-dom";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { useLocale } from "@/lib/i18n";
import { blogPosts } from "@/data/blogPosts";

export function BlogPage() {
  const locale = useLocale();

  const heading =
    locale === "en" ? "Blog" : locale === "ja" ? "ブログ" : "블로그";
  const sub =
    locale === "en"
      ? "Impressions, characters, and drama — articles written for curious minds."
      : locale === "ja"
        ? "印象、キャラクター、ドラマ — 好奇心旺盛な方のための記事集。"
        : "인상, 캐릭터, 드라마에 대한 이야기 — 궁금한 모든 것을 다룹니다.";
  const homeLabel = locale === "en" ? "Home" : locale === "ja" ? "ホーム" : "홈";
  const readLabel =
    locale === "en" ? "Read article →" : locale === "ja" ? "記事を読む →" : "글 읽기 →";

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-pink-500">
            {locale === "en"
              ? "DRAMA CASTING TEST"
              : locale === "ja"
                ? "ドラマキャスティングテスト"
                : "드라마 캐스팅 테스트"}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{heading}</h1>
          <p className="mt-2 text-sm text-slate-500">{sub}</p>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher locale={locale} path="/blog" />
          <Link
            to={`/${locale}`}
            className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            {homeLabel}
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-5 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/${locale}/blog/${post.slug}`}
            className="group flex flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white/92 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_18px_56px_rgba(15,23,42,0.09)]"
          >
            <div>
              <time className="text-xs text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString(
                  locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : "ko-KR",
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </time>
              <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-950 group-hover:text-pink-600 transition-colors">
                {post.title[locale]}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 line-clamp-3">
                {post.description[locale]}
              </p>
            </div>
            <span className="mt-4 text-sm font-semibold text-pink-500 group-hover:underline">
              {readLabel}
            </span>
          </Link>
        ))}
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
