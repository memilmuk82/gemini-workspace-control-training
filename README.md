# Gemini & Workspace 실전 통제술

특성화고 교사를 위한 100분 연수 자료 프로젝트다. Google 공식 사용자 문서를 기준으로 실제 UI를 검증하고, 확인된 화면만 웹 슬라이드에 사용한다.

## 현재 상태

- Evidence Capture 56개 완료
- 교육용·개인 Google 계정의 기능 차이 기록 완료
- 실제 학생 개인정보·평가 데이터 미사용 확인
- 캡처 파일과 `capture-index.md` 56행 일치 확인
- HTML/CSS/Vanilla JavaScript 웹 슬라이드 제작 예정

## 연수 흐름

1. Gemini in Classroom
2. 좋은 Prompt
3. Harness
4. Verification Loop
5. Classic Gems
6. Gemini Notebook
7. Workspace Studio
8. New Gems from Google Labs
9. Gemini Spark / Skills

`Harness`와 `Verification Loop`는 Google의 공식 기능명이 아니라 이 연수의 통제 프레임이다.

## 주요 파일

- `capture-index.md`: 캡처별 계정 유형·단계·실행 내용·결과·공식 출처·슬라이드 용도
- `evidence-run-log.md`: 실제 실행 기록과 공식 문서·UI 차이
- `privacy-review.md`: 개인정보 검수 결과와 공개본 처리 원칙
- `evidence-capture-plan.md`: 캡처 범위와 안전 원칙
- `captures/`: 실제 Google UI 단계별 캡처
- `test-data/`: 학생 개인정보가 없는 연수용 합성 입력
- `capture-harness/`: 교육/개인 계정을 분리한 로컬 Evidence Capture 도구

## 웹 슬라이드 요구사항

- 웹 슬라이드가 편집·발표용 마스터
- 모든 제목·본문·표·카드·화살표·주석은 HTML/CSS 요소
- 실제 Google UI만 캡처 이미지 사용
- `#/slide/1` 형식의 직접 접근
- 키보드 이동과 전체화면 지원
- print CSS로 16:9 슬라이드 한 장을 PDF 한 페이지로 출력
- 인터넷이 없는 환경에서도 로컬 발표 가능

## 개인정보 원칙

원본 캡처는 비공개 Evidence로 취급한다. 표시명·프로필 배지·개인화 목록이 보이는 원본은 공개 슬라이드에서 자르거나 HTML/CSS 마스크로 제외한다. 실제 학생 정보와 실제 성적은 사용하지 않는다.
