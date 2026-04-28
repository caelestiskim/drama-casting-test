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

const SYSTEM_PROMPT = `
당신은 한국 드라마 캐스팅 전문가입니다.
사진 속 인물의 인상/분위기를 분석하여 드라마 캐릭터 유형을 분류합니다.
외모 평가나 등급 매기기는 절대 하지 않으며, 반드시 JSON만 반환합니다.
`.trim();

const USER_PROMPT = `
업로드된 얼굴 사진을 보고 드라마 캐스팅 관점으로만 분석해 주세요.

[1단계 — reasoning: 분석 과정 서술 (사용자에게 표시 안 됨)]
- 이 사람의 가장 지배적인 인상 특징 1~2가지
- 8개 유형 중 가장 가까운 유형과 이유
- 벡터의 지배적 차원과 수치 근거

[2단계 — faceType 선택]
아래 8개 유형 중 하나만 선택:
- RUGGED: 거칠고 강인한 인상 (마동석, 정만식, 박성웅)
- SHARP_COOL: 날카롭고 차가운 인상 (이병헌, 공유, 현빈)
- WARM_FRIENDLY: 따뜻하고 친근한 인상 (조정석, 류준열, 이선균)
- ELEGANT_REFINED: 우아하고 정돈된 인상 (전지현, 손예진, 김태희)
- INTELLECTUAL_SERIOUS: 지적이고 진지한 인상 (조승우, 김명민, 전도연)
- SOFT_YOUTH: 부드럽고 청춘적인 인상 (박보영, 박보검, 아이유)
- MYSTERIOUS_DARK: 신비롭고 어두운 인상 (이준기, 고수, 서예지)
- CHARISMATIC_INTENSE: 강렬하고 카리스마 있는 인상 (황정민, 최민식, 송강호)

[3단계 — vector 채점 (합계 반드시 100)]
- power: 강인함/터프함
- elegance: 우아함/세련됨
- intellect: 지성/냉철함
- warmth: 감성/친근함
- mystery: 신비/어두움

채점 원칙:
- 지배적인 특성이 명확하면 해당 차원에 35~55점 부여
- 각 차원 최솟값 8 이상 (0점 금지 — 시각화 품질에 영향)
- 5개 차원 합계 반드시 100
- 외모 좋고 나쁨, 나이, 인종 추정 금지

[4단계 — summary: 한 문장으로 드라마 역할 분위기 서술]
`.trim();

// OpenAI Structured Output 스키마 (소문자 타입명, additionalProperties: false 필수)
const OPENAI_RESPONSE_FORMAT = {
  type: "json_schema",
  json_schema: {
    name: "face_analysis",
    strict: true,
    schema: {
      type: "object",
      properties: {
        reasoning:  { type: "string" },
        faceType:   { type: "string", enum: VALID_FACE_TYPES },
        confidence: { type: "number" },
        vector: {
          type: "object",
          properties: {
            power:     { type: "number" },
            elegance:  { type: "number" },
            intellect: { type: "number" },
            warmth:    { type: "number" },
            mystery:   { type: "number" },
          },
          required: ["power", "elegance", "intellect", "warmth", "mystery"],
          additionalProperties: false,
        },
        summary: { type: "string" },
      },
      required: ["reasoning", "faceType", "confidence", "vector", "summary"],
      additionalProperties: false,
    },
  },
} as const;

function normalizeVector(raw: Record<string, unknown>): FaceVector {
  const p = typeof raw.power     === "number" ? raw.power     : 20;
  const e = typeof raw.elegance  === "number" ? raw.elegance  : 20;
  const i = typeof raw.intellect === "number" ? raw.intellect : 20;
  const w = typeof raw.warmth    === "number" ? raw.warmth    : 20;
  const m = typeof raw.mystery   === "number" ? raw.mystery   : 20;

  // 최솟값 10 보장 — 그래프에서 0점이 나와 꼭짓점이 사라지는 현상 방지
  const FLOOR = 10;
  const floored = [p, e, i, w, m].map((v) => Math.max(FLOOR, v));

  const sum = floored.reduce((a, b) => a + b, 0);
  if (sum === 0) return { power: 20, elegance: 20, intellect: 20, warmth: 20, mystery: 20 };

  const scale = 100 / sum;
  const values = floored.map((v) => Math.round(v * scale));
  const diff = 100 - values.reduce((a, b) => a + b, 0);
  values[values.indexOf(Math.max(...values))] += diff;

  return { power: values[0], elegance: values[1], intellect: values[2], warmth: values[3], mystery: values[4] };
}

