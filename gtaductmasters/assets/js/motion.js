/* Progressive GSAP + ScrollTrigger Motion Choreography Engine */
(function () {
  'use strict';

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Populate KPI counters immediately if reduced motion or no GSAP
  function setFinalCounters() {
    document.querySelectorAll('[data-counter-target]').forEach(function (el) {
      var target = Number(el.getAttribute('data-counter-target') || '0');
      el.textContent = target.toLocaleString();
    });
  }

  if (prefersReduced || typeof window.gsap === 'undefined') {
    setFinalCounters();
    return;
  }

  var gsap = window.gsap;
  if (window.ScrollTrigger) {
    gsap.registerPlugin(window.ScrollTrigger);
  }

  var profile = document.body.getAttribute('data-motion-profile') || 'whisper-stagger';
  var isMobile = window.innerWidth < 768;

  // Profile-specific entrance parameters (compositor-friendly transform & opacity)
  var profileConfig = {
    'parent-executive': { y: 20, x: 0, scale: 1, duration: 0.68, stagger: 0.08 },
    'curtain-reveal': { y: 22, x: 0, scale: 1, duration: 0.72, stagger: 0.09 },
    'whisper-stagger': { y: 14, x: 0, scale: 1, duration: 0.6, stagger: 0.06 },
    'slide-mask': { y: 0, x: -20, scale: 1, duration: 0.65, stagger: 0.08 },
    'geometric-wipe': { y: 16, x: 12, scale: 1, duration: 0.58, stagger: 0.07 },
    'organic-settle': { y: 18, x: 0, scale: 0.985, duration: 0.74, stagger: 0.09 },
    'line-rise': { y: 24, x: 0, scale: 1, duration: 0.7, stagger: 0.08 },
    'monochrome-snap': { y: 12, x: 0, scale: 1, duration: 0.48, stagger: 0.05 },
    'warm-ease': { y: 18, x: 0, scale: 0.99, duration: 0.7, stagger: 0.08 },
    'page-leaf': { y: 15, x: -8, scale: 1, duration: 0.64, stagger: 0.07 },
    'architectural-parallax': { y: 20, x: 0, scale: 0.99, duration: 0.68, stagger: 0.08 }
  };

  var cfg = profileConfig[profile] || profileConfig['whisper-stagger'];
  var distanceScale = isMobile ? 0.55 : 1;

  // Hero entrance sequence
  var heroItems = document.querySelectorAll('[data-hero-animate]');
  if (heroItems.length) {
    gsap.from(heroItems, {
      opacity: 0,
      y: cfg.y * distanceScale,
      x: cfg.x * distanceScale,
      scale: cfg.scale,
      duration: cfg.duration,
      stagger: cfg.stagger,
      ease: 'power3.out',
      clearProps: 'transform,opacity'
    });
  }

  var heroMedia = document.querySelector('[data-hero-media]');
  if (heroMedia) {
    gsap.from(heroMedia, {
      opacity: 0,
      scale: 1.03,
      duration: cfg.duration + 0.12,
      ease: 'power2.out',
      clearProps: 'transform,opacity'
    });
  }

  // Scroll-triggered reveals
  if (window.ScrollTrigger) {
    document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
      var children = group.querySelectorAll('[data-reveal-item]');
      var targets = children.length ? children : [group];
      gsap.from(targets, {
        scrollTrigger: {
          trigger: group,
          start: 'top 88%',
          once: true
        },
        opacity: 0,
        y: 18 * distanceScale,
        duration: 0.6,
        stagger: children.length ? 0.07 : 0,
        ease: 'power2.out',
        clearProps: 'transform,opacity'
      });
    });

    // Animated KPI counters on Parent Website
    document.querySelectorAll('[data-counter-target]').forEach(function (el) {
      var target = Number(el.getAttribute('data-counter-target') || '0');
      var state = { val: 0 };
      gsap.to(state, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true
        },
        onUpdate: function () {
          el.textContent = Math.round(state.val).toLocaleString();
        }
      });
    });
  } else {
    setFinalCounters();
  }
})();
