const body = document.body;
const beginButton = document.getElementById('beginCelebration');
const transitionLayer = document.querySelector('.page-transition');
const revealEls = document.querySelectorAll('.reveal');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.querySelector('.close-lightbox');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const cake = document.getElementById('birthdayCake');
const makeWishButton = document.getElementById('makeWish');
const surpriseSection = document.querySelector('.surprise');
const surpriseButton = document.getElementById('revealSurprise');
const petalLayer = document.querySelector('.petal-layer');
const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
const allPhotoSources = [
  'images/hero.jpeg',
  'images/photo%201.jpeg',
  'images/photo%202.jpeg',
  'images/photo%203.jpeg',
  'images/photo%204.jpeg',
  'images/photo%205.jpeg',
  'images/photo%206.jpeg',
  'images/photo%207.jpeg',
  'images/photo%208.jpeg',
  'images/special%20photo.jpeg',
  'images/extra%20photo.jpeg'
];

let currentLightboxIndex = 0;

function revealOnScroll() {
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.01 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function setupMobileNav() {
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function triggerReveal() {
  const targetSection = document.getElementById('message');

  if (!transitionLayer || !targetSection) {
    window.location.href = 'message.html';
    return;
  }

  transitionLayer.classList.add('active');
  setTimeout(() => {
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 500);
  setTimeout(() => {
    transitionLayer.classList.remove('active');
  }, 1400);
}

function buildPetals() {
  if (!petalLayer) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = reducedMotion ? 10 : 26;

  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'petal';
    const left = Math.random() * 100;
    const duration = 12 + Math.random() * 12;
    const delay = Math.random() * 16;
    const size = 12 + Math.random() * 22;
    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.15}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.transform = `rotate(${Math.random() * 180}deg)`;
    petalLayer.appendChild(petal);
  }
}

function openLightbox(index) {
  if (!lightbox || !lightboxImage || !galleryImages.length) return;

  currentLightboxIndex = index;
  lightboxImage.src = galleryImages[index].src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateLightbox(index) {
  if (!lightboxImage || !galleryImages.length) return;

  currentLightboxIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentLightboxIndex].src;
}

function closeLightboxView() {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function bindLightbox() {
  if (!lightbox || !closeLightbox || !prevButton || !nextButton || !galleryImages.length) return;

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeLightbox.addEventListener('click', closeLightboxView);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightboxView();
  });

  prevButton.addEventListener('click', () => updateLightbox(currentLightboxIndex - 1));
  nextButton.addEventListener('click', () => updateLightbox(currentLightboxIndex + 1));

  window.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightboxView();
    if (event.key === 'ArrowRight') updateLightbox(currentLightboxIndex + 1);
    if (event.key === 'ArrowLeft') updateLightbox(currentLightboxIndex - 1);
  });
}

function addFireworks() {
  const fireworks = document.createElement('div');
  fireworks.className = 'fireworks';
  fireworks.style.position = 'fixed';
  fireworks.style.inset = '0';
  fireworks.style.pointerEvents = 'none';
  fireworks.style.zIndex = '120';

  for (let i = 0; i < 22; i += 1) {
    const burst = document.createElement('span');
    const left = 12 + Math.random() * 76;
    const top = 12 + Math.random() * 46;
    const size = 8 + Math.random() * 12;
    const colors = ['#f4d77a', '#fffaf4', '#d7b7ff', '#ffbfd5'];
    burst.style.position = 'absolute';
    burst.style.left = `${left}%`;
    burst.style.top = `${top}%`;
    burst.style.width = `${size}px`;
    burst.style.height = `${size}px`;
    burst.style.borderRadius = '50%';
    burst.style.background = colors[i % colors.length];
    burst.style.boxShadow = `0 0 12px ${colors[i % colors.length]}, 0 0 28px ${colors[i % colors.length]}`;
    burst.style.animation = `fireworkPop ${1.2 + Math.random() * 0.7}s ease-out forwards`;
    burst.style.opacity = '0';
    fireworks.appendChild(burst);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes fireworkPop {
      0% { transform: scale(0.2); opacity: 0; }
      20% { opacity: 1; }
      100% { transform: scale(1.8) translateY(-30px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  body.appendChild(fireworks);

  setTimeout(() => fireworks.remove(), 1800);
  setTimeout(() => style.remove(), 2000);
}

function handleCakeClick() {
  if (!cake || !makeWishButton) return;

  cake.classList.add('cake-blown');
  makeWishButton.textContent = 'Wish Made ✨';
  addFireworks();

  const sparkleNodes = document.querySelectorAll('.candle.flame');
  sparkleNodes.forEach((node) => {
    node.style.opacity = '0';
    node.style.transition = 'opacity 0.6s ease';
  });

  const message = document.createElement('div');
  message.textContent = 'Hope your special day is full of good food, great laughter, and lots of happiness.';
  message.style.position = 'fixed';
  message.style.left = '50%';
  message.style.top = '18%';
  message.style.transform = 'translateX(-50%)';
  message.style.padding = '16px 24px';
  message.style.borderRadius = '999px';
  message.style.background = 'rgba(26, 18, 42, 0.8)';
  message.style.border = '1px solid rgba(255,255,255,0.12)';
  message.style.color = '#ffe8af';
  message.style.fontWeight = '700';
  message.style.zIndex = '140';
  message.style.boxShadow = '0 20px 38px rgba(0,0,0,0.18)';
  body.appendChild(message);

  setTimeout(() => message.remove(), 1800);
}

function revealSurprise() {
  if (!surpriseSection || !surpriseButton) return;

  surpriseSection.classList.add('active');
  addFireworks();
  surpriseButton.textContent = 'Surprise Unlocked ✨';
  surpriseButton.disabled = true;
}

function setFallbackImages() {
  allPhotoSources.forEach((src) => {
    const image = new Image();
    image.src = src;
    image.onerror = function () {
      console.warn(`Missing image: ${src}. Add your own photograph to this folder.`);
    };
  });

  document.querySelectorAll('img').forEach((img) => {
    img.onerror = function () {
      const fallback = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop stop-color="#291d4a" offset="0%"/>
              <stop stop-color="#7d4f8a" offset="50%"/>
              <stop stop-color="#f2b45f" offset="100%"/>
            </linearGradient>
          </defs>
          <rect width="1200" height="900" fill="url(#g)"/>
          <circle cx="600" cy="330" r="180" fill="rgba(255,255,255,0.12)"/>
          <text x="50%" y="52%" text-anchor="middle" fill="#fffaf2" font-size="70" font-family="Arial, sans-serif" font-weight="700">Replace with a photo</text>
        </svg>
      `);
      img.src = fallback;
    };
  });
}

if (beginButton) beginButton.addEventListener('click', triggerReveal);
if (cake) cake.addEventListener('click', handleCakeClick);
if (makeWishButton) makeWishButton.addEventListener('click', handleCakeClick);
if (surpriseButton) surpriseButton.addEventListener('click', revealSurprise);

revealOnScroll();
setupMobileNav();
buildPetals();
bindLightbox();
setFallbackImages();
