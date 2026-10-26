/* Secure Quote Inquiry Form Client Module (Validation + Server API + Mailto/WhatsApp Handoff) */
(function () {
  'use strict';

  var renderedAt = Date.now();

  document.querySelectorAll('form[data-quote-form]').forEach(function (form) {
    var companyName = form.getAttribute('data-company-name') || 'GTA Duct Masters';
    var nameInput = form.querySelector('input[name="name"]');
    var phoneInput = form.querySelector('input[name="phone"]');
    var serviceSelect = form.querySelector('select[name="service"]');
    var messageInput = form.querySelector('textarea[name="message"]');
    var honeypotInput = form.querySelector('input[name="website"]');
    var errorBanner = form.querySelector('[data-form-error]');
    var submitBtn = form.querySelector('button[type="submit"]');
    var confirmationBox = form.parentElement
      ? form.parentElement.querySelector('[data-form-confirmation]')
      : null;

    function showError(message, invalidField) {
      [nameInput, phoneInput, serviceSelect, messageInput].forEach(function (el) {
        if (el) el.removeAttribute('aria-invalid');
      });
      if (invalidField) {
        invalidField.setAttribute('aria-invalid', 'true');
        invalidField.focus();
      }
      if (errorBanner) {
        errorBanner.textContent = message;
        errorBanner.removeAttribute('hidden');
      }
    }

    function clearError() {
      [nameInput, phoneInput, serviceSelect, messageInput].forEach(function (el) {
        if (el) el.removeAttribute('aria-invalid');
      });
      if (errorBanner) {
        errorBanner.textContent = '';
        errorBanner.setAttribute('hidden', '');
      }
    }

    // Pre-select service when clicking a service card CTA with data-select-service
    document.querySelectorAll('[data-select-service]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var desired = trigger.getAttribute('data-select-service');
        if (desired && serviceSelect) {
          serviceSelect.value = desired;
        }
      });
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      clearError();

      var nameVal = nameInput ? nameInput.value.trim() : '';
      var phoneVal = phoneInput ? phoneInput.value.trim() : '';
      var serviceVal = serviceSelect ? serviceSelect.value.trim() : '';
      var messageVal = messageInput ? messageInput.value.trim() : '';
      var honeypotVal = honeypotInput ? honeypotInput.value.trim() : '';

      if (nameVal.length < 2) {
        showError('Please enter your full name (at least 2 characters).', nameInput);
        return;
      }

      var digits = phoneVal.replace(/\D/g, '');
      if (digits.length < 7 || digits.length > 15 || !/^[0-9+().\-\s]+$/.test(phoneVal)) {
        showError('Please enter a valid phone number (7 to 15 digits).', phoneInput);
        return;
      }

      var originalLabel = submitBtn ? submitBtn.textContent : 'Submit Request';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      var payload = {
        company: companyName,
        name: nameVal,
        phone: phoneVal,
        service: serviceVal,
        message: messageVal,
        website: honeypotVal,
        renderedAt: renderedAt
      };

      function buildFallbackLinks() {
        var svc = serviceVal || 'General Service';
        var msg = messageVal || 'Please provide pricing for ' + svc + '.';
        var subject = '[' + companyName + '] Quote request from ' + nameVal;
        var body = [
          'Company Website: ' + companyName,
          'Name: ' + nameVal,
          'Phone: ' + phoneVal,
          'Service: ' + svc,
          'Message: ' + msg
        ].join('\n');
        return {
          mailtoHref:
            'mailto:devintaseff4@gmail.com?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body),
          whatsappHref:
            'https://wa.me/16475576364?text=' +
            encodeURIComponent(
              'Hi ' + companyName + ', my name is ' + nameVal + ' (' + phoneVal + '). I need a quote for ' + svc + '. ' + msg
            )
        };
      }

      function renderConfirmed(links, summaryName, summaryService) {
        form.setAttribute('hidden', '');
        if (!confirmationBox) return;
        var summaryEl = confirmationBox.querySelector('[data-confirm-summary]');
        if (summaryEl) {
          summaryEl.textContent =
            'Thank you, ' +
            summaryName +
            '. Your inquiry for ' +
            summaryService +
            ' has been validated and prepared for dispatch.';
        }
        var mailBtn = confirmationBox.querySelector('[data-confirm-mailto]');
        if (mailBtn && links.mailtoHref) {
          mailBtn.setAttribute('href', links.mailtoHref);
        }
        var waBtn = confirmationBox.querySelector('[data-confirm-whatsapp]');
        if (waBtn && links.whatsappHref) {
          waBtn.setAttribute('href', links.whatsappHref);
        }
        confirmationBox.removeAttribute('hidden');
        confirmationBox.focus();
      }

      fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'QuoteInquiryClient'
        },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (res.status === 404 || res.status === 405) {
            // Static-only host fallback (e.g., pure static CDN deployment)
            var fallback = buildFallbackLinks();
            renderConfirmed(fallback, nameVal, serviceVal || 'General Service');
            return null;
          }
          return res.json().then(function (body) {
            return { ok: res.ok, body: body };
          });
        })
        .then(function (result) {
          if (!result) return;
          if (!result.ok || !result.body.ok) {
            var fieldMap = {
              name: nameInput,
              phone: phoneInput,
              service: serviceSelect,
              message: messageInput
            };
            var targetField = result.body && result.body.field ? fieldMap[result.body.field] : null;
            showError(
              (result.body && result.body.error) || 'Unable to submit your request. Please check your entries.',
              targetField
            );
            return;
          }
          renderConfirmed(
            result.body.data,
            result.body.data.name,
            result.body.data.service
          );
        })
        .catch(function () {
          var fallback = buildFallbackLinks();
          renderConfirmed(fallback, nameVal, serviceVal || 'General Service');
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        });
    });

    if (confirmationBox) {
      var resetBtn = confirmationBox.querySelector('[data-confirm-reset]');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          form.reset();
          renderedAt = Date.now();
          confirmationBox.setAttribute('hidden', '');
          form.removeAttribute('hidden');
          if (nameInput) nameInput.focus();
        });
      }
    }
  });
})();
