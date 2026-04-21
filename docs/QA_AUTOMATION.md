# 서비스 오픈 품질 자동 점검 절차

## 목적
- 실패 1건이라도 오픈하지 않기 위한 정기 점검
- 점검 실패 시 자동 1차 복구(ESLint auto-fix) 후 재검증
- 모든 결과를 로그 파일로 누적 저장

## 실행 명령
- 정적/구조 점검: `node scripts/qa-static.mjs`
- 오픈 전 점검(강화): `powershell -ExecutionPolicy Bypass -File scripts/qa-release.ps1`
- 1차 자동복구 포함 점검: `powershell -ExecutionPolicy Bypass -File scripts/qa-fix.ps1`
- 주기 점검 실행기: `powershell -ExecutionPolicy Bypass -File scripts/run-periodic-check.ps1`

## 점검 항목
1. 핵심 라우트 존재
2. 내부 링크 깨짐 여부
3. 입력 검증 로직 존재 여부
4. 오류 복귀 동선(`error`, `global-error`, `not-found`)
5. 문자 깨짐(모지바케) 패턴
6. 타입 검사
7. 린트(경고도 실패 처리)
8. 프로덕션 빌드

## 스케줄 등록(Windows 작업 스케줄러)
1. 작업 스케줄러 실행
2. `작업 만들기` 선택
3. `트리거` 탭
4. `새로 만들기` -> `매일` 또는 `매시간`
5. `동작` 탭
6. 프로그램/스크립트:
   - `powershell.exe`
7. 인수 추가:
   - `-ExecutionPolicy Bypass -File "C:\Users\chris\Documents\Playground\myungni_next\scripts\run-periodic-check.ps1"`
8. 시작 위치:
   - `C:\Users\chris\Documents\Playground\myungni_next`
9. 저장 후 실행 테스트

## 로그 위치
- `artifacts/periodic-qa/qa-YYYYMMDD-HHMMSS.log`

## 운영 원칙
- `qa-release` 실패 시 배포 금지
- 2회 연속 실패 시 코드 수정 후 수동 재검증
- 배포 직전에도 `qa-release` 1회 수동 실행