function parseResponse(raw: unknown): FaceAnalysisResult {
  if (typeof raw !== "object" || raw === null) throw new Error("응답이 객체 형식이 아닙니다.");

  const obj = raw as Record<string, unknown>;
  const faceType = obj.faceType;

  if (typeof faceType !== "string" || !VALID_FACE_TYPES.includes(faceType as FaceType)) {
    throw new Error(`유효하지 않은 faceType: ${String(faceType)}`);
  }

  const rawVector = obj.vector;
  if (typeof rawVector !== "object" || rawVector === null) throw new Error("vector 필드가 없거나 잘못된 형식입니다.");

  const vector = normalizeVector(rawVector as Record<string, unknown>);
  const confidence = typeof obj.confidence === "number" ? Math.min(1, Math.max(0, obj.confidence)) : 0.7;
  const summary = typeof obj.summary === "string" ? obj.summary : "";

  return { faceType: faceType as FaceType, confidence, vector, summary };
}

function extractJson(rawText: string): unknown {
  const trimmed = rawText.trim();
  try { return JSON.parse(trimmed); } catch { /* continue */ }
  const stripped = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try { return JSON.parse(stripped); } catch { /* continue */ }
  const match = stripped.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("응답에서 JSON을 찾지 못했습니다.");
  return JSON.parse(match[0]);
}

// 모델 폴백 체인
// gpt-4o-mini : ✅ vision + structured output, 저렴 (primary)
// gpt-4o      : ✅ 더 정확, 비용 높음 (fallback)
const FALLBACK_MODELS = [
  "gpt-4o-mini",
  "gpt-4o",
] as const;

async function callSingleModel(
  apiKey: string,
  modelName: string,
  imageDataUrl: string,
): Promise<{ result: FaceAnalysisResult; usedModel: string }> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: USER_PROMPT },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
                detail: "low", // 비용 절감 — 얼굴 분류에는 충분
              },
            },
          ],
        },
      ],
      response_format: OPENAI_RESPONSE_FORMAT,
      temperature: 0.3,
      max_tokens: 800,
    }),
  });

  // 429 쿼터/속도 초과, 503 과부하 → 다음 모델로 폴백
  if (response.status === 429 || response.status === 503) {
    const body = await response.text().catch(() => "");
    const err = new Error(`Vision API 요청 실패 [${modelName}]: ${response.status} ${body}`);
    (err as Error & { retriable: boolean }).retriable = true;
    throw err;
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Vision API 요청 실패 [${modelName}]: ${response.status} ${body}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{
      message?: { content?: string | null };
      finish_reason?: string;
    }>;
    error?: { message: string };
  };

  if (payload.error) throw new Error(`OpenAI 오류 [${modelName}]: ${payload.error.message}`);

  const text = payload.choices?.[0]?.message?.content;

  // 빈 응답 (content filter 등) → 다음 모델로 폴백
  if (!text) {
    const finishReason = payload.choices?.[0]?.finish_reason ?? "UNKNOWN";
    const err = new Error(`OpenAI 응답 비어있음 [${modelName}] finish_reason=${finishReason}`);
    (err as Error & { retriable: boolean }).retriable = true;
    throw err;
  }

  try {
    return { result: parseResponse(extractJson(text)), usedModel: modelName };
  } catch (parseErr) {
    // Structured Output이 활성화된 경우 파싱 실패는 드물지만, 방어적으로 처리
    console.warn(
      `[Vision] ${modelName} JSON 파싱 실패 → 다음 모델 시도. 원본 응답(앞 300자):`,
      text.slice(0, 300),
    );
    const err = new Error(
      `JSON 파싱 실패 [${modelName}]: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`,
    );
    (err as Error & { retriable: boolean }).retriable = true;
    throw err;
  }
}

export async function callVisionAPI(
  apiKey: string,
  imageDataUrl: string,
  preferredModel?: string,
): Promise<FaceAnalysisResult> {
  // 선호 모델을 폴백 체인 맨 앞에 배치 (중복 제거)
  const chain = preferredModel
    ? [preferredModel, ...FALLBACK_MODELS.filter((m) => m !== preferredModel)]
    : [...FALLBACK_MODELS];

  let lastError: Error | null = null;

  for (const modelName of chain) {
    try {
      const { result, usedModel } = await callSingleModel(apiKey, modelName, imageDataUrl);
      if (usedModel !== chain[0]) {
        console.info(`[Vision] 폴백 모델 사용: ${usedModel} (1순위 ${chain[0]} 쿼터 초과)`);
      }
      return result;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      const isRetriable = (err as Error & { retriable?: boolean }).retriable === true;
      if (!isRetriable) {
        throw lastError;
      }
      console.warn(`[Vision] ${modelName} 일시적 오류 → 다음 모델 시도`);
    }
  }

  throw lastError ?? new Error("모든 OpenAI 모델 호출에 실패했습니다.");
}
