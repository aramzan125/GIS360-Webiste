(() => {
    'use strict';

    const sections = document.querySelectorAll('.gis360-global-coverage');

    if (!sections.length || !('IntersectionObserver' in window)) {
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const replayBars = (section) => {
        if (reduceMotion) {
            return;
        }

        section.querySelectorAll('.gis360-coverage-fill').forEach((bar) => {
            bar.style.animation = 'none';
            void bar.offsetWidth;
            bar.style.removeProperty('animation');
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                replayBars(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -15% 0px',
        threshold: 0.25,
    });

    sections.forEach((section) => observer.observe(section));
})();
