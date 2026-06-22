const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('is-active');
  nav.classList.toggle('is-open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('is-active');
    nav.classList.remove('is-open');
  });
});

const plantasViewport = document.querySelector('.plantas__viewport');
const plantasTabs = document.querySelectorAll('.plantas__tab');
const plantasPanels = document.querySelectorAll('.plantas__panel');
const plantaPrev = document.getElementById('plantaPrev');
const plantaNext = document.getElementById('plantaNext');

if (plantasViewport) {
  const order = ['62', '71-1', '71-2'];
  const groupOf = { '62': '62', '71-1': '71', '71-2': '71' };
  let currentIndex = 0;

  const showPanel = () => {
    const panelName = order[currentIndex];
    plantasPanels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === panelName));
    plantasTabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === groupOf[panelName]));
    plantasViewport.classList.toggle('has-nav', groupOf[panelName] === '71');
  };

  plantasTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      currentIndex = order.findIndex(name => groupOf[name] === tab.dataset.tab);
      showPanel();
    });
  });

  plantaPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + order.length) % order.length;
    showPanel();
  });

  plantaNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % order.length;
    showPanel();
  });

  showPanel();
}

const lazerTracks = document.querySelectorAll('.lazer__track');
const lazerPrev = document.getElementById('lazerPrev');
const lazerNext = document.getElementById('lazerNext');
const lazerTabLazer = document.getElementById('lazerTabLazer');
const lazerTabApto = document.getElementById('lazerTabApto');

if (lazerTracks.length) {
  const updateMainSlide = (track) => {
    const slides = [...track.children];
    slides.forEach((slide, i) => {
      slide.classList.toggle('lazer__slide--main', i === 1);
    });
  };

  const getActiveTrack = () => document.querySelector('.lazer__track.is-active');

  lazerNext.addEventListener('click', () => {
    const track = getActiveTrack();
    track.appendChild(track.firstElementChild);
    updateMainSlide(track);
  });

  lazerPrev.addEventListener('click', () => {
    const track = getActiveTrack();
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    updateMainSlide(track);
  });

  lazerTabLazer.addEventListener('click', () => {
    lazerTabLazer.classList.add('is-active');
    lazerTabApto.classList.remove('is-active');
    document.getElementById('lazerTrackLazer').classList.add('is-active');
    document.getElementById('lazerTrackApto').classList.remove('is-active');
  });

  lazerTabApto.addEventListener('click', () => {
    lazerTabApto.classList.add('is-active');
    lazerTabLazer.classList.remove('is-active');
    document.getElementById('lazerTrackApto').classList.add('is-active');
    document.getElementById('lazerTrackLazer').classList.remove('is-active');
  });

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let lightboxIndex = 0;

  const openLightbox = (slide) => {
    const track = getActiveTrack();
    lightboxIndex = [...track.children].indexOf(slide);
    showLightboxSlide(track);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const showLightboxSlide = (track) => {
    const slides = [...track.children];
    const slide = slides[lightboxIndex];
    const img = slide.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.innerHTML = slide.querySelector('figcaption').innerHTML;
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.lazer__slide').forEach(slide => {
    slide.addEventListener('click', () => openLightbox(slide));
  });

  lightboxClose.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxPrev.addEventListener('click', () => {
    const track = getActiveTrack();
    lightboxIndex = (lightboxIndex - 1 + track.children.length) % track.children.length;
    showLightboxSlide(track);
  });

  lightboxNext.addEventListener('click', () => {
    const track = getActiveTrack();
    lightboxIndex = (lightboxIndex + 1) % track.children.length;
    showLightboxSlide(track);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });
}

const contatoForm = document.getElementById('contatoForm');

if (contatoForm) {
  contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Recebemos seu contato! Em breve falaremos com você.');
    contatoForm.reset();
  });
}
