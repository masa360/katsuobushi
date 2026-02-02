(function () {
  'use strict';

  // ===== i18n: default English, switch via pull tab =====
  const STORAGE_KEY = 'zeniki-lang';
  const DEFAULT_LANG = 'en';
  const LANG_TAB_LABELS = { en: 'EN', ja: '日本語', zh: '中文' };

  function getLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && window.ZENIKI_I18N && window.ZENIKI_I18N[saved]) return saved;
    } catch (e) { /* ignore */ }
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  function applyLanguage(lang) {
    const t = window.ZENIKI_I18N && window.ZENIKI_I18N[lang];
    if (!t) return;

    document.title = t.pageTitle || document.title;
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : (lang === 'ja' ? 'ja' : 'en');

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      const str = t[key];
      if (str == null) return;
      if (typeof str === 'string' && str.indexOf('<') !== -1) {
        el.innerHTML = str;
      } else {
        el.textContent = str;
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-alt');
      const str = t[key];
      if (str != null) el.setAttribute('alt', str);
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      const str = t[key];
      if (str != null) el.setAttribute('title', str);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria-label');
      const str = t[key];
      if (str != null) el.setAttribute('aria-label', str);
    });

    var tabEl = document.querySelector('.lang-tab-text');
    if (tabEl) tabEl.textContent = LANG_TAB_LABELS[lang] || lang.toUpperCase();

    document.querySelectorAll('.lang-option').forEach(function (btn) {
      var isSelected = btn.getAttribute('data-lang') === lang;
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });
  }

  var currentLang = getLang();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { applyLanguage(currentLang); });
  } else {
    applyLanguage(currentLang);
  }

  var langTab = document.getElementById('lang-tab');
  var langPanel = document.getElementById('lang-panel');
  if (langTab && langPanel) {
    langTab.addEventListener('click', function () {
      var isOpen = !langPanel.hidden;
      langPanel.hidden = isOpen;
      langTab.setAttribute('aria-expanded', !isOpen);
    });

    document.querySelectorAll('.lang-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        if (lang && window.ZENIKI_I18N && window.ZENIKI_I18N[lang]) {
          currentLang = lang;
          setLang(lang);
          applyLanguage(lang);
          langPanel.hidden = true;
          langTab.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (langPanel.hidden) return;
      if (!langPanel.contains(e.target) && !langTab.contains(e.target)) {
        langPanel.hidden = true;
        langTab.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ===== Loader =====
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    document.body.classList.add('loading');
    setTimeout(function () {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      // Trigger hero animations after loader
      document.querySelectorAll('.hero .anim-item').forEach(function (el) {
        el.classList.add('visible');
      });
    }, 2000);
  });

  // ===== Hero Slider =====
  const slides = document.querySelectorAll('.slide');
  const sliderDots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides.forEach(function (s) { s.classList.remove('active'); });
    sliderDots.forEach(function (d) { d.classList.remove('active'); });
    slides[index].classList.add('active');
    sliderDots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetSlider() {
    clearInterval(slideInterval);
    startSlider();
  }

  sliderDots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'), 10);
      goToSlide(index);
      resetSlider();
    });
  });

  function prevSlide() {
    const prev = currentSlide - 1 < 0 ? slides.length - 1 : currentSlide - 1;
    goToSlide(prev);
  }

  var heroSlider = document.querySelector('.hero-slider');
  if (heroSlider) {
    var touchStartX = 0;
    var touchEndX = 0;
    heroSlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    heroSlider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].clientX;
      var delta = touchStartX - touchEndX;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) nextSlide();
      else prevSlide();
      resetSlider();
    }, { passive: true });
  }

  startSlider();

  // ===== Header Scroll State =====
  const header = document.querySelector('.site-header');
  const indicators = document.querySelector('.section-indicators');

  function updateHeaderState() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ===== Mobile Menu =====
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // ===== Parallax Effect =====
  const parallaxBgs = document.querySelectorAll('.parallax-bg');

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxBgs.forEach(function (bg) {
      const speed = parseFloat(bg.getAttribute('data-speed')) || 0.3;
      const section = bg.parentElement;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollY;
      const offset = (scrollY - sectionTop) * speed;
      bg.style.transform = 'translateY(' + offset + 'px)';
    });
  }

  // ===== Section Indicators =====
  const sectionIds = ['hero', 'concept', 'experience', 'flow', 'information', 'reserve'];
  const darkSections = ['reserve'];

  function updateIndicators() {
    const scrollY = window.scrollY;
    const viewportMid = scrollY + window.innerHeight * 0.5;

    let activeId = sectionIds[0];
    for (let i = 0; i < sectionIds.length; i++) {
      const el = document.getElementById(sectionIds[i]);
      if (!el) continue;
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (viewportMid >= top && viewportMid < top + height) {
        activeId = sectionIds[i];
        break;
      }
      if (viewportMid < top) break;
      activeId = sectionIds[i];
    }

    document.querySelectorAll('.section-indicators .indicator').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-section') === activeId);
    });

    // Update indicator color based on section
    if (darkSections.includes(activeId)) {
      indicators.classList.add('light');
    } else {
      indicators.classList.remove('light');
    }
  }

  // ===== Scroll Animations =====
  const animItems = document.querySelectorAll('.anim-item:not(.hero .anim-item)');

  function checkAnimations() {
    const triggerPoint = window.innerHeight * 0.85;
    animItems.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        el.classList.add('visible');
      }
    });
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Scroll Event Handler =====
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateHeaderState();
        updateIndicators();
        updateParallax();
        checkAnimations();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll);

  // Initial calls
  updateHeaderState();
  updateIndicators();
  checkAnimations();

  // ===== Resize Handler =====
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      updateParallax();
    }, 100);
  });

})();
