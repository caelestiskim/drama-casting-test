import { NextResponse } from "next/server";

import { analyzeFace } from "@/lib/ai/analyzeFace";

export const runtime = "nodejs";

type AnalyzeRequestBody = {
  fileName?: string;
  imageDataUrl?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequestBody;

    if (!body.fileName) {
      return NextResponse.json(
        { error: "fileName is required" },
        { status: 400 },
      );
    }

    const result = await analyzeFace({
      fileName: body.fileName,
      imageDataUrl: body.imageDataUrl,
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Analyze API route failed:", error);

    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 },
    );
  }
}
