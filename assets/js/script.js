const hamburgerBtn = document.getElementById('kk_hamburger_btn');
const closeBtn = document.getElementById('kk_drawer_close_btn');
const mobileDrawer = document.getElementById('kk_mobile_drawer');
const mobileOverlay = document.getElementById('kk_mobile_overlay');

function openDrawer() {
  mobileDrawer.classList.add('is-active');
  mobileOverlay.classList.add('is-active');
  document.body.style.overflow = 'hidden'; // স্ক্রোল বন্ধ করতে
}

function closeDrawer() {
  mobileDrawer.classList.remove('is-active');
  mobileOverlay.classList.remove('is-active');
  document.body.style.overflow = '';
}

hamburgerBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
mobileOverlay?.addEventListener('click', closeDrawer);