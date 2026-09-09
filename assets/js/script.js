/**
 * KajKori - Main Application Script
 */
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initNavigation();
});


/**
 * KajKori - Dark Light Theme Switcher Manager
 */

const initThemeToggle = function () {
  const themeToggleBtn = document.getElementById('kk_theme_toggle_btn');
  const themeIcon = themeToggleBtn?.querySelector('.kk_theme_icon');
  const htmlElement = document.documentElement;

  // Guard Clause 
 if (!themeToggleBtn || !themeIcon) return;

  // LocalStorage check or System Preference fallback
  const savedTheme = localStorage.getItem('kk_theme');
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  
  const currentTheme = savedTheme || (systemPrefersDark.matches ? 'dark' : 'light');

  // Apply Theme Helper
  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('kk_theme', theme);
    console.log('Saved in storage:', localStorage.getItem('kk_theme'));
    

    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '☾' : '☀';
    }

    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
  }

  //  Initialize theme on load
  applyTheme(currentTheme);

  // Event Listeners
  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = htmlElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // Listen for OS Theme Changes (Only if user hasn't explicitly set a preference)
  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('kk_theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

}

/**
 * KajKori - Mobile Navigation & Drawer Manager
 */

  // DOM Elements Selection
  function initMobileNav() {
    const hamburgerBtn = document.getElementById("kk_hamburger_btn");
    const drawerCloseBtn = document.getElementById("kk_drawer_close_btn");
    const mobileDrawer = document.getElementById("kk_mobile_drawer");
    const mobileOverlay = document.getElementById("kk_mobile_overlay");
    const body = document.body;

    // Guard Clause 
    if (!hamburgerBtn || !mobileDrawer || !mobileOverlay) return;

  /**
   * Open Mobile Drawer
   */
    function openDrawer() {
      mobileDrawer.classList.add('is-active');
      mobileOverlay.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    }

  /**
   * Close Mobile Drawer
   */

    function closeDrawer() {
      mobileDrawer.classList.remove('is-active');
      mobileOverlay.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
      
    }

    // Event Listeners
    hamburgerBtn.addEventListener('click', openDrawer);

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    // Close on Backdrop Click
    mobileOverlay.addEventListener('click', closeDrawer);

    // Close on 'Escape' Key Press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileDrawer.classList.contains('is-active')) {
        closeDrawer();
      }
      
    });


    // Handle Window Resize (Auto Close Drawer if Screen > 768px)
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768 && mobileDrawer.classList.contains("is-active")) {
        closeDrawer();
      }
    });
  }
  

/**
 * KajKori - Multi-Page Navigation & Mobile Drawer Handler
 */
const initNavigation = function () {
  // Elements Selection
  const desktopLinks = document.querySelectorAll('.kk_desktop_menu .kk_nav_link');
  const mobileLinks = document.querySelectorAll('.kk_mobile_menu .kk_mobile_nav_link');
  const allNavLinks = [...desktopLinks, ...mobileLinks];

  const drawer = document.getElementById('kk_mobile_drawer');
  const overlay = document.getElementById('kk_mobile_overlay');
  const openBtn = document.getElementById('kk_hamburger_btn');
  const closeBtn = document.getElementById('kk_drawer_close_btn');

  if (allNavLinks.length === 0) return;

  // ১. বর্তমান URL অনুযায়ী Active Link চিহ্নিত করা
  let currentPath = window.location.pathname.split('/').pop();
  
  // রুট ডোমেইন বা খালি প্যাথের ক্ষেত্রে index.html ডিফল্ট ধরা
  if (!currentPath || currentPath === '') {
    currentPath = 'index.html';
  }

  allNavLinks.forEach((nav) => {
    const navHref = nav.getAttribute('href');
    if (!navHref) return;

    // ফাইল নেম আলাদা করে ক্লিন করা
    const cleanNavHref = navHref.replace('./', '').split('/').pop();

    if (cleanNavHref === currentPath) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });

  // ২. মোবাইল ড্রয়ার ওপেন করার ফাংশন
  const openMobileDrawer = () => {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // ব্যাকগ্রাউন্ড স্ক্রোল বন্ধ করা
  };

  // ৩. মোবাইল ড্রয়ার ক্লোজ করার ফাংশন
  const closeMobileDrawer = () => {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // ৪. Event Listeners
  if (openBtn) openBtn.addEventListener('click', openMobileDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeMobileDrawer);
  if (overlay) overlay.addEventListener('click', closeMobileDrawer);

  // মোবাইল ড্রয়ারের লিঙ্কে ক্লিক করলে ড্রয়ার ক্লোজ হওয়া নিশ্চিত করা
  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileDrawer);
  });
};