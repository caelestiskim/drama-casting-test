import type { CastingResult, ResultCopy } from "@/types/result";
import type { Locale } from "@/lib/i18n";
import { getCharacterL10n, getGenreL10n } from "@/data/characterTranslations";

type ResultCardProps = {
  copy: ResultCopy;
  result: CastingResult;
  locale: Locale;
  isPaid?: boolean;
  faceTypeLabel?: string;
};

export function ResultCard({ copy, result, locale, isPaid = false, faceTypeLabel }: ResultCardProps) {
  const main = result.main.character;
  const matchScore = result.main.matchScore;
  const l10n = getCharacterL10n(main.id, main.name, main.title, main.shortDescription, locale);

  const matchLabel =
    locale === "en"
      ? `${matchScore}% match`
      : locale === "ja"
        ? `${matchScore}%一致`
        : `이 유형 ${matchScore}% 일치`;

  const premiumEyebrow =
    locale === "en"
      ? "AI Impression Analysis · Full Casting Report"
      : locale === "ja"
        ? "AI印象分析 · フルキャスティングレポート"
        : "AI 인상 분석 · 풀 캐스팅 리포트";

  const faceTypeSubline =
    faceTypeLabel
      ? locale === "en"
          ? `Impression type · ${faceTypeLabel}`
          : locale === "ja"
            ? `印象タイプ · ${faceTypeLabel}`
            : `인상 유형 · ${faceTypeLabel}`
      : null;

  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#0f172a_0%,#111827_45%,#1d4ed8_100%)] p-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.28)] sm:p-8">
      <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />

      {/* 아이브로 — 프리미엄은 배지 + 상세 텍스트 */}
      {isPaid ? (
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-pink-500/25 to-violet-500/25 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.18em] text-pink-300 ring-1 ring-pink-400/30">
              💎 PREMIUM
            </span>
            <span className="text-sm font-medium text-cyan-200">{premiumEyebrow}</span>
          </div>
          {faceTypeSubline && (
            <p className="text-[11px] tracking-wide text-white/35">{faceTypeSubline}</p>
          )}
        </div>
      ) : (
        <p className="text-sm font-medium text-cyan-200">{copy.sectionEyebrow}</p>
      )}

      <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{l10n.name}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/90">{copy.oneLiner}</p>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
        {copy.shortIntro}
      </p>

      {isPaid && copy.premiumDetail && (
        <p className="mt-4 max-w-3xl border-l-2 border-cyan-400/40 pl-4 text-sm leading-7 text-white/70 sm:text-base">
          {copy.premiumDetail}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-cyan-400/20 px-4 py-1.5 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/30">
          {matchLabel}
        </span>
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
          {l10n.title}
        </span>
        {main.genres.slice(0, 2).map((genre) => (
          <span
            key={genre}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
          >
            {getGenreL10n(genre, locale)}
          </span>
        ))}
      </div>
    </article>
  );
}
