"use client";

import {
  FaceLandmarker,
  FilesetResolver,
  type FaceLandmarkerResult,
} from "@mediapipe/tasks-vision";

import type { Locale } from "@/lib/i18n";
import type { FaceValidationResult } from "@/types/result";

let landmarkerPromise: Promise<FaceLandmarker> | null = null;

async function getFaceLandmarker() {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const vision = await FilesetResolver.forVisionTasks("/mediapipe/wasm");

      return FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/mediapipe/models/face_landmarker.task",
        },
        runningMode: "IMAGE",
        numFaces: 2,
      });
    })();
  }

  return landmarkerPromise;
}

function getFaceRatio(result: FaceLandmarkerResult, width: number, height: number) {
  const box = result.faceLandmarks[0];

  if (!box) {
    return 0;
  }

  const xs = box.map((point) => point.x);
  const ys = box.map((point) => point.y);
  const faceWidth = (Math.max(...xs) - Math.min(...xs)) * width;
  const faceHeight = (Math.max(...ys) - Math.min(...ys)) * height;

  return (faceWidth * faceHeight) / (width * height);
}

function checkFrontal(result: FaceLandmarkerResult) {
  const landmarks = result.faceLandmarks[0];

  if (!landmarks) {
    return false;
  }

  const leftEye = landmarks[33];
  const rightEye = landmarks[263];
  const nose = landmarks[1];

  if (!leftEye || !rightEye || !nose) {
    return false;
  }

  const eyeMidX = (leftEye.x + rightEye.x) / 2;
  const eyeTilt = Math.abs(leftEye.y - rightEye.y);
  const noseOffset = Math.abs(nose.x - eyeMidX);

  return eyeTilt < 0.04 && noseOffset < 0.08;
}

export async function validateFaceImage(
  image: HTMLImageElement,
  locale: Locale = "ko",
): Promise<FaceValidationResult> {
  try {
    const landmarker = await getFaceLandmarker();
    const result = landmarker.detect(image);
    const faceCount = result.faceLandmarks.length;

    if (faceCount === 0) {
      return {
        canProceed: false,
        status: "error",
        message:
          locale === "en"
            ? "We couldn't find a face. Please upload a clearer photo."
            : locale === "ja"
              ? "顔を見つけられませんでした。顔がよく見える写真でもう一度お試しください。"
              : "얼굴을 찾지 못했어요. 얼굴이 잘 보이는 사진으로 다시 올려 주세요.",
        warnings: [],
        faceCount,
        confidence: 0,
        isFrontal: false,
      };
    }

    if (faceCount > 1) {
      return {
        canProceed: false,
        status: "error",
        message:
          locale === "en"
            ? "Please upload a photo with just one person."
            : locale === "ja"
              ? "一人だけ写っている写真でお試しください。"
              : "한 사람만 나온 사진으로 다시 올려 주세요.",
        warnings: [],
        faceCount,
        confidence: 0.5,
        isFrontal: false,
      };
    }

    const faceRatio = getFaceRatio(result, image.naturalWidth, image.naturalHeight);
    const isFrontal = checkFrontal(result);
    const warnings: string[] = [];

    if (faceRatio < 0.12) {
      warnings.push(
        locale === "en"
          ? "A closer face crop will usually give a more stable result."
          : locale === "ja"
            ? "顔がもう少し大きく写っている写真のほうが結果が安定しやすいです。"
            : "얼굴이 조금 더 크게 나온 사진이면 결과가 더 안정적이에요.",
      );
    }

    if (!isFrontal) {
      warnings.push(
        locale === "en"
          ? "A more front-facing photo usually makes the result feel more natural."
          : locale === "ja"
            ? "正面に近い写真のほうがキャラクター結果がより自然になります。"
            : "정면에 가까운 사진이면 캐릭터 결과가 더 자연스럽게 나와요.",
      );
    }

    return {
      canProceed: true,
      status: warnings.length > 0 ? "warning" : "success",
      message:
        warnings.length > 0
          ? locale === "en"
            ? "This photo is usable, but a clearer one may improve the result."
            : locale === "ja"
              ? "この写真でも進めますが、もう少し鮮明な写真だと結果がさらに安定します。"
              : "사진은 사용할 수 있어요. 다만 더 또렷한 사진이면 결과가 더 좋아질 수 있어요."
          : locale === "en"
            ? "Face check is complete. This photo is good to use."
            : locale === "ja"
              ? "顔チェックが終わりました。この写真でそのまま進めます。"
              : "얼굴 확인이 끝났어요. 이 사진으로 진행해도 괜찮아요.",
      warnings,
      faceCount,
      confidence: Number((Math.min(1, faceRatio * 2.8) * (isFrontal ? 1 : 0.82)).toFixed(2)),
      isFrontal,
    };
  } catch (error) {
    console.error("Face validation failed:", error);

    return {
      canProceed: true,
      status: "warning",
      message:
        locale === "en"
          ? "We skipped the automatic photo check this time, but you can still continue."
          : locale === "ja"
            ? "今回は自動チェックをスキップしましたが、そのまま結果を見ることはできます。"
            : "자동 점검은 이번에 건너뛰었어요. 결과는 그대로 볼 수 있어요.",
      warnings: [
        locale === "en"
          ? "Your photo is not necessarily the problem."
          : locale === "ja"
            ? "写真自体が問題というわけではありません。"
            : "사진이 잘못된 건 아니에요.",
        locale === "en"
          ? "Depending on the browser, this step can occasionally be skipped."
          : locale === "ja"
            ? "ブラウザ環境によっては、この段階が省略されることがあります。"
            : "브라우저 환경에 따라 이 단계가 가끔 생략될 수 있어요.",
      ],
      faceCount: 0,
      confidence: 0,
      isFrontal: false,
    };
  }
}
