"use client";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { getCopy } from "@/lib/copy";
import { buildLocalePath, type Locale } from "@/lib/i18n";
import { validateFaceImage } from "@/lib/face/validateFace";
import {
  CASTING_RESULT_CACHE_KEY,
  UPLOADED_FACE_GENDER_KEY,
  UPLOADED_FACE_IMAGE_KEY,
  UPLOADED_FACE_NAME_KEY,
} from "@/lib/upload-storage";
import type { FaceValidationResult, GenderPreference } from "@/types/result";

const MAX_SOURCE_IMAGE_BYTES = 25 * 1024 * 1024;
const MAX_COMPRESSED_EDGE = 1280;
const TARGET_COMPRESSED_BYTES = 900 * 1024;
const MIN_JPEG_QUALITY = 0.68;

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("Failed to read image file."));
    };

    reader.onerror = () => reject(new Error("Failed to read image file."));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = dataUrl;
  });
}

function canvasToDataUrl(canvas: HTMLCanvasElement, quality: number) {
  return canvas.toDataURL("image/jpeg", quality);
}

async function compressImageDataUrl(dataUrl: string) {
  const image = await loadImage(dataUrl);
  const scale = Math.min(1, MAX_COMPRESSED_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Failed to prepare image canvas.");
  }

  canvas.width = width;
  canvas.height = height;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  let quality = 0.86;
  let compressed = canvasToDataUrl(canvas, quality);

  while (compressed.length > TARGET_COMPRESSED_BYTES * 1.34 && quality > MIN_JPEG_QUALITY) {
    quality = Math.max(MIN_JPEG_QUALITY, quality - 0.06);
    compressed = canvasToDataUrl(canvas, quality);
  }

  return compressed;
}

async function compressImageFile(file: File) {
  const dataUrl = await readFileAsDataUrl(file);
  return compressImageDataUrl(dataUrl);
}

