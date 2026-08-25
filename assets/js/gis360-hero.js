(() => {
  const rotatingService = document.querySelector('[data-gis360-hero-rotator]');

  if (!rotatingService || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const rotatingPhrases = [
    'Managed IT Services',
    'Cybersecurity Support',
    'Help Desk Support',
    'Network Support',
    'ERP Services',
    'Remote Work Solutions',
  ];

  let activePhrase = 0;

  window.setInterval(() => {
    activePhrase = (activePhrase + 1) % rotatingPhrases.length;
    rotatingService.classList.add('is-changing');

    window.setTimeout(() => {
      rotatingService.textContent = rotatingPhrases[activePhrase];
      rotatingService.classList.remove('is-changing');
    }, 240);
  }, 2600);
})();
