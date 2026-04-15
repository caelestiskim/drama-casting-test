import "server-only";

import type { FaceAnalysisResult, FaceVector } from "@/types/result";
import type { FaceType } from "@/data/characters";

const VALID_FACE_TYPES: FaceType[] = [
  "RUGGED",
  "SHARP_COOL",
  "WARM_FRIENDLY",
  "ELEGANT_REFINED",
  "INTELLECTUAL_SERIOUS",
  "SOFT_YOUTH",
  "MYSTERIOUS_DARK",
  "CHARISMATIC_INTENSE",
];

const responseSchema = {
  type: "object",
  additionalProperties: false,
  required: ["faceType", "confidence", "vector", "summary"],
  properties: {
    faceType: {
      type: "string",
      enum: VALID_FACE_TYPES,
    },
    confidence: { type: "number" },
    vector: {
      type: "object",
      additionalProperties: false,
      required: ["power", "elegance", "intellect", "warmth", "mystery"],
      properties: {
        power: { type: "number" },
        elegance: { type: "number" },
        intellect: { type: "number" },
        warmth: { type: "number" },
        mystery: { type: "number" },
      },
    },
    summary: { type: "string" },
  },
} as const;

const SYSTEM_PROMPT = `
당신은 한국 드라마 캐스팅 전문가입니다.
사진 속 인물의 인상/분위기를 분석하여 드라마 캐릭터 유형을 분류합니다.
외모 평가나 등급 매기기는 절대 하지 않으며, 반드시 JSON만 반환합니다.
`.trim();

const USER_PROMPT = `
업로드된 얼굴 사진을 보고 드라마 캐스팅 관점으로만 분석해 주세요.

[1단계] 아래 8개 유형 중 사진에 가장 가까운 하나만 선택하세요.
반드시 대표 인물 느낌과 비교하여 판단하세요:

- RUGGED: 거칠고 강인한 인상 (마동석, 정만식, 박성웅 같은 유형)
- SHARP_COOL: 날카롭고 차가운 인상 (이병헌, 공유, 현빈 같은 유형)
- WARM_FRIENDLY: 따뜻하고 친근한 인상 (조정석, 류준열, 이선균 같은 유형)
- ELEGANT_REFINED: 우아하고 정돈된 인상 (전지현, 손예진, 김태희 같은 유형)
- INTELLECTUAL_SERIOUS: 지적이고 진지한 인상 (조승우, 김명민, 전도연 같은 유형)
- SOFT_YOUTH: 부드럽고 청춘적인 인상 (박보영, 박보검, 아이유 같은 유형)
- MYSTERIOUS_DARK: 신비롭고 어두운 인상 (이준기, 고수, 서예지 같은 유형)
- CHARISMATIC_INTENSE: 강렬하고 카리스마 있는 인상 (황정민, 최민식, 송강호 같은 유형)

[2단계] 아래 5차원을 채점하세요. 합계는 반드시 정확히 100입니다.
- power: 강인함/터프함 (근육질, 위협적 존재감, 거친 분위기)
- elegance: 우아함/세련됨 (정돈된 이목구비, 도시적, 귀족적)
- intellect: 지성/냉철함 (예리한 눈빛, 분석적, 냉정한 인상)
- warmth: 감성/친근함 (온화한 눈빛, 부드러운 미소, 편안한 분위기)
- mystery: 신비/어두움 (속을 알 수 없는 눈빛, 복잡한 분위기)

중요한 판단 원칙:
- 명확히 보이는 특성에만 집중하세요. 애매하게 여러 쪽을 주면 결과가 흐려집니다.
- 한 특성이 50점 이상이어도 좋습니다. 지배적인 인상이 있다면 그것을 강하게 반영하세요.
- 절대로 외모의 좋고 나쁨을 평가하지 마세요.
- 나이, 인종, 질병, 정치성향 등 민감한 추정은 하지 마세요.

반환 형식 (JSON만, 설명 없이):
{
  "faceType": "RUGGED",
  "confidence": 0.88,
  "vector": { "power": 55, "elegance": 8, "intellect": 15, "warmth": 12, "mystery": 10 },
  "summary": "굵고 강한 인상으로 액션이나 범죄 장르에 자연스럽게 어울립니다."
}
`.trim();

function normalizeVector(raw: Record<string, unknown>): FaceVector {
  const p = typeof raw.power === "number" ? raw.power : 20;
  const e = typeof raw.elegance === "number" ? raw.elegance : 20;
  const i = typeof raw.intellect === "number" ? raw.intellect : 20;
  const w = typeof raw.warmth === "number" ? raw.warmth : 20;
  const m = typeof raw.mystery === "number" ? raw.mystery : 20;

  const sum = p + e + i + w + m;
  if (sum === 0) return { power: 20, elegance: 20, intellect: 20, warmth: 20, mystery: 20 };

  const scale = 100 / sum;
  // 반올림 후 합계가 정확히 100이 되도록 최대값 조정
  const values = [p, e, i, w, m].map((v) => Math.round(v * scale));
  const diff = 100 - values.reduce((a, b) => a + b, 0);
  const maxIdx = values.indexOf(Math.max(...values));
  values[maxIdx] += diff;

  return {
    power: values[0],
    elegance: values[1],
    intellect: values[2],
    warmth: values[3],
    mystery: values[4],
  };
}

function parseResponse(raw: unknown): FaceAnalysisResult {
  if (typeof raw !== "object" || raw === null) {
    throw new Error("응답이 객체 형식이 아닙니다.");
  }

  const obj = raw as Record<string, unknown>;
  const faceType = obj.faceType;

  if (typeof faceType !== "string" || !VALID_FACE_TYPES.includes(faceType as FaceType)) {
    throw new Error(`유효하지 않은 faceType: ${String(faceType)}`);
  }

  const rawVector = obj.vector;
  if (typeof rawVector !== "object" || rawVector === null) {
    throw new Error("vector 필드가 없거나 잘못된 형식입니다.");
  }

  const vector = normalizeVector(rawVector as Record<string, unknown>);
  const confidence = typeof obj.confidence === "number" ? Math.min(1, Math.max(0, obj.confidence)) : 0.7;
  const summary = typeof obj.summary === "string" ? obj.summary : "";

  return { faceType: faceType as FaceType, confidence, vector, summary };
}

function extractJson(rawText: string): unknown {
  try {
    return JSON.parse(rawText);
  } catch {
    const match = rawText.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("응답에서 JSON을 찾지 못했습니다.");
    return JSON.parse(match[0]);
  }
}

export async function callVisionAPI(
  apiKey: string,
  imageDataUrl: string,
): Promise<FaceAnalysisResult> {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: USER_PROMPT },
            { type: "input_image", image_url: imageDataUrl, detail: "high" },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "face_analysis_result",
          strict: true,
          schema: responseSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Vision API 요청 실패: ${response.status}`);
  }

  const payload = (await response.json()) as { output_text?: string };
  if (!payload.output_text) {
    throw new Error("Vision API 응답이 비어 있습니다.");
  }

  return parseResponse(extractJson(payload.output_text));
}
