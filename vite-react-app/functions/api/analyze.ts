import { callVisionAPI } from "../../src/lib/ai/classifyFaceType";
import { fallbackClassify } from "../../src/lib/ai/fallbackClassifier";
import { selectCharacter } from "../../src/lib/ai/selectCharacter";
import type { GenderPreference } from "../../src/types/result";

type Env = {
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  AI_MOCK_MODE?: string;
};

type AnalyzeRequestBody = {
  fileName?: string;
  imageDataUrl?: string;
  genderPreference?: GenderPreference;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;

    if (!body.fileName) {
      return Response.json({ error: "fileName is required" }, { status: 400 });
    }

    if (!body.imageDataUrl) {
      return Response.json({ error: "imageDataUrl is required" }, { status: 400 });
    }

    if (!/^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(body.imageDataUrl)) {
      return Response.json({ error: "imageDataUrl must be an image data URL" }, { status: 400 });
    }

    const apiKey = env.OPENAI_API_KEY;
    const mockMode = env.AI_MOCK_MODE !== "false";
    let analysis = null;

    if (!mockMode && apiKey && body.imageDataUrl) {
      try {
        analysis = await callVisionAPI(apiKey, body.imageDataUrl, env.OPENAI_MODEL);
      } catch (error) {
        console.error("Vision API failed, falling back:", error);
      }
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

    return Response.json({ result: casting });
  } catch (error) {
    console.error("Analyze API route failed:", error);
    return Response.json({ error: "Failed to analyze image" }, { status: 500 });
  }
};
