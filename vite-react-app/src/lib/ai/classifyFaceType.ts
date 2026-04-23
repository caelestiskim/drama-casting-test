import type { FaceType, FaceVector } from "@/data/characters";
import type { FaceAnalysisResult } from "@/types/result";

type VisualFeatures = {
  skinTexture: "smooth" | "slightly_rough" | "rough" | "weathered";
  facialBuild: "delicate" | "average" | "solid" | "heavy";
  jawType: "soft_round" | "defined_slim" | "strong_angular" | "square_heavy";
  eyeExpression:
    | "warm_gentle"
    | "cold_piercing"
    | "intense_threatening"
    | "mysterious_deep"
    | "bright_youthful";
  facialHair: "none" | "light_stubble" | "neat_beard" | "thick_rough";
  overallPresence:
    | "approachable"
    | "cool_composed"
    | "imposing_tough"
    | "magnetic_intense"
    | "mysterious";
  skinClarity: "very_clear" | "clear" | "textured" | "very_textured";
  faceContour: "round_soft" | "oval_neutral" | "angular_refined" | "broad_heavy";
};

const featuresSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "skinTexture",
    "facialBuild",
    "jawType",
    "eyeExpression",
    "facialHair",
    "overallPresence",
    "skinClarity",
    "faceContour",
  ],
  properties: {
    skinTexture: { type: "string", enum: ["smooth", "slightly_rough", "rough", "weathered"] },
    facialBuild: { type: "string", enum: ["delicate", "average", "solid", "heavy"] },
    jawType: { type: "string", enum: ["soft_round", "defined_slim", "strong_angular", "square_heavy"] },
    eyeExpression: {
      type: "string",
      enum: ["warm_gentle", "cold_piercing", "intense_threatening", "mysterious_deep", "bright_youthful"],
    },
    facialHair: { type: "string", enum: ["none", "light_stubble", "neat_beard", "thick_rough"] },
    overallPresence: {
      type: "string",
      enum: ["approachable", "cool_composed", "imposing_tough", "magnetic_intense", "mysterious"],
    },
    skinClarity: { type: "string", enum: ["very_clear", "clear", "textured", "very_textured"] },
    faceContour: { type: "string", enum: ["round_soft", "oval_neutral", "angular_refined", "broad_heavy"] },
  },
} as const;

const SYSTEM_PROMPT = `
You are a careful visual feature analyst for a drama casting app.
Describe only directly observable face-photo features.
Do not infer attractiveness, race, age, personality, health, politics, or social traits.
Return JSON only.
`.trim();

const FEATURES_PROMPT = `
Analyze the face photo and output exactly these 8 fields using only the allowed enum values.

Guidelines:
- Base the answer only on visible facial structure and expression.
- If the photo is ambiguous, choose the most conservative visible option.
- Do not exaggerate.
- Do not mention anything outside the schema.

Field definitions:
1. skinTexture: smooth | slightly_rough | rough | weathered
2. facialBuild: delicate | average | solid | heavy
3. jawType: soft_round | defined_slim | strong_angular | square_heavy
4. eyeExpression: warm_gentle | cold_piercing | intense_threatening | mysterious_deep | bright_youthful
5. facialHair: none | light_stubble | neat_beard | thick_rough
6. overallPresence: approachable | cool_composed | imposing_tough | magnetic_intense | mysterious
7. skinClarity: very_clear | clear | textured | very_textured
8. faceContour: round_soft | oval_neutral | angular_refined | broad_heavy
`.trim();

const FACE_TYPE_PROTOTYPES: Record<FaceType, FaceVector> = {
  RUGGED: { power: 44, elegance: 6, intellect: 16, warmth: 10, mystery: 24 },
  SHARP_COOL: { power: 18, elegance: 24, intellect: 28, warmth: 8, mystery: 22 },
  WARM_FRIENDLY: { power: 10, elegance: 12, intellect: 16, warmth: 48, mystery: 14 },
  ELEGANT_REFINED: { power: 8, elegance: 46, intellect: 18, warmth: 16, mystery: 12 },
  INTELLECTUAL_SERIOUS: { power: 10, elegance: 16, intellect: 44, warmth: 10, mystery: 20 },
  SOFT_YOUTH: { power: 8, elegance: 18, intellect: 14, warmth: 44, mystery: 16 },
  MYSTERIOUS_DARK: { power: 14, elegance: 12, intellect: 18, warmth: 6, mystery: 50 },
  CHARISMATIC_INTENSE: { power: 34, elegance: 10, intellect: 18, warmth: 8, mystery: 30 },
};

