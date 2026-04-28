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
| `00ae957` | 이전 브라우저 세션에 남은 실패 분석 캐시를 무시하도록 결과 캐시 키 변경 | 로컬 빌드/타입체크/API 키 로딩 확인 성공 |
| `202bcd9` | 실패/폴백 분석 결과를 세션 캐시에 저장하지 않도록 수정, Vite dev proxy를 Wrangler Functions로 연결 | `main` 푸시 완료, 로컬 빌드/타입체크 성공 |
| `b2209ee` | 로컬 비밀값 파일(`.dev.vars`, `.env*`) 및 Wrangler 임시 파일 ignore 처리 | `main` 푸시 완료 |
| `e0b1506` | HANDOFF 작업 로그 업데이트 | `main` 푸시 완료 |
| `00c274c` | 최신 Next.js UI/프리미엄 결과 로직을 실제 배포 대상인 `vite-react-app`으로 이식 | `main` 푸시 완료, 로컬 빌드/타입체크/브라우저 확인 성공 |
| `8c78b6a` | Vite 앱에 블로그 페이지 추가 | 배포 성공했으나 당시에는 여전히 구버전 UI가 노출됨 |
| `c8e7bee` | nodejs_compat 추가, 404.html 방식 SPA 라우팅 | **배포 결과 미확인 (대기 중)** |
| `92e0f09` | 빈 커밋 (설정 변경 후 빌드 트리거용) | node:stream 오류로 실패 |
| `cc693a0` | vite-react-app에 Cloudflare Pages Functions 추가 | 빌드 성공, 배포 실패 |

### 2026-04-28 Codex 작업 로그
- 문제 원인: Cloudflare Pages 실제 배포 대상은 `vite-react-app`인데, 최신 디자인/결과 UI는 루트 `src/`의 Next.js 앱 및 `claude/*` 브랜치 쪽에 남아 있었음. 그래서 `main` 배포가 성공해도 구버전 Vite UI가 계속 보였음.
- 조치: 루트 Next.js 앱의 최신 홈/업로드/결과 UI, 프리미엄 결과 표시, 결제 CTA, 포스터 카드, 캐릭터 번역/필터/참조 데이터, 결과 캐시 로직을 `vite-react-app`의 React Router 구조에 맞게 이식.
- 추가 의존성: `vite-react-app/package.json`에 `html-to-image` 추가.
- 푸시 완료: `main` 브랜치 `00c274c` (`Port latest UI to Vite deployment`)가 `origin/main`에 올라감.
- 검증:
  - `npm run build` 성공
  - `npx tsc --noEmit` 성공
  - 로컬 브라우저에서 `http://127.0.0.1:5174/ko`, `/ko/upload`, `/ko/blog`, `/ko/result` 렌더 확인
  - 확인 당시 브라우저 콘솔 에러 없음
- 검증용 Vite dev server는 종료함.

### 2026-04-28 Codex 추가 작업 로그
- 문제 원인: 로컬 Pages Functions 실행 시 `vite-react-app/.dev.vars`에 `OPENAI_API_KEY`가 없어 사진 분석이 fallback으로 내려갔고, 실패한 fallback 결과가 `sessionStorage` 캐시에 남아 이후 새 키를 넣어도 결과 화면에서 같은 오류가 반복 표시됨.
- 조치:
  - 로컬 개발용 `vite-react-app/.dev.vars`에 OpenAI 키를 설정함. 키 값은 커밋/문서에 기록하지 않음.
  - 실패/폴백 분석 결과는 더 이상 `sessionStorage`에 저장하지 않도록 수정함 (`202bcd9`).
  - 기존 브라우저에 남아 있던 실패 캐시를 무시하도록 결과 캐시 키를 `drama-casting-test.result-cache.v2`로 변경함.
  - Vite dev server의 `/api` 요청을 Wrangler Pages Functions(`127.0.0.1:8788`)로 프록시하도록 설정함 (`202bcd9`).
- 검증:
  - `npm run build` 성공
  - `npx tsc --noEmit` 성공
  - `http://127.0.0.1:5174/api/analyze` 호출 시 `OPENAI_API_KEY` 미설정 오류가 사라지고 OpenAI Vision API까지 요청이 도달하는 것 확인
- 남은 주의사항: Cloudflare Pages 프로덕션 secret은 CLI 비대화식 환경에서 `CLOUDFLARE_API_TOKEN`이 없어 아직 업데이트하지 못함. 대시보드에서 `OPENAI_API_KEY`를 Secret으로 설정하거나, 토큰을 제공한 뒤 `wrangler pages secret put OPENAI_API_KEY --project-name drama-casting-test`를 실행해야 함.

### 최근 배포 실패 원인 및 해결 여부
1. **`node:stream` 오류** → `wrangler.toml`에 `compatibility_flags = ["nodejs_compat"]` 추가로 해결 예정 (`c8e7bee`)
2. **`_redirects` 무한루프** → `_redirects` 삭제하고 `dist/404.html` 방식으로 전환 (`c8e7bee`)

---

## 남은 작업

### 1. 배포 확인 (`00c274c` 빌드 결과 확인)
- Cloudflare Pages 대시보드에서 `00c274c` 빌드 로그 확인
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
