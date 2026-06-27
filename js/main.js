/* =====================================================================
   Dra. Nágila Lessa — Interações do site
   ===================================================================== */
(function () {
  'use strict';

  /* -------------------------------------------------------------------
     CONFIGURAÇÃO  →  ⚠️  ALTERE O NÚMERO DE WHATSAPP ABAIXO
     Formato: código do país + DDD + número (somente dígitos)
     ------------------------------------------------------------------- */
  var WHATSAPP_NUMBER = '5548999079613'; // WhatsApp da Dra. Nágila — (48) 99907-9613
  var WHATSAPP_MSG = 'Olá, Dra. Nágila! Vim pelo site e gostaria de agendar uma avaliação.';
  var WA_LINK = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(WHATSAPP_MSG);

  /* Aplica o link de WhatsApp em todos os pontos marcados */
  function applyWhatsApp() {
    document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
      el.setAttribute('href', WA_LINK);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
    document.querySelectorAll('[data-whatsapp-link]').forEach(function (el) {
      el.setAttribute('href', WA_LINK);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  /* -------------------------------------------------------------------
     PRELOADER — 0 a 100% em 2,5s, depois sobe e revela o site
     ------------------------------------------------------------------- */
  function initPreloader() {
    var pre = document.getElementById('preloader');
    if (!pre) { document.body.classList.remove('is-loading'); return; }
    var fill = pre.querySelector('.preloader__fill');
    var pct = document.getElementById('preloaderPct');
    var DURATION = 2500;
    var start = null;

    function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / DURATION);
      var p = Math.round(easeInOut(t) * 100);
      if (pct) pct.textContent = p;
      if (fill) fill.style.width = p + '%';
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        if (pct) pct.textContent = 100;
        if (fill) fill.style.width = '100%';
        window.setTimeout(reveal, 220);
      }
    }

    function reveal() {
      if (pre.classList.contains('is-leaving')) return;
      // Etapa 1: o conteúdo da abertura some suavemente
      pre.classList.add('is-leaving');
      // Etapa 2: as cortinas se separam e revelam o site
      window.setTimeout(function () {
        pre.classList.add('is-done');
        document.body.classList.remove('is-loading');
      }, 520);
      // limpeza após a animação
      window.setTimeout(function () { if (pre && pre.parentNode) pre.parentNode.removeChild(pre); }, 1700);
    }

    requestAnimationFrame(step);

    /* Salvaguarda: se algo falhar, libera o site */
    window.setTimeout(function () {
      if (document.body.classList.contains('is-loading')) reveal();
    }, DURATION + 2500);
  }

  /* -------------------------------------------------------------------
     HEADER — estado ao rolar
     ------------------------------------------------------------------- */
  function initHeader() {
    var header = document.getElementById('header');
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* -------------------------------------------------------------------
     MENU MOBILE
     ------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu');
    }
    function open() {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu');
    }
    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) close(); else open();
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* -------------------------------------------------------------------
     SCROLL REVEAL
     ------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* -------------------------------------------------------------------
     TABS (Resultados)
     ------------------------------------------------------------------- */
  function initTabs() {
    var tabs = document.querySelectorAll('.tab');
    var panels = document.querySelectorAll('.tab-panel');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.getAttribute('data-tab');
        tabs.forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('is-active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach(function (p) {
          p.classList.toggle('is-active', p.getAttribute('data-panel') === key);
        });
      });
    });
  }

  /* -------------------------------------------------------------------
     FAQ — acordeão suave (mantém acessibilidade do <details>)
     ------------------------------------------------------------------- */
  function initFaq() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));
    if (!items.length) return;

    function collapse(item) {
      var body = item.querySelector('.faq-item__body');
      if (!body) return;
      item.classList.add('is-animating');
      body.style.height = body.scrollHeight + 'px';
      requestAnimationFrame(function () { body.style.height = '0px'; });
      body.addEventListener('transitionend', function te() {
        item.open = false;
        body.style.height = '';
        item.classList.remove('is-animating');
        body.removeEventListener('transitionend', te);
      }, { once: true });
    }
    function expand(item) {
      var body = item.querySelector('.faq-item__body');
      if (!body) return;
      item.open = true;
      item.classList.add('is-animating');
      body.style.height = '0px';
      var h = body.scrollHeight;
      requestAnimationFrame(function () { body.style.height = h + 'px'; });
      body.addEventListener('transitionend', function te() {
        body.style.height = 'auto';
        item.classList.remove('is-animating');
        body.removeEventListener('transitionend', te);
      }, { once: true });
    }

    items.forEach(function (item) {
      var summary = item.querySelector('summary');
      if (!summary) return;
      summary.addEventListener('click', function (e) {
        e.preventDefault();
        if (item.classList.contains('is-animating')) return;
        if (item.open) {
          collapse(item);
        } else {
          items.forEach(function (o) { if (o !== item && o.open) collapse(o); });
          expand(item);
        }
      });
    });
  }

  /* -------------------------------------------------------------------
     ANTES / DEPOIS — slider arrastável
     ------------------------------------------------------------------- */
  function initBaSlider() {
    var slider = document.getElementById('baSlider');
    if (!slider) return;
    var dragging = false;

    function setPos(clientX) {
      var r = slider.getBoundingClientRect();
      var p = ((clientX - r.left) / r.width) * 100;
      p = Math.max(0, Math.min(100, p));
      slider.style.setProperty('--pos', p + '%');
      slider.setAttribute('aria-valuenow', Math.round(p));
    }

    slider.addEventListener('pointerdown', function (e) {
      dragging = true;
      slider.classList.add('is-grabbing');
      try { slider.setPointerCapture(e.pointerId); } catch (err) {}
      setPos(e.clientX);
    });
    slider.addEventListener('pointermove', function (e) {
      if (dragging) setPos(e.clientX);
    });
    function stop() { dragging = false; slider.classList.remove('is-grabbing'); }
    slider.addEventListener('pointerup', stop);
    slider.addEventListener('pointercancel', stop);

    slider.addEventListener('keydown', function (e) {
      var cur = parseFloat(slider.getAttribute('aria-valuenow')) || 50;
      var next = cur;
      if (e.key === 'ArrowLeft') next = Math.max(0, cur - 4);
      else if (e.key === 'ArrowRight') next = Math.min(100, cur + 4);
      else return;
      e.preventDefault();
      slider.style.setProperty('--pos', next + '%');
      slider.setAttribute('aria-valuenow', Math.round(next));
    });

    /* pequena animação de "convite" ao entrar na tela */
    if ('IntersectionObserver' in window) {
      var seen = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !seen) {
            seen = true;
            var seq = [50, 62, 38, 50];
            var i = 0;
            var iv = setInterval(function () {
              slider.style.setProperty('--pos', seq[i] + '%');
              i++;
              if (i >= seq.length) clearInterval(iv);
            }, 420);
          }
        });
      }, { threshold: 0.4 });
      io.observe(slider);
    }
  }

  /* -------------------------------------------------------------------
     LIGHTBOX — ampliar imagens de antes/depois
     ------------------------------------------------------------------- */
  function initLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    var lbImg = lb.querySelector('img');
    var closeBtn = lb.querySelector('.lightbox__close');
    var triggers = document.querySelectorAll('.ba-card img, .case__item img');
    if (!triggers.length) return;

    function open(src, alt) {
      lbImg.setAttribute('src', src);
      lbImg.setAttribute('alt', alt || '');
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      window.setTimeout(function () { lbImg.setAttribute('src', ''); }, 250);
    }
    triggers.forEach(function (im) {
      im.addEventListener('click', function () { open(im.currentSrc || im.src, im.alt); });
    });
    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target !== lbImg) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* -------------------------------------------------------------------
     Ano no rodapé
     ------------------------------------------------------------------- */
  function initYear() {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------------------
     INIT
     ------------------------------------------------------------------- */
  function init() {
    applyWhatsApp();
    initHeader();
    initNav();
    initReveal();
    initTabs();
    initFaq();
    initBaSlider();
    initLightbox();
    initYear();
    initPreloader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
