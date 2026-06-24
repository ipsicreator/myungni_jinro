# myungni_next 기술 명세서

## 1. 서비스 개요

`myungni_next`는 대치수프리마 입시&코칭센터의 진단 웹앱입니다.  
학생 기본 정보와 진단 응답을 바탕으로 종합 리포트를 생성하고, 상담 신청까지 연결합니다.

핵심 사용자 플로우:

1. 첫 화면 진입
2. 기본 정보 입력
3. 기질 진단 문항 응답
4. 리포트 생성 직전 안내
5. 종합 리포트 확인
6. 상담 신청

## 2. 기술 스택

- 프레임워크: Next.js `16.2.4`
- 런타임: React `19.2.4`
- 언어: TypeScript
- 스타일: Tailwind CSS v4 + 전역 CSS
- 데이터 저장: PocketBase 기본, 로컬 SQLite 대체 지원

## 3. 주요 라우트

### 사용자 화면

- `/first-screen`
- `/new`
- `/questionnaire`
- `/almost-complete`
- `/report-issue`
- `/report-template`
- `/report-12p`
- `/consultation/apply`
- `/ebook/prism-dna`
- `/ebook/prism-dna/consultation`

### API

- `POST /api/report-sync`
- `POST /api/consultation/apply`

## 4. 데이터 저장 구조

저장 로직은 [src/lib/reportStore.ts](C:\Users\chris\Desktop\새 폴더\myungni_next\src\lib\reportStore.ts)에 구현되어 있습니다.

### 기본 저장 모드

- 환경 변수 `REPORT_STORE_MODE`가 `sqlite`가 아니면 PocketBase 사용
- 기본 PocketBase URL:
  - `https://suprima-platform-pb.fly.dev`

### PocketBase 컬렉션

- `myungni_next_report_records`
  - 보고서 메타데이터
  - 학생 식별 키
  - 리포트 JSON
  - 답변 JSON
- `myungni_next_consultation_requests`
  - 상담 신청 정보
  - 연결된 리포트 ID
  - 보호자 연락처 및 희망 일정

### 로컬 대체 저장

- 경로: `data/report_store.sqlite`
- 목적: PocketBase 없이 로컬 검증 가능하도록 유지

## 5. 핵심 소스 파일

### 앱 진입 및 화면

- [src/app/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\page.tsx)
- [src/app/first-screen/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\first-screen\page.tsx)
- [src/app/new/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\new\page.tsx)
- [src/app/questionnaire/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\questionnaire\page.tsx)
- [src/app/almost-complete/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\almost-complete\page.tsx)
- [src/app/report-issue/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\report-issue\page.tsx)
- [src/app/report-template/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\report-template\page.tsx)
- [src/app/consultation/apply/page.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\consultation\apply\page.tsx)

### 리포트 구성

- [src/components/report/ReportFormView.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\components\report\ReportFormView.tsx)
- [src/lib/reportForm.ts](C:\Users\chris\Desktop\새 폴더\myungni_next\src\lib\reportForm.ts)
- [src/lib/reportMapping.ts](C:\Users\chris\Desktop\새 폴더\myungni_next\src\lib\reportMapping.ts)
- [src/lib/prismData.ts](C:\Users\chris\Desktop\새 폴더\myungni_next\src\lib\prismData.ts)

## 6. 설정

### Next 설정

[next.config.ts](C:\Users\chris\Desktop\새 폴더\myungni_next\next.config.ts)

- `turbopack.root = process.cwd()`
- 상위 폴더 lockfile 오탐지 방지

### 전역 메타데이터

[src/app/layout.tsx](C:\Users\chris\Desktop\새 폴더\myungni_next\src\app\layout.tsx)

- 제목: `입시 DNA 프리즘`
- 설명: `대치수프리마 입시&코칭센터 진단 서비스`

## 7. 검증 명령

```bash
npm.cmd run lint
npm run build
```

PowerShell 환경에서 `npm` 스크립트가 실행 정책으로 막히면 `npm.cmd`를 사용합니다.

## 8. 현재 품질 상태

이번 정리 기준으로 다음은 확인되었습니다.

- 메인 사용자 플로우 화면 한글 깨짐 복구
- 핵심 대상 파일 lint 통과
- 전체 production build 통과
- Turbopack 루트 경고 제거

## 9. 남은 관리 항목

- `src/data/report_reference.json`
  - 스크립트 추출용 참조 데이터
  - 런타임 직접 사용 없음
  - 한글 깨짐이 남아 있으므로 필요 시 원본 기준 재생성 권장

- 루트 미추적 파일
  - `eslint_errors.txt`
  - `~$_진로_12p_보고서.docx`

서비스 무결성 기준에서 우선순위는 낮지만, 저장소 정리 단계에서 별도 처리하는 것이 적절합니다.
