// ============================================
// CISCO PATNER - GSAP Animations
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // FALLBACK: Always make all animated elements visible first
  // This ensures content shows even if GSAP/CDN fails to load
  const ensureVisible = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
  };

  // Make all potentially hidden elements visible by default
  const visibleSelectors = [
    '.feature-box', '.team-card', '.service-card-wrap', '.service-card',
    '.project-card', '.counter-card', '.testimonial-card', '.timeline-item',
    '.fade-up', '.slide-left', '.slide-right', '.scale-in',
    '.stagger-item', '.about-img-wrapper', '.about-text'
  ];
  visibleSelectors.forEach(sel => ensureVisible(sel));

  // Wait for GSAP to load
  if (typeof gsap === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ============================================
  // HERO ANIMATIONS
  // ============================================
  if (document.querySelector('.hero-badge')) {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-badge', { y: 30, opacity: 0, duration: 0.7, delay: 0.3 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero-cta', { y: 25, opacity: 0, duration: 0.7 }, '-=0.4')
      .from('.hero-stats', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.hero-image-wrapper', { x: 60, opacity: 0, duration: 1 }, '-=0.8')
      .from('.hero-float-badge', { scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.2 }, '-=0.5');
  }

  // Floating shapes
  if (document.querySelector('.shape')) {
    gsap.to('.shape', { y: -20, rotation: 8, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: { each: 1.5 } });
  }

  // ============================================
  // SCROLL ANIMATIONS - Fade Up
  // ============================================
  document.querySelectorAll('.fade-up').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.8, ease: 'power2.out'
    });
  });

  // ============================================
  // STAGGER GROUPS
  // ============================================
  document.querySelectorAll('.stagger-group').forEach(group => {
    const children = group.querySelectorAll('.stagger-item');
    if (children.length) {
      gsap.from(children, {
        scrollTrigger: { trigger: group, start: 'top 88%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12
      });
    }
  });

  // ============================================
  // SLIDE LEFT / RIGHT
  // ============================================
  document.querySelectorAll('.slide-left').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      x: -60, opacity: 0, duration: 0.9, ease: 'power2.out'
    });
  });

  document.querySelectorAll('.slide-right').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      x: 60, opacity: 0, duration: 0.9, ease: 'power2.out'
    });
  });

  // ============================================
  // SCALE IN
  // ============================================
  document.querySelectorAll('.scale-in').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      scale: 0.85, opacity: 0, duration: 0.7, ease: 'back.out(1.5)'
    });
  });

  // ============================================
  // SERVICE CARDS
  // ============================================
  const serviceGrid = document.querySelector('.services-grid');
  if (serviceGrid) {
    gsap.from(serviceGrid.querySelectorAll('.service-card-wrap'), {
      scrollTrigger: { trigger: serviceGrid, start: 'top 85%' },
      y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out'
    });
  }

  // ============================================
  // COUNTER SECTION
  // ============================================
  const countersSection = document.querySelector('.counters-section');
  if (countersSection) {
    gsap.from('.counter-card', {
      scrollTrigger: { trigger: countersSection, start: 'top 88%' },
      y: 40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out'
    });
  }

  // ============================================
  // ABOUT SECTION
  // ============================================
  const aboutSection = document.querySelector('#about');
  if (aboutSection) {
    gsap.from('.about-img-wrapper', {
      scrollTrigger: { trigger: aboutSection, start: 'top 85%' },
      x: -70, opacity: 0, duration: 1, ease: 'power2.out'
    });
    gsap.from('.about-text > *', {
      scrollTrigger: { trigger: '#about .about-text', start: 'top 88%' },
      y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out'
    });
  }

  // ============================================
  // PROJECTS GRID
  // ============================================
  const projectGrid = document.querySelector('.projects-grid');
  if (projectGrid) {
    const allProjectCards = projectGrid.querySelectorAll('.project-card');
    allProjectCards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
    gsap.from(allProjectCards, {
      scrollTrigger: { trigger: projectGrid, start: 'top 88%', once: true },
      y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', clearProps: 'all'
    });
  }

  // ============================================
  // FEATURE BOXES - Fixed with higher threshold
  // ============================================
  const featureRow = document.querySelector('.features-row');
  if (featureRow) {
    gsap.from(featureRow.querySelectorAll('.feature-box'), {
      scrollTrigger: { trigger: featureRow, start: 'top 90%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, scale: 0.95, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)'
    });
  }

  // ============================================
  // CTA SECTION
  // ============================================
  const ctaSection = document.querySelector('.cta-section');
  if (ctaSection) {
    gsap.from('.cta-section h2, .cta-section p, .cta-buttons', {
      scrollTrigger: { trigger: ctaSection, start: 'top 88%' },
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
    });
  }

  // ============================================
  // PAGE HERO (inner pages)
  // ============================================
  if (document.querySelector('.page-hero')) {
    gsap.from('.page-hero .breadcrumb-custom, .page-hero .section-label, .page-hero h1, .page-hero p', {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out', delay: 0.2
    });
  }

  // ============================================
  // TIMELINE
  // ============================================
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    gsap.from('.timeline-item', {
      scrollTrigger: { trigger: timeline, start: 'top 85%' },
      x: -40, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out'
    });
  }

  // ============================================
  // TEAM CARDS - Fixed with higher threshold
  // ============================================
  const teamGrid = document.querySelector('.team-grid');
  if (teamGrid) {
    gsap.from(teamGrid.querySelectorAll('.team-card'), {
      scrollTrigger: { trigger: teamGrid, start: 'top 90%', toggleActions: 'play none none none' },
      y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out'
    });
  }

  // ============================================
  // SECTION HEADERS
  // ============================================
  document.querySelectorAll('.section-header').forEach(header => {
    gsap.from(header.children, {
      scrollTrigger: { trigger: header, start: 'top 90%' },
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out'
    });
  });

  // ============================================
  // PARALLAX
  // ============================================
  if (document.querySelector('.hero-bg-glow')) {
    gsap.to('.hero-bg-glow', { scrollTrigger: { trigger: '#hero', scrub: true }, y: 100 });
  }

});
