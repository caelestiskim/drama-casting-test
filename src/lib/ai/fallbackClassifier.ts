import type { FaceAnalysisResult } from "@/types/result";
import type { GenderPreference } from "@/types/result";

/**
 * AI API 실패 시 사용하는 규칙 기반 fallback
 *
 * 랜덤 없음 — 성별 힌트만 사용해 가장 무난한 기본 유형을 반환.
 * isFallback: true 를 통해 UI에서 안내 문구를 표시할 수 있음.
 */
export function fallbackClassify(genderPreference?: GenderPreference): FaceAnalysisResult {
  if (genderPreference === "male") {
    return {
      faceType: "SHARP_COOL",
      confidence: 0.3,
      vector: { power: 18, elegance: 22, intellect: 30, warmth: 16, mystery: 14 },
      summary: "AI 분석을 완료하지 못했습니다. 기본 유형으로 결과를 만들었어요.",
      isFallback: true,
    };
  }

  if (genderPreference === "female") {
    return {
      faceType: "ELEGANT_REFINED",
      confidence: 0.3,
      vector: { power: 8, elegance: 36, intellect: 24, warmth: 20, mystery: 12 },
      summary: "AI 분석을 완료하지 못했습니다. 기본 유형으로 결과를 만들었어요.",
      isFallback: true,
    };
  }

  // 성별 힌트 없음 — 가장 중립적인 타입
  return {
    faceType: "INTELLECTUAL_SERIOUS",
    confidence: 0.3,
    vector: { power: 12, elegance: 20, intellect: 36, warmth: 18, mystery: 14 },
    summary: "AI 분석을 완료하지 못했습니다. 기본 유형으로 결과를 만들었어요.",
    isFallback: true,
  };
}
