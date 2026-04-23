// =========================================
// ELEMENTS
// =========================================

const slidesContainer = document.getElementById('slides-container');
const allSlides = Array.from(document.querySelectorAll('.slide'));
const heroSlide = document.getElementById('slide-0');
const bottomBar = document.getElementById('bottom-bar');
const counter = document.getElementById('counter');
const studySection = document.getElementById('participants');

const learnMoreBtn = document.getElementById('learn-more');
const enterBtn = document.getElementById('enter');
const navRestart = document.getElementById('nav-restart');
const navParticipants = document.getElementById('nav-participants');

// pyramid slides = everything except hero
const pyramidSlides = allSlides.filter(slide => slide.id !== 'slide-0');
const totalPyramid = pyramidSlides.length;

// =========================================
// STATE
// =========================================

let current = 0;
let pyramidStarted = false;
let transitionLock = false;

const FADE_DURATION = 550;

// =========================================
// HELPERS
// =========================================

function updateCounter() {
  const num = String(current + 1).padStart(2, '0');
  const tot = String(totalPyramid).padStart(2, '0');
  counter.textContent = `${num} / ${tot}`;
}

function hideAllSlides() {
  allSlides.forEach(slide => {
    slide.classList.remove('active');
    const content = slide.querySelector('.slide-content');
    if (content) content.style.opacity = '1';
  });
}

function showHero() {
  hideAllSlides();
  heroSlide.classList.add('active');
}

function showPyramidSlide(index) {
  if (index < 0 || index >= pyramidSlides.length) return;
  hideAllSlides();
  pyramidSlides[index].classList.add('active');
  const content = pyramidSlides[index].querySelector('.slide-content');
  if (content) content.style.opacity = '1';
  current = index;
  updateCounter();
}

function goToSlide(index) {
  if (!pyramidStarted) return;
  if (transitionLock) return;
  if (index < 0 || index >= pyramidSlides.length) return;
  if (index === current) return;

  const currentSlide = pyramidSlides[current];
  const nextSlide = pyramidSlides[index];
  const currentContent = currentSlide.querySelector('.slide-content');
  const nextContent = nextSlide.querySelector('.slide-content');

  transitionLock = true;

  if (currentContent) currentContent.style.opacity = '0';

  setTimeout(() => {
    currentSlide.classList.remove('active');
    nextSlide.classList.add('active');

    if (nextContent) {
      nextContent.style.opacity = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          nextContent.style.opacity = '1';
        });
      });
    }

    current = index;
    updateCounter();
    transitionLock = false;
  }, FADE_DURATION);
}

function enterStudySection() {
  // Fade out the hero first
  heroSlide.style.transition = 'opacity 0.6s ease';
  heroSlide.style.opacity = '0';

  setTimeout(() => {
    slidesContainer.style.display = 'none';
    bottomBar.style.display = 'none';
    document.body.classList.add('study-open');

    studySection.classList.remove('hidden');
    studySection.style.opacity = '0';
    studySection.style.transition = 'opacity 0.6s ease';

    window.scrollTo({ top: 0, behavior: 'auto' });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        studySection.style.opacity = '1';
      });
    });

    heroSlide.style.opacity = '1';
  }, 600);
}

function resetToBeginning() {
  pyramidStarted = false;
  current = 0;
  transitionLock = false;

  studySection.classList.add('hidden');
  document.body.classList.remove('study-open');

  slidesContainer.style.display = 'block';
  bottomBar.style.display = '';
  bottomBar.classList.add('hidden');

  showHero();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

// =========================================
// INITIAL STATE
// =========================================

resetToBeginning();

// =========================================
// EVENTS
// =========================================

// "Get to know the participants" — goes straight to study section
learnMoreBtn.addEventListener('click', () => {
  enterStudySection();
});

// keyboard nav
document.addEventListener('keydown', (e) => {
  if (!pyramidStarted) return;

  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    goToSlide(current + 1);
  }

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    goToSlide(current - 1);
  }
});

// down arrow — enter study section
if (enterBtn) {
  enterBtn.addEventListener('click', () => {
    enterStudySection();
  });
}

// nav — participants
navParticipants.addEventListener('click', (e) => {
  e.preventDefault();
  enterStudySection();
});

// nav — restart
navRestart.addEventListener('click', (e) => {
  e.preventDefault();
  resetToBeginning();
});

// =========================================
// VIDEO HOVER
// =========================================

document.querySelectorAll('.artifact-card video').forEach(video => {
  const card = video.closest('.artifact-card');

  card.addEventListener('mouseenter', () => {
    video.muted = false;
    video.play();
  });

  card.addEventListener('mouseleave', () => {
    video.muted = true;
    video.pause();
    video.currentTime = 0;
  });
});

// =========================================
// CURSOR
// =========================================

const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
});