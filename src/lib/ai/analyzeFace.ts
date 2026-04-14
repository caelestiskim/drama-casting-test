import "server-only";

import { characters } from "@/data/characters";
import { genreMeta } from "@/data/genres";
import type { AnalyzeFaceResult, GenreKey, MoodKey, RoleKey } from "@/types/result";

type AnalyzeFaceParams = {
  fileName: string;
  imageDataUrl?: string;
  mockMode?: boolean;
};

const genreKeys = Object.keys(genreMeta) as GenreKey[];
const roleKeys: RoleKey[] = ["lead", "support", "rival"];
const moodPool: MoodKey[] = [
  "차분함",
  "강렬함",
  "부드러움",
  "지적임",
  "신비로움",
  "친근함",
  "진지함",
  "화면 존재감",
  "세련됨",
  "청량함",
];

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "moodTags",
    "genreScores",
    "roleScores",
    "topCharacters",
    "shortSummary",
  ],
  properties: {
    moodTags: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5,
    },
    genreScores: {
      type: "object",
      additionalProperties: false,
      required: genreKeys,
      properties: Object.fromEntries(genreKeys.map((key) => [key, { type: "number" }])),
    },
    roleScores: {
      type: "object",
      additionalProperties: false,
      required: roleKeys,
      properties: Object.fromEntries(roleKeys.map((key) => [key, { type: "number" }])),
    },
    topCharacters: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 6,
    },
    shortSummary: {
      type: "string",
    },
    cautionMessage: {
      type: "string",
    },
  },
} as const;

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function pickNumber(seed: string, offset: number) {
  return ((hashString(`${seed}:${offset}`) % 1000) + 1) / 1000;
}

function normalizeScores<T extends string>(scores: Record<T, number>) {
  const max = Math.max(...(Object.values(scores) as number[]), 0.001);
  return Object.fromEntries(
    (Object.entries(scores) as Array<[T, number]>).map(([key, value]) => [
      key,
      Number((value / max).toFixed(3)),
    ]),
  ) as Record<T, number>;
}

function deriveMoodTags(seed: string, fileName: string) {
  const lowered = fileName.toLowerCase();
  const moodSet = new Set<MoodKey>();

  if (lowered.includes("profile") || lowered.includes("resume")) {
    moodSet.add("지적임");
    moodSet.add("차분함");
  }

  if (lowered.includes("selfie") || lowered.includes("daily")) {
    moodSet.add("친근함");
    moodSet.add("부드러움");
  }

  if (lowered.includes("night") || lowered.includes("dark")) {
    moodSet.add("신비로움");
    moodSet.add("강렬함");
  }

  const ordered = [...moodPool].sort(
    (left, right) =>
      pickNumber(`${seed}:${left}`, 1) - pickNumber(`${seed}:${right}`, 2),
  );

  for (const mood of ordered) {
    if (moodSet.size >= 4) {
      break;
    }
    moodSet.add(mood);
  }

  return [...moodSet].slice(0, 4);
}

function buildGenreScores(seed: string, fileName: string, moods: MoodKey[]) {
  const lowered = fileName.toLowerCase();
  const scores: Record<GenreKey, number> = {
    romance: 0.22,
    crime: 0.22,
    thriller: 0.22,
    legal: 0.22,
    youth: 0.22,
    fantasy: 0.22,
    historical: 0.22,
    noir: 0.22,
    medical: 0.22,
    mystery: 0.22,
  };

  if (moods.includes("차분함") || moods.includes("지적임")) {
    scores.legal += 0.28;
    scores.mystery += 0.2;
    scores.medical += 0.15;
  }
  if (moods.includes("강렬함") || moods.includes("화면 존재감")) {
    scores.crime += 0.24;
    scores.noir += 0.22;
    scores.thriller += 0.18;
  }
  if (moods.includes("부드러움") || moods.includes("친근함")) {
    scores.romance += 0.3;
    scores.youth += 0.24;
  }
  if (moods.includes("신비로움")) {
    scores.fantasy += 0.24;
    scores.mystery += 0.2;
  }
  if (moods.includes("세련됨")) {
    scores.noir += 0.2;
    scores.romance += 0.12;
  }

  for (const key of genreKeys) {
    scores[key] += pickNumber(seed, genreKeys.indexOf(key) + 10) * 0.18;
  }

  if (lowered.includes("office")) {
    scores.noir += 0.14;
    scores.legal += 0.1;
  }

  return normalizeScores(scores);
}

