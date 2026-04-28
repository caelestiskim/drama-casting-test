import type { FaceType } from "@/data/characters";

export type FilterStyle = {
  /** CSS filter 문자열 — img 태그 style에 직접 적용 */
  css: string;
  /** 포스터 카드 배경 그라디언트 */
  gradient: string;
  /** 카드 강조색 (텍스트 / 배지) */
  accent: string;
  /** 카드 보조 색 */
  accentSoft: string;
  /** 분위기 레이블 */
  label: { ko: string; en: string; ja: string };
};

export const faceTypeFilters: Record<FaceType, FilterStyle> = {
  RUGGED: {
    css:        "contrast(1.2) saturate(0.75) brightness(0.92) sepia(0.2)",
    gradient:   "linear-gradient(145deg,#1c0f00 0%,#3d1f00 40%,#6b3510 100%)",
    accent:     "#f59e0b",
    accentSoft: "#92400e",
    label:      { ko: "거칠고 강인한 무드", en: "Rugged & Gritty", ja: "荒削りで力強いムード" },
  },
  SHARP_COOL: {
    css:        "contrast(1.18) saturate(0.75) brightness(0.96) hue-rotate(195deg)",
    gradient:   "linear-gradient(145deg,#020617 0%,#0c1a4d 45%,#1e3a8a 100%)",
    accent:     "#38bdf8",
    accentSoft: "#1e3a5f",
    label:      { ko: "날카롭고 차가운 무드", en: "Sharp & Cold", ja: "鋭くクールなムード" },
  },
  WARM_FRIENDLY: {
    css:        "contrast(1.05) saturate(1.35) brightness(1.07) sepia(0.08)",
    gradient:   "linear-gradient(145deg,#431407 0%,#7c2d12 45%,#b45309 100%)",
    accent:     "#fcd34d",
    accentSoft: "#92400e",
    label:      { ko: "따뜻하고 친근한 무드", en: "Warm & Friendly", ja: "温かく親しみやすいムード" },
  },
  ELEGANT_REFINED: {
    css:        "contrast(1.08) saturate(0.85) brightness(1.03) sepia(0.12)",
    gradient:   "linear-gradient(145deg,#1a0533 0%,#3b0764 45%,#4c1d95 100%)",
    accent:     "#e879f9",
    accentSoft: "#6b21a8",
    label:      { ko: "우아하고 세련된 무드", en: "Elegant & Refined", ja: "優雅で洗練されたムード" },
  },
  INTELLECTUAL_SERIOUS: {
    css:        "contrast(1.12) saturate(0.55) brightness(0.97)",
    gradient:   "linear-gradient(145deg,#0f172a 0%,#1e2f4a 45%,#263f5e 100%)",
    accent:     "#7dd3fc",
    accentSoft: "#334155",
    label:      { ko: "지적이고 진지한 무드", en: "Intellectual & Serious", ja: "知的で真剣なムード" },
  },
  SOFT_YOUTH: {
    css:        "contrast(0.96) saturate(1.35) brightness(1.1)",
    gradient:   "linear-gradient(145deg,#1c0714 0%,#4a0d2e 50%,#8b1a4a 100%)",
    accent:     "#f9a8d4",
    accentSoft: "#be185d",
    label:      { ko: "싱그럽고 발랄한 무드", en: "Fresh & Youthful", ja: "清々しく若々しいムード" },
  },
  MYSTERIOUS_DARK: {
    css:        "contrast(1.3) saturate(0.35) brightness(0.82)",
    gradient:   "linear-gradient(145deg,#030308 0%,#0d0b22 45%,#150f30 100%)",
    accent:     "#a78bfa",
    accentSoft: "#3b0764",
    label:      { ko: "신비롭고 어두운 무드", en: "Mysterious & Dark", ja: "神秘的で暗いムード" },
  },
  CHARISMATIC_INTENSE: {
    css:        "contrast(1.3) saturate(0.9) brightness(0.9) sepia(0.08)",
    gradient:   "linear-gradient(145deg,#1c0500 0%,#450a00 45%,#7c1500 100%)",
    accent:     "#fb923c",
    accentSoft: "#9a3412",
    label:      { ko: "강렬하고 카리스마 있는 무드", en: "Charismatic & Intense", ja: "強烈でカリスマのあるムード" },
  },
};
