/* Interactive Gallery Lightbox & Verified Customer Review Filter Module */
(function () {
  'use strict';

  // Accessible <dialog> Lightbox for Before & After Gallery
  var dialog = document.getElementById('gallery-lightbox');
  var dialogImg = document.getElementById('gallery-lightbox-img');
  var dialogCaption = document.getElementById('gallery-lightbox-caption');
  var dialogClose = document.getElementById('gallery-lightbox-close');

  if (dialog && dialogImg) {
    document.querySelectorAll('[data-lightbox-src]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var src = btn.getAttribute('data-lightbox-src') || '';
        var alt = btn.getAttribute('data-lightbox-alt') || '';
        dialogImg.setAttribute('src', src);
        dialogImg.setAttribute('alt', alt);
        if (dialogCaption) {
          dialogCaption.textContent = alt;
        }
        if (typeof dialog.showModal === 'function') {
          dialog.showModal();
        } else {
          dialog.removeAttribute('hidden');
        }
      });
    });

    if (dialogClose) {
      dialogClose.addEventListener('click', function () {
        if (typeof dialog.close === 'function') {
          dialog.close();
        } else {
          dialog.setAttribute('hidden', '');
        }
      });
    }

    dialog.addEventListener('click', function (ev) {
      if (ev.target === dialog && typeof dialog.close === 'function') {
        dialog.close();
      }
    });
  }

  // Interactive Review Category Filter
  var filterButtons = document.querySelectorAll('[data-review-filter]');
  var reviewCards = document.querySelectorAll('[data-review-category]');
  var reviewCountLabel = document.querySelector('[data-review-count]');

  if (filterButtons.length && reviewCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var selected = btn.getAttribute('data-review-filter') || 'all';
        filterButtons.forEach(function (b) {
          b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
        });

        var visibleCount = 0;
        reviewCards.forEach(function (card) {
          var cat = card.getAttribute('data-review-category') || '';
          var match = selected === 'all' || cat === selected;
          if (match) {
            card.removeAttribute('hidden');
            visibleCount += 1;
          } else {
            card.setAttribute('hidden', '');
          }
        });

        if (reviewCountLabel) {
          reviewCountLabel.textContent =
            'Showing ' + visibleCount + ' verified ' + (visibleCount === 1 ? 'review' : 'reviews');
        }
      });
    });
  }
})();
