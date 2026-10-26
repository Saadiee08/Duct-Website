/* Browser Extension Compatibility Guard (Getter-Only window.fetch & Extension Error Isolation) */
(function () {
  'use strict';

  if (typeof window === 'undefined') return;

  try {
    var ownDesc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (
      ownDesc &&
      typeof ownDesc.get === 'function' &&
      typeof ownDesc.set === 'undefined' &&
      ownDesc.configurable
    ) {
      var currentOwnFetch = ownDesc.get.call(window);
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        enumerable: ownDesc.enumerable !== false,
        get: function () {
          return currentOwnFetch;
        },
        set: function (nextFetch) {
          if (typeof nextFetch === 'function') {
            currentOwnFetch = nextFetch;
          }
        }
      });
    } else if (
      !ownDesc &&
      typeof Window !== 'undefined' &&
      Window.prototype
    ) {
      var protoDesc = Object.getOwnPropertyDescriptor(Window.prototype, 'fetch');
      if (
        protoDesc &&
        typeof protoDesc.get === 'function' &&
        typeof protoDesc.set === 'undefined'
      ) {
        var currentProtoFetch = protoDesc.get.call(window);
        Object.defineProperty(window, 'fetch', {
          configurable: true,
          enumerable: true,
          get: function () {
            return currentProtoFetch;
          },
          set: function (nextFetch) {
            if (typeof nextFetch === 'function') {
              currentProtoFetch = nextFetch;
            }
          }
        });
      }
    }
  } catch (_err) {
    // Host descriptor is non-configurable; continue safely
  }

  var extPattern = /^(chrome|moz|safari-web)-extension:\/\//i;

  window.addEventListener(
    'error',
    function (ev) {
      var file = (ev && ev.filename) || '';
      var stack = (ev && ev.error && ev.error.stack) || '';
      if (extPattern.test(file) || extPattern.test(stack)) {
        ev.stopImmediatePropagation();
        ev.preventDefault();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    function (ev) {
      var reason = ev && ev.reason;
      var stack = (reason && reason.stack) || String(reason || '');
      if (extPattern.test(stack)) {
        ev.stopImmediatePropagation();
        ev.preventDefault();
      }
    },
    true
  );
})();
