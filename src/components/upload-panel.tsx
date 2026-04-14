"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";
import { validateFaceImage } from "@/lib/face/validateFace";
import {
  UPLOADED_FACE_GENDER_KEY,
  UPLOADED_FACE_IMAGE_KEY,
  UPLOADED_FACE_NAME_KEY,
} from "@/lib/upload-storage";
import type { FaceValidationResult, GenderPreference } from "@/types/result";

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("이미지 파일을 읽지 못했어요."));
    };

    reader.onerror = () => reject(new Error("이미지 파일을 읽지 못했어요."));
    reader.readAsDataURL(file);
  });
}

function loadImage(dataUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("이미지를 불러오지 못했어요."));
    image.src = dataUrl;
  });
}

export function UploadPanel({ locale }: { locale: Locale }) {
  const router = useRouter();
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
  const [genderPreference, setGenderPreference] = useState<GenderPreference | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraStarting, setIsCameraStarting] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

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

  const clearStoredUpload = () => {
    window.sessionStorage.removeItem(UPLOADED_FACE_IMAGE_KEY);
    window.sessionStorage.removeItem(UPLOADED_FACE_NAME_KEY);
    window.sessionStorage.removeItem(UPLOADED_FACE_GENDER_KEY);
  };

  const processImage = async (dataUrl: string, sourceFileName: string) => {
    setIsChecking(true);
    setValidation(null);
    setFileName(sourceFileName);

    try {
      const image = await loadImage(dataUrl);
      const faceResult = await validateFaceImage(image);

      setPreviewUrl(dataUrl);
      setValidation(faceResult);

      if (faceResult.canProceed) {
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

  const handleSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setValidation({
        canProceed: false,
        status: "error",
        message:
          locale === "ko"
            ? "10MB 이하 사진으로 다시 올려 주세요."
            : locale === "ja"
              ? "10MB以下の写真でアップロードし直してください。"
              : "Please upload a photo under 10MB.",
        warnings: [],
        faceCount: 0,
        confidence: 0,
        isFrontal: false,
      });
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      await processImage(dataUrl, file.name);
    } catch (error) {
      console.error(error);
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
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    closeCamera();
    await processImage(dataUrl, `camera-shot-${Date.now()}.jpg`);
  };

  const handleSubmit = () => {
    if (!validation?.canProceed || !genderPreference) {
      return;
    }

    setIsSubmitting(true);
    window.sessionStorage.setItem(UPLOADED_FACE_GENDER_KEY, genderPreference);
    router.push(`/${locale}/result`);
  };

  return (
    <section className="rounded-[2.25rem] border border-pink-100 bg-white/92 p-6 shadow-[0_30px_90px_rgba(236,72,153,0.08)] sm:p-8">
      <p className="text-sm font-semibold tracking-[0.18em] text-pink-600">{t.eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-[2.2rem]">
        {t.title}
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
        {t.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {[
          locale === "ko" ? "무료" : locale === "ja" ? "無料" : "Free",
          "JPG · PNG · HEIC",
          "10MB",
          locale === "ko"
            ? "사진 저장 안 함"
            : locale === "ja"
              ? "写真は保存しません"
              : "No photo storage",
        ].map((chip) => (
          <span
            key={chip}
            className="rounded-full border border-pink-100 bg-white px-3 py-1 text-xs font-semibold text-slate-600"
          >
            {chip}
          </span>
        ))}
      </div>

      <div className="mt-8 rounded-[1.8rem] border border-violet-100 bg-[linear-gradient(180deg,#faf7ff_0%,#ffffff_100%)] p-5 shadow-sm">
        <p className="text-sm font-semibold tracking-[0.18em] text-violet-500">
          {t.characterTone}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {[
            { value: "male", label: t.toneMale },
            { value: "female", label: t.toneFemale },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setGenderPreference(option.value as GenderPreference)}
              className={
                genderPreference === option.value
                  ? "rounded-2xl border border-violet-400 bg-violet-500 px-3 py-3 text-sm font-semibold text-white"
                  : "rounded-2xl border border-violet-100 bg-white px-3 py-3 text-sm font-semibold text-slate-600 transition hover:border-violet-300 hover:text-violet-600"
              }
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          {t.toneHint}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.92fr]">
        <div className="rounded-[1.9rem] border border-dashed border-pink-200 bg-[linear-gradient(180deg,#fff7fb_0%,#fdfdff_100%)] p-5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleSelect}
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            className="hidden"
            onChange={handleSelect}
          />

          <div className="rounded-[1.6rem] border border-pink-100 bg-white px-5 py-8 text-center">
            <p className="text-lg font-semibold text-slate-950">{t.uploadTitle}</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {t.uploadHint}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {t.chooseLibrary}
              </button>
              {isMobileDevice ? (
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="inline-flex items-center justify-center rounded-full border border-pink-200 bg-pink-50 px-5 py-3 text-sm font-semibold text-pink-700 transition hover:border-pink-300 hover:bg-pink-100"
                >
                  {t.mobileCamera}
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => void handleOpenCamera()}
                className="inline-flex items-center justify-center rounded-full border border-violet-200 bg-violet-50 px-5 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-100"
              >
                {isCameraStarting ? t.desktopCameraLoading : t.desktopCamera}
              </button>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">
              {isMobileDevice ? t.mobileHint : t.desktopHint}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              JPG, PNG, HEIC · 10MB
            </p>
          </div>

          {isCameraOpen ? (
            <div className="mt-5 rounded-[1.6rem] border border-violet-100 bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-slate-950">{t.webcamTitle}</p>
                <button
                  type="button"
                  onClick={closeCamera}
                  className="text-sm font-medium text-slate-500 transition hover:text-slate-800"
                >
                  {t.close}
                </button>
              </div>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="mt-4 h-64 w-full rounded-[1.35rem] bg-slate-950 object-cover"
              />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => void handleCapture()}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ec4899_0%,#8b5cf6_100%)] px-5 py-3 text-sm font-semibold text-white"
                >
                  {t.useShot}
                </button>
                <button
                  type="button"
                  onClick={closeCamera}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          ) : null}

          {cameraError ? (
            <div className="mt-5 rounded-[1.3rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">
              {cameraError}
            </div>
          ) : null}

          <div className="mt-5 rounded-[1.6rem] border border-pink-100 bg-white p-4">
            <p className="text-sm text-slate-500">{t.selectedFile}</p>
            <p className="mt-2 text-base font-semibold text-slate-950">{fileName}</p>
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="업로드 미리보기"
                width={720}
                height={420}
                unoptimized
                className="mt-4 h-64 w-full rounded-[1.35rem] object-cover"
              />
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.8rem] border border-sky-100 bg-[linear-gradient(180deg,#f5fbff_0%,#ffffff_100%)] p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-sky-600">
              {t.quickCheck}
            </p>
            {isChecking ? (
              <p className="mt-3 text-base leading-7 text-slate-700">
                {t.checking}
              </p>
            ) : validation ? (
              <div className="mt-3">
                <p
                  className={
                    validation.status === "error"
                      ? "text-base leading-7 text-rose-600"
                      : validation.status === "warning"
                        ? "text-base leading-7 text-amber-700"
                        : "text-base leading-7 text-slate-700"
                  }
                >
                  {validation.message}
                </p>
                {validation.warnings.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {validation.warnings.map((warning) => (
                      <li key={warning}>• {warning}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <p className="mt-3 text-base leading-7 text-slate-600">
                {t.quickCheckHint}
              </p>
            )}
          </div>

          <div className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-500">{t.notesTitle}</p>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
              {t.notes.map((note) => (
                <li key={note}>• {note}</li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!validation?.canProceed || !genderPreference || isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,#ec4899_0%,#8b5cf6_100%)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(168,85,247,0.28)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
          >
            {isSubmitting ? t.submitting : t.submit}
          </button>
        </div>
      </div>
    </section>
  );
}
