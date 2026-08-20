# Evidence Capture Index

- 프로젝트: 특성화고 교사를 위한 Gemini & Workspace 실전 통제술
- 기준일: 2026-08-20 (Asia/Seoul)
- 상태값: `planned` → `captured` → `verified` / `blocked`
- 개인정보 원칙: 실제 학생 이름·이메일·제출물·성적을 캡처하지 않는다. 프로필 메뉴와 계정 주소는 프레임에서 제외한다.
- 제품명 원칙: **Harness**와 **Verification Loop**는 Google 공식 기능명이 아니라 이 연수의 통제 프레임이다.

## 현재 기준 인덱스

- 사용자 제공 2026 평가계획을 비식별 재구성해 처음부터 다시 캡처한 현재 기준 자료는 [captures/course-aligned/capture-index.md](captures/course-aligned/capture-index.md)에 기록한다.
- 프롬프트 작성 파트는 Google 공식 프롬프트 자료를 우선하고, [길벗의 프롬프트 작성 팁 6가지](https://blog.naver.com/gilbutzigy/224371229233)를 비공식 실무 보완 자료로 구분해 사용한다.
- 아래 기존 표의 지역 축제 포스터 사례는 삭제하지 않고 비교·회귀 검증용 레거시 증거로만 보존한다. 새 슬라이드의 주 사례로 사용하지 않는다.

## 파일명 규칙

`{기능번호}-{단계번호}_{account}_{짧은-설명}_{YYYYMMDD}.png`

- `edu`: Google Workspace for Education 계정
- `personal`: 개인 Google 계정
- 예: `01-03_edu_rubric-prompt_20260820.png`

## 레거시 캡처 인덱스 — 지역 축제 포스터 사례

> 실제 파일이 생길 때마다 한 행씩 추가하고, 화면에서 확인된 문구와 공식 문서의 차이를 `결과/차이`에 기록한다.

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과/차이 | 공식 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `00-01_edu_classroom-entry_20260820.png` | 교육 | 계정/환경 | 진입 | Classroom 홈과 대상 수업 진입 | 교사 뷰, Gemini 메뉴, Gemini Notebook 안내, 수업 2개가 확인됨. 학생 이름·성적은 화면에 노출되지 않음 | [Classroom Help](https://support.google.com/edu/classroom/answer/15410566) | 교육 계정 환경 소개 |
| verified | `00-02_personal_gemini-entry_20260820.png` | 개인 | 계정/환경 | 진입 | Gemini 웹 앱 진입, 개인 계정 기본 화면 확인 | 개인 계정 세션 유지와 Gemini 기본 입력 화면을 확인함. 표시명이 화면에 포함되어 공개 저장소·슬라이드 사용 전 마스킹 또는 대체 캡처 필요 | [Gemini Apps Help](https://support.google.com/gemini/) | 계정별 기능 차이(비공개 원본) |
| verified | `01-01_edu_gemini-classroom-entry_20260820.png` | 교육 | Gemini in Classroom | 진입 | Classroom의 Gemini 도구 진입 | `/ai`에서 계획·시각 보조 자료·교육 자료·평가·학생 지원·행정 업무 범주와 한국어 도구가 노출됨 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 기능 위치 |
| verified | `01-02_edu_rubric-input_20260820.png` | 교육 | Gemini in Classroom | 입력 | 연수용 가상 과제와 루브릭 조건 입력 | 고등학교 2학년, 4개 성취도 등급, 4개 평가 기준, `4·3·2·1점/총점 16점`, 추정 금지 조건을 입력함 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 입력 예시 |
| verified | `01-03_edu_rubric-generated_20260820.png` | 교육 | Gemini in Classroom | 생성 | 생성된 루브릭 초안 확인 | 4개 기준×4수준은 생성됐지만 숫자 배점은 누락됨. 수준명이 `초과 / 회의 / 접근 / 접근하지 않음`으로 표시되어 한국어 번역이 부자연스러움 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 생성 결과와 UI 차이 |
| verified | `01-04_edu_rubric-verified_20260820.png` | 교육 | Gemini in Classroom | 검증 | 입력 조건과 결과를 펼쳐 교사 검토 | `완벽하게`, `전문적`, `성실하게` 등 관찰하기 어려운 표현과 총점 미반영을 수정 대상으로 판정. 화면 자체도 AI 응답 재확인을 안내함 | [Gemini responses](https://support.google.com/gemini/answer/16279220) | 교사 검토 강조 |
| verified | `01-05_edu_assignment-draft_20260820.png` | 교육 | Gemini in Classroom | 결과 | 학생에게 게시하지 않은 자료 초안 상태 확인 | `저장됨` 상태의 연수용 자료 초안과 `게시` 버튼을 확인하고 게시하지 않은 채 닫음 | [Add materials](https://support.google.com/edu/classroom/answer/9123621) | 안전한 실습 결과 |
| verified | `01-06_edu_rubric-export-sheet_20260820.png` | 교육 | Gemini in Classroom | 결과 | 기준표를 Sheets 형식으로 내보내기 | Classroom 업로드 형식의 Google Sheets가 생성됨. 시트에서도 숫자 배점 누락과 동일한 수준명 번역이 유지됨 | [Create assignments](https://support.google.com/edu/classroom/answer/6020265) | 내보내기 결과 및 재검증 |
| verified | `02-01_edu_prompt-basic_20260820.png` | 교육 | 좋은 Prompt | 입력 | 모호한 한 줄 프롬프트 입력 | `포스터 과제 루브릭 만들어줘`만 입력함 | [Prompt tips](https://support.google.com/docs/answer/15013615) | Before 입력 |
| verified | `02-01a_edu_prompt-basic-output_20260820.png` | 교육 | 좋은 Prompt | 결과 | 한 줄 프롬프트 결과 확인 | 과제 원문 없이 `내용 및 정보·시각적 구성·주제 전달력·문법 및 완성도`를 임의 구성함 | [Gemini responses](https://support.google.com/gemini/answer/16279220) | Before 결과 |
| verified | `02-02_edu_prompt-structured_20260820.png` | 교육 | 좋은 Prompt | 설정 | Persona·Task·Context·Format을 포함한 프롬프트 입력 | 역할, 학년·과제, 4개 기준, 4수준, 총점, 표 형식, 추정 표시 조건을 명시함 | [Prompt tips](https://support.google.com/docs/answer/15013615) | 프롬프트 구조 |
| verified | `02-02a_edu_prompt-structured-output_20260820.png` | 교육 | 좋은 Prompt | 결과 | 구조화 프롬프트 결과 확인 | 지정한 기준·배점·형식은 지켰지만 입력에 없던 레이아웃 스케치·그래픽 모티프·전문 용어 학습 완료 등을 추정함. 두 출력 비교는 이 파일과 `02-01a`를 HTML/CSS로 나란히 배치 | [Workspace Prompt Guide](https://workspace.google.com/learning/content/gemini-prompt-guide) | After 결과 및 Before/After |
| verified | `03-01_edu_harness-template_20260820.png` | 교육 | Harness (연수 프레임) | 설정 | 입력자료·제약·출력계약·금지사항·검증요청을 한 프롬프트로 구성 | 역할·작업·입력 범위·제약·출력 계약·검증·결측 처리 규칙을 명시함. Google 공식 기능명이 아닌 연수 프레임 | [Prompt tips](https://support.google.com/a/users/answer/14590328) | 통제 프레임 소개 |
| verified | `03-02_edu_harness-output_20260820.png` | 교육 | Harness (연수 프레임) | 생성 | 정해진 출력계약에 맞는 결과 확인 | 4개 기준×4수준·총점 16점 구조를 만들고 근거 없는 3점/2점 구간은 `확인 필요`로 남김 | [Prompt tips](https://support.google.com/docs/answer/15013615) | 통제 효과 |
| verified | `03-03_edu_harness-failure-check_20260820.png` | 교육 | Harness (연수 프레임) | 검증 | 누락·추정·근거 없음 표기 여부 확인 | 타깃·수준별 감점·완성도 정의·분량 초과 처리의 결측 목록과 총점·기준·가정·관찰 가능성·출력 길이 자체 점검을 출력함 | [Gemini responses](https://support.google.com/gemini/answer/16279220) | 실패를 드러내는 법 |
| verified | `04-01_edu_loop-draft_20260820.png` | 교육 | Verification Loop (연수 프레임) | 생성 | Harness 1차 초안을 검증 대상으로 고정 | 수정 전 초안과 `확인 필요` 구간을 보존함. Google 공식 기능명이 아닌 연수 프레임 | [Gemini responses](https://support.google.com/gemini/answer/16279220) | Loop 1단계 |
| verified | `04-02_edu_loop-critique_20260820.png` | 교육 | Verification Loop (연수 프레임) | 검증 | 주장·근거·불확실성·누락을 표로 자기검토 | 선택 근거는 `검증 가능`, 타깃 적합성·시각적 위계는 `모호함`, 완성도는 `근거 부족`으로 분류함 | [Gemini responses](https://support.google.com/gemini/answer/16279220) | Loop 2단계 |
| verified | `04-03_edu_loop-human-checklist_20260820.png` | 교육 | Verification Loop (연수 프레임) | 검증 | 사람이 원문과 대조·결정할 항목 분리 | 타깃 정의, 위계 측정 대상, 제출 형식 배점 위치, 3점/2점 부분점수 기준을 사람 확인 목록으로 남김 | [Gemini responses](https://support.google.com/gemini/answer/16279220) | Loop 3단계 |
| verified | `04-04_edu_loop-revised_20260820.png` | 교육 | Verification Loop (연수 프레임) | 결과 | 입력 자료에서 직접 확인되는 내용만 남긴 수정본 | 서체·색상 근거의 존재 여부만 평가 문장으로 유지하고 근거가 없는 다른 수준은 `확인 필요`로 원복함 | [Gemini responses](https://support.google.com/gemini/answer/16279220) | Loop 완료 |
| verified | `05-01_edu_classic-gems-entry_20260820.png` | 교육 | Classic Gems | 진입 | Gems 관리자에서 새 Gem 만들기 진입 | 교육 계정의 Gem 관리자에서 새 Gem의 이름·설명·지침·지식·미리보기 영역이 노출됨 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 기능 위치 |
| verified | `05-02_edu_classic-gems-instructions_20260820.png` | 교육 | Classic Gems | 입력 | 연수용 루브릭 점검관의 역할·작업·출력 지침 입력 | 합성 루브릭만 분석하고 누락 조건·관찰 불가능 표현·점수 구조·교사 확인 항목을 분리하도록 지침을 구성함 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 지침 작성 |
| verified | `05-03_edu_classic-gems-preview_20260820.png` | 교육 | Classic Gems | 검증 | 저장 전 미리보기에서 불완전한 가상 루브릭 입력 | 누락된 제출 조건, `창의성·성실성`의 관찰 불가능성, 점수 척도·세부 기준 부재, 교사 확인 사항을 구분해 출력함 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 미리보기 검증 |
| verified | `05-04_edu_classic-gems-saved_20260820.png` | 교육 | Classic Gems | 결과 | 연수용 Gem 저장 성공 대화상자 확인 | `Gem이 생성되었습니다` 확인 후 공유하지 않고 대화상자를 닫음. 공식 문서대로 미리보기와 저장이 별도 동작임 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 완성 결과 |
| verified | `06-01_edu_notebook-entry_20260820.png` | 교육 | Gemini Notebook | 진입 | Classroom 자료 작성 화면에서 수업을 선택하고 새 Notebook 추가 | 실제 UI는 `Gemini Notebook 추가`에서 새로 만들기/기존 자료 선택과 수업 콘텐츠 소스 선택을 제공함 | [Classroom Notebook & Gems](https://support.google.com/edu/classroom/answer/16534159) | Classroom 연계 |
| verified | `06-02_edu_notebook-source_20260820.png` | 교육 | Gemini Notebook | 입력 | 실제 데이터가 아닌 연수용 포스터 평가 원문을 `복사된 텍스트` 소스로 추가 | 공식 문서의 지원 소스 유형과 일치하며, 원문·가상 데이터 고지·평가 항목·검증 질문을 그대로 입력함 | [Add sources](https://support.google.com/notebooklm/answer/16215270) | 근거 투입 |
| verified | `06-03_edu_notebook-question_20260820.png` | 교육 | Gemini Notebook | 입력 | 제출물 3개·평가 항목 5개·총점·기한을 소스에 한정해 표로 요청 | 각 항목 인용과 `없는 내용은 명시 없음` 조건을 질문에 포함함 | [NotebookLM overview](https://support.google.com/notebooklm/answer/16164461) | grounded Q&A 입력 |
| verified | `06-03a_edu_notebook-answer_20260820.png` | 교육 | Gemini Notebook | 생성 | 소스 기반 표 답변 확인 | 제출물 3개와 평가 항목 5개를 원문대로 정리하고 각 행에 인용 `1`을 표시함. 총점과 제출 기한은 모두 `명시 없음`으로 답함 | [NotebookLM overview](https://support.google.com/notebooklm/answer/16164461) | grounded Q&A 결과 |
| verified | `06-04_edu_notebook-citation_20260820.png` | 교육 | Gemini Notebook | 검증 | 첫 번째 인라인 인용을 클릭해 원문과 대조 | `인용 세부정보`가 열리고 과제 개요·평가 원칙·교사 검증 원칙의 원문 위치를 같은 화면에서 확인함 | [NotebookLM overview](https://support.google.com/notebooklm/answer/16164461) | 출처 검증 |
| verified | `06-05a_edu_notebook-artifact-settings_20260820.png` | 교육 | Gemini Notebook | 설정 | 마인드맵의 범위와 금지 조건 입력 | 과제 개요·제출물·평가 항목·교사 검증 원칙만 포함하고 없는 총점·기한은 추가하지 않도록 설정함 | [Create a notebook](https://support.google.com/notebooklm/answer/16206563) | 산출물 통제 입력 |
| verified | `06-05_edu_notebook-artifact_20260820.png` | 교육 | Gemini Notebook | 결과 | 스튜디오에서 마인드맵 생성 및 열기 | `과제 개요 / 제출물 세 가지 / 평가 항목 다섯 가지 / 교사 검증 원칙` 가지가 보이는 마인드맵을 생성함 | [Create a notebook](https://support.google.com/notebooklm/answer/16206563) | 결과물 예시 |
| verified | `06-06_edu_notebook-classroom-draft_20260820.png` | 교육 | Gemini Notebook | 검증/결과 | Classroom으로 돌아와 Notebook 첨부 상태와 배포 여부 확인 | Notebook이 `저장됨` 자료 초안에 첨부되고 `게시`가 별도 버튼으로 남아 있음을 확인한 뒤 게시하지 않고 닫음 | [Classroom Notebook & Gems](https://support.google.com/edu/classroom/answer/16534159) | 배포 전 안전 확인 |
| verified | `07-01_edu_studio-entry_20260820.png` | 교육 | Workspace Studio | 진입 | `studio.workspace.google.com`의 둘러보기 진입 | 교육 계정에서 자연어 입력란·새 Flow·템플릿이 노출되어 기능 접근이 가능함 | [First flow](https://support.google.com/a/users/answer/16430397) | 기능 위치 |
| verified | `07-02_edu_studio-describe_20260820.png` | 교육 | Workspace Studio | 입력 | 월요일 9시 예약, 가상 메모 추출, 이전 응답 기반 체크리스트 요구 입력 | 두 Ask Gemini 내부 단계만 사용하고 Gmail·Chat·Docs·Sheets·Drive·Calendar에 쓰지 않으며 Flow를 켜지 말라는 제약을 명시함 | [Create with AI](https://support.google.com/workspace-studio/answer/16448469) | 자연어 설계 |
| verified | `07-03_edu_studio-flow_20260820.png` | 교육 | Workspace Studio | 생성 | Gemini가 만든 Starter와 Steps 확인 | `1단계: 일정에 따라`, `2단계: Gemini에게 물어보기`, `3단계: Gemini에게 물어보기`로 생성됐고 월요일 9시·매주가 반영됨 | [First flow](https://support.google.com/a/users/answer/16430397) | 구성요소 |
| verified | `07-03a_edu_studio-step2_20260820.png` | 교육 | Workspace Studio | 설정 | 2단계 고정 가상 메모와 소스 접근 범위 확인 | Ask Gemini가 가상 메모에서 제출물만 추출하도록 구성됨. 웹 검색과 Workspace 콘텐츠 접근을 모두 꺼 고정 입력 밖의 소스를 차단함 | [AI steps](https://support.google.com/a/users/answer/16431105) | 입력·소스 통제 |
| verified | `07-04_edu_studio-variable_20260820.png` | 교육 | Workspace Studio | 설정 | 2단계 생성 콘텐츠 변수를 3단계 프롬프트에 연결 | `2단계: Gemini에서 생성한 콘텐츠` 변수 칩이 3단계에 들어간 것을 확인하고 웹·Workspace 소스 접근도 끔 | [Use variables](https://support.google.com/workspace-studio/answer/16448468) | 변수 통제 |
| verified | `07-05a_edu_studio-test-warning_20260820.png` | 교육 | Workspace Studio | 검증 전 | Test run의 실제 작업 경고 확인 | 실제 메시지 전송·파일 업데이트·회의 설정 가능성을 경고함. 이번 Flow에는 외부 앱 단계가 없고 두 Gemini 내부 단계뿐임을 재확인함 | [Test run](https://support.google.com/workspace-studio/answer/16663517) | 안전 경고 |
| verified | `07-05_edu_studio-test-run_20260820.png` | 교육 | Workspace Studio | 검증 | 안전하게 제한한 Flow의 Test run 실행 | 2단계가 세 제출물을 추출하고 3단계가 변수 결과를 받아 세 확인 문장으로 변환했으며 `실행 완료됨`이 표시됨 | [Test run](https://support.google.com/workspace-studio/answer/16663517) | 실행 검증 |
| verified | `07-06_edu_studio-final_20260820.png` | 교육 | Workspace Studio | 결과 | 테스트 후 켜기 전 최종 구성 확인 | Starter와 두 Ask Gemini 단계가 남고 버튼이 계속 `사용 설정`으로 표시되어 Flow가 꺼진 상태임 | [First flow](https://support.google.com/a/users/answer/16430397) | 최종 Flow |
| verified | `08-01_edu_labs-gems-unavailable_20260820.png` | 교육 | New Gems from Labs | 진입/검증 | 교육 계정 Gem 관리자에서 Labs 영역 미노출 여부 확인 | 실제 UI에는 `Google 사전 제작`과 `내 Gems`만 있고 `Gems from Labs` 또는 Labs용 새 Gem 진입점은 보이지 않음 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 계정 제한 증거 |
| verified | `08-02_personal_labs-gems-entry_20260820.png` | 개인 | New Gems from Labs | 진입 | `Gems made by Labs`와 `My Gems from Labs`에서 New Gem 진입점 확인 | 교육 계정과 달리 개인 계정 Gem 관리자에 Labs 영역과 `New Gem` 카드가 실제로 노출됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 개인 계정 시연 |
| verified | `08-03_personal_labs-gems-prompt_20260820.png` | 개인 | New Gems from Labs | 입력 | 루브릭 점검 미니앱의 입력·네 출력 섹션·금지사항을 자연어로 요구 | 두 입력만 비교하고 결측은 `확인 필요`, 웹·Workspace 접근과 저장·공유·발송 금지를 명시함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 앱 생성 입력 |
| verified | `08-04_personal_labs-gems-workflow_20260820.png` | 개인 | New Gems from Labs | 생성 | 생성된 workflow steps와 preview 확인 | 요청 제목은 `수행평가 루브릭 점검 실험실 (연수용)`이었으나 Gem 이름은 `루브릭체크`로 축약됨. `Task Requirements → Rubric Draft → Analyze Rubric Draft → Generate Analysis Report` 4단계가 생성됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | Classic Gem 비교 |
| verified | `08-05a_personal_labs-gems-task-input_20260820.png` | 개인 | New Gems from Labs | 입력 | 가상 포스터 과제의 제출물·4개 평가 항목·총점 16점 입력 | 실제 학생 정보·성적 없이 합성 과제 요구사항만 입력함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 입력 1단계 |
| verified | `08-05b_personal_labs-gems-rubric-input_20260820.png` | 개인 | New Gems from Labs | 입력 | 모호한 `창의성·성실성`과 총점 20점의 불완전한 가상 루브릭 입력 | 요구 총점 16점과 의도적으로 불일치하는 합성 루브릭을 검증 대상으로 입력함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 입력 2단계 |
| verified | `08-05_personal_labs-gems-run_20260820.png` | 개인 | New Gems from Labs | 검증/결과 | Start app 실행 후 입력·상단 결과 확인 | 입력 원문과 `누락된 요구사항`, `관찰하기 어려운 표현` 결과가 같은 화면에 표시됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 미니앱 전체 구조 |
| verified | `08-05c_personal_labs-gems-run-details_20260820.png` | 개인 | New Gems from Labs | 검증/결과 | 네 결과 카드의 실제 판정 확인 | 요구 평가 기준 누락, `매우 창의적·성실하게 수행`의 객관 기준 부재, `16점 대 20점` 불일치, 교사가 추가 정의할 항목을 분리함. 입력에 없던 학년·기한·제출 방법은 사실 단정이 아니라 교사 결정 대상으로 제안됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | Verification Loop 연결 |
| verified | `09-01_edu_spark-before-shortcut_20260820.png` | 교육 | Spark/Skills | 검증 전 | 교육 계정 Gemini 기본 화면에서 단축키 입력 전 상태 저장 | `/app` 기본 화면을 동일한 창·배율로 캡처함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | 전/후 비교 |
| verified | `09-02_edu_spark-after-shortcut_20260820.png` | 교육 | Spark/Skills | 검증 | `Ctrl+Shift+S` 실제 입력 직후 화면 | 공식 문서는 work/school 계정 미지원이라고 하지만 실제 UI는 `/spark`로 이동해 `Gemini Spark 베타를 만나보세요` 첫 사용 안내를 표시함. 완전한 사용 가능 여부는 동의를 진행하지 않아 미확정 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | 공식 문서와 실제 UI 차이 |
| verified | `09-03_personal_spark-entry_20260820.png` | 개인 | Spark/Skills | 진입 | 개인 계정에서 `/spark` 진입과 첫 사용 안내 확인 | 개인 계정에서는 `Gemini Spark 베타를 만나보세요` 안내가 열림. 연결 앱·로그인 웹사이트·위치 정보 사용, 서드파티 공유, 원격 브라우저 데이터 저장과 감독 필요 위험을 고지하며 `나중에 / 계속` 선택을 요구함. 동의 전 상태로 캡처 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | 기능 위치·동의 범위 |
| verified | `09-03b_personal_spark-home_20260820.png` | 개인 | Spark/Skills | 진입 | 동의 완료 후 Spark 홈 확인 | 작업 입력란, 최근 작업, 추천 작업이 노출되고 계정 상세가 있는 사이드바는 닫은 상태로 캡처함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | 실제 작업 화면 |
| verified | `09-04_personal_skill-create_20260820.png` | 개인 | Spark/Skills | 설정 | `루브릭 근거 점검 (연수용)` Skill의 이름·설명·지침 작성 | 제공된 합성 입력만 분석하고 외부 앱·개인 인텔리전스 접근 금지, 결측은 `확인 필요`, 여섯 섹션 출력 규칙을 입력함 | [Effective skills](https://support.google.com/gemini/answer/17102773) | Skill 정의 |
| verified | `09-04b_personal_skill-saved_20260820.png` | 개인 | Spark/Skills | 생성 | Skill 저장 후 이름 정규화 확인 | 저장 뒤 표시 이름이 `루브릭-근거-점검-연수용`으로 하이픈 정규화되고 저장 버튼이 비활성화됨 | [Effective skills](https://support.google.com/gemini/answer/17102773) | Skill 저장 결과 |
| verified | `09-05_personal_spark-task_20260820.png` | 개인 | Spark/Skills | 입력 | `/` 메뉴에서 저장한 Skill을 선택해 합성 루브릭 검증 Task 구성 | 입력란에서 Skill이 굵은 `/루브릭-근거-점검-연수용` 칩으로 적용됨. 외부 앱·파일·공유·발송·일정 생성 금지 조건을 Task에도 반복함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | Task/Skill 연결 |
| verified | `09-06a_personal_spark-progress_20260820.png` | 개인 | Spark/Skills | 생성/검증 | 완료된 Task의 실행 단계 펼치기 | 결과 상단의 작업 단계를 펼치자 `합성 텍스트 비교 분석 → 정보 구분·분류 → 불일치 파악`의 세 진행 기록이 표시됨. 제출 직후에는 별도로 `Initializing task`, `진행 중`, `사고하는 중…`을 실제 UI에서 확인함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | 진행 단계와 결과 연결 |
| verified | `09-06_personal_spark-progress_20260820.png` | 개인 | Spark/Skills | 검증/결과 | Task 완료와 Skill 지침 반영 결과 확인 | 작업이 `완료`로 바뀌고 여섯 섹션과 마지막 교사 대조 경고를 출력함. 누락 기준, 모호한 표현, 16점↔20점 불일치, `확인 필요` 결정을 정확히 분리했으며 외부 앱·파일 작업은 수행하지 않음 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | Task/Skill/Schedule 구분 |

## 공식 문서와 UI 차이 기록 규칙

1. 버튼 이름·위치·언어가 다르면 화면에 보인 문자열을 그대로 적는다.
2. 기능이 없으면 `blocked`로 표시하고 빈칸으로 두지 않는다.
3. 계정 정책, 구독, 연령, 지역 제한 중 화면에서 확인된 것만 실제 원인으로 기록한다.
4. 공식 문서의 요구 조건과 실제 화면을 구분해 기록한다. 추정 원인은 `추정:` 접두어를 붙인다.
5. 같은 단계의 전/후 비교는 같은 창 크기와 배율로 캡처한다.
