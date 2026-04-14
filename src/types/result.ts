import type { Character, CharacterGenre, CharacterRoleType } from "@/data/characters";

export type MoodKey =
  | "차분함"
  | "강렬함"
  | "부드러움"
  | "지적임"
  | "신비로움"
  | "친근함"
  | "진지함"
  | "화면 존재감"
  | "세련됨"
  | "청량함";

export type GenreKey =
  | "romance"
  | "crime"
  | "thriller"
  | "legal"
  | "youth"
  | "fantasy"
  | "historical"
  | "noir"
  | "medical"
  | "mystery";

export type RoleKey = "lead" | "support" | "rival";

export type AnalyzeFaceResult = {
  moodTags: MoodKey[];
  genreScores: Record<GenreKey, number>;
  roleScores: Record<RoleKey, number>;
  topCharacters: string[];
  shortSummary: string;
  cautionMessage?: string;
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

export type GenreRank = {
  key: GenreKey;
  label: CharacterGenre;
  score: number;
};

export type RecommendedCharacter = {
  character: Character;
  score: number;
  reason: string;
  roleLabel: CharacterRoleType;
};

export type CharacterRecommendation = {
  main: RecommendedCharacter;
  supports: [RecommendedCharacter, RecommendedCharacter];
  topGenres: [GenreRank, GenreRank, GenreRank];
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
  topGenreTitle: string;
  supportTitle: string;
};

export type ShareSnapshot = {
  fileName: string;
  result: AnalyzeFaceResult;
  genderPreference?: GenderPreference;
};

export type GenderPreference = "male" | "female";
