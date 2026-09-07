
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

  initMobileNav();


/**
 * KajKori - Dark Light Theme Switcher Manager
 */

const initThemeToggle = function () {

}

initThemeToggle();