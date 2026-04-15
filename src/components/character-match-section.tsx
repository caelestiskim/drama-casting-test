"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getCopy } from "@/lib/copy";
import { buildReferences } from "@/lib/buildReferences";
import { buildResultCopy } from "@/lib/buildResultCopy";
import type { Locale } from "@/lib/i18n";
import {
  UPLOADED_FACE_GENDER_KEY,
  UPLOADED_FACE_IMAGE_KEY,
  UPLOADED_FACE_NAME_KEY,
} from "@/lib/upload-storage";
import { ResultCard } from "@/components/result-card";
import { ShareButtons } from "@/components/share-buttons";
import type { CastingResult, FaceVector, GenderPreference, ShareSnapshot } from "@/types/result";

// ─────────────────────────────────────────────────────────────
// Pentagon Chart
// ─────────────────────────────────────────────────────────────

const PENTAGON_KEYS: (keyof FaceVector)[] = [
  "power",
  "elegance",
  "warmth",
  "mystery",
  "intellect",
];

const PENTAGON_LABELS: Record<keyof FaceVector, string> = {
  power: "강인함",
  elegance: "우아함",
  warmth: "감성",
  mystery: "신비",
  intellect: "지성",
};

// 꼭짓점 배치: 위쪽부터 시계방향 (각도 -90°, -18°, 54°, 126°, 198°)
const ANGLES_DEG = [-90, -18, 54, 126, 198];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function vectorToPoints(cx: number, cy: number, maxR: number, vec: FaceVector) {
  return PENTAGON_KEYS.map((key, i) => {
    const r = (vec[key] / 100) * maxR;
    return polarToXY(cx, cy, r, ANGLES_DEG[i]);
  });
}

function pointsToPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";
}

function PentagonChart({
  faceVector,
  characterVector,
}: {
  faceVector: FaceVector;
  characterVector: FaceVector;
}) {
  const cx = 140;
  const cy = 130;
  const maxR = 95;
  const labelR = 116;

  const gridLevels = [0.33, 0.66, 1.0];
  const gridPoints = gridLevels.map((level) =>
    PENTAGON_KEYS.map((_, i) => polarToXY(cx, cy, maxR * level, ANGLES_DEG[i])),
  );

  const facePoints = vectorToPoints(cx, cy, maxR, faceVector);
  const charPoints = vectorToPoints(cx, cy, maxR, characterVector);

  return (
    <svg viewBox="0 0 280 260" className="w-full max-w-xs mx-auto" aria-hidden>
      {/* 그리드 격자 */}
      {gridPoints.map((pts, li) => (
        <polygon
          key={li}
          points={pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
          opacity={li === 2 ? 0.8 : 0.5}
        />
      ))}

      {/* 축선 */}
      {PENTAGON_KEYS.map((_, i) => {
        const outer = polarToXY(cx, cy, maxR, ANGLES_DEG[i]);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outer.x.toFixed(1)}
            y2={outer.y.toFixed(1)}
            stroke="#e2e8f0"
            strokeWidth="1"
            opacity="0.6"
          />
        );
      })}

      {/* 캐릭터 벡터 (배경, 연한 색) */}
      <path
        d={pointsToPath(charPoints)}
        fill="rgba(99,102,241,0.12)"
        stroke="rgba(99,102,241,0.4)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* 얼굴 벡터 (메인) */}
      <path
        d={pointsToPath(facePoints)}
        fill="rgba(6,182,212,0.22)"
        stroke="rgb(6,182,212)"
        strokeWidth="2"
      />

      {/* 꼭짓점 점 */}
      {facePoints.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="3.5" fill="rgb(6,182,212)" />
      ))}

      {/* 축 레이블 */}
      {PENTAGON_KEYS.map((key, i) => {
        const lp = polarToXY(cx, cy, labelR, ANGLES_DEG[i]);
        const anchor =
          lp.x < cx - 4 ? "end" : lp.x > cx + 4 ? "start" : "middle";
        return (
          <text
            key={key}
            x={lp.x.toFixed(1)}
            y={(lp.y + 4).toFixed(1)}
            textAnchor={anchor}
            fontSize="11"
            fill="#475569"
            fontWeight="500"
          >
            {PENTAGON_LABELS[key]}
          </text>
        );
      })}

      {/* 범례 */}
      <g transform="translate(12,238)">
        <line x1="0" y1="6" x2="20" y2="6" stroke="rgb(6,182,212)" strokeWidth="2" />
        <circle cx="10" cy="6" r="3" fill="rgb(6,182,212)" />
        <text x="26" y="10" fontSize="10" fill="#475569">내 인상</text>
      </g>
      <g transform="translate(90,238)">
        <line
          x1="0"
          y1="6"
          x2="20"
          y2="6"
          stroke="rgba(99,102,241,0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text x="26" y="10" fontSize="10" fill="#475569">캐릭터 프로필</text>
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Share helpers
// ─────────────────────────────────────────────────────────────

function encodeSnapshot(snapshot: ShareSnapshot) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(snapshot))));
}

function decodeSnapshot(raw: string) {
  return JSON.parse(decodeURIComponent(escape(atob(raw)))) as ShareSnapshot;
}

type AnalyzeApiResponse = {
  result: CastingResult;
};

// ─────────────────────────────────────────────────────────────
// FaceType 한국어 레이블
// ─────────────────────────────────────────────────────────────

