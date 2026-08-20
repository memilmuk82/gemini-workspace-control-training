# captures

Google 실제 UI의 단계별 Evidence Capture만 저장한다. 슬라이드 전체 이미지나 상상으로 재현한 UI는 이 폴더에 넣지 않는다.

## 폴더

- `00-account-context`: 두 계정 유형과 시작 환경
- `01-gemini-classroom`: Gemini in Classroom
- `02-good-prompt`: 좋은 Prompt 전/후 비교
- `03-harness`: 연수용 통제 프레임 Harness
- `04-verification-loop`: 연수용 통제 프레임 Verification Loop
- `05-classic-gems`: Classic Gems
- `06-gemini-notebook`: Classroom 연계 Gemini Notebook
- `07-workspace-studio`: Workspace Studio
- `08-new-gems-labs`: Gems from Google Labs
- `09-spark-skills`: Gemini Spark와 Skills

## 저장 전 점검

1. 실제 학생 이름·이메일·제출물·점수가 없는가?
2. 계정 이메일이나 프로필 메뉴가 프레임에 들어오지 않았는가?
3. 로딩 중이 아닌 완료/오류 상태인가?
4. 기능명·단계·계정 유형이 파일명과 맞는가?
5. `capture-index.md`에 같은 파일명이 등록되어 있는가?

원본 캡처는 자르거나 주석을 합성하지 않는다. 슬라이드에서 필요한 번호·화살표·강조는 이후 HTML/CSS 요소로 겹쳐 표시한다.