function buildRoleScores(seed: string, moods: MoodKey[]) {
  const scores: Record<RoleKey, number> = {
    lead: 0.34,
    support: 0.3,
    rival: 0.26,
  };

  if (moods.includes("화면 존재감") || moods.includes("강렬함")) {
    scores.lead += 0.24;
    scores.rival += 0.14;
  }
  if (moods.includes("친근함") || moods.includes("부드러움")) {
    scores.support += 0.22;
  }
  if (moods.includes("신비로움") || moods.includes("진지함")) {
    scores.rival += 0.18;
  }

  for (const key of roleKeys) {
    scores[key] += pickNumber(seed, roleKeys.indexOf(key) + 50) * 0.14;
  }

  return normalizeScores(scores);
}

function buildMockTopCharacters(
  seed: string,
  genreScores: AnalyzeFaceResult["genreScores"],
  roleScores: AnalyzeFaceResult["roleScores"],
  moods: MoodKey[],
) {
  const scored = characters
    .map((character) => {
      const genreWeight = character.matchingGenres.reduce((sum, genre) => {
        const matched = Object.entries(genreMeta).find(([, meta]) => meta.label === genre);
        return sum + (matched ? genreScores[matched[0] as GenreKey] : 0);
      }, 0);
      const roleWeight =
        character.roleType === "주인공"
          ? roleScores.lead
          : character.roleType === "라이벌"
            ? roleScores.rival
            : roleScores.support;
      const moodWeight = Object.entries(character.moodWeights).reduce((sum, [mood, weight]) => {
        return sum + (moods.includes(mood as MoodKey) ? weight ?? 0 : (weight ?? 0) * 0.24);
      }, 0);
      const variance = pickNumber(`${seed}:${character.id}`, 70) * 0.08;
      return {
        name: character.name,
        score: genreWeight * 0.42 + roleWeight * 0.32 + moodWeight * 0.16 + variance,
      };
    })
    .sort((left, right) => right.score - left.score)
    .slice(0, 5)
    .map((item) => item.name);

  return scored;
}

function buildMockSummary(moods: MoodKey[], genreScores: AnalyzeFaceResult["genreScores"]) {
  const [topGenre] = Object.entries(genreScores).sort((left, right) => right[1] - left[1]);
  const topGenreLabel = genreMeta[topGenre?.[0] as GenreKey]?.label ?? "드라마";
  const leadMood = moods[0] ?? "차분함";
  return `${leadMood} 분위기가 먼저 보이고, ${topGenreLabel} 장르에도 자연스럽게 어울리는 타입이에요.`;
}

function createMockAnalysisResult({
  fileName,
  imageDataUrl,
}: Pick<AnalyzeFaceParams, "fileName" | "imageDataUrl">): AnalyzeFaceResult {
  const seed = `${fileName}:${imageDataUrl?.slice(0, 180) ?? "no-image"}`;
  const moodTags = deriveMoodTags(seed, fileName);
  const genreScores = buildGenreScores(seed, fileName, moodTags);
  const roleScores = buildRoleScores(seed, moodTags);
  const topCharacters = buildMockTopCharacters(seed, genreScores, roleScores, moodTags);

  return {
    moodTags,
    genreScores,
    roleScores,
    topCharacters,
    shortSummary: buildMockSummary(moodTags, genreScores),
    cautionMessage: imageDataUrl
      ? undefined
      : "이미지 정보가 없어서 기본 모드로 결과를 만들었어요.",
  };
}

function normalizeScoreMap<T extends readonly string[]>(
  keys: T,
  input: unknown,
): Record<T[number], number> {
  const source = typeof input === "object" && input !== null ? input : {};
  return Object.fromEntries(
    keys.map((key) => [key, typeof (source as Record<string, unknown>)[key] === "number" ? (source as Record<string, number>)[key] : 0]),
  ) as Record<T[number], number>;
}

