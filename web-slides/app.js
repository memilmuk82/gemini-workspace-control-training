(() => {
  'use strict';

  const deck = document.querySelector('#deck');
  const counter = document.querySelector('#counter');
  const prevButton = document.querySelector('#prev');
  const nextButton = document.querySelector('#next');
  const fullscreenButton = document.querySelector('#fullscreen');
  const printButton = document.querySelector('#print');
  const slides = window.TRAINING_SLIDES || [];

  function icon(name) {
    const paths = {
      document: '<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/>',
      check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
      warning: '<path d="M12 3 2.7 20h18.6z"/><path d="M12 9v5M12 17h.01"/>',
      route: '<path d="M4 6h7l2 3h7M4 18h7l2-3h7"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="18" r="1"/>',
    };
    return `<svg class="inline-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.document}</svg>`;
  }

  function slideChrome(slide, index) {
    if (['cover', 'section', 'break', 'closing'].includes(slide.layout)) return '';
    return `
      <aside class="section-rail" aria-hidden="true">
        <strong>${String(index + 1).padStart(2, '0')}</strong>
        <span>${slide.section}</span>
        <i></i>
      </aside>
      <header class="slide-heading">
        <h1>${slide.title}</h1>
        ${slide.subtitle ? `<p>${slide.subtitle}</p>` : ''}
      </header>
    `;
  }

  function slideFooter(slide) {
    if (['cover', 'section', 'break', 'closing'].includes(slide.layout)) return '';
    return `
      <footer class="slide-footer">
        <span>${icon('document')}${slide.footer || '공식 문서 기준 · 실제 UI 검증 · 합성 데이터'}</span>
        <span>${slide.minute || ''}</span>
      </footer>
    `;
  }

  function render() {
    deck.innerHTML = slides
      .map(
        (slide, index) => `
          <div class="slide-sheet" data-index="${index}" aria-hidden="true">
            <section class="slide slide--${slide.layout || 'content'} ${slide.className || ''}">
              ${slideChrome(slide, index)}
              <div class="slide-body">${slide.body}</div>
              ${slideFooter(slide)}
            </section>
          </div>
        `,
      )
      .join('');
  }

  function requestedIndex() {
    const match = window.location.hash.match(/^#\/slide\/(\d+)$/);
    if (!match) return 0;
    return Math.min(Math.max(Number(match[1]) - 1, 0), slides.length - 1);
  }

  function show(index, replace = false) {
    const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
    const sheets = [...document.querySelectorAll('.slide-sheet')];
    sheets.forEach((sheet, sheetIndex) => {
      const isActive = sheetIndex === nextIndex;
      sheet.classList.toggle('is-active', isActive);
      sheet.setAttribute('aria-hidden', String(!isActive));
    });
    counter.value = `${nextIndex + 1} / ${slides.length}`;
    prevButton.disabled = nextIndex === 0;
    nextButton.disabled = nextIndex === slides.length - 1;
    document.title = `${nextIndex + 1}. ${slides[nextIndex]?.title || 'Google의 생성형 AI Gemini를 활용한 행정 업무 경감과 AI 리터러시 학습'}`;
    const hash = `#/slide/${nextIndex + 1}`;
    if (replace) window.history.replaceState(null, '', hash);
    else if (window.location.hash !== hash) window.location.hash = hash;
  }

  function currentIndex() {
    return requestedIndex();
  }

  function resizeDeck() {
    const scale = Math.min(window.innerWidth / 1600, window.innerHeight / 900);
    document.documentElement.style.setProperty('--deck-scale', String(scale));
  }

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }

  render();
  resizeDeck();
  show(requestedIndex(), !window.location.hash);

  window.addEventListener('resize', resizeDeck);
  window.addEventListener('hashchange', () => show(requestedIndex()));
  prevButton.addEventListener('click', () => show(currentIndex() - 1));
  nextButton.addEventListener('click', () => show(currentIndex() + 1));
  fullscreenButton.addEventListener('click', toggleFullscreen);
  printButton.addEventListener('click', () => window.print());

  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const tag = event.target?.tagName?.toLowerCase();
    if (['input', 'textarea', 'select'].includes(tag)) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) {
      event.preventDefault();
      show(currentIndex() + 1);
    }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) {
      event.preventDefault();
      show(currentIndex() - 1);
    }
    if (event.key === 'Home') show(0);
    if (event.key === 'End') show(slides.length - 1);
    if (event.key.toLowerCase() === 'f') toggleFullscreen();
    if (event.key.toLowerCase() === 'p') window.print();
  });
})();
