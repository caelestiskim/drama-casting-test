# 드라마 캐스팅 테스트

얼굴 사진 1장을 업로드하면 OpenAI Vision API로 얼굴 분위기를 분석하고, 어울리는 한국 드라마 캐릭터 타입을 추천하는 웹앱입니다.

Live site: https://drama-casting-test.pages.dev

## 서비스 개요

Drama Casting Test는 사용자가 업로드한 얼굴 사진을 바탕으로 드라마 캐릭터에 어울리는 분위기와 타입을 분석하는 AI 기반 테스트 서비스입니다. 결과 페이지에서는 캐릭터 성향, 이미지 키워드, 추천 스타일을 확인할 수 있습니다.

결제는 Polar를 통해 처리되며, 서버는 결제 상태를 검증한 뒤 유료 분석 흐름을 제공합니다.

## 개인정보와 사진 처리

- 업로드한 원본 사진은 분석과 결과 생성에만 사용합니다.
- 원본 이미지는 서버에 장기 저장하지 않습니다.
- 결과 공유는 원본 이미지가 아니라 결과 스냅샷 중심으로 처리합니다.
- 결제 처리는 Polar의 체크아웃과 결제 검증 API를 사용합니다.

## 현재 운영 상태

- 운영 배포 대상: `vite-react-app`
- 프론트엔드: Vite + React + React Router + Tailwind CSS
- 백엔드: Cloudflare Pages Functions
- 배포 프로젝트: Cloudflare Pages `drama-casting-test`
- 프로덕션 사진 분석: Cloudflare Secret `OPENAI_API_KEY` 설정 후 동작 확인 완료
- 프로덕션 결제: Polar Checkout 연동

루트 `src/`의 Next.js 앱은 이전 구현입니다. 혼동을 줄이기 위해 루트의 기본 npm scripts는 현재 운영 중인 `vite-react-app`으로 위임합니다. Next.js 버전을 실행해야 할 때만 `legacy:*` scripts를 사용하세요.

## 로컬 실행

```bash
npm install
npm run dev
```

직접 Vite 앱 폴더에서 실행해도 됩니다.

```bash
cd vite-react-app
npm install
npm run dev
```

기본 주소:

```bash
http://localhost:5173
```

Cloudflare Pages Functions까지 함께 테스트하려면 Vite 앱에서 빌드 후 Wrangler를 실행합니다.

```bash
cd vite-react-app
npm run build
npm run cf:dev
```

현재 개발 편의를 위해 Vite dev server의 `/api` 요청은 `http://127.0.0.1:8788`의 Wrangler Pages Functions로 프록시됩니다.

## 배포 설정

Cloudflare Pages:

| 항목 | 값 |
|------|-----|
| Project name | `drama-casting-test` |
| Root directory | `vite-react-app` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Framework preset | None |

필수 Secret:

| 이름 | 설명 |
|------|------|
| `OPENAI_API_KEY` | OpenAI Vision API 호출용 Secret |

선택 환경 변수:

| 이름 | 설명 |
|------|------|
| `OPENAI_MODEL` | 기본값은 코드의 폴백 체인 사용 |
| `AI_MOCK_MODE` | `"true"`일 때만 로컬/테스트용 fallback 강제 |
| `POLAR_ACCESS_TOKEN` | Polar 결제 기능 사용 시 필요 |
| `POLAR_PRODUCT_ID` | Polar 상품 ID |
| `POLAR_API_BASE` | 프로덕션은 `https://api.polar.sh` |
| `POLAR_PRICE_AMOUNT` | Polar 상품 조회 실패 시 표시할 fallback 가격 |
| `POLAR_PRICE_CURRENCY` | Polar 상품 조회 실패 시 표시할 fallback 통화 |

## 주요 폴더

```text
vite-react-app/
  src/                    React 앱
  functions/api/          Cloudflare Pages Functions
  public/mediapipe/       브라우저 얼굴 검증용 MediaPipe 자산

src/                      이전 Next.js 앱, 운영 배포 대상 아님
HANDOFF.md                작업 이력과 운영 메모
```

## 검증 명령

```bash
cd vite-react-app
npm run build
npx tsc --noEmit
```