function normalizeResultPayload(input: unknown): AnalyzeFaceResult {
  const source = typeof input === "object" && input !== null ? input : {};
  const moodTags = Array.isArray((source as { moodTags?: unknown }).moodTags)
    ? (source as { moodTags: unknown[] }).moodTags.filter(
        (tag): tag is MoodKey => typeof tag === "string",
      )
    : [];
  const topCharacters = Array.isArray((source as { topCharacters?: unknown }).topCharacters)
    ? (source as { topCharacters: unknown[] }).topCharacters.filter(
        (item): item is string => typeof item === "string",
      )
    : [];

  if (
    moodTags.length < 3 ||
    topCharacters.length < 3 ||
    typeof (source as { shortSummary?: unknown }).shortSummary !== "string"
  ) {
    throw new Error("Invalid structured result");
  }

  return {
    moodTags: moodTags.slice(0, 5),
    genreScores: normalizeScoreMap(genreKeys, (source as { genreScores?: unknown }).genreScores),
    roleScores: normalizeScoreMap(roleKeys, (source as { roleScores?: unknown }).roleScores),
    topCharacters,
    shortSummary: (source as { shortSummary: string }).shortSummary,
    cautionMessage:
      typeof (source as { cautionMessage?: unknown }).cautionMessage === "string"
        ? (source as { cautionMessage: string }).cautionMessage
        : undefined,
  };
}

function extractJsonPayload(rawText: string) {
  try {
    return JSON.parse(rawText);
  } catch {
    const match = rawText.match(/\{[\s\S]*\}/);

    if (!match) {
      throw new Error("응답이 JSON 형식이 아니에요.");
    }

    return JSON.parse(match[0]);
  }
}

async function callVisionAPI(
  apiKey: string,
  fileName: string,
  imageDataUrl: string,
): Promise<AnalyzeFaceResult> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [
            {
              type: "input_text",
              text:
                "당신은 드라마 캐스팅 추천 어시스턴트입니다. 외모를 평가하거나 등급화하지 말고, 분위기와 캐릭터 무드만 바탕으로 한국어 JSON을 반환하세요.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: [
                "업로드된 얼굴 사진을 보고 드라마/영화 캐스팅 관점으로만 해석해 주세요.",
                "하지 말아야 할 것:",
                "- 외모의 좋고 나쁨 평가",
                "- 사람 점수화",
                "- 나이, 인종, 질병, 정치성향 등 민감한 추정",
                "해야 할 것:",
                "- 분위기, 인상, 무드, 장르 결, 역할 결만 설명",
                "- 결과는 엔터테인먼트용 캐릭터 추천으로 작성",
                "반드시 JSON만 반환하고, 설명 문장은 절대 쓰지 마세요.",
                "JSON 키는 moodTags, genreScores, roleScores, topCharacters, shortSummary, cautionMessage를 사용하세요.",
                `파일명 참고: ${fileName}`,
                `캐릭터 이름 목록: ${characters.map((character) => character.name).join(", ")}`,
              ].join("\n"),
            },
            {
              type: "input_image",
              image_url: imageDataUrl,
              detail: "high",
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "drama_casting_result",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`AI 요청 실패: ${response.status}`);
  }

  const payload = (await response.json()) as { output_text?: string };

  if (!payload.output_text) {
    throw new Error("AI 응답이 비어 있어요.");
  }

  return normalizeResultPayload(extractJsonPayload(payload.output_text));
}

export async function analyzeFace({
  fileName,
  imageDataUrl,
  mockMode = process.env.AI_MOCK_MODE !== "false",
}: AnalyzeFaceParams): Promise<AnalyzeFaceResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!mockMode && apiKey && imageDataUrl) {
    try {
      // Real AI integration point. Replace model or provider here later if needed.
      return await callVisionAPI(apiKey, fileName, imageDataUrl);
    } catch (error) {
      console.error("AI analyze fallback to mock:", error);
    }
  }

  return createMockAnalysisResult({ fileName, imageDataUrl });
}
