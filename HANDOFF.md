# 드라마 캐스팅 테스트 — 작업 인수인계 문서

> 작성일: 2026-04-28  
> 저장소: https://github.com/caelestiskim/drama-casting-test  
> 배포: Cloudflare Pages (https://dash.cloudflare.com)  
> 프로젝트명(Cloudflare): `drama-casting-test`

---

## 프로젝트 개요

얼굴 사진을 업로드하면 OpenAI Vision API로 얼굴 유형을 분석해 한국 드라마 캐릭터를 추천해주는 웹앱.  
조코딩 강의 기반 → **Vite + React + Cloudflare Pages Functions** 아키텍처.

---

## 레포 구조

```
mock-ai-webapp/
├── vite-react-app/          ← ✅ 실제 배포 대상 (Cloudflare Pages root)
│   ├── src/
│   │   ├── pages/           ← React 페이지 컴포넌트
│   │   ├── lib/ai/          ← OpenAI Vision API 호출 로직
│   │   ├── data/            ← 캐릭터 데이터
│   │   └── types/           ← TypeScript 타입
│   ├── functions/
│   │   └── api/             ← Cloudflare Pages Functions (API 엔드포인트)
│   │       ├── analyze.ts       POST /api/analyze
│   │       ├── checkout.ts      POST /api/checkout
│   │       ├── price.ts         GET  /api/price
│   │       └── verify-payment.ts GET /api/verify-payment
│   ├── public/              ← 정적 파일
│   ├── wrangler.toml        ← Cloudflare Pages 설정
│   └── package.json         ← build: "vite build && cp dist/index.html dist/404.html"
│
├── src/                     ← ⚠️ Next.js 앱 (사용 안 함, 삭제해도 됨)
└── HANDOFF.md               ← 이 파일
```

---

## Cloudflare Pages 대시보드 설정

| 항목 | 값 |
|------|-----|
| Root directory | `vite-react-app` |
| Build command | `npm run build` |
| Build output directory | `dist` (wrangler.toml이 자동 설정) |
| Framework preset | None |

---

## 현재 상태 (2026-04-28 기준)

### 최근 커밋 이력
| 커밋 | 내용 | 결과 |
|------|------|------|
| `c8e7bee` | nodejs_compat 추가, 404.html 방식 SPA 라우팅 | **배포 결과 미확인 (대기 중)** |
| `92e0f09` | 빈 커밋 (설정 변경 후 빌드 트리거용) | node:stream 오류로 실패 |
| `cc693a0` | vite-react-app에 Cloudflare Pages Functions 추가 | 빌드 성공, 배포 실패 |

### 최근 배포 실패 원인 및 해결 여부
1. **`node:stream` 오류** → `wrangler.toml`에 `compatibility_flags = ["nodejs_compat"]` 추가로 해결 예정 (`c8e7bee`)
2. **`_redirects` 무한루프** → `_redirects` 삭제하고 `dist/404.html` 방식으로 전환 (`c8e7bee`)

---

## 남은 작업

### 1. 배포 확인 (c8e7bee 빌드 결과 확인)
- Cloudflare Pages 대시보드에서 `c8e7bee` 빌드 로그 확인
- 성공하면 실제 URL 접속 테스트

### 2. 만약 또 실패하면
- **`node:stream` 오류 지속 시**: `vite-react-app/functions/api/analyze.ts`가 AI 라이브러리를 직접 import 중. 해당 라이브러리에서 node:stream을 사용하는 코드를 찾아 제거하거나, 함수 내에 AI 로직을 인라인으로 작성 (fetch만 사용)
- **다른 오류**: 로그 파일 분석

### 3. 환경 변수 설정 (Cloudflare Pages 대시보드)
배포 성공 후 `Settings → Environment Variables`에 추가:

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `OPENAI_API_KEY` | OpenAI API 키 (Secret으로 설정) | ✅ |
| `OPENAI_MODEL` | 기본값: gpt-4o-mini | 선택 |
| `AI_MOCK_MODE` | 로컬 테스트용만 "true" | 선택 |
| `POLAR_ACCESS_TOKEN` | Polar 결제 토큰 | 결제 기능 필요 시 |
| `POLAR_PRODUCT_ID` | Polar 상품 ID | 결제 기능 필요 시 |
| `POLAR_API_BASE` | 기본값: https://sandbox-api.polar.sh | 선택 |

### 4. Polar 프로덕션 전환
- Polar 대시보드에서 KYC(신원인증) + Stripe Connect 완료 필요
- 완료 후 `POLAR_API_BASE`를 `https://api.polar.sh`로 변경

---

## 주요 기술 스택

- **프론트엔드**: Vite + React 19 + React Router v7 + Tailwind CSS v4
- **백엔드**: Cloudflare Pages Functions (TypeScript)
- **AI**: OpenAI Vision API (gpt-4o-mini, fallback: gpt-4o)
- **결제**: Polar (Stripe 기반)
- **배포**: Cloudflare Pages (무료 플랜)

---

## 핵심 파일 설명

### `vite-react-app/functions/api/analyze.ts`
- POST /api/analyze
- body: `{ fileName, imageDataUrl, genderPreference }`
- OpenAI Vision API로 얼굴 분석 → 드라마 캐릭터 매칭
- `env.OPENAI_API_KEY` 없으면 fallback 분류기 사용

### `vite-react-app/src/lib/ai/classifyFaceType.ts`
- `callVisionAPI(apiKey, imageDataUrl, model?)` 함수
- OpenAI Chat Completions API (vision) 호출
- 모델 폴백 체인: gpt-4o-mini → gpt-4o

### `vite-react-app/src/lib/ai/selectCharacter.ts`
- 얼굴 벡터(power/elegance/intellect/warmth/mystery)로 캐릭터 매칭
- 코사인 유사도 계산

### `vite-react-app/wrangler.toml`
```toml
name = "drama-casting-test"
compatibility_date = "2026-04-15"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = "./dist"
```

---

## 알려진 이슈 / 주의사항

1. **`src/` 디렉토리 (Next.js)**: 현재 사용 안 하지만 레포에 남아있음. 혼동 주의.
2. **`vite-react-app/src/lib/ai/classifyFaceType.ts`** 버전이 두 개 있었음 (Next.js 버전 vs Vite 버전). Vite 버전이 더 길고(389줄) 더 최신.
3. **블로그 기능**: Next.js 버전엔 있었으나 Vite 버전엔 없음. 필요하면 별도 구현 필요.
4. **다국어(i18n)**: React Router의 `/:locale` 파라미터로 처리 (ko/en 지원).
