document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  const backToTopBtn = document.getElementById('back-to-top');

  // ---------------- Load saved theme ----------------
  const savedTheme = localStorage.getItem('theme');

  // Default = LIGHT
  if (savedTheme === 'dark') {
    document.body.classList.remove('light');
    if (toggleBtn) toggleBtn.textContent = '🌙';
  } else {
    document.body.classList.add('light');
    if (toggleBtn) toggleBtn.textContent = '🌞';
  }

  // ---------------- Theme toggle button ----------------
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      // Animate icon
      toggleBtn.classList.add('toggle-animate');

      // Toggle theme
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      toggleBtn.textContent = isLight ? '🌞' : '🌙';
      localStorage.setItem('theme', isLight ? 'light' : 'dark');

      // Remove animation class after animation ends
      setTimeout(() => {
        toggleBtn.classList.remove('toggle-animate');
      }, 300); // matches CSS transition
    });
  }

  // ---------------- Back to top button ----------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------- Scroll effects ----------------
  window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in');
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        el.classList.add('visible');
      }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Show/hide back to top button
    if (backToTopBtn) {
      backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }

    // Highlight active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar .nav-links li a');

    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - sectionHeight * 0.25 && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // ---------------- Smooth scroll for anchor links ----------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

document.body.style.opacity = 0;

window.addEventListener('load', () => {
  document.body.style.transition = 'opacity 0.6s ease';
  document.body.style.opacity = 1;
});