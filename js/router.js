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
  // Hide all sections
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  // Resolve element ID (home → header)
  const elementId = pathToId[page] || page;
  const targetEl = document.getElementById(elementId);

  if (targetEl) {
    targetEl.style.display = 'block';
    // Trigger reflow so removing the class is visible before re-adding it
    targetEl.classList.remove('section-enter');
    void targetEl.offsetWidth;
    targetEl.classList.add('section-enter');
  }

  window.scrollTo(0, 0);

  // Dim + blur particles on non-home pages; full on home
  document.body.classList.toggle('particles-bg', elementId !== 'header');
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

  // Handle browser back/forward navigation
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
