import { characters } from "@/data/characters";
import type { FaceType, FaceVector } from "@/data/characters";
import type { CastingResult, CharacterMatch, GenderPreference } from "@/types/result";

type ScoredCharacter = {
  character: (typeof characters)[number];
  similarity: number;
};

/**
 * 코사인 유사도 계산 — 두 5D 벡터의 방향 일치도를 측정
 * 값이 높을수록 인상 프로필이 유사함
 */
function cosineSimilarity(a: FaceVector, b: FaceVector): number {
  const keys: (keyof FaceVector)[] = ["power", "elegance", "intellect", "warmth", "mystery"];
  const dot = keys.reduce((sum, k) => sum + a[k] * b[k], 0);
  const magA = Math.sqrt(keys.reduce((sum, k) => sum + a[k] ** 2, 0));
  const magB = Math.sqrt(keys.reduce((sum, k) => sum + b[k] ** 2, 0));
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

/**
 * 허용된 후보 내 상대 점수를 70~95 범위로 변환
 * - 1위: 82~95
 * - 2위: 75~85
 * - 3위: 70~80
 */
function toDisplayScore(
  similarity: number,
  allSimilarities: number[],
  rank: number,
): number {
  const min = Math.min(...allSimilarities);
  const max = Math.max(...allSimilarities);
  const range = max - min;

  // 후보가 1개이거나 모두 같은 점수인 경우
  if (range < 0.001) return rank === 0 ? 88 : rank === 1 ? 80 : 74;

  const normalized = (similarity - min) / range; // 0~1

  // rank별 표시 범위 설정
  const [low, high] = rank === 0 ? [82, 95] : rank === 1 ? [75, 85] : [70, 80];
  return Math.round(low + normalized * (high - low));
}

function buildReason(faceType: FaceType, characterName: string): string {
  const contextMap: Record<FaceType, string> = {
    RUGGED: "강인하고 거친 인상이",
    SHARP_COOL: "날카롭고 차가운 인상이",
    WARM_FRIENDLY: "따뜻하고 친근한 분위기가",
    ELEGANT_REFINED: "우아하고 정돈된 인상이",
    INTELLECTUAL_SERIOUS: "지적이고 진지한 분위기가",
    SOFT_YOUTH: "부드럽고 청춘적인 에너지가",
    MYSTERIOUS_DARK: "신비롭고 어두운 분위기가",
    CHARISMATIC_INTENSE: "강렬하고 카리스마 있는 존재감이",
  };
  return `${contextMap[faceType]} ${characterName} 역할과 잘 어울립니다.`;
}

/**
 * Stage 2: 얼굴 타입 내에서만 캐릭터를 고르고 코사인 유사도로 순위 결정
 *
 * 핵심 보장:
 * - faceType에 allowedFaceTypes가 포함되지 않는 캐릭터는 후보에도 오르지 않음
 * - 결과 점수는 절대 점수가 아닌 허용 후보 내 상대 점수 (70~95)
 */
export function selectCharacter(
  faceType: FaceType,
  vector: FaceVector,
  genderPreference?: GenderPreference,
): CastingResult {
  // 1. 이 faceType이 허용된 캐릭터만 후보에 올림
  let candidates = characters.filter((c) => c.allowedFaceTypes.includes(faceType));

  // 2. 성별 필터 — neutral은 항상 포함, 선호가 없으면 전부 포함
  if (genderPreference) {
    const filtered = candidates.filter(
      (c) => c.genderTone === "neutral" || c.genderTone === genderPreference,
    );
    // 필터 후 후보가 3개 미만이면 neutral만으로 채움 (안전장치)
    candidates = filtered.length >= 3 ? filtered : candidates.filter((c) => c.genderTone === "neutral");
  }

  // 3. 후보가 3개 미만이면 faceType 제한을 해제하고 전체에서 fallback
  if (candidates.length < 3) {
    candidates = genderPreference
      ? characters.filter((c) => c.genderTone === "neutral" || c.genderTone === genderPreference)
      : [...characters];
  }

  // 4. 코사인 유사도 계산
  const scored: ScoredCharacter[] = candidates
    .map((character) => ({
      character,
      similarity: cosineSimilarity(vector, character.vector),
    }))
    .sort((a, b) => b.similarity - a.similarity);

  const allSims = scored.map((s) => s.similarity);

  const toMatch = (item: ScoredCharacter, rank: number): CharacterMatch => ({
    character: item.character,
    matchScore: toDisplayScore(item.similarity, allSims, rank),
    reason: buildReason(faceType, item.character.name),
  });

  const [first, second, third] = scored;

  return {
    faceType,
    vector,
    main: toMatch(first, 0),
    supports: [toMatch(second, 1), toMatch(third, 2)],
    summary: "",  // 호출 측에서 FaceAnalysisResult.summary로 채움
  };
}
