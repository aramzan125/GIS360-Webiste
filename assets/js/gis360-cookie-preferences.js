(function () {
    'use strict';

    var modal = document.querySelector('[data-gis360-cookie-modal]');
    if (!modal) return;

    var dialog = modal.querySelector('[role="dialog"]');
    var banner = document.querySelector('[data-gis360-cookie-banner]');
    var optional = modal.querySelector('[data-gis360-optional-cookies]');
    var triggers = document.querySelectorAll('.gis360-cookie-preferences-trigger');
    var closeButtons = modal.querySelectorAll('[data-gis360-cookie-close]');
    var saveButton = modal.querySelector('[data-gis360-cookie-save]');
    var acceptButtons = document.querySelectorAll('[data-gis360-cookie-accept]');
    var rejectButtons = document.querySelectorAll('[data-gis360-cookie-reject]');
    var storageKey = 'gis360_cookie_preferences';
    var lastFocused = null;

    function readPreferences() {
        try {
            return JSON.parse(localStorage.getItem(storageKey));
        } catch (error) {
            return null;
        }
    }

    function writePreferences(allowOptional) {
        try {
            localStorage.setItem(storageKey, JSON.stringify({
                necessary: true,
                optional: allowOptional,
                updatedAt: new Date().toISOString()
            }));
        } catch (error) {
            // The consent controls remain usable when browser storage is unavailable.
        }
        if (banner) banner.hidden = true;
    }

    function openModal() {
        lastFocused = document.activeElement;
        var preferences = readPreferences();
        optional.checked = Boolean(preferences && preferences.optional);
        if (banner) banner.hidden = true;
        modal.hidden = false;
        document.body.classList.add('gis360-cookie-modal-open');
        window.setTimeout(function () { dialog.focus(); }, 0);
    }

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove('gis360-cookie-modal-open');
        if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(function (trigger) { trigger.addEventListener('click', openModal); });
    closeButtons.forEach(function (button) { button.addEventListener('click', closeModal); });

    acceptButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            writePreferences(true);
            optional.checked = true;
            if (!modal.hidden) closeModal();
        });
    });

    rejectButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            writePreferences(false);
            optional.checked = false;
            if (!modal.hidden) closeModal();
        });
    });

    saveButton.addEventListener('click', function () {
        writePreferences(optional.checked);
        closeModal();
    });

    document.addEventListener('keydown', function (event) {
        if (modal.hidden) return;
        if (event.key === 'Escape') {
            closeModal();
            return;
        }
        if (event.key !== 'Tab') return;

        var focusable = Array.prototype.slice.call(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'));
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    if (banner && window.self === window.top && !readPreferences()) banner.hidden = false;
}());
