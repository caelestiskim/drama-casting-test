"use client";

import { useRef, useState } from "react";

import type { Locale } from "@/lib/i18n";
import type { FaceType } from "@/data/characters";
import { faceTypeFilters } from "@/lib/faceTypeFilters";
import { getCharacterL10n } from "@/data/characterTranslations";
import type { CharacterMatch } from "@/types/result";

type Props = {
  locale: Locale;
  faceType: FaceType;
  main: CharacterMatch;
  previewUrl: string;        // data URL
};

const COPY = {
  ko: { save: "카드 저장하기", saving: "저장 중…", hint: "길게 눌러 저장하거나 버튼을 이용하세요" },
  en: { save: "Save Card",     saving: "Saving…",  hint: "Long-press or use the button below" },
  ja: { save: "カードを保存",  saving: "保存中…",  hint: "長押しするかボタンを使って保存してください" },
} satisfies Record<Locale, { save: string; saving: string; hint: string }>;

export function PosterCard({ locale, faceType, main, previewUrl }: Props) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const [saving, setSaving] = useState(false);

  const filter = faceTypeFilters[faceType];
  const l10n   = getCharacterL10n(
    main.character.id,
    main.character.name,
    main.character.title,
    main.character.shortDescription,
    locale,
  );
  const t = COPY[locale];

  // ── Canvas 기반 카드 저장 ───────────────────────────────────
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);

    try {
      const W = 900;
      const H = 1200;
      const canvas  = document.createElement("canvas");
      canvas.width  = W;
      canvas.height = H;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const colors = filter.gradient.match(/#[0-9a-f]{3,8}/gi) ?? ["#111", "#222"];
      const bgBase = colors[0];

      // ① 배경 그라디언트 (이미지 아래 베이스)
      const grd = ctx.createLinearGradient(0, 0, W * 0.7, H);
      colors.forEach((c, i) => grd.addColorStop(i / (colors.length - 1), c));
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // ② 사진 — object-cover object-top 동일하게 전체 캔버스 커버
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload  = () => resolve();
        img.onerror = reject;
        img.src     = previewUrl;
      });

      // object-cover: 캔버스 전체를 덮도록 스케일, object-top: y=0 고정
      const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw    = img.naturalWidth  * scale;
      const dh    = img.naturalHeight * scale;
      const dx    = (W - dw) / 2;

      ctx.save();
      ctx.filter      = filter.css;
      ctx.globalAlpha = 0.97;           // CSS opacity: 0.97과 동일
      ctx.drawImage(img, dx, 0, dw, dh);
      ctx.restore();

      // ③ 하단 페이드 그라디언트 — CSS와 동일하게 52%부터 시작
      const fadeStartY = H * 0.52;
      const fade = ctx.createLinearGradient(0, fadeStartY, 0, H);
      fade.addColorStop(0,    "rgba(0,0,0,0)");
      fade.addColorStop(0.42, hexToRgba(bgBase, 0.44));   // CSS: 70 hex ≈ 44%
      fade.addColorStop(1,    hexToRgba(bgBase, 0.85));   // CSS: d8 hex ≈ 85%
      ctx.fillStyle = fade;
      ctx.fillRect(0, fadeStartY, W, H - fadeStartY);

      // ④ 텍스트가 놓일 하단 영역 추가 어둠 (가독성 확보)
      const textAreaY = H * 0.72;
      const textFade  = ctx.createLinearGradient(0, textAreaY, 0, H);
      textFade.addColorStop(0, "rgba(0,0,0,0)");
      textFade.addColorStop(1, hexToRgba(bgBase, 0.6));
      ctx.fillStyle = textFade;
      ctx.fillRect(0, textAreaY, W, H - textAreaY);

      // ⑤ 분위기 레이블
      const labelY   = Math.round(H * 0.76);
      const labelText = "✦ " + filter.label[locale].toUpperCase();
      ctx.font        = "bold 26px -apple-system, sans-serif";
      ctx.fillStyle   = filter.accent;
      ctx.globalAlpha = 0.9;
      ctx.fillText(labelText, 60, labelY);
      ctx.globalAlpha = 1;

      // ⑥ 캐릭터명 (크고 굵게)
      ctx.font      = "bold 84px -apple-system, sans-serif";
      ctx.fillStyle = "#ffffff";
      const words   = l10n.name.split(" ");
      let   line    = "";
      let   nameY   = labelY + 96;
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > W - 120 && line) {
          ctx.fillText(line, 60, nameY);
          line  = word;
          nameY += 90;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, 60, nameY);

      // ⑦ 한 줄 설명
      ctx.font      = "34px -apple-system, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillText(l10n.title, 60, nameY + 52);

      // ⑧ 구분선
      ctx.strokeStyle = filter.accent;
      ctx.lineWidth   = 1.5;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(60, nameY + 78);
      ctx.lineTo(60 + 72, nameY + 78);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // ⑨ 매칭률
      ctx.font      = "bold 44px -apple-system, sans-serif";
      ctx.fillStyle = filter.accent;
      const scoreLabel =
        locale === "en" ? `${main.matchScore}% MATCH`
        : locale === "ja" ? `${main.matchScore}% 一致`
        : `${main.matchScore}% 일치`;
      ctx.fillText(scoreLabel, 60, nameY + 126);

      // ⑩ 오른쪽 스파클 장식
      const sparklePositions = [
        { x: W - 80,  y: labelY + 60,  size: 11 },
        { x: W - 130, y: labelY + 95,  size: 7  },
        { x: W - 60,  y: labelY + 110, size: 5  },
      ];
      sparklePositions.forEach(({ x, y, size }) => drawSparkle(ctx, x, y, size, filter.accent));

      // ⑪ 워터마크
      ctx.font      = "22px -apple-system, sans-serif";
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillText("Drama Casting Test", W - 310, H - 36);

      // ⑬ 다운로드
      const blob = await new Promise<Blob | null>((res) =>
        canvas.toBlob(res, "image/jpeg", 0.93),
      );
      if (!blob) return;
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `drama-casting-${main.character.id}.jpg`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error("[poster-card] save error", err);
    } finally {
      setSaving(false);
    }
  };

  // ── CSS 미리보기 ───────────────────────────────────────────
  const gradColors = filter.gradient.match(/#[0-9a-f]{3,8}/gi) ?? ["#111"];

  return (
    <div className="space-y-3">
      {/* 카드 미리보기 */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[1.6rem] shadow-[0_20px_56px_rgba(0,0,0,0.55)]"
        style={{ background: filter.gradient, aspectRatio: "3/4" }}
      >
        {/* 사진 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={l10n.name}
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{ filter: filter.css, opacity: 0.97 }}
        />

        {/* 하단 페이드 오버레이 — 52%부터 시작해서 얼굴 상단 보존 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom,
              transparent 52%,
              ${gradColors[0]}70 76%,
              ${gradColors[0]}d8 100%)`,
          }}
        />

        {/* 텍스트 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          {/* 분위기 레이블 */}
          <p
            className="mb-2.5 text-[10px] font-bold tracking-[0.22em] opacity-90"
            style={{ color: filter.accent }}
          >
            ✦ {filter.label[locale].toUpperCase()}
          </p>

          {/* 캐릭터명 */}
          <h3 className="text-2xl font-black leading-tight text-white drop-shadow-sm sm:text-3xl">
            {l10n.name}
          </h3>

          {/* 타이틀 */}
          <p className="mt-1 text-sm text-white/55">{l10n.title}</p>

          {/* 구분선 */}
          <div
            className="my-3 h-px w-12 opacity-30"
            style={{ background: filter.accent }}
          />

          {/* 매칭률 + 스파클 */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold tracking-wide" style={{ color: filter.accent }}>
              {locale === "en"
                ? `${main.matchScore}% MATCH`
                : locale === "ja"
                  ? `${main.matchScore}% 一致`
                  : `${main.matchScore}% 일치`}
            </p>
            {/* 스파클 3개 */}
            <div className="flex items-center gap-2 opacity-60 pr-1">
              {[10, 7, 5].map((size, i) => (
                <svg key={i} width={size} height={size} viewBox="0 0 10 10">
                  <path
                    d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z"
                    fill={filter.accent}
                  />
                </svg>
              ))}
            </div>
          </div>

          <p className="mt-3 text-[10px] text-white/18 tracking-widest">
            Drama Casting Test
          </p>
        </div>
      </div>

      {/* 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full rounded-full py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-60"
        style={{
          background: `linear-gradient(90deg, ${filter.accentSoft}, ${filter.accent})`,
          boxShadow:  `0 6px 20px ${filter.accent}44`,
        }}
      >
        {saving ? t.saving : `⬇️ ${t.save}`}
      </button>

      <p className="text-center text-[11px] text-slate-400">{t.hint}</p>
    </div>
  );
}

// ── 유틸 ──────────────────────────────────────────────────────
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function drawSparkle(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, size: number, color: string,
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.65;
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, -size);
  ctx.lineTo(size * 0.22, -size * 0.22);
  ctx.lineTo(size, 0);
  ctx.lineTo(size * 0.22, size * 0.22);
  ctx.lineTo(0, size);
  ctx.lineTo(-size * 0.22, size * 0.22);
  ctx.lineTo(-size, 0);
  ctx.lineTo(-size * 0.22, -size * 0.22);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
}
