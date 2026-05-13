"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toJpeg } from "html-to-image";

import { getCopy } from "@/lib/copy";
import { buildReferences } from "@/lib/buildReferences";
import { buildResultCopy } from "@/lib/buildResultCopy";
import { getCharacterL10n } from "@/data/characterTranslations";
import type { Locale } from "@/lib/i18n";
import { PolarCheckoutButton } from "@/components/polar-checkout-button";
import { PosterCard } from "@/components/poster-card";
import { faceTypeFilters } from "@/lib/faceTypeFilters";
import {
  CASTING_RESULT_CACHE_KEY,
  UPLOADED_FACE_GENDER_KEY,
  UPLOADED_FACE_IMAGE_KEY,
  UPLOADED_FACE_NAME_KEY,
} from "@/lib/upload-storage";
import { ResultCard } from "@/components/result-card";
import { ShareButtons } from "@/components/share-buttons";
import type { CastingResult, FaceVector, GenderPreference, ShareSnapshot } from "@/types/result";

// ─────────────────────────────────────────────────────────────
// Analyzing Screen (AI 분석 대기 화면)
// ─────────────────────────────────────────────────────────────

const ANALYSIS_STEPS: Record<Locale, Array<{ icon: string; text: string }>> = {
  ko: [
    { icon: "📸", text: "사진을 스캔하고 있어요" },
    { icon: "🔍", text: "인상과 분위기를 읽는 중이에요" },
    { icon: "🎭", text: "드라마 캐릭터를 탐색하는 중이에요" },
    { icon: "✨", text: "딱 맞는 배역을 찾고 있어요" },
    { icon: "🎬", text: "캐스팅 결과를 정리하는 중이에요" },
  ],
  en: [
    { icon: "📸", text: "Scanning your photo" },
    { icon: "🔍", text: "Reading your vibe and impression" },
    { icon: "🎭", text: "Exploring drama characters" },
    { icon: "✨", text: "Finding the best role match" },
    { icon: "🎬", text: "Putting your casting result together" },
  ],
  ja: [
    { icon: "📸", text: "写真をスキャンしています" },
    { icon: "🔍", text: "雰囲気と印象を読んでいます" },
    { icon: "🎭", text: "ドラマキャラクターを探索中" },
    { icon: "✨", text: "ぴったりの役を探しています" },
    { icon: "🎬", text: "キャスティング結果をまとめています" },
  ],
};

const ANALYZING_SUBTITLE: Record<Locale, string> = {
  ko: "AI가 인상을 분석하는 중입니다",
  en: "AI is analysing your impression",
  ja: "AIが印象を分析しています",
};

