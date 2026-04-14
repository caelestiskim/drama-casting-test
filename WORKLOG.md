# Drama Casting Test Worklog

## Current Project State

- Stack: `Next.js + TypeScript + Tailwind + App Router`
- Local project path: `/Users/sangsu/mock-ai-webapp`
- Local dev URL:
  - default redirect root: `http://localhost:3000/`
  - Korean locale: `http://localhost:3000/ko`
  - English locale: `http://localhost:3000/en`
  - Japanese locale: `http://localhost:3000/ja`

## Product Direction

- Service name: `드라마 캐스팅 테스트`
- Core concept:
  - upload one face photo
  - do not score or rank appearance
  - recommend drama/movie genres and character roles based on mood and casting vibe
- Tone:
  - entertainment-first
  - shareable result cards
  - Korean consumer web style, lighter and more polished than a prototype

## Major Features Implemented

- Landing page
- Upload page
- Result page
- Mock AI analysis structure
- Real AI integration point with fallback
- MediaPipe face validation in browser
- Character recommendation system
- Character copy generation
- Share flow:
  - native share
  - KakaoTalk hook
  - Instagram copy flow
  - Facebook
  - X
- Multi-language routing:
  - `ko`
  - `en`
  - `ja`
- Mobile camera capture and desktop webcam capture

## Important Technical Decisions

### 1. Gender handling

- We explicitly did **not** add automatic gender inference from face images.
- Instead, the upload flow now requires the user to choose one:
  - `남성 캐릭터 쪽`
  - `여성 캐릭터 쪽`
- Neutral selection was removed to reduce inconsistent outputs.
- Recommendation uses this choice as a hard filter plus scoring signal.

### 2. Face validation

- MediaPipe face validation is used only for:
  - face existence
  - single face check
  - approximate frontalness
  - rough face size check
- It does **not** do gender classification.
- The implementation previously depended on external CDNs and was unstable.
- This was changed to load MediaPipe assets locally from:
  - `public/mediapipe/wasm`
  - `public/mediapipe/models/face_landmarker.task`

### 3. Result generation

- AI result schema includes:
  - `moodTags`
  - `genreScores`
  - `roleScores`
  - `topCharacters`
  - `shortSummary`
  - `cautionMessage`
- If real API fails or is disabled, mock mode is used.
- Mock results are deterministic from image/file input, not pure random.

## Recommendation / Character System

- Character data lives in:
  - `src/data/characters.ts`
- Result copy lives in:
  - `src/lib/buildResultCopy.ts`
- Recommendation mapping lives in:
  - `src/lib/ai/mapToCharacter.ts`

### Gender-specific improvements already added

- Split:
  - `로맨스 서브남`
  - `로맨스 서브녀`
- Added female counterparts to improve consistency:
  - `재벌가 상속녀`
  - `사극의 젊은 여군주`
  - `냉미녀 CEO`

## Reference Sections Added

- Work references:
  - `이런 작품 분위기도 잘 어울려요`
- Actor mood references:
  - `비슷한 무드의 배우 레퍼런스`
- Important:
  - these are framed as mood references, not look-alike matches

## Multi-language Structure

- Locale routing lives under:
  - `src/app/[locale]/...`
- Locale helpers:
  - `src/lib/i18n.ts`
- UI copy dictionary:
  - `src/lib/copy.ts`
- Language switcher:
  - `src/components/locale-switcher.tsx`

## Camera / Upload Flow

- File picker supported
- Mobile capture supported via `capture="user"`
- Desktop webcam capture supported via `getUserMedia`
- Upload panel component:
  - `src/components/upload-panel.tsx`

## Trust / UX Improvements Added

- Upload page now shows trust chips:
  - free
  - JPG/PNG/HEIC
  - 10MB
  - no photo storage
- Character direction selection moved near top of upload flow
- Result loading UI was upgraded from plain skeleton to staged loading cards
- Footer added on locale pages with contact info

## Contact Info Added

- Address: `Goyang-si, Gyeonggi-do, South Korea`
- Email: `caelestis@empas.com`

## Files Worth Checking First Next Time

- `src/components/upload-panel.tsx`
- `src/components/character-match-section.tsx`
- `src/components/share-buttons.tsx`
- `src/components/site-footer.tsx`
- `src/lib/buildResultCopy.ts`
- `src/lib/ai/mapToCharacter.ts`
- `src/lib/face/validateFace.ts`
- `src/lib/copy.ts`
- `src/data/characters.ts`
- `src/data/references.ts`

## Current Status

- `npm run lint` passes
- `npm run build` passes

## Recommended Next Steps

1. Replace footer placeholder sections with dedicated policy pages
2. Improve `en` and `ja` result copy quality beyond UI labels
3. Expand female/male character pair coverage further
4. Add drag-and-drop upload UX
5. Generate OG/share images for result cards

## Git / Push Note

- At the time of writing, this project does not have a git remote configured.
- To push, a specific repository URL is still needed.
