"use client";

import { useEffect, useState } from "react";

import type { Locale } from "@/lib/i18n";

const COPY = {
  ko: {
    cta:      "💎 프리미엄 리포트 받기",
    loading:  "결제창 준비 중…",
    error:    "결제창을 열 수 없어요. 잠시 후 다시 시도해주세요.",
    badge:    "PREMIUM",
    features: [
      "캐릭터 5개 전체 추천",
      "나만의 인상 분석 리포트",
      "포스터 카드 저장",
      "공유용 이미지 카드",
    ],
  },
  en: {
    cta:      "💎 Get Premium Report",
    loading:  "Opening checkout…",
    error:    "Couldn't open checkout. Please try again.",
    badge:    "PREMIUM",
    features: [
      "All 5 character recommendations",
      "Your personalized impression report",
      "Poster card download",
      "Share image card",
    ],
  },
  ja: {
    cta:      "💎 プレミアムレポートを受け取る",
    loading:  "決済画面を準備中…",
    error:    "決済画面を開けませんでした。後ほど再試行してください。",
    badge:    "PREMIUM",
    features: [
      "全5キャラクターの推薦",
      "あなただけの印象分析レポート",
      "ポスターカード保存",
      "シェア用イメージカード",
    ],
  },
} satisfies Record<Locale, { cta: string; loading: string; error: string; badge: string; features: string[] }>;

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style:    "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

export function PolarCheckoutButton({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [price, setPrice]   = useState<string | null>(null);
  const t = COPY[locale];

  // 마운트 시 가격 미리 fetch — 클릭 전부터 버튼에 가격 표시
  useEffect(() => {
    fetch("/api/price")
      .then((r) => r.json())
      .then((data: { amount: number | null; currency: string | null }) => {
        if (data.amount && data.currency) {
          setPrice(formatPrice(data.amount, data.currency));
        }
      })
      .catch(() => { /* 가격 불러오기 실패 시 조용히 무시 */ });
  }, []);

  const handleClick = async () => {
    if (status === "loading") return;
    setStatus("loading");

    try {
      const origin = window.location.origin;

      const res = await fetch("/api/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        // locale을 전달해 서버에서 success_url 조합
        // success_url = {origin}/{locale}/result?session_id={CHECKOUT_SESSION_ID}
        body:    JSON.stringify({ embedOrigin: origin, locale }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = (await res.json()) as {
        url: string;
        id: string;
        amount: number | null;
        currency: string | null;
      };

      if (data.amount && data.currency) {
        setPrice(formatPrice(data.amount, data.currency));
      }

      // checkout session ID를 localStorage에 저장 (탭 간 공유)
      // → Polar가 새 탭/컨텍스트로 결제 후 돌아올 때도 검증 가능
      if (data.id) {
        localStorage.setItem("polar_pending_session_id", data.id);
      }

      // 같은 탭에서 이동 — sessionStorage(사진·분석 캐시)를 유지한 채 결제 완료 후 복귀
      window.location.href = data.url;
      // 이동 중이므로 idle 복원 불필요
    } catch (err) {
      console.error("[checkout]", err);
      setStatus("error");
    }
  };

  const ctaLabel = status === "loading"
    ? t.loading
    : price
      ? `${t.cta} — ${price}`
      : t.cta;

  return (
    <div className="overflow-hidden rounded-[1.9rem] border border-pink-200 bg-[linear-gradient(160deg,#1e1b4b_0%,#4c1d95_60%,#701a75_100%)] shadow-[0_8px_32px_rgba(168,85,247,0.25)]">
      {/* 헤더 */}
      <div className="px-5 pt-5">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/80">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink-400" />
          {t.badge}
        </p>
        <p className="mt-3 text-lg font-bold text-white leading-snug">
          {locale === "en"
            ? "Unlock the full report"
            : locale === "ja"
              ? "フルレポートを解放する"
              : "풀 리포트 잠금 해제"}
        </p>
        {price && (
          <p className="mt-1 text-3xl font-black"
            style={{
              background: "linear-gradient(90deg,#f472b6,#a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {price}
          </p>
        )}
      </div>

      {/* 기능 목록 */}
      <ul className="mt-4 space-y-2 px-5">
        {t.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-white/80">
            <span className="text-pink-400">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="p-5 pt-4">
        <button
          onClick={handleClick}
          disabled={status === "loading"}
          className="w-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(168,85,247,0.40)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(168,85,247,0.55)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:hover:scale-100"
        >
          {ctaLabel}
        </button>

        {status === "error" && (
          <p className="mt-3 text-center text-xs text-red-300">{t.error}</p>
        )}
      </div>
    </div>
  );
}
