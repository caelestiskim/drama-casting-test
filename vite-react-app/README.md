# 드라마 캐스팅 테스트 — Vite / Cloudflare Pages

현재 운영 배포 대상인 `Vite + React + Cloudflare Pages Functions` 앱입니다.

## 실행

```bash
npm install
npm run dev
```

Cloudflare Pages Functions까지 같이 보려면 먼저 프론트 빌드를 만든 뒤 아래처럼 실행하면 됩니다.

```bash
npm run build
npm run cf:dev
```

Vite dev server에서 `/api`를 함께 테스트하려면 별도 터미널에서 Wrangler를 `127.0.0.1:8788`로 띄우세요.

```bash
npm run build
npx wrangler pages dev dist --ip 127.0.0.1 --port 8788
npm run dev
```

## 빌드

```bash
npm run build
```

## 구조

- `src/`: React 앱 본체
- `functions/api/analyze.ts`: Cloudflare Pages Functions용 분석 API
- `functions/api/checkout.ts`: Polar 체크아웃 생성 API
- `functions/api/price.ts`: Polar 상품 가격 조회 API
- `functions/api/verify-payment.ts`: Polar 결제 검증 API
- `public/mediapipe/`: 브라우저 얼굴 검증용 MediaPipe 자산

## 메모

- 결과 페이지는 `/api/analyze` 호출이 실패하면 fallback 결과로도 동작합니다.
- Cloudflare Pages에 배포할 때는 `functions/api/analyze.ts`와 함께 `OPENAI_API_KEY`, `OPENAI_MODEL`, `AI_MOCK_MODE`를 환경변수로 넣으면 됩니다.
- `AI_MOCK_MODE`는 `"true"`일 때만 fallback을 강제합니다. 실제 OpenAI 분석을 쓰려면 이 값을 비워두거나 `"false"`로 둡니다.
- 현재 분석 파이프라인은 OpenAI가 바로 캐릭터를 판정하지 않고, 먼저 객관적인 얼굴 feature를 추출한 뒤 코드에서 `faceType`과 벡터를 결정하도록 되어 있습니다.

## Cloudflare Pages 설정

Build command:

```bash
npm run build
```

Build output directory:

```bash
dist
```

Environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4o-mini
AI_MOCK_MODE=false
```
