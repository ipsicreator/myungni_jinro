# 서비스 품질 자동 점검 운영안

## 목적

- 작은 화면 깨짐도 놓치지 않기 위한 정기 점검
- 자동 복구 가능한 항목은 1차적으로 스크립트에서 보정
- 결과를 로그 파일로 남겨 추적 가능하게 유지

## 실행 명령

- 정적/구조 점검: `node scripts/qa-static.mjs`
- 배포 전 강화 점검: `powershell -ExecutionPolicy Bypass -File scripts/qa-release.ps1`
- 1차 자동 복구 포함 점검: `powershell -ExecutionPolicy Bypass -File scripts/qa-fix.ps1`
- 주기 점검 실행기: `powershell -ExecutionPolicy Bypass -File scripts/run-periodic-check.ps1`

## 점검 항목

1. 필수 라우트 존재 여부
2. 로컬 링크 깨짐 여부
3. 입력 검증 로직 존재 여부
4. 오류 복구 동선 존재 여부
5. 문자 깨짐 패턴 탐지
6. 타입 오류 점검
7. lint 점검
8. 프로덕션 빌드 점검

## Windows 작업 스케줄러 등록 예시

1. 작업 스케줄러 실행
2. `작업 만들기` 선택
3. `트리거` 설정
4. `매일` 또는 `매시간` 선택
5. `동작` 설정
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
- 같은 유형이 2회 이상 연속 실패하면 코드 수정 우선
- 배포 직전에도 `qa-release` 1회 실행
