import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "드라마 캐스팅 테스트",
  description:
    "얼굴 사진 한 장으로 분위기와 장르 결을 읽고, 드라마 속 어떤 역할이 어울리는지 가볍게 즐기는 캐릭터 추천 웹앱",
  openGraph: {
    title: "드라마 캐스팅 테스트",
    description:
      "외모 평가 없이, 분위기와 캐릭터 무드 중심으로 드라마 캐스팅 결과를 받아보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
