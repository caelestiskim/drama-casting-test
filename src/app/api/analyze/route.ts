export const runtime = "edge";

import { NextResponse } from "next/server";

import { callVisionAPI } from "@/lib/ai/classifyFaceType";
import { selectCharacter } from "@/lib/ai/selectCharacter";
import { fallbackClassify } from "@/lib/ai/fallbackClassifier";
import type { GenderPreference } from "@/types/result";

// nodejs 런타임 유지 — edge는 request body 크기 제한이 있어 큰 이미지 base64 처리 불가
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
    const mockMode = process.env.AI_MOCK_MODE === "true";
    const model = process.env.OPENAI_MODEL; // 미설정 시 기본 폴백 체인 사용

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
      apiError = "OPENAI_API_KEY가 설정되지 않았습니다. .env.local을 확인하세요.";
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

    return NextResponse.json({
      result: casting,
      // 개발 디버그용 — 프로덕션에서도 문제 파악에 도움
      _debug: apiError ? { error: apiError } : undefined,
    });
  } catch (error) {
    console.error("[analyze] Route failed:", error);
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}
