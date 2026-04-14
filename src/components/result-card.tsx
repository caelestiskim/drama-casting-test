import type { CharacterRecommendation, ResultCopy } from "@/types/result";

type ResultCardProps = {
  copy: ResultCopy;
  recommendation: CharacterRecommendation;
};

export function ResultCard({ copy, recommendation }: ResultCardProps) {
  const main = recommendation.main.character;

  return (
    <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#0f172a_0%,#111827_45%,#1d4ed8_100%)] p-6 text-white shadow-[0_28px_70px_rgba(15,23,42,0.28)] sm:p-8">
      <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
      <p className="text-sm font-medium text-cyan-200">{copy.sectionEyebrow}</p>
      <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{copy.title}</h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-white/90">{copy.oneLiner}</p>
      <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
        {copy.shortIntro}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
          {main.title}
        </span>
        {main.matchingGenres.slice(0, 2).map((genre) => (
          <span
            key={genre}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
          >
            {genre}
          </span>
        ))}
      </div>
    </article>
  );
}
