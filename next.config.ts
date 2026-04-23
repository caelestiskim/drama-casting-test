import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // turbopack.root 는 의도적으로 비워둠.
  // 설정하면 Next.js 16 Turbopack이 lockfile 충돌을 일으켜 CSS 컴파일 루프 → 메모리 폭주.
  // lightningcss 바이너리 누락 문제는 symlink로 해결:
  //   node_modules/lightningcss/lightningcss.darwin-arm64.node
  //   → ../lightningcss-darwin-arm64/lightningcss.darwin-arm64.node
};

export default nextConfig;
