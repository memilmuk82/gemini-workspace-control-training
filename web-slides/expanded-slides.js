(() => {
  'use strict';

  const baseSlides = window.TRAINING_SLIDES || [];
  const baseByTitle = new Map(baseSlides.map((slide) => [slide.title, slide]));
  const captureRoot = '../captures';
  const capture = (folder, file) => captureRoot + '/' + folder + '/' + file;

  function reuse(title, overrides) {
    const original = baseByTitle.get(title);
    if (!original) throw new Error('기존 슬라이드를 찾을 수 없습니다: ' + title);
    return Object.assign({}, original, overrides || {});
  }

  function lesson(section, title, tag, lead, action, check, minute, tone) {
    return {
      layout: 'content',
      section,
      title,
      subtitle: lead,
      minute,
      footer: '실습 안내 · 합성 데이터만 사용',
      className: 'lesson-slide ' + (tone || ''),
      body: [
        '<div class="lesson-stage">',
        '<div class="lesson-copy">',
        '<span class="lesson-tag">', tag, '</span>',
        '<h2>', lead, '</h2>',
        '</div>',
        '<div class="lesson-action">',
        '<article><span>지금 할 일</span><strong>', action, '</strong></article>',
        '<article><span>통과 기준</span><strong>', check, '</strong></article>',
        '</div>',
        '</div>',
      ].join(''),
    };
  }

  function practice(section, title, lead, task, done, alternative, minute) {
    return {
      layout: 'content',
      section,
      title,
      subtitle: lead,
      minute,
      footer: '참가자 실습 · 실제 학생 데이터 사용 금지',
      className: 'practice-slide',
      body: [
        '<div class="practice-stage">',
        '<div class="practice-clock"><b>실습</b><strong>', task, '</strong></div>',
        '<div class="practice-check">',
        '<span>완료 조건</span><p>', done, '</p>',
        alternative ? '<aside><b>기능이 없다면</b><p>' + alternative + '</p></aside>' : '',
        '</div>',
        '</div>',
      ].join(''),
    };
  }

  function screen(options) {
    const focusClass = options.focused ? ' is-focused' : '';
    const zoom = options.zoom || 1;
    const x = options.x || 50;
    const y = options.y || 50;
    return {
      layout: 'content',
      section: options.section,
      title: options.title,
      subtitle: options.subtitle,
      minute: options.minute,
      footer: options.footer || '실제 UI · 합성 데이터',
      className: 'screen-step-slide',
      body: [
        '<div class="focus-layout">',
        '<div class="process-panel ', options.prompt ? 'has-prompt' : '', '">',
        '<span class="process-kicker">', options.step, '</span>',
        '<h2>', options.action, '</h2>',
        '<p>', options.summary, '</p>',
        options.prompt ? '<blockquote class="prompt-preview"><strong>입력 프롬프트</strong><p>' + options.prompt + '</p></blockquote>' : '',
        '<dl class="process-facts">',
        '<div><dt>실행</dt><dd>', options.run, '</dd></div>',
        '<div><dt>확인</dt><dd>', options.check, '</dd></div>',
        '<div class="', options.warning ? 'is-warning' : '', '"><dt>판정</dt><dd>', options.result, '</dd></div>',
        '</dl></div>',
        '<figure class="evidence-frame focus-frame', focusClass, '">',
        '<img src="', capture(options.folder, options.file), '" alt="', options.alt, '" style="--zoom:', zoom, '; --focus-x:', x, '%; --focus-y:', y, '%" />',
        '<span class="privacy-mask top-right" aria-hidden="true"></span>',
        '<span class="privacy-mask bottom-left" aria-hidden="true"></span>',
        '</figure></div>',
      ].join(''),
    };
  }

  function promptPart(title, label, text, why, check, minute) {
    return {
      layout: 'content',
      section: 'Prompt',
      title,
      subtitle: why,
      minute,
      footer: '좋은 Prompt 실습 · 편집 가능한 입력문',
      className: 'prompt-part-slide',
      body: [
        '<div class="prompt-part">',
        '<span>', label, '</span>',
        '<blockquote>', text, '</blockquote>',
        '<div><b>확인 질문</b><p>', check, '</p></div>',
        '</div>',
      ].join(''),
    };
  }

  const slides = [];
  const first = '1부 · 0–50분';
  const second = '2부 · 0–50분';

  slides.push(reuse('Gemini & Workspace 실전 통제술'));
  slides.push(reuse('AI를 잘 쓰는 법보다, 통제하는 법', {
    title: '빠른 생성보다 근거와 결정권이 먼저다',
    minute: '1부 · 0–2분',
  }));
  slides.push(lesson('시작', '오늘 직접 완성할 세 가지', '학습 결과', '듣고 끝나는 기능 소개가 아니라 손에 남는 실습을 합니다.', '루브릭 초안, 6줄 통제 계약, 검증 기록을 각각 한 번 완성한다.', '각 결과에 근거 경계와 사람 승인 지점이 표시된다.', '1부 · 2–3분'));
  slides.push(lesson('시작', '실습 데이터의 안전 경계를 먼저 고정한다', '안전 규칙', '실제 학생이 아니라 가상의 과제와 의도적으로 틀린 루브릭만 사용합니다.', '이름·이메일·성적·제출물 대신 제공된 합성 텍스트를 복사한다.', '학생 개인을 식별할 수 있는 정보가 입력창과 캡처에 없다.', '1부 · 3–4분', 'is-warning'));
  slides.push(lesson('시작', '교육용 계정과 개인 계정의 역할이 다르다', '계정 지도', 'Classroom·Classic Gems·Notebook·Studio는 교육용, Labs·Spark는 개인용 시연을 기본으로 합니다.', '현재 로그인한 계정과 열 수 있는 기능을 먼저 표시한다.', '기능이 보이지 않아도 오류로 단정하지 않고 대체 관찰 실습으로 전환한다.', '1부 · 4–5분'));
  slides.push(reuse('100분의 전체 경로', {
    title: '모든 기능에서 같은 통제 순환을 반복한다',
    subtitle: '준비 → 입력 → 생성 → 검증 → 수정 → 사람 승인 순서로 172개의 미세 단계를 진행합니다.',
    minute: '1부 · 5분',
  }));

  slides.push(reuse('Gemini in Classroom', {
    body: baseByTitle.get('Gemini in Classroom').body.replace('수업 안에서 생성하되, 게시와 평가 전에 교사가 멈춰 확인합니다.', 'Classroom 안에서 생성부터 게시 전 승인까지 한 번 직접 따라갑니다.'),
  }));
  slides.push(practice('Classroom', '실습 미션: 16점 분석적 루브릭 만들기', '지역 축제 포스터 기획안을 평가하는 가상 과제입니다.', '네 기준 × 네 수준의 루브릭을 생성한다.', '총점 16점, 관찰 가능한 표현, 게시 전 초안 상태를 확인한다.', '', '1부 · 5–6분'));
  slides.push(screen({
    section: 'Classroom', title: '교육용 Classroom에서 Gemini 도구로 진입', subtitle: '수업 홈이 아니라 Gemini 도구 모음의 위치부터 확인합니다.', minute: '1부 · 6분',
    step: '01 · 진입', action: 'Gemini for Education 열기', summary: '현재 계정이 교사 계정인지 확인한 뒤 Classroom의 Gemini 도구 화면을 엽니다.',
    run: 'Classroom → Gemini 도구', check: '계획·자료·평가 범주가 보이는가?', result: '교육용 Gemini 도구 진입',
    folder: '01-gemini-classroom', file: '01-01_edu_gemini-classroom-entry_20260820.png', alt: '교육용 Classroom Gemini 도구 진입 화면',
  }));
  slides.push(screen({
    section: 'Classroom', title: '평가 범주에서 루브릭 생성 도구를 선택', subtitle: '이번 실습에서 사용할 기능 하나만 선택합니다.', minute: '1부 · 6–7분',
    step: '02 · 선택', action: '루브릭 만들기 선택', summary: '여러 생성 도구 중 평가 업무에 해당하는 루브릭 생성 기능을 찾습니다.',
    run: '평가 범주 확인', check: '과제·퀴즈와 혼동하지 않았는가?', result: '루브릭 입력 화면으로 이동',
    folder: '01-gemini-classroom', file: '01-01_edu_gemini-classroom-entry_20260820.png', alt: 'Classroom Gemini 평가 도구 목록', focused: true, zoom: 1.35, x: 52, y: 56,
  }));
  slides.push(lesson('Classroom', '가상 과제에서 관찰할 정보만 추린다', '03 · 자료', '학년·제출물·평가 기준은 주어졌고 실제 학생 특성은 주어지지 않았습니다.', '제출물 3개와 평가 기준 4개에 밑줄을 긋는다.', '이름·성향·성취도·학교 정책을 새로 가정하지 않는다.', '1부 · 7분'));
  slides.push(screen({
    section: 'Classroom', title: '입력 화면 전체에서 작업 위치를 먼저 찾는다', subtitle: '확대하기 전에 화면의 맥락과 실행 버튼 위치를 확인합니다.', minute: '1부 · 7–8분',
    step: '04 · 화면', action: '입력란과 생성 버튼 찾기', summary: '입력창, 학년·수준 설정, 생성 버튼이 한 화면에서 어떻게 연결되는지 봅니다.',
    run: '입력 화면 전체 확인', check: '어디에 무엇을 넣고 어디서 실행하는가?', result: '작업 동선 확인',
    folder: '01-gemini-classroom', file: '01-02_edu_rubric-input_20260820.png', alt: 'Classroom 루브릭 입력 화면 전체',
  }));
  slides.push(screen({
    section: 'Classroom', title: '입력 1: 과제 맥락과 제출물을 붙여넣는다', subtitle: '모델이 평가 대상을 임의로 상상하지 않도록 과제 원문부터 제공합니다.', minute: '1부 · 8분',
    step: '05 · 입력', action: '과제 설명 입력', summary: '지역 축제 포스터, 2학년, 콘셉트 보드·기획 의도·서체와 색상 근거를 입력합니다.',
    prompt: '특성화고 디자인과 2학년 학생이 지역 축제 홍보 포스터 기획안을 제출한다. 제출물은 콘셉트 보드 1장, 200자 이내 기획 의도, 사용 서체·색상 근거다.',
    run: '가상 과제 원문 붙여넣기', check: '평가할 산출물이 명시됐는가?', result: '과제 경계 입력 완료',
    folder: '01-gemini-classroom', file: '01-02_edu_rubric-input_20260820.png', alt: 'Classroom 루브릭 과제 맥락 입력', focused: true, zoom: 1.65, x: 58, y: 44,
  }));
  slides.push(screen({
    section: 'Classroom', title: '입력 2: 기준·수준·총점을 한 문장에 고정', subtitle: '나중에 결과와 대조할 수 있도록 숫자 조건을 명시합니다.', minute: '1부 · 8–9분',
    step: '06 · 입력', action: '평가 조건 입력', summary: '타깃 적합성·시각적 위계·선택 근거·완성도, 네 수준, 총점 16점을 지정합니다.',
    prompt: '네 기준을 각각 4·3·2·1점의 관찰 가능한 문장으로 쓰고 총점을 16점으로 구성하라. 학생 특성과 학교 정책은 추정하지 마.',
    run: '조건 문장 추가', check: '기준 4개·수준 4개·총점 16점이 모두 있는가?', result: '검증 가능한 성공 조건 확보',
    folder: '01-gemini-classroom', file: '01-02_edu_rubric-input_20260820.png', alt: 'Classroom 루브릭 숫자 조건 입력', focused: true, zoom: 1.72, x: 58, y: 44,
  }));
  slides.push(lesson('Classroom', '생성 전에 세 숫자를 소리 내어 확인한다', '07 · 실행 전', '4개 기준, 4개 수준, 총점 16점이 이후 검증의 기준선입니다.', '옆 사람에게 “4·4·16”을 읽고 추정 금지 문장을 확인한다.', '결과가 달라도 무엇이 어긋났는지 즉시 판정할 수 있다.', '1부 · 9분'));
  slides.push(screen({
    section: 'Classroom', title: '생성 버튼을 누르고 초안을 기다린다', subtitle: '생성은 완료가 아니라 검증할 초안을 얻는 단계입니다.', minute: '1부 · 9분',
    step: '08 · 생성', action: '루브릭 생성 실행', summary: '입력 조건을 유지한 채 생성 버튼을 누르고 표가 나타날 때까지 기다립니다.',
    run: 'Generate rubric', check: '입력 조건이 사라지거나 바뀌지 않았는가?', result: '루브릭 초안 생성',
    folder: '01-gemini-classroom', file: '01-02_edu_rubric-input_20260820.png', alt: 'Classroom 루브릭 생성 직전 화면',
  }));
  slides.push(screen({
    section: 'Classroom', title: '생성 결과를 먼저 전체 화면으로 읽는다', subtitle: '표의 일부보다 기준·열·버튼이 함께 보이는 맥락을 확인합니다.', minute: '1부 · 9–10분',
    step: '09 · 결과', action: '생성된 표 전체 관찰', summary: '수정·내보내기·수업에 추가 동작이 어디에 있는지까지 포함해 결과를 봅니다.',
    run: '생성 결과 전체 화면', check: '기준과 수준의 전체 구조가 보이는가?', result: '검증할 대상과 동선 확보',
    folder: '01-gemini-classroom', file: '01-03_edu_rubric-generated_20260820.png', alt: 'Classroom 생성 루브릭 전체 화면',
  }));
  slides.push(screen({
    section: 'Classroom', title: '검증 1: 요청한 네 평가 기준을 대조한다', subtitle: '표가 예뻐 보여도 기준이 바뀌거나 빠질 수 있습니다.', minute: '1부 · 10분',
    step: '10 · 검증', action: '기준 이름 대조', summary: '타깃 적합성·시각적 위계·선택 근거·완성도가 그대로 있는지 확인합니다.',
    run: '입력 기준과 행 이름 비교', check: '빠지거나 새로 추가된 기준이 있는가?', result: '기준 수는 요청과 일치',
    folder: '01-gemini-classroom', file: '01-03_edu_rubric-generated_20260820.png', alt: '생성 루브릭의 평가 기준', focused: true, zoom: 1.38, x: 57, y: 54,
  }));
  slides.push(screen({
    section: 'Classroom', title: '검증 2: 네 수준과 숫자 배점을 따로 본다', subtitle: '수준 열이 네 개여도 4·3·2·1점이 반영됐다는 뜻은 아닙니다.', minute: '1부 · 10–11분',
    step: '11 · 검증', action: '수준 수와 점수 확인', summary: '열의 개수와 각 열의 숫자 점수를 분리해 확인하고 총점을 계산합니다.',
    run: '수준명·점수·합계 확인', check: '4·3·2·1점과 총점 16점이 보이는가?', result: '숫자 배점 누락', warning: true,
    folder: '01-gemini-classroom', file: '01-03_edu_rubric-generated_20260820.png', alt: '생성 루브릭의 수준과 점수', focused: true, zoom: 1.4, x: 61, y: 52,
  }));
  slides.push(screen({
    section: 'Classroom', title: '검증 3: 관찰하기 어려운 표현을 표시한다', subtitle: '“완벽하게”와 “성실하게”는 학생 산출물에서 직접 관찰하기 어렵습니다.', minute: '1부 · 11–12분',
    step: '12 · 검증', action: '평가 언어 판정', summary: '행동·산출물·조건으로 확인할 수 없는 형용사를 찾아 수정 후보로 표시합니다.',
    run: '수준 문장 읽기', check: '교사 두 명이 같은 장면에서 같은 판단을 할 수 있는가?', result: '어색한 수준명과 모호한 표현 발견', warning: true,
    folder: '01-gemini-classroom', file: '01-04_edu_rubric-verified_20260820.png', alt: 'Classroom 루브릭 검증 화면', focused: true, zoom: 1.44, x: 61, y: 50,
  }));
  slides.push(screen({
    section: 'Classroom', title: '생성 결과를 Sheets로 내보낸다', subtitle: '도구 사이를 이동해도 생성 오류가 자동으로 고쳐지지는 않습니다.', minute: '1부 · 12–13분',
    step: '13 · 내보내기', action: 'Google Sheets 생성', summary: 'Classroom 업로드 형식으로 내보내고 행·열 구조를 확인합니다.',
    run: '수업에 추가 → Sheets 생성', check: '내보내기가 수정과 같은 동작인가?', result: '동일한 초안이 Sheets로 이동',
    folder: '01-gemini-classroom', file: '01-06_edu_rubric-export-sheet_20260820.png', alt: 'Classroom 루브릭을 내보낸 Google Sheets 전체 화면',
  }));
  slides.push(screen({
    section: 'Classroom', title: '내보낸 Sheets에서 숫자 배점을 다시 확인한다', subtitle: '형식이 바뀐 뒤에도 동일한 검증 체크리스트를 반복합니다.', minute: '1부 · 13–14분',
    step: '14 · 재검증', action: '내보낸 표 대조', summary: '수준명, 숫자 점수, 총점이 원래 요청과 맞는지 다시 봅니다.',
    run: 'Sheets 행·열 확인', check: '앞서 찾은 오류가 그대로 남아 있는가?', result: '점수 누락과 수준명 문제가 유지됨', warning: true,
    folder: '01-gemini-classroom', file: '01-06_edu_rubric-export-sheet_20260820.png', alt: 'Google Sheets 루브릭 재검증', focused: true, zoom: 1.32, x: 55, y: 51,
  }));
  slides.push(screen({
    section: 'Classroom', title: '과제 초안 전체를 보고 게시 전에 멈춘다', subtitle: '교사 승인 지점은 작은 버튼이 아니라 과제 전체 맥락입니다.', minute: '1부 · 14–15분',
    step: '15 · 승인', action: '게시 전 초안 확인', summary: '제목·설명·첨부 자료·수업·대상·게시 버튼을 한 화면에서 확인합니다.',
    run: '과제 초안 열기', check: '학생에게 공개되지 않은 저장됨 상태인가?', result: '게시하지 않고 초안으로 종료',
    folder: '01-gemini-classroom', file: '01-05_edu_assignment-draft_20260820.png', alt: '루브릭을 포함한 Classroom 과제 초안 전체 화면',
  }));

  slides.push(reuse('좋은 Prompt'));
  slides.push(screen({
    section: 'Prompt', title: 'Before: 한 줄 요청만 입력한다', subtitle: '비교를 위해 일부러 조건이 부족한 시작점을 만듭니다.', minute: '1부 · 15–16분',
    step: '01 · Before', action: '기본 Prompt 입력', summary: '역할·자료·기준·점수·형식을 주지 않고 한 줄만 입력합니다.',
    prompt: '포스터 과제 루브릭 만들어줘.',
    run: '한 줄 요청 전송', check: '검증할 기준이 입력에 있는가?', result: '모델이 빈칸을 채울 가능성이 큼', warning: true,
    folder: '02-good-prompt', file: '02-01_edu_prompt-basic_20260820.png', alt: '좋은 Prompt 비교용 한 줄 입력 화면', focused: true, zoom: 1.45, x: 57, y: 73,
  }));
  slides.push(screen({
    section: 'Prompt', title: 'Before 결과: 일반적인 기준이 생성된다', subtitle: '그럴듯함과 사용자가 제공한 근거를 분리해서 읽습니다.', minute: '1부 · 16분',
    step: '02 · 결과', action: '한 줄 요청 결과 확인', summary: '내용·시각 구성·주제 전달력·문법 등 모델이 선택한 평가 기준을 봅니다.',
    run: '기본 결과 생성', check: '어떤 기준이 사용자 입력에서 왔는가?', result: '대부분 모델이 임의 구성', warning: true,
    folder: '02-good-prompt', file: '02-01a_edu_prompt-basic-output_20260820.png', alt: '한 줄 프롬프트의 일반적인 루브릭 결과',
  }));
  slides.push(screen({
    section: 'Prompt', title: '사용자가 주지 않은 기준에 표시한다', subtitle: '좋고 나쁨보다 출처를 설명할 수 있는지부터 판단합니다.', minute: '1부 · 16–17분',
    step: '03 · 오류 찾기', action: '모델이 채운 빈칸 표시', summary: '과제 원문 없이 추가된 평가 기준과 세부 수준을 추정으로 분류합니다.',
    run: '결과 문장에 근거 표시', check: '입력 문장으로 되돌아갈 수 있는가?', result: '근거 경계가 없는 출력', warning: true,
    folder: '02-good-prompt', file: '02-01a_edu_prompt-basic-output_20260820.png', alt: '한 줄 프롬프트 결과의 임의 생성 기준', focused: true, zoom: 1.45, x: 63, y: 54,
  }));
  slides.push(lesson('Prompt', '좋은 Prompt는 여섯 개의 검증 지점을 만든다', '04 · 구조', '길게 쓰는 것이 목적이 아니라 결과와 대조할 항목을 분리하는 것이 목적입니다.', '역할·과업·자료·조건·형식·실패 행동의 여섯 칸을 만든다.', '각 칸을 결과에서 Yes/No로 확인할 수 있다.', '1부 · 17분'));
  slides.push(promptPart('작성 1: 역할은 관점만 좁힌다', 'ROLE', '당신은 특성화고 디자인과 수행평가를 설계하는 교사다.', '역할은 권위를 보장하지 않고 답변의 관점을 좁힙니다.', '이 역할이 없어도 되는 전문 지식을 사실처럼 만들게 하지는 않는가?', '1부 · 17–18분'));
  slides.push(promptPart('작성 2: 과업은 하나의 산출물로 쓴다', 'TASK', '지역 축제 홍보 포스터 기획안의 분석적 루브릭을 작성하라.', '한 Prompt에 여러 목표를 넣지 않고 이번 출력 하나를 지정합니다.', '동사와 산출물이 한 문장에 보이는가?', '1부 · 18분'));
  slides.push(promptPart('작성 3: 사용할 맥락과 자료를 지정한다', 'CONTEXT', '2학년 과제이며 제출물은 콘셉트 보드, 기획 의도, 서체·색상 근거다.', '모델이 평가 대상을 임의로 상상하지 않도록 입력 경계를 줍니다.', '학생 특성이나 학교 정책이 자료에 포함돼 있는가?', '1부 · 18–19분'));
  slides.push(promptPart('작성 4: 성공 조건을 숫자로 고정한다', 'CONSTRAINTS', '기준은 4개, 수준은 4·3·2·1점, 총점은 16점이다.', '결과와 대조할 수 있는 수치 조건을 먼저 만듭니다.', '개수·합계·금지 조건을 결과에서 계산할 수 있는가?', '1부 · 19분'));
  slides.push(promptPart('작성 5: 출력 형식을 검증 가능하게 만든다', 'FORMAT', '결과는 기준×수준 표로 쓰고 각 셀은 관찰 가능한 한 문장으로 작성하라.', '형식은 읽기 편의가 아니라 누락을 찾는 점검 틀입니다.', '필수 열과 문장 단위가 명시됐는가?', '1부 · 19–20분'));
  slides.push(promptPart('작성 6: 근거가 없을 때 멈추게 한다', 'FAILURE', '입력 자료에 없는 내용은 만들지 말고 확인 필요라고 표시하라.', '완성해 보이는 답보다 안전한 미완성을 허용합니다.', '모델이 모르는 것을 채우지 않을 행동이 구체적인가?', '1부 · 20분'));
  slides.push(screen({
    section: 'Prompt', title: 'After: 여섯 요소를 하나의 Prompt로 조립', subtitle: '각 문장을 결과 검증 체크리스트와 한 쌍으로 둡니다.', minute: '1부 · 20–21분',
    step: '10 · After 입력', action: '구조화 Prompt 완성', summary: '역할·과업·맥락·조건·형식·실패 행동을 순서대로 붙여넣습니다.',
    run: '구조화 Prompt 입력', check: '여섯 요소가 모두 보이는가?', result: '검증 가능한 작업 명세 완성',
    folder: '02-good-prompt', file: '02-02_edu_prompt-structured_20260820.png', alt: '여섯 요소가 포함된 구조화 프롬프트 입력', focused: true, zoom: 1.36, x: 60, y: 68,
  }));
  slides.push(screen({
    section: 'Prompt', title: '구조화 Prompt를 실행한다', subtitle: 'Before와 같은 모델에서 입력 구조만 바꿔 비교합니다.', minute: '1부 · 21분',
    step: '11 · 실행', action: 'After Prompt 전송', summary: '추가 대화나 후속 힌트 없이 한 번에 생성해 입력 구조의 효과를 봅니다.',
    run: '구조화 Prompt 전송', check: '비교 조건이 Before와 같은가?', result: 'After 결과 생성',
    folder: '02-good-prompt', file: '02-02_edu_prompt-structured_20260820.png', alt: '구조화 프롬프트 실행 화면',
  }));
  slides.push(screen({
    section: 'Prompt', title: 'After 결과: 지정한 표와 배점이 보인다', subtitle: '형식 준수와 사실성은 서로 다른 검증 항목입니다.', minute: '1부 · 21–22분',
    step: '12 · 결과', action: '구조화 출력 확인', summary: '네 기준, 네 수준, 숫자 점수, 표 형식이 요청대로 생성됐는지 봅니다.',
    run: 'After 결과 전체 확인', check: '요청한 형식이 실제로 지켜졌는가?', result: '형식 준수도 향상',
    folder: '02-good-prompt', file: '02-02a_edu_prompt-structured-output_20260820.png', alt: '구조화 프롬프트의 표 결과',
  }));
  slides.push(lesson('Prompt', 'Before와 After를 세 항목으로만 비교한다', '13 · 비교', '결과 길이나 문체가 아니라 기준·배점·근거 경계를 비교합니다.', 'Before/After 표에 기준 고정, 점수 고정, 추정 표시 여부를 기록한다.', '“더 좋아 보임” 대신 세 항목의 차이를 말할 수 있다.', '1부 · 22–23분'));
  slides.push(screen({
    section: 'Prompt', title: 'After 결과에도 근거 없는 추정이 남는지 찾는다', subtitle: 'Prompt가 좋아져도 사실성을 자동 보장하지는 않습니다.', minute: '1부 · 23분',
    step: '14 · 검증', action: '추정 문장 표시', summary: '입력에 없던 레이아웃 스케치·그래픽 모티프·학습 완료 상태 등을 찾습니다.',
    run: '결과와 입력 원문 대조', check: '입력에서 직접 찾을 수 없는 내용이 있는가?', result: '형식 개선 뒤에도 추정이 남음', warning: true,
    folder: '02-good-prompt', file: '02-02a_edu_prompt-structured-output_20260820.png', alt: '구조화 출력의 근거 없는 추정 문장', focused: true, zoom: 1.45, x: 63, y: 54,
  }));
  slides.push(promptPart('추정을 숨기지 않는 실패 문장을 추가한다', 'REVISE', '근거가 부족한 셀은 임의로 완성하지 말고 확인 필요라고 쓰고, 필요한 추가 자료를 한 줄로 제안하라.', '실패 행동은 결과를 멈추는 것에서 다음 확인 행동까지 이어집니다.', '확인 필요가 빈칸이 아니라 교사의 다음 행동으로 연결되는가?', '1부 · 23–24분'));
  slides.push(practice('Prompt', '참가자 실습: 반복 업무를 여섯 줄로 다시 쓴다', '자주 부탁하는 업무 하나를 선택합니다.', '역할·과업·자료·조건·형식·실패 행동을 각 한 줄로 작성한다.', '숫자나 필수 항목 하나와 “확인 필요” 실패 문장이 들어간다.', '', '1부 · 24–25분'));
  slides.push(practice('Prompt', '짝 검토: 빠진 Prompt 요소 하나를 찾는다', '답을 고치는 것이 아니라 작업 명세의 빈칸을 찾습니다.', '옆 사람의 여섯 줄을 읽고 결과에서 확인할 수 없는 문장 하나를 표시한다.', '수정할 한 줄과 그 이유를 서로 설명한다.', '혼자라면 자신의 문장마다 “결과에서 어떻게 확인하지?”를 붙인다.', '1부 · 25분'));

  slides.push(reuse('Harness'));
  slides.push(lesson('Harness', 'Harness는 Google 기능명이 아니라 통제 프레임이다', '01 · 용어', 'Prompt를 둘러싼 입력·제약·출력·실패·검증 조건 전체를 이 연수에서 Harness라고 부릅니다.', '기능 메뉴를 찾지 말고 여섯 계약을 한 장에 모은다.', '도구가 바뀌어도 같은 계약을 다시 사용할 수 있다.', '1부 · 25–26분'));
  slides.push(lesson('Harness', '통제할 반복 업무 하나를 고른다', '02 · 작업', '모든 업무를 자동화하려 하지 않고 오류 비용이 큰 한 가지를 선택합니다.', '루브릭 검토, 안내문 초안, 자료 요약 중 하나를 고른다.', '입력과 최종 승인자가 분명한 업무다.', '1부 · 26분'));
  slides.push(promptPart('목표 계약: 무엇을 결정하기 위한가', 'GOAL', '아래 과제 설명을 근거로 16점 분석적 루브릭 초안을 만든다.', '목표는 생성 행위가 아니라 교사가 내릴 다음 결정으로 씁니다.', '이 출력으로 무엇을 검토하거나 결정할지 보이는가?', '1부 · 26–27분'));
  slides.push(promptPart('입력 계약: 사용할 자료를 닫는다', 'INPUT', '제공된 과제 설명과 네 가지 평가 기준만 사용한다.', '자료 경계 밖으로 나가는 순간 추정 가능성이 커집니다.', '허용 자료와 제외 자료가 구분됐는가?', '1부 · 27분'));
  slides.push(promptPart('금지 계약: 만들면 안 되는 것을 적는다', 'PROHIBIT', '학생 특성·학교 정책·교육과정·점수를 추정하지 않는다.', '금지 문장은 민감한 빈칸을 모델이 자동 완성하지 못하게 합니다.', '업무에서 가장 위험한 추정 두 가지가 적혀 있는가?', '1부 · 27–28분'));
  slides.push(promptPart('출력 계약: 누락을 발견할 표를 만든다', 'OUTPUT', '기준×4수준 표, 각 셀 35자 이내, 마지막에 확인 필요 항목 목록.', '출력 계약은 보기 좋게 꾸미는 지시가 아니라 점검 항목입니다.', '필수 열·분량·마지막 목록이 명확한가?', '1부 · 28분'));
  slides.push(promptPart('실패 계약: 부족하면 안전하게 멈춘다', 'FAIL', '근거가 부족하면 임의로 채우지 말고 확인 필요라고 표시한다.', '실패를 허용하지 않으면 모델은 완성된 모양을 우선할 수 있습니다.', '모르는 상태가 결과에 보이도록 지정했는가?', '1부 · 28–29분'));
  slides.push(promptPart('검증 계약: 결과가 스스로 점검표를 남긴다', 'VERIFY', '총점 16점, 네 기준, 근거 없는 가정, 관찰 가능성, 출력 길이를 자체 점검하라.', '자체 점검은 사람 검증을 대체하지 않고 확인 순서를 줄여 줍니다.', '교사가 다시 계산할 항목이 목록으로 남는가?', '1부 · 29분'));
  slides.push(screen({
    section: 'Harness', title: '여섯 계약을 한 번에 붙여넣는다', subtitle: '분리해서 만든 문장을 하나의 실행 가능한 Harness로 조립합니다.', minute: '1부 · 29–30분',
    step: '09 · 완성', action: 'Harness 템플릿 입력', summary: '목표·입력·금지·출력·실패·검증의 순서를 유지해 붙여넣습니다.',
    run: '합성 과제 아래에 Harness 입력', check: '여섯 제목이 빠짐없이 있는가?', result: '통제된 실행 준비 완료',
    folder: '03-harness', file: '03-01_edu_harness-template_20260820.png', alt: '여섯 계약으로 구성된 Harness 입력 화면', focused: true, zoom: 1.32, x: 50, y: 51,
  }));
  slides.push(screen({
    section: 'Harness', title: '합성 과제와 Harness를 함께 실행한다', subtitle: '추가 힌트 없이 정상 경로와 실패 경로를 한 번에 확인합니다.', minute: '1부 · 30분',
    step: '10 · 실행', action: 'Harness 전송', summary: '입력 범위 밖의 정보가 필요한 셀을 모델이 어떻게 처리하는지 관찰합니다.',
    run: '전체 템플릿 전송', check: '결과가 나올 때까지 계약이 그대로 유지되는가?', result: '정상·실패 행동이 포함된 출력 생성',
    folder: '03-harness', file: '03-01_edu_harness-template_20260820.png', alt: 'Harness 실행 직전 화면',
  }));
  slides.push(screen({
    section: 'Harness', title: '정상 결과: 계약된 표 구조부터 확인한다', subtitle: '내용 평가 전에 출력 계약 준수 여부를 먼저 봅니다.', minute: '1부 · 30–31분',
    step: '11 · 정상 결과', action: '표와 점검표 확인', summary: '네 기준×네 수준, 총점, 확인 필요 목록, 자체 점검표가 있는지 봅니다.',
    run: 'Harness 결과 전체 확인', check: '필수 구조가 모두 생성됐는가?', result: '출력 계약 준수',
    folder: '03-harness', file: '03-02_edu_harness-output_20260820.png', alt: 'Harness 조건을 따른 출력 전체 화면',
  }));
  slides.push(screen({
    section: 'Harness', title: '출력 계약을 항목별로 체크한다', subtitle: '표가 있다는 사실과 계약을 지켰다는 판정을 구분합니다.', minute: '1부 · 31–32분',
    step: '12 · 검증', action: '형식 체크리스트 실행', summary: '기준 수, 수준 수, 점수 합계, 셀 길이, 마지막 목록을 순서대로 확인합니다.',
    run: '필수 구조 5개 대조', check: '누락된 열이나 목록이 있는가?', result: '구조는 계약과 일치',
    folder: '03-harness', file: '03-02_edu_harness-output_20260820.png', alt: 'Harness 출력 계약 점검 화면', focused: true, zoom: 1.34, x: 59, y: 51,
  }));
  slides.push(lesson('Harness', '결과 문장을 입력 자료의 문장과 연결한다', '13 · 근거', '형식이 맞아도 내용이 입력 자료에서 왔는지는 별도 확인해야 합니다.', '결과의 각 기준 옆에 과제 원문의 근거 구절을 적는다.', '직접 연결되지 않는 문장은 추정 또는 확인 필요로 이동한다.', '1부 · 32–33분'));
  slides.push(screen({
    section: 'Harness', title: '실패 결과: 근거 없는 중간 수준을 완성하지 않는다', subtitle: '안전하게 멈춘 답이 통제 실패가 아니라 계약 준수입니다.', minute: '1부 · 33–34분',
    step: '14 · 실패 결과', action: '확인 필요 표시 확인', summary: '타깃 정의·감점 기준·완성도 정의처럼 자료에 없는 내용을 목록으로 남깁니다.',
    run: '결측 항목 확인', check: '임의 문장 대신 확인 필요가 보이는가?', result: '근거 없는 완성을 중단',
    folder: '03-harness', file: '03-03_edu_harness-failure-check_20260820.png', alt: '근거 부족 정보를 확인 필요로 남긴 결과', focused: true, zoom: 1.38, x: 61, y: 54,
  }));
  slides.push(lesson('Harness', '확인 필요 목록을 교사의 다음 행동으로 바꾼다', '15 · 전환', '빈칸을 모델에게 다시 맡기기보다 필요한 자료나 결정을 지정합니다.', '각 확인 필요 항목 옆에 자료 요청·교사 결정·삭제 중 하나를 적는다.', '모든 결측에 사람의 다음 행동이 연결된다.', '1부 · 34–35분'));
  slides.push(practice('Harness', '참가자 실습: 자신의 Prompt를 여섯 줄 계약으로 바꾼다', '앞서 만든 구조화 Prompt를 그대로 사용합니다.', '목표·자료·금지·출력·실패·검증을 한 줄씩 추가한다.', '결과에서 계산할 숫자 하나와 사람이 승인할 지점 하나가 있다.', '', '1부 · 35–36분'));
  slides.push(practice('Harness', '교차 테스트: 일부러 빠진 정보로 실패 행동을 확인한다', '좋은 입력만으로는 Harness의 실패 경계를 시험할 수 없습니다.', '짝의 Harness에서 필수 정보 하나를 뺀 합성 입력을 실행하거나 예상 결과를 적는다.', '모델이 추정하지 않고 확인 필요로 멈추는 조건을 찾는다.', '실행할 수 없다면 어떤 문장이 추정될지 서로 예측하고 계약을 고친다.', '1부 · 36–37분'));

  slides.push(reuse('Verification Loop'));
  slides.push(lesson('Loop', 'Verification Loop도 Google 기능명이 아닌 통제 프레임이다', '01 · 용어', '같은 모델에게 다시 묻는 것만으로 끝내지 않고 원자료와 사람 판정을 반드시 포함합니다.', '초안·비판·사람 확인·수정의 네 칸을 만든다.', '세 번째 칸에 AI가 아닌 사람이 직접 확인하는 행동이 있다.', '1부 · 37–38분'));
  slides.push(lesson('Loop', '첫 결과를 최종본이 아니라 Draft로 선언한다', '02 · Draft', '문장이 매끄럽다는 이유로 사용 가능한 결과라고 판정하지 않습니다.', '결과 상단에 “검증 전 초안”이라고 적고 수정 전 버전을 보존한다.', '나중에 무엇이 제거되고 유지됐는지 비교할 수 있다.', '1부 · 38분'));
  slides.push(screen({
    section: 'Loop', title: 'Draft 전체와 확인 필요 구간을 보존한다', subtitle: '수정하기 전에 원래 오류와 불확실성을 한 화면에 남깁니다.', minute: '1부 · 38–39분',
    step: '03 · Draft', action: '초안 상태 고정', summary: 'Harness 1차 결과의 표와 확인 필요 항목을 그대로 저장합니다.',
    run: '첫 결과 캡처 또는 복사', check: '수정 전 문장과 결측 표시가 모두 남았는가?', result: '비교 기준선 확보',
    folder: '04-verification-loop', file: '04-01_edu_loop-draft_20260820.png', alt: 'Verification Loop의 수정 전 초안 전체 화면',
  }));
  slides.push(screen({
    section: 'Loop', title: 'Critique 입력: 주장·근거·불확실성·누락을 분리', subtitle: '바로 고치지 말고 무엇이 문제인지 먼저 이름 붙입니다.', minute: '1부 · 39–40분',
    step: '04 · Critique 입력', action: '감사 요청 작성', summary: '각 평가 기준을 검증 가능·모호함·근거 부족으로 분류하고 이유를 표로 요청합니다.',
    prompt: '방금 만든 결과를 바로 수정하지 말고 먼저 감사하라. 각 주장 또는 평가 기준을 검증 가능 / 모호함 / 근거 부족으로 분류하고 이유를 표로 제시하라.',
    run: 'Critique Prompt 전송', check: '수정 요청보다 분류 요청이 먼저인가?', result: '검증 목록 생성 준비',
    folder: '04-verification-loop', file: '04-02_edu_loop-critique_20260820.png', alt: 'Verification Loop 비판 요청과 결과 화면',
  }));
  slides.push(screen({
    section: 'Loop', title: 'Critique 결과: 세 상태로 분류된 표를 읽는다', subtitle: '같은 모델의 자기비판은 사람 확인 위치를 찾는 보조 장치입니다.', minute: '1부 · 40–41분',
    step: '05 · Critique 결과', action: '위험도 분류 확인', summary: '선택 근거는 검증 가능, 타깃과 위계는 모호함, 완성도는 근거 부족으로 분류됐습니다.',
    run: '분류 표 전체 확인', check: '각 상태에 이유가 붙어 있는가?', result: '사람이 확인할 우선순위 확보',
    folder: '04-verification-loop', file: '04-02_edu_loop-critique_20260820.png', alt: '검증 가능 모호함 근거 부족 분류 표',
  }));
  slides.push(lesson('Loop', '가장 위험한 모호한 주장 하나를 고른다', '06 · 선택', '모든 문장을 동시에 확인하지 않고 평가 결과를 크게 바꿀 한 문장을 먼저 봅니다.', '모호함 또는 근거 부족 중 점수에 영향이 큰 항목 하나를 표시한다.', '왜 이 주장을 먼저 확인하는지 설명할 수 있다.', '1부 · 41–42분'));
  slides.push(screen({
    section: 'Loop', title: '사람 체크리스트: 모호한 주장을 확인 질문으로 바꾼다', subtitle: 'AI의 판정을 원자료에서 확인할 수 있는 질문으로 번역합니다.', minute: '1부 · 42–43분',
    step: '07 · Human check', action: '교사 확인 질문 생성', summary: '타깃 정의, 위계 측정 대상, 제출 형식 배점, 중간 점수 기준을 질문으로 만듭니다.',
    run: '확인 목록 작성', check: '원문에서 Yes/No 또는 위치로 답할 수 있는가?', result: '사람 검증 체크리스트 완성',
    folder: '04-verification-loop', file: '04-03_edu_loop-human-checklist_20260820.png', alt: '교사용 Verification Loop 확인 체크리스트', focused: true, zoom: 1.75, x: 63, y: 53,
  }));
  slides.push(lesson('Loop', 'AI 화면을 벗어나 과제 원문을 다시 연다', '08 · 원자료', '검증은 다른 Prompt가 아니라 기준이 되는 원자료로 돌아가는 행동입니다.', '과제 설명·루브릭 기준 문서·수업 계획 중 기준 문서를 연다.', 'AI 답변을 보지 않고도 사실 여부를 확인할 자료가 있다.', '1부 · 43분'));
  slides.push(lesson('Loop', '대조 1: 제출물과 평가 기준의 존재를 확인한다', '09 · 대조', '원문에 직접 쓰인 항목과 모델이 확장한 항목을 분리합니다.', '결과의 제출물·기준 옆에 원문 구절 또는 문단 위치를 적는다.', '근거 위치가 없는 항목이 눈에 띄게 표시된다.', '1부 · 43–44분'));
  slides.push(lesson('Loop', '대조 2: 배점·기한·학년의 부재도 확인한다', '10 · 대조', '없는 정보는 찾지 못한 것이 아니라 “원문에 없음”이라는 중요한 판정입니다.', '총점·기한·학년을 원문에서 찾아보고 없으면 명시 없음으로 기록한다.', '부재를 모델의 추정으로 채우지 않는다.', '1부 · 44–45분'));
  slides.push(lesson('Loop', '교사가 네 상태로 최종 판정한다', '11 · 판정', 'AI의 분류를 그대로 따르지 않고 실제 수업 사용 여부를 결정합니다.', '각 문장을 유지·수정·삭제·확인 필요 중 하나로 표시한다.', '모든 문장에 사람의 판정이 하나씩 붙는다.', '1부 · 45–46분'));
  slides.push(screen({
    section: 'Loop', title: 'Revised 입력: 확인된 내용만 남기도록 요청', subtitle: '사람이 내린 판정을 다시 모델의 수정 경계로 사용합니다.', minute: '1부 · 46분',
    step: '12 · Revised 입력', action: '수정 요청 작성', summary: '입력 자료에서 직접 확인된 내용만 유지하고 나머지는 삭제하거나 확인 필요로 남깁니다.',
    prompt: '입력 자료에서 직접 확인되는 내용만 남겨 수정본을 작성하라. 확인되지 않은 내용은 삭제하거나 확인 필요로 유지하라.',
    run: '사람 판정과 수정 요청 전송', check: '새로운 사실을 추가하라는 문장이 없는가?', result: '근거 기반 수정 실행',
    folder: '04-verification-loop', file: '04-04_edu_loop-revised_20260820.png', alt: 'Verification Loop 수정 요청과 수정 결과',
  }));
  slides.push(screen({
    section: 'Loop', title: 'Revised 결과: 근거 없는 단정이 제거됐는지 확인', subtitle: '수정본도 다시 읽어야 Loop가 닫힙니다.', minute: '1부 · 46–47분',
    step: '13 · Revised 결과', action: '수정본 검증', summary: '서체·색상 근거의 존재 여부만 남고 근거가 없는 수준은 확인 필요로 돌아갔는지 봅니다.',
    run: '수정 결과 전체 확인', check: 'Critique에서 표시한 위험 문장이 남아 있는가?', result: '확인된 내용만 유지',
    folder: '04-verification-loop', file: '04-04_edu_loop-revised_20260820.png', alt: 'Verification Loop 검증 후 수정된 결과',
  }));
  slides.push(lesson('Loop', '초안과 수정본에서 제거된 문장을 비교한다', '14 · 전후', 'Loop의 성과는 문장 수가 아니라 근거 없는 확신이 줄었는지로 판단합니다.', 'Draft와 Revised에서 유지·삭제·확인 필요로 바뀐 문장을 색으로 표시한다.', '변경 이유가 원자료 또는 교사 판정과 연결된다.', '1부 · 47–48분'));
  slides.push(practice('Loop', '참가자 실습: 자신의 결과에 4단계 Loop를 한 번 수행', '앞서 만든 Harness 결과 중 한 문장을 선택합니다.', 'Draft 보존 → Critique → 원자료 대조 → Revised 순서로 실행한다.', '최소 한 문장의 상태가 유지·수정·삭제·확인 필요 중 하나로 판정된다.', '', '1부 · 48–49분'));
  slides.push(lesson('1부 정리', 'Prompt는 빈칸을 줄이고, Harness는 경계를 세우고, Loop는 근거로 되돌린다', '1부 정리', '세 기법은 서로 경쟁하는 방법이 아니라 같은 결과를 단계적으로 좁히는 순서입니다.', '자신의 실습에서 가장 효과가 컸던 한 단계를 표시한다.', '왜 그 단계가 오류를 줄였는지 한 문장으로 말할 수 있다.', '1부 · 49–50분'));
  slides.push(reuse('10분 휴식', {
    body: '<div class="break-grid"><strong>10</strong><h1>잠깐 쉬었다가, 반복 가능한 시스템으로</h1><p>2부 실습 준비: 교육용 계정은 Classic Gems·Notebook·Studio, 개인 계정은 New Gems·Spark</p></div>',
  }));

  slides.push(reuse('Classic Gems'));
  slides.push(lesson('Classic Gems', '매번 같은 방식으로 검토할 업무를 고른다', '01 · 업무', 'Gem은 한 번의 답보다 반복되는 역할·순서·출력 규칙을 저장할 때 유용합니다.', '루브릭 점검, 안내문 점검, 자료 요약 중 반복 업무 하나를 고른다.', '매번 같은 지침을 다시 붙여넣던 업무다.', '2부 · 0–1분'));
  slides.push(screen({
    section: 'Classic Gems', title: '교육용 계정에서 새 Gem 만들기로 진입', subtitle: '이름·설명·지침·지식·미리보기 영역의 전체 구조를 먼저 봅니다.', minute: '2부 · 1분',
    step: '02 · 진입', action: 'Gem 관리자 열기', summary: '교육 계정의 Gem 관리자에서 새 Gem을 선택합니다.',
    run: 'Gemini → Gem 관리자 → 새 Gem', check: '내 Gems 영역과 편집 화면이 보이는가?', result: '새 Gem 편집 화면 진입',
    folder: '05-classic-gems', file: '05-01_edu_classic-gems-entry_20260820.png', alt: '교육용 계정 Classic Gems 새 Gem 진입 화면',
  }));
  slides.push(lesson('Classic Gems', '다시 찾을 수 있는 이름과 설명을 쓴다', '03 · 이름', '기능명보다 목적·대상·연수용 여부가 드러나는 이름이 안전합니다.', '이름을 “수행평가 루브릭 점검관 (연수용)”으로 입력한다.', '실제 운영용과 연수용 Gem을 이름만 보고 구분할 수 있다.', '2부 · 1–2분'));
  slides.push(screen({
    section: 'Classic Gems', title: '지침 1: 역할과 비교할 입력 자료를 지정', subtitle: 'Gem이 무엇을 알고 있다고 가정할지 먼저 제한합니다.', minute: '2부 · 2분',
    step: '04 · 지침', action: '역할·입력 경계 작성', summary: '특성화고 수행평가 루브릭 검토자이며 사용자가 제공한 과제와 루브릭만 비교하도록 씁니다.',
    run: '지침 첫 문단 입력', check: '외부 교육과정이나 학생 정보를 사용하지 않는가?', result: '입력 경계 고정',
    folder: '05-classic-gems', file: '05-02_edu_classic-gems-instructions_20260820.png', alt: 'Classic Gem 역할과 입력 경계 지침', focused: true, zoom: 1.55, x: 38, y: 49,
  }));
  slides.push(screen({
    section: 'Classic Gems', title: '지침 2: 누락·모호성·배점 오류의 점검 순서를 지정', subtitle: '매번 같은 순서로 보는 것이 반복 가능한 검토의 핵심입니다.', minute: '2부 · 2–3분',
    step: '05 · 지침', action: '검토 절차 작성', summary: '누락 조건, 관찰 불가능한 표현, 배점 오류, 교사 확인 항목 순으로 출력하게 합니다.',
    run: '지침 두 번째 문단 입력', check: '결과의 네 구역이 명확한가?', result: '검토 순서 고정',
    folder: '05-classic-gems', file: '05-02_edu_classic-gems-instructions_20260820.png', alt: 'Classic Gem 점검 순서 지침', focused: true, zoom: 1.65, x: 39, y: 56,
  }));
  slides.push(screen({
    section: 'Classic Gems', title: '지침 3: 교사 확인 항목과 실패 행동을 지정', subtitle: 'Gem이 자동 수정자가 아니라 검토 조교로 남도록 역할을 제한합니다.', minute: '2부 · 3분',
    step: '06 · 지침', action: '금지·실패 규칙 작성', summary: '학생 성향·학교 정책을 추정하지 않고 근거가 없으면 확인 필요로 표시하게 합니다.',
    run: '지침 마지막 문단 입력', check: '교사가 최종 결정할 항목이 결과에 남는가?', result: '자동 결정 방지',
    folder: '05-classic-gems', file: '05-02_edu_classic-gems-instructions_20260820.png', alt: 'Classic Gem 금지와 실패 처리 지침', focused: true, zoom: 1.6, x: 39, y: 63,
  }));
  slides.push(lesson('Classic Gems', '고정 지식은 필요할 때만 추가한다', '07 · 지식', '매번 바뀌는 과제 원문을 지식으로 넣으면 오래된 기준을 재사용할 수 있습니다.', '학교 공통 기준처럼 변하지 않는 문서와 과제별 입력을 구분한다.', '이번 합성 과제는 Preview 입력으로 두고 지식에는 넣지 않는다.', '2부 · 3–4분'));
  slides.push(screen({
    section: 'Classic Gems', title: 'Preview 입력: 의도적으로 오류가 있는 루브릭을 넣는다', subtitle: '저장 전에 Gem이 실패를 찾을 수 있는지 시험합니다.', minute: '2부 · 4분',
    step: '08 · Preview 입력', action: '합성 오류 입력', summary: '제출물 3개인 과제와 창의성·성실성 10점씩인 불완전 루브릭을 비교하게 합니다.',
    prompt: '과제는 콘셉트 보드와 기획 의도, 서체·색상 근거를 제출하게 되어 있어. 루브릭은 창의성 10점, 성실성 10점으로만 구성되어 있어. 문제를 점검해 줘.',
    run: '미리보기 입력란 작성', check: '누락·모호성·점수 오류가 의도적으로 포함됐는가?', result: '실패 검증용 입력 준비',
    folder: '05-classic-gems', file: '05-03_edu_classic-gems-preview_20260820.png', alt: 'Classic Gem 미리보기의 합성 오류 루브릭 입력',
  }));
  slides.push(lesson('Classic Gems', '저장하기 전에 Preview를 실행한다', '09 · 실행', 'Gem의 지침은 저장 버튼을 누르기 전에 합성 입력으로 검증합니다.', '미리보기 전송 버튼을 누르고 결과가 끝날 때까지 기다린다.', '실제 학생 자료 없이 지침의 동작을 확인한다.', '2부 · 4–5분'));
  slides.push(screen({
    section: 'Classic Gems', title: 'Preview 결과 1: 누락 조건과 모호한 표현을 찾는다', subtitle: '입력과 결과를 같은 화면에서 대조합니다.', minute: '2부 · 5분',
    step: '10 · 결과', action: '누락·모호성 확인', summary: '콘셉트 보드·기획 의도·서체와 색상 근거의 누락과 창의성·성실성의 관찰 불가능성을 봅니다.',
    run: '미리보기 결과 읽기', check: '두 오류 유형이 별도 항목으로 나뉘었는가?', result: '누락·모호성 탐지',
    folder: '05-classic-gems', file: '05-03_edu_classic-gems-preview_20260820.png', alt: 'Classic Gem 미리보기 누락과 모호성 결과', focused: true, zoom: 1.5, x: 69, y: 58,
  }));
  slides.push(screen({
    section: 'Classic Gems', title: 'Preview 결과 2: 배점 오류와 교사 결정을 확인한다', subtitle: '자동 수정 대신 교사가 결정할 항목이 남아야 합니다.', minute: '2부 · 5–6분',
    step: '11 · 결과', action: '배점·결정 항목 확인', summary: '점수 척도 부재와 세부 기준 부족을 찾아 교사 확인 항목으로 돌려보냈는지 봅니다.',
    run: '결과 아래쪽 확인', check: '새 배점을 사실처럼 만들어 넣었는가?', result: '배점 문제와 사람 결정 분리',
    folder: '05-classic-gems', file: '05-03_edu_classic-gems-preview_20260820.png', alt: 'Classic Gem 미리보기 배점 오류와 교사 결정 결과', focused: true, zoom: 1.55, x: 69, y: 71,
  }));
  slides.push(lesson('Classic Gems', '놓친 오류를 기준으로 지침을 보강한다', '12 · 수정', '좋은 Gem은 한 번에 완성하는 것이 아니라 실패 입력으로 지침을 다듬습니다.', '놓친 오류가 있다면 점검 순서 또는 출력 계약 한 줄을 추가한다.', '수정 이유가 실제 미리보기 실패와 연결된다.', '2부 · 6분'));
  slides.push(practice('Classic Gems', '같은 합성 입력으로 수정 전후를 재시험한다', '입력을 바꾸지 않아야 지침 수정의 효과를 비교할 수 있습니다.', '같은 Preview 입력을 다시 실행하고 누락된 결과가 추가됐는지 확인한다.', '수정한 지침 한 줄이 결과의 한 구역을 바꾼다.', '기능이 없다면 화면의 결과를 보고 어떤 지침을 보강할지 적는다.', '2부 · 6–7분'));
  slides.push(screen({
    section: 'Classic Gems', title: '검증한 Gem을 저장하고 공유 전에 멈춘다', subtitle: '저장 성공과 조직 공유는 서로 다른 승인 지점입니다.', minute: '2부 · 7분',
    step: '14 · 저장', action: 'Gem 저장 확인', summary: 'Gem이 생성됐다는 대화상자를 확인하고 공유는 실행하지 않습니다.',
    run: '저장 → 생성 확인', check: '연수용 이름과 비공개 상태를 확인했는가?', result: '개인 재사용 준비, 공유 보류',
    folder: '05-classic-gems', file: '05-04_edu_classic-gems-saved_20260820.png', alt: 'Classic Gem 저장 성공 대화상자',
  }));

  slides.push(reuse('Gemini Notebook'));
  slides.push(lesson('Notebook', '근거 문서가 있을 때는 일반 대화보다 Notebook을 선택한다', '01 · 판단', '답변보다 소스와 인용을 중심에 둘 업무에 적합합니다.', '과제 원문·규정·회의 기록처럼 기준 문서가 있는 업무를 고른다.', '답변마다 원문 위치를 확인해야 하는 업무다.', '2부 · 7–8분'));
  slides.push(screen({
    section: 'Notebook', title: 'Classroom 자료에서 Gemini Notebook 추가를 선택', subtitle: '수업과 연결된 Notebook을 만드는 시작 지점을 확인합니다.', minute: '2부 · 8분',
    step: '02 · 진입', action: 'Notebook 추가 열기', summary: 'Classroom 자료 작성 화면에서 수업을 선택하고 Gemini Notebook 추가를 엽니다.',
    run: '자료 만들기 → Gemini Notebook 추가', check: '새로 만들기와 기존 자료 선택이 보이는가?', result: 'Notebook 생성 경로 진입',
    folder: '06-gemini-notebook', file: '06-01_edu_notebook-entry_20260820.png', alt: 'Classroom에서 Gemini Notebook 추가 화면',
  }));
  slides.push(lesson('Notebook', '새 Notebook과 기존 Notebook을 구분한다', '03 · 생성', '이번 실습은 합성 원문만 들어 있는 새 Notebook을 만듭니다.', '새 Notebook 만들기를 선택하고 연수용 제목을 지정한다.', '다른 수업의 기존 자료를 잘못 연결하지 않는다.', '2부 · 8–9분'));
  slides.push(lesson('Notebook', '소스로 넣을 합성 과제 원문을 먼저 읽는다', '04 · 소스 준비', 'Notebook도 잘못된 원문을 넣으면 잘못된 근거를 충실히 요약합니다.', '제출물 3개·평가 항목 5개·총점과 기한 부재를 미리 표시한다.', '나중에 답변을 판정할 기준선이 준비된다.', '2부 · 9분'));
  slides.push(screen({
    section: 'Notebook', title: '복사된 텍스트로 합성 원문을 소스에 추가', subtitle: '실제 학생 파일 대신 제공된 연수용 텍스트만 사용합니다.', minute: '2부 · 9–10분',
    step: '05 · 소스', action: '원문 추가', summary: '가상 데이터 고지와 과제 개요·제출물·평가 항목·검증 원칙을 그대로 입력합니다.',
    run: '소스 추가 → 복사된 텍스트', check: '원문이 요약되거나 바뀌지 않았는가?', result: '근거 자료 경계 생성',
    folder: '06-gemini-notebook', file: '06-02_edu_notebook-source_20260820.png', alt: 'NotebookLM에 복사된 텍스트 소스를 추가한 화면',
  }));
  slides.push(lesson('Notebook', '소스 제목·분량·가상 데이터 고지를 확인한다', '06 · 소스 확인', '질문하기 전에 기준 자료가 올바르게 들어갔는지 확인합니다.', '소스 패널에서 제목과 문서 첫 문장을 읽는다.', '실제 학생 정보가 없고 연수용 가상 자료임이 보인다.', '2부 · 10분'));
  slides.push(promptPart('질문은 소스 안과 밖을 함께 묻는다', 'QUESTION', '제출물 세 가지와 평가 항목 다섯 가지를 표로 정리하고 각 항목에 인용을 표시하라. 총점이나 기한이 없으면 명시 없음이라고 써라.', '있는 정보만 묻으면 모델의 실패 행동을 확인할 수 없습니다.', '소스에 있는 정보와 없는 정보가 한 질문에 함께 있는가?', '2부 · 10–11분'));
  slides.push(screen({
    section: 'Notebook', title: '제출물·평가 항목·총점·기한 질문을 입력', subtitle: '인용과 명시 없음 조건을 질문에 직접 포함합니다.', minute: '2부 · 11분',
    step: '08 · 질문', action: '소스 한정 질문 전송', summary: '답변 형식과 인용, 없는 정보의 처리 방식을 함께 지정합니다.',
    prompt: '이 과제의 제출물 세 가지와 평가 항목 다섯 가지를 표로 정리해 줘. 각 항목마다 인용을 표시해. 총점이나 제출 기한이 없다면 명시 없음이라고 써 줘.',
    run: 'Notebook 채팅에 질문 입력', check: '질문이 선택된 소스만을 대상으로 하는가?', result: '근거 Q&A 실행',
    folder: '06-gemini-notebook', file: '06-03_edu_notebook-question_20260820.png', alt: 'NotebookLM 소스 한정 질문 입력 화면', focused: true, zoom: 1.45, x: 58, y: 73,
  }));
  slides.push(screen({
    section: 'Notebook', title: '답변 전체에서 표와 인라인 인용을 확인', subtitle: '먼저 답변 구조와 인용 번호가 함께 있는지 봅니다.', minute: '2부 · 11–12분',
    step: '09 · 답변', action: '소스 기반 결과 읽기', summary: '제출물과 평가 항목이 표로 정리되고 각 행에 인용 번호가 붙었는지 확인합니다.',
    run: '답변 전체 확인', check: '모든 핵심 항목에 인용이 있는가?', result: '표와 인라인 인용 생성',
    folder: '06-gemini-notebook', file: '06-03a_edu_notebook-answer_20260820.png', alt: 'NotebookLM의 표 답변과 인라인 인용 전체',
  }));
  slides.push(screen({
    section: 'Notebook', title: '검증 1: 제출물 세 개와 평가 항목 다섯 개를 대조', subtitle: '요약이 정확한지 개수와 명칭부터 확인합니다.', minute: '2부 · 12–13분',
    step: '10 · 검증', action: '원문 항목 수 대조', summary: '콘셉트 보드·기획 의도·서체와 색상 근거 및 다섯 평가 항목이 일치하는지 봅니다.',
    run: '답변 표와 원문 체크리스트 비교', check: '누락 또는 합쳐진 항목이 있는가?', result: '원문 항목과 일치',
    folder: '06-gemini-notebook', file: '06-03a_edu_notebook-answer_20260820.png', alt: 'NotebookLM 답변의 제출물과 평가 항목', focused: true, zoom: 1.42, x: 57, y: 48,
  }));
  slides.push(screen({
    section: 'Notebook', title: '검증 2: 없는 총점과 기한이 명시 없음인지 확인', subtitle: '근거가 없는 정보의 처리 방식이 Notebook 실습의 핵심입니다.', minute: '2부 · 13분',
    step: '11 · 검증', action: '부재 정보 판정', summary: '총점과 제출 기한을 임의로 채우지 않고 명시 없음으로 답했는지 봅니다.',
    run: '답변 아래쪽 확인', check: '숫자나 날짜가 새로 만들어졌는가?', result: '없는 정보는 명시 없음',
    folder: '06-gemini-notebook', file: '06-03a_edu_notebook-answer_20260820.png', alt: 'NotebookLM 답변의 명시 없음 처리', focused: true, zoom: 1.5, x: 57, y: 68,
  }));
  slides.push(screen({
    section: 'Notebook', title: '인용 번호를 클릭해 원문으로 이동', subtitle: '인용이 있다는 표시만 믿지 않고 실제 연결을 엽니다.', minute: '2부 · 13–14분',
    step: '12 · Citation', action: '인용 세부정보 열기', summary: '답변의 첫 번째 인용 번호를 눌러 오른쪽 원문 패널을 엽니다.',
    run: '인라인 인용 클릭', check: '해당 소스의 구체적인 문장이 열리는가?', result: '답변에서 원문으로 이동',
    folder: '06-gemini-notebook', file: '06-04_edu_notebook-citation_20260820.png', alt: 'NotebookLM 인용 번호를 클릭한 원문 패널',
  }));
  slides.push(screen({
    section: 'Notebook', title: '인용 원문이 답변 문장을 실제로 지지하는지 대조', subtitle: '키워드가 비슷한 것과 주장을 뒷받침하는 것은 다릅니다.', minute: '2부 · 14–15분',
    step: '13 · 원문 대조', action: '답변·원문 한 문장 비교', summary: '과제 개요와 평가 원칙의 원문 구절이 답변의 의미와 일치하는지 확인합니다.',
    run: '답변 문장과 인용 세부정보 읽기', check: '원문이 답변의 범위 전체를 지지하는가?', result: '인용 대응 확인',
    folder: '06-gemini-notebook', file: '06-04_edu_notebook-citation_20260820.png', alt: 'NotebookLM 답변과 인용 원문 대조 화면', focused: true, zoom: 1.38, x: 75, y: 52,
  }));
  slides.push(screen({
    section: 'Notebook', title: 'Artifact를 만들기 전에 맞춤 설정을 연다', subtitle: '가능한 산출물을 바로 생성하지 않고 범위와 금지 조건을 먼저 넣습니다.', minute: '2부 · 15분',
    step: '14 · 맞춤 설정', action: '마인드맵 설정 열기', summary: '스튜디오에서 마인드맵 맞춤 설정 대화상자를 엽니다.',
    run: '마인드맵 옵션 → 맞춤 설정', check: '사용자 요구를 입력할 수 있는 화면인가?', result: '산출물 통제 입력 준비',
    folder: '06-gemini-notebook', file: '06-05a_edu_notebook-artifact-settings_20260820.png', alt: 'NotebookLM 마인드맵 맞춤 설정 화면',
  }));
  slides.push(screen({
    section: 'Notebook', title: '맞춤 조건에 포함 구조와 금지 정보를 함께 입력', subtitle: '무엇을 넣을지와 무엇을 추가하지 않을지를 한 쌍으로 작성합니다.', minute: '2부 · 15–16분',
    step: '15 · 맞춤 입력', action: '마인드맵 요구사항 작성', summary: '과제 개요·제출물·평가 항목·교사 검증 원칙만 포함하고 총점·기한은 추가하지 못하게 합니다.',
    prompt: '과제 개요, 제출물 세 가지, 평가 항목 다섯 가지, 교사 검증 원칙을 중심으로 구성해 줘. 원문에 없는 총점이나 기한은 추가하지 마.',
    run: '맞춤 조건 입력', check: '포함 구조와 금지 조건이 모두 있는가?', result: '통제된 산출물 생성 준비',
    folder: '06-gemini-notebook', file: '06-05a_edu_notebook-artifact-settings_20260820.png', alt: 'NotebookLM 마인드맵 맞춤 조건 입력', focused: true, zoom: 1.34, x: 50, y: 52,
  }));
  slides.push(screen({
    section: 'Notebook', title: '맞춤 조건으로 마인드맵을 생성', subtitle: '소스의 내용을 다른 구조로 재배치하는 단계입니다.', minute: '2부 · 16분',
    step: '16 · Artifact', action: '마인드맵 생성', summary: '설정한 네 영역을 중심으로 마인드맵을 생성하고 전체 구조를 엽니다.',
    run: '생성 → 마인드맵 열기', check: '요구한 중심 가지가 보이는가?', result: '맞춤 마인드맵 생성',
    folder: '06-gemini-notebook', file: '06-05_edu_notebook-artifact_20260820.png', alt: 'NotebookLM 맞춤 마인드맵 전체 화면',
  }));
  slides.push(screen({
    section: 'Notebook', title: '마인드맵의 각 가지를 다시 소스 범위와 대조', subtitle: '시각화도 새 사실이 아니라 소스의 재구성으로 읽습니다.', minute: '2부 · 16–17분',
    step: '17 · Artifact 검증', action: '가지별 근거 확인', summary: '과제 개요·제출물·평가 항목·검증 원칙 외에 총점이나 기한이 추가됐는지 봅니다.',
    run: '마인드맵 전체 탐색', check: '소스에 없는 가지가 생겼는가?', result: '맞춤 범위 안에서 구성',
    folder: '06-gemini-notebook', file: '06-05_edu_notebook-artifact_20260820.png', alt: 'NotebookLM 마인드맵 가지 검증 화면', focused: true, zoom: 1.22, x: 52, y: 52,
  }));
  slides.push(screen({
    section: 'Notebook', title: 'Notebook을 Classroom 자료 초안에 연결', subtitle: '도구 사이를 이동해도 게시 승인은 별도입니다.', minute: '2부 · 17분',
    step: '18 · 연결', action: 'Classroom 초안 첨부', summary: 'Notebook이 첨부된 자료 초안 전체를 확인하고 게시 버튼을 누르지 않습니다.',
    run: 'Classroom으로 돌아가기', check: '저장됨 상태와 별도 게시 버튼이 보이는가?', result: '학생 배포 전 초안 유지',
    folder: '06-gemini-notebook', file: '06-06_edu_notebook-classroom-draft_20260820.png', alt: 'Notebook이 첨부된 Classroom 자료 초안 전체 화면',
  }));
  slides.push(practice('Notebook', '참가자 실습: 짧은 원문에서 질문→인용→대조를 실행', '제공된 합성 과제 원문을 사용합니다.', '원문에 있는 두 정보와 없는 한 정보를 질문하고 인용 하나를 연다.', '없는 정보는 명시 없음이며 인용 원문이 답변을 실제 지지한다.', 'Notebook이 없다면 제공된 답변과 인용 화면에서 같은 판정을 기록한다.', '2부 · 17–18분'));
