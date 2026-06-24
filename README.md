# myungni_next

대치수프리마 입시&코칭센터의 `입시 DNA 프리즘` 진단 웹앱입니다.

## 주요 경로

- `/first-screen`: 첫 화면
- `/new`: 기본 정보 입력
- `/questionnaire`: 기질 진단 문항
- `/almost-complete`: 리포트 생성 직전 안내
- `/report-issue`: 종합 리포트 렌더링
- `/report-template`: 리포트 양식 확인
- `/consultation/apply`: 상담 신청

## 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 `/first-screen`으로 리다이렉트됩니다.

## 검증

```bash
npm.cmd run lint
npm run build
```

PowerShell 실행 정책 때문에 `npm`이 막히는 환경에서는 `npm.cmd`를 사용합니다.

## 데이터 저장

- 기본 저장 모드: PocketBase
- 기본 엔드포인트: `https://suprima-platform-pb.fly.dev`
- 보고서 컬렉션: `myungni_next_report_records`
- 상담 신청 컬렉션: `myungni_next_consultation_requests`

저장 로직은 [src/lib/reportStore.ts](C:\Users\chris\Desktop\새 폴더\myungni_next\src\lib\reportStore.ts)에 있습니다.

## 참고

- `src/data/report_reference.json`은 스크립트 추출용 참조 데이터입니다.
- 실제 런타임 진단 화면과 리포트 구성의 핵심 로직은 `src/app/**`, `src/components/report/**`, `src/lib/reportForm.ts`, `src/lib/reportMapping.ts`에 있습니다.
