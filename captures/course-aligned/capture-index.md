# 평가계획 연계 Evidence Capture Index

- 기준일: 2026-08-21 (Asia/Seoul)
- 기준 자료: 사용자 제공 2026학년도 파이썬프로그래밍·응용 프로그래밍 개발 평가계획을 비식별 재구성
- 저장 위치: `captures/course-aligned/`
- 개인정보: 실제 학생 정보·실제 점수·실제 제출물 미사용
- 연수 용어: Harness는 작업 조건 설계, Verification Loop는 초안·검토·수정의 반복 과정을 뜻함
- 출처 원칙: 제품 기능은 Google 공식 문서를 우선하며, 길벗 글은 프롬프트 작성 실무 팁으로만 구분해 사용

## 00. 계정·환경

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `00-source-plan/00-01_python-evaluation-plan-page5.png` | 해당 없음 | 평가계획 원문 | 전체 | 파이썬프로그래밍 평가계획 5쪽의 평가영역·평가항목·척도 확인 | Flask 환경·변수·Jinja2·작업 일지·코드 디펜스 다섯 항목을 연수 실습의 공통 근거로 사용 | 사용자 제공 2026학년도 파이썬프로그래밍 평가계획 PDF | Classroom 입력 전 원문 이해 |
| verified | `00-source-plan/00-02_python-evaluation-plan-score-table.png` | 해당 없음 | 평가계획 원문 | 배점 | 충족 개수별 점수표를 읽을 수 있는 크기로 분리 | 5·4·3·2·1·0개를 20·18·16·14·12·10점에 대응하는 원문 확인 | 사용자 제공 2026학년도 파이썬프로그래밍 평가계획 PDF | 배점 입력 근거 |
| verified | `00-account-context/00-01_edu_classroom-home_20260820.png` | 교육 | 계정/환경 | 진입 | 교육용 계정의 Classroom 홈 확인 | 교사 수업 목록과 Gemini 진입 경로 확인. 실제 학생 성적·제출물은 노출하지 않음 | [Classroom 도움말](https://support.google.com/edu/classroom/answer/15410566) | 계정 분리와 안전 규칙 |

## 01. Gemini in Classroom

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `01-gemini-classroom/01-01_edu_gemini-classroom-entry_20260820.png` | 교육 | Gemini in Classroom | 진입 | Classroom의 Gemini 도구 열기 | 평가 범주의 루브릭 생성 도구가 교육 계정에서 노출됨 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 기능 위치 |
| verified | `01-gemini-classroom/01-02_edu_rubric-form-blank_20260820.png` | 교육 | Gemini in Classroom | 준비 | 루브릭 입력 화면을 빈 상태로 확인 | 학년·성취수준·설명 입력 구조와 생성 버튼 확인 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 입력 화면 해설 |
| verified | `01-gemini-classroom/01-03_edu_rubric-course-input_20260820.png` | 교육 | Gemini in Classroom | 입력 | Flask 평가계획의 다섯 항목과 점수 대응 입력 | 실제 학생 정보 없이 비식별 평가계획 조건만 입력함 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 실행 전 조건 확인 |
| verified | `01-gemini-classroom/01-04_edu_rubric-generating_20260820.png` | 교육 | Gemini in Classroom | 생성 | 평가기준 생성 실행 | 기준 문장 생성 중 상태가 단계적으로 표시됨 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 생성 중 화면 |
| verified | `01-gemini-classroom/01-05_edu_rubric-criteria-generated_20260820.png` | 교육 | Gemini in Classroom | 중간 결과 | 생성된 다섯 기준 확인 | 다섯 항목은 생성됐으나 기준 문구가 확장되어 원문 대조가 필요함 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 기준 수 검증 |
| verified | `01-gemini-classroom/01-06_edu_rubric-table-generating_20260820.png` | 교육 | Gemini in Classroom | 생성 | 수준별 표 생성 대기 | 기준 생성 뒤 수준별 설명 표를 별도로 생성함 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 중간 과정 |
| verified | `01-gemini-classroom/01-07_edu_rubric-course-generated_20260820.png` | 교육 | Gemini in Classroom | 전체 결과 | 완성 표를 전체 페이지로 확인 | 다섯 기준은 있으나 점수 대응이 반영되지 않고 주관적 표현이 포함됨 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 결과 전체 맥락 |
| verified | `01-gemini-classroom/01-08_edu_rubric-course-result-view_20260820.png` | 교육 | Gemini in Classroom | 검증 | 상단 기준과 수준명 확인 | 수준명이 `회의 / 접근 / 접근하지 않음`으로 부자연스럽게 표시됨 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 번역·수준명 판정 |
| verified | `01-gemini-classroom/01-09_edu_rubric-course-result-lower_20260820.png` | 교육 | Gemini in Classroom | 검증 | 하단 기준과 설명 확인 | `완벽하게`, `성실하게` 등 직접 관찰하기 어려운 표현이 나타남 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 관찰 가능성 검토 |
| verified | `01-gemini-classroom/01-10_edu_add-to-class-dialog_20260820.png` | 교육 | Gemini in Classroom | 설정 | 수업에 추가 대화상자 열기 | 수업·자료 유형 선택 후에도 실제 게시가 별도 단계로 남음 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 배포 전 경계 |
| verified | `01-gemini-classroom/01-11_edu_add-to-python-class-selected_20260820.png` | 교육 | Gemini in Classroom | 설정 | 연수용 파이썬 수업 선택 | 학생에게 공개하기 전 대상 수업만 선택함 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 대상 선택 |
| verified | `01-gemini-classroom/01-12_edu_material-draft-unpublished_20260820.png` | 교육 | Gemini in Classroom | 결과 | 자료 초안 상태 확인 | `게시`를 누르지 않은 미게시 초안으로 유지함 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 교사 승인 지점 |
| verified | `01-gemini-classroom/01-13_edu_rubric-export-sheet_20260820.png` | 교육 | Gemini in Classroom | 내보내기 | 생성 루브릭을 Sheets로 내보내기 | 내보낸 시트에도 수준명·배점 문제점이 유지됨 | [Gemini in Classroom](https://support.google.com/edu/classroom/answer/15410566) | 내보낸 결과 재검증 |

## 02. 좋은 Prompt

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `02-good-prompt/02-00_edu_gemini-new-chat_20260820.png` | 교육 | 좋은 Prompt | 진입 | 새 Gemini 대화 시작 | 비교 실험을 위한 빈 대화 상태 확보 | [Google Workspace 프롬프트 가이드](https://workspace.google.com/learning/content/gemini-prompt-guide) · [길벗 프롬프트 작성 팁](https://blog.naver.com/gilbutzigy/224371229233) | Before/After 출발점 |
| verified | `02-good-prompt/02-01_edu_prompt-basic-input_20260820.png` | 교육 | 좋은 Prompt | Before 입력 | `Flask 수행평가 루브릭 만들어줘` 입력 | 배경·목적·제약·자료가 없는 한 줄 요청 | [Google Workspace 프롬프트 가이드](https://workspace.google.com/learning/content/gemini-prompt-guide) · [길벗 프롬프트 작성 팁](https://blog.naver.com/gilbutzigy/224371229233) | 모호한 입력 |
| verified | `02-good-prompt/02-02_edu_prompt-basic-output_20260820.png` | 교육 | 좋은 Prompt | Before 결과 | 한 줄 요청 결과 확인 | 입력에 없는 일반 기준·100점 배점·조언을 임의 구성함 | [Google Workspace 프롬프트 가이드](https://workspace.google.com/learning/content/gemini-prompt-guide) · [길벗 프롬프트 작성 팁](https://blog.naver.com/gilbutzigy/224371229233) | 오류 찾기 |
| verified | `02-good-prompt/02-03_edu_prompt-structured-input_20260820.png` | 교육 | 좋은 Prompt | After 입력 | 역할·목적·평가항목·점수·표 형식·추정 금지 입력 | 길벗의 여섯 원칙 중 배경·형식·예외·단계·수정·템플릿을 교사 업무에 맞게 적용 | [Google Workspace 프롬프트 가이드](https://workspace.google.com/learning/content/gemini-prompt-guide) · [길벗 프롬프트 작성 팁](https://blog.naver.com/gilbutzigy/224371229233) | 구조화 입력 |
| verified | `02-good-prompt/02-04_edu_prompt-structured-output_20260820.png` | 교육 | 좋은 Prompt | After 결과 | 구조화 결과 상단 확인 | 다섯 기준과 점수 대응을 유지했지만 일부 추가 확인 후보를 생성함 | [Google Workspace 프롬프트 가이드](https://workspace.google.com/learning/content/gemini-prompt-guide) · [길벗 프롬프트 작성 팁](https://blog.naver.com/gilbutzigy/224371229233) | 형식 준수 검증 |
| verified | `02-good-prompt/02-05_edu_prompt-structured-output-final_20260820.png` | 교육 | 좋은 Prompt | 최종 검증 | 결과 끝의 자체 점검 확인 | 평가항목 수와 점수 대응은 유지. 입력 밖 내용은 교사 확인 대상으로 분리할 필요가 남음 | [Google Workspace 프롬프트 가이드](https://workspace.google.com/learning/content/gemini-prompt-guide) · [길벗 프롬프트 작성 팁](https://blog.naver.com/gilbutzigy/224371229233) | Before/After 비교 |

## 03. Harness — 작업 조건 설계

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `03-harness/03-01_edu_harness-course-input_20260820.png` | 교육 | Harness | 입력 | 목표·입력 범위·금지·출력·실패·검증 계약 입력 | 평가계획과 합성 기록만 사용하도록 작업 경계를 설정함 | [Google 프롬프트 도움말](https://support.google.com/docs/answer/15013615) | 작업 조건 설계 |
| verified | `03-harness/03-02_edu_harness-course-output_20260820.png` | 교육 | Harness | 결과 | 다섯 항목 대조 결과 확인 | 환경·변수는 서술 기록만으로 확인 처리해 실제 코드 증거와 구분할 필요가 드러남 | [Google 프롬프트 도움말](https://support.google.com/docs/answer/15013615) | 통제 효과와 한계 |
| verified | `03-harness/03-03_edu_harness-context-top_20260820.png` | 교육 | Harness | 입력 전체 | 평가계획·합성 작업 기록·여섯 줄 작업 조건의 상단을 같은 대화에서 확인 | 강의자가 무엇을 입력했는지 보이는 전체 맥락을 확보함 | [Google 프롬프트 도움말](https://support.google.com/docs/answer/15013615) | 입력 맥락 |
| verified | `03-harness/03-04_edu_harness-context-lower_20260820.png` | 교육 | Harness | 결과 전체 | 입력 뒤 생성된 표와 확인 필요 항목을 같은 대화에서 확인 | 프롬프트와 결과의 관계를 설명할 수 있는 하단 맥락을 확보함 | [Google 프롬프트 도움말](https://support.google.com/docs/answer/15013615) | 결과 맥락 |

## 04. Verification Loop — 초안·검토·수정의 반복 과정

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `04-verification-loop/04-01_edu_loop-course-draft_20260820.png` | 교육 | Verification Loop | 초안 | Harness 결과를 검증 대상으로 고정 | 수정 전 판정을 보존함 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 1단계 초안 |
| verified | `04-verification-loop/04-02_edu_loop-critique-input_20260820.png` | 교육 | Verification Loop | 검증 입력 | 주장·근거·불확실성·누락 분류 요청 | 초안을 바로 고치지 않고 먼저 비판하도록 분리함 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 2단계 요청 |
| verified | `04-verification-loop/04-03_edu_loop-critique-output_20260820.png` | 교육 | Verification Loop | 검증 결과 | 초안의 증거 수준 확인 | 서술만 있는 항목을 직접 증거로 확정할 수 없다고 판정함 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 2단계 비판 |
| verified | `04-verification-loop/04-04_edu_loop-human-checklist_20260820.png` | 교육 | Verification Loop | 사람 검토 | 교사가 확인할 코드·일지·구두 증거 분리 | 사람 승인 없이는 최종 평가로 넘어가지 않도록 체크리스트화함 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 3단계 사람 확인 |
| verified | `04-verification-loop/04-05_edu_loop-revision-input_20260820.png` | 교육 | Verification Loop | 수정 입력 | 문제·이유·원하는 상태를 명시해 수정 요청 | 서술 기반 확정을 부분 확인 또는 근거 없음으로 낮추도록 요구함 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 4단계 수정 요청 |
| verified | `04-verification-loop/04-06_edu_loop-revised-output_20260820.png` | 교육 | Verification Loop | 수정 결과 | 근거 수준을 반영한 최종본 확인 | 1~4는 부분 확인, 5는 근거 없음으로 조정하고 학생 점수는 만들지 않음 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | Loop 완료 |
| verified | `04-verification-loop/04-07_edu_loop-context-draft_20260820.png` | 교육 | Verification Loop | 초안 전체 | 사용자 입력과 초안 표를 함께 보이도록 재캡처 | 어떤 요청에서 초안이 나왔는지 한 화면에서 파악 가능 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 초안 맥락 |
| verified | `04-verification-loop/04-08_edu_loop-context-critique_20260820.png` | 교육 | Verification Loop | 검토 전체 | 검토 요청과 근거 분류 결과를 함께 보이도록 재캡처 | 직접 증거·서술 증거·근거 없음의 판정 과정을 한 화면에서 확인 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 검토 맥락 |
| verified | `04-verification-loop/04-09_edu_loop-revised-complete_20260820.png` | 교육 | Verification Loop | 수정 전체 | 구체적 수정 요청과 완성 결과를 전체 화면으로 재캡처 | 수정 전 확정 문장이 부분 확인·근거 없음으로 조정된 맥락 확인 | [Gemini 응답 재확인 안내](https://support.google.com/gemini/answer/16279220) | 수정 결과 맥락 |

## 05. Classic Gems

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `05-classic-gems/05-00_personal_gemini-settings-menu_20260820.png` | 개인 | Gemini 요청 사항 | 진입 | 개인 계정 Gemini 설정 메뉴 열기 | 개인화 기능의 진입 위치를 확인함 | [Gemini 요청 사항 도움말](https://support.google.com/gemini/answer/16598625) | 개인 설정 진입 |
| verified | `05-classic-gems/05-00_personal-intelligence-menu_20260820.png` | 개인 | Gemini 요청 사항 | 설정 | 개인 인텔리전스에서 Gemini 요청 사항 카드 확인 | 모든 일반 대화에 반복할 응답 선호와 특정 업무용 Gem의 용도를 구분함 | [Gemini 요청 사항 도움말](https://support.google.com/gemini/answer/16598625) | 요청 사항과 Gem 비교 |
| verified | `05-classic-gems/05-01_edu_gems-entry_20260820.png` | 교육 | Classic Gems | 진입 | 교육 계정 Gem 관리자 열기 | 내 Gems와 새 Gem 진입점이 노출됨 | [맞춤 Gem 만들기](https://support.google.com/gemini/answer/15235603) | 기능 위치 |
| verified | `05-classic-gems/05-02_edu_new-gem-blank_20260820.png` | 교육 | Classic Gems | 준비 | 새 Gem 빈 편집 화면 확인 | 이름·지침·지식·미리보기 영역이 분리됨 | [맞춤 Gem 만들기](https://support.google.com/gemini/answer/15235603) | 설정 구조 |
| verified | `05-classic-gems/05-03_edu_gem-course-settings_20260820.png` | 교육 | Classic Gems | 설정 | Flask 평가계획 정합성 점검관 지침 입력 | 다섯 기준과 학생 점수 추정 금지를 반복 요청으로 저장함 | [맞춤 Gem 만들기](https://support.google.com/gemini/answer/15235603) | 반복 지침 |
| verified | `05-classic-gems/05-04_edu_gem-preview-input_20260820.png` | 교육 | Classic Gems | 미리보기 입력 | 합성 작업 기록으로 저장 전 시험 | 실제 학생 자료 없이 기능을 점검함 | [맞춤 Gem 만들기](https://support.google.com/gemini/answer/15235603) | 검증 입력 |
| verified | `05-classic-gems/05-05_edu_gem-preview-output_20260820.png` | 교육 | Classic Gems | 미리보기 결과 | Gem 응답 확인 | 서술형 기록을 일부 확정 증거로 취급해 교사 재검증 필요성이 남음 | [맞춤 Gem 만들기](https://support.google.com/gemini/answer/15235603) | Gem의 한계 |
| verified | `05-classic-gems/05-06_edu_gem-saved_20260820.png` | 교육 | Classic Gems | 저장 | 비공개 Gem 저장 완료 | 공유하지 않은 개인용 반복 지침으로 저장됨 | [맞춤 Gem 만들기](https://support.google.com/gemini/answer/15235603) | 저장 결과 |

## 06. Gemini Notebook

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `06-notebooklm/06-01_edu_notebooklm-entry_20260820.png` | 교육 | Gemini Notebook | 진입 | Classroom에서 Gemini Notebook 경로 확인 | 실제 UI와 서비스 명칭이 `Gemini Notebook`으로 표시됨 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 기능 위치 |
| verified | `06-notebooklm/06-02_edu_notebook-home_20260820.png` | 교육 | Gemini Notebook | 홈 | Notebook 홈과 새 Notebook 진입점 확인 | 교육 계정에서 새 Notebook 생성 가능 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 홈 화면 |
| verified | `06-notebooklm/06-03_edu_new-notebook-source-dialog_20260820.png` | 교육 | Gemini Notebook | 소스 선택 | 새 Notebook 소스 대화상자 열기 | 파일·웹·텍스트 등 소스 유형이 분리됨 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 소스 추가 |
| verified | `06-notebooklm/06-04_edu_pasted-text-blank_20260820.png` | 교육 | Gemini Notebook | 준비 | 복사된 텍스트 빈 입력 화면 확인 | 비식별 재구성 원문을 넣을 준비 상태 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 입력 화면 |
| verified | `06-notebooklm/06-05_edu_course-source-input_20260820.png` | 교육 | Gemini Notebook | 입력 | Flask 평가계획 다섯 항목과 점수·검증 원칙 입력 | 사용자 제공 PDF에서 비식별 재구성한 텍스트만 사용함 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 근거 원문 |
| verified | `06-notebooklm/06-06_edu_course-source-added_20260820.png` | 교육 | Gemini Notebook | 소스 등록 | 텍스트 소스 추가 완료 | Notebook이 한 개 소스를 근거로 인식함 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 소스 인식 |
| verified | `06-notebooklm/06-07_edu_notebook-customize-blank_20260820.png` | 교육 | Gemini Notebook | 맞춤 설정 | 맞춤 설정 빈 화면 열기 | 사용자가 요약 범위와 금지 조건을 지정할 수 있음 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 맞춤 설정 위치 |
| verified | `06-notebooklm/06-08_edu_notebook-customize-filled_20260820.png` | 교육 | Gemini Notebook | 맞춤 입력 | 다섯 항목·증거·점수·검증 원칙 중심 지침 입력 | 원문 밖 학생 특성·기한·학생별 점수 추가 금지를 지정함 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 맞춤 설정 내용 |
| verified | `06-notebooklm/06-09_edu_notebook-customized_20260820.png` | 교육 | Gemini Notebook | 맞춤 완료 | 맞춤 설정 적용 상태 확인 | 지정한 초점이 Notebook에 저장됨 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 맞춤 결과 |
| verified | `06-notebooklm/06-10_edu_notebook-query-input_20260820.png` | 교육 | Gemini Notebook | 질문 | 평가항목·증거·점수 대응·인용 요청 | 원문에 없으면 명시 없음으로 답하도록 요구함 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 근거 질문 |
| verified | `06-notebooklm/06-11_edu_notebook-answer_20260820.png` | 교육 | Gemini Notebook | 답변 | 소스 기반 결과 확인 | 다섯 항목과 점수 대응을 유지하고 기한·학생 점수는 `명시 없음`으로 처리함 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | grounded 결과 |
| verified | `06-notebooklm/06-12_edu_notebook-citation-open_20260820.png` | 교육 | Gemini Notebook | 인용 검증 | 인라인 인용을 열어 원문 대조 | 답변과 근거 문장을 같은 화면에서 확인함 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | Citation 검증 |

## 07. Workspace Studio

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `07-workspace-studio/07-01_edu_studio-entry_20260820.png` | 교육 | Workspace Studio | 진입 | 교육 계정 Studio 열기 | 자연어로 Flow를 만드는 진입점이 노출됨 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 기능 위치 |
| verified | `07-workspace-studio/07-02_edu_studio-course-input_20260820.png` | 교육 | Workspace Studio | 입력 | 월요일 9시·합성 기록·다섯 항목 점검·외부 쓰기 금지 입력 | 실제 발송·공유·파일 수정 없이 내부 Gemini 단계만 요청함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 자연어 설계 |
| verified | `07-workspace-studio/07-03_edu_studio-generating_20260820.png` | 교육 | Workspace Studio | 생성 중 | AI Flow 생성 대기 | Starter와 Step을 구성하는 중 상태 확인 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 생성 과정 |
| verified | `07-workspace-studio/07-03_edu_studio-course-flow_20260820.png` | 교육 | Workspace Studio | 초기 Flow | 자동 생성된 Starter와 Step 확인 | 월요일 9시는 반영됐지만 2단계가 예상과 다른 Extract로 생성됨 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 초기 구조 |
| verified | `07-workspace-studio/07-04_edu_studio-step2-course-input_20260820.png` | 교육 | Workspace Studio | 설정 | 2단계에 합성 작업 기록 입력 | Flask 다섯 항목만 추출하도록 구성함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | Step 입력 |
| verified | `07-workspace-studio/07-05_edu_studio-step2-configured_20260820.png` | 교육 | Workspace Studio | 설정 | 2단계 추출 규칙 확인 | 추출 출력 구조가 생겼지만 다음 단계 참조와 호환되지 않음 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | Step 설정 |
| verified | `07-workspace-studio/07-06_edu_studio-step3-reference_20260820.png` | 교육 | Workspace Studio | 변수 연결 | 3단계에서 2단계 결과 참조 시도 | 참조가 비어 있거나 사용할 수 없는 상태가 드러남 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 연결 오류 |
| verified | `07-workspace-studio/07-07_edu_studio-step3-prompt-sources-off_20260820.png` | 교육 | Workspace Studio | 소스 제한 | 3단계 웹·Workspace 소스 끄기 | 고정 합성 입력 밖의 자료 접근을 차단함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 소스 통제 |
| verified | `07-workspace-studio/07-08_edu_studio-step3-variable_20260820.png` | 교육 | Workspace Studio | 변수 연결 | 2단계 생성 콘텐츠 변수 삽입 | 변수 칩은 보이지만 실제 실행 참조는 실패함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 변수 화면 |
| verified | `07-workspace-studio/07-09_edu_studio-test-panel_20260820.png` | 교육 | Workspace Studio | 검증 준비 | Test run 패널 열기 | 실행 경고와 단계 입력을 확인함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 테스트 전 경계 |
| verified | `07-workspace-studio/07-10_edu_studio-test-running_20260820.png` | 교육 | Workspace Studio | 테스트 | 초기 Flow 실행 | Step이 순차 실행되는 중 상태 확인 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 실행 과정 |
| verified | `07-workspace-studio/07-11_edu_studio-test-result_20260820.png` | 교육 | Workspace Studio | 실패 결과 | 초기 Flow 결과 확인 | 잘못된 참조 때문에 마지막 단계가 기대 결과를 받지 못함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 오류 증거 |
| verified | `07-workspace-studio/07-12_edu_studio-rebuilt-step2_20260820.png` | 교육 | Workspace Studio | 재구성 | 2단계를 Ask Gemini로 다시 만들기 | 합성 기록을 다섯 상태로 분류하는 응답 생성에 성공함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 수정된 Step |
| verified | `07-workspace-studio/07-13_edu_studio-rebuilt-step3-variable_20260820.png` | 교육 | Workspace Studio | 재연결 | 재구성한 2단계 결과 변수를 3단계에 삽입 | 변수 칩과 소스 제한을 다시 확인함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 재연결 |
| verified | `07-workspace-studio/07-14_edu_studio-rebuilt-test-result_20260820.png` | 교육 | Workspace Studio | 재테스트 | 재구성 Flow 실행 | 2단계는 성공했지만 3단계가 이전 결과를 받지 못했다고 판단함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 변수 한계 |
| verified | `07-workspace-studio/07-15_edu_studio-step3-fallback_20260820.png` | 교육 | Workspace Studio | 보완 | 원본 합성 기록을 3단계에 보조 입력 | 참조 실패를 대비한 fallback을 추가함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 실패 대응 |
| verified | `07-workspace-studio/07-16_edu_studio-variable-limit-result_20260820.png` | 교육 | Workspace Studio | 최종 테스트 | 변수와 fallback을 포함해 실행 | 2단계 성공에도 3단계는 변수 결과 부재를 주장해 실제 UI 한계로 기록함 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 최종 검증 |
| verified | `07-workspace-studio/07-17_edu_studio-final-off_20260820.png` | 교육 | Workspace Studio | 종료 | Flow가 꺼진 최종 상태 확인 | `사용 설정`을 누르지 않아 예약 실행·외부 쓰기가 발생하지 않음 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | 안전 종료 |

## 08. New Gems from Google Labs

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `08-new-gems/08-01_personal_new-gems-entry_20260820.png` | 개인 | New Gems from Labs | 진입 | 개인 계정 Gem 관리자에서 Labs 영역 확인 | Gems made by Labs·My Gems from Labs·New Gem이 노출됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 교육 계정과 비교 |
| verified | `08-new-gems/08-02_personal_new-gem-blank_20260820.png` | 개인 | New Gems from Labs | 준비 | New Gem 빈 입력 화면 열기 | AI 미니 앱 설명란과 Labs 비공식·재확인 안내가 표시됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 입력 화면 |
| verified | `08-new-gems/08-03_personal_new-gem-course-input_20260820.png` | 개인 | New Gems from Labs | 입력 | 평가계획·합성 기록 두 입력과 네 결과 영역 요구 | 점수·성취수준 추정 금지와 표 출력을 명시함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 앱 생성 Prompt |
| verified | `08-new-gems/08-04_personal_new-gem-generating_20260820.png` | 개인 | New Gems from Labs | 생성 중 | 앱 계획 생성 대기 | Planning 상태와 단계 슬롯 확인 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 생성 과정 |
| verified | `08-new-gems/08-05_personal_new-gem-steps_20260820.png` | 개인 | New Gems from Labs | 생성 | 자동 생성된 네 단계 확인 | Evaluation Plan → Synthesis Record → Analyze and Format Table → Render Analysis Table로 구성됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | Workflow 전체 |
| verified | `08-new-gems/08-06_personal_new-gem-evaluation-input_20260820.png` | 개인 | New Gems from Labs | 입력 1 | Flask 평가계획 다섯 항목과 점수 입력 | 첫 입력을 독립 화면으로 확보함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 평가계획 입력 |
| verified | `08-new-gems/08-07_personal_new-gem-record-input_20260820.png` | 개인 | New Gems from Labs | 입력 2 | 의도적 결측이 있는 합성 작업 기록 입력 | Dictionary·if·일지·코드 디펜스 결측을 별도 화면으로 확보함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 작업 기록 입력 |
| verified | `08-new-gems/08-08_personal_new-gem-analyzing_20260820.png` | 개인 | New Gems from Labs | 분석 | 두 입력 비교 실행 | 분석·표 렌더링 단계가 순차 실행됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 검증 과정 |
| verified | `08-new-gems/08-09_personal_new-gem-result_20260820.png` | 개인 | New Gems from Labs | 결과 상단 | 네 상태 요약과 표 상단 확인 | 확인 1·부분 2·근거 없음 1·교사 확인 1로 분류함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 상단 결과 |
| verified | `08-new-gems/08-10_personal_new-gem-result-lower_20260820.png` | 개인 | New Gems from Labs | 결과 하단 | 다섯 평가항목 전체 표 확인 | 환경 확인, 변수·Jinja 부분, 일지 없음, 코드 디펜스 교사 확인으로 분리함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 전체 판정 |

## 09. Spark / Skills

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `08-spark-skills/08-01_edu_spark-before-shortcut_20260820.png` | 교육 | Spark/Skills | 단축키 전 | 교육 계정 Gemini 기본 화면 저장 | `/app` 상태를 동일 창·배율로 확보함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 교육 계정 전후 비교 |
| verified | `08-spark-skills/08-02_edu_spark-after-shortcut_20260820.png` | 교육 | Spark/Skills | 단축키 후 | `Ctrl+Shift+S` 실제 입력 | 화면과 URL에 변화가 없어 현재 교육 계정에서는 단축키가 작동하지 않음 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 교육 계정 제한 |
| verified | `09-spark-skills/09-01_personal_spark-before-shortcut_20260820.png` | 개인 | Spark/Skills | 단축키 전 | 개인 계정 Gemini 기본 화면 저장 | `/app` 상태 확보 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 개인 계정 전후 비교 |
| verified | `09-spark-skills/09-02_personal_spark-after-shortcut_20260820.png` | 개인 | Spark/Skills | 단축키 후 | `Ctrl+Shift+S` 실제 입력 | 즉시 `/spark`로 전환되어 Spark 홈이 열림 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 단축키 실제 동작 |
| verified | `09-spark-skills/09-03_personal_skills-entry_20260820.png` | 개인 | Spark/Skills | 진입 | Spark의 기능(학습 자료상 Skills) 목록 열기 | 재사용 가능한 맞춤 요청 사항과 `/` 적용 안내가 표시됨 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | Skills 위치 |
| verified | `09-spark-skills/09-04_personal_skill-blank_20260820.png` | 개인 | Spark/Skills | 준비 | 수동 Skill 빈 편집 화면 열기 | 이름·설명·요청 사항 입력란이 분리됨 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 설정 구조 |
| verified | `09-spark-skills/09-05_personal_skill-course-settings_20260820.png` | 개인 | Spark/Skills | 설정 | Flask 평가증거 점검 Skill 지침 입력 | 다섯 항목·표 형식·확인 필요·외부 쓰기 금지를 저장 대상으로 작성함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | Skill 정의 |
| verified | `09-spark-skills/09-06_personal_skill-saved_20260820.png` | 개인 | Spark/Skills | 저장 | Skill 저장 결과 확인 | 이름이 소문자·하이픈 형식으로 정규화되어 활성 목록에 나타남 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 저장 결과 |
| verified | `09-spark-skills/09-07_personal_skill-task-input_20260820.png` | 개인 | Spark/Skills | Task 입력 | 저장한 Skill 이름과 합성 작업 기록 입력 | 점수 계산 금지와 교사 확인 질문을 반복 지정함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | Task 시작 |
| verified | `09-spark-skills/09-08_personal_skill-task-running_20260820.png` | 개인 | Spark/Skills | 실행 중 | Task 실행 | 전용 Spark chat이 생성되고 진행 중·사고하는 중 상태가 표시됨 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 중간 과정 |
| verified | `09-spark-skills/09-09_personal_skill-task-result_20260820.png` | 개인 | Spark/Skills | 초기 결과 | 완료 결과 첫 화면 확인 | 표가 가로·세로 스크롤 영역이라 일부 열이 잘려 재캡처 필요 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 검증용 원본 |
| verified | `09-spark-skills/09-10_personal_skill-task-result-lower_20260820.png` | 개인 | Spark/Skills | QA | 하단 스크롤 시험 | 다섯 항목은 보이지만 열 폭이 좁아 최종 슬라이드에는 사용하지 않음 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | QA 전용 |
| verified | `09-spark-skills/09-11_personal_skill-task-result-final_20260820.png` | 개인 | Spark/Skills | QA | End 키 스크롤 시험 | 화면 변화가 없어 슬라이드 미사용 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | QA 전용 |
| verified | `09-spark-skills/09-12_personal_skill-task-result-lower2_20260820.png` | 개인 | Spark/Skills | QA | 표 셀 포커스 후 PageDown 시험 | 하단 3~5번은 보였으나 첫 열이 잘려 재캡처함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | QA 전용 |
| verified | `09-spark-skills/09-13_personal_skill-result-lower-focused_20260820.png` | 개인 | Spark/Skills | QA | 측면 패널 전환 뒤 하단 확인 | 진행률 패널이 열리고 표 첫 열이 여전히 잘림 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | QA 전용 |
| verified | `09-spark-skills/09-14_personal_skill-result-top-focused_20260820.png` | 개인 | Spark/Skills | QA | Home 키로 상단 복귀 | 상단 문맥은 보였으나 첫 열이 잘려 재캡처함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | QA 전용 |
| verified | `09-spark-skills/09-15_personal_skill-result-top-left_20260820.png` | 개인 | Spark/Skills | QA | Control+Home 시험 | 가로 위치가 바뀌지 않아 슬라이드 미사용 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | QA 전용 |
| verified | `09-spark-skills/09-16_personal_skill-result-top-recaptured_20260820.png` | 개인 | Spark/Skills | 최종 상단 좌 | 표의 평가항목·증거·상태 상단을 왼쪽 위치에서 재캡처 | 1~2번 항목과 입력·결과 맥락을 읽을 수 있음 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 상단 좌측 증거 |
| verified | `09-spark-skills/09-17_personal_skill-result-top-right_20260820.png` | 개인 | Spark/Skills | 최종 상단 우 | 표를 오른쪽으로 이동해 교사 질문 열 재캡처 | 1~2번 교사 확인 질문을 읽을 수 있음 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 상단 우측 증거 |
| verified | `09-spark-skills/09-18_personal_skill-result-lower-left_20260820.png` | 개인 | Spark/Skills | QA | 내부 스크롤 직접 이동 시험 | 앱의 가상 스크롤 동작 때문에 상단이 유지되어 슬라이드 미사용 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | QA 전용 |
| verified | `09-spark-skills/09-19_personal_skill-result-lower-left-recaptured_20260820.png` | 개인 | Spark/Skills | 최종 하단 좌 | PageDown과 왼쪽 위치로 3~5번 항목 재캡처 | Jinja2 확인, 작업 일지·코드 디펜스 확인 필요를 읽을 수 있음 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 하단 좌측 증거 |
| verified | `09-spark-skills/09-20_personal_skill-result-lower-right_20260820.png` | 개인 | Spark/Skills | 최종 하단 우 | 하단 표를 오른쪽으로 이동해 교사 질문 열 재캡처 | 작업 일지 보완과 코드 디펜스 일정 확인 질문을 읽을 수 있음 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) · [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 하단 우측 증거 |

## 10. 도구별 예제 분리 재캡처

| 상태 | 파일명 | 계정 유형 | 기능 | 단계 | 실행 내용 | 결과·차이 | 출처 | 슬라이드 용도 |
|---|---|---|---|---|---|---|---|---|
| verified | `05-classic-gems/05-07_edu_error-coach-settings_20260820.png` | 교육 | Classic Gems | 설정 | `파이썬 오류 기록 코치` 이름·설명·질문 순서·금지 조건 입력 | 평가표 생성과 분리해 반복 오류 상담용 Gem으로 구성함 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 도구별 역할 분리·지침 |
| verified | `05-classic-gems/05-08_edu_error-coach-preview-input_20260820.png` | 교육 | Classic Gems | 미리보기 입력 | 변수명이 불일치하는 합성 Flask 500 오류 기록 입력 | 실제 학생 정보 없이 `products`와 `items` 불일치를 검증 대상으로 사용함 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 오류 기록 입력 |
| verified | `05-classic-gems/05-09_edu_error-coach-preview-output_20260820.png` | 교육 | Classic Gems | 미리보기 결과 | 사실·가능한 원인·추가 질문·교사 확인 출력 확인 | 완성 코드·점수를 대신 만들지 않고 변수명 불일치를 질문으로 전환함 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 반복 대화 결과 |
| verified | `05-classic-gems/05-10_edu_error-coach-saved_20260820.png` | 교육 | Classic Gems | 저장 | 미리보기 뒤 Gem 저장 | 개인용 Gem으로 저장하고 공유하지 않음 | [Custom Gems](https://support.google.com/gemini/answer/15235603) | 저장·공유 경계 |
| verified | `06-notebooklm/06-13_edu_application-plan-source-input_20260820.png` | 교육 | Gemini Notebook | 소스 입력 | 응용 프로그래밍 개발 평가계획의 1·2학기 능력단위·평가항목·배점 입력 | 실제 학생 정보·날짜·학생별 점수 없이 비교용 근거만 추가함 | [NotebookLM 소스 추가](https://support.google.com/notebooklm/answer/16215270) | 학기 비교 원문 |
| verified | `06-notebooklm/06-14_edu_application-notebook-customized_20260820.png` | 교육 | Gemini Notebook | 맞춤 설정 | `맞춤 노트북 요약 설정`에 학기 비교·결측·인용 확인 목적 입력 | 현재 UI는 답변 스타일보다 노트북 소개 맞춤에 가까움을 확인함 | [NotebookLM 개요](https://support.google.com/notebooklm/answer/16164461) | 실제 UI 차이·맞춤 설정 |
| verified | `06-notebooklm/06-15_edu_application-notebook-query_20260820.png` | 교육 | Gemini Notebook | 질문 | 학기·능력단위·평가항목·배점·실시 날짜를 인용과 함께 표로 요청 | 소스 밖 날짜와 학생별 점수는 `명시 없음`으로 요구함 | [NotebookLM 개요](https://support.google.com/notebooklm/answer/16164461) | 근거 질문 |
| verified | `06-notebooklm/06-16_edu_application-notebook-answer_20260820.png` | 교육 | Gemini Notebook | 답변 | 1·2학기 비교표와 인라인 인용 확인 | 능력단위·평가항목·배점을 소스대로 비교하고 결측은 `명시 없음`으로 처리함 | [NotebookLM 개요](https://support.google.com/notebooklm/answer/16164461) | 학기 비교 결과 |
| verified | `06-notebooklm/06-17_edu_application-notebook-citation_20260820.png` | 교육 | Gemini Notebook | 인용 검증 | 비교표 인용 번호를 눌러 원문 위치 확인 | 답변 주장과 소스 문장을 같은 화면에서 대조함 | [NotebookLM 개요](https://support.google.com/notebooklm/answer/16164461) | Citation 검증 |
| verified | `07-workspace-studio/07-18_edu_weekly-briefing-input_20260820.png` | 교육 | Workspace Studio | QA | 월요일 수업 준비 브리핑 입력 화면 확보 시도 | 둘러보기 화면만 남아 최종 슬라이드에는 사용하지 않음 | [Workspace Studio 첫 Flow](https://support.google.com/a/users/answer/16430397) | QA 전용 |
| verified | `07-workspace-studio/07-19_edu_weekly-briefing-step_20260820.png` | 교육 | Workspace Studio | Step 설정 | 환경·GitHub·대체텍스트·코드 디펜스 준비 상태를 표로 분류하는 Ask Gemini 구성 | 웹·Workspace 소스를 끄고 합성 고정 입력만 사용함 | [AI steps](https://support.google.com/a/users/answer/16431105) | 첫 Step·소스 제한 |
| verified | `07-workspace-studio/07-20_edu_weekly-briefing-variable_20260821.png` | 교육 | Workspace Studio | 변수 연결 | 첫 Ask Gemini 생성 콘텐츠를 두 번째 단계에 연결 | Schedule Starter와 두 Ask Gemini 단계, 변수 칩의 전체 맥락을 확인함 | [Workspace Studio 변수](https://support.google.com/workspace-studio/answer/16448468) | Flow 전체·변수 |
| verified | `07-workspace-studio/07-21_edu_weekly-briefing-test-warning_20260821.png` | 교육 | Workspace Studio | Test 전 | 외부 쓰기 단계가 없는지 확인한 뒤 Test run 경고 읽기 | 실제 작업 가능성 경고를 확인하고 Flow를 사용 설정하지 않음 | [Workspace Studio Test](https://support.google.com/workspace-studio/answer/16663517) | 테스트 안전 경계 |
| verified | `07-workspace-studio/07-22_edu_weekly-briefing-test-result_20260821.png` | 교육 | Workspace Studio | Test 결과 | 합성 수업 준비 상태로 Flow 실행 | 환경 준비 완료, GitHub·대체텍스트·코드 디펜스 확인 필요를 출력했으나 입력에 없는 학생 명단 확인도 추가해 과잉 추론으로 기록함 | [Workspace Studio Test](https://support.google.com/workspace-studio/answer/16663517) | 결과·사람 검증 |
| verified | `08-new-gems/08-11_personal_lesson-scenario-app-prompt_20260821.png` | 개인 | New Gems from Labs | 생성 입력 | 목표·시간·환경을 따로 받는 `실습 시나리오 빌더` 자연어 요구 입력 | 평가표 비교와 다른 다중 입력 수업 설계 앱으로 구성함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 앱 생성 Prompt |
| verified | `08-new-gems/08-12_personal_lesson-scenario-app-steps_20260821.png` | 개인 | New Gems from Labs | Workflow | 자동 생성된 목표·시간·환경·생성·렌더링 다섯 단계 확인 | 세 입력과 결과 렌더링 구조가 보이지만 연결은 실행으로 별도 검증해야 함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 단계 전체 |
| verified | `08-new-gems/08-13_personal_lesson-scenario-input-goal_20260821.png` | 개인 | New Gems from Labs | 입력 1 | 자료구조를 활용한 데이터 탐색 알고리즘 수업 목표 입력 | 첫 입력을 독립 화면으로 확보함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 목표 입력 |
| verified | `08-new-gems/08-14_personal_lesson-scenario-input-time_20260821.png` | 개인 | New Gems from Labs | 입력 2 | 수업 시간 `50분` 입력 | 두 번째 입력을 독립 화면으로 확보함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 시간 입력 |
| verified | `08-new-gems/08-15_personal_lesson-scenario-input-environment_20260821.png` | 개인 | New Gems from Labs | 입력 3 | Windows·Python 3.12·VS Code·Flask 기초 고3 환경 입력 | 세 번째 입력을 독립 화면으로 확보함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 환경 입력 |
| verified | `08-new-gems/08-16_personal_lesson-scenario-link-check_20260821.png` | 개인 | New Gems from Labs | 연결 검증 | 세 입력 뒤 생성 단계가 목표를 다시 묻는 화면 확인 | 자동 생성된 입력 연결 오류를 실제 결과 차이로 기록함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 실패 검증 |
| verified | `08-new-gems/08-17_personal_lesson-scenario-running_20260821.png` | 개인 | New Gems from Labs | 보완 실행 | 목표·시간·환경을 한 응답으로 다시 제공 | 생성·렌더링 단계가 진행됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 복구 과정 |
| verified | `08-new-gems/08-18_personal_lesson-scenario-result_20260821.png` | 개인 | New Gems from Labs | 결과 상단 | 실습 시나리오 보고서 상단 확인 | 50분 배분·환경 제약·시간 때문에 줄인 활동의 이유가 표시됨 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 결과 전체 맥락 |
| verified | `08-new-gems/08-19_personal_lesson-scenario-result-lower_20260821.png` | 개인 | New Gems from Labs | 결과 하단 | 학생 활동·교사 관찰·완료 증거 확인 | 입력·출력의 정황을 유지한 하단 화면으로 후속 판정에 사용 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 결과 하단 |
| verified | `08-new-gems/08-20_personal_lesson-scenario-fullscreen-top_20260821.png` | 개인 | New Gems from Labs | 전체화면 결과 | 결과를 전체화면으로 열어 시간 배분·학생 활동·교사 관찰을 읽을 수 있는 크기로 확인 | 편집기 주변을 제외하고 결과 문서 자체를 크게 확보함 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | 결과 검증 |
| verified | `08-new-gems/08-21_personal_lesson-scenario-fullscreen-lower_20260821.png` | 개인 | New Gems from Labs | QA | 전체화면에서 PageDown 스크롤 시험 | 외부 페이지에 키 입력이 전달되어 빈 화면으로 남아 슬라이드에 사용하지 않음 | [Gems from Labs](https://support.google.com/gemini/answer/16802014) | QA 전용 |
| verified | `09-spark-skills/09-13_personal_accessibility-skill-settings_20260821.png` | 개인 | Spark/Skills | Skill 설정 | 제목·계층·대체텍스트·표·링크·색상·지시문 점검 절차 입력 | `점검 항목 / 현재 상태 / 판정 / 교사 조치` 출력과 외부 쓰기 금지를 지정함 | [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 접근성 Skill 지침 |
| verified | `09-spark-skills/09-14_personal_accessibility-skill-saved_20260821.png` | 개인 | Spark/Skills | Skill 저장 | 접근성 점검 Skill 저장 | 이름이 `수업자료-접근성-점검`으로 정규화되고 저장 버튼이 비활성화됨 | [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 저장 결과 |
| verified | `09-spark-skills/09-15_personal_accessibility-task-input_20260821.png` | 개인 | Spark/Skills | Task 입력 | Skill 이름과 의도적 접근성 결함이 있는 합성 활동지 설명 입력 | 실제 파일 수정 없이 점검표와 우선순위만 요구함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | Task 시작 |
| verified | `09-spark-skills/09-16_personal_accessibility-task-running_20260821.png` | 개인 | Spark/Skills | 실행 중 | 전용 Spark Task 생성 | 진행 중·사고하는 중 상태와 사용자 입력을 같은 화면에서 확인함 | [Gemini Spark](https://support.google.com/gemini/answer/17094507) | 실행 과정 |
| verified | `09-spark-skills/09-17_personal_accessibility-task-result_20260821.png` | 개인 | Spark/Skills | 결과 상단 | 접근성 점검표 상단 확인 | 문서 제목은 통과, 제목 계층·대체텍스트·표 머리글·링크·색상은 수정 필요로 판정함 | [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 입력과 결과 맥락 |
| verified | `09-spark-skills/09-18_personal_accessibility-task-result-lower_20260821.png` | 개인 | Spark/Skills | 결과 하단 | 나머지 표와 수정 우선순위 확인 | 대체텍스트, 구조화, 색상·링크 개선을 상위 우선순위로 제시함 | [Skills 도움말](https://support.google.com/gemini?p=lm_skills) | 결과 하단 |
