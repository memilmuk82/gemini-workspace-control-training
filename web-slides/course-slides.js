(() => {
  'use strict';

  const outline = window.COURSE_OUTLINE || [];
  const captureRoot = '../captures/course-aligned';

  const sources = {
    시작: '100분 실습 · 비식별 합성 데이터',
    'Gemini in Classroom': 'Google Classroom 공식 도움말 · 실제 교육 계정 UI',
    '좋은 Prompt': '프롬프트 작성 원칙 · 평가계획 기반 실습',
    Harness: 'Harness · 입력부터 검증까지 작업 조건 설계',
    'Verification Loop': 'Verification Loop · 초안·검토·수정의 반복 과정',
    휴식: '1부 50분 · 휴식 10분 · 2부 50분',
    'Classic Gems': 'Google Gemini 요청 사항·맞춤 Gem 공식 도움말 · 실제 계정 UI',
    'Gemini Notebook': 'Google NotebookLM 공식 도움말 · 실제 교육 계정 UI',
    'Workspace Studio': 'Google Workspace Studio 공식 도움말 · 실제 교육 계정 UI',
    'New Gems from Google Labs': 'Google Labs 공식 도움말 · 실제 개인 계정 UI',
    'Gemini Spark / Skills': 'Google Gemini Spark·Skills 공식 도움말 · 실제 개인 계정 UI',
    '통합 실습과 마무리': '공식 문서 → 실제 UI → 합성 데이터 → 사람 검증',
  };

  const evidence = {
    9: [['01-gemini-classroom/01-01_edu_gemini-classroom-entry_20260820.png', '교육용 AI 도구 전체 화면', 1, 50, 50, 'contain']],
    10: [['01-gemini-classroom/01-01_edu_gemini-classroom-entry_20260820.png', '기준표 만들기 카드가 있는 교육용 AI 도구 화면', 1.12, 51, 48, 'focus']],
    11: [['00-source-plan/00-01_python-evaluation-plan-page5.png', '파이썬프로그래밍 평가계획 5쪽', 1, 50, 50, 'contain']],
    12: [['01-gemini-classroom/01-02_edu_rubric-form-blank_20260820.png', '기준표 만들기 입력 화면 전체', 1, 50, 50, 'contain']],
    13: [['01-gemini-classroom/01-03_edu_rubric-course-input_20260820.png', '평가계획을 옮긴 기준표 입력 화면 전체', 1, 50, 50, 'contain']],
    14: [['00-source-plan/00-02_python-evaluation-plan-score-table.png', '평가계획의 충족 개수별 점수 표', 1, 50, 50, 'contain']],
    15: [['01-gemini-classroom/01-03_edu_rubric-course-input_20260820.png', '실행 전 입력 화면 전체', 1, 50, 50, 'contain']],
    16: [['01-gemini-classroom/01-04_edu_rubric-generating_20260820.png', '평가기준 생성 중 전체 화면', 1, 50, 50, 'contain']],
    17: [['01-gemini-classroom/01-05_edu_rubric-criteria-generated_20260820.png', '추천 기준표 기준 생성 결과', 1, 50, 50, 'contain']],
    18: [['01-gemini-classroom/01-06_edu_rubric-table-generating_20260820.png', '루브릭 표 생성 중 전체 화면', 1, 50, 50, 'contain']],
    19: [['01-gemini-classroom/01-07_edu_rubric-course-generated_20260820.png', '생성된 Flask 루브릭 전체', 1, 50, 50, 'contain']],
    20: [
      ['01-gemini-classroom/01-08_edu_rubric-course-result-view_20260820.png', '상단 결과', 1, 50, 50, 'contain'],
      ['01-gemini-classroom/01-09_edu_rubric-course-result-lower_20260820.png', '하단 결과', 1, 50, 50, 'contain'],
    ],
    21: [
      ['01-gemini-classroom/01-10_edu_add-to-class-dialog_20260820.png', '수업에 추가 대화상자', 1, 50, 50, 'contain'],
      ['01-gemini-classroom/01-11_edu_add-to-python-class-selected_20260820.png', '연수용 파이썬 수업 선택', 1, 50, 50, 'contain'],
    ],
    22: [['01-gemini-classroom/01-12_edu_material-draft-unpublished_20260820.png', '루브릭이 첨부된 Classroom 자료 초안', 1.04, 50, 50, 'contain']],
    23: [['01-gemini-classroom/01-13_edu_rubric-export-sheet_20260820.png', 'Sheets로 내보낸 루브릭 전체', 1, 50, 50, 'contain']],

    26: [['02-good-prompt/02-02_edu_prompt-basic-output_20260820.png', '일반 기준과 100점 배점을 생성한 실제 결과', 1, 50, 50, 'contain']],
    27: [['02-good-prompt/02-02_edu_prompt-basic-output_20260820.png', '입력에 없던 기준을 포함한 실제 결과', 1, 50, 50, 'contain']],
    40: [['02-good-prompt/02-03_edu_prompt-structured-input_20260820.png', 'Flask 구조화 프롬프트 전체 입력', 1, 50, 50, 'contain']],
    41: [
      ['02-good-prompt/02-04_edu_prompt-structured-output_20260820.png', '구조화 결과 상단', 1, 50, 50, 'contain'],
      ['02-good-prompt/02-05_edu_prompt-structured-output-final_20260820.png', '구조화 결과 자체 점검', 1, 50, 50, 'contain'],
    ],

    53: [['03-harness/03-03_edu_harness-context-top_20260820.png', 'Harness 입력과 결과 상단의 전체 맥락', 1, 50, 50, 'contain']],
    54: [['03-harness/03-03_edu_harness-context-top_20260820.png', 'Harness 결과 상단 전체', 1, 50, 50, 'contain']],
    55: [['03-harness/03-03_edu_harness-context-top_20260820.png', '다섯 항목과 필수 열이 보이는 결과 상단', 1, 50, 50, 'contain']],
    56: [['03-harness/03-04_edu_harness-context-lower_20260820.png', '서술 기록과 증거 판정이 보이는 결과 하단', 1, 50, 50, 'contain']],
    57: [['03-harness/03-04_edu_harness-context-lower_20260820.png', '서술만으로 확정한 한계가 보이는 결과', 1, 50, 50, 'contain']],
    58: [['03-harness/03-04_edu_harness-context-lower_20260820.png', '확인 필요 항목과 교사 질문', 1, 50, 50, 'contain']],

    64: [['04-verification-loop/04-07_edu_loop-context-draft_20260820.png', '입력과 검증 전 Harness 초안 전체', 1, 50, 50, 'contain']],
    65: [['04-verification-loop/04-08_edu_loop-context-critique_20260820.png', 'Critique 요청과 분류 결과 전체', 1, 50, 50, 'contain']],
    66: [['04-verification-loop/04-08_edu_loop-context-critique_20260820.png', '근거 수준 비판 결과 전체', 1, 50, 50, 'contain']],
    68: [['04-verification-loop/04-04_edu_loop-human-checklist_20260820.png', '교사 확인 체크리스트', 1, 50, 50, 'contain']],
    73: [['04-verification-loop/04-05_edu_loop-revision-input_20260820.png', '수정 요청과 앞선 비판 결과의 맥락', 1, 50, 50, 'contain']],
    74: [['04-verification-loop/04-09_edu_loop-revised-complete_20260820.png', '근거 수준을 낮춘 완성 수정 결과', 1, 50, 50, 'contain']],
    75: [
      ['04-verification-loop/04-07_edu_loop-context-draft_20260820.png', '수정 전', 1, 50, 50, 'contain'],
      ['04-verification-loop/04-09_edu_loop-revised-complete_20260820.png', '수정 후', 1, 50, 50, 'contain'],
    ],

    80: [['05-classic-gems/05-00_personal-intelligence-menu_20260820.png', '개인 계정의 개인 인텔리전스와 Gemini 요청 사항 메뉴', 1, 50, 50, 'contain']],

    81: [['05-classic-gems/05-01_edu_gems-entry_20260820.png', '교육 계정 Gem 관리자 전체', 1, 50, 50, 'contain']],
    82: [['05-classic-gems/05-07_edu_error-coach-settings_20260820.png', '파이썬 오류 기록 코치 이름과 설명', 1, 50, 50, 'contain']],
    83: [['05-classic-gems/05-07_edu_error-coach-settings_20260820.png', '정답 대신 사실·추정·질문으로 나누는 지침', 1, 50, 50, 'contain']],
    84: [['05-classic-gems/05-07_edu_error-coach-settings_20260820.png', '오류 상담 확인 순서 전체', 1, 50, 50, 'contain']],
    85: [['05-classic-gems/05-07_edu_error-coach-settings_20260820.png', '개인정보·점수 추정 금지 지침', 1, 50, 50, 'contain']],
    87: [['05-classic-gems/05-08_edu_error-coach-preview-input_20260820.png', '변수명 불일치가 있는 합성 Flask 오류 기록', 1, 50, 50, 'contain']],
    88: [['05-classic-gems/05-08_edu_error-coach-preview-input_20260820.png', '저장 전 오류 기록 미리보기 실행', 1, 50, 50, 'contain']],
    89: [['05-classic-gems/05-09_edu_error-coach-preview-output_20260820.png', '사실·추정·추가 질문이 분리된 결과', 1, 50, 50, 'contain']],
    90: [['05-classic-gems/05-09_edu_error-coach-preview-output_20260820.png', '완성 코드·점수를 대신 만들지 않은 결과', 1, 50, 50, 'contain']],
    92: [['05-classic-gems/05-09_edu_error-coach-preview-output_20260820.png', '같은 오류 기록 재시험 결과', 1, 50, 50, 'contain']],
    93: [['05-classic-gems/05-10_edu_error-coach-saved_20260820.png', '비공개 오류 기록 코치 저장 결과', 1, 50, 50, 'contain']],

    96: [['06-notebooklm/06-01_edu_notebooklm-entry_20260820.png', 'Gemini Notebook 진입', 1.3, 54, 45]],
    97: [['06-notebooklm/06-02_edu_notebook-home_20260820.png', 'Gemini Notebook 홈', 1.25, 54, 44]],
    98: [['06-notebooklm/06-03_edu_new-notebook-source-dialog_20260820.png', '새 Notebook 소스 대화상자', 1.32, 55, 48]],
    99: [['06-notebooklm/06-13_edu_application-plan-source-input_20260820.png', '응용 프로그래밍 개발 평가계획 소스 범위', 1, 50, 50, 'contain']],
    100: [['06-notebooklm/06-13_edu_application-plan-source-input_20260820.png', '학기별 능력단위·평가항목·배점 입력', 1, 50, 50, 'contain']],
    101: [['06-notebooklm/06-14_edu_application-notebook-customized_20260820.png', '맞춤 노트북 요약 설정', 1, 50, 50, 'contain']],
    102: [['06-notebooklm/06-14_edu_application-notebook-customized_20260820.png', '학기 비교·결측·인용 맞춤 조건', 1, 50, 50, 'contain']],
    103: [['06-notebooklm/06-15_edu_application-notebook-query_20260820.png', '1·2학기 비교와 인용 질문', 1, 50, 50, 'contain']],
    104: [['06-notebooklm/06-16_edu_application-notebook-answer_20260820.png', '평가계획 기반 학기 비교표 답변', 1, 50, 50, 'contain']],
    105: [['06-notebooklm/06-16_edu_application-notebook-answer_20260820.png', '능력단위·평가항목·배점 검증', 1, 50, 50, 'contain']],
    106: [['06-notebooklm/06-17_edu_application-notebook-citation_20260820.png', '학기 비교 답변의 인라인 인용 열기', 1, 50, 50, 'contain']],
    107: [['06-notebooklm/06-17_edu_application-notebook-citation_20260820.png', '학기 비교 답변과 원문 근거 대조', 1, 50, 50, 'contain']],
    108: [['06-notebooklm/06-16_edu_application-notebook-answer_20260820.png', '실시 날짜와 학생별 점수의 명시 없음 처리', 1, 50, 50, 'contain']],
    109: [['06-notebooklm/06-14_edu_application-notebook-customized_20260820.png', '학기 비교 중심 맞춤 설정 적용 상태', 1, 50, 50, 'contain']],
    110: [['06-notebooklm/06-17_edu_application-notebook-citation_20260820.png', '인용 없는 문장 재검증 지점', 1, 50, 50, 'contain']],
    111: [['06-notebooklm/06-16_edu_application-notebook-answer_20260820.png', '학기별 수업 준비표로 전환할 근거', 1, 50, 50, 'contain']],

    118: [['07-workspace-studio/07-01_edu_studio-entry_20260820.png', 'Workspace Studio 진입', 1.25, 54, 45]],
    119: [['07-workspace-studio/07-01_edu_studio-entry_20260820.png', 'Describe 입력란', 1.45, 55, 53]],
    120: [['07-workspace-studio/07-19_edu_weekly-briefing-step_20260820.png', '월요일 수업 준비 브리핑 요구와 첫 단계', 1, 50, 50, 'contain']],
    121: [['07-workspace-studio/07-19_edu_weekly-briefing-step_20260820.png', '외부 쓰기 없는 내부 Gemini 단계', 1, 50, 50, 'contain']],
    122: [['07-workspace-studio/07-19_edu_weekly-briefing-step_20260820.png', '주간 브리핑 Flow 생성 결과', 1, 50, 50, 'contain']],
    123: [['07-workspace-studio/07-20_edu_weekly-briefing-variable_20260821.png', 'Schedule Starter와 두 Ask Gemini 단계 전체', 1, 50, 50, 'contain']],
    124: [['07-workspace-studio/07-20_edu_weekly-briefing-variable_20260821.png', '매주 월요일 오전 7시 45분 Starter', 1, 50, 50, 'contain']],
    125: [['07-workspace-studio/07-19_edu_weekly-briefing-step_20260820.png', '환경·GitHub·대체텍스트·코드 디펜스 준비 상태 입력', 1, 50, 50, 'contain']],
    126: [['07-workspace-studio/07-19_edu_weekly-briefing-step_20260820.png', '웹·Workspace 소스가 꺼진 Ask Gemini 단계', 1, 50, 50, 'contain']],
    127: [['07-workspace-studio/07-20_edu_weekly-briefing-variable_20260821.png', '첫 Ask Gemini 생성 콘텐츠 변수 연결', 1, 50, 50, 'contain']],
    128: [['07-workspace-studio/07-21_edu_weekly-briefing-test-warning_20260821.png', '사용 설정 전 Test run 경고', 1, 50, 50, 'contain']],
    129: [['07-workspace-studio/07-20_edu_weekly-briefing-variable_20260821.png', '오늘 확인·수업 전·승인 뒤로 재구성하는 두 번째 단계', 1, 50, 50, 'contain']],
    130: [['07-workspace-studio/07-21_edu_weekly-briefing-test-warning_20260821.png', 'Test run이 실제 작업을 수행할 수 있다는 경고', 1, 50, 50, 'contain']],
    131: [['07-workspace-studio/07-20_edu_weekly-briefing-variable_20260821.png', '2단계 생성 콘텐츠를 참조하는 3단계 변수', 1, 50, 50, 'contain']],
    132: [['07-workspace-studio/07-22_edu_weekly-briefing-test-result_20260821.png', '주간 수업 준비 브리핑 Test 결과', 1, 50, 50, 'contain']],
    133: [['07-workspace-studio/07-22_edu_weekly-briefing-test-result_20260821.png', '입력에 없던 학생 명단 확인을 추가한 결과', 1, 50, 50, 'contain']],
    134: [['07-workspace-studio/07-22_edu_weekly-briefing-test-result_20260821.png', '사용 설정하지 않은 Test 완료 Flow', 1, 50, 50, 'contain']],

    137: [['08-new-gems/08-01_personal_new-gems-entry_20260820.png', '개인 계정 Labs Gems 영역', 1.15, 64, 40]],
    139: [['08-new-gems/08-11_personal_lesson-scenario-app-prompt_20260821.png', '실습 시나리오 빌더 생성 프롬프트 전체', 1, 50, 50, 'contain']],
    140: [['08-new-gems/08-12_personal_lesson-scenario-app-steps_20260821.png', '자연어 요청으로 생성된 앱 단계', 1, 50, 50, 'contain']],
    141: [['08-new-gems/08-12_personal_lesson-scenario-app-steps_20260821.png', '목표·시간·환경·생성·렌더링 다섯 단계', 1, 50, 50, 'contain']],
    143: [['08-new-gems/08-13_personal_lesson-scenario-input-goal_20260821.png', '자료구조 활용 수업 목표 입력', 1, 50, 50, 'contain']],
    144: [['08-new-gems/08-14_personal_lesson-scenario-input-time_20260821.png', '50분 수업 시간 입력', 1, 50, 50, 'contain']],
    145: [['08-new-gems/08-15_personal_lesson-scenario-input-environment_20260821.png', 'Windows·Python·VS Code·학생 수준 입력', 1, 50, 50, 'contain']],
    146: [['08-new-gems/08-16_personal_lesson-scenario-link-check_20260821.png', '세 입력 뒤 목표를 다시 요구한 연결 오류', 1, 50, 50, 'contain']],
    147: [['08-new-gems/08-17_personal_lesson-scenario-running_20260821.png', '세 제약을 다시 제공한 보완 실행', 1, 50, 50, 'contain']],
    148: [['08-new-gems/08-18_personal_lesson-scenario-result_20260821.png', '실습 시나리오 결과 상단', 1, 50, 50, 'contain']],
    149: [['08-new-gems/08-20_personal_lesson-scenario-fullscreen-top_20260821.png', '학생 활동과 교사 관찰을 읽을 수 있는 전체화면 결과', 1, 50, 50, 'contain']],

    153: [['08-spark-skills/08-01_edu_spark-before-shortcut_20260820.png', '교육 계정 단축키 입력 전', 1.2, 57, 44]],
    154: [
      ['08-spark-skills/08-01_edu_spark-before-shortcut_20260820.png', '교육 계정 입력 전', 1.16, 56, 44],
      ['08-spark-skills/08-02_edu_spark-after-shortcut_20260820.png', '교육 계정 입력 후', 1.16, 56, 44],
    ],
    155: [
      ['08-spark-skills/08-01_edu_spark-before-shortcut_20260820.png', '교육 계정 Before', 1.16, 56, 44],
      ['08-spark-skills/08-02_edu_spark-after-shortcut_20260820.png', '교육 계정 After', 1.16, 56, 44],
    ],
    156: [
      ['09-spark-skills/09-01_personal_spark-before-shortcut_20260820.png', '개인 계정 Before', 1.14, 56, 44],
      ['09-spark-skills/09-02_personal_spark-after-shortcut_20260820.png', '개인 계정 After', 1.14, 56, 44],
    ],
    158: [['09-spark-skills/09-13_personal_accessibility-skill-settings_20260821.png', '수업자료 접근성 점검 Skill 지침', 1, 50, 50, 'contain']],
    159: [['09-spark-skills/09-14_personal_accessibility-skill-saved_20260821.png', '저장된 수업자료 접근성 점검 Skill', 1, 50, 50, 'contain']],
    160: [['09-spark-skills/09-15_personal_accessibility-task-input_20260821.png', '접근성 Skill을 호출한 Spark Task 입력', 1, 50, 50, 'contain']],
    161: [['09-spark-skills/09-15_personal_accessibility-task-input_20260821.png', '대체텍스트·표·링크·색상 조건', 1, 50, 50, 'contain']],
    162: [['09-spark-skills/09-16_personal_accessibility-task-running_20260821.png', '접근성 점검 Task 실행 중', 1, 50, 50, 'contain']],
    163: [['09-spark-skills/09-16_personal_accessibility-task-running_20260821.png', '접근성 Task 진행 상태', 1, 50, 50, 'contain']],
    164: [['09-spark-skills/09-17_personal_accessibility-task-result_20260821.png', '입력과 접근성 점검표 상단', 1, 50, 50, 'contain']],
    165: [['09-spark-skills/09-18_personal_accessibility-task-result-lower_20260821.png', '접근성 점검표 하단과 수정 우선순위', 1, 50, 50, 'contain']],
  };

  const harnessContractInput = [
    '목표: 파이썬프로그래밍 평가계획과 합성 작업 기록의 정합성을 점검한다.',
    '입력 범위: 제공된 평가항목 5개와 합성 작업 기록만 사용한다.',
    '금지: 새 평가항목, 학생 성향, 실제 점수, 학교 정책을 추정하지 않는다.',
    '출력 계약: 평가항목 / 필요한 증거 / 기록에서 확인한 증거 / 상태 / 교사 확인 항목의 표로 작성한다.',
    '실패 행동: 기록에서 근거를 찾지 못하면 충족으로 판단하지 말고 확인 필요로 표시한다.',
    '검증: 평가항목이 정확히 5개인지, 의미가 바뀌지 않았는지, 점수를 임의 계산하지 않았는지 자체 점검한다.',
  ].join('\n');

  const harnessRecordInput = [
    'Flask 앱을 실행해 기본 라우팅 화면을 열었다.',
    'students List와 course_info Dictionary를 선언했다.',
    'Jinja2 for문으로 students를 반복 출력했다.',
    'KeyError가 발생해 Gemini에 원인을 질문하고 Dictionary 키 이름을 수정했다.',
    '수정 전 오류 화면과 질문 문구는 기록했지만 해결 후 작동 화면은 아직 기록하지 않았다.',
    '코드 디펜스는 아직 실시하지 않았다.',
  ];

  const promptText = {
    13: '[안내 입력]\n[연수용 가상 수행평가] Flask 데이터 바인딩 및 1:1 코드 디펜스\nFlask 웹 화면에 List와 Dictionary 데이터를 출력하는 프로그램을 작성한다. Jinja2 템플릿과 파이썬 제어문(for, if)을 연동해 데이터를 동적으로 표시한다. 오류 발생 현상, Gemini에 입력한 프롬프트, 해결 과정은 연수용 작업 일지에 기록한다. 마지막에는 변수와 제어문의 논리적 흐름과 웹 화면 출력 원리를 1:1 코드 디펜스 형식으로 설명한다. 실제 학생에게 게시하지 않는다.\n\n[지식 또는 기술 입력]\n평가항목은 다음 다섯 개다. 1) Flask 환경 설정과 라우팅 2) List·Dictionary 변수 선언 3) Jinja2와 for·if를 활용한 동적 데이터 출력 4) 오류·Gemini 프롬프트·해결 과정의 작업 일지 기록 5) 변수·제어문·화면 출력 원리의 코드 디펜스. 새 평가항목을 추가하거나 의미를 바꾸지 마. 충족 개수별 점수는 5개 20점, 4개 18점, 3개 16점, 2개 14점, 1개 12점, 0개 10점이다. 실제 학생의 특성이나 수행 결과는 추정하지 마.',
    14: '평가계획의 배점표를 그대로 옮긴다: 5개 충족 20점, 4개 18점, 3개 16점, 2개 14점, 1개 12점, 0개 10점.',
    25: 'Flask 수행평가 루브릭을 만들어 줘.',
    29: '나는 특성화고 파이썬프로그래밍 수행평가를 설계하는 교사다. 평가계획과 실제 증거가 일치하는지 확인하고 싶다.',
    30: '목적: 학생을 자동 채점하는 것이 아니라, 교사가 확인할 증거와 확인 질문을 정리한다. 제약: 제공한 평가계획만 사용한다.',
    31: '결과는 평가항목 / 코드 또는 일지에서 확인할 증거 / 충족 여부 / 확인 필요 열이 있는 표로 작성한다.',
    32: '평가항목 / 확인 증거 / 충족 여부 / 확인 필요 열이 있는 표로 작성한다. 각 셀은 한 문장으로 쓰고, 마지막에는 평가항목이 다섯 개인지와 20·18·16·14·12·10점 대응을 자체 점검한다.',
    33: '자료가 없거나 기준이 충돌하거나 점수 근거가 없으면 임의로 채우지 않는다.',
    34: '근거가 없으면 확인 필요라고 표시하고, 교사가 무엇을 확인해야 하는지 질문으로 남긴다.',
    35: '1) 초안 생성 2) 원문 대조 3) 근거 수준 분류 4) 교사 판정 5) 확인된 내용만 수정한다.',
    36: '초안을 아직 수정하지 말고 각 문장을 평가계획에 직접 있음 / 해석 필요 / 근거 없음으로 먼저 분류해 줘.',
    37: '수정 요청 = 무엇이 문제인지 + 왜 문제인지 + 어떻게 바뀌어야 하는지.',
    38: '문제: 입력에 없는 일반 기준을 만들었다. 이유: 평가계획 밖이다. 원하는 상태: 삭제하고 확인 필요와 교사 질문으로 교체한다.',
    39: '역할 / 목적 / 입력 / 처리 / 출력 / 예외 / 금지 / 검증을 반복 업무 템플릿으로 저장한다.',
    40: '배경: 나는 특성화고 파이썬프로그래밍 수행평가를 설계하는 교사다. 첨부한 평가계획 PDF의 수행과제·평가요소·배점 기준을 근거로 사용한다.\n목적: 학생을 자동 채점하지 않고, 교사가 코드·화면·작업 일지에서 확인할 증거와 다음 확인 질문을 정리한다.\n제약: 첨부한 평가계획에 있는 항목과 점수만 사용한다. 학생 특성·실제 점수·학교 정책을 추정하지 않는다. 자신의 평가계획을 사용할 때는 아래 교과명·과제·평가요소·배점을 그 문서의 내용으로 바꾼다.\n형식: 평가항목 / 확인할 증거 / 충족 여부 / 확인 필요의 네 열 표로 작성한다. 마지막에 항목 수와 배점 대응을 자체 점검한다.\n예외: 자료가 없거나 기준이 충돌하면 임의로 채우지 말고 확인 필요로 표시한 뒤, 교사가 보완할 자료를 질문한다.\n수정 기준: 평가계획에 없는 항목은 삭제하고, 명칭과 의미를 원문대로 유지한다. 근거가 부족한 확정 문장은 확인 필요와 교사 질문으로 바꾼다.',
    53: harnessContractInput,
    65: '각 주장을 직접 증거 / 서술 증거 / 근거 없음으로 분류하고, 아직 수정하지 마.',
    73: '서술만 있는 항목은 부분 확인으로 낮추고 증거가 없는 항목은 확인 필요로 남겨라. 학생 점수는 계산하지 마.',
    83: '합성 Python·Flask 오류 기록을 읽고 사실 / 가능한 원인 / 다음 확인 질문 / 교사 확인으로 나눠 답한다. 완성 코드를 바로 주지 않는다.',
    85: '학생 개인정보나 점수를 추정하지 말고, 확인되지 않은 원인은 가능성으로만 표시한다.',
    87: 'Flask /products 요청에서 500 오류가 났고, Jinja2는 items를 찾지 못했다. 라우트는 products=product_list를 전달하고 템플릿은 for item in items를 사용한다.',
    102: '1학기와 2학기의 능력단위·평가항목·배점을 비교해 소개하고, 소스에 없는 실시 날짜와 학생별 점수는 명시 없음으로 남긴다. 답변의 인용을 클릭해 확인하도록 안내한다.',
    103: '학기 / 능력단위·내용 요소 / 평가항목 / 배점 / 실시 날짜 열로 비교표를 만들고 각 행에 인용을 붙여 줘. 소스에 없는 날짜와 학생별 점수는 명시 없음이라고 써 줘.',
    120: '매주 월요일 오전 7시 45분에 수업 준비 상태를 표로 분류하고, 그 결과를 오늘 확인 / 수업 전 / 교사 승인 뒤 행동으로 요약하는 Flow를 만든다.',
    121: 'Gmail·Chat·Docs·Sheets·Drive·Calendar를 수정·발송하지 말고 Flow를 사용 설정하지 마.',
    139: 'NCS 목표, 수업 시간, 실습 환경을 따로 입력받아 한 차시 프로그래밍 실습을 설계하는 한국어 앱을 만든다. 학생 활동 / 교사 관찰 / 완료 증거 / 코드 디펜스를 분리하고 시간이 부족하면 활동을 줄인 이유를 표시한다.',
    143: '자료구조 활용: 선택한 자료구조로 데이터 탐색(Search) 알고리즘을 구현한다.',
    144: '50분',
    145: 'Windows 실습실, Python 3.12, VS Code, 인터넷 연결 가능, Flask 기초를 익힌 고3 학생',
    146: '세 입력을 넣은 뒤 생성 단계가 목표를 다시 요구한다면 입력 연결 실패로 기록하고 결과를 신뢰하지 않는다.',
    147: '목표: 자료구조를 활용한 탐색 알고리즘 구현 / 시간: 50분 / 환경: Windows·Python 3.12·VS Code·Flask 기초 고3',
    158: '문서 제목, 제목 계층, 이미지 대체텍스트, 표 머리글, 링크 목적, 색상 단독 표시, 제출 지시를 순서대로 점검한다. 점검 항목 / 현재 상태 / 판정 / 교사 조치 표를 만들고 실제 파일은 수정하거나 공유하지 않는다.',
    160: '/수업자료-접근성-점검 합성 활동지에서 대체텍스트 없음, 표 머리글 없음, “여기를 클릭” 링크, 빨간색만으로 표시한 오류 상태를 점검해 줘. 실제 파일은 수정하지 마.',
  };

  const promptPairData = {
    29: {
      label: '원칙 1 · 배경·목적·제약',
      why: '교사가 어떤 결정을 위해 AI를 쓰는지와 사용할 자료의 경계를 먼저 고정한다.',
      example: `${promptText[29]} ${promptText[30]}`,
      check: '교사 역할, 자동 채점 금지, 평가계획만 사용한다는 세 조건이 모두 보이는가?',
    },
    31: {
      label: '원칙 2 · 출력 형식·자체 점검',
      why: '결과를 읽는 사람이 무엇을 비교할지 알 수 있도록 표의 열과 마지막 점검 항목을 지정한다.',
      example: promptText[32],
      check: '네 개 열과 평가항목 수·점수 대응의 자체 점검이 함께 지정됐는가?',
    },
    33: {
      label: '원칙 3 · 근거가 없을 때 멈추기',
      why: '빈칸을 그럴듯하게 채우지 않고, 교사가 다음에 확인할 질문을 남기게 한다.',
      example: `${promptText[33]} ${promptText[34]}`,
      check: '임의 생성 금지, 확인 필요 표시, 교사 질문의 세 행동이 들어갔는가?',
    },
    35: {
      label: '원칙 4 · 생성과 검증을 분리',
      why: '첫 결과를 바로 고치거나 채택하지 않고, 원문 대조와 근거 분류를 별도 단계로 실행한다.',
      example: `${promptText[35]}\n${promptText[36]}`,
      check: '초안을 수정하기 전에 직접 있음·해석 필요·근거 없음으로 먼저 분류하는가?',
    },
    37: {
      label: '원칙 5 · 수정 피드백의 세 요소',
      why: '문제만 지적하지 않고 그 이유와 바뀌어야 할 상태까지 써야 재생성 결과를 비교할 수 있다.',
      example: promptText[38],
      check: '문제, 이유, 원하는 상태가 각각 한 문장으로 구분되는가?',
    },
  };

  const inputContext = {
    9: '주소창 입력: classroom.google.com/ai',
    10: '선택한 기능: 기준표 만들기',
    12: '이 화면에서는 아직 입력하지 않음 · 다음 단계에서 학년·수준·과제·평가기술 입력',
    15: '학년: 고3 · 평가항목: Flask 환경·라우팅 / List·Dictionary / Jinja2·for·if / 작업 일지 / 코드 디펜스 · 점수: 20·18·16·14·12·10점',
    16: '생성에 사용한 값: 고3 · 평가항목 5개 · 평가수준 6개 · 점수 20·18·16·14·12·10점',
    17: '생성에 사용한 값: 평가계획의 다섯 항목 이름과 의미를 유지하고 새 항목은 추가하지 않음',
    18: '생성에 사용한 값: 평가항목 5개 · 평가수준 6개 · 충족 개수별 20·18·16·14·12·10점',
    19: '생성에 사용한 값: 고3 Flask 데이터 바인딩 수행평가 · 다섯 항목 · 여섯 점수 수준',
    20: '검증 기준: 평가계획의 다섯 항목과 5→20, 4→18, 3→16, 2→14, 1→12, 0→10점',
    21: '선택값: 수업 = 연수용 파이썬 수업 · 자료 유형 = 수업 자료 · 게시하지 않음',
    22: '선택값: 연수용 파이썬 수업에 루브릭 시트를 첨부하고 게시 전 초안으로 멈춤',
    23: '내보내기 실행: 생성된 루브릭을 Google Sheets로 내보냄 · 실제 점수 입력 없음',
    26: `사용자 입력: ${promptText[25]}`,
    27: `사용자 입력: ${promptText[25]}`,
    41: '사용자 입력: 평가계획만 사용 · 다섯 항목 유지 · 20·18·16·14·12·10점 · 근거 부족은 확인 필요 · 네 열 표와 자체 점검',
    54: harnessContractInput,
    55: `합성 작업 기록: ${harnessRecordInput.join(' / ')}`,
    56: '합성 기록 입력: Flask 실행·List/Dictionary 선언·for 출력은 서술됨 · 해결 후 작동 화면은 기록되지 않음',
    57: '검증 입력: 서술과 직접 증거를 구분하고, 근거가 없으면 충족으로 확정하지 않음',
    58: '현재 근거 상태: if 직접 증거·해결 후 화면·작업 일지 완성본·코드 디펜스 결과 없음',
    64: '초안 입력: 평가계획 5개 항목과 합성 작업 기록만 비교하고 상태·교사 질문 표 작성',
    65: `검토 입력: ${promptText[65]}`,
    66: `검토 입력: ${promptText[65]}`,
    68: '사람 확인값: Flask 실행 화면 / 변수 선언 코드 / Jinja2 for·if / 작업 일지 / 코드 디펜스 기록',
    73: `수정 입력: ${promptText[73]}`,
    74: `수정 입력: ${promptText[73]}`,
    75: '비교 입력: 같은 평가계획·합성 기록에 대해 수정 전 확정 판정과 수정 후 부분 확인·근거 없음 판정을 대조',
    80: '설정 경로 선택: 설정 → 개인 인텔리전스 → Gemini 요청 사항',
    81: '선택한 메뉴: Gem 관리자',
    82: '입력한 이름: 파이썬 오류 기록 코치 · 설명: 사실·추정·다음 확인 질문을 분리하는 교사용 대화 코치',
    84: '지침 입력: 오류 메시지→관련 코드→재현 조건 순서로 묻고 사실 / 가능한 원인 / 다음 확인 질문 / 교사 확인으로 답변',
    86: '지식 파일: 추가하지 않음 · 이번 예제는 고정 문서 검색이 아니라 반복 질문 절차를 저장',
    88: `미리보기 입력: ${promptText[87]}`,
    89: `미리보기 입력: ${promptText[87]}`,
    90: `미리보기 입력: ${promptText[87]} · 완성 코드와 점수는 대신 만들지 않음`,
    92: `재시험 입력: ${promptText[87]}`,
    93: '저장값: 파이썬 오류 기록 코치 · 공개 범위: 비공개',
    96: '접속 주소: notebooklm.google.com · 교육용 계정',
    97: '선택: 새 노트북 만들기',
    98: '선택: 소스 추가',
    99: '소스 입력: 응용 프로그래밍 개발 평가계획의 1·2학기 능력단위·평가항목·배점',
    100: '소스 범위: 1·2학기 교과 내용과 배점 · 실제 학생 정보·실시 날짜·학생별 점수 제외',
    101: '맞춤 설정: 학기 비교·결측 정보·인용 확인 중심의 노트북 요약',
    104: `질문 입력: ${promptText[103]}`,
    105: `질문 입력: ${promptText[103]}`,
    106: `질문 입력: ${promptText[103]} · 인라인 인용 선택`,
    107: `질문 입력: ${promptText[103]} · 인용을 열어 원문과 대조`,
    108: '질문 조건: 소스에 없는 실시 날짜와 학생별 점수는 명시 없음으로 표시',
    109: '맞춤 설정값: 1·2학기 비교 / 평가항목·배점 / 결측 / 인용',
    110: '재검증값: 인용이 없는 문장은 채택하지 않고 해당 문장의 원문 근거를 다시 요구',
    111: '변환 입력: 비교 결과를 학기별 수업 준비표로 재구성하되 각 행의 인용 유지',
    118: '접속: Workspace Studio · 교육용 계정',
    119: 'Describe 입력 준비: 월요일 수업 준비 브리핑 Flow',
    122: '생성 입력: 매주 월요일 7:45 시작 · 준비 상태 표 생성 · 교사 행동 요약 · 외부 쓰기·사용 설정 금지',
    123: 'Flow 값: Schedule Starter 7:45 → Ask Gemini 준비 상태 표 → Ask Gemini 교사 행동 요약',
    124: 'Starter 입력: 매주 월요일 오전 7시 45분',
    125: '합성 입력: Python 3.12·Flask 확인 / GitHub 최종 커밋 확인 필요 / 이미지 대체텍스트 없음 / 코드 디펜스 2문항 완료·1문항 미완료',
    126: 'Ask Gemini 설정: 웹 소스 끔 · Workspace 소스 끔 · 합성 고정 입력만 사용',
    127: '변수 입력: 첫 Ask Gemini의 생성 콘텐츠를 다음 단계 입력으로 연결',
    128: '실행값: Test run만 선택 · Flow 사용 설정 안 함',
    129: '두 번째 Step 입력: 첫 결과를 오늘 확인 / 수업 전 / 교사 승인 뒤 행동으로 분류',
    130: '확인값: Test run이 실제 작업을 수행할 수 있다는 경고 확인 · 외부 쓰기 Step 없음',
    131: '변수 입력: 2단계 생성 콘텐츠를 3단계 Ask Gemini에 연결',
    132: 'Test 입력: 합성 준비 상태만 사용 · 학생 정보 없음 · 외부 앱 쓰기 없음',
    133: '원래 입력: 환경·GitHub·대체텍스트·코드 디펜스 준비 상태만 포함 · 학생 명단은 입력하지 않음',
    134: '최종 상태: Test 완료 · Flow 사용 설정 안 함',
    137: '선택한 기능: 개인 계정의 Gems from Google Labs',
    140: `앱 생성 입력: ${promptText[139]}`,
    141: `앱 생성 입력: ${promptText[139]}`,
    148: `보완 실행 입력: ${promptText[147]}`,
    149: `보완 실행 입력: ${promptText[147]}`,
    153: '입력 전 기준값: 교육용 계정 · gemini.google.com/app · 같은 창·배율·위치 유지',
    154: '실제 키 입력: Ctrl+Shift+S · 교육용 계정',
    155: '실제 키 입력: Ctrl+Shift+S · 교육용 계정 · 화면과 URL 변화 없음',
    156: '실제 키 입력: Ctrl+Shift+S · 개인 계정 · Spark 화면으로 이동',
    159: '저장값: 수업자료-접근성-점검 · 활성 상태',
    161: `Task 입력: ${promptText[160]}`,
    162: `Task 입력: ${promptText[160]}`,
    163: `Task 입력: ${promptText[160]}`,
    164: `Task 입력: ${promptText[160]}`,
    165: `Task 입력: ${promptText[160]}`,
  };

  const sectionLens = {
    시작: ['오늘의 경계를 한 문장으로 적는다.', '관리자 설정·실제 학생 데이터가 포함되지 않았는가?', '생성은 AI, 게시·평가·자동 실행은 교사가 결정한다.'],
    'Gemini in Classroom': ['현재 화면에서 한 단계만 실행한다.', '다섯 평가항목·점수 대응·게시 여부 중 이 단계의 확인점을 찾는다.', '초안이면 게시 전에 멈춘다.'],
    '좋은 Prompt': ['프롬프트를 한 요소씩 작성하고 매번 결과를 확인한다.', '배경·목적·제약·형식·예외·수정 기준이 빠졌는가?', '입력 밖 내용은 확인 필요로 남긴다.'],
    Harness: ['목표·자료·금지·출력·실패·검증 계약을 작성한다.', '결과가 입력 범위와 출력 계약을 벗어났는가?', '범위 밖 문장은 채우지 않고 확인 필요로 멈춘다.'],
    'Verification Loop': ['초안→비판→사람 확인→수정을 순서대로 실행한다.', '각 주장에 코드·화면·일지·원문 증거가 연결됐는가?', '유지·수정·삭제·확인 필요 중 하나로 판정한다.'],
    'Classic Gems': ['반복되는 오류 상담의 질문 순서를 Gem에 저장하고 미리보기한다.', '완성 코드를 대신 주거나 확인되지 않은 원인을 사실로 말하지 않는가?', '공유하지 않은 오류 기록 코치로 먼저 검증한다.'],
    'Gemini Notebook': ['평가계획 소스를 먼저 고정하고 학기 비교·인용·원문을 확인한다.', '인용 문장이 능력단위·평가항목·배점을 실제로 지지하는가?', '소스 밖 날짜와 학생별 점수는 명시 없음으로 남긴다.'],
    'Workspace Studio': ['Schedule·Ask Gemini·Variable·Test를 한 요소씩 설정한다.', '주간 준비 브리핑의 단계와 변수 연결이 종이 설계와 일치하는가?', 'Test가 끝나도 사용 설정 전 교사가 승인한다.'],
    'New Gems from Google Labs': ['목표·시간·환경을 따로 입력하고 생성 단계의 연결까지 시험한다.', '세 입력이 한 시나리오에 모두 반영되고 학생 활동과 교사 관찰이 분리되는가?', '연결 오류가 있으면 자동 생성 앱을 수정하기 전 사용하지 않는다.'],
    'Gemini Spark / Skills': ['수업자료 접근성 점검 절차를 Skill로 저장하고 Task에서 적용한다.', '제목·대체텍스트·표·링크·색상·지시문을 빠짐없이 판정했는가?', '실제 파일 수정 없이 교사 조치와 우선순위만 받는다.'],
    '통합 실습과 마무리': ['자신의 업무 하나를 여섯 줄 통제 계약으로 바꾼다.', '자료 경계·실패 행동·사람 승인 지점이 모두 있는가?', '교사의 결정권이 남는 구조로 마무리한다.'],
  };

  const sectionStarts = new Map([
    [7, 1], [24, 2], [43, 3], [61, 4], [79, 5], [94, 6], [114, 7], [135, 8], [151, 9],
  ]);
  const hiddenSlides = new Set([30, 32, 34, 36, 38, 45, 46, 48, 49, 51, 52, 60, 63, 70, 71, 72, 168, 169, 171]);
  const practiceSlides = new Set([42, 59, 76, 113, 166, 170]);

  const slideDetails = {
    8: {
      summary: '실습의 기준 문서는 참가자 자신의 평가계획이다. 자신의 문서를 준비하기 어려운 경우에만 강의자의 연수용 예시 평가계획을 내려받아 사용한다.',
      checks: [['권장', '자신의 교과 평가계획에서 수행과제·평가요소·배점 기준 하나를 선택'], ['대안', '자료가 없으면 연수용 파이썬프로그래밍 평가계획 다운로드'], ['안전', '학생 이름·점수·제출물은 빼고 문서의 평가 기준만 사용']],
    },
    9: {
      summary: 'Classroom 수업 화면이 아니라 교육용 AI 도구 모음 주소에서 시작한다.',
      checks: [['주소', 'classroom.google.com/ai'], ['찾기', '교육용 AI 도구 목록에서 평가 관련 카드 확인'], ['다음', '기준표 만들기 카드를 선택한다.']],
    },
    10: {
      summary: '기준표 만들기 카드는 과제용 평가기준 초안을 생성하는 진입점이다.',
      checks: [['선택', '기준표 만들기'], ['입력 전', '평가계획 PDF를 옆에 열어 둔다.'], ['주의', '생성 결과는 원문과 대조하기 전에는 채택하지 않는다.']],
    },
    11: {
      summary: '평가계획 5쪽에서 평가영역, 다섯 평가항목, 충족 개수별 점수를 먼저 읽는다.',
      checks: [['평가영역', 'Data Binding(변수 활용과 제어 구조)'], ['평가항목', '환경·변수·동적 출력·작업 일지·코드 디펜스'], ['배점', '5개 20점 → 0개 10점']],
    },
    12: {
      summary: '입력 화면 전체를 보며 학년, 성취 수준 수, 과제 설명, 평가기술 입력란의 위치를 확인한다.',
      checks: [['학년', '고등학교 3학년'], ['수준', '평가계획의 점수 구조에 맞게 설정'], ['과제', '평가계획의 수행과제와 기준을 입력']],
    },
    13: {
      summary: '캡처의 안내 입력란에는 수행과제와 기록·설명 조건을, 지식 또는 기술 입력란에는 다섯 평가항목과 배점·금지 조건을 넣었다.',
      checks: [['학년·수준', '3학년 / 성취도 3단계'], ['안내', 'Flask 과제·작업 일지·1:1 코드 디펜스'], ['지식·기술', '다섯 평가항목·충족 개수별 점수·추정 금지']],
    },
    14: {
      summary: '점수는 모델이 새로 만드는 값이 아니라 평가계획의 충족 개수별 배점표를 그대로 옮긴 값이다.',
      checks: [['원문', '평가계획 5쪽 하단의 평가척도'], ['대응', '5·4·3·2·1·0개 → 20·18·16·14·12·10점'], ['금지', '임의의 100점 환산이나 수준별 새 배점을 추가하지 않는다.']],
    },
    15: {
      summary: '생성 전에 입력값이 평가계획을 정확히 반영하는지만 확인한다.',
      checks: [['항목 수', '정확히 다섯 개인가?'], ['점수', '20·18·16·14·12·10점인가?'], ['범위', '평가계획에 없는 기준을 추가하지 않았는가?']],
    },
    17: {
      summary: '추천된 기준 이름과 설명이 평가계획의 다섯 항목을 모두 포함하는지 먼저 확인한다.',
      checks: [['개수', '기준이 정확히 다섯 개인가?'], ['명칭', '평가계획의 핵심 기술이 빠지지 않았는가?'], ['다음', '기준 확인 뒤 수준별 표 생성을 진행한다.']],
    },
    19: {
      summary: '생성 결과를 전체 화면에서 읽고 평가항목, 수준명, 배점의 관계를 확인한다.',
      checks: [['항목', '다섯 항목이 모두 있는가?'], ['수준', '교사가 관찰 가능한 표현인가?'], ['배점', '평가계획의 점수 구조와 일치하는가?']],
    },
    22: {
      summary: 'Classroom 자료 초안에 생성된 Google Sheets 평가표가 첨부된 상태를 확인한다.',
      checks: [['첨부', '평가표 파일 이름과 카드가 보이는가?'], ['상태', '자료는 아직 게시되지 않은 초안인가?'], ['승인', '교사가 검토하기 전 게시하지 않는다.']],
    },
    23: {
      summary: '캡처만 보지 않고 제공된 Excel 파일을 직접 열어 다섯 평가항목과 각 수준의 설명을 끝까지 읽는다.',
      checks: [['파일', '연수용 Classroom 루브릭 시트 다운로드'], ['확인', '다섯 항목·세 수준 설명·수준명'], ['판정', '어색한 수준명과 평가계획 밖 표현은 수정 대상으로 표시']],
    },
    26: {
      summary: '실제 결과에서는 모델이 질문을 되묻지 않고 일반적인 평가기준과 100점 배점을 임의로 만들었다.',
      checks: [['관찰', '입력에 없던 평가요소가 생성됨'], ['관찰', '입력에 없던 100점 배점이 생성됨'], ['판정', '평가계획을 받은 뒤 다시 생성해야 한다.']],
    },
    32: {
      summary: '표의 네 열과 마지막 자체 점검을 한 문장에 모두 지정한다.',
      checks: [['열 1·2', '평가항목 / 확인 증거'], ['열 3·4', '충족 여부 / 확인 필요'], ['자체 점검', '다섯 항목과 20·18·16·14·12·10점 대응 확인']],
    },
    41: {
      summary: 'Before와 After는 같은 평가계획을 기준으로 비교한다. After는 평가계획 PDF와 여섯 요소 프롬프트를 함께 제공한 결과다.',
      checks: [['공통 근거', '같은 평가계획 PDF'], ['Before', '한 줄 요청만 입력해 일반 기준과 100점 배점 생성'], ['After', '원문 항목 유지·근거 부족은 확인 필요로 표시']],
    },
    53: {
      summary: '평가계획, 합성 작업 기록, 여섯 줄 작업 조건을 같은 요청에 넣는다. 화면만으로 부족한 부분은 왼쪽 계약문에서 함께 읽는다.',
      checks: [['평가계획', '다섯 항목과 점수 기준'], ['합성 기록', 'Flask·변수·for 서술과 누락된 if·일지·코드 디펜스'], ['Harness', '목표·자료·금지·출력·실패·검증']],
    },
    54: { summary: '입력과 결과가 함께 보이는 전체 화면에서 표의 구조와 첫 항목을 확인한다.' },
    55: { summary: '결과 상단 전체를 보며 다섯 평가항목과 다섯 개의 필수 열이 출력되었는지 확인한다.' },
    56: { summary: '결과 하단 전체에서 작업 기록의 서술과 실제 코드·실행 화면이 서로 다른 증거 수준임을 확인한다.' },
    57: { summary: '작업 기록의 “실행했다”, “선언했다”는 문장만으로 충족을 확정한 부분을 찾는다.' },
    58: { summary: '직접 증거가 없는 for·if·작업 일지·코드 디펜스는 확인 필요와 교사 질문으로 남긴다.' },
    64: { summary: '사용자 입력과 초안 표가 한 화면에 함께 보이도록 전체 맥락을 유지한다.' },
    65: { summary: '초안을 바로 수정하지 않고, 각 주장의 근거 수준을 먼저 분류하도록 요청한다.' },
    66: { summary: '비판 결과에서 직접 증거, 서술 증거, 근거 없음이 어떻게 나뉘었는지 전체 화면으로 읽는다.' },
    67: {
      summary: '초안에서 “충족”이라고 확정했지만 실제 코드나 실행 화면이 없는 두 항목을 찾는다.',
      checks: [['Flask 실행', '작업 기록의 서술만 있고 실제 실행 화면 없음'], ['변수 선언', '변수 이름 서술만 있고 실제 코드 없음'], ['판정', '둘 다 부분 확인 또는 확인 필요로 낮춘다.']],
    },
    73: { summary: '앞선 비판 결과가 보이는 상태에서 상태를 낮추고 교사 확인 질문을 남기도록 구체적으로 수정 요청한다.' },
    74: { summary: '완성된 수정 결과 전체에서 1~4번은 부분 확인, 5번은 근거 없음으로 조정됐는지 확인한다.' },
    75: { summary: '수정 전의 확정 판정이 수정 후 부분 확인·근거 없음으로 바뀌고, 다음 교사 질문이 늘어났는지 비교한다.' },
    80: {
      summary: '개인 계정의 모든 일반 대화에 적용할 응답 습관은 Gemini 요청 사항에 두고, 특정 교과 업무의 역할·자료·검증 절차는 Gem에 둔다.',
      checks: [['Gemini 요청 사항', '한국어·결론 먼저·사실과 추정 구분처럼 모든 대화에 반복할 선호'], ['Gem', '파이썬 오류 상담처럼 특정 업무에만 사용할 역할·질문 순서·응답 경계'], ['현재 UI 경로', '설정 → 개인 인텔리전스 → Gemini 요청 사항']],
    },
    82: {
      summary: '이번 Gem은 평가표를 만드는 도구가 아니라, 비슷한 Python·Flask 오류 상담에서 같은 질문 순서를 반복하는 대화 코치다.',
      checks: [['이름', '파이썬 오류 기록 코치'], ['반복 입력', '오류 메시지·관련 코드·재현 조건'], ['결과', '사실·추정·다음 질문·교사 확인']],
    },
    86: {
      summary: '고정 문서를 검색하는 업무가 아니라 대화 절차를 반복하는 예제이므로 지식 파일 없이 시작한다.',
      checks: [['지식 파일 필요', '교과 기준·매뉴얼의 문장을 반복 인용할 때'], ['이번 예제', '오류 기록마다 달라지는 대화 절차'], ['판정', '지침만 저장하고 미리보기로 질문 순서를 검증']],
    },
    87: {
      summary: '합성 오류 기록에는 500 오류, UndefinedError, 라우트와 템플릿의 서로 다른 변수명을 함께 넣어 원인을 추정할 근거를 준다.',
      checks: [['라우트', 'products=product_list'], ['템플릿', 'for item in items'], ['기대', '불일치를 사실로 표시하고 확인 질문을 먼저 제시']],
    },
    89: {
      summary: '미리보기 결과가 오류 기록에서 직접 확인한 사실과 가능한 원인을 분리하고, 다음에 볼 코드 위치를 질문하는지 읽는다.',
      checks: [['사실', 'items가 템플릿에 전달되지 않음'], ['가능한 원인', '변수명 불일치'], ['질문', '라우트와 템플릿 중 어느 이름으로 통일할지 교사가 확인']],
    },
    90: {
      summary: '오류 원인을 설명하더라도 학생 대신 완성 코드를 작성하거나 수행평가 점수를 만들지 않는 것이 이 Gem의 응답 경계다.',
    },
    93: {
      summary: '미리보기에서 질문 순서와 응답 경계를 확인한 뒤 비공개 Gem으로 저장했다. 공유 여부는 별도의 교사 결정이다.',
    },
    99: {
      summary: 'Notebook 예제는 파이썬 오류 상담과 분리한다. 응용 프로그래밍 개발 평가계획의 1·2학기 차이를 문서 근거로 비교한다.',
      checks: [['1학기', '서버프로그램 구현·대화형 데이터 처리·외부 API'], ['2학기', 'DB 설계·클라우드 배포·검색·정렬 알고리즘'], ['제외', '실제 학생 정보와 학생별 점수']],
    },
    102: {
      summary: '현재 UI의 맞춤 기능은 답변 말투 설정보다 `맞춤 노트북 요약 설정`에 가깝다. 첫 화면에서 학기 비교와 결측 확인 목적을 분명히 한다.',
    },
    104: {
      summary: '답변은 1·2학기의 능력단위·평가항목·배점을 한 표에서 비교하고, 각 근거에 인라인 인용을 붙인다.',
    },
    108: {
      summary: '평가계획 소스에 없는 실시 날짜와 학생별 점수는 추정하지 않고 `명시 없음`으로 남겨야 한다.',
    },
    115: {
      summary: 'Workspace Studio에는 정해진 때 반복되고 결과를 사람이 읽은 뒤 행동할 업무를 넣는다. 이번 예제는 월요일 수업 준비 브리핑이다.',
      checks: [['반복', '매주 월요일 아침'], ['읽기', '환경·GitHub·대체텍스트·코드 디펜스 준비 상태'], ['승인', '교사 확인 뒤에만 후속 행동']],
    },
    120: {
      summary: '실제 생성된 Flow는 매주 월요일 오전 7시 45분에 시작해 합성 준비 상태를 표로 분류하고 교사 행동으로 재구성한다.',
    },
    123: {
      summary: '전체 Flow에서 Schedule Starter 다음에 두 개의 Ask Gemini 단계가 이어지는지 확인한다.',
      checks: [['Starter', '매주 월요일 오전 7시 45분'], ['2단계', '준비 상태 표 생성'], ['3단계', '오늘 확인·수업 전·승인 뒤 행동 요약']],
    },
    128: {
      summary: 'Flow는 사용 설정하지 않고 Test run만 실행한다. 경고를 읽고 외부 앱에 쓰는 Step이 없는지 다시 확인한다.',
    },
    132: {
      summary: 'Test 결과는 Python·Flask 환경을 준비 완료로, GitHub 최종 커밋·대체텍스트·코드 디펜스 한 문항을 확인 필요로 분류했다.',
    },
    133: {
      summary: '입력에는 학생 명단 점검 요구가 없었지만 결과가 이를 추가했다. 자동화 결과도 입력 계약을 벗어나는지 사람이 검토해야 한다.',
      checks: [['입력', '실제 학생 정보 없음'], ['출력의 추가', '학생 명단 확인'], ['판정', '근거 없는 과잉 추론으로 표시하고 삭제 검토']],
    },
    138: {
      summary: 'New Gems는 같은 평가계획 비교가 아니라 세 입력을 순서대로 받아 한 차시 수업안을 렌더링하는 미니앱으로 구분한다.',
      checks: [['입력 1', 'NCS 목표 또는 수업 목표'], ['입력 2·3', '수업 시간 / 실습 환경·학생 수준'], ['출력', '학생 활동·교사 관찰·완료 증거·코드 디펜스']],
    },
    141: {
      summary: '자동 생성된 다섯 단계가 세 입력을 각각 받고, 시나리오를 생성한 뒤 보고서 형태로 렌더링하는지 전체 순서를 읽는다.',
    },
    146: {
      summary: '세 입력을 모두 넣었지만 생성 단계가 NCS 목표를 다시 요구했다. 자동 생성된 연결이 실제로 작동한다고 가정하면 안 된다.',
      checks: [['관찰', '세 번째 입력 뒤 첫 목표를 다시 질문'], ['판정', '입력 변수 연결 오류'], ['대응', '세 제약을 다시 주어 결과 확보 후 앱 구조 수정 필요 표시']],
    },
    148: {
      summary: '보완 실행 결과 상단에서 50분 시간 배분, Python·Flask·VS Code 환경, 시간 때문에 줄인 활동의 이유를 함께 확인한다.',
    },
    149: {
      summary: '결과 하단에서 학생이 할 일과 교사가 관찰할 지점이 분리되고 완료 증거와 코드 디펜스 질문이 남았는지 확인한다.',
    },
    153: {
      summary: '교육 계정 Gemini 기본 화면을 단축키 입력 전 기준 화면으로 저장한다. 같은 창과 같은 배율을 유지해야 입력 후 변화를 정확히 비교할 수 있다.',
      checks: [['계정', '교육용 Google 계정'], ['입력 전 URL', 'gemini.google.com/app'], ['비교 조건', '같은 창·같은 배율·같은 위치 유지']],
    },
    154: {
      summary: '교육 계정 화면에서 Ctrl+Shift+S를 실제로 누르고, 화면 전환과 URL 변경이 있는지 확인한다.',
      checks: [['실행', 'Ctrl+Shift+S 실제 키 입력'], ['관찰', '새 화면·메뉴·대화상자가 열리는가?'], ['기록', '입력 전과 입력 후 화면을 각각 보존']],
    },
    155: {
      summary: '현재 교육 계정에서는 단축키 입력 뒤에도 화면과 URL이 그대로였다. 기능이 있다고 가정하지 않고 실제 계정의 관찰 결과를 기록한다.',
      checks: [['화면', '입력 전·후 변화 없음'], ['URL', '/app 상태 유지'], ['판정', '현재 교육 계정에서는 Spark 단축키 진입을 확인하지 못함']],
    },
    156: {
      summary: '같은 단축키를 개인 계정에서 다시 검증하자 Spark 화면으로 이동했다. 교육 계정과 개인 계정의 실제 차이를 전·후 화면으로 비교한다.',
      checks: [['계정', '개인 Google 계정'], ['실행', 'Ctrl+Shift+S 실제 키 입력'], ['결과', 'Spark 진입 화면과 URL 변화 확인']],
    },
    157: {
      summary: 'Spark의 Skill 예제는 평가 증거 판정이 아니라 수업자료 배포 전에 반복할 접근성 점검 절차로 바꾼다.',
      checks: [['입력', '합성 수업자료 설명'], ['절차', '제목·계층·대체텍스트·표·링크·색상·지시문'], ['결과', '판정·교사 조치·수정 우선순위']],
    },
    159: {
      summary: '저장하면 이름이 하이픈 형태의 `수업자료-접근성-점검`으로 정규화되고 활성 Skill 목록에서 다시 사용할 수 있다.',
    },
    161: {
      summary: '합성 활동지에 대체텍스트 누락, 표 머리글 누락, 모호한 링크, 색상 단독 표시를 의도적으로 넣어 Skill의 반복 절차를 시험한다.',
    },
    164: {
      summary: '입력과 결과를 같은 화면에서 읽으며 문서 제목은 통과, 제목 계층·대체텍스트·표 머리글·링크·색상은 수정 필요인지 확인한다.',
    },
    165: {
      summary: '하단 결과의 수정 우선순위는 ① 화면 캡처 대체텍스트 작성 ② 제목 스타일과 표 머리글 구조화 ③ 색상 표시 다중화와 링크 문구 구체화다.',
    },
  };

  const practicePlans = {
    42: { minutes: 10, steps: ['자신의 반복 업무 하나를 고르고 배경·목적·제약을 적는다.', '원하는 출력 형식과 근거 없음 때의 멈춤 행동을 적는다.', '여섯 질문 체크리스트와 대조해 빠진 조건을 찾아 한 문장 보강한다.'], done: '여섯 질문을 모두 반영한 프롬프트 초안 1개' },
    59: { minutes: 10, steps: ['4분: 목표·자료·금지·출력·실패·검증 여섯 줄을 자신의 업무로 작성한다.', '3분: 자신의 평가계획·입력 자료와 대조해 모호하거나 빠진 조건에 표시한다.', '3분: 표시한 조건을 구체화하고, 근거가 부족하면 멈추는 문장을 보강한다.'], done: '자료 경계와 실패 행동이 분명한 자신의 Harness 여섯 줄' },
    76: { minutes: 10, steps: ['Draft: 자신의 결과에서 확정 문장 하나를 고른다.', 'Critique: 직접 증거·서술 증거·근거 없음으로 분류한다.', 'Human Check → Revised: 교사가 원자료를 확인하고 상태와 질문을 수정한다.'], done: '수정 전 문장·근거 분류·수정 후 문장 3개 묶음' },
    113: { minutes: 10, steps: ['짧은 평가계획 원문을 Notebook 소스로 넣는다.', '평가항목과 점수를 묻고 답변의 인용 번호를 연다.', '인용 문장이 답변을 실제로 지지하는지 원문과 대조한다.'], done: '질문 1개·인용 1개·원문 대조 판정 1개' },
    166: { minutes: 10, steps: ['반복 업무의 이름·입력·절차·출력을 한 줄씩 쓴다.', '근거 부족 때의 실패 행동과 외부 쓰기 금지를 추가한다.', '자신의 예시 Task 하나에 적용해 빠진 지침을 찾아 보강한다.'], done: '예시 Task로 검증한 Skill 이름·입력·절차·출력·실패 행동 명세' },
    170: { minutes: 10, steps: ['자신의 교과 업무 하나를 목표·자료·금지·출력·실패·검증 여섯 줄로 작성한다.', '자기 점검표로 자료 경계와 근거 없음 때의 행동을 확인해 보강한다.', '게시·평가·발송·자동 실행 중 사람 승인 지점을 한 곳 표시해 최종 수정한다.'], done: '자기 검증을 마친 여섯 줄 통제 계약 1개' },
  };

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  function inline(value) {
    return escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>');
  }

  function formatPrompt(value) {
    return escapeHtml(value).replace(/\n/g, '<br />');
  }

  function minute(number) {
    if (number === 78) return '휴식 · 10분';
    return number < 78 ? '1부 · 50분' : '2부 · 50분';
  }

  function evidenceFigure([file, alt, zoom = 1, x = 50, y = 50, fit = 'contain']) {
    const fitClass = fit === 'contain' ? ' is-contain' : '';
    const safeZoom = fit === 'focus' ? zoom : Math.min(zoom, 1.08);
    return `
      <figure class="course-evidence${fitClass}" style="--zoom:${safeZoom}; --x:${x}%; --y:${y}%">
        <img src="${captureRoot}/${file}" alt="${escapeHtml(alt)}" />
      </figure>
    `;
  }

  function evidenceBlock(number) {
    const items = evidence[number] || [];
    if (!items.length) return '';
    const pairClass = items.length > 1 ? ' is-pair' : '';
    const columnClass = [164, 165].includes(number) ? ' is-columns' : '';
    return `<div class="course-evidence-grid${pairClass}${columnClass}">${items.map(evidenceFigure).join('')}</div>`;
  }

  function detailChecks(item, fallback) {
    const checks = slideDetails[item.number]?.checks;
    if (!checks?.length) return fallback;
    return checks.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('');
  }

  function activityBody(item) {
    const plan = practicePlans[item.number] || {
      minutes: 10,
      steps: ['실제 학생 정보가 없는 자신의 교과 업무 하나를 고른다.', '사용할 자료와 사용하지 않을 자료를 한 줄씩 적는다.', '자기 점검표로 근거 없음 때 멈추는 문장을 확인해 보강한다.'],
      done: '사람이 확인할 질문 하나가 남아 있는 결과',
    };
    return `
      <div class="practice-layout">
        <div class="practice-timer"><strong>${plan.minutes}</strong><span>분 실습</span></div>
        <div class="practice-content">
          <span>${inline(item.type)}</span>
          <h2>${inline(item.overview)}</h2>
          <ol>${plan.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join('')}</ol>
          <p>완료 기준: <b>${escapeHtml(plan.done)}</b></p>
        </div>
      </div>
    `;
  }

  function sourcePlanBody(item) {
    const detail = slideDetails[item.number];
    return `
      <div class="course-layout has-evidence course-source-plan">
        <div class="course-copy">
          <span class="course-kicker">평가계획 원문</span>
          <p class="course-lead">${escapeHtml(detail.summary)}</p>
          ${promptText[item.number] ? `<blockquote class="course-prompt"><strong>입력에 옮길 문장</strong><p>${formatPrompt(promptText[item.number])}</p></blockquote>` : ''}
          <dl class="course-checks">${detailChecks(item, '')}</dl>
        </div>
        ${evidenceBlock(item.number)}
      </div>
    `;
  }

  function classroomRubricInputBody() {
    const [guidanceSection, skillsSection] = promptText[13].split('\n\n');
    const guidance = guidanceSection.replace('[안내 입력]\n', '');
    const skills = skillsSection.replace('[지식 또는 기술 입력]\n', '');
    return `
      <div class="course-layout has-evidence rubric-input-layout">
        <div class="course-copy">
          <span class="course-kicker">캡처와 같은 실제 입력값</span>
          <p class="course-lead">두 입력란의 역할을 나누고, 아래 문장을 그대로 입력한다.</p>
          <div class="rubric-input-meta"><b>학년 수준</b><span>3</span><b>성취도 등급</b><span>3</span></div>
          <div class="rubric-input-values">
            <article><strong>안내 입력</strong><p>${formatPrompt(guidance)}</p></article>
            <article><strong>지식 또는 기술 입력</strong><p>${formatPrompt(skills)}</p></article>
          </div>
        </div>
        ${evidenceBlock(13)}
      </div>
    `;
  }

  function classroomSheetDownloadBody(item) {
    return `
      <div class="course-layout has-evidence sheet-download-layout">
        <div class="course-copy">
          <span class="course-kicker">파일로 재검증</span>
          <p class="course-lead">${escapeHtml(slideDetails[23].summary)}</p>
          <div class="material-download-card">
            <strong>강의안의 루브릭 시트</strong>
            <p>캡처된 생성 결과를 Excel로 옮긴 연수용 파일이다. 실제 학생 정보와 실제 점수는 없다.</p>
            <a href="../materials/연수용-Classroom-루브릭-시트.xlsx" download="연수용-Classroom-루브릭-시트.xlsx">루브릭 시트 다운로드 · XLSX</a>
          </div>
          <dl class="course-checks">${detailChecks(item, '')}</dl>
        </div>
        ${evidenceBlock(23)}
      </div>
    `;
  }

  function structuredPromptLines(value) {
    return value.split('\n').map((line) => {
      const [label, ...rest] = line.split(':');
      return `<li><b>${escapeHtml(label)}</b><span>${escapeHtml(rest.join(':').trim())}</span></li>`;
    }).join('');
  }

  function structuredPromptRunBody() {
    return `
      <div class="structured-run-layout">
        <div class="structured-run-copy">
          <div class="structured-material-choice">
            <strong>1 · 평가계획을 먼저 준비</strong>
            <p><b>권장:</b> 자신의 평가계획 PDF를 첨부하고 교과명·수행과제·평가요소·배점을 그 문서의 내용으로 바꾼다.</p>
            <p><b>대안:</b> 자신의 자료가 없을 때만 강의자의 예시 파일을 사용한다.</p>
            <a href="../materials/연수용-파이썬프로그래밍-평가계획.pdf" download="연수용-파이썬프로그래밍-평가계획.pdf">예시 평가계획 PDF 다운로드</a>
          </div>
          <div class="structured-prompt-card">
            <strong>2 · PDF와 함께 입력할 여섯 요소 프롬프트</strong>
            <ol>${structuredPromptLines(promptText[40])}</ol>
          </div>
        </div>
        <div class="structured-run-proof">
          ${evidenceBlock(40)}
          <blockquote class="prompt-preflight-tip">
            <strong>실행 전 누락 점검 프롬프트</strong>
            <p>“이 요청에 배경·목적·제약·형식·예외·수정 기준이 모두 반영됐는지 먼저 점검해 줘. 빠졌거나 충분하지 않은 요소가 있으면 바로 실행하지 말고, 보완할 내용을 먼저 질문해 줘.”</p>
            <small>작업 전체의 조건은 Harness에서, 생성 결과의 재검증은 Verification Loop에서 이어서 보강한다.</small>
          </blockquote>
        </div>
      </div>
    `;
  }

  function structuredPromptCompareBody(item) {
    return `
      <div class="structured-compare-layout">
        <div class="structured-compare-copy">
          <span class="course-kicker">같은 근거로 비교</span>
          <p class="course-lead">${escapeHtml(slideDetails[41].summary)}</p>
          <div class="compare-source-card">
            <strong>비교에 사용할 평가계획</strong>
            <p>자신의 평가계획이 기본이다. 예시를 사용할 때도 두 결과에 같은 PDF를 적용한다.</p>
            <a href="../materials/연수용-파이썬프로그래밍-평가계획.pdf" download="연수용-파이썬프로그래밍-평가계획.pdf">예시 평가계획 PDF 다운로드</a>
          </div>
          <dl class="course-checks">${detailChecks(item, '')}</dl>
          <p class="compare-followup">프롬프트의 누락 방지는 이 장에서 확인하고, 근거가 약한 결과의 수정 절차는 Harness와 Verification Loop에서 확장한다.</p>
        </div>
        ${evidenceBlock(41)}
      </div>
    `;
  }

  function clarificationBody() {
    const questions = [
      ['교과·학년', '어떤 교과의 몇 학년 수행평가인가?'],
      ['수행과제', '학생이 실제로 무엇을 만들거나 시연하는가?'],
      ['평가요소', '평가계획에 적힌 항목과 증거는 무엇인가?'],
      ['수준·배점', '몇 단계이며 점수는 어떻게 대응하는가?'],
      ['근거 자료', '어떤 문서만 사용하고 무엇은 추정하지 말아야 하는가?'],
    ];
    return `
      <div class="clarification-layout">
        <blockquote class="course-prompt is-large"><strong>한 줄 요청</strong><p>${formatPrompt(promptText[25])}</p></blockquote>
        <div class="question-grid">${questions.map(([title, text], index) => `<article><b>${index + 1}</b><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>
        <p class="clarification-verdict">이 정보가 없으면 먼저 되묻는 것이 안전하다. 답을 추정해 일반 루브릭을 만들면 평가계획과 다른 결과가 된다.</p>
      </div>
    `;
  }

  function promptQuestionsBody() {
    const items = [
      ['1', '왜 하는가?', '배경·목적·제약'],
      ['2', '무엇을 내놓는가?', '출력 열·길이·형식'],
      ['3', '정보가 없으면?', '예외와 멈춤 행동'],
      ['4', '어떤 순서인가?', '생성·대조·수정 단계'],
      ['5', '무엇을 고칠까?', '문제·이유·원하는 상태'],
      ['6', '다시 쓸 수 있는가?', '반복 업무용 템플릿'],
    ];
    return `<div class="principle-grid">${items.map(([number, title, text]) => `<article><b>${number}</b><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`;
  }

  function openingBody(number) {
    if (number === 2) {
      const decisions = [
        ['생성', '초안·요약·분류는 AI가 빠르게 만든다.'],
        ['검증', '평가계획·코드·화면·인용으로 교사가 근거를 확인한다.'],
        ['결정', '게시·평가·발송·자동 실행은 교사가 승인한다.'],
      ];
      return `
        <div class="opening-claim-layout">
          <section class="opening-claim-main">
            <span>이 연수의 출발점</span>
            <h2>AI가 만든 문장은 빨라도<br />교사의 책임은 이동하지 않는다.</h2>
            <p>중요한 것은 더 빨리 생성하는 방법이 아니라, 무엇을 근거로 확인하고 어디에서 사람이 멈춰 결정할지 설계하는 것이다.</p>
          </section>
          <aside class="opening-decision-list">
            <ol>${decisions.map(([title, text], index) => `<li><b>${index + 1}</b><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></li>`).join('')}</ol>
            <p><strong>오늘의 원칙</strong> 생성은 맡기고, 근거와 결정권은 남긴다.</p>
          </aside>
        </div>
      `;
    }

    if (number === 3) {
      const outcomes = [
        ['01', '루브릭 초안', '자신의 평가계획을 근거로 Classroom에서 평가표 초안을 만든다.'],
        ['02', '통제 프롬프트', '목표·자료·금지·출력·실패·검증의 여섯 줄을 완성한다.'],
        ['03', '검증 기록', 'Draft→Critique→Human Check→Revised의 변경 근거를 남긴다.'],
      ];
      return `
        <div class="opening-outcomes-layout">
          <h2>100분 후, 기능 목록이 아니라<br /><em>직접 검증한 결과물 세 가지</em>가 남는다.</h2>
          <div class="opening-outcome-columns">
            ${outcomes.map(([index, title, text]) => `<article><b>${index}</b><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}
          </div>
          <p class="opening-outcome-rule">완료 기준 · 실제 학생 정보 없이 만들고, 원문 근거와 사람 승인 지점을 설명할 수 있다.</p>
        </div>
      `;
    }

    if (number === 4) {
      return `
        <div class="opening-boundary-layout">
          <section class="opening-boundary-use">
            <span>실습에 사용하는 자료</span>
            <h2>기준과 절차는 실제로,<br />사례와 기록은 합성으로</h2>
            <ul>
              <li>자신의 교과 평가계획 또는 연수용 예시 평가계획</li>
              <li>학생을 식별할 수 없는 합성 작업 기록과 오류 사례</li>
              <li>교육용·개인 계정에서 직접 확인한 Google UI</li>
            </ul>
          </section>
          <section class="opening-boundary-avoid">
            <span>실습에 넣지 않는 자료</span>
            <h2>학생·평가·조직 정보를<br />실습 입력으로 사용하지 않는다</h2>
            <ul>
              <li>학생 이름·계정·연락처·사진 등 개인정보</li>
              <li>실제 점수·제출물·생활기록·평가 판정</li>
              <li>관리자 설정·학교 정책 변경·조직 전체 자동화</li>
            </ul>
          </section>
          <p><strong>경계 문장</strong> “기준은 원문에서 가져오고, 학생 사례는 합성하며, 게시와 평가는 교사가 결정한다.”</p>
        </div>
      `;
    }

    if (number === 5) {
      return `
        <div class="opening-account-layout">
          <section class="opening-account-education">
            <span>교육용 계정</span>
            <h2>수업·문서·자동화의<br />교육 현장 기능을 검증</h2>
            <ul>
              <li><b>Gemini in Classroom</b><span>평가계획 기반 루브릭 초안</span></li>
              <li><b>Classic Gems</b><span>파이썬 오류 상담 절차 저장</span></li>
              <li><b>Gemini Notebook</b><span>평가계획 비교·인용·원문 대조</span></li>
              <li><b>Workspace Studio</b><span>월요일 수업 준비 브리핑 Flow</span></li>
            </ul>
          </section>
          <section class="opening-account-personal">
            <span>개인 계정</span>
            <h2>교육 계정에서 보이지 않는<br />Labs·Spark 기능을 검증</h2>
            <ul>
              <li><b>New Gems from Labs</b><span>목표·시간·환경을 받는 수업 설계 앱</span></li>
              <li><b>Gemini Spark</b><span>단축키 진입과 Task 실행</span></li>
              <li><b>Skills</b><span>수업자료 접근성 점검 절차 재사용</span></li>
              <li><b>Gemini 요청 사항</b><span>모든 대화에 반복할 응답 습관</span></li>
            </ul>
          </section>
          <p>기능명을 가정하지 않고 <strong>각 계정에서 실제로 보이는 화면과 동작</strong>을 기준으로 설명한다.</p>
        </div>
      `;
    }

    const routeBands = [
      ['1부 · 초안 통제', [['01', 'Classroom'], ['02', 'Prompt'], ['03', 'Harness'], ['04', 'Verification Loop']]],
      ['2부 · 반복 시스템', [['05', 'Classic Gem'], ['06', 'Gemini Notebook'], ['07', 'Workspace Studio']]],
      ['개인 계정 확장', [['08', 'New Gems'], ['09', 'Spark / Skills']]],
    ];
    return `
      <div class="opening-route-layout">
        <div class="opening-route-bands">
          ${routeBands.map(([label, steps]) => `<section><strong>${escapeHtml(label)}</strong><ol>${steps.map(([index, step]) => `<li><b>${index}</b><span>${escapeHtml(step)}</span></li>`).join('')}</ol></section>`).join('')}
        </div>
        <div class="opening-route-cycle">
          <strong>모든 기능에서 반복하는 통제 순환</strong>
          <p>실제 입력값 확인 <b>→</b> 생성 <b>→</b> 근거 대조 <b>→</b> 사람 판정 <b>→</b> 수정·승인</p>
        </div>
      </div>
    `;
  }

  function evaluationPlanMissionBody() {
    const detail = slideDetails[8];
    return `
      <div class="evaluation-plan-mission">
        <section class="evaluation-plan-primary">
          <span>권장 경로</span>
          <h2>자신의 평가계획으로 실습한다</h2>
          <p>${escapeHtml(detail.summary)}</p>
          <ol>
            <li>자신의 교과 평가계획 PDF를 연다.</li>
            <li>수행과제 하나와 평가요소·배점 기준을 찾는다.</li>
            <li>학생 이름·점수·제출물은 제외하고 기준 문장만 사용한다.</li>
          </ol>
        </section>
        <aside class="evaluation-plan-fallback">
          <span>자료가 없을 때</span>
          <h2>연수용 예시를 사용한다</h2>
          <p>강의자의 파이썬프로그래밍 평가계획을 내려받아 같은 화면을 따라갈 수 있다.</p>
          <a href="../materials/연수용-파이썬프로그래밍-평가계획.pdf" download="연수용-파이썬프로그래밍-평가계획.pdf">예시 평가계획 PDF 다운로드</a>
          <small>기본 선택은 자신의 평가계획 · 예시 파일은 대체 자료</small>
        </aside>
      </div>
    `;
  }

  function promptPrinciplePairBody(item) {
    const data = promptPairData[item.number];
    return `
      <div class="prompt-principle-pair">
        <section class="prompt-principle-why">
          <span>${escapeHtml(data.label)}</span>
          <h2>${escapeHtml(data.why)}</h2>
          <p><strong>확인 질문</strong>${escapeHtml(data.check)}</p>
        </section>
        <blockquote class="prompt-principle-example">
          <strong>실제로 입력할 문장</strong>
          <p>${formatPrompt(data.example)}</p>
        </blockquote>
      </div>
    `;
  }

  function promptTemplateBody() {
    const fields = [
      ['역할', '어떤 관점의 검토자인가'], ['목적', '이 결과로 무엇을 결정하는가'],
      ['입력', '사용할 평가계획·수업 자료'], ['처리', '생성·대조·분류 순서'],
      ['출력', '표의 열·분량·정렬 방식'], ['예외', '자료 없음·충돌 때 멈추는 법'],
      ['금지', '추정·점수 계산·외부 공유'], ['검증', '마지막에 다시 셀 항목'],
    ];
    return `
      <div class="prompt-template-layout">
        <div class="prompt-template-grid">
          ${fields.map(([name, text]) => `<article><b>${escapeHtml(name)}</b><span>${escapeHtml(text)}</span></article>`).join('')}
        </div>
        <aside class="prompt-template-example">
          <strong>파이썬 수행평가 예시</strong>
          <p>역할: 수행평가 검토자 · 목적: 교사가 확인할 증거 정리 · 입력: 자신의 평가계획과 합성 기록 · 처리: 초안→원문 대조→근거 분류 · 출력: 네 열 표 · 예외: 근거 없음은 확인 필요 · 금지: 학생 점수 추정 · 검증: 항목 수와 배점 확인</p>
        </aside>
      </div>
    `;
  }

  function inputContextBlock(number) {
    const value = promptText[number] || inputContext[number];
    if (!value) return '';
    return `<div class="course-input-context"><strong>이 화면에 사용한 실제 입력값</strong><p>${formatPrompt(value)}</p></div>`;
  }

  function harnessContractBody(item) {
    const groups = {
      44: [['목표', '교사가 확인할 증거를 찾는다.'], ['업무', '평가계획과 합성 작업 기록을 비교한다.'], ['결정권', '점수와 최종 판정은 교사가 맡는다.']],
      47: [['자료', '평가계획 다섯 항목과 합성 기록만 사용'], ['금지', '점수·학생 특성·학교 정책을 추정하지 않음'], ['출력', '항목·필요 증거·확인 증거·상태·교사 질문 표']],
      50: [['실패', '근거가 부족하면 확인 필요로 멈춤'], ['검증', '다섯 항목인지, 점수를 계산하지 않았는지 확인'], ['완성', '목표·자료·금지·출력·실패·검증 여섯 줄']],
    };
    return `<div class="contract-grid">${groups[item.number].map(([title, text], index) => `<article><b>${index + 1}</b><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`;
  }

  function harnessExecutionBody(item) {
    const lines = harnessContractInput.split('\n').map((line) => {
      const [label, ...rest] = line.split(':');
      return `<li><b>${escapeHtml(label)}</b><span>${escapeHtml(rest.join(':').trim())}</span></li>`;
    }).join('');
    return `
      <div class="harness-execution-layout">
        <section class="harness-execution-copy">
          <span>실제 사용자 입력</span>
          <h2>캡처 화면에 입력한 원문</h2>
          <ol>${lines}</ol>
          <p><strong>함께 넣은 합성 기록</strong> Flask 실행 · students List · course_info Dictionary · Jinja2 for 출력 · 해결 후 화면 없음 · 코드 디펜스 미실시</p>
        </section>
        ${evidenceBlock(item.number)}
      </div>
    `;
  }

  function loopModelBody() {
    const stages = [
      ['1', 'Draft', '첫 결과를 최종본이 아닌 검증 대상으로 둔다.'],
      ['2', 'Critique', '주장을 직접 증거·서술 증거·근거 없음으로 나눈다.'],
      ['3', 'Human Check', '교사가 평가계획·코드·화면·일지를 직접 확인한다.'],
      ['4', 'Revised', '확인된 근거만 남기고 상태와 질문을 수정한다.'],
    ];
    return `<div class="loop-grid">${stages.map(([number, title, text]) => `<article><b>${number}</b><h3>${title}</h3><p>${escapeHtml(text)}</p></article>`).join('')}</div>`;
  }

  function sourceReviewBody() {
    const verdicts = [['유지', '직접 증거가 있음'], ['수정', '표현이나 근거 수준이 과함'], ['삭제', '평가계획 밖의 주장'], ['확인 필요', '교사가 원자료를 더 봐야 함']];
    return `
      <div class="source-review-layout">
        <figure class="source-review-page"><img src="${captureRoot}/00-source-plan/00-01_python-evaluation-plan-page5.png" alt="파이썬프로그래밍 평가계획 5쪽" /></figure>
        <div class="source-review-copy"><h2>AI 화면을 닫고 네 자료를 직접 대조한다</h2><ul><li>평가계획: 요구된 평가항목과 점수</li><li>코드: Flask·변수·for·if의 실제 선언</li><li>화면: 실행 결과와 동적 출력</li><li>일지·구두 설명: 오류 해결 과정과 코드 디펜스</li></ul><div class="verdict-grid">${verdicts.map(([title, text]) => `<article><b>${escapeHtml(title)}</b><span>${escapeHtml(text)}</span></article>`).join('')}</div></div>
      </div>
    `;
  }

  function toolMapBody() {
    const tools = [
      ['Classroom', '수행평가표 초안', '게시 전 교사 승인'],
      ['Classic Gem', '파이썬 오류 상담', '반복 대화·질문 순서'],
      ['Notebook', '평가계획 학기 비교', '소스·인용·명시 없음'],
      ['Studio', '월요일 준비 브리핑', 'Schedule·Variable·Test'],
      ['New Gem', '실습 시나리오 빌더', '목표·시간·환경 다중 입력'],
      ['Spark Skill', '수업자료 접근성 점검', '재사용 절차·Task 호출'],
    ];
    const contract = [
      ['목표', 'AI가 할 일'], ['자료', '사용할 근거'], ['금지', '추정·외부 쓰기'],
      ['출력', '검토할 형태'], ['실패', '정보 부족 때 행동'], ['검증', '사람이 확인할 기준'],
    ];
    return `
      <div class="tool-map-layout">
        <div class="tool-map-grid">
          ${tools.map(([name, example, control]) => `<article><b>${escapeHtml(name)}</b><strong>${escapeHtml(example)}</strong><span>${escapeHtml(control)}</span></article>`).join('')}
        </div>
        <div class="tool-map-contract">
          <h2>어떤 도구를 골라도 마지막은 여섯 줄 통제 계약</h2>
          <ol>${contract.map(([name, text]) => `<li><b>${escapeHtml(name)}</b><span>${escapeHtml(text)}</span></li>`).join('')}</ol>
          <p><strong>전체 연결</strong> 초안 생성 → 조건 고정 → 근거 대조 → 사람 확인 → 수정 → 승인</p>
        </div>
      </div>
    `;
  }

  function lessonBody(item) {
    if (practiceSlides.has(item.number)) return activityBody(item);
    if ([2, 3, 4, 5, 6].includes(item.number)) return openingBody(item.number);
    if (item.number === 8) return evaluationPlanMissionBody();
    if ([11, 14].includes(item.number)) return sourcePlanBody(item);
    if (item.number === 13) return classroomRubricInputBody();
    if (item.number === 23) return classroomSheetDownloadBody(item);
    if (item.number === 25) return clarificationBody();
    if (item.number === 28) return promptQuestionsBody();
    if (promptPairData[item.number]) return promptPrinciplePairBody(item);
    if (item.number === 39) return promptTemplateBody();
    if (item.number === 40) return structuredPromptRunBody();
    if (item.number === 41) return structuredPromptCompareBody(item);
    if ([44, 47, 50].includes(item.number)) return harnessContractBody(item);
    if (item.number === 53) return harnessExecutionBody(item);
    if (item.number === 62) return loopModelBody();
    if (item.number === 69) return sourceReviewBody();
    if (item.number === 167) return toolMapBody();
    if ([54, 55, 56, 57, 58, 64, 65, 66, 73, 74, 75, 164, 165].includes(item.number)) {
      const summary = slideDetails[item.number]?.summary || item.overview;
      return `
        <div class="course-result-layout">
          <div class="course-result-meta">
            <div class="course-result-note"><strong>읽을 점</strong><span>${escapeHtml(summary)}</span></div>
            ${inputContextBlock(item.number)}
          </div>
          ${evidenceBlock(item.number)}
        </div>
      `;
    }
    const lens = sectionLens[item.section] || sectionLens['통합 실습과 마무리'];
    const image = evidenceBlock(item.number);
    const prompt = promptText[item.number];
    const detail = slideDetails[item.number];
    const hasImage = Boolean(image);
    const fallbackChecks = `
      <div><dt>해보기</dt><dd>${escapeHtml(lens[0])}</dd></div>
      <div><dt>확인</dt><dd>${escapeHtml(lens[1])}</dd></div>
      <div><dt>판정</dt><dd>${escapeHtml(lens[2])}</dd></div>
    `;
    return `
      <div class="course-layout${hasImage ? ' has-evidence' : ''}">
        <div class="course-copy">
          <span class="course-kicker">${inline(item.type)}</span>
          <p class="course-lead">${escapeHtml(detail?.summary || lens[0])}</p>
          ${prompt ? `<blockquote class="course-prompt${item.number === 53 ? ' is-harness' : ''}"><strong>이 화면에 입력한 값</strong><p>${formatPrompt(prompt)}</p></blockquote>` : inputContextBlock(item.number)}
          <dl class="course-checks">${detailChecks(item, fallbackChecks)}</dl>
        </div>
        ${image}
      </div>
    `;
  }

  function coverSlide() {
    return {
      layout: 'cover',
      section: '표지',
      title: 'Gemini & Workspace 실전 통제술',
      body: `
        <div class="cover-grid course-cover">
          <h1 class="cover-title">Gemini &amp; Workspace<em>실전 통제술</em></h1>
          <p class="cover-subtitle">특성화고 교사를 위한 <strong>평가계획 기반 100분 실습</strong></p>
          <aside class="cover-principles">
            <h2>오늘의 통제 원칙</h2>
            <ol>
              <li><b>01</b><span>평가계획을 근거로 고정한다</span></li>
              <li><b>02</b><span>서술과 직접 증거를 구분한다</span></li>
              <li><b>03</b><span>게시·평가·자동 실행은 교사가 결정한다</span></li>
            </ol>
          </aside>
          <div class="course-cover-case">
            <span>공통 교과 맥락</span>
            <strong>특성화고 프로그래밍 수업·평가 업무</strong>
            <p>도구마다 입력·결과·통제 지점을 다르게 설계</p>
          </div>
          <div class="cover-timing">1부 50분 · 휴식 10분 · 2부 50분 · 총 ${outline.length - hiddenSlides.size}장</div>
        </div>
      `,
    };
  }

  function sectionSlide(item, index) {
    return {
      layout: 'section',
      section: item.section,
      title: item.section,
      body: `
        <div class="section-hero">
          <span class="section-index">SECTION ${String(index).padStart(2, '0')}</span>
          <h1>${inline(item.section)}</h1>
          <p>${inline(item.overview)}</p>
          <div class="section-proof">${escapeHtml(sources[item.section] || '')}</div>
        </div>
      `,
    };
  }

  function regularSlide(item) {
    const titleClasses = [];
    if (item.overview.length > 31) titleClasses.push('slide--long-title');
    if (item.overview.length > 44) titleClasses.push('slide--very-long-title');
    if (practiceSlides.has(item.number)) titleClasses.push('slide--practice');
    return {
      layout: 'content',
      section: item.section,
      title: inline(item.overview),
      subtitle: item.type,
      minute: minute(item.number),
      footer: sources[item.section] || sources['통합 실습과 마무리'],
      className: titleClasses.join(' '),
      body: lessonBody(item),
    };
  }

  window.TRAINING_SLIDES = outline.filter((item) => !hiddenSlides.has(item.number)).map((item) => {
    if (item.number === 1) return coverSlide();
    if (sectionStarts.has(item.number)) return sectionSlide(item, sectionStarts.get(item.number));
    if (item.number === 78) {
      return {
        layout: 'break',
        section: '휴식',
        title: '10분 휴식',
        body: '<div class="break-grid"><strong>10</strong><h1>잠깐 쉬었다가, 반복 가능한 시스템으로</h1><p>Classic Gems → Gemini Notebook → Workspace Studio → New Gems → Spark / Skills</p></div>',
      };
    }
    if (item.number === 172) {
      return {
        layout: 'closing',
        section: '마무리',
        title: '근거를 남기고, 결정권을 지킨다',
        body: '<div class="closing-grid"><h1>생성은 AI가,<br /><em>게시·평가·자동 실행은 교사가.</em></h1><p>평가계획 → 실제 UI → 합성 증거 → Verification Loop → 사람 승인</p><div class="final-route"></div></div>',
      };
    }
    return regularSlide(item);
  });
})();
