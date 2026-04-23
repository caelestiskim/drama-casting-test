# mock-ai-webapp-vite

기존 Next.js 앱을 건드리지 않고 별도 폴더에 옮긴 `Vite + React` 버전입니다.

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

## 빌드

```bash
npm run build
```

## 구조

- `src/`: React 앱 본체
- `functions/api/analyze.ts`: Cloudflare Pages Functions용 분석 API
- `public/mediapipe/`: 브라우저 얼굴 검증용 MediaPipe 자산

## 메모

- 결과 페이지는 `/api/analyze`가 없으면 브라우저 내 fallback 결과로도 동작합니다.
- Cloudflare Pages에 배포할 때는 `functions/api/analyze.ts`와 함께 `OPENAI_API_KEY`, `OPENAI_MODEL`, `AI_MOCK_MODE`를 환경변수로 넣으면 됩니다.
- 기본값은 `AI_MOCK_MODE=true`라서, 실제 OpenAI 분석을 쓰려면 Pages 환경변수에서 `AI_MOCK_MODE=false`로 바꿔야 합니다.
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
OPENAI_MODEL=gpt-4.1-mini
AI_MOCK_MODE=false
```
