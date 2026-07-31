const images = [
  'resources/images/01_Attack_on_Oakhollow.jpg',
  'resources/images/02_b_the_forest_english.jpg',
  'resources/images/02_the_forest_runes.jpg',
  'resources/images/03_brigde.jpg',
  'resources/images/04_1_blackstone_room1.jpg',
  'resources/images/04_2_blackstone_room2.jpg',
  'resources/images/04_3_final_battle.jpg'
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

images.forEach(src => {
  const a = document.createElement('a');
  a.href = src;
  a.addEventListener('click', e => {
    e.preventDefault();
    lightboxImg.src = src;
    lightbox.classList.add('open');
  });
  const img = document.createElement('img');
  img.src = src;
  img.alt = src.split('/').pop();
  a.appendChild(img);
  gallery.appendChild(a);
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('open');
  }
});
