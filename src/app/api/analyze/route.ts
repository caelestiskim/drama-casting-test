import { NextResponse } from "next/server";

import { callVisionAPI } from "@/lib/ai/classifyFaceType";
import { selectCharacter } from "@/lib/ai/selectCharacter";
import { fallbackClassify } from "@/lib/ai/fallbackClassifier";
import type { GenderPreference } from "@/types/result";

export const runtime = "nodejs";

type AnalyzeRequestBody = {
  fileName?: string;
  imageDataUrl?: string;
  genderPreference?: GenderPreference;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;

    if (!body.fileName) {
      return NextResponse.json({ error: "fileName is required" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const mockMode = process.env.AI_MOCK_MODE !== "false";

    // Stage 1: 얼굴 타입 분류
    let analysis = null;

    if (!mockMode && apiKey && body.imageDataUrl) {
      try {
        analysis = await callVisionAPI(apiKey, body.imageDataUrl);
      } catch (err) {
        console.error("Vision API failed, falling back:", err);
      }
    }

    if (!analysis) {
      analysis = fallbackClassify(body.genderPreference);
    }

    // Stage 2: 타입 내 캐릭터 선택
    const casting = selectCharacter(
      analysis.faceType,
      analysis.vector,
      body.genderPreference,
    );

    // summary를 분석 결과에서 채움
    casting.summary = analysis.summary;
    casting.isFallback = analysis.isFallback;

    return NextResponse.json({ result: casting });
  } catch (error) {
    console.error("Analyze API route failed:", error);
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}
