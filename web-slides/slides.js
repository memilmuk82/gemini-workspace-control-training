(() => {
  'use strict';

  const captureRoot = '../captures';
  const capture = (folder, file) => `${captureRoot}/${folder}/${file}`;

  function focusFrame(folder, file, alt, _caption, zoom = 1, x = 50, y = 50, focused = false) {
    const focusClass = focused ? ' is-focused' : '';
    return `
      <figure class="evidence-frame focus-frame${focusClass}">
        <img
          src="${capture(folder, file)}"
          alt="${alt}"
          style="--zoom:${zoom}; --focus-x:${x}%; --focus-y:${y}%"
        />
        <span class="privacy-mask top-right" aria-hidden="true"></span>
        <span class="privacy-mask bottom-left" aria-hidden="true"></span>
      </figure>
    `;
  }

  function processSlide({
    section,
    title,
    subtitle,
    minute,
    footer,
    step,
    action,
    summary,
    run,
    check,
    result,
    folder,
    file,
    alt,
    caption,
    zoom,
    x,
    y,
    focused = false,
    prompt,
    warning = false,
  }) {
    return {
      layout: 'content',
      section,
      title,
      subtitle,
      minute,
      footer,
      body: `
        <div class="focus-layout">
          <div class="process-panel ${prompt ? 'has-prompt' : ''}">
            <span class="process-kicker">${step}</span>
            <h2>${action}</h2>
            <p>${summary}</p>
            ${prompt ? `<blockquote class="prompt-preview"><strong>입력 프롬프트</strong><p>${prompt}</p></blockquote>` : ''}
            <dl class="process-facts">
              <div><dt>실행</dt><dd>${run}</dd></div>
              <div><dt>확인</dt><dd>${check}</dd></div>
              <div class="${warning ? 'is-warning' : ''}"><dt>결과</dt><dd>${result}</dd></div>
            </dl>
          </div>
          ${focusFrame(folder, file, alt, caption, zoom, x, y, focused)}
        </div>
      `,
    };
  }

  function sectionSlide(index, title, description, proof) {
    return {
      layout: 'section',
      section: title,
      title,
      body: `
        <div class="section-hero">
          <span class="section-index">SECTION ${String(index).padStart(2, '0')}</span>
          <h1>${title}</h1>
          <p>${description}</p>
          <div class="section-proof">${proof}</div>
        </div>
      `,
    };
  }

  window.TRAINING_SLIDES = [
    {
      layout: 'cover',
      section: '표지',
      title: 'Gemini & Workspace 실전 통제술',
      body: `
        <div class="cover-grid">
          <h1 class="cover-title">Gemini &amp; Workspace<em>실전 통제술</em></h1>
          <p class="cover-subtitle">특성화고 교사를 위한 <strong>근거 중심 AI 업무 설계</strong></p>
          <aside class="cover-principles">
            <h2>오늘의 통제 원칙</h2>
            <ol>
              <li><b>01</b><span>입력자료의 경계를 먼저 정한다</span></li>
              <li><b>02</b><span>생성물보다 근거를 확인한다</span></li>
              <li><b>03</b><span>게시·평가는 사람이 결정한다</span></li>
            </ol>
          </aside>
          <div class="route-strip" aria-label="교육 흐름">
            ${['Classroom', 'Prompt', 'Harness', 'Verification Loop', 'Classic Gems', 'Notebook', 'Studio', 'New Gems', 'Spark / Skills']
              .map((label, index) => `<span class="route-node ${[2, 3].includes(index) ? 'is-control' : ''}"><i>${index + 1}</i>${label}</span>`)
              .join('')}
          </div>
          <div class="cover-timing">1부 50분 · 휴식 10분 · 2부 50분</div>
        </div>
      `,
    },
    {
      layout: 'content', section: '시작', title: 'AI를 잘 쓰는 법보다, 통제하는 법', subtitle: '빠른 생성보다 근거가 남는 반복 가능한 업무를 만듭니다.', minute: '1부 · 0–4분',
      body: `<div class="goal-grid"><div class="big-statement"><strong>생성은 AI가,<br /><em>결정은 교사가.</em></strong><p>관리자 설정은 다루지 않습니다. 실제 학생 개인정보와 실제 평가 데이터도 사용하지 않습니다.</p></div><ol class="goal-list"><li><b>1</b><div><h3>공식 문서로 시작</h3><p>기능의 약속과 계정 조건을 확인합니다.</p></div><span class="status-mark">기준</span></li><li><b>2</b><div><h3>실제 UI로 검증</h3><p>단계별 화면과 실행 결과를 남깁니다.</p></div><span class="status-mark">증거</span></li><li><b>3</b><div><h3>사람이 최종 결정</h3><p>근거·누락·추정을 확인한 뒤 사용합니다.</p></div><span class="status-mark is-warning">책임</span></li></ol></div>`,
    },
    {
      layout: 'content', section: '시작', title: '100분의 전체 경로', subtitle: '도구가 바뀌어도 Harness와 Verification Loop는 공통 통제 프레임으로 남습니다.', minute: '1부 · 4–7분',
      body: `<div class="route-overview">${[
        ['01', 'Classroom', '수업 맥락에서 초안 만들기', ''], ['02', '좋은 Prompt', '작업 명세로 빈칸 줄이기', ''], ['03', 'Harness', '입력·출력·실패 경계 고정', 'is-framework'], ['04', 'Verification Loop', '비판·사람 확인·수정', 'is-framework'], ['05', 'Classic Gems', '반복 지침 저장', ''], ['06', 'Notebook', '소스와 인용 확인', ''], ['07', 'Studio', '단계·변수·테스트', ''], ['08', 'New Gems', '다단계 워크플로 실험', ''], ['09', 'Spark / Skills', '절차를 Skill로 재사용', ''],
      ].map(([step, title, text, className]) => `<article data-step="${step}" class="${className}"><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>`,
    },

    sectionSlide(1, 'Gemini in Classroom', '수업 안에서 생성하되, 게시와 평가 전에 교사가 멈춰 확인합니다.', '가상 과제·가상 루브릭만 사용했습니다.'),
    processSlide({ section: 'Classroom', title: '입력: 평가 조건을 관찰 가능한 문장으로', subtitle: '과제 맥락·기준·수준 수·점수 체계를 한 번에 지정합니다.', minute: '1부 · 7–10분', footer: 'Google Classroom Help · 교육용 계정', step: '01 · 입력', action: '루브릭 조건을 구체화', summary: '“좋은 포스터” 대신 수업에서 실제로 관찰할 수 있는 평가 항목을 적습니다.', run: '지역축제 포스터 · 4개 기준 · 4수준 · 16점', check: '기준이 학생 산출물에서 관찰 가능한가?', result: '생성 전에 평가 구조가 고정됨', folder: '01-gemini-classroom', file: '01-02_edu_rubric-input_20260820.png', alt: 'Classroom 루브릭 조건 입력 화면', caption: '', focused: true, zoom: 1.72, x: 58, y: 44 }),
    processSlide({ section: 'Classroom', title: '생성: 표가 만들어져도 완료가 아니다', subtitle: '생성된 구조를 요청 조건과 바로 대조합니다.', minute: '1부 · 10–12분', footer: '실제 UI · 생성 직후', step: '02 · 생성', action: '생성 결과의 구조 확인', summary: '표의 모양보다 요청한 기준·수준·점수가 실제로 들어갔는지 봅니다.', prompt: '“타깃 적합성·시각적 위계·선택 근거·완성도를 4·3·2·1점 문장으로 쓰고 총점을 16점으로 구성하라.”', run: 'Gemini가 루브릭 초안 생성', check: '기준 4개, 수준 4개, 숫자 점수 존재 여부', result: '숫자 점수가 누락됨', warning: true, folder: '01-gemini-classroom', file: '01-03_edu_rubric-generated_20260820.png', alt: 'Gemini가 생성한 Classroom 루브릭', caption: '', focused: true, zoom: 1.4, x: 58, y: 54 }),
    processSlide({ section: 'Classroom', title: '검증: 수준명·점수·관찰 가능성을 판정', subtitle: 'AI가 만든 평가 언어를 교사의 평가 언어로 다시 읽습니다.', minute: '1부 · 12–15분', footer: '실제 UI 차이 · 수정 필요', step: '03 · 검증', action: '요청과 결과를 대조', summary: '번역된 수준명과 점수 체계가 수업에서 바로 사용할 수 있는지 판정합니다.', prompt: '“4개 기준 · 4수준 · 총점 16점 · 추정 금지”', run: '생성된 각 열과 기준을 확인', check: '수준명 자연스러움 · 총점 · 관찰 가능 문장', result: '수준명 어색함 + 점수 누락', warning: true, folder: '01-gemini-classroom', file: '01-04_edu_rubric-verified_20260820.png', alt: 'Classroom 루브릭 검증 화면', caption: '', focused: true, zoom: 1.44, x: 61, y: 50 }),
    processSlide({ section: 'Classroom', title: '결과: 게시하지 않고 초안으로 멈춘다', subtitle: '생성물은 게시물이 아니라 편집 가능한 초안입니다.', minute: '1부 · 15–17분', footer: '초안 저장 · 실제 게시 안 함', step: '04 · 결과', action: '게시 전 전체 화면 확인', summary: '제목·설명·연결 자료·수업·할당 대상과 게시 버튼을 한 화면에서 확인합니다.', run: '과제 초안에 루브릭 연결', check: '학생에게 공개되기 전 수정 가능한 상태인가?', result: '저장됨 상태로 유지하고 게시하지 않음', folder: '01-gemini-classroom', file: '01-05_edu_assignment-draft_20260820.png', alt: '루브릭을 포함한 Classroom 과제 초안 전체 화면', caption: '' }),

    sectionSlide(2, '좋은 Prompt', '한 줄 부탁을 역할·자료·과업·조건·출력 형식이 있는 작업 명세로 바꿉니다.', '좋은 Prompt도 사실성을 보장하지는 않습니다.'),
    processSlide({ section: 'Prompt', title: '한 줄 부탁의 결과: 빈칸을 AI가 채운다', subtitle: '조건이 없으면 그럴듯한 일반 기준이 자동으로 만들어집니다.', minute: '1부 · 17–20분', footer: 'Google Workspace Prompt Guide', step: '01 · 기본 Prompt', action: '임의 생성 지점 찾기', summary: '짧은 요청은 빠르지만 어떤 자료와 기준을 사용했는지 검증하기 어렵습니다.', prompt: '“포스터 과제 루브릭 만들어줘.”', run: '조건 없이 한 문장만 입력', check: '사용자가 주지 않은 맥락과 기준이 있는가?', result: '모델이 제공되지 않은 평가 기준을 임의로 구성함', warning: true, folder: '02-good-prompt', file: '02-01a_edu_prompt-basic-output_20260820.png', alt: '짧은 프롬프트로 생성된 루브릭 결과', caption: '', focused: true, zoom: 1.45, x: 63, y: 54 }),
    processSlide({ section: 'Prompt', title: '구조화 입력: 역할·과업·조건·형식을 고정', subtitle: '긴 글이 아니라 검증할 항목이 분리된 명세를 작성합니다.', minute: '1부 · 20–23분', footer: 'Google Docs Help · Prompt tips', step: '02 · 구조화', action: 'Prompt의 빈칸 줄이기', summary: '총점과 수준 수, 기준, 출력 형식, 추정 표시 원칙을 함께 넣습니다.', run: '역할 + 수업 맥락 + 평가 조건 + 표 형식 입력', check: '누가·무엇을·무슨 근거로·어떤 형식까지?', result: '작업 범위가 명시적으로 좁아짐', folder: '02-good-prompt', file: '02-02_edu_prompt-structured_20260820.png', alt: '구조화 프롬프트 입력 화면', caption: '', focused: true, zoom: 1.36, x: 60, y: 68 }),
    processSlide({ section: 'Prompt', title: '구조화 출력: 준수도는 높아져도 검증은 남는다', subtitle: '요청 형식은 더 잘 따르지만 제공되지 않은 사실은 여전히 확인해야 합니다.', minute: '1부 · 23–25분', footer: 'Prompt 입력/출력 실제 비교', step: '03 · 출력', action: '형식 준수와 사실성을 분리', summary: '구조가 좋아졌다는 이유로 내용까지 맞다고 판단하지 않습니다.', prompt: '“4개 기준을 4·3·2·1점의 관찰 가능한 문장으로 쓰고, 추정은 별도로 표시하라.”', run: '구조화 Prompt 결과 생성', check: '형식 준수 / 사실 근거 / 추정 내용을 따로 확인', result: '형식 개선, 사실성은 별도 검증 필요', warning: true, folder: '02-good-prompt', file: '02-02a_edu_prompt-structured-output_20260820.png', alt: '구조화 프롬프트의 출력 화면', caption: '', focused: true, zoom: 1.45, x: 63, y: 54 }),

    {
      layout: 'content', section: 'Prompt', title: '반복되는 개인 설정은 ‘Gemini 요청사항’으로', subtitle: '답변 방식처럼 일반 대화에 반복되는 선호를 개인 계정에서 한 번만 지정합니다.', minute: '1부 · 23–25분', footer: 'Google Gemini Help · Instructions for Gemini',
      body: `<div class="instruction-map"><article class="instruction-primary"><span>개인 계정 · 공통 응답 선호</span><h2>Gemini 요청사항</h2><p>예: “한국어로 답하고, 결론을 먼저 제시한 뒤 근거와 확인 필요 항목을 구분해 줘.”</p><ul><li>개인 Google 계정에서 사용</li><li>직장·학교 계정과 Gems 등 일부 기능에는 적용되지 않음</li></ul></article><div class="instruction-choices"><article><b>요청사항</b><strong>자주 반복되는 답변 방식</strong><p>말투·구조·기본 선호처럼 일반 대화에 공통으로 적용할 내용</p></article><article><b>Gem</b><strong>특정 역할과 반복 업무</strong><p>루브릭 점검관처럼 목적·자료·금지·출력 규칙을 묶은 도구</p></article><article><b>Skill</b><strong>여러 단계의 실행 절차</strong><p>Spark에서 호출할 점검 순서와 결과 계약</p></article></div></div>`,
    },

    sectionSlide(3, 'Harness', '프롬프트를 둘러싼 입력·제약·출력·실패 처리까지 작업 환경으로 설계합니다.', '<b>연수의 통제 프레임</b>이며 Google 공식 기능명이 아닙니다.'),
    processSlide({ section: 'Harness', title: '입력 계약: 사용할 자료와 실패 행동을 함께 지정', subtitle: '“없으면 만들지 말 것”까지 써야 안전한 작업 경계가 됩니다.', minute: '1부 · 25–29분', footer: 'Harness · 입력부터 검증까지 작업 조건 설계', step: '01 · 계약', action: 'AI가 움직일 울타리 만들기', summary: '입력자료, 금지, 출력 형식, 검증, 실패 처리를 하나의 계약으로 묶습니다.', run: '제공 자료만 사용 · 추정 금지 · 표 형식 고정', check: '근거가 없을 때 멈추는 문장이 있는가?', result: '없으면 “확인 필요”로 표시', folder: '03-harness', file: '03-01_edu_harness-template_20260820.png', alt: 'Harness 템플릿 입력 화면', caption: '', focused: true, zoom: 1.32, x: 50, y: 51 }),
    processSlide({ section: 'Harness', title: '정상 경로: 계약된 형식과 근거로 출력', subtitle: '무엇을 썼는지와 무엇이 비어 있는지가 함께 보여야 합니다.', minute: '1부 · 29–33분', footer: '실제 Gemini 출력 검증', step: '02 · 정상 출력', action: '출력 계약 준수 확인', summary: '표의 열과 근거 표시, 확인 필요 목록이 요청대로 생성됐는지 봅니다.', prompt: '“제공된 과제 설명과 네 기준만 사용하고, 근거가 부족하면 ‘확인 필요’로 표시하라.”', run: '입력 계약과 합성 과제 설명을 함께 실행', check: '필수 열 · 근거 · 누락 목록', result: '구조와 누락 표시를 함께 출력', folder: '03-harness', file: '03-02_edu_harness-output_20260820.png', alt: 'Harness 조건을 따른 Gemini 출력', caption: '', focused: true, zoom: 1.34, x: 59, y: 51 }),
    processSlide({ section: 'Harness', title: '실패 경로: 근거 없는 정보는 만들지 않는다', subtitle: '완성해 보이는 답보다 안전하게 멈춘 답이 더 유용할 수 있습니다.', minute: '1부 · 33–36분', footer: '확인 필요 · 교사 결정', step: '03 · 실패 처리', action: '모르는 것을 남겨두기', summary: '학년·기한·제출 방식처럼 제공되지 않은 항목을 사실처럼 만들지 않습니다.', prompt: '“근거가 부족하면 임의로 채우지 말고 ‘확인 필요’라고 표시한다.”', run: '결측 항목과 자체 점검표까지 출력', check: '추정으로 채웠는가, 확인 항목으로 남겼는가?', result: '“확인 필요”로 안전하게 중단', folder: '03-harness', file: '03-03_edu_harness-failure-check_20260820.png', alt: '근거 없는 정보를 확인 필요로 표시한 화면', caption: '', focused: true, zoom: 1.38, x: 61, y: 54 }),

    sectionSlide(4, 'Verification Loop', '초안 → 비판 → 사람 확인 → 수정의 네 단계로 결과를 근거에 묶습니다.', '<b>연수의 통제 프레임</b>이며 Google 공식 기능명이 아닙니다.'),
    processSlide({ section: 'Loop', title: '1단계: 초안은 검증 대상이다', subtitle: '문장이 매끄럽다는 이유로 사실이라고 판단하지 않습니다.', minute: '1부 · 36–39분', footer: 'Verification Loop · Draft', step: '01 · Draft', action: '첫 결과를 초안으로 선언', summary: '최초 생성물에 최종본이라는 지위를 주지 않고 검증 대상으로 둡니다.', prompt: '앞의 Harness 입력 계약과 합성 과제 설명', run: '합성 과제 분석 초안 생성', check: '주장마다 근거가 보이는가?', result: '근거 표시가 부족한 초안', warning: true, folder: '04-verification-loop', file: '04-01_edu_loop-draft_20260820.png', alt: 'Verification Loop의 첫 초안', caption: '' }),
    processSlide({ section: 'Loop', title: '2단계: 주장을 사실·추정·누락으로 분류', subtitle: '같은 모델의 자기비판은 사람의 확인 지점을 찾는 보조 장치입니다.', minute: '1부 · 39–43분', footer: 'Verification Loop · Critique', step: '02 · Critique', action: '초안의 약점을 드러내기', summary: '주장, 근거, 불확실성, 빠진 정보를 분리해 다시 출력시킵니다.', prompt: '“각 주장과 평가 기준을 검증 가능 / 모호함 / 근거 부족으로 분류하고 이유를 표로 제시하라.”', run: '초안을 비판적으로 재검토', check: '추정과 누락이 명시적으로 표시됐는가?', result: '사람이 볼 확인 목록 생성', folder: '04-verification-loop', file: '04-02_edu_loop-critique_20260820.png', alt: '초안을 비판적으로 분류한 화면', caption: '' }),
    processSlide({ section: 'Loop', title: '3단계: 사람이 원자료와 직접 대조', subtitle: 'AI의 검토 결과를 그대로 믿지 않고 실제 자료로 확인합니다.', minute: '1부 · 43–47분', footer: 'Google Gemini Help · 응답 검증', step: '03 · Human check', action: '교사 체크리스트 실행', summary: '출처, 점수 합계, 과제 조건, 누락을 원자료와 직접 비교합니다.', run: '확인 항목을 교사용 체크리스트로 변환', check: '근거 문서에서 실제로 확인했는가?', result: '수정할 항목과 유지할 항목 판정', folder: '04-verification-loop', file: '04-03_edu_loop-human-checklist_20260820.png', alt: '교사용 검증 체크리스트', caption: '사람 확인 체크리스트 확대', zoom: 1.86, x: 63, y: 53 }),
    processSlide({ section: 'Loop', title: '4단계: 확인된 내용만 남겨 수정', subtitle: '근거가 없는 내용은 삭제하거나 확인 필요 상태로 유지합니다.', minute: '1부 · 47–50분', footer: 'Verification Loop · Revised', step: '04 · Revised', action: '근거 있는 버전으로 수정', summary: '사람이 확인한 판정을 반영해 실제 사용할 수 있는 결과로 정리합니다.', prompt: '“입력 자료에서 직접 확인되는 내용만 남겨 수정본을 작성하라.”', run: '확인 결과를 반영한 수정 요청', check: '근거 없는 단정이 남아 있는가?', result: '확인된 내용만 유지한 수정본', folder: '04-verification-loop', file: '04-04_edu_loop-revised_20260820.png', alt: '검증 후 수정된 결과', caption: '' }),
    { layout: 'break', section: '휴식', title: '10분 휴식', body: `<div class="break-grid"><strong>10</strong><h1>잠깐 쉬었다가, 반복 가능한 시스템으로</h1><p>2부: Classic Gems → Notebook → Studio → New Gems → Spark / Skills</p></div>` },

    sectionSlide(5, 'Classic Gems', '반복 역할·금지·출력·검증 규칙을 Gem의 지속 지침으로 저장합니다.', '미리보기에서 실패를 찾고 공유 전에 고칩니다.'),
    processSlide({ section: 'Classic Gems', title: '지침: 반복되는 통제 규칙을 저장', subtitle: '매번 긴 Prompt를 붙여 넣지 않고 검증한 작업 규칙을 재사용합니다.', minute: '2부 · 0–2분', footer: 'Gemini Apps Help · Create & use Gems', step: '01 · 지침', action: '지속 지침 작성', summary: '역할, 추정 금지, 출력 구조, 누락 처리 규칙을 Gem에 넣습니다.', run: '루브릭 근거 점검용 Gem 지침 입력', check: '반복해도 같은 통제 구조가 유지되는가?', result: '재사용 가능한 검토 도구 초안', folder: '05-classic-gems', file: '05-02_edu_classic-gems-instructions_20260820.png', alt: 'Classic Gem 지침 작성 화면', caption: '', focused: true, zoom: 1.35, x: 37, y: 52 }),
    processSlide({ section: 'Classic Gems', title: '미리보기 입력: 오류가 있는 합성 루브릭', subtitle: '저장 전에 테스트할 입력을 먼저 확인합니다.', minute: '2부 · 2–4분', footer: '교육용 계정 · Preview 입력', step: '02 · 입력', action: '의도적인 오류 투입', summary: '제출물은 세 가지인데 루브릭은 창의성·성실성 두 항목뿐인 가상 사례입니다.', prompt: '“과제는 콘셉트 보드와 기획 의도, 서체·색상 근거를 제출하게 되어 있어. 그런데 루브릭은 창의성 10점, 성실성 10점으로만 구성되어 있어. 문제를 점검해 줘.”', run: '합성 루브릭을 미리보기 입력란에 붙여 넣기', check: '실제 학생·성적·평가 자료가 없는가?', result: '검증용 입력 준비 완료', folder: '05-classic-gems', file: '05-03_edu_classic-gems-preview_20260820.png', alt: 'Classic Gem 미리보기의 합성 루브릭 입력', caption: '', focused: true, zoom: 1.46, x: 75, y: 23 }),
    processSlide({ section: 'Classic Gems', title: '미리보기 결과: 저장 전에 실패를 찾는다', subtitle: '입력 뒤 응답에서 지침이 의도대로 작동하는지 확인합니다.', minute: '2부 · 4–6분', footer: '교육용 계정 · Preview 결과', step: '03 · 결과', action: '예제로 지침 검증', summary: '누락 기준, 관찰할 수 없는 표현, 점수 구조 문제를 구분했는지 봅니다.', prompt: '앞 슬라이드의 불완전한 합성 루브릭', run: 'Gem 응답을 아래로 펼쳐 판정 항목 확인', check: '누락·모호성·점수 문제를 각각 구분했는가?', result: '세 오류와 교사 확인 항목을 분리함', folder: '05-classic-gems', file: '05-03_edu_classic-gems-preview_20260820.png', alt: 'Classic Gem 미리보기의 루브릭 점검 결과', caption: '', focused: true, zoom: 1.38, x: 75, y: 61 }),
    processSlide({ section: 'Classic Gems', title: '저장: 검증한 지침을 비공개로 재사용', subtitle: '저장은 곧 공유가 아닙니다. 공개 범위는 별도로 결정합니다.', minute: '2부 · 6–7분', footer: '저장 완료 · 공유 안 함', step: '04 · 저장', action: '검증된 버전 고정', summary: '미리보기에서 확인한 지침을 저장하고 다른 사람에게 공개하지 않습니다.', run: 'Classic Gem 저장', check: '이름·지침·공개 범위가 의도와 같은가?', result: '교육용 계정에 비공개 Gem 저장', folder: '05-classic-gems', file: '05-04_edu_classic-gems-saved_20260820.png', alt: '저장된 Classic Gem 전체 화면', caption: '' }),

    sectionSlide(6, 'Gemini Notebook', '자료를 먼저 넣고 답변의 인용을 눌러 원문으로 돌아갑니다.', '그럴듯한 답보다 출처 연결 여부를 평가합니다.'),
    processSlide({ section: 'Notebook', title: 'Source: 답변 전에 자료 경계를 만든다', subtitle: '연수용 합성 문서만 소스로 넣어 사용할 근거를 제한합니다.', minute: '2부 · 7–8분', footer: 'NotebookLM Help · Add sources', step: '01 · Source', action: '근거 자료 추가', summary: '질문보다 먼저 Notebook이 참고할 수 있는 자료의 범위를 정합니다.', run: '합성 포스터 평가 안내 문서 추가', check: '실제 학생 정보나 불필요한 파일이 없는가?', result: '하나의 안전한 소스만 연결', folder: '06-gemini-notebook', file: '06-02_edu_notebook-source_20260820.png', alt: 'Notebook에 소스를 추가한 전체 화면', caption: '' }),
    processSlide({ section: 'Notebook', title: 'Question: 소스 안과 밖을 함께 묻는다', subtitle: '답변 전에 실제로 입력한 질문과 결측 처리 조건을 확인합니다.', minute: '2부 · 8–10분', footer: 'NotebookLM · grounded Q&A 입력', step: '02 · Question', action: '질문의 근거 범위 고정', summary: '제출물·평가 항목은 찾고, 소스에 없는 총점과 기한은 만들지 않도록 요청합니다.', prompt: '“제출물 세 가지와 평가 항목 다섯 가지를 표로 정리해 줘. 각 항목마다 인용을 표시하고, 총점이나 제출 기한이 없다면 ‘명시 없음’이라고 써 줘.”', run: '소스 기반 질문 입력', check: '인용과 결측 처리 조건이 함께 있는가?', result: '생성 전 검증 기준 확보', folder: '06-gemini-notebook', file: '06-03_edu_notebook-question_20260820.png', alt: 'NotebookLM 소스 기반 질문 입력 화면', caption: '', focused: true, zoom: 1.34, x: 52, y: 70 }),
    processSlide({ section: 'Notebook', title: 'Answer: 소스에 없는 정보는 “명시 없음”', subtitle: '모르는 것을 채우지 않는 답변이 근거 중심 답변입니다.', minute: '2부 · 10–12분', footer: 'NotebookLM · 소스 기반 응답', step: '03 · Answer', action: '근거 질문 실행', summary: '총점과 마감처럼 소스에 있는 정보와 없는 정보를 나눠 확인합니다.', prompt: '앞 슬라이드의 소스 한정 질문', run: '표 답변과 인라인 인용 확인', check: '답변마다 인용 번호가 있는가?', result: '없는 총점·마감은 “명시 없음”', folder: '06-gemini-notebook', file: '06-03a_edu_notebook-answer_20260820.png', alt: 'Notebook의 소스 기반 답변', caption: '', focused: true, zoom: 1.42, x: 57, y: 55 }),
    processSlide({ section: 'Notebook', title: 'Citation: 번호를 눌러 원문 문장까지 확인', subtitle: '인용의 존재가 아니라 답변과 원문의 실제 대응을 봅니다.', minute: '2부 · 12–14분', footer: 'NotebookLM · Citation', step: '04 · Citation', action: '답변에서 원문으로 이동', summary: '인용 번호를 클릭해 어떤 소스 구절을 근거로 썼는지 확인합니다.', run: '답변의 인용 번호 클릭', check: '열린 원문이 해당 주장과 일치하는가?', result: '답변과 원문 구절 대응 확인', folder: '06-gemini-notebook', file: '06-04_edu_notebook-citation_20260820.png', alt: 'Notebook 인용 원문 확인 화면', caption: '', focused: true, zoom: 1.38, x: 75, y: 52 }),
    processSlide({ section: 'Notebook', title: '맞춤 설정: 산출물의 범위와 금지 조건 지정', subtitle: '가능한 산출물은 만들기 전에 목적에 맞게 맞춤 설정합니다.', minute: '2부 · 14–15분', footer: 'NotebookLM Help · Customize chat & artifacts', step: '05 · 맞춤 설정', action: '마인드맵 요구사항 입력', summary: '핵심 구조를 지정하고 원문에 없는 총점·기한을 추가하지 못하게 제한합니다.', prompt: '“과제 개요, 제출물 세 가지, 평가 항목 다섯 가지, 교사 검증 원칙을 중심으로 구성해 줘. 원문에 없는 총점이나 기한은 추가하지 마.”', run: '마인드맵 맞춤 설정 열기 → 요구사항 입력', check: '목적·범위·금지 조건이 모두 있는가?', result: '맞춤 조건을 적용해 생성 준비', folder: '06-gemini-notebook', file: '06-05a_edu_notebook-artifact-settings_20260820.png', alt: 'NotebookLM 마인드맵 맞춤 설정 화면', caption: '', focused: true, zoom: 1.34, x: 50, y: 52 }),
    processSlide({ section: 'Notebook', title: 'Artifact: 소스를 다른 구조로 재구성', subtitle: '마인드맵도 새 사실이 아니라 소스의 재구성으로 읽습니다.', minute: '2부 · 15–17분', footer: 'NotebookLM · Artifact', step: '06 · Artifact', action: '맞춤 마인드맵 생성', summary: '지정한 과제 개요·제출물·평가 항목·검증 원칙의 관계를 한눈에 확인합니다.', run: '맞춤 조건으로 마인드맵 생성', check: '소스에 없는 항목이 추가되지 않았는가?', result: '평가 요소 관계를 시각화', folder: '06-gemini-notebook', file: '06-05_edu_notebook-artifact_20260820.png', alt: 'Notebook이 만든 마인드맵 전체 화면', caption: '' }),
    processSlide({ section: 'Notebook', title: 'Classroom 연결: 이동해도 여전히 초안', subtitle: '도구 사이를 연결해도 자동 게시를 허용하지 않습니다.', minute: '2부 · 17–18분', footer: 'Google Classroom Help · NotebookLM', step: '07 · 연결', action: 'Classroom 초안으로 보내기', summary: 'Notebook의 결과를 수업 자료로 연결한 뒤 게시 전 검토 지점을 남깁니다.', run: 'Notebook 결과를 Classroom 초안으로 연결', check: '학생에게 공개되지 않은 초안 상태인가?', result: '게시 전 교사 검토 가능', folder: '06-gemini-notebook', file: '06-06_edu_notebook-classroom-draft_20260820.png', alt: 'Notebook 결과가 연결된 Classroom 초안 전체 화면', caption: '' }),

    sectionSlide(7, 'Workspace Studio', '자연어 요구를 Starter·Step·Variable로 분해하고 Test run으로 검증합니다.', '자동화는 켜기보다 테스트하고 꺼 둔 상태를 확인하는 것이 먼저입니다.'),
    processSlide({ section: 'Studio', title: 'Describe: 시작 조건과 작업을 자연어로 설명', subtitle: '언제, 무엇을, 어떤 자료 범위에서 처리할지 먼저 적습니다.', minute: '2부 · 18–21분', footer: 'Workspace Studio Help · Create flows', step: '01 · Describe', action: '업무 요구를 문장으로 입력', summary: '월요일 오전 9시 시작 조건과 두 개의 Gemini 처리 단계를 설명합니다.', prompt: '“월요일 9시에 가상 메모에서 제출물을 추출하고, 그 결과로 확인 체크리스트를 만들어 줘. 외부 앱에 쓰지 말고 Flow를 켜지 마.”', run: '주간 시작 조건 + 산출물 + 자료 사용 제한 입력', check: '시작 시점과 결과가 명확한가?', result: 'Flow 생성에 필요한 요구 정의', folder: '07-workspace-studio', file: '07-02_edu_studio-describe_20260820.png', alt: 'Workspace Studio 자연어 설명 입력', caption: '', focused: true, zoom: 1.38, x: 59, y: 44 }),
    processSlide({ section: 'Studio', title: 'Flow: 자연어 요구가 단계 구조로 바뀐다', subtitle: '생성된 Starter와 Step이 원래 요구를 반영하는지 확인합니다.', minute: '2부 · 21–24분', footer: 'Workspace Studio · Generated flow', step: '02 · Flow', action: 'Starter와 Steps 검토', summary: '주간 Starter 한 개와 Ask Gemini Step 두 개가 생성됐습니다.', prompt: '앞 슬라이드의 월요일 9시·2단계 Gemini·외부 쓰기 금지 요청', run: '자연어 설명에서 Flow 자동 생성', check: '시작 조건·단계 수·순서가 맞는가?', result: '1 Starter + 2 Gemini Steps', folder: '07-workspace-studio', file: '07-03_edu_studio-flow_20260820.png', alt: 'Workspace Studio가 생성한 Flow', caption: '' }),
    processSlide({ section: 'Studio', title: 'Variable: 앞 단계의 출력을 다음 단계 입력으로', subtitle: '자동화의 연결선은 변수로 확인합니다.', minute: '2부 · 24–27분', footer: 'Workspace Studio Help · Variables', step: '03 · Variable', action: '단계 사이 데이터 연결', summary: 'Step 1의 결과를 Step 2가 정확히 받도록 변수 선택을 확인합니다.', run: '이전 단계 출력 변수를 다음 Prompt에 삽입', check: '잘못된 단계나 빈 변수를 참조하지 않는가?', result: 'Step 1 → Step 2 데이터 연결', folder: '07-workspace-studio', file: '07-04_edu_studio-variable_20260820.png', alt: 'Workspace Studio 변수 연결 화면', caption: '변수 선택 메뉴와 입력 위치 확대', zoom: 1.72, x: 62, y: 53 }),
    processSlide({ section: 'Studio', title: 'Test run: 실제 자동화 전에 한 번 실행', subtitle: '테스트가 어떤 작업을 수행하는지 확인한 뒤 진행합니다.', minute: '2부 · 27–29분', footer: 'Workspace Studio Help · Test a flow', step: '04 · Test', action: '테스트 실행과 경고 확인', summary: 'Flow를 켜지 않은 상태에서 입력과 연결이 실제로 작동하는지 시험합니다.', run: 'Test run 실행', check: '경고 내용과 실행 범위를 읽었는가?', result: '단계별 실행 결과 확인', folder: '07-workspace-studio', file: '07-05_edu_studio-test-run_20260820.png', alt: 'Workspace Studio 테스트 실행 화면', caption: 'Test run 상태 확대', zoom: 1.66, x: 56, y: 52 }),
    processSlide({ section: 'Studio', title: 'Final: 성공해도 사용 설정 전 상태로 멈춘다', subtitle: '테스트 성공과 자동 실행 허용은 서로 다른 결정입니다.', minute: '2부 · 29–31분', footer: '테스트 성공 · Flow 비활성', step: '05 · Final', action: '꺼진 상태 재확인', summary: '결과가 성공해도 교사 승인 없이 반복 실행되지 않도록 비활성 상태를 확인합니다.', run: 'Test run 성공 후 편집 화면 복귀', check: '“사용 설정” 전 상태인가?', result: 'Flow는 꺼진 상태로 유지', folder: '07-workspace-studio', file: '07-06_edu_studio-final_20260820.png', alt: '테스트 성공 후 비활성 Workspace Studio Flow', caption: '성공 상태와 사용 설정 버튼 확대', zoom: 1.58, x: 55, y: 48 }),

    sectionSlide(8, 'New Gems from Labs', '개인 계정의 Labs에서 다단계 워크플로를 만드는 새로운 Gems 경험입니다.', '교육용 계정에서는 확인되지 않아 개인 계정으로 시연했습니다.'),
    processSlide({ section: 'New Gems', title: '계정 차이: 개인 계정에서 Labs 진입', subtitle: 'Classic Gems와 Labs의 New Gems는 같은 이름처럼 보여도 다른 경험입니다.', minute: '2부 · 31–32분', footer: 'Gemini Apps Help · Gems from Google Labs', step: '01 · 계정', action: '개인용 Labs 진입 확인', summary: '교육용 계정에서는 Labs 영역이 보이지 않아 개인 계정에서 기능을 확인했습니다.', run: '개인 계정으로 Gems from Labs 열기', check: '현재 사용하는 계정과 기능 유형이 무엇인가?', result: '개인 계정에서 New Gems 진입', folder: '08-new-gems-labs', file: '08-02_personal_labs-gems-entry_20260820.png', alt: '개인 계정의 New Gems 진입 전체 화면', caption: '' }),
    processSlide({ section: 'New Gems', title: 'Prompt: 만들고 싶은 검토 도구를 설명', subtitle: '목표와 오류 유형, 출력 구조를 자연어로 요구합니다.', minute: '2부 · 32–34분', footer: '개인 계정 · 합성 데이터', step: '02 · Prompt', action: '다단계 도구 요구 입력', summary: '누락·모호성·점수 합계를 확인하는 루브릭 점검 도구를 요청합니다.', prompt: '“과제 설명과 루브릭을 비교해 누락·모호성·점수 불일치를 찾고, 확인 필요 항목을 표로 보여 줘. 입력에 없는 내용은 추정하지 마.”', run: '검토 목표와 교사 결정 항목 입력', check: '워크플로로 나눌 수 있을 만큼 과업이 명확한가?', result: 'New Gem 생성 요청 완료', folder: '08-new-gems-labs', file: '08-03_personal_labs-gems-prompt_20260820.png', alt: 'New Gems 요구 Prompt 입력 화면', caption: '', focused: true, zoom: 1.4, x: 62, y: 55 }),
    processSlide({ section: 'New Gems', title: 'Workflow: 한 요청이 네 단계로 분해된다', subtitle: '각 단계가 어떤 입력을 받고 어떤 결과를 넘기는지 확인합니다.', minute: '2부 · 34–35분', footer: '개인 계정 · 4단계 Workflow', step: '03 · Workflow', action: '생성된 단계 검토', summary: '요청 제목은 “루브릭체크”로 줄고, 과제와 루브릭을 처리하는 네 단계가 생성됐습니다.', prompt: '앞 슬라이드의 누락·모호성·점수 불일치 점검 앱 생성 요청', run: 'New Gem 자동 구성', check: '단계 순서·입력·출력이 원래 목적과 맞는가?', result: '4단계 Workflow 생성', folder: '08-new-gems-labs', file: '08-04_personal_labs-gems-workflow_20260820.png', alt: 'New Gems가 만든 4단계 Workflow 전체 화면', caption: '' }),
    processSlide({ section: 'New Gems', title: '실행 입력 1: 과제 요구사항을 먼저 넣는다', subtitle: '결과 화면과 분리해 모델이 받은 첫 번째 입력을 그대로 보여 줍니다.', minute: '2부 · 35–36분', footer: '개인 계정 · 합성 데이터 입력 1', step: '04 · 입력 1', action: '과제 원문 투입', summary: '제출물과 네 평가 기준, 총점 16점인 가상 과제 요구사항을 입력합니다.', prompt: '“콘셉트 보드·기획 의도·서체와 색상 근거를 제출한다. 평가 기준은 타깃 적합성·시각적 위계·선택 근거·완성도이며 총점은 16점이다.”', run: 'Task Requirements 입력란 작성', check: '검증 기준과 요구 총점이 명시됐는가?', result: '비교 기준이 되는 첫 입력 확보', folder: '08-new-gems-labs', file: '08-05a_personal_labs-gems-task-input_20260820.png', alt: 'New Gems에 입력한 합성 과제 요구사항', caption: '' }),
    processSlide({ section: 'New Gems', title: '실행 입력 2: 오류가 있는 루브릭을 넣는다', subtitle: '비교 대상도 결과와 분리해 오류가 어디서 시작됐는지 확인합니다.', minute: '2부 · 36–37분', footer: '개인 계정 · 합성 데이터 입력 2', step: '05 · 입력 2', action: '불완전한 루브릭 투입', summary: '모호한 두 기준과 20점 총점을 넣어 누락·관찰 가능성·배점 불일치를 의도적으로 만듭니다.', prompt: '“창의성 10점: 매우 창의적이다. 성실성 10점: 성실하게 수행했다.”', run: 'Rubric Draft 입력란 작성', check: '16점 요구와 20점 초안의 불일치가 보이는가?', result: '검증할 오류가 명확히 분리됨', folder: '08-new-gems-labs', file: '08-05b_personal_labs-gems-rubric-input_20260820.png', alt: 'New Gems에 입력한 의도적으로 오류가 있는 합성 루브릭', caption: '' }),
    processSlide({ section: 'New Gems', title: 'Result: 오류와 교사 결정 항목을 분리', subtitle: '자동 수정이 아니라 검토 결과를 구조화해 교사에게 돌려줍니다.', minute: '2부 · 37–40분', footer: '개인 계정 · 실행 결과', step: '06 · Result', action: '검토 결과 판정', summary: '누락, 모호한 표현, 16점/20점 불일치를 찾고 근거 없는 정보는 제안으로 남깁니다.', prompt: '앞의 과제 요구사항 + 오류가 있는 합성 루브릭', run: '두 입력을 넣고 Start app 실행', check: '사실 오류와 교사 선택 항목을 구분했는가?', result: '오류 탐지 + 교사 결정 목록', folder: '08-new-gems-labs', file: '08-05c_personal_labs-gems-run-details_20260820.png', alt: 'New Gems 실행 결과 상세', caption: '', focused: true, zoom: 1.42, x: 64, y: 54 }),

    sectionSlide(9, 'Gemini Spark / Skills', '개인용 Spark에서 반복 절차를 Skill로 저장하고 실제 Task에 호출합니다.', '공식 문서는 직장·학교 계정 미지원이라고 안내합니다.'),
    processSlide({ section: 'Spark', title: '교육용 단축키: 온보딩은 열리지만 지원은 별개', subtitle: '공식 지원 조건과 실제 키 입력 결과를 함께 기록합니다.', minute: '2부 · 40–42분', footer: 'Gemini Apps Help · Spark', step: '01 · 계정 검증', action: '교육용 계정에서 단축키 입력', summary: '실제 키 입력 뒤 Spark 온보딩 화면은 열렸지만 전체 사용 가능 여부는 확인하지 않았습니다.', run: '교육용 Gemini에서 Spark 단축키 실행', check: '공식 지원 조건과 실제 노출이 일치하는가?', result: '온보딩 노출 · 사용성 미확정', warning: true, folder: '09-spark-skills', file: '09-02_edu_spark-after-shortcut_20260820.png', alt: '교육용 계정에서 Spark 단축키 후 열린 온보딩', caption: '교육용 계정의 Spark 온보딩 확대', zoom: 1.48, x: 66, y: 52 }),
    processSlide({ section: 'Spark', title: 'Skill: 반복 절차와 출력 구조를 저장', subtitle: '개인 계정에서 루브릭 근거 점검 절차를 Skill로 만듭니다.', minute: '2부 · 42–44분', footer: 'Gemini Apps Help · Create effective skills', step: '02 · Skill', action: '루브릭 점검 Skill 생성', summary: '점검 순서와 실패 처리, 결과 표 구조를 지속해서 재사용하도록 저장합니다.', run: '“루브릭-근거-점검-연수용” Skill 작성', check: '절차와 출력 계약이 모두 들어갔는가?', result: '이름이 정규화되어 Skill 저장', folder: '09-spark-skills', file: '09-04_personal_skill-create_20260820.png', alt: '개인용 Spark Skill 생성 화면', caption: 'Skill 지침 작성 영역 확대', zoom: 1.8, x: 40, y: 52 }),
    processSlide({ section: 'Spark', title: 'Task: 실제 / 키로 Skill을 호출', subtitle: '저장된 Skill이 실제 작업에 연결되는 과정을 확인합니다.', minute: '2부 · 44–45분', footer: '개인 계정 · 실제 키 입력', step: '03 · Task', action: '작업에 Skill 붙이기', summary: '메뉴를 클릭한 것이 아니라 실제 / 키를 입력해 Skill 선택 화면을 열었습니다.', prompt: '“공식 도움말 한 페이지만 근거로 사용 조건과 제한을 정리하고 출처 링크를 포함해. 외부 서비스에 쓰지 마.”', run: '새 Task → / 키 → 저장된 Skill 선택', check: '올바른 Skill 칩이 작업에 붙었는가?', result: 'Task에 Skill 연결 완료', folder: '09-spark-skills', file: '09-05_personal_spark-task_20260820.png', alt: 'Spark Task에서 Skill을 호출한 화면', caption: '' }),
    processSlide({ section: 'Spark', title: 'Progress: 완료 화면 전에 처리 과정을 본다', subtitle: '작업이 어떤 절차를 거쳤는지 확장된 진행 기록으로 확인합니다.', minute: '2부 · 45–47분', footer: '개인 계정 · 외부 앱 연결 없음', step: '04 · Progress', action: '진행 기록 펼치기', summary: 'Skill이 과제를 분석하고 결과 구조를 만든 과정을 완료 전후로 확인합니다.', run: '진행 기록 확장', check: '저장한 Skill 절차가 실제로 적용됐는가?', result: 'Skill 적용 과정 확인', folder: '09-spark-skills', file: '09-06a_personal_spark-progress_20260820.png', alt: 'Spark 작업의 확장된 진행 기록', caption: '확장된 진행 기록 확대', zoom: 1.7, x: 61, y: 52 }),
    processSlide({ section: 'Spark', title: 'Result: 출력 계약을 지켰는지 마지막 확인', subtitle: '완료 여부보다 누락·모호성·점수·교사 결정을 구분했는지 봅니다.', minute: '2부 · 47–48분', footer: '개인 계정 · Skill 실행 결과', step: '05 · Result', action: '최종 구조 검증', summary: 'Skill이 약속한 검토 항목과 교사 결정 목록을 최종 결과에서 대조합니다.', prompt: '앞 슬라이드에서 / 키로 선택한 Skill + 합성 Task', run: '합성 루브릭 Task 완료', check: '누락·모호성·점수 합계·결정 항목이 구분됐는가?', result: '요청한 출력 구조 준수', folder: '09-spark-skills', file: '09-06_personal_spark-progress_20260820.png', alt: 'Spark Skill 실행 최종 결과', caption: '' }),
    {
      layout: 'content', section: '정리', title: '어떤 도구에서도 통하는 6줄 통제 레시피', subtitle: '기능 이름이 바뀌어도 이 여섯 줄은 그대로 사용할 수 있습니다.', minute: '2부 · 48–50분', footer: 'Harness + Verification Loop · 작업 조건과 반복 검증',
      body: `<div class="control-recipe"><div class="recipe-number"><strong>6</strong><span>줄이면<br />통제할 수 있다</span></div><ol class="control-list"><li><b>01</b><span><strong>목표</strong> — 무엇을 결정하기 위한 작업인가?</span></li><li><b>02</b><span><strong>자료</strong> — 무엇만 근거로 사용할 것인가?</span></li><li><b>03</b><span><strong>금지</strong> — 무엇을 추정·게시·평가하지 말아야 하는가?</span></li><li><b>04</b><span><strong>출력</strong> — 어떤 형식과 필수 항목으로 받을 것인가?</span></li><li><b>05</b><span><strong>실패</strong> — 근거가 없을 때 어떻게 멈출 것인가?</span></li><li><b>06</b><span><strong>검증</strong> — 무엇을 사람이 확인하고 결정할 것인가?</span></li></ol></div>`,
    },
    { layout: 'closing', section: '마무리', title: '근거를 남기고, 결정권을 지킨다', body: `<div class="closing-grid"><h1>AI에게 일을 맡겨도<br /><em>교사의 결정권은 맡기지 않는다.</em></h1><p>공식 문서 → 실제 UI → 합성 데이터 → 단계별 증거 → 사람 검증. 이것이 실전 통제의 순서입니다.</p><div class="final-route"></div></div>` },
  ];
})();
