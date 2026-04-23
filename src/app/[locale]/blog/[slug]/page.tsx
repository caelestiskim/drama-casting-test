import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-footer";
import { assertLocale } from "@/lib/i18n";
import { blogPosts } from "@/data/blogPosts";

export async function generateStaticParams() {
  const locales = ["ko", "en", "ja"];
  return blogPosts.flatMap((post) =>
    locales.map((locale) => ({ locale, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title[locale]} – 드라마 캐스팅 테스트`,
    description: post.description[locale],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const backLabel =
    locale === "en" ? "← All articles" : locale === "ja" ? "← 記事一覧" : "← 블로그";
  const tryLabel =
    locale === "en"
      ? "Try the Drama Casting Test"
      : locale === "ja"
        ? "ドラマキャスティングテストを試す"
        : "드라마 캐스팅 테스트 해보기";

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 py-8 sm:px-10">
      <header className="flex items-center justify-between py-4">
        <Link
          href={`/${locale}/blog`}
          className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
        >
          {backLabel}
        </Link>
        <LocaleSwitcher locale={locale} path={`/blog/${slug}`} />
      </header>

      <article className="mt-6">
        <time className="text-xs text-slate-400">
          {new Date(post.publishedAt).toLocaleDateString(
            locale === "en" ? "en-US" : locale === "ja" ? "ja-JP" : "ko-KR",
            { year: "numeric", month: "long", day: "numeric" },
          )}
        </time>
        <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
          {post.title[locale]}
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-500">{post.description[locale]}</p>

        <div className="mt-10 space-y-8">
          {post.sections.map((section, si) => (
            <section key={si}>
              {section.heading && (
                <h2 className="mb-4 text-xl font-semibold text-slate-900">
                  {section.heading[locale]}
                </h2>
              )}
              <div className="space-y-4">
                {section.paragraphs.map((p, pi) => (
                  <p key={pi} className="text-base leading-8 text-slate-700">
                    {p[locale]}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      {/* CTA */}
      <div className="mt-14 rounded-[2rem] bg-[linear-gradient(145deg,#fdf4ff_0%,#f0f9ff_100%)] border border-pink-100 p-8 text-center">
        <p className="text-lg font-semibold text-slate-900">
          {locale === "en"
            ? "Curious which character type suits your face?"
            : locale === "ja"
              ? "あなたの顔はどのキャラクタータイプに合いますか？"
              : "내 얼굴은 어떤 캐릭터 유형일까요?"}
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {locale === "en"
            ? "Upload a photo and get your free drama casting result in seconds."
            : locale === "ja"
              ? "写真をアップロードして、数秒で無料のドラマキャスティング結果を受け取りましょう。"
              : "사진 한 장으로 무료 드라마 캐스팅 결과를 바로 확인해보세요."}
        </p>
        <Link
          href={`/${locale}/upload`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(168,85,247,0.30)] transition hover:scale-[1.04] hover:shadow-[0_6px_20px_rgba(168,85,247,0.40)]"
        >
          {tryLabel}
        </Link>
      </div>

      {/* 관련 글 */}
      <section className="mt-12">
        <h2 className="text-base font-semibold text-slate-900">
          {locale === "en" ? "More articles" : locale === "ja" ? "他の記事" : "더 읽기"}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {blogPosts
            .filter((p) => p.slug !== slug)
            .slice(0, 2)
            .map((related) => (
              <Link
                key={related.slug}
                href={`/${locale}/blog/${related.slug}`}
                className="group rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:shadow-md"
              >
                <p className="text-sm font-semibold text-slate-900 group-hover:text-pink-600 transition-colors line-clamp-2">
                  {related.title[locale]}
                </p>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                  {related.description[locale]}
                </p>
              </Link>
            ))}
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
