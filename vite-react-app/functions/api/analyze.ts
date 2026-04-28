import { callVisionAPI } from "../../src/lib/ai/classifyFaceType";
import { selectCharacter } from "../../src/lib/ai/selectCharacter";
import { fallbackClassify } from "../../src/lib/ai/fallbackClassifier";
import type { GenderPreference } from "../../src/types/result";

interface Env {
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  AI_MOCK_MODE?: string;
}

type AnalyzeRequestBody = {
  fileName?: string;
  imageDataUrl?: string;
  genderPreference?: GenderPreference;
};

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  try {
    const body = (await request.json()) as AnalyzeRequestBody;

    if (!body.fileName) {
      return json({ error: "fileName is required" }, 400);
    }

    const apiKey = env.OPENAI_API_KEY;
    const mockMode = env.AI_MOCK_MODE === "true";
    const model = env.OPENAI_MODEL;

    let analysis = null;
    let apiError: string | null = null;

    if (!mockMode && apiKey && body.imageDataUrl) {
      try {
        analysis = await callVisionAPI(apiKey, body.imageDataUrl, model);
      } catch (err) {
        apiError = err instanceof Error ? err.message : String(err);
        console.error("[analyze] Vision API failed:", apiError);
      }
    } else if (!apiKey) {
      apiError = "OPENAI_API_KEY가 설정되지 않았습니다.";
      console.warn("[analyze]", apiError);
    }

    if (!analysis) {
      analysis = fallbackClassify(body.genderPreference);
    }

    const casting = selectCharacter(
      analysis.faceType,
      analysis.vector,
      body.genderPreference,
    );

    casting.summary = analysis.summary;
    casting.isFallback = analysis.isFallback;

    return json({
      result: casting,
      _debug: apiError ? { error: apiError } : undefined,
    });
  } catch (error) {
    console.error("[analyze] Route failed:", error);
    return json({ error: "Failed to analyze image" }, 500);
  }
}