const faceTypeLabel: Record<string, string> = {
  RUGGED: "거칠고 강인한 인상",
  SHARP_COOL: "날카롭고 차가운 인상",
  WARM_FRIENDLY: "따뜻하고 친근한 인상",
  ELEGANT_REFINED: "우아하고 정돈된 인상",
  INTELLECTUAL_SERIOUS: "지적이고 진지한 인상",
  SOFT_YOUTH: "부드럽고 청춘적인 인상",
  MYSTERIOUS_DARK: "신비롭고 어두운 인상",
  CHARISMATIC_INTENSE: "강렬하고 카리스마 있는 인상",
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

export function CharacterMatchSection({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const ui = getCopy(locale).resultUi;
  const [result, setResult] = useState<CastingResult | null>(null);
  const [fileName, setFileName] = useState("uploaded-face.jpg");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
            setPreviewUrl(snapshot.imageDataUrl ?? null);
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
      setPreviewUrl(imageDataUrl ?? null);
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: storedFileName,
            imageDataUrl,
            genderPreference: storedGender ?? undefined,
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

  const copy = useMemo(
    () => (result ? buildResultCopy(result, locale) : null),
    [result, locale],
  );
  const references = useMemo(
    () => (result ? buildReferences(result) : null),
    [result],
  );
  const shareUrl = useMemo(() => {
    if (!result) return "";
    const snapshot = encodeSnapshot({
      fileName,
      result,
      genderPreference: genderPreference ?? undefined,
      imageDataUrl: previewUrl ?? undefined,
    });
    return `${window.location.origin}/${locale}/result?share=${encodeURIComponent(snapshot)}`;
  }, [fileName, genderPreference, locale, previewUrl, result]);

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
              <div className="h-64 rounded-[1.5rem] bg-slate-100" />
              <div className="h-40 rounded-[1.5rem] bg-slate-100" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!result || !copy || !references) {
    return (
      <section className="rounded-[2rem] border border-slate-200 bg-white/92 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-medium text-cyan-700">{ui.emptyEyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-950">{ui.emptyTitle}</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {message ?? ui.emptyDescription}
        </p>
      </section>
    );
  }

  const typeLabel = faceTypeLabel[result.faceType] ?? result.faceType;

  return (
    <section className="overflow-hidden rounded-[2.4rem] border border-pink-100 bg-white/94 shadow-[0_30px_100px_rgba(236,72,153,0.09)]">
      {/* 헤더 */}
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
        {/* 왼쪽: 내 사진 + 메인 캐릭터 + 서브 캐릭터 */}
        <div className="space-y-5">
          {/* 원본 사진 */}
          {previewUrl && (
            <div className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={previewUrl}
                  alt="업로드한 사진"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="px-5 py-3">
                <p className="text-xs text-slate-400 truncate">{fileName}</p>
              </div>
            </div>
          )}

          <ResultCard copy={copy} result={result} />

          <div className="rounded-[1.9rem] border border-violet-100 bg-[linear-gradient(180deg,#faf7ff_0%,#ffffff_100%)] p-5">
            <p className="text-sm font-semibold tracking-[0.18em] text-violet-500">
              {copy.supportTitle}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {result.supports.map((item) => (
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
                  <p className="mt-3 text-sm font-medium text-violet-600">
                    이 유형 {item.matchScore}% 일치
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽: 오각형 + 레퍼런스 */}
        <div className="space-y-5">
          {/* 인상 벡터 오각형 */}
          <section className="rounded-[1.9rem] border border-sky-100 bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-sky-600">
              인상 프로필
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              실선이 내 인상, 점선이 캐릭터 프로필이에요.
            </p>
            <div className="mt-3">
              <PentagonChart
                faceVector={result.vector}
                characterVector={result.main.character.vector}
              />
            </div>
            <div className="mt-3 rounded-xl bg-sky-50 px-4 py-3">
              <p className="text-xs font-medium text-sky-700">
                분류된 인상 유형: <span className="font-semibold">{typeLabel}</span>
              </p>
            </div>
          </section>

          {/* 배우 레퍼런스 */}
          <section className="rounded-[1.9rem] border border-emerald-100 bg-[linear-gradient(180deg,#f6fffb_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-emerald-600">
              {ui.actors}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">{ui.actorsHint}</p>
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

          {/* 공유 문구 */}
          <section className="rounded-[1.9rem] border border-amber-100 bg-[linear-gradient(180deg,#fffaf3_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-amber-600">
              {ui.friendShare}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">{copy.shareCopy}</p>
          </section>

          {/* 작품 레퍼런스 */}
          {references.works.length > 0 && (
            <section className="rounded-[1.9rem] border border-rose-100 bg-[linear-gradient(180deg,#fff7fa_0%,#ffffff_100%)] p-5 shadow-sm">
              <p className="text-sm font-semibold tracking-[0.18em] text-rose-500">{ui.works}</p>
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
          )}

          {/* 안내 */}
          <section className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/70 px-4 py-4">
            <p className="text-[12px] leading-5 text-slate-500">{ui.storageNote}</p>
            <p className="mt-2 text-[12px] leading-5 text-slate-500">{ui.entertainmentNote}</p>
            {result.isFallback ? (
              <p className="mt-2 text-[12px] leading-5 text-amber-700">
                AI 분석을 완료하지 못해 기본 유형으로 결과를 만들었어요. 다시 시도하면 더 정확한 결과를 볼 수 있어요.
              </p>
            ) : null}
          </section>
        </div>
      </div>
    </section>
  );
}
