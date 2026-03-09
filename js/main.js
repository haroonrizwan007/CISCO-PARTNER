// ============================================
// CISCO PATNER - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 500);
    });
  }

  // ============================================
  // NAVBAR SCROLL BEHAVIOR
  // ============================================
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
    const links = nav.querySelectorAll('.nav-link-custom');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        const collapse = document.getElementById('navbarNav');
        if (collapse && collapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(collapse)?.hide();
        }
      }
    });
  });

  // ============================================
  // ANIMATED COUNTERS
  // ============================================
  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += step;
      if (current < target) {
        el.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    };
    update();
  };

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  // ============================================
  // PROJECT FILTER
  // ============================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  projectCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
    card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    const col = card.closest('[class*="col-"]');
    if (col) { col.style.display = ''; col.style.opacity = '1'; }
  });

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
          const match = filter === 'all' || card.getAttribute('data-category') === filter;
          const col = card.closest('[class*="col-"]');
          if (match) {
            if (col) col.style.display = '';
            requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; });
          } else {
            card.style.opacity = '0'; card.style.transform = 'scale(0.92)';
            setTimeout(() => { if (col) col.style.display = 'none'; }, 350);
          }
        });
      });
    });
  }

  // ============================================
  // CONTACT FORM
  // ============================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('formSuccess');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;
      try {
        const formData = new FormData(this);
        const res = await fetch('php/sendmail.php', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success) {
          if (successMsg) { successMsg.style.display = 'block'; }
          this.reset();
          setTimeout(() => { if (successMsg) successMsg.style.display = 'none'; }, 5000);
        }
      } catch (err) {
        if (successMsg) { successMsg.style.display = 'block'; this.reset(); }
      }
      btn.innerHTML = origText;
      btn.disabled = false;
    });
  }

  // ============================================
  // TESTIMONIAL SLIDER
  // ============================================
  const testimonialCards = document.querySelectorAll('.testimonial-slide');
  if (testimonialCards.length > 0) {
    let currentSlide = 0;
    const showSlide = (n) => {
      testimonialCards.forEach((c, i) => {
        c.style.opacity = i === n ? '1' : '0';
        c.style.transform = i === n ? 'translateX(0)' : 'translateX(30px)';
        c.style.position = i === n ? 'relative' : 'absolute';
      });
    };
    showSlide(0);
    setInterval(() => { currentSlide = (currentSlide + 1) % testimonialCards.length; showSlide(currentSlide); }, 4000);
  }

  // ============================================
  // NAVBAR DROPDOWN - FIXED FOR ALL PAGES
  // ============================================
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  
  dropdownItems.forEach(item => {
    const toggle = item.querySelector('.nav-link-custom');
    const menu = item.querySelector('.dropdown-menu');
    if (!menu) return;

    // Desktop: hover
    item.addEventListener('mouseenter', function () {
      if (window.innerWidth > 991) {
        menu.classList.add('show');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      }
    });
    item.addEventListener('mouseleave', function () {
      if (window.innerWidth > 991) {
        menu.classList.remove('show');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Click: prevent page nav, toggle dropdown (desktop + mobile)
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const isShown = menu.classList.contains('show');
        // Close all other dropdowns
        document.querySelectorAll('.nav-item.dropdown .dropdown-menu').forEach(m => {
          if (m !== menu) m.classList.remove('show');
        });
        menu.classList.toggle('show', !isShown);
        toggle.setAttribute('aria-expanded', (!isShown).toString());
      });
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
    }
  });

});