const FEATURE_WEIGHTS: {
  [K in keyof VisualFeatures]: Record<VisualFeatures[K], FaceVector>;
} = {
  skinTexture: {
    smooth: { power: 4, elegance: 22, intellect: 10, warmth: 12, mystery: 6 },
    slightly_rough: { power: 10, elegance: 12, intellect: 12, warmth: 10, mystery: 8 },
    rough: { power: 20, elegance: 4, intellect: 10, warmth: 6, mystery: 12 },
    weathered: { power: 24, elegance: 2, intellect: 10, warmth: 4, mystery: 16 },
  },
  facialBuild: {
    delicate: { power: 4, elegance: 18, intellect: 10, warmth: 12, mystery: 8 },
    average: { power: 10, elegance: 10, intellect: 12, warmth: 10, mystery: 8 },
    solid: { power: 20, elegance: 6, intellect: 10, warmth: 8, mystery: 10 },
    heavy: { power: 24, elegance: 2, intellect: 8, warmth: 6, mystery: 12 },
  },
  jawType: {
    soft_round: { power: 4, elegance: 10, intellect: 8, warmth: 18, mystery: 6 },
    defined_slim: { power: 8, elegance: 22, intellect: 12, warmth: 8, mystery: 10 },
    strong_angular: { power: 20, elegance: 8, intellect: 12, warmth: 6, mystery: 10 },
    square_heavy: { power: 24, elegance: 4, intellect: 10, warmth: 4, mystery: 12 },
  },
  eyeExpression: {
    warm_gentle: { power: 4, elegance: 10, intellect: 8, warmth: 24, mystery: 6 },
    cold_piercing: { power: 10, elegance: 14, intellect: 22, warmth: 4, mystery: 12 },
    intense_threatening: { power: 24, elegance: 4, intellect: 10, warmth: 2, mystery: 14 },
    mysterious_deep: { power: 8, elegance: 10, intellect: 14, warmth: 2, mystery: 22 },
    bright_youthful: { power: 4, elegance: 12, intellect: 8, warmth: 22, mystery: 8 },
  },
  facialHair: {
    none: { power: 4, elegance: 14, intellect: 10, warmth: 10, mystery: 8 },
    light_stubble: { power: 12, elegance: 8, intellect: 10, warmth: 8, mystery: 10 },
    neat_beard: { power: 14, elegance: 8, intellect: 12, warmth: 6, mystery: 12 },
    thick_rough: { power: 24, elegance: 2, intellect: 10, warmth: 4, mystery: 12 },
  },
  overallPresence: {
    approachable: { power: 4, elegance: 8, intellect: 8, warmth: 26, mystery: 6 },
    cool_composed: { power: 8, elegance: 18, intellect: 18, warmth: 6, mystery: 10 },
    imposing_tough: { power: 28, elegance: 2, intellect: 8, warmth: 4, mystery: 10 },
    magnetic_intense: { power: 20, elegance: 8, intellect: 10, warmth: 4, mystery: 18 },
    mysterious: { power: 8, elegance: 10, intellect: 12, warmth: 2, mystery: 24 },
  },
  skinClarity: {
    very_clear: { power: 4, elegance: 20, intellect: 10, warmth: 10, mystery: 6 },
    clear: { power: 8, elegance: 14, intellect: 12, warmth: 10, mystery: 8 },
    textured: { power: 16, elegance: 6, intellect: 10, warmth: 8, mystery: 12 },
    very_textured: { power: 20, elegance: 4, intellect: 10, warmth: 4, mystery: 16 },
  },
  faceContour: {
    round_soft: { power: 4, elegance: 10, intellect: 8, warmth: 20, mystery: 6 },
    oval_neutral: { power: 8, elegance: 14, intellect: 12, warmth: 10, mystery: 8 },
    angular_refined: { power: 12, elegance: 20, intellect: 14, warmth: 6, mystery: 10 },
    broad_heavy: { power: 24, elegance: 4, intellect: 10, warmth: 4, mystery: 12 },
  },
};

