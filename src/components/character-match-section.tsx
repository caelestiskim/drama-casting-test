"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { genreMeta } from "@/data/genres";
import { getCopy } from "@/lib/copy";
import { buildReferences } from "@/lib/buildReferences";
import { buildResultCopy } from "@/lib/buildResultCopy";
import { mapToCharacter } from "@/lib/ai/mapToCharacter";
import type { Locale } from "@/lib/i18n";
import {
  UPLOADED_FACE_GENDER_KEY,
  UPLOADED_FACE_IMAGE_KEY,
  UPLOADED_FACE_NAME_KEY,
} from "@/lib/upload-storage";
import { ResultCard } from "@/components/result-card";
import { ShareButtons } from "@/components/share-buttons";
import type { AnalyzeFaceResult, GenderPreference, ShareSnapshot } from "@/types/result";

function encodeSnapshot(snapshot: ShareSnapshot) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(snapshot))));
}

function decodeSnapshot(raw: string) {
  return JSON.parse(decodeURIComponent(escape(atob(raw)))) as ShareSnapshot;
}

type AnalyzeApiResponse = {
  result: AnalyzeFaceResult;
};

export function CharacterMatchSection({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const ui = getCopy(locale).resultUi;
  const [result, setResult] = useState<AnalyzeFaceResult | null>(null);
  const [fileName, setFileName] = useState("uploaded-face.jpg");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [genderPreference, setGenderPreference] = useState<GenderPreference | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setMessage(null);

      const shared = searchParams.get("share");

      if (shared) {
        try {
          const snapshot = decodeSnapshot(shared);
          if (!cancelled) {
            setResult(snapshot.result);
            setFileName(snapshot.fileName);
            setGenderPreference(snapshot.genderPreference ?? null);
            setIsLoading(false);
          }
          return;
        } catch (error) {
          console.error(error);
        }
      }

      const imageDataUrl = window.sessionStorage.getItem(UPLOADED_FACE_IMAGE_KEY) ?? undefined;
      const storedFileName =
        window.sessionStorage.getItem(UPLOADED_FACE_NAME_KEY) ?? "uploaded-face.jpg";
      const storedGender =
        (window.sessionStorage.getItem(UPLOADED_FACE_GENDER_KEY) as GenderPreference | null) ??
        null;
      setGenderPreference(storedGender);

      if (!imageDataUrl) {
        if (!cancelled) {
          setMessage(ui.emptyDescription);
          setIsLoading(false);
        }
        return;
      }

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: storedFileName,
            imageDataUrl,
          }),
        });

        if (!response.ok) {
          throw new Error(`Analyze request failed: ${response.status}`);
        }

        const payload = (await response.json()) as AnalyzeApiResponse;

        if (!cancelled) {
          setResult(payload.result);
          setFileName(storedFileName);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setMessage(ui.emptyDescription);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [searchParams, ui.emptyDescription]);

  const recommendation = useMemo(
    () => (result ? mapToCharacter(result, genderPreference ?? undefined) : null),
    [genderPreference, result],
  );
  const copy = useMemo(
    () =>
      result && recommendation
        ? buildResultCopy(recommendation, result.shortSummary, result.moodTags, locale)
        : null,
    [locale, recommendation, result],
  );
  const references = useMemo(
    () => (result && recommendation ? buildReferences(recommendation, result.moodTags) : null),
    [recommendation, result],
  );
  const shareUrl = useMemo(() => {
    if (!result) {
      return "";
    }
    const snapshot = encodeSnapshot({
      fileName,
      result,
      genderPreference: genderPreference ?? undefined,
    });
    return `${window.location.origin}/${locale}/result?share=${encodeURIComponent(snapshot)}`;
  }, [fileName, genderPreference, locale, result]);

  if (isLoading) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/92 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="animate-pulse space-y-4 p-6 sm:p-8">
          <div className="h-3 w-28 rounded-full bg-slate-200" />
          <div className="h-12 w-3/4 rounded-2xl bg-slate-200" />
          <div className="h-24 rounded-[1.5rem] bg-slate-100" />
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="h-80 rounded-[2rem] bg-slate-100" />
            <div className="space-y-4">
              <div className="h-40 rounded-[1.5rem] bg-slate-100" />
              <div className="h-40 rounded-[1.5rem] bg-slate-100" />
              <div className="h-40 rounded-[1.5rem] bg-slate-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!result || !recommendation || !copy || !references) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white/92 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-medium text-cyan-700">{ui.emptyEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">
          {ui.emptyTitle}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {message ?? ui.emptyDescription}
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2.4rem] border border-pink-100 bg-white/94 shadow-[0_30px_100px_rgba(236,72,153,0.09)]">
      <div className="border-b border-pink-100 bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.12),transparent_26%),linear-gradient(180deg,#fff9fc_0%,#ffffff_100%)] px-6 py-7 sm:px-8">
        <p className="text-sm font-semibold tracking-[0.2em] text-pink-600">{ui.headerEyebrow}</p>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {ui.headerTitle}
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              {copy.heroSummary}
            </p>
          </div>
          <ShareButtons title={copy.title} text={copy.shareCopy} url={shareUrl} locale={locale} />
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <ResultCard copy={copy} recommendation={recommendation} />

          <div className="rounded-[1.9rem] border border-violet-100 bg-[linear-gradient(180deg,#faf7ff_0%,#ffffff_100%)] p-5">
            <p className="text-sm font-semibold tracking-[0.18em] text-violet-500">
              {copy.supportTitle}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {recommendation.supports.map((item) => (
                <article
                  key={item.character.id}
                  className="rounded-[1.55rem] border border-violet-100 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm text-slate-500">{item.character.title}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-950">
                    {item.character.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.character.shortDescription}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-slate-500">{item.reason}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <section className="rounded-[1.9rem] border border-sky-100 bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-sky-600">
              {copy.topGenreTitle}
            </p>
            <div className="mt-4 space-y-3">
              {recommendation.topGenres.map((genre, index) => (
                <div
                  key={genre.key}
                  className="rounded-[1.4rem] border border-sky-100 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">TOP {index + 1}</p>
                      <p className="mt-1 text-lg font-semibold text-slate-950">{genre.label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {genreMeta[genre.key].description}
                      </p>
                    </div>
                    <div className="h-16 w-16 rounded-full border border-sky-200 bg-sky-50 text-center leading-[4rem] font-semibold text-sky-700">
                      {Math.round(genre.score * 100)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.9rem] border border-amber-100 bg-[linear-gradient(180deg,#fffaf3_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-amber-600">
              {ui.friendShare}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">{copy.shareCopy}</p>
          </section>

          <section className="rounded-[1.9rem] border border-rose-100 bg-[linear-gradient(180deg,#fff7fa_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-rose-500">
              {ui.works}
            </p>
            <div className="mt-4 space-y-3">
              {references.works.map((work) => (
                <article
                  key={work.title}
                  className="rounded-[1.35rem] border border-rose-100 bg-white px-4 py-4"
                >
                  <h3 className="text-base font-semibold text-slate-950">{work.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{work.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.9rem] border border-emerald-100 bg-[linear-gradient(180deg,#f6fffb_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600">
              {ui.actors}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              {ui.actorsHint}
            </p>
            <div className="mt-4 space-y-3">
              {references.actors.map((actor) => (
                <article
                  key={actor.name}
                  className="rounded-[1.35rem] border border-emerald-100 bg-white px-4 py-4"
                >
                  <h3 className="text-base font-semibold text-slate-950">{actor.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{actor.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/70 px-4 py-4">
            <p className="text-[12px] leading-5 text-slate-500">
              {ui.storageNote}
            </p>
            <p className="mt-2 text-[12px] leading-5 text-slate-500">
              {ui.entertainmentNote}
            </p>
            {result.cautionMessage ? (
              <p className="mt-2 text-[12px] leading-5 text-amber-700">{result.cautionMessage}</p>
            ) : null}
          </section>
        </div>
      </div>
    </section>
  );
}
