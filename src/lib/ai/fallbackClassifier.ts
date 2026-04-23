import type { FaceAnalysisResult } from "@/types/result";
import type { GenderPreference } from "@/types/result";

/**
 * AI API 실패 시 사용하는 규칙 기반 fallback
 *
 * 균등 분산 벡터는 코사인 유사도 계산 시 어떤 캐릭터와도 비슷하게 나와
 * 부적절한 캐릭터(사극의 젊은 군주 등)가 1위가 되는 문제를 유발함.
 * 각 타입의 지배적 특성을 반영한 벡터를 사용.
 */
export function fallbackClassify(genderPreference?: GenderPreference): FaceAnalysisResult {
  if (genderPreference === "male") {
    return {
      faceType: "CHARISMATIC_INTENSE",
      confidence: 0.3,
      vector: { power: 28, elegance: 15, intellect: 28, warmth: 10, mystery: 19 },
      summary: "AI 분석을 완료하지 못했습니다. 기본 유형으로 결과를 만들었어요.",
      isFallback: true,
    };
  }

  if (genderPreference === "female") {
    return {
      faceType: "ELEGANT_REFINED",
      confidence: 0.3,
      vector: { power: 8, elegance: 46, intellect: 22, warmth: 16, mystery: 8 },
      summary: "AI 분석을 완료하지 못했습니다. 기본 유형으로 결과를 만들었어요.",
      isFallback: true,
    };
  }

  return {
    faceType: "INTELLECTUAL_SERIOUS",
    confidence: 0.3,
    vector: { power: 10, elegance: 18, intellect: 48, warmth: 14, mystery: 10 },
    summary: "AI 분석을 완료하지 못했습니다. 기본 유형으로 결과를 만들었어요.",
    isFallback: true,
  };
}
