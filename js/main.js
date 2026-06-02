document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');
  const loader = document.querySelector('.loader');

  window.addEventListener('load', function() {
    if (loader) {
      loader.classList.add('hide');
    }
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
      if (menuToggle && menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
      }
    });
  });

  const currentPath = window.location.pathname.replace(/\\\\/g, '/');
  const isIndex = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalizedHref = href.replace(/\\\\/g, '/');
    if (
      (isIndex && (normalizedHref === 'index.html' || normalizedHref === './index.html' || normalizedHref === '/index.html')) ||
      (!isIndex && currentPath.endsWith(normalizedHref))
    ) {
      link.classList.add('active');
    }
  });

  const setNavbarScrolled = () => {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', setNavbarScrolled);
  setNavbarScrolled();

  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('active');
      }
    });
  };

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
});
