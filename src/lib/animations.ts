
/**
 * Sets up all scroll animations for the page
 * Returns a cleanup function to remove all observers
 */
export function setupScrollAnimations() {
  // Basic fade animations
  const fadeObserver = createScrollObserver({
    threshold: 0.1,
    animationHandler: (entry) => {
      const delay = entry.target.getAttribute('data-delay') || '0';
      if (entry.target instanceof HTMLElement) {
        entry.target.style.transitionDelay = `${delay}ms`;
      }
      entry.target.classList.add('appear');
    }
  });

  // Advanced animations with 3D perspective
  const perspectiveObserver = createScrollObserver({
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
    animationHandler: (entry) => {
      if (entry.target instanceof HTMLElement) {
        entry.target.style.animationPlayState = 'running';
      }
      entry.target.classList.add('perspective-animate');
    }
  });

  // Parallax effect for backgrounds
  const parallaxObserver = createScrollObserver({
    threshold: Array.from({ length: 11 }, (_, i) => i / 10), // Multiple thresholds for smoother effect
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      // Calculate how far the element is in the viewport (0 to 1)
      const ratio = Math.min(1, Math.max(0, entry.intersectionRatio));
      const direction = entry.target.getAttribute('data-parallax-direction') || 'up';
      const speed = Number(entry.target.getAttribute('data-parallax-speed') || '5');
      
      if (direction === 'up') {
        entry.target.style.transform = `translateY(${(1 - ratio) * speed * -1}%)`;
      } else if (direction === 'down') {
        entry.target.style.transform = `translateY(${(1 - ratio) * speed}%)`;
      } else if (direction === 'left') {
        entry.target.style.transform = `translateX(${(1 - ratio) * speed * -1}%)`;
      } else if (direction === 'right') {
        entry.target.style.transform = `translateX(${(1 - ratio) * speed}%)`;
      }
    },
    unobserveOnIntersect: false // Keep observing for continuous effect
  });

  // Staggered animations for groups of elements
  const staggerObserver = createScrollObserver({
    threshold: 0.1,
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      const children = entry.target.querySelectorAll('.stagger-item');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add('stagger-appear');
        }, index * 100);
      });
    }
  });

  // Trigger all observers
  const fadeElements = document.querySelectorAll('.fade-in-section');
  fadeElements.forEach((element, index) => {
    element.setAttribute('data-delay', `${index * 100}`);
    fadeObserver.observe(element);
  });

  const slideElements = document.querySelectorAll('.slide-in-section');
  slideElements.forEach((element, index) => {
    element.setAttribute('data-delay', `${index * 150}`);
    fadeObserver.observe(element);
  });

  const rotateElements = document.querySelectorAll('.rotate-in-section');
  rotateElements.forEach((element, index) => {
    element.setAttribute('data-delay', `${index * 120}`);
    fadeObserver.observe(element);
  });

  const perspectiveElements = document.querySelectorAll('.perspective-section');
  perspectiveElements.forEach(element => {
    perspectiveObserver.observe(element);
  });

  const parallaxElements = document.querySelectorAll('.parallax-element');
  parallaxElements.forEach(element => {
    parallaxObserver.observe(element);
  });

  const staggerContainers = document.querySelectorAll('.stagger-container');
  staggerContainers.forEach(element => {
    staggerObserver.observe(element);
  });

  // Track mouse movement for hover effects
  const trackMouse = () => {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const hoverElements = document.querySelectorAll('.mouse-track');
      hoverElements.forEach(el => {
        if (!(el instanceof HTMLElement)) return;
        
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        
        const diffX = mouseX - elX;
        const diffY = mouseY - elY;
        
        const sensitivity = Number(el.getAttribute('data-sensitivity') || '10');
        const maxTilt = 5;
        
        // Calculate tilt based on mouse position
        const tiltX = Math.max(Math.min(diffY / sensitivity, maxTilt), -maxTilt);
        const tiltY = Math.max(Math.min(-diffX / sensitivity, maxTilt), -maxTilt);
        
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
    });
  };
  
  trackMouse();

  // Cleanup function
  return () => {
    const allElements = [
      ...Array.from(fadeElements),
      ...Array.from(slideElements),
      ...Array.from(rotateElements),
      ...Array.from(perspectiveElements),
      ...Array.from(parallaxElements),
      ...Array.from(staggerContainers)
    ];
    
    allElements.forEach(element => {
      fadeObserver.unobserve(element);
      perspectiveObserver.unobserve(element);
      parallaxObserver.unobserve(element);
      staggerObserver.unobserve(element);
    });
  };
}

// Helper function to create reusable intersection observers
interface ScrollObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  animationHandler: (entry: IntersectionObserverEntry) => void;
  unobserveOnIntersect?: boolean;
}

function createScrollObserver({
  root = null,
  rootMargin = '0px',
  threshold = 0.1,
  animationHandler,
  unobserveOnIntersect = true
}: ScrollObserverOptions) {
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animationHandler(entry);
        if (unobserveOnIntersect) {
          entry.target.classList.add('observed');
          observer.unobserve(entry.target);
        }
      }
    });
  }, { root, rootMargin, threshold });
}
