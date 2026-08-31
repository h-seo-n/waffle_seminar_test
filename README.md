# What Should I Bake?

Wafflestudio 24.5기 Rookie를 위한 반응형 세미나 추천 테스트입니다. 12개 성향 질문과 macOS 환경 질문을 바탕으로 React, FastAPI, Spring, iOS, Android 중 Primary Result를 추천하고, Product Engineering은 별도 추가 추천으로 제공합니다.

## 실행

```bash
npm install
npm run dev
```

## 검증 및 배포 빌드

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

추천 알고리즘은 `src/domain/scoring.ts`, 질문과 결과 카피는 각각 `src/data/questions.ts`, `src/data/seminars.ts`에서 관리합니다.
