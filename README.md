# 드라마 캐스팅 테스트

얼굴 사진 1장을 업로드하면 분위기와 장르 결을 바탕으로 드라마/영화 속 어떤 역할이 어울리는지 추천하는 한국어 웹앱 MVP입니다.

중요:

- 이 서비스는 외모 평가 서비스가 아닙니다.
- 사람을 점수화하거나 미남/미녀처럼 판단하지 않습니다.
- 결과는 엔터테인먼트용 캐릭터 추천입니다.

## 기술 스택

- Next.js App Router
- TypeScript
- Tailwind CSS
- MediaPipe Tasks Vision
- OpenAI Responses API 연동 가능 구조

## 폴더 구조

```text
src/
  app/
    api/analyze/route.ts
    page.tsx
    upload/page.tsx
    result/page.tsx
  components/
    character-match-section.tsx
    result-card.tsx
    share-buttons.tsx
    upload-panel.tsx
  data/
    characters.ts
    genres.ts
  lib/
    ai/
      analyzeFace.ts
      mapToCharacter.ts
    face/
      validateFace.ts
    buildResultCopy.ts
    upload-storage.ts
  types/
    result.ts
```

## 로컬 실행

```bash
npm install
npm run dev
```

기본 주소:

```bash
http://localhost:3000
```

이미 다른 개발 서버가 떠 있으면 다른 포트로 실행될 수 있습니다.

## 환경변수

`.env.local` 파일을 프로젝트 루트에 생성하세요.

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
AI_MOCK_MODE=true
NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY=your_kakao_javascript_key
```

설명:

- `OPENAI_API_KEY`: 실제 비전 가능한 AI 모델 호출 시 사용
- `OPENAI_MODEL`: 선택 사항, 기본값은 `gpt-4.1-mini`
- `AI_MOCK_MODE`: `true`면 로컬 mock 모드, `false`면 실제 API 호출 시도
- `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`: 카카오톡 JS SDK 공유 버튼 활성화용 공개 키

`AI_MOCK_MODE=true` 이거나 API 호출 실패 시에도 앱은 mock 결과로 동작합니다.

## MVP 기능

- 랜딩 페이지
- 사진 업로드
- MediaPipe 기반 얼굴 존재 여부 / 기본 품질 확인
- AI 분석 인터페이스 분리
- mock fallback 지원
- 24개 이상 캐릭터 데이터
- 메인 캐릭터 1개 + 보조 후보 2개
- 추천 장르 TOP 3
- 공유 버튼 / 링크 복사
- 카카오톡 / 인스타그램 / 페이스북 / X 공유 버튼

## 얼굴 체크 방식

브라우저에서 MediaPipe Face Landmarker를 사용해 아래를 확인합니다.

- 얼굴 존재 여부
- 얼굴 수
- 얼굴이 너무 작지 않은지
- 정면에 가까운지

조건이 좋지 않으면 친절한 재업로드 메시지를 보여줍니다.

## AI 분석 구조

실제 AI 호출은 `src/lib/ai/analyzeFace.ts`에 분리되어 있습니다.

반환 JSON 구조:

```json
{
  "moodTags": ["차분함", "지적임", "진지함"],
  "genreScores": {
    "romance": 0.42,
    "crime": 0.71,
    "thriller": 0.66,
    "legal": 0.83,
    "youth": 0.28,
    "fantasy": 0.21,
    "historical": 0.19,
    "noir": 0.37,
    "medical": 0.55,
    "mystery": 0.74
  },
  "roleScores": {
    "lead": 0.84,
    "support": 0.46,
    "rival": 0.39
  },
  "topCharacters": ["냉철한 검사", "천재 프로파일러", "미스터리 작가형 인물"],
  "shortSummary": "차분한 인상이 먼저 들어오고, 법정과 미스터리 결이 자연스럽게 따라옵니다."
}
```

### 실제 API 연결 포인트

실제 모델 호출은 아래 함수에서 교체 가능합니다.

- `src/lib/ai/analyzeFace.ts`
- 함수: `callVisionAPI()`

현재는 다음 흐름입니다.

1. 실제 API 호출 시도
2. 실패 시 mock 결과로 fallback
3. API 키가 없으면 mock 모드 유지

## 공유 기능

MVP에 포함된 공유 기능:

- 결과 링크 복사
- Web Share API 지원 브라우저에서는 네이티브 공유
- 카카오톡 공유 버튼
  - `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`가 있으면 JS SDK로 직접 공유
  - 키가 없으면 공유 문구 복사 fallback
- 인스타그램 공유 버튼
  - 플랫폼 특성상 직접 링크 전송 대신 공유 문구 복사 + 앱/웹 이동 방식
- 페이스북 공유 버튼
- X 공유 버튼
- 결과 스냅샷을 URL 파라미터로 공유할 수 있는 구조

## 사진 저장 정책

- 원본 이미지는 브라우저 세션 스토리지에서만 잠시 사용합니다.
- 서버에 장기 저장하지 않습니다.
- 결과 공유는 이미지 원본이 아니라 결과 스냅샷 중심으로 처리합니다.

## Cloudflare 배포 준비

이 프로젝트는 App Router + Route Handler 기준으로 작성되어 있어 Cloudflare 배포 전환이 비교적 쉽습니다.

권장 방향:

1. GitHub 저장소에 푸시
2. Cloudflare Pages 또는 Workers 배포 시 OpenNext Cloudflare 어댑터 사용 검토
3. 환경변수 등록
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `AI_MOCK_MODE`

배포 전 체크:

- 이미지 분석 API 호출이 필요한 경우 환경변수 등록
- mock 모드로 배포할 경우 `AI_MOCK_MODE=true`
- 실제 API 모드로 배포할 경우 `AI_MOCK_MODE=false`

## 스크립트

```bash
npm run dev
npm run lint
npm run build
```

## 정책 주의사항

이 앱은 다음을 하지 않습니다.

- 외모 점수화
- 미남/미녀/못생김 판정
- 민감 속성 추정
- 차별적 표현
- 성형 추천

이 앱은 다음만 다룹니다.

- 분위기
- 무드
- 장르 결
- 캐릭터 역할 추천

## 추후 확장 아이디어

- OG 이미지 동적 생성
- 결과 카드 이미지 다운로드
- 실제 AI 모델 교체
- 공유 카드 이미지 생성
- 업로드 히스토리 없는 익명 세션 결과 관리
