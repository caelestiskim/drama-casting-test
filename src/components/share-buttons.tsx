"use client";

import { useEffect, useState } from "react";

import { getCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

type ShareButtonsProps = {
  title: string;
  text: string;
  url: string;
  locale: Locale;
};

type KakaoStatic = {
  isInitialized(): boolean;
  init(key: string): void;
  Share: {
    sendDefault(payload: {
      objectType: "feed";
      content: {
        title: string;
        description: string;
        imageUrl?: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      };
      buttons?: Array<{
        title: string;
        link: {
          mobileWebUrl: string;
          webUrl: string;
        };
      }>;
    }): void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoStatic;
  }
}

const KAKAO_SDK_URL = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js";

function openPopup(targetUrl: string) {
  window.open(targetUrl, "_blank", "noopener,noreferrer");
}

export function ShareButtons({ title, text, url, locale }: ShareButtonsProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const t = getCopy(locale).share;

  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
  const shareText = `${text} ${url}`;

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }

    const timer = window.setTimeout(() => setFeedback(null), 2200);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  useEffect(() => {
    if (!kakaoKey) {
      return;
    }

    const resolvedKakaoKey = kakaoKey;

    function setupKakao() {
      if (!window.Kakao) {
        return;
      }

      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(resolvedKakaoKey);
      }

      setIsKakaoReady(true);
    }

    if (window.Kakao) {
      setupKakao();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>('script[data-kakao-sdk="true"]');

    if (existing) {
      existing.addEventListener("load", setupKakao);
      return () => existing.removeEventListener("load", setupKakao);
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.dataset.kakaoSdk = "true";
    script.addEventListener("load", setupKakao);
    document.body.appendChild(script);

    return () => script.removeEventListener("load", setupKakao);
  }, [kakaoKey]);

  const copyValue = async (value: string, successMessage: string) => {
    await navigator.clipboard.writeText(value);
    setFeedback(successMessage);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }

    await copyValue(url, t.copiedLink);
  };

  const handleXShare = () => {
    const targetUrl = new URL("https://twitter.com/intent/tweet");
    targetUrl.searchParams.set("text", text);
    targetUrl.searchParams.set("url", url);
    openPopup(targetUrl.toString());
  };

  const handleFacebookShare = () => {
    const targetUrl = new URL("https://www.facebook.com/sharer/sharer.php");
    targetUrl.searchParams.set("u", url);
    targetUrl.searchParams.set("quote", text);
    openPopup(targetUrl.toString());
  };

  const handleInstagramShare = async () => {
    await copyValue(shareText, t.copiedInstagram);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

    if (isMobile) {
      window.location.href = "instagram://app";
      return;
    }

    openPopup("https://www.instagram.com/");
  };

  const handleKakaoShare = async () => {
    if (isKakaoReady && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title,
          description: text,
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        buttons: [
          {
            title: t.kakaoView,
            link: {
              mobileWebUrl: url,
              webUrl: url,
            },
          },
        ],
      });
      return;
    }

    await copyValue(shareText, t.copiedKakao);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleNativeShare}
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          {t.native}
        </button>
        <button
          type="button"
          onClick={() => void handleKakaoShare()}
          className="inline-flex items-center justify-center rounded-full bg-[#FEE500] px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95"
        >
          {t.kakao}
        </button>
        <button
          type="button"
          onClick={handleInstagramShare}
          className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f9ce34_0%,#ee2a7b_52%,#6228d7_100%)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          {t.instagram}
        </button>
        <button
          type="button"
          onClick={handleFacebookShare}
          className="inline-flex items-center justify-center rounded-full bg-[#1877F2] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
        >
          {t.facebook}
        </button>
        <button
          type="button"
          onClick={handleXShare}
          className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          X
        </button>
        <button
          type="button"
          onClick={() => void copyValue(url, t.copiedResultLink)}
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        >
          {t.copyLink}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-500">
        <span>{t.instagramHint}</span>
        {!kakaoKey ? <span>{t.kakaoHint}</span> : null}
      </div>

      {feedback ? (
        <p className="text-sm font-medium text-pink-600">{feedback}</p>
      ) : null}
    </div>
  );
}
