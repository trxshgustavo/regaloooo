// ============================
// ROMANTIC PAGE — JAVASCRIPT
// ============================

// ---- Floating Petals ----
(function spawnPetals() {
  const container = document.getElementById('petals-container');
  const symbols = ['🌸', '🌺', '💮', '🌷', '🌹', '💕', '✨'];

  function createPetal() {
    const el = document.createElement('span');
    el.className = 'petal';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.7 + Math.random() * 1.0) + 'rem';
    el.style.animationDuration = (6 + Math.random() * 8) + 's';
    el.style.animationDelay = (Math.random() * 5) + 's';
    el.style.opacity = 0.5 + Math.random() * 0.4;
    container.appendChild(el);

    // Remove after animation
    setTimeout(() => el.remove(), 14000);
  }

  // Initial burst
  for (let i = 0; i < 10; i++) {
    setTimeout(createPetal, i * 300);
  }

  // Continuous spawn
  setInterval(createPetal, 1200);
})();


// ---- Hero BG Ken Burns ----
window.addEventListener('load', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }
});


// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ---- HTML5 Audio Player ----
const audio       = document.getElementById('audioPlayer');
const vinyl       = document.getElementById('vinylDisc');
const playIcon    = document.getElementById('playIcon');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl   = document.getElementById('totalTime');
const fileHint      = document.getElementById('fileHint');

function formatTime(secs) {
  if (isNaN(secs)) return '0:00';
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Once metadata loads, show total duration and hide the hint
audio.addEventListener('loadedmetadata', () => {
  totalTimeEl.textContent = formatTime(audio.duration);
  if (fileHint) fileHint.style.display = 'none';
});

// Update progress bar and current time while playing
audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  const pct = (audio.currentTime / audio.duration) * 100;
  progressFill.style.width = pct + '%';
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

// When song ends, reset UI
audio.addEventListener('ended', () => {
  vinyl.classList.remove('spinning');
  playIcon.textContent = '▶';
});

function togglePlay() {
  if (audio.paused) {
    audio.play().then(() => {
      vinyl.classList.add('spinning');
      playIcon.textContent = '⏸';
    }).catch(() => {
      // File not found yet
      if (fileHint) {
        fileHint.style.color = '#e57373';
        fileHint.innerHTML = '⚠️ Archivo no encontrado. Agrega <code>chicago.mp3</code> en la carpeta <code></code>';
      }
    });
  } else {
    audio.pause();
    vinyl.classList.remove('spinning');
    playIcon.textContent = '▶';
  }
}

function seekAudio(e) {
  const bg = document.getElementById('progressBg');
  const rect = bg.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
}

function setVolume(val) {
  audio.volume = parseFloat(val);
}

// Set initial volume
audio.volume = 0.8;


// ---- Smooth section transitions ----
const sections = document.querySelectorAll('.section, .hero, .footer');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.opacity = '1';
  });
}, { threshold: 0.05 });

sections.forEach(s => sectionObserver.observe(s));


// ---- Cursor heart trail (subtle) ----
let heartTimeout;
document.addEventListener('mousemove', (e) => {
  clearTimeout(heartTimeout);
  heartTimeout = setTimeout(() => {
    const heart = document.createElement('span');
    heart.textContent = ['💕', '✨', '🌸'][Math.floor(Math.random() * 3)];
    heart.style.cssText = `
      position: fixed;
      left: ${e.clientX - 10}px;
      top: ${e.clientY - 10}px;
      font-size: 1rem;
      pointer-events: none;
      z-index: 9999;
      animation: cursorFloat 1s ease forwards;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }, 60);
});

// Add cursor float keyframe dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes cursorFloat {
    0%   { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-40px) scale(0.5); }
  }
`;
document.head.appendChild(style);


// ---- Photo gallery: click to expand ----
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (!img) return;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.85);
      display: flex; align-items: center; justify-content: center;
      z-index: 10000; cursor: zoom-out;
      animation: fadeIn 0.3s ease;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = 'max-width: 90vw; max-height: 90vh; border-radius: 16px; box-shadow: 0 20px 80px rgba(0,0,0,0.5);';
    overlay.appendChild(bigImg);
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});

// Inject fadeIn for modal
const style2 = document.createElement('style');
style2.textContent = '@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }';
document.head.appendChild(style2);


// ---- Letter: typewriter reveal on scroll ----
const letterContent = document.querySelector('.letter-content');
if (letterContent) {
  const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const paras = letterContent.querySelectorAll('p');
        paras.forEach((p, i) => {
          p.style.opacity = '0';
          p.style.transform = 'translateY(20px)';
          p.style.transition = `opacity 0.5s ease ${i * 0.2}s, transform 0.5s ease ${i * 0.2}s`;
          setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 50 + i * 200);
        });
        letterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  letterObserver.observe(letterContent);
}
