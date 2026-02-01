/**
 * Valentine App - Logique frontend
 * - Bouton "Non" qui se déplace pour éviter le clic
 * - Bouton "Oui" : grandit 5 fois (1 clic = 1 taille), au 5e clic → confettis + message "9h pour notre sortie"
 */

(function () {
  const btnOui = document.getElementById('btn-oui');
  const btnNon = document.getElementById('btn-non');
  const questionScreen = document.getElementById('question-screen');
  const successScreen = document.getElementById('success-screen');
  const confettiContainer = document.getElementById('confetti-container');
  const heartsContainer = document.getElementById('hearts-container');
  const bgMusic = document.getElementById('bg-music');
  const btnMusic = document.getElementById('btn-music');

  // ---- Musique romantique en fond ----
  if (bgMusic && btnMusic) {
    btnMusic.addEventListener('click', function () {
      if (bgMusic.paused) {
        bgMusic.play().catch(function () {});
        btnMusic.classList.add('playing');
        btnMusic.textContent = '♫';
      } else {
        bgMusic.pause();
        btnMusic.classList.remove('playing');
        btnMusic.textContent = '♫';
      }
    });
    bgMusic.addEventListener('play', function () { btnMusic.classList.add('playing'); });
    bgMusic.addEventListener('pause', function () { btnMusic.classList.remove('playing'); });
  }

  // ---- Bouton "Non" qui fuit ----
  const buttonsWrap = document.querySelector('.buttons');
  let nonPosition = { x: 0, y: 0 };

  function getRandomPosition() {
    const rect = buttonsWrap.getBoundingClientRect();
    const maxX = rect.width - btnNon.offsetWidth - 20;
    const maxY = rect.height - btnNon.offsetHeight - 20;
    const x = Math.max(0, Math.random() * maxX);
    const y = Math.max(0, Math.random() * maxY);
    return { x, y };
  }

  function moveNonButton() {
    nonPosition = getRandomPosition();
    btnNon.style.left = nonPosition.x + 'px';
    btnNon.style.top = nonPosition.y + 'px';
  }

  btnNon.addEventListener('mouseenter', moveNonButton);
  btnNon.addEventListener('touchstart', function (e) {
    e.preventDefault();
    moveNonButton();
  });
  btnNon.addEventListener('click', function (e) {
    e.preventDefault();
    moveNonButton();
  });

  function initNonPosition() {
    const rect = buttonsWrap.getBoundingClientRect();
    btnNon.style.left = rect.width / 2 + 20 + 'px';
    btnNon.style.top = '50%';
    btnNon.style.transform = 'translateY(-50%)';
  }
  initNonPosition();

  // ---- Bouton "Oui" : grandit 5 fois, au 5e clic → confettis + écran succès (9h) ----
  const CLICKS_NEEDED = 5;
  const SCALES = [1, 1.25, 1.5, 1.75, 2]; // 5 tailles (dont la 1ère = taille de base)
  let ouiClickCount = 0;

  btnOui.addEventListener('click', function () {
    ouiClickCount++;
    if (ouiClickCount <= CLICKS_NEEDED) {
      btnOui.style.transform = 'scale(' + SCALES[ouiClickCount - 1] + ')';
    }
    if (ouiClickCount === CLICKS_NEEDED) {
      questionScreen.classList.add('hidden');
      successScreen.classList.remove('hidden');
      launchConfetti();
      launchHearts();
    }
  });

  // Confettis très romantiques (rose, rouge, paillettes)
  const confettiColors = ['#ff85a2', '#e6396b', '#ffb3c6', '#c9184a', '#ffd6e0', '#ff9ebb'];

  function launchConfetti() {
    const count = 60;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'confetti';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-10px';
        el.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        el.style.animationDuration = 3 + Math.random() * 2 + 's';
        el.style.animationDelay = Math.random() * 0.5 + 's';
        confettiContainer.appendChild(el);
        setTimeout(() => el.remove(), 6000);
      }, i * 35);
    }
  }

  const heartEmojis = ['❤️', '💕', '💖', '💗', '💓', '💝', '🌹', '✨'];

  function launchHearts() {
    const count = 18;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.className = 'heart-float';
        el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.bottom = '-20px';
        el.style.color = '#e6396b';
        el.style.fontSize = (14 + Math.random() * 14) + 'px';
        el.style.animationDuration = 4 + Math.random() * 2 + 's';
        el.style.animationDelay = Math.random() * 1 + 's';
        heartsContainer.appendChild(el);
        setTimeout(() => el.remove(), 7000);
      }, i * 150);
    }
  }
})();
