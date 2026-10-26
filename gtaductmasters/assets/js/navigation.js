/* Modular Responsive Navigation & Progressive Page Transition Controller */
(function () {
  'use strict';

  var toggleBtn = document.querySelector('[data-nav-toggle]');
  var mobileDrawer = document.getElementById('mobile-nav-drawer');

  function closeDrawer() {
    if (!toggleBtn || !mobileDrawer) return;
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('hidden', '');
  }

  if (toggleBtn && mobileDrawer) {
    toggleBtn.addEventListener('click', function () {
      var expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeDrawer();
      } else {
        toggleBtn.setAttribute('aria-expanded', 'true');
        mobileDrawer.removeAttribute('hidden');
      }
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') {
        closeDrawer();
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Dynamic copyright year
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // Resilient secondary path fallback for critical images (CSP-compliant, no inline handlers)
  document.querySelectorAll('img[data-fallback-src]').forEach(function (img) {
    function tryFallback() {
      var fallback = img.getAttribute('data-fallback-src');
      if (!fallback || img.getAttribute('data-fallback-applied') === 'true') {
        return;
      }
      img.setAttribute('data-fallback-applied', 'true');
      img.setAttribute('src', fallback);
    }

    img.addEventListener('error', tryFallback);
    if (img.complete && img.naturalWidth === 0) {
      tryFallback();
    }
  });

  // Restore visibility immediately on bfcache back/forward navigation
  window.addEventListener('pageshow', function () {
    document.body.classList.remove('is-leaving');
  });

  // Subtle progressive transition between internal HTML documents
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) {
    document.querySelectorAll('a[data-page-transition]').forEach(function (anchor) {
      anchor.addEventListener('click', function (ev) {
        if (
          ev.defaultPrevented ||
          ev.button !== 0 ||
          ev.metaKey ||
          ev.ctrlKey ||
          ev.shiftKey ||
          ev.altKey
        ) {
          return;
        }
        var href = anchor.getAttribute('href');
        if (!href || href.charAt(0) === '#' || anchor.target === '_blank') {
          return;
        }
        ev.preventDefault();
        document.body.classList.add('is-leaving');
        window.setTimeout(function () {
          window.location.assign(href);
        }, 120);
      });
    });
  }
})();
