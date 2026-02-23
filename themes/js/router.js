// Actual DOM element IDs for all sections
const sectionIds = ['header', 'about', 'portfolio', 'coursework', 'contact'];

// URL path segment → element ID
const pathToId = {
  'home':       'header',
  'about':      'about',
  'portfolio':  'portfolio',
  'coursework': 'coursework',
  'contact':    'contact',
};

function show(page) {
  // Hide all sections using actual element IDs
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Resolve element ID (home → header)
  const elementId = pathToId[page] || page;

  // GSAP transition animation
  gsap.to('#breaker', { duration: 0.5, x: '0%', ease: 'power2.inOut' });
  gsap.to('#breaker-two', {
    duration: 0.5,
    x: '0%',
    ease: 'power2.inOut',
    delay: 0.1,
    onComplete: () => {
      const targetEl = document.getElementById(elementId);
      if (targetEl) targetEl.style.display = 'block';

      gsap.to('#breaker', { duration: 0.5, x: '100%', delay: 0.5 });
      gsap.to('#breaker-two', { duration: 0.5, x: '100%', delay: 0.6 });

      window.scrollTo(0, 0);
    }
  });
}

function handleNavigation(e) {
  e.preventDefault();
  const target = this.getAttribute('data-target').replace('#', '');
  const url = target === 'home' ? '/' : `/${target}`;
  history.pushState({}, '', url);
  show(target);
}

function initRouter() {
  // Set up click handlers
  document.querySelectorAll('.clickable-text').forEach(link => {
    link.addEventListener('click', handleNavigation);
  });

  // Handle initial load and back/forward navigation
  window.addEventListener('popstate', route);
  route();
}

function route() {
  // Remove leading slash; '/' becomes '' which we treat as 'home'
  const path = window.location.pathname.replace(/^\//, '') || 'home';
  if (pathToId.hasOwnProperty(path)) {
    show(path);
  } else {
    // Unknown path → redirect to home at '/'
    history.replaceState({}, '', '/');
    show('home');
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initRouter);