export function UploadPanel({ locale }: { locale: Locale }) {
  const navigate = useNavigate();
  const copy = getCopy(locale);
  const t = copy.uploadPanel;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [fileName, setFileName] = useState<string>(t.noFile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validation, setValidation] = useState<FaceValidationResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genderPreference, setGenderPreference] = useState<GenderPreference>("female");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trustChips = [
    locale === "ko" ? "무료" : locale === "ja" ? "無料" : "Free",
    "JPG · PNG · HEIC",
    locale === "ko" ? "자동 압축" : locale === "ja" ? "自動圧縮" : "Auto-compress",
    locale === "ko"
      ? "사진 저장 안 함"
      : locale === "ja"
        ? "写真は保存しません"
        : "No photo storage",
  ];
  const toneOptions = [
    {
      value: "female" as GenderPreference,
      label: t.toneFemale,
      sparkleA: "♥",
      sparkleB: "✿",
      badgeStyle: "background: linear-gradient(135deg,#a8275a 0%,#ff709f 100%); box-shadow:0 8px 16px rgba(168,39,90,0.28)",
      shellStyle: "background:#ffffff; box-shadow:0 8px 24px rgba(168,39,90,0.14)",
      shellStyleInactive: "background:#ffffff; opacity:0.7",
      sparkleColor: "#a8275a",
    },
    {
      value: "male" as GenderPreference,
      label: t.toneMale,
      sparkleA: "✦",
      sparkleB: "◆",
      badgeStyle: "background: linear-gradient(135deg,#6448b2 0%,#9c7fe8 100%); box-shadow:0 8px 16px rgba(100,72,178,0.28)",
      shellStyle: "background:#ffffff; box-shadow:0 8px 24px rgba(100,72,178,0.14)",
      shellStyleInactive: "background:#ffffff; opacity:0.7",
      sparkleColor: "#6448b2",
    },
  ];

  useEffect(() => {
    return () => {
      cameraStream?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraStream]);

  useEffect(() => {
    setIsMobileDevice(/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent));
  }, []);

  useEffect(() => {
    if (!isCameraOpen || !cameraStream || !videoRef.current) {
      return;
    }

    videoRef.current.srcObject = cameraStream;
    void videoRef.current.play().catch(() => undefined);
  }, [cameraStream, isCameraOpen]);

  useEffect(() => {
    window.sessionStorage.setItem(UPLOADED_FACE_GENDER_KEY, genderPreference);
  }, [genderPreference]);

  const clearStoredUpload = () => {
    window.sessionStorage.removeItem(UPLOADED_FACE_IMAGE_KEY);
    window.sessionStorage.removeItem(UPLOADED_FACE_NAME_KEY);
    window.sessionStorage.removeItem(UPLOADED_FACE_GENDER_KEY);
    // 새 사진 업로드 시 이전 분석 캐시 제거
    window.sessionStorage.removeItem(CASTING_RESULT_CACHE_KEY);
  };

  const processImage = async (dataUrl: string, sourceFileName: string) => {
    setIsChecking(true);
    setValidation(null);
    setFileName(sourceFileName);

    try {
      const image = await loadImage(dataUrl);
      const faceResult = await validateFaceImage(image, locale);

      setPreviewUrl(dataUrl);
      setValidation(faceResult);

      if (faceResult.canProceed) {
        // 새 이미지 저장 시 이전 분석 캐시 반드시 삭제
        window.sessionStorage.removeItem(CASTING_RESULT_CACHE_KEY);
        window.sessionStorage.setItem(UPLOADED_FACE_IMAGE_KEY, dataUrl);
        window.sessionStorage.setItem(UPLOADED_FACE_NAME_KEY, sourceFileName);
        if (genderPreference) {
          window.sessionStorage.setItem(UPLOADED_FACE_GENDER_KEY, genderPreference);
        }
      } else {
        clearStoredUpload();
      }
    } catch (error) {
      console.error(error);
      clearStoredUpload();
      setValidation({
        canProceed: false,
        status: "error",
        message: t.filePrepError,
        warnings: [],
        faceCount: 0,
        confidence: 0,
        isFrontal: false,
      });
      clearStoredUpload();
    } finally {
      setIsChecking(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    if (file.size > MAX_SOURCE_IMAGE_BYTES) {
      setValidation({
        canProceed: false,
        status: "error",
        message:
          locale === "ko"
            ? "25MB 이하 사진으로 다시 올려 주세요."
            : locale === "ja"
              ? "25MB以下の写真で再度アップロードしてください。"
              : "Please upload a photo under 25MB.",
        warnings: [],
        faceCount: 0,
        confidence: 0,
        isFrontal: false,
      });
      return;
    }

    try {
      const dataUrl = await compressImageFile(file);
      await processImage(dataUrl, file.name);
    } catch (error) {
      console.error(error);
      clearStoredUpload();
      setValidation({
        canProceed: false,
        status: "error",
        message: t.filePrepError,
        warnings: [],
        faceCount: 0,
        confidence: 0,
        isFrontal: false,
      });
    }
  };

  const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_SOURCE_IMAGE_BYTES) {
      setValidation({
        canProceed: false,
        status: "error",
        message:
          locale === "ko"
            ? "25MB 이하 사진으로 다시 올려 주세요."
            : locale === "ja"
              ? "25MB以下の写真でアップロードし直してください。"
              : "Please upload a photo under 25MB.",
        warnings: [],
        faceCount: 0,
        confidence: 0,
        isFrontal: false,
      });
      return;
    }

    try {
      const dataUrl = await compressImageFile(file);
      await processImage(dataUrl, file.name);
    } catch (error) {
      console.error(error);
      clearStoredUpload();
      setValidation({
        canProceed: false,
        status: "error",
        message: t.filePrepError,
        warnings: [],
        faceCount: 0,
        confidence: 0,
        isFrontal: false,
      });
    }

    event.target.value = "";
  };

  const closeCamera = () => {
    cameraStream?.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
    setIsCameraOpen(false);
  };

  const handleOpenCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(t.webcamNotSupported);
      return;
    }

    setCameraError(null);
    setIsCameraStarting(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
        },
        audio: false,
      });

      setCameraStream(stream);
      setIsCameraOpen(true);
    } catch (error) {
      console.error(error);
      setCameraError(t.webcamOpenError);
    } finally {
      setIsCameraStarting(false);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError(t.captureError);
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = await compressImageDataUrl(canvas.toDataURL("image/jpeg", 0.92));

    closeCamera();
    await processImage(dataUrl, `camera-shot-${Date.now()}.jpg`);
  };

  const handleSubmit = () => {
    if (!validation?.canProceed || !genderPreference) {
      return;
    }

    setIsSubmitting(true);
    window.sessionStorage.setItem(UPLOADED_FACE_GENDER_KEY, genderPreference);
    navigate(buildLocalePath(locale, "/result"));
  };

  return (
    <section
      className="relative overflow-hidden rounded-[2.2rem] p-6 sm:p-8"
      style={{ background: "#ffffff", boxShadow: "0 12px 48px rgba(45,47,48,0.07)" }}
    >
      {/* 배경 블러 오브 */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #ffc8dc, transparent 70%)" }} />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #d8caff, transparent 70%)" }} />

      <div className="relative">
        {/* 스텝 배지 */}
        <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ background: "#fde8f0", color: "#a8275a" }}>
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#a8275a" }} />
          {t.eyebrow}
        </div>

        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.1rem]"
          style={{ color: "#2d2f30", letterSpacing: "-0.02em" }}>
          {t.title}
        </h2>
        <p className="mt-3 max-w-lg text-[15px] leading-[1.7]" style={{ color: "#7a7d80" }}>
          {t.description}
        </p>

        {/* 트러스트 칩 */}
        <div className="mt-5 flex flex-wrap gap-2">
          {trustChips.map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold"
              style={{ background: "#f3eef2", color: "#6448b2" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#a8275a" }} />
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* 성별 선택 — 배경 전환으로 구분 (no border) */}
      <div className="mt-6 rounded-[1.9rem] p-5"
        style={{ background: "#f3eef2" }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#a8275a" }}>
          {t.characterTone}
        </p>
        <p className="mt-1.5 text-xs leading-5" style={{ color: "#9c8fa0" }}>{t.toneHint}</p>
        <fieldset className="mt-4">
          <legend className="sr-only">{t.characterTone}</legend>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((option) => {
              const isSelected = genderPreference === option.value;
              const inputId = `tone-${option.value}`;

              return (
                <div key={option.value}>
                  <input
                    id={inputId}
                    type="radio"
                    name="genderPreference"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => setGenderPreference(option.value)}
                    className="sr-only"
                  />
                  <label
                    htmlFor={inputId}
                    className="flex min-h-[88px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[1.4rem] px-4 py-4 text-center transition-all duration-200 hover:scale-[1.02]"
                    style={isSelected ? { ...Object.fromEntries(option.shellStyle.split(";").filter(Boolean).map(s => { const [k, ...v] = s.trim().split(":"); return [k.trim().replace(/-([a-z])/g, (_,c)=>c.toUpperCase()), v.join(":").trim()]; })) } : { background: "#ffffff", opacity: 0.75 }}
                  >
                    <span
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-white transition-all duration-200"
                      style={isSelected
                        ? Object.fromEntries(option.badgeStyle.split(";").filter(Boolean).map(s => { const [k, ...v] = s.trim().split(":"); return [k.trim().replace(/-([a-z])/g, (_,c)=>c.toUpperCase()), v.join(":").trim()]; }))
                        : { background: "#e8e2f0", color: "#9c8fa0" }
                      }
                    >
                      {option.value === "male" ? "M" : "F"}
                    </span>
                    <span
                      className="text-sm font-semibold transition-all duration-200"
                      style={{ color: isSelected ? "#2d2f30" : "#9c8fa0" }}
                    >
                      {option.label}
                    </span>
                    {isSelected && (
                      <span className="text-xs" style={{ color: option.sparkleColor }}>
                        {option.sparkleA} {option.sparkleB}
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
            </div>
        </fieldset>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.92fr]">
        <div className="rounded-[1.9rem] p-1" style={{ background: "#fdf8fa" }}>
          <input
            id="file-upload-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleSelect}
          />
          <input
            id="camera-upload-input"
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="sr-only"
            onChange={handleSelect}
          />

          {/* 업로드 존 */}
          <div
            className="rounded-[1.75rem] px-5 py-8 text-center transition-all duration-200"
            style={{
              background: isDragging ? "#f3eef2" : "#ffffff",
              border: `2px dashed ${isDragging ? "#a8275a" : "#e8dde6"}`,
              boxShadow: isDragging
                ? "0 12px 32px rgba(168,39,90,0.12)"
                : "0 6px 24px rgba(45,47,48,0.05)",
              transform: isDragging ? "scale(1.01)" : "scale(1)",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => void handleDrop(e)}
          >
            {/* 카메라 아이콘 */}
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-200"
              style={{
                background: isDragging
                  ? "linear-gradient(135deg,#6448b2 0%,#9c7fe8 100%)"
                  : "linear-gradient(135deg,#a8275a 0%,#ff709f 100%)",
                boxShadow: "0 8px 24px rgba(168,39,90,0.25)",
              }}
            >
              {isDragging ? (
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              ) : (
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </div>

            <p className="text-lg font-bold" style={{ color: "#2d2f30" }}>
              {isDragging
                ? (locale === "ko" ? "여기에 놓으세요" : locale === "ja" ? "ここに置いてください" : "Drop it here")
                : t.uploadTitle}
            </p>
            <p className="mt-2 text-sm leading-6" style={{ color: "#9c8fa0" }}>
              {isDragging
                ? (locale === "ko" ? "놓으면 바로 분석을 시작합니다" : locale === "ja" ? "離すとすぐに分析します" : "Release to start analysis")
                : t.uploadHint}
            </p>

            {/* 버튼들 */}
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
              <label
                htmlFor="file-upload-input"
                className="inline-flex cursor-pointer items-center justify-center rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.04] hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg,#a8275a 0%,#ff709f 100%)",
                  boxShadow: "0 4px 16px rgba(168,39,90,0.30)",
                }}
              >
                {t.chooseLibrary}
              </label>
              {isMobileDevice ? (
                <label
                  htmlFor="camera-upload-input"
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                  style={{ borderColor: "#e8dde6", color: "#a8275a", background: "#fde8f0" }}
                >
                  {t.mobileCamera}
                </label>
              ) : null}
              <button
                type="button"
                onClick={() => void handleOpenCamera()}
                className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                style={{ borderColor: "#ddd5f5", color: "#6448b2", background: "#f3eef2" }}
              >
                {isCameraStarting ? t.desktopCameraLoading : t.desktopCamera}
              </button>
            </div>

            <p className="mt-4 text-[11px] leading-5" style={{ color: "#b8afc0" }}>
              {isMobileDevice ? t.mobileHint : t.desktopHint}
            </p>
            <p className="mt-1.5 text-[11px]" style={{ color: "#c5bcc9" }}>
              JPG · PNG · HEIC · 10MB
            </p>
            <p className="mt-2 text-[10.5px] leading-5" style={{ color: "#c5bcc9" }}>
              {locale === "en"
                ? "Sent to OpenAI for analysis · Not stored after use"
                : locale === "ja"
                  ? "OpenAIに送信・使用後は保存しません"
                  : "분석을 위해 OpenAI로 전달 · 사용 후 저장 안 함"}
            </p>
          </div>

          {isCameraOpen ? (
            <div className="mt-4 rounded-[1.6rem] p-4"
              style={{ background: "#ffffff", boxShadow: "0 6px 24px rgba(45,47,48,0.07)" }}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold" style={{ color: "#2d2f30" }}>{t.webcamTitle}</p>
                <button type="button" onClick={closeCamera}
                  className="text-xs font-semibold transition hover:opacity-70"
                  style={{ color: "#9c8fa0" }}>
                  {t.close}
                </button>
              </div>
              <video ref={videoRef} autoPlay playsInline muted
                className="mt-3 h-64 w-full rounded-[1.2rem] object-cover"
                style={{ background: "#2d2f30" }} />
              <div className="mt-3 flex gap-2.5">
                <button type="button" onClick={() => void handleCapture()}
                  className="inline-flex flex-1 items-center justify-center rounded-full py-3 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg,#a8275a 0%,#ff709f 100%)", boxShadow: "0 4px 16px rgba(168,39,90,0.28)" }}>
                  {t.useShot}
                </button>
                <button type="button" onClick={closeCamera}
                  className="inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{ borderColor: "#e8dde6", color: "#9c8fa0" }}>
                  {t.cancel}
                </button>
              </div>
            </div>
          ) : null}

          {cameraError ? (
            <div className="mt-4 rounded-[1.3rem] px-4 py-3 text-sm leading-6"
              style={{ background: "#fff8ec", color: "#92600a" }}>
              {cameraError}
            </div>
          ) : null}

          {/* 선택된 파일 미리보기 */}
          <div className="mt-4 rounded-[1.6rem] p-4"
            style={{ background: "#f3eef2" }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{ color: "#9c8fa0" }}>{t.selectedFile}</p>
            <p className="mt-1.5 text-sm font-semibold" style={{ color: "#2d2f30" }}>{fileName}</p>
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={locale === "en" ? "Uploaded preview" : locale === "ja" ? "アップロードプレビュー" : "업로드 미리보기"}
                className="mt-3 h-56 w-full rounded-[1.2rem] object-cover"
                style={{ boxShadow: "0 6px 20px rgba(45,47,48,0.10)" }}
              />
            ) : null}
          </div>

          {/* 메인 CTA — Stitch_ "ANALYZE MY LOOK" 스타일 */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!validation?.canProceed || isSubmitting}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full py-4 text-sm font-bold uppercase tracking-[0.1em] text-white transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg,#a8275a 0%,#ff709f 100%)",
              boxShadow: "0 8px 28px rgba(168,39,90,0.30)",
            }}
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </div>

        {/* 오른쪽: 상태 체크 + 노트 */}
        <div className="space-y-4">
          <div className="rounded-[1.8rem] p-5"
            style={{ background: "#ffffff", boxShadow: "0 8px_32px rgba(45,47,48,0.06)" }}>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "#a8275a" }}>
                {t.quickCheck}
              </p>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{ background: "#f3eef2", color: "#6448b2" }}>
                <span className={`h-1.5 w-1.5 rounded-full ${isChecking ? "bg-amber-400" : validation?.canProceed ? "bg-emerald-400" : validation ? "bg-rose-400" : ""}`}
                  style={!isChecking && !validation ? { background: "#a8275a" } : {}} />
                {isChecking
                  ? (locale === "ko" ? "확인 중" : locale === "ja" ? "確認中" : "Checking")
                  : validation?.canProceed
                    ? (locale === "ko" ? "진행 가능" : locale === "ja" ? "進行可能" : "Ready")
                    : validation
                      ? (locale === "ko" ? "다시 확인" : locale === "ja" ? "再確認" : "Review")
                      : (locale === "ko" ? "대기 중" : locale === "ja" ? "待機中" : "Standby")}
              </span>
            </div>
            {isChecking ? (
              <p className="mt-3 text-sm leading-7" style={{ color: "#2d2f30" }}>{t.checking}</p>
            ) : validation ? (
              <div className="mt-3">
                <p className="text-sm leading-7"
                  style={{ color: validation.status === "error" ? "#c0392b" : validation.status === "warning" ? "#92600a" : "#2d2f30" }}>
                  {validation.message}
                </p>
                {validation.warnings.length > 0 ? (
                  <ul className="mt-2 space-y-1.5 text-xs leading-5" style={{ color: "#7a7d80" }}>
                    {validation.warnings.map((warning) => (
                      <li key={warning} className="flex items-start gap-1.5">
                        <span className="mt-1 shrink-0 text-[8px]" style={{ color: "#c5bcc9" }}>●</span>
                        {warning}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <p className="mt-3 text-sm leading-7" style={{ color: "#7a7d80" }}>{t.quickCheckHint}</p>
            )}
          </div>

          <div className="rounded-[1.6rem] p-5"
            style={{ background: "#f3eef2" }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "#9c8fa0" }}>{t.notesTitle}</p>
            <ul className="mt-3 space-y-2">
              {t.notes.map((note) => (
                <li key={note} className="flex items-start gap-2 text-xs leading-5"
                  style={{ color: "#6b6e70" }}>
                  <span className="mt-1 shrink-0 text-[8px]" style={{ color: "#c5bcc9" }}>●</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
