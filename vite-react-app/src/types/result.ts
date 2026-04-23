import type { Character, FaceType, FaceVector } from "@/data/characters";

export type { FaceType, FaceVector };

export type GenderPreference = "male" | "female";

/** Vision API 또는 fallback이 반환하는 얼굴 분류 결과 */
export type FaceAnalysisResult = {
  faceType: FaceType;
  confidence: number;  // 0-1
  vector: FaceVector;  // 합계 100
  summary: string;
  isFallback?: boolean;
};

/** 하나의 캐릭터와 매치 점수 */
export type CharacterMatch = {
  character: Character;
  /** 허용된 후보 내 상대 점수, 표시용 70-95 범위 */
  matchScore: number;
  reason: string;
};

/** 최종 캐스팅 판정 결과 */
export type CastingResult = {
  faceType: FaceType;
  vector: FaceVector;
  main: CharacterMatch;
  supports: [CharacterMatch, CharacterMatch];
  summary: string;
  isFallback?: boolean;
};

export type FaceValidationResult = {
  canProceed: boolean;
  status: "success" | "warning" | "error";
  message: string;
  warnings: string[];
  faceCount: number;
  confidence: number;
  isFrontal: boolean;
};

export type WorkReference = {
  title: string;
  note: string;
};

export type ActorReference = {
  name: string;
  note: string;
};

export type ResultReferences = {
  works: WorkReference[];
  actors: ActorReference[];
};

export type ResultCopy = {
  title: string;
  heroSummary: string;
  oneLiner: string;
  shortIntro: string;
  shareCopy: string;
  sectionEyebrow: string;
  supportTitle: string;
};

export type ShareSnapshot = {
  fileName: string;
  result: CastingResult;
  genderPreference?: GenderPreference;
  imageDataUrl?: string;
};
