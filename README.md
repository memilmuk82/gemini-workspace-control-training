# Google의 생성형 AI Gemini를 활용한 행정 업무 경감과 AI 리터러시 학습

특성화고 교사를 위한 100분 연수 자료 프로젝트다. Google 공식 사용자 문서를 기준으로 실제 UI를 검증하고, 확인된 화면만 웹 슬라이드에 사용한다.

## 현재 상태

- 평가계획 연계 Evidence Capture 136개 검증 항목 정리 완료
- 교육용·개인 Google 계정의 기능 차이 기록 완료
- 실제 학생 개인정보·평가 데이터 미사용 확인
- 단계·계정·실행·결과·공식 출처·슬라이드 용도를 `captures/course-aligned/capture-index.md`에 기록
- HTML/CSS/Vanilla JavaScript 웹 슬라이드 153장 제작 완료
- `#/slide/1` 라우팅·키보드 이동·전체화면·PDF 인쇄 구현
- 과정의 맥락이 끊기지 않도록 입력·결과를 분리하거나 함께 제시하고, 필요한 장면만 제한적으로 확대
- 153페이지 16:9 배포용 PDF 생성 및 전체 페이지 렌더링 검수 완료

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

`Harness`는 목표·자료·금지·출력·실패·검증 조건을 설계하는 방법이고, `Verification Loop`는 초안·검토·수정을 반복하는 방법이다.

## 주요 파일

- `capture-index.md`: 현재 평가계획 연계 캡처 인덱스와 레거시 자료의 구분
- `captures/course-aligned/capture-index.md`: 새 캡처별 계정 유형·단계·실행 내용·결과·공식 출처·슬라이드 용도
- `evidence-run-log.md`: 실제 실행 기록과 공식 문서·UI 차이
- `privacy-review.md`: 개인정보 검수 결과와 공개본 처리 원칙
- `evidence-capture-plan.md`: 캡처 범위와 안전 원칙
- `captures/`: 실제 Google UI 단계별 캡처
- `test-data/`: 학생 개인정보가 없는 연수용 합성 입력
- `materials/연수용-파이썬프로그래밍-평가계획.pdf`: 자신의 평가계획이 없을 때 사용할 다운로드용 예시
- `materials/연수용-Classroom-루브릭-시트.xlsx`: Classroom 루브릭 내보내기 결과를 확인하는 실습용 시트
- `capture-harness/`: 교육/개인 계정을 분리한 로컬 Evidence Capture 도구
- `web-slides/`: 편집·발표·PDF 출력용 웹 슬라이드 마스터
- `design/`: 디자인 시스템·강의 구조·초기 콘셉트 기록
- `output/pdf/gemini-workspace-control-training.pdf`: 오프라인·배포용 153페이지 PDF

## 웹 슬라이드 열기

`web-slides/index.html`을 로컬 웹 서버로 열면 된다. 주소 뒤에 `#/slide/1`처럼 슬라이드 번호를 붙여 바로 이동할 수 있다.

- 공개 연수 자료: <https://memilmuk82.github.io/gemini-workspace-control-training/>
- Padlet에는 위 주소를 링크로 추가하면 첫 슬라이드부터 바로 열린다.

- `←` `→`: 이전/다음 슬라이드
- `F`: 전체화면
- `P`: 전체 슬라이드 인쇄 또는 PDF 저장

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
