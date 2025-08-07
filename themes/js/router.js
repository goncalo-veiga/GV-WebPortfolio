const pages = ['home', 'about', 'portfolio', 'coursework', 'contact'];

function show(page) {
  // Hide all pages
  pages.forEach(p => {
    const el = document.getElementById(p);
    if (el) {
      el.style.display = 'none';
    }
  });

  // GSAP transition animation
    gsap.to('#breaker', { duration: 0.5, x: '0%', ease: 'power2.inOut' });
    gsap.to('#breaker-two', { 
        duration: 0.5, 
        x: '0%', 
        ease: 'power2.inOut', 
        delay: 0.1,
        onComplete: () => {
      // Show the target page after animation
      const targetEl = document.getElementById(page);
      if (targetEl) {
        targetEl.style.display = 'block';
      }
            
      // Complete the transition animation
            gsap.to('#breaker', { duration: 0.5, x: '100%', delay: 0.5 });
            gsap.to('#breaker-two', { duration: 0.5, x: '100%', delay: 0.6 });
            
            window.scrollTo(0, 0);
        }
    });
}

function handleNavigation(e) {
    e.preventDefault();
    const target = this.getAttribute('data-target').replace('#', '');
  history.pushState({}, '', `/${target}`);
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
    const path = window.location.pathname.replace('/', '') || 'home';
    if (pages.includes(path)) {
    show(path);
    } else {
    // Handle 404 - redirect to home
    history.replaceState({}, '', '/home');
    show('home');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initRouter);