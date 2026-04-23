"use client";

import { useEffect, useRef, useState } from "react";

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
        link: { mobileWebUrl: string; webUrl: string };
      };
      buttons?: Array<{
        title: string;
        link: { mobileWebUrl: string; webUrl: string };
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

// ── 플랫폼 아이콘 SVG ──────────────────────────────────────────
const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M12 3C6.48 3 2 6.77 2 11.4c0 2.93 1.81 5.51 4.56 7.01l-.89 3.29a.5.5 0 0 0 .73.56L10.26 20c.57.07 1.16.1 1.74.1 5.52 0 10-3.77 10-8.4C22 6.77 17.52 3 12 3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ShareArrowIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

// ── 플랫폼 레이블 ──────────────────────────────────────────────
const PLATFORM_LABELS: Record<Locale, Record<string, string>> = {
  ko: { kakao: "카카오톡", instagram: "Instagram", x: "X (Twitter)", facebook: "Facebook", copy: "링크 복사" },
  en: { kakao: "KakaoTalk", instagram: "Instagram", x: "X (Twitter)", facebook: "Facebook", copy: "Copy link" },
  ja: { kakao: "カカオトーク", instagram: "Instagram", x: "X (Twitter)", facebook: "Facebook", copy: "リンクをコピー" },
};

const SHARE_LABEL: Record<Locale, string> = { ko: "공유하기", en: "Share", ja: "共有する" };
const COPY_LABEL:  Record<Locale, string> = { ko: "링크 복사", en: "Copy link", ja: "リンクをコピー" };
const COPIED_LABEL: Record<Locale, string> = { ko: "복사됨!", en: "Copied!", ja: "コピー済み!" };

export function ShareButtons({ title, text, url, locale }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = getCopy(locale).share;
  const pl = PLATFORM_LABELS[locale];
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

  // 복사 피드백 자동 초기화
  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  // 팝오버 바깥 클릭 닫기
  useEffect(() => {
    if (!popoverOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [popoverOpen]);

  // Kakao SDK 로드
  useEffect(() => {
    if (!kakaoKey) return;
    const key = kakaoKey;
    function setup() {
      if (!window.Kakao) return;
      if (!window.Kakao.isInitialized()) window.Kakao.init(key);
      setIsKakaoReady(true);
    }
    if (window.Kakao) { setup(); return; }
    const existing = document.querySelector<HTMLScriptElement>('script[data-kakao-sdk="true"]');
    if (existing) { existing.addEventListener("load", setup); return () => existing.removeEventListener("load", setup); }
    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.dataset.kakaoSdk = "true";
    script.addEventListener("load", setup);
    document.body.appendChild(script);
    return () => script.removeEventListener("load", setup);
  }, [kakaoKey]);

  // ── 액션 핸들러 ──
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setPopoverOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      setPopoverOpen(false);
      return;
    }
    // 네이티브 공유 미지원 시 팝오버 토글
    setPopoverOpen((v) => !v);
  };

  const handleKakao = async () => {
    setPopoverOpen(false);
    if (isKakaoReady && window.Kakao) {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: { title, description: text, link: { mobileWebUrl: url, webUrl: url } },
        buttons: [{ title: t.kakaoView, link: { mobileWebUrl: url, webUrl: url } }],
      });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
  };

  const handleInstagram = async () => {
    setPopoverOpen(false);
    await navigator.clipboard.writeText(`${text} ${url}`);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) { window.location.href = "instagram://app"; return; }
    openPopup("https://www.instagram.com/");
  };

  const handleX = () => {
    setPopoverOpen(false);
    const u = new URL("https://twitter.com/intent/tweet");
    u.searchParams.set("text", text);
    u.searchParams.set("url", url);
    openPopup(u.toString());
  };

  const handleFacebook = () => {
    setPopoverOpen(false);
    const u = new URL("https://www.facebook.com/sharer/sharer.php");
    u.searchParams.set("u", url);
    openPopup(u.toString());
  };

  // ── 팝오버 플랫폼 목록 ──
  const platforms = [
    { id: "kakao",     icon: <KakaoIcon />,     label: pl.kakao,     bg: "bg-[#FEE500]",   fg: "text-slate-900", handler: () => void handleKakao() },
    { id: "instagram", icon: <InstagramIcon />, label: pl.instagram, bg: "bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600", fg: "text-white", handler: () => void handleInstagram() },
    { id: "x",         icon: <XIcon />,         label: pl.x,         bg: "bg-black",        fg: "text-white",     handler: handleX },
    { id: "facebook",  icon: <FacebookIcon />,  label: pl.facebook,  bg: "bg-[#1877F2]",   fg: "text-white",     handler: handleFacebook },
  ];

  return (
    <div className="relative flex shrink-0 gap-2.5">
      {/* ── 링크 복사 버튼 ── */}
      <button
        type="button"
        onClick={() => void handleCopy()}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200
          ${copied
            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
            : "border-slate-300 bg-white text-slate-700 hover:border-slate-700 hover:text-slate-900"
          }`}
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
        {copied ? COPIED_LABEL[locale] : COPY_LABEL[locale]}
      </button>

      {/* ── 공유하기 버튼 + 팝오버 ── */}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={() => void handleNativeShare()}
          className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-pink-700 active:scale-95"
        >
          <ShareArrowIcon />
          {SHARE_LABEL[locale]}
        </button>

        {/* 팝오버 — 네이티브 공유 미지원 환경에서만 표시 */}
        {popoverOpen && (
          <div
            ref={popoverRef}
            className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.14)]"
          >
            <p className="px-4 pt-3.5 pb-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              {locale === "en" ? "Share via" : locale === "ja" ? "シェアする" : "공유 방법 선택"}
            </p>
            <div className="divide-y divide-slate-100">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={p.handler}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${p.bg} ${p.fg}`}>
                    {p.icon}
                  </span>
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => void handleCopy()}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <LinkIcon />
                </span>
                {pl.copy}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
