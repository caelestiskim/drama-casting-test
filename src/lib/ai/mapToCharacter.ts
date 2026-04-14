import { characters, type CharacterRoleType } from "@/data/characters";
import { genreMeta } from "@/data/genres";
import type {
  AnalyzeFaceResult,
  CharacterRecommendation,
  GenderPreference,
  GenreKey,
  RecommendedCharacter,
  RoleKey,
} from "@/types/result";

const roleMap: Record<CharacterRoleType, RoleKey> = {
  주인공: "lead",
  서브: "support",
  조력자: "support",
  라이벌: "rival",
};

function clampScore(value: number) {
  return Math.min(1, Math.max(0, Number(value.toFixed(3))));
}

function buildReason(characterName: string, topMood: string, topGenre: string) {
  return `${topMood} 쪽 분위기가 먼저 보이고, ${topGenre} 장면에도 자연스럽게 어울리는 느낌이에요.`;
}

function matchesGenderPreference(
  character: (typeof characters)[number],
  genderPreference?: GenderPreference,
) {
  if (!genderPreference) {
    return true;
  }

  return character.genderTone === "neutral" || character.genderTone === genderPreference;
}

function scoreCharacter(
  result: AnalyzeFaceResult,
  character: (typeof characters)[number],
  genderPreference?: GenderPreference,
): RecommendedCharacter {
  const genreScore =
    character.matchingGenres.reduce((sum, genre) => {
      const matched = Object.entries(genreMeta).find(([, meta]) => meta.label === genre);
      return sum + (matched ? result.genreScores[matched[0] as GenreKey] : 0);
    }, 0) / character.matchingGenres.length;
  const roleScore = result.roleScores[roleMap[character.roleType]];
  const moodScore =
    Object.entries(character.moodWeights).reduce((sum, [mood, weight]) => {
      return sum + (result.moodTags.includes(mood as never) ? weight ?? 0 : (weight ?? 0) * 0.25);
    }, 0) / Math.max(Object.keys(character.moodWeights).length, 1);
  const topCharacterBoost = result.topCharacters.findIndex(
    (item) => item === character.name || item === character.id,
  );
  const boost = topCharacterBoost === -1 ? 0 : 0.12 - topCharacterBoost * 0.03;
  const genderBoost =
    !genderPreference
      ? 0
      : character.genderTone === genderPreference
        ? 0.1
        : character.genderTone === "neutral"
          ? 0.02
          : -0.06;
  const total = clampScore(
    genreScore * 0.46 + roleScore * 0.32 + moodScore * 0.18 + boost + genderBoost,
  );
  const topGenreKey = Object.entries(result.genreScores).sort((a, b) => b[1] - a[1])[0]?.[0] as GenreKey;

  return {
    character,
    roleLabel: character.roleType,
    score: total,
    reason: buildReason(
      character.name,
      result.moodTags[0] ?? "차분한",
      genreMeta[topGenreKey]?.label ?? "드라마",
    ),
  };
}

export function mapToCharacter(
  result: AnalyzeFaceResult,
  genderPreference?: GenderPreference,
): CharacterRecommendation {
  const ranked = characters
    .filter((character) => matchesGenderPreference(character, genderPreference))
    .map((character) => scoreCharacter(result, character, genderPreference))
    .sort((left, right) => right.score - left.score);

  const topGenres = (Object.entries(result.genreScores) as Array<[GenreKey, number]>)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([key, score]) => ({
      key,
      label: genreMeta[key].label,
      score: clampScore(score),
    })) as CharacterRecommendation["topGenres"];

  return {
    main: ranked[0],
    supports: [ranked[1], ranked[2]],
    topGenres,
  };
}