function AnalyzingScreen({ locale }: { locale: Locale }) {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState(true);
  const steps = ANALYSIS_STEPS[locale];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStep((prev) => (prev + 1) % steps.length);
        setFade(true);
      }, 300);
    }, 1800);
    return () => clearInterval(interval);
  }, [steps.length]);

  const current = steps[step];

  return (
    <section className="overflow-hidden rounded-[2.4rem] border border-pink-100 bg-white shadow-[0_30px_100px_rgba(236,72,153,0.09)]">
      {/* 상단 그라디언트 배너 */}
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1e1b4b_0%,#312e81_40%,#4c1d95_70%,#701a75_100%)] px-6 py-14 text-center sm:px-8 sm:py-20">
        {/* 배경 파티클들 */}
        <div className="pointer-events-none absolute inset-0">
          {[
            { size: "h-40 w-40", pos: "-left-10 -top-10", color: "rgba(167,139,250,0.15)" },
            { size: "h-32 w-32", pos: "-right-6 top-4", color: "rgba(244,114,182,0.18)" },
            { size: "h-24 w-24", pos: "left-1/4 bottom-2", color: "rgba(129,140,248,0.12)" },
            { size: "h-16 w-16", pos: "right-1/3 bottom-4", color: "rgba(236,72,153,0.14)" },
          ].map((p, i) => (
            <div
              key={i}
              className={`absolute ${p.size} ${p.pos} rounded-full`}
              style={{
                background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
                animation: `pulse ${2 + i * 0.4}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* 중앙 애니메이션 */}
        <div className="relative mx-auto mb-8 h-28 w-28">
          {/* 바깥 회전 링 */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, #ec4899, #8b5cf6, #6366f1, #ec4899)",
              animation: "spin 2s linear infinite",
              padding: "3px",
            }}
          >
            <div className="h-full w-full rounded-full bg-[#1e1b4b]" />
          </div>
          {/* 안쪽 두 번째 링 */}
          <div
            className="absolute inset-3 rounded-full"
            style={{
              background: "conic-gradient(from 180deg, #a78bfa, #f472b6, #818cf8, #a78bfa)",
              animation: "spin 3s linear infinite reverse",
              padding: "2px",
            }}
          >
            <div className="h-full w-full rounded-full bg-[#1e1b4b]" />
          </div>
          {/* 중앙 아이콘 */}
          <div
            className="absolute inset-0 flex items-center justify-center text-3xl"
            style={{
              transition: "opacity 0.3s ease",
              opacity: fade ? 1 : 0,
            }}
          >
            {current.icon}
          </div>
        </div>

        {/* 텍스트 메시지 */}
        <div className="relative min-h-[2.5rem]">
          <p
            className="text-lg font-semibold text-white/95"
            style={{
              transition: "opacity 0.3s ease, transform 0.3s ease",
              opacity: fade ? 1 : 0,
              transform: fade ? "translateY(0)" : "translateY(6px)",
            }}
          >
            {current.text}
          </p>
          <p className="mt-1.5 text-sm text-white/50">{ANALYZING_SUBTITLE[locale]}</p>
        </div>

        {/* 스텝 인디케이터 */}
        <div className="mt-6 flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === step ? "20px" : "6px",
                height: "6px",
                background: i === step
                  ? "linear-gradient(90deg, #ec4899, #8b5cf6)"
                  : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* 하단 스켈레톤 — 결과 카드 레이아웃 암시 */}
      <div className="space-y-4 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-pink-200" />
          <div className="h-3 w-24 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="h-9 w-2/3 animate-pulse rounded-2xl bg-slate-100" />
        <div className="h-16 animate-pulse rounded-[1.5rem] bg-slate-50" />
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="h-64 animate-pulse rounded-[2rem] bg-slate-50" />
          <div className="space-y-3">
            <div className="h-44 animate-pulse rounded-[1.5rem] bg-slate-50" />
            <div className="h-32 animate-pulse rounded-[1.5rem] bg-slate-50" />
          </div>
        </div>
      </div>

      {/* spin 키프레임 */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Score Meter (카운트업 + 원형 프로그레스)
// ─────────────────────────────────────────────────────────────

function ScoreMeter({ score, locale }: { score: number; locale: Locale }) {
  const [displayed, setDisplayed] = useState(0);
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const duration = 1200;
      const start = performance.now();

      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplayed(Math.round(eased * score));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      }

      rafRef.current = requestAnimationFrame(tick);
    }, 300);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [score]);

  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const fillRatio = mounted ? Math.max(0, Math.min(1, (displayed - 60) / 40)) : 0;
  const offset = circumference * (1 - fillRatio);

  const gradStart = "#f472b6";
  const gradMid   = "#818cf8";
  const gradEnd   = "#22d3ee";
  const glowColor = "rgba(244,114,182,0.6)";

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      <div className="relative flex items-center justify-center" style={{ width: 192, height: 192 }}>
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-xl"
          style={{ background: `conic-gradient(${gradStart}, ${gradMid}, ${gradEnd}, ${gradStart})` }}
        />
        <svg width="192" height="192" viewBox="0 0 192 192" className="-rotate-90">
          <defs>
            <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gradStart} />
              <stop offset="50%" stopColor={gradMid} />
              <stop offset="100%" stopColor={gradEnd} />
            </linearGradient>
            <filter id="score-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle cx="96" cy="96" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="13" />
          <circle
            cx="96"
            cy="96"
            r={radius}
            fill="none"
            stroke="url(#score-grad)"
            strokeWidth="13"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter="url(#score-glow)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-6xl font-black tabular-nums leading-none tracking-tight"
            style={{
              background: `linear-gradient(135deg, ${gradStart} 0%, ${gradMid} 50%, ${gradEnd} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 12px ${glowColor})`,
            }}
          >
            {displayed}
          </span>
          <span
            className="text-base font-bold"
            style={{
              background: `linear-gradient(135deg, ${gradMid}, ${gradEnd})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            %
          </span>
        </div>
      </div>
      <p
        className="flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-black tracking-widest text-white"
        style={{ background: `linear-gradient(135deg, ${gradStart}, ${gradMid}, ${gradEnd})` }}
      >
        {locale === "en" ? "✨ Character Match" : locale === "ja" ? "✨ キャラクター一致度" : "✨ 캐릭터 일치도"}
      </p>
    </div>
  );
}

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

const PENTAGON_LABELS_KO: Record<keyof FaceVector, string> = {
  power: "강인함",
  elegance: "우아함",
  warmth: "감성",
  mystery: "신비",
  intellect: "지성",
};
const PENTAGON_LABELS_EN: Record<keyof FaceVector, string> = {
  power: "Power",
  elegance: "Elegance",
  warmth: "Warmth",
  mystery: "Mystery",
  intellect: "Intellect",
};
const PENTAGON_LABELS_JA: Record<keyof FaceVector, string> = {
  power: "強さ",
  elegance: "優雅さ",
  warmth: "温かさ",
  mystery: "神秘",
  intellect: "知性",
};
function getPentagonLabels(locale: string): Record<keyof FaceVector, string> {
  if (locale === "en") return PENTAGON_LABELS_EN;
  if (locale === "ja") return PENTAGON_LABELS_JA;
  return PENTAGON_LABELS_KO;
}

// 꼭짓점 배치: 위쪽부터 시계방향 (각도 -90°, -18°, 54°, 126°, 198°)
const ANGLES_DEG = [-90, -18, 54, 126, 198];

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function vectorToPoints(cx: number, cy: number, maxR: number, vec: FaceVector) {
  // 제곱근 압축: 극단적인 값 차이를 시각적으로 부드럽게 변환
  // 예) {8, 8, 68, 8, 8} → sqrt: {2.8, 2.8, 8.2, 2.8, 2.8} → 비율 2.9x (선형 8.5x 대비)
  const sqrtVals = PENTAGON_KEYS.map((k) => Math.sqrt(Math.max(1, vec[k])));
  const maxSqrt = Math.max(...sqrtVals);
  const scale = maxSqrt > 0 ? (0.85 * maxR) / maxSqrt : maxR;
  return PENTAGON_KEYS.map((_, i) => {
    const r = Math.max(0.18 * maxR, sqrtVals[i] * scale);
    return polarToXY(cx, cy, r, ANGLES_DEG[i]);
  });
}

function pointsToPath(pts: { x: number; y: number }[]) {
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ") + " Z";
}

function PentagonChart({
  faceVector,
  characterVector,
  locale,
}: {
  faceVector: FaceVector;
  characterVector: FaceVector;
  locale: string;
}) {
  const cx = 165;
  const cy = 140;
  const maxR = 108;
  const labelR = 130;

  const PENTAGON_LABELS = getPentagonLabels(locale);
  const gridLevels = [0.33, 0.66, 1.0];
  const gridPoints = gridLevels.map((level) =>
    PENTAGON_KEYS.map((_, i) => polarToXY(cx, cy, maxR * level, ANGLES_DEG[i])),
  );

  const facePoints = vectorToPoints(cx, cy, maxR, faceVector);
  const charPoints = vectorToPoints(cx, cy, maxR, characterVector);

  return (
    <svg viewBox="0 0 330 290" className="w-full max-w-sm mx-auto" aria-hidden>
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

      {/* 꼭짓점 값 레이블 */}
      {facePoints.map((p, i) => {
        const key = PENTAGON_KEYS[i];
        const val = faceVector[key];
        const lp = polarToXY(cx, cy, maxR * (Math.max(0.1, val / 100)) + 14, ANGLES_DEG[i]);
        const anchor = lp.x < cx - 4 ? "end" : lp.x > cx + 4 ? "start" : "middle";
        return (
          <text
            key={`val-${key}`}
            x={lp.x.toFixed(1)}
            y={(lp.y + 4).toFixed(1)}
            textAnchor={anchor}
            fontSize="10"
            fill="rgb(6,182,212)"
            fontWeight="700"
          >
            {val}
          </text>
        );
      })}

      {/* 범례 */}
      <g transform="translate(12,268)">
        <line x1="0" y1="6" x2="20" y2="6" stroke="rgb(6,182,212)" strokeWidth="2" />
        <circle cx="10" cy="6" r="3" fill="rgb(6,182,212)" />
        <text x="26" y="10" fontSize="10" fill="#475569">
          {locale === "en" ? "My impression" : locale === "ja" ? "自分の印象" : "내 인상"}
        </text>
      </g>
      <g transform="translate(96,268)">
        <line
          x1="0"
          y1="6"
          x2="20"
          y2="6"
          stroke="rgba(99,102,241,0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text x="26" y="10" fontSize="10" fill="#475569">
          {locale === "en" ? "Character" : locale === "ja" ? "キャラクター" : "캐릭터 프로필"}
        </text>
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
  _debug?: { error: string };
};

type CachedCastingResult = {
  fp: string;
  result: CastingResult;
  fileName: string;
  debugError: string | null;
};

function isReusableCachedResult(cache: CachedCastingResult, imageFingerprint: string) {
  return (
    cache.fp === imageFingerprint &&
    !cache.result.isFallback &&
    !cache.debugError
  );
}

// ─────────────────────────────────────────────────────────────
// FaceType 한국어 레이블
// ─────────────────────────────────────────────────────────────

const faceTypeLabels: Record<string, Record<string, string>> = {
  RUGGED:               { ko: "거칠고 강인한 인상",        en: "Rugged & Strong",          ja: "荒削りで力強い印象" },
  SHARP_COOL:           { ko: "날카롭고 차가운 인상",      en: "Sharp & Cool",             ja: "鋭くクールな印象" },
  WARM_FRIENDLY:        { ko: "따뜻하고 친근한 인상",      en: "Warm & Friendly",          ja: "温かく親しみやすい印象" },
  ELEGANT_REFINED:      { ko: "우아하고 정돈된 인상",      en: "Elegant & Refined",        ja: "優雅で整った印象" },
  INTELLECTUAL_SERIOUS: { ko: "지적이고 진지한 인상",      en: "Intellectual & Serious",   ja: "知的で真剣な印象" },
  SOFT_YOUTH:           { ko: "맑고 싱그러운 인상",        en: "Soft & Youthful",          ja: "柔らかく若々しい印象" },
  MYSTERIOUS_DARK:      { ko: "신비롭고 어두운 인상",      en: "Mysterious & Dark",        ja: "神秘的で暗い印象" },
  CHARISMATIC_INTENSE:  { ko: "강렬하고 카리스마 있는 인상", en: "Charismatic & Intense",  ja: "強烈でカリスマのある印象" },
};

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

// 로딩 단계
// "init"      — 마운트 직후 storage 확인 중 (매우 짧음, UI 깜빡임 방지용 스켈레톤)
// "analyzing" — API 호출 중 (캐시 없을 때만) → AnalyzingScreen 표시
// "done"      — 결과 준비 완료
// "error"     — 이미지 없음 or API 실패
type LoadPhase = "init" | "analyzing" | "done" | "error";

export function CharacterMatchSection({ locale }: { locale: Locale }) {
  const [searchParams] = useSearchParams();
  const ui = getCopy(locale).resultUi;

  // ── 결제 검증 ──────────────────────────────────────────────
  // ?paid=1 직접 URL 조작 방지:
  // 결제 성공 시 Polar가 ?session_id=xxx를 붙여 리다이렉트.
  // 서버에서 session_id → Polar API로 실제 결제 완료 여부 확인.
  // URL의 session_id (Polar 플레이스홀더 교체 성공 시) 또는
  // sessionStorage의 polar_pending_session_id (플레이스홀더 미교체 시 폴백)
  const urlSessionId = searchParams.get("session_id");
  const [isPaid, setIsPaid] = useState(false);
  const [paymentChecked, setPaymentChecked] = useState(false);
  const [verifiedSessionId, setVerifiedSessionId] = useState<string | null>(null);
  const [buyerEmail, setBuyerEmail] = useState<string | null>(null);
  const [debugPayment, setDebugPayment] = useState<{ sessionId: string | null; source: string; status: string; raw: string } | null>(null);

  useEffect(() => {
    // URL session_id가 있고 플레이스홀더가 아닌 경우 우선 사용
    const urlId = urlSessionId && urlSessionId !== "{CHECKOUT_SESSION_ID}" ? urlSessionId : null;
    // 폴백: localStorage에 저장된 pending session ID (탭 간 공유)
    const storedId = typeof window !== "undefined"
      ? localStorage.getItem("polar_pending_session_id")
      : null;

    const sessionId = urlId ?? storedId;
    const source    = urlId ? "URL" : storedId ? "sessionStorage" : "없음";

    if (!sessionId) {
      setPaymentChecked(true);
      setDebugPayment({ sessionId: null, source, status: "session_id 없음", raw: "" });
      return;
    }

    setDebugPayment({ sessionId, source, status: "verifying…", raw: "" });

    // 이미 검증된 세션은 재확인 생략
    const cacheKey = `payment_verified_${sessionId}`;
    const cached = sessionStorage.getItem(cacheKey);
    if (cached === "1") {
      setIsPaid(true);
      setVerifiedSessionId(sessionId);
      setBuyerEmail(sessionStorage.getItem(`payment_customer_email_${sessionId}`));
      setPaymentChecked(true);
      localStorage.removeItem("polar_pending_session_id");
      setDebugPayment({ sessionId, source, status: "cached ✅ isPaid=true", raw: "" });
    }

    fetch(`/api/verify-payment?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((data: { isPaid: boolean; status?: string; customerEmail?: string | null }) => {
        setDebugPayment({ sessionId, source, status: `polar status="${data.status}" isPaid=${data.isPaid}`, raw: JSON.stringify(data) });
        if (data.isPaid) {
          setIsPaid(true);
          setVerifiedSessionId(sessionId);
          sessionStorage.setItem(cacheKey, "1");
          if (data.customerEmail) {
            setBuyerEmail(data.customerEmail);
            sessionStorage.setItem(`payment_customer_email_${sessionId}`, data.customerEmail);
          }
          localStorage.removeItem("polar_pending_session_id");
        }
      })
      .catch((err: unknown) => {
        setDebugPayment({ sessionId, source, status: `fetch error: ${String(err)}`, raw: "" });
      })
      .finally(() => setPaymentChecked(true));
  }, [urlSessionId]);

  const [phase, setPhase] = useState<LoadPhase>("init");
  const [result, setResult] = useState<CastingResult | null>(null);
  const [fileName, setFileName] = useState("uploaded-face.jpg");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [genderPreference, setGenderPreference] = useState<GenderPreference | null>(null);
  const [apiDebugError, setApiDebugError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const autoEmailKeyRef = useRef<string | null>(null);

  const handleDownloadImage = async () => {
    if (!reportRef.current || downloading || !result) return;
    setDownloading(true);
    setDownloadError(false);
    try {
      const opts = {
        quality: 0.92,
        pixelRatio: 1.5,
        backgroundColor: "#ffffff",
        cacheBust: true,
        skipFonts: false,
        filter: (node: Node) => {
          if (node instanceof HTMLElement && node.dataset.noCapture === "true") return false;
          return true;
        },
      } as const;

      // Safari에서 html-to-image 첫 호출이 빈 이미지를 반환하는 버그 워크어라운드:
      // 첫 번째 호출(워밍업) 후 실제 캡처를 한 번 더 수행
      await toJpeg(reportRef.current, opts).catch(() => null);
      const dataUrl = await toJpeg(reportRef.current, opts);

      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `drama-casting-report-${result.main.character.id}.jpg`;
      a.click();
    } catch (err) {
      console.error("[download-image]", err);
      setDownloadError(true);
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // ── 1. 공유 링크로 진입한 경우 ──
      const shared = searchParams.get("share");
      if (shared) {
        try {
          const snapshot = decodeSnapshot(shared);
          if (!cancelled) {
            setResult(snapshot.result);
            setFileName(snapshot.fileName);
            setPreviewUrl(snapshot.imageDataUrl ?? null);
            setGenderPreference(snapshot.genderPreference ?? null);
            setPhase("done");
          }
          return;
        } catch (e) {
          console.error(e);
        }
      }

      // ── 2. sessionStorage에서 현재 업로드 이미지 읽기 ──
      const imageDataUrl = window.sessionStorage.getItem(UPLOADED_FACE_IMAGE_KEY) ?? undefined;
      const storedFileName =
        window.sessionStorage.getItem(UPLOADED_FACE_NAME_KEY) ?? "uploaded-face.jpg";
      // 성별은 항상 sessionStorage에서 직접 읽음 — 캐시 값으로 절대 덮어쓰지 않음
      const storedGender =
        (window.sessionStorage.getItem(UPLOADED_FACE_GENDER_KEY) as GenderPreference | null) ??
        null;

      if (!cancelled) {
        setPreviewUrl(imageDataUrl ?? null);
        setGenderPreference(storedGender);
      }

      if (!imageDataUrl) {
        if (!cancelled) {
          setMessage(ui.emptyDescription);
          setPhase("error");
        }
        return;
      }

      // ── 3. 캐시 확인 — 이미지 길이를 핑거프린트로 활용 ──
      // (같은 이미지 = 같은 길이; 새 이미지 업로드 시 자동으로 캐시 무효화)
      const imageFingerprint = String(imageDataUrl.length);
      const rawCache = window.sessionStorage.getItem(CASTING_RESULT_CACHE_KEY);
      if (rawCache) {
        try {
          const cache = JSON.parse(rawCache) as CachedCastingResult;
          if (isReusableCachedResult(cache, imageFingerprint)) {
            // 캐시 유효 → API 호출 없이 즉시 결과 표시 (AnalyzingScreen 없음)
            if (!cancelled) {
              setResult(cache.result);
              setFileName(cache.fileName);
              setApiDebugError(cache.debugError);
              // genderPreference는 위 sessionStorage 값을 그대로 사용
              setPhase("done");
            }
            return;
          }
          // 다른 이미지 또는 실패/fallback 결과 캐시 → 삭제 후 재분석
          window.sessionStorage.removeItem(CASTING_RESULT_CACHE_KEY);
        } catch {
          window.sessionStorage.removeItem(CASTING_RESULT_CACHE_KEY);
        }
      }

      // ── 4. 캐시 없음 → 분석 화면 표시 후 API 호출 ──
      if (!cancelled) setPhase("analyzing");

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: storedFileName,
            imageDataUrl,
            genderPreference: storedGender ?? undefined,
          }),
        });

        if (!res.ok) throw new Error(`Analyze request failed: ${res.status}`);

        const payload = (await res.json()) as AnalyzeApiResponse;

        if (!cancelled) {
          setResult(payload.result);
          setFileName(storedFileName);
          setApiDebugError(payload._debug?.error ?? null);

          // 성공 분석만 캐시한다. 실패/fallback 결과를 캐시하면 env/API 키 수정 후에도
          // 같은 사진에서 이전 오류가 계속 표시된다.
          if (!payload.result.isFallback && !payload._debug?.error) {
            try {
              window.sessionStorage.setItem(
                CASTING_RESULT_CACHE_KEY,
                JSON.stringify({
                  fp: imageFingerprint,
                  result: payload.result,
                  fileName: storedFileName,
                  debugError: null,
                }),
              );
            } catch { /* 용량 초과 등 무시 */ }
          } else {
            window.sessionStorage.removeItem(CASTING_RESULT_CACHE_KEY);
          }

          setPhase("done");
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setMessage(ui.emptyDescription);
          setPhase("error");
        }
      }
    }

    void load();
    return () => { cancelled = true; };
  }, [searchParams]); // locale 변경은 컴포넌트 재마운트로 처리됨

  const copy = useMemo(
    () => (result ? buildResultCopy(result, locale) : null),
    [result, locale],
  );
  const references = useMemo(
    () => (result ? buildReferences(result, genderPreference ?? undefined, locale) : null),
    [result, genderPreference, locale],
  );
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !result) return "";
    const snapshot = encodeSnapshot({
      fileName,
      result,
      genderPreference: genderPreference ?? undefined,
    });
    return `${window.location.origin}/${locale}/result?share=${encodeURIComponent(snapshot)}`;
  }, [fileName, genderPreference, locale, result]);

  const sendReportEmail = useCallback(async () => {
    if (!verifiedSessionId || !result || !copy || !references) return;

    const typeLabel = faceTypeLabels[result.faceType]?.[locale] ?? faceTypeLabels[result.faceType]?.ko ?? result.faceType;
    const mainCharacterLabel = getCharacterL10n(
      result.main.character.id,
      result.main.character.name,
      result.main.character.title,
      result.main.character.shortDescription,
      locale,
    );

    setEmailStatus("sending");
    setEmailMessage(
      locale === "en"
        ? "Sending your premium report to your purchase email..."
        : locale === "ja"
          ? "購入時のメールアドレスへプレミアムレポートを送信しています..."
          : "결제 이메일로 프리미엄 리포트를 보내는 중이에요...",
    );

    try {
      const res = await fetch("/api/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          sessionId: verifiedSessionId,
          report: {
            title: ui.headerTitle,
            mainName: mainCharacterLabel.name,
            mainTitle: mainCharacterLabel.title,
            heroSummary: copy.heroSummary,
            oneLiner: copy.oneLiner,
            shareCopy: copy.shareCopy,
            faceTypeLabel: typeLabel,
            matchScore: result.main.matchScore,
            vector: result.vector,
            supports: result.supports.map((item) => {
              const l10n = getCharacterL10n(
                item.character.id,
                item.character.name,
                item.character.title,
                item.character.shortDescription,
                locale,
              );
              return {
                name: l10n.name,
                title: l10n.title,
                matchScore: item.matchScore,
              };
            }),
            works: references.works,
            actors: references.actors,
            shareUrl,
          },
        }),
      });

      const data = (await res.json().catch(() => ({}))) as { email?: string; error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? `send-report failed: ${res.status}`);
      }

      if (data.email) setBuyerEmail(data.email);

      const sentKey = `report_emailed_${verifiedSessionId}_${result.main.character.id}`;
      sessionStorage.setItem(sentKey, "1");
      setEmailStatus("sent");
      setEmailMessage(
        locale === "en"
          ? "Your premium report has been sent to your purchase email."
          : locale === "ja"
            ? "プレミアムレポートを購入時のメールアドレスへ送信しました。"
            : "프리미엄 리포트를 결제 이메일로 발송했어요.",
      );
    } catch (err) {
      console.error("[send-report]", err);
      setEmailStatus("error");
      setEmailMessage(
        locale === "en"
          ? "Couldn't send the report automatically. Please try again."
          : locale === "ja"
            ? "レポートの自動送信に失敗しました。もう一度お試しください。"
            : "리포트 자동 발송에 실패했어요. 다시 시도해 주세요.",
      );
    }
  }, [copy, locale, references, result, shareUrl, ui.headerTitle, verifiedSessionId]);

  useEffect(() => {
    if (!isPaid || !paymentChecked || phase !== "done" || !verifiedSessionId || !result || !copy || !references) {
      return;
    }

    const sentKey = `report_emailed_${verifiedSessionId}_${result.main.character.id}`;

    if (sessionStorage.getItem(sentKey) === "1") {
      setEmailStatus("sent");
      setEmailMessage(
        locale === "en"
          ? "Your premium report has already been sent to your purchase email."
          : locale === "ja"
            ? "プレミアムレポートはすでに購入時のメールアドレスへ送信済みです。"
            : "프리미엄 리포트는 이미 결제 이메일로 발송됐어요.",
      );
      return;
    }

    if (autoEmailKeyRef.current === sentKey || emailStatus !== "idle") {
      return;
    }

    autoEmailKeyRef.current = sentKey;
    void sendReportEmail();
  }, [copy, emailStatus, isPaid, locale, paymentChecked, phase, references, result, sendReportEmail, verifiedSessionId]);

  // ── 렌더 분기 ──

  // init: storage 확인 중 (매우 짧음) — 스켈레톤으로 레이아웃 유지
  if (phase === "init") {
    return (
      <section className="overflow-hidden rounded-[2.4rem] border border-pink-100 bg-white shadow-[0_30px_100px_rgba(236,72,153,0.09)]">
        <div className="h-32 animate-pulse bg-gradient-to-br from-slate-100 to-slate-50" />
        <div className="space-y-4 p-6 sm:p-8">
          <div className="h-3 w-1/4 animate-pulse rounded-full bg-slate-100" />
          <div className="h-8 w-2/3 animate-pulse rounded-2xl bg-slate-100" />
          <div className="h-20 animate-pulse rounded-[1.5rem] bg-slate-50" />
        </div>
      </section>
    );
  }

  // analyzing: 실제 API 호출 중 → 풀 애니메이션 화면
  if (phase === "analyzing") {
    return <AnalyzingScreen locale={locale} />;
  }

  // error / 결과 없음
  if (phase === "error" || !result || !copy || !references) {
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

  const typeLabel = faceTypeLabels[result.faceType]?.[locale] ?? faceTypeLabels[result.faceType]?.ko ?? result.faceType;
  const mainCharacterLabel = getCharacterL10n(
    result.main.character.id,
    result.main.character.name,
    result.main.character.title,
    result.main.character.shortDescription,
    locale,
  );

  return (
    <section className="overflow-hidden rounded-[2.4rem] border border-pink-100 bg-white/94 shadow-[0_30px_100px_rgba(236,72,153,0.09)]">
      {/* 개발용 결제 디버그 패널 — ?debug=1 URL 파라미터가 있을 때만 표시 */}
      {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("debug") === "1" && debugPayment && (
        <div data-no-capture="true" className="bg-yellow-50 border-b border-yellow-200 px-4 py-2 font-mono text-[11px] text-yellow-900 space-y-0.5">
          <p>🔑 session_id: <strong>{debugPayment.sessionId ?? "(없음)"}</strong> <span className="text-yellow-600">[출처: {debugPayment.source}]</span></p>
          <p>📡 verify-payment: <strong>{debugPayment.status}</strong></p>
          {debugPayment.raw && <p>raw: {debugPayment.raw}</p>}
          <p>💎 isPaid: <strong>{String(isPaid)}</strong> | paymentChecked: {String(paymentChecked)}</p>
        </div>
      )}

      {/* ── 캡처 대상 영역 시작 (디버그 패널 제외) ── */}
      <div ref={reportRef}>

      {/* 프리미엄 확인 배너 — 검증 완료 후에만 렌더 (깜빡임 방지) */}
      {isPaid && paymentChecked && (
        <div className="flex items-center gap-2 bg-[linear-gradient(90deg,#ec4899,#8b5cf6)] px-6 py-3 text-sm font-semibold text-white">
          <span>💎</span>
          <span>
            {locale === "en"
              ? "Premium Report — All 5 characters, detailed analysis & share card unlocked"
              : locale === "ja"
                ? "プレミアムレポート — 全5キャラクター・詳細分析・シェアカードが解放されました"
                : "프리미엄 리포트 — 캐릭터 5개 · 상세 분석 · 공유 카드가 모두 열렸어요"}
          </span>
        </div>
      )}

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
          <ShareButtons
            title={getCharacterL10n(
              result.main.character.id,
              result.main.character.name,
              result.main.character.title,
              result.main.character.shortDescription,
              locale,
            ).name}
            text={copy.shareCopy}
            url={shareUrl}
            locale={locale}
          />
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* 왼쪽: 내 사진 + 메인 캐릭터 + 서브 캐릭터 */}
        <div className="space-y-5">
          {/* 원본 사진 */}
          {previewUrl && (
            <div className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-sm">
              <div className="flex justify-center bg-slate-50 px-4 pt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt={locale === "en" ? "Uploaded photo" : locale === "ja" ? "アップロードした写真" : "업로드한 사진"}
                  className="max-h-[420px] w-auto rounded-[1.2rem] object-contain shadow-sm transition-all duration-700"
                  style={{ filter: isPaid ? faceTypeFilters[result.faceType].css : "none" }}
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-5 py-3">
                <p className="text-xs text-slate-400 truncate">{fileName}</p>
                {/* 무드 배지 — 프리미엄만 표시 */}
                {isPaid && (
                  <span
                    className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide"
                    style={{
                      background: `${faceTypeFilters[result.faceType].accent}22`,
                      color: faceTypeFilters[result.faceType].accent,
                    }}
                  >
                    {faceTypeFilters[result.faceType].label[locale]}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 엔터테인먼트 고지 — 유사과학 오해 방지용, 결과 카드 바로 위에 노출 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-[11.5px] leading-5 text-slate-500">
            🎭{" "}
            {locale === "en"
              ? "Entertainment only · Not a scientific analysis · Individual results may vary"
              : locale === "ja"
                ? "エンタメ目的のみ · 科学的分析ではありません · 結果は参考程度にお楽しみください"
                : "오락 목적 전용 · 과학적 분석 아님 · 결과는 참고용으로만 활용하세요"}
          </div>

          <ResultCard
            copy={copy}
            result={result}
            locale={locale}
            isPaid={isPaid}
            faceTypeLabel={typeLabel}
          />

          {/* ── 프리미엄: 상세 특성 분석 ── */}
          {isPaid && (
            <section className="rounded-[1.9rem] border border-pink-200 bg-[linear-gradient(160deg,#fff7fb_0%,#f5f0ff_100%)] p-5 shadow-sm">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/60 bg-pink-50 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-pink-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-400" />
                {locale === "en" ? "PREMIUM · DETAILED ANALYSIS" : locale === "ja" ? "プレミアム · 詳細分析" : "프리미엄 · 상세 분석"}
              </p>
              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {locale === "en"
                  ? "Your Character Mood Report"
                  : locale === "ja"
                    ? "あなたのキャラクタームードレポート"
                    : "나의 캐릭터 무드 리포트"}
              </h2>
              <div className="mt-4 space-y-3">
                {(
                  [
                    { key: "power",     ko: "강인함", en: "Power",     ja: "強さ",    desc: {
                      ko: `가만히 있어도 먼저 읽히는 것이 있어요. ${result.vector.power}점 — 의도하지 않아도 존재감이 앞서 나오는 인상입니다.`,
                      en: `${result.vector.power} — Presence that announces itself before you do. The kind that doesn't need an entrance.`,
                      ja: `${result.vector.power}点 — 意図しなくても存在感が先に出る印象です。`,
                    }},
                    { key: "elegance",  ko: "우아함", en: "Elegance",  ja: "優雅さ",  desc: {
                      ko: `군더더기가 없어요. ${result.vector.elegance}점 — 어떤 장면에서도 쉽게 흐트러지지 않는, 정제된 분위기를 가졌습니다.`,
                      en: `${result.vector.elegance} — Nothing extraneous. A composed quality that holds in any scene without effort.`,
                      ja: `${result.vector.elegance}点 — 無駄がありません。どんなシーンでも乱れない洗練された雰囲気を持っています。`,
                    }},
                    { key: "warmth",    ko: "감성",   en: "Warmth",    ja: "温かさ",  desc: {
                      ko: `곁에 있으면 긴장이 풀릴 것 같아요. ${result.vector.warmth}점 — 공감 능력이 표정보다 먼저 전해지는 인상입니다.`,
                      en: `${result.vector.warmth} — The kind of presence that makes tension ease. Empathy that reads before any expression does.`,
                      ja: `${result.vector.warmth}点 — そばにいると緊張がほぐれそうです。共感力が表情より先に伝わる印象です。`,
                    }},
                    { key: "mystery",   ko: "신비",   en: "Mystery",   ja: "神秘",    desc: {
                      ko: `다 보여주는 것 같아도 끝까지 남는 여백이 있어요. ${result.vector.mystery}점 — 쉽게 단정 지을 수 없어서 오히려 더 오래 기억됩니다.`,
                      en: `${result.vector.mystery} — Looks open, but there's a part that never quite surfaces. Harder to place, so it stays longer.`,
                      ja: `${result.vector.mystery}点 — 全部見せているようで、最後まで残る余白があります。簡単に決めつけられないから、より長く記憶されます。`,
                    }},
                    { key: "intellect", ko: "지성",   en: "Intellect", ja: "知性",    desc: {
                      ko: `먼저 말하기보다 이미 다 읽고 있을 것 같아요. ${result.vector.intellect}점 — 조용한데 신뢰가 먼저 오는 쪽입니다.`,
                      en: `${result.vector.intellect} — Seems to have read the room before speaking. Quiet, but trust arrives first.`,
                      ja: `${result.vector.intellect}点 — 話す前にすでに全部読んでいそうです。静かなのに信頼が先に来る側です。`,
                    }},
                  ] as Array<{ key: keyof FaceVector; ko: string; en: string; ja: string; desc: Record<string, string> }>
                ).map(({ key, ko, en, ja, desc }) => (
                  <div key={key} className="rounded-[1.3rem] border border-pink-100 bg-white px-4 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-800">
                        {locale === "en" ? en : locale === "ja" ? ja : ko}
                      </p>
                      <span
                        className="text-base font-black tabular-nums"
                        style={{
                          background: "linear-gradient(135deg,#ec4899,#8b5cf6)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {result.vector[key]}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${result.vector[key]}%`,
                          background: "linear-gradient(90deg,#ec4899,#8b5cf6)",
                        }}
                      />
                    </div>
                    <p className="mt-2.5 text-xs leading-5 text-slate-500">{desc[locale]}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="rounded-[1.9rem] border border-violet-100 bg-[linear-gradient(180deg,#faf7ff_0%,#ffffff_100%)] p-5">
            <p className="text-sm font-semibold tracking-[0.18em] text-violet-500">
              {copy.supportTitle}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(isPaid ? result.supports : result.supports.slice(0, 2)).map((item) => {
                const charL10n = getCharacterL10n(
                  item.character.id,
                  item.character.name,
                  item.character.title,
                  item.character.shortDescription,
                  locale,
                );
                return (
                  <article
                    key={item.character.id}
                    className="rounded-[1.55rem] border border-violet-100 bg-white p-5 shadow-sm"
                  >
                    <p className="text-sm text-slate-500">{charL10n.title}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      {charL10n.name}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {charL10n.shortDescription}
                    </p>
                    <p className="mt-3 text-sm font-medium text-violet-600">
                      {locale === "en"
                        ? `${item.matchScore}% match`
                        : locale === "ja"
                          ? `${item.matchScore}%一致`
                          : `이 유형 ${item.matchScore}% 일치`}
                    </p>
                  </article>
                );
              })}
            </div>
            {/* 무료: 잠긴 카드 미리보기 */}
            {!isPaid && result.supports.length > 2 && (
              <div className="mt-4 rounded-[1.55rem] border border-dashed border-violet-200 bg-violet-50/50 p-5 text-center">
                <p className="text-2xl">🔒</p>
                <p className="mt-2 text-sm font-semibold text-violet-700">
                  {locale === "en"
                    ? `+${result.supports.length - 2} more characters hidden`
                    : locale === "ja"
                      ? `あと${result.supports.length - 2}キャラクターが非表示`
                      : `추가 캐릭터 ${result.supports.length - 2}명 숨김`}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {locale === "en"
                    ? "Unlock with Premium to see all characters + detailed analysis"
                    : locale === "ja"
                      ? "プレミアムで全キャラクターと詳細分析を確認"
                      : "프리미엄으로 전체 캐릭터 + 상세 분석 확인"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 오각형 + 레퍼런스 */}
        <div className="space-y-5">
          {/* 프리미엄: 분위기 포스터 카드 + 이미지 저장 */}
          {isPaid && previewUrl && (
            <section className="rounded-[1.9rem] border border-pink-100 bg-[linear-gradient(160deg,#fff7fb_0%,#f5f0ff_100%)] p-5 shadow-sm">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-pink-200/60 bg-pink-50 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-pink-500 mb-4">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-400" />
                {locale === "en" ? "PREMIUM · SAVE IMAGE" : locale === "ja" ? "プレミアム · 画像保存" : "프리미엄 · 이미지 저장"}
              </p>
              <PosterCard
                locale={locale}
                faceType={result.faceType}
                main={result.main}
                previewUrl={previewUrl}
              />
            </section>
          )}

          {/* 인상 벡터 오각형 */}
          <section className="relative rounded-[1.9rem] border border-sky-100 bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-sky-600">
              {locale === "en" ? "IMPRESSION PROFILE" : locale === "ja" ? "印象プロフィール" : "인상 프로필"}
            </p>
            <ScoreMeter score={result.main.matchScore} locale={locale} />
            <div className="mt-1">
              <p className="mb-2 text-center text-xs leading-5 text-slate-500">
                {locale === "en"
                  ? "Solid line = your impression · Dashed = character profile"
                  : locale === "ja"
                    ? "実線が自分の印象、点線がキャラクタープロフィール"
                    : "실선이 내 인상, 점선이 캐릭터 프로필이에요."}
              </p>
              <PentagonChart
                faceVector={result.vector}
                characterVector={result.main.character.vector}
                locale={locale}
              />
            </div>
            <div className="mt-3 rounded-xl bg-sky-50 px-4 py-3">
              <p className="text-xs font-medium text-sky-700">
                {locale === "en" ? "Impression type: " : locale === "ja" ? "印象タイプ: " : "분류된 인상 유형: "}
                <span className="font-semibold">{typeLabel}</span>
              </p>
            </div>
            {/* 무료 잠금 오버레이 */}
            {!isPaid && (
              <div className="absolute inset-0 overflow-hidden rounded-[1.9rem]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/65 to-white/92 backdrop-blur-[7px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 shadow-sm ring-1 ring-sky-200/70">
                    <svg width="15" height="19" viewBox="0 0 15 19" fill="none" className="text-sky-500">
                      <rect x="1" y="8" width="13" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3.5 8V5.5a4 4 0 0 1 8 0V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="7.5" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-slate-600">
                      {locale === "en" ? "IMPRESSION PROFILE" : locale === "ja" ? "印象プロフィール" : "인상 프로필"}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {locale === "en" ? "Unlock with Premium" : locale === "ja" ? "プレミアムで解放" : "프리미엄에서 확인"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 배우 레퍼런스 */}
          <section className="relative rounded-[1.9rem] border border-emerald-100 bg-[linear-gradient(180deg,#f6fffb_0%,#ffffff_100%)] p-5 shadow-sm">
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
            {/* 무료 잠금 오버레이 */}
            {!isPaid && (
              <div className="absolute inset-0 overflow-hidden rounded-[1.9rem]">
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/65 to-white/92 backdrop-blur-[7px]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 shadow-sm ring-1 ring-emerald-200/70">
                    <svg width="15" height="19" viewBox="0 0 15 19" fill="none" className="text-emerald-500">
                      <rect x="1" y="8" width="13" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M3.5 8V5.5a4 4 0 0 1 8 0V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="7.5" cy="13" r="1.5" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-[11px] font-bold tracking-[0.14em] text-slate-600">
                      {locale === "en" ? "ACTOR REFERENCES" : locale === "ja" ? "俳優レファレンス" : "배우 레퍼런스"}
                    </p>
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {locale === "en" ? "Unlock with Premium" : locale === "ja" ? "プレミアムで解放" : "프리미엄에서 확인"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 공유 문구 */}
          <section className="rounded-[1.9rem] border border-amber-100 bg-[linear-gradient(180deg,#fffaf3_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-amber-600">
              {ui.friendShare}
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700">{copy.shareCopy}</p>
          </section>

          {/* 결제 버튼 — 미결제 유저에게만 표시 */}
          {!isPaid && <PolarCheckoutButton locale={locale} />}

          {/* 리포트 이미지 다운로드 — 프리미엄 유저만 */}
          {isPaid && (
            <div className="space-y-2">
              <button
                onClick={handleDownloadImage}
                disabled={downloading}
                className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)",
                  boxShadow: "0 6px 20px rgba(139,92,246,0.35)",
                }}
              >
                {downloading
                  ? (locale === "en" ? "Saving…" : locale === "ja" ? "保存中…" : "저장 중…")
                  : (locale === "en" ? "⬇️ Save Full Report as Image" : locale === "ja" ? "⬇️ レポート画像を保存" : "⬇️ 리포트 전체 이미지 저장")}
              </button>
              {downloadError && (
                <p className="text-center text-xs text-red-500">
                  {locale === "en"
                    ? "⚠️ Image capture failed. Please try again or use your device's screenshot."
                    : locale === "ja"
                      ? "⚠️ 画像の取得に失敗しました。再試行するか、スクリーンショットをご利用ください。"
                      : "⚠️ 이미지 생성에 실패했어요. 다시 시도하거나 스크린샷을 이용해주세요."}
                </p>
              )}
            </div>
          )}

          {/* 리포트 이메일 전송 — 프리미엄 유저만 */}
          {isPaid && (
            <section className="rounded-[1.9rem] border border-indigo-100 bg-[linear-gradient(180deg,#f8f7ff_0%,#ffffff_100%)] p-5 shadow-sm">
              <p className="text-sm font-semibold tracking-[0.18em] text-indigo-600">
                {locale === "en" ? "EMAIL REPORT" : locale === "ja" ? "メールレポート" : "이메일 리포트"}
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {locale === "en"
                  ? "After payment is verified, your premium report is sent automatically to your purchase email."
                  : locale === "ja"
                    ? "決済確認後、プレミアムレポートを購入時のメールアドレスへ自動送信します。"
                    : "결제가 확인되면 프리미엄 리포트를 결제 이메일로 자동 발송해요."}
              </p>
              <div className="mt-4 rounded-2xl border border-indigo-100 bg-white px-4 py-3">
                <p className={`text-sm font-semibold ${
                  emailStatus === "sent"
                    ? "text-emerald-600"
                    : emailStatus === "error"
                      ? "text-red-500"
                      : "text-indigo-600"
                }`}>
                  {emailStatus === "sent"
                    ? (locale === "en" ? "Sent" : locale === "ja" ? "送信済み" : "발송 완료")
                    : emailStatus === "error"
                      ? (locale === "en" ? "Send failed" : locale === "ja" ? "送信失敗" : "발송 실패")
                      : (locale === "en" ? "Preparing email..." : locale === "ja" ? "メール準備中..." : "이메일 준비 중...")}
                </p>
                {buyerEmail && (
                  <p className="mt-1 break-all text-xs text-slate-500">{buyerEmail}</p>
                )}
                {emailMessage && (
                  <p className="mt-2 text-xs leading-5 text-slate-500">{emailMessage}</p>
                )}
                {emailStatus === "error" && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmailStatus("idle");
                      setEmailMessage(null);
                      void sendReportEmail();
                    }}
                    className="mt-3 rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(79,70,229,0.18)] transition hover:bg-indigo-500"
                  >
                    {locale === "en" ? "Try again" : locale === "ja" ? "再試行" : "다시 발송"}
                  </button>
                )}
              </div>
              {!verifiedSessionId && (
                <p className="mt-2 text-xs text-amber-600">
                  {locale === "en"
                    ? "Email sending becomes available after payment verification finishes."
                    : locale === "ja"
                      ? "決済確認が完了するとメール送信を利用できます。"
                      : "결제 확인이 끝나면 이메일 전송을 사용할 수 있어요."}
                </p>
              )}
            </section>
          )}

          {/* 작품 레퍼런스 */}
          {references.works.length > 0 && (
            <section className="relative rounded-[1.9rem] border border-rose-100 bg-[linear-gradient(180deg,#fff7fa_0%,#ffffff_100%)] p-5 shadow-sm">
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
              {/* 무료 잠금 오버레이 */}
              {!isPaid && (
                <div className="absolute inset-0 overflow-hidden rounded-[1.9rem]">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/65 to-white/92 backdrop-blur-[7px]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 shadow-sm ring-1 ring-rose-200/70">
                      <svg width="15" height="19" viewBox="0 0 15 19" fill="none" className="text-rose-400">
                        <rect x="1" y="8" width="13" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3.5 8V5.5a4 4 0 0 1 8 0V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <circle cx="7.5" cy="13" r="1.5" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-[11px] font-bold tracking-[0.14em] text-slate-600">
                        {locale === "en" ? "WORK REFERENCES" : locale === "ja" ? "作品レファレンス" : "어울리는 작품"}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {locale === "en" ? "Unlock with Premium" : locale === "ja" ? "プレミアムで解放" : "프리미엄에서 확인"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* 안내 */}
          <section className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/70 px-4 py-4">
            <p className="text-[12px] leading-5 text-slate-500">{ui.storageNote}</p>
            <p className="mt-2 text-[12px] leading-5 text-slate-500">{ui.entertainmentNote}</p>
            {result.isFallback ? (
              <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-[12px] leading-5 text-amber-800">
                <p>
                  <strong>
                    {locale === "en"
                      ? "⚠️ AI could not analyse the photo."
                      : locale === "ja"
                        ? "⚠️ AIが写真を分析できませんでした。"
                        : "⚠️ AI가 사진을 분석하지 못했습니다."}
                  </strong>{" "}
                  {locale === "en"
                    ? "The result was generated from defaults and may not reflect your actual impression."
                    : locale === "ja"
                      ? "デフォルト値で結果を生成しているため、実際の印象と異なる場合があります。"
                      : "현재 기본값으로 결과가 생성되어 실제 인상과 다를 수 있어요."}
                </p>
                {apiDebugError && (
                  <p className="mt-1 font-mono text-[11px] break-all text-red-700">
                    {locale === "en" ? "Error: " : locale === "ja" ? "エラー: " : "오류: "}
                    {apiDebugError}
                  </p>
                )}
              </div>
            ) : null}
          </section>
        </div>
      </div>

      {/* ── 캡처 대상 영역 끝 ── */}
      </div>
    </section>
  );
}