function addVectors(a: FaceVector, b: FaceVector): FaceVector {
  return {
    power: a.power + b.power,
    elegance: a.elegance + b.elegance,
    intellect: a.intellect + b.intellect,
    warmth: a.warmth + b.warmth,
    mystery: a.mystery + b.mystery,
  };
}

function normalizeVector(raw: FaceVector): FaceVector {
  const values = [raw.power, raw.elegance, raw.intellect, raw.warmth, raw.mystery];
  const sum = values.reduce((total, value) => total + value, 0);

  if (sum <= 0) {
    return { power: 20, elegance: 20, intellect: 20, warmth: 20, mystery: 20 };
  }

  const normalized = values.map((value) => Math.round((value / sum) * 100));
  const diff = 100 - normalized.reduce((total, value) => total + value, 0);
  const maxIndex = normalized.indexOf(Math.max(...normalized));
  normalized[maxIndex] += diff;

  return {
    power: normalized[0],
    elegance: normalized[1],
    intellect: normalized[2],
    warmth: normalized[3],
    mystery: normalized[4],
  };
}

function cosineSimilarity(a: FaceVector, b: FaceVector) {
  const keys: (keyof FaceVector)[] = ["power", "elegance", "intellect", "warmth", "mystery"];
  const dot = keys.reduce((sum, key) => sum + a[key] * b[key], 0);
  const magA = Math.sqrt(keys.reduce((sum, key) => sum + a[key] ** 2, 0));
  const magB = Math.sqrt(keys.reduce((sum, key) => sum + b[key] ** 2, 0));

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (magA * magB);
}

function parseFeatures(raw: unknown): VisualFeatures {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("Features response is not an object.");
  }

  const record = raw as Record<string, unknown>;

  const features: VisualFeatures = {
    skinTexture: readEnum(record.skinTexture, ["smooth", "slightly_rough", "rough", "weathered"]),
    facialBuild: readEnum(record.facialBuild, ["delicate", "average", "solid", "heavy"]),
    jawType: readEnum(record.jawType, ["soft_round", "defined_slim", "strong_angular", "square_heavy"]),
    eyeExpression: readEnum(record.eyeExpression, [
      "warm_gentle",
      "cold_piercing",
      "intense_threatening",
      "mysterious_deep",
      "bright_youthful",
    ]),
    facialHair: readEnum(record.facialHair, ["none", "light_stubble", "neat_beard", "thick_rough"]),
    overallPresence: readEnum(record.overallPresence, [
      "approachable",
      "cool_composed",
      "imposing_tough",
      "magnetic_intense",
      "mysterious",
    ]),
    skinClarity: readEnum(record.skinClarity, ["very_clear", "clear", "textured", "very_textured"]),
    faceContour: readEnum(record.faceContour, ["round_soft", "oval_neutral", "angular_refined", "broad_heavy"]),
  };

  return features;
}

function readEnum<const T extends readonly string[]>(value: unknown, allowed: T): T[number] {
  if (typeof value !== "string" || !allowed.includes(value)) {
    throw new Error(`Unexpected enum value: ${String(value)}`);
  }

  return value as T[number];
}

function extractJson(rawText: string): unknown {
  try {
    return JSON.parse(rawText);
  } catch {
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("Could not find JSON in model response.");
    }

    return JSON.parse(match[0]);
  }
}

function buildVectorFromFeatures(features: VisualFeatures): FaceVector {
  let total: FaceVector = { power: 0, elegance: 0, intellect: 0, warmth: 0, mystery: 0 };

  total = addVectors(total, FEATURE_WEIGHTS.skinTexture[features.skinTexture]);
  total = addVectors(total, FEATURE_WEIGHTS.facialBuild[features.facialBuild]);
  total = addVectors(total, FEATURE_WEIGHTS.jawType[features.jawType]);
  total = addVectors(total, FEATURE_WEIGHTS.eyeExpression[features.eyeExpression]);
  total = addVectors(total, FEATURE_WEIGHTS.facialHair[features.facialHair]);
  total = addVectors(total, FEATURE_WEIGHTS.overallPresence[features.overallPresence]);
  total = addVectors(total, FEATURE_WEIGHTS.skinClarity[features.skinClarity]);
  total = addVectors(total, FEATURE_WEIGHTS.faceContour[features.faceContour]);

  return normalizeVector(total);
}

