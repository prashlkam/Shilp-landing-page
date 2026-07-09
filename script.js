/* ============================================================
   Shilp · शिल्प — Landing Page Interactions
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Nav: shrink on scroll + mobile burger ---------- */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.querySelector('.nav__links');

  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => {
    nav.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      links.classList.remove('open');
    })
  );

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (el.classList.contains('reveal--delay') ? 150 : (i % 6) * 60) + 'ms';
    io.observe(el);
  });

  /* ---------- Keyword grid ---------- */
  const keywords = [
    { hi: 'कार्य', py: 'def' },
    { hi: 'वापस', py: 'return' },
    { hi: 'अगर', py: 'if' },
    { hi: 'अन्यथा', py: 'else' },
    { hi: 'हर', py: 'for' },
    { hi: 'में', py: 'in' },
    { hi: 'जब_तक', py: 'while' },
    { hi: 'वर्ग', py: 'class' },
    { hi: 'आयात', py: 'import' },
    { hi: 'से', py: 'from' },
    { hi: 'छापो', py: 'print' },
    { hi: 'सत्य', py: 'True' },
    { hi: 'असत्य', py: 'False' },
    { hi: 'रिक्त', py: 'None' },
    { hi: 'और', py: 'and' },
    { hi: 'या', py: 'or' },
    { hi: 'नहीं', py: 'not' },
    { hi: 'कोशिश', py: 'try' },
    { hi: 'पकड़ो', py: 'except' },
    { hi: 'तोड़ो', py: 'break' },
    { hi: 'जारी', py: 'continue' },
    { hi: 'उठाओ', py: 'raise' },
  ];
  const grid = document.getElementById('kw-grid');
  if (grid) {
    grid.innerHTML = keywords
      .map(
        (k) =>
          `<div class="kw-cell"><span class="kw-cell__hi">${k.hi}</span><span class="kw-cell__arrow">↓</span><span class="kw-cell__py">${k.py}</span></div>`
      )
      .join('');
  }

  /* ---------- Copy buttons ---------- */
  document.querySelectorAll('.copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        const orig = btn.textContent;
        btn.textContent = '✓';
        btn.classList.add('done');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('done');
        }, 1400);
      } catch (_) {}
    });
  });

  /* ---------- Hero: typewriter code + syntax highlight + run output ---------- */
  const codeEl = document.getElementById('typed-code');
  const caret = document.getElementById('caret');
  const runOut = document.getElementById('run-out');

  const source = [
    'कार्य अभिवादन(नाम):',
    '    वापस f"नमस्ते, {नाम}!"',
    '',
    'लोग = ["अर्जुन", "प्रिया", "कबीर"]',
    'हर व्यक्ति में लोग:',
    '    छापो(अभिवादन(व्यक्ति))',
  ].join('\n');

  const kwSet = new Set([
    'कार्य', 'वापस', 'अगर', 'अन्यथा', 'हर', 'में', 'जब_तक', 'वर्ग',
    'आयात', 'से', 'छापो', 'सत्य', 'असत्य', 'रिक्त', 'और', 'या', 'नहीं',
  ]);

  // Highlight a finished string of Shilp code into token spans.
  function highlight(text) {
    // Split while keeping delimiters, then classify each piece.
    return text.replace(/("[^"]*")|(\bf")|([ऀ-ॿ_]+)|(\d+)|([(){}\[\]:,=+\-*/.])/g,
      (m, str, fpre, word, num, punc) => {
        if (str) return `<span class="tok-str">${str}</span>`;
        if (word) {
          if (kwSet.has(word)) return `<span class="tok-kw">${word}</span>`;
          return `<span class="tok-fn">${word}</span>`;
        }
        if (num) return `<span class="tok-num">${num}</span>`;
        if (punc) return `<span class="tok-punc">${punc}</span>`;
        return m;
      });
  }

  const outputs = ['नमस्ते, अर्जुन!', 'नमस्ते, प्रिया!', 'नमस्ते, कबीर!'];

  function prefersReduced() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function showOutput() {
    outputs.forEach((line, i) => {
      const div = document.createElement('div');
      div.textContent = line;
      div.style.animationDelay = i * 0.25 + 's';
      runOut.appendChild(div);
    });
  }

  function typewriter() {
    if (!codeEl) return;
    if (prefersReduced()) {
      codeEl.innerHTML = highlight(source);
      caret && (caret.style.display = 'none');
      showOutput();
      return;
    }
    let i = 0;
    const speed = 24;
    (function step() {
      if (i <= source.length) {
        const slice = source.slice(0, i);
        // Highlight only completed text; keep it readable while typing.
        codeEl.innerHTML = highlight(slice);
        i++;
        setTimeout(step, source[i - 1] === '\n' ? speed * 4 : speed);
      } else {
        caret && (caret.style.display = 'none');
        setTimeout(showOutput, 350);
      }
    })();
  }

  // Kick off the typewriter once the hero card is on screen.
  const heroCard = document.querySelector('.code-card');
  if (heroCard) {
    const heroIO = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          typewriter();
          heroIO.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    heroIO.observe(heroCard);
  }

  /* ---------- Highlight the static translation panes ---------- */
  document.querySelectorAll('.lang-shilp').forEach((el) => {
    el.innerHTML = highlight(el.textContent);
  });
})();