function pickFaceType(vector: FaceVector) {
  const ranked = Object.entries(FACE_TYPE_PROTOTYPES)
    .map(([faceType, prototype]) => ({
      faceType: faceType as FaceType,
      similarity: cosineSimilarity(vector, prototype),
    }))
    .sort((a, b) => b.similarity - a.similarity);

  const [best, second] = ranked;
  const margin = best.similarity - (second?.similarity ?? 0);
  const confidence = Math.max(0.42, Math.min(0.92, 0.58 + margin * 1.8));

  return {
    faceType: best.faceType,
    confidence: Number(confidence.toFixed(2)),
  };
}

function labelFeature<T extends string>(value: T, labels: Record<T, string>) {
  return labels[value];
}

function buildSummary(features: VisualFeatures, faceType: FaceType) {
  const faceTypeSummary: Record<FaceType, string> = {
    RUGGED: "강인하고 거친 화면 인상이 비교적 또렷한 편이에요.",
    SHARP_COOL: "선이 또렷하고 차분한 긴장감이 남는 편이에요.",
    WARM_FRIENDLY: "부드럽고 친근한 인상이 먼저 전해지는 편이에요.",
    ELEGANT_REFINED: "정돈되고 우아한 결이 비교적 선명하게 보이는 편이에요.",
    INTELLECTUAL_SERIOUS: "차분하고 진지한 분위기가 중심에 남는 편이에요.",
    SOFT_YOUTH: "맑고 부드러운 청춘형 인상이 비교적 강한 편이에요.",
    MYSTERIOUS_DARK: "설명보다 여운이 먼저 남는 신비로운 결이 보여요.",
    CHARISMATIC_INTENSE: "화면을 단번에 잡는 강한 존재감이 비교적 뚜렷해요.",
  };

  const eyeLabel = labelFeature(features.eyeExpression, {
    warm_gentle: "온화한 눈매",
    cold_piercing: "날카로운 시선",
    intense_threatening: "강한 압박감이 있는 눈빛",
    mysterious_deep: "깊고 읽기 어려운 시선",
    bright_youthful: "밝고 생기 있는 눈매",
  });

  const contourLabel = labelFeature(features.faceContour, {
    round_soft: "부드러운 얼굴 윤곽",
    oval_neutral: "무난한 타원형 윤곽",
    angular_refined: "정돈된 각진 윤곽",
    broad_heavy: "넓고 묵직한 윤곽",
  });

  const presenceLabel = labelFeature(features.overallPresence, {
    approachable: "편안한 분위기",
    cool_composed: "정제된 침착함",
    imposing_tough: "강한 압도감",
    magnetic_intense: "강한 몰입감",
    mysterious: "쉽게 읽히지 않는 분위기",
  });

  return `${faceTypeSummary[faceType]} ${eyeLabel}, ${contourLabel}, ${presenceLabel}이 함께 보입니다.`;
}

function isImageDataUrl(value: string) {
  return /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(value);
}

export async function callVisionAPI(
  apiKey: string,
  imageDataUrl: string,
  model = "gpt-4.1-mini",
): Promise<FaceAnalysisResult> {
  if (!isImageDataUrl(imageDataUrl)) {
    throw new Error("Only image data URLs are supported.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: FEATURES_PROMPT },
            { type: "input_image", image_url: imageDataUrl, detail: "high" },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "face_visual_features",
          strict: true,
          schema: featuresSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Vision API request failed: ${response.status} ${text}`);
  }

  const payload = (await response.json()) as { output_text?: string };

  if (!payload.output_text) {
    throw new Error("Vision API returned an empty response.");
  }

  const features = parseFeatures(extractJson(payload.output_text));
  const vector = buildVectorFromFeatures(features);
  const { faceType, confidence } = pickFaceType(vector);

  return {
    faceType,
    confidence,
    vector,
    summary: buildSummary(features, faceType),
  };
}
