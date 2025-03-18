
/**
 * Sets up all scroll animations for the page
 * Returns a cleanup function to remove all observers
 */
export function setupScrollAnimations() {
  // Basic fade animations with enhanced easing
  const fadeObserver = createScrollObserver({
    threshold: 0.1,
    animationHandler: (entry) => {
      const delay = entry.target.getAttribute('data-delay') || '0';
      const duration = entry.target.getAttribute('data-duration') || '700';
      if (entry.target instanceof HTMLElement) {
        entry.target.style.transitionDelay = `${delay}ms`;
        entry.target.style.transitionDuration = `${duration}ms`;
      }
      entry.target.classList.add('appear');
    }
  });

  // Advanced animations with 3D perspective and enhanced depth
  const perspectiveObserver = createScrollObserver({
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px',
    animationHandler: (entry) => {
      if (entry.target instanceof HTMLElement) {
        // Calculate distance from center of viewport for perspective effect
        const viewportHeight = window.innerHeight;
        const boundingRect = entry.target.getBoundingClientRect();
        const centerPosition = (boundingRect.top + boundingRect.bottom) / 2;
        const distanceFromCenter = (centerPosition - viewportHeight / 2) / (viewportHeight / 2);
        
        // Apply dynamic perspective based on position
        const perspectiveValue = Math.abs(distanceFromCenter) * 10;
        entry.target.style.transform = `perspective(1000px) rotateX(${perspectiveValue}deg)`;
        entry.target.style.animationPlayState = 'running';
      }
      entry.target.classList.add('perspective-animate');
    }
  });

  // Enhanced parallax effect with smoother transitions and acceleration
  const parallaxObserver = createScrollObserver({
    threshold: Array.from({ length: 21 }, (_, i) => i / 20), // More granular thresholds
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      // Calculate how far the element is in the viewport with easing function
      const ratio = Math.min(1, Math.max(0, entry.intersectionRatio));
      const easedRatio = easeOutQuad(ratio); // Apply easing for more natural movement
      
      const direction = entry.target.getAttribute('data-parallax-direction') || 'up';
      const speed = Number(entry.target.getAttribute('data-parallax-speed') || '5');
      const scale = Number(entry.target.getAttribute('data-parallax-scale') || '1.0');
      
      let transform = '';
      
      // Apply directional movement
      if (direction === 'up') {
        transform = `translateY(${(1 - easedRatio) * speed * -1}%)`;
      } else if (direction === 'down') {
        transform = `translateY(${(1 - easedRatio) * speed}%)`;
      } else if (direction === 'left') {
        transform = `translateX(${(1 - easedRatio) * speed * -1}%)`;
      } else if (direction === 'right') {
        transform = `translateX(${(1 - easedRatio) * speed}%)`;
      }
      
      // Apply scale if specified
      if (scale !== 1.0) {
        transform += ` scale(${1 + (1 - easedRatio) * (scale - 1)})`;
      }
      
      entry.target.style.transform = transform;
      
      // Add subtle opacity changes for depth
      if (entry.target.hasAttribute('data-parallax-fade')) {
        entry.target.style.opacity = (0.4 + (easedRatio * 0.6)).toString();
      }
    },
    unobserveOnIntersect: false // Keep observing for continuous effect
  });

  // Staggered animations with dynamic delays and cubic-bezier easing
  const staggerObserver = createScrollObserver({
    threshold: 0.1,
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      const staggerDelay = Number(entry.target.getAttribute('data-stagger-delay') || '100');
      const staggerDistance = Number(entry.target.getAttribute('data-stagger-distance') || '20');
      const children = entry.target.querySelectorAll('.stagger-item');
      
      children.forEach((child, index) => {
        if (child instanceof HTMLElement) {
          // Apply staggered timing and distance
          child.style.transitionDelay = `${index * staggerDelay}ms`;
          child.style.transform = `translateY(${staggerDistance}px)`;
          child.style.transitionTimingFunction = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Bouncy spring effect
          
          setTimeout(() => {
            child.classList.add('stagger-appear');
            child.style.transform = 'translateY(0)';
          }, 50 + (index * staggerDelay));
        }
      });
    }
  });
  
  // 3D layered reveal with dynamic depth for cards and containers
  const layeredObserver = createScrollObserver({
    threshold: 0.2,
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      const layerItems = entry.target.querySelectorAll('.layer-item');
      const totalLayers = layerItems.length;
      
      layerItems.forEach((item, index) => {
        if (item instanceof HTMLElement) {
          const depth = totalLayers - index;
          const delay = 150 * index;
          
          item.style.transitionDelay = `${delay}ms`;
          item.style.transform = `translateZ(${-100 * depth}px) scale(${1 - (depth * 0.05)})`;
          item.style.opacity = '0';
          
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateZ(0) scale(1)';
          }, 50 + delay);
        }
      });
      
      entry.target.classList.add('layers-revealed');
    }
  });
  
  // Text character animation with 3D rotation and sequential timing
  const textSplitObserver = createScrollObserver({
    threshold: 0.2,
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      // Only run once per element
      if (entry.target.classList.contains('text-processed')) return;
      
      const text = entry.target.innerText;
      entry.target.innerHTML = '';
      entry.target.classList.add('text-processed');
      
      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.classList.add('char-reveal');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = `${i * 30}ms`;
        span.style.transform = 'translateY(20px) rotateX(90deg)';
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        
        entry.target.appendChild(span);
        
        // Trigger animation after a small delay
        setTimeout(() => {
          span.style.transform = 'translateY(0) rotateX(0)';
          span.style.opacity = '1';
        }, 50);
      });
    }
  });
  
  // Spotlight effect that follows scroll position
  const spotlightObserver = createScrollObserver({
    threshold: Array.from({ length: 21 }, (_, i) => i / 20),
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      const rect = entry.target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Create or update the spotlight gradient
      if (entry.intersectionRatio > 0.5) {
        entry.target.style.background = `radial-gradient(circle at ${centerX}px ${centerY}px, rgba(234, 56, 76, 0.2) 0%, transparent 70%), var(--spotlight-bg, transparent)`;
        entry.target.classList.add('spotlight-active');
      } else {
        entry.target.style.background = 'var(--spotlight-bg, transparent)';
        entry.target.classList.remove('spotlight-active');
      }
    },
    unobserveOnIntersect: false
  });
  
  // Liquid mask effect for images
  const liquidMaskObserver = createScrollObserver({
    threshold: 0.3,
    animationHandler: (entry) => {
      if (!(entry.target instanceof HTMLElement)) return;
      
      // Apply liquid mask effect by adding a class that triggers CSS animation
      entry.target.classList.add('liquid-reveal');
    }
  });

  // Smooth scroll snap
  const setupScrollSnapping = () => {
    const smoothScrollSections = document.querySelectorAll('.smooth-scroll-section');
    if (smoothScrollSections.length === 0) return;
    
    // Only apply on desktop
    if (window.innerWidth < 768) return;
    
    let isScrolling = false;
    let currentSectionIndex = 0;
    
    const scrollToSection = (index: number) => {
      if (index < 0 || index >= smoothScrollSections.length) return;
      
      isScrolling = true;
      currentSectionIndex = index;
      
      const section = smoothScrollSections[index];
      section.scrollIntoView({ behavior: 'smooth' });
      
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };
    
    // Handle wheel events
    window.addEventListener('wheel', (e) => {
      if (isScrolling) return;
      
      if (e.deltaY > 0) {
        scrollToSection(currentSectionIndex + 1);
      } else {
        scrollToSection(currentSectionIndex - 1);
      }
    }, { passive: true });
  };
  
  // Initialize scroll snapping
  setupScrollSnapping();

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
  
  const layeredContainers = document.querySelectorAll('.layered-container');
  layeredContainers.forEach(element => {
    layeredObserver.observe(element);
  });
  
  const splitTextElements = document.querySelectorAll('.split-text');
  splitTextElements.forEach(element => {
    textSplitObserver.observe(element);
  });
  
  const spotlightElements = document.querySelectorAll('.spotlight-effect');
  spotlightElements.forEach(element => {
    if (element instanceof HTMLElement) {
      // Store original background
      element.style.setProperty('--spotlight-bg', getComputedStyle(element).background);
    }
    spotlightObserver.observe(element);
  });
  
  const liquidElements = document.querySelectorAll('.liquid-mask');
  liquidElements.forEach(element => {
    liquidMaskObserver.observe(element);
  });
  
  // Magnetic elements that attract to cursor
  const setupMagneticElements = () => {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
      if (!(el instanceof HTMLElement)) return;
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        const strength = el.getAttribute('data-magnetic-strength') || '0.3';
        const maxDistance = Math.min(rect.width, rect.height) * 0.5;
        
        // Calculate displacement with dampening
        const moveX = distanceX * parseFloat(strength);
        const moveY = distanceY * parseFloat(strength);
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
        
        // Remove transition after animation completes
        setTimeout(() => {
          el.style.transition = '';
        }, 500);
      });
    });
  };
  
  // Track mouse movement for hover effects with enhanced physics
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
        
        // Check if mouse is within active range
        const distanceSq = diffX * diffX + diffY * diffY;
        const maxDistance = Math.max(window.innerWidth, window.innerHeight) * 0.6;
        
        if (distanceSq > maxDistance * maxDistance) {
          // Too far, reset to neutral position with smooth transition
          el.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
          el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          return;
        }
        
        // Remove transition for direct response
        el.style.transition = '';
        
        const sensitivity = Number(el.getAttribute('data-sensitivity') || '10');
        const maxTilt = 15;
        
        // Calculate tilt based on mouse position with damping for smoother effect
        const tiltX = Math.max(Math.min(diffY / sensitivity, maxTilt), -maxTilt);
        const tiltY = Math.max(Math.min(-diffX / sensitivity, maxTilt), -maxTilt);
        
        // Add slight movement for more natural feeling
        const moveX = diffX * 0.05;
        const moveY = diffY * 0.05;
        
        // Apply transform with translation for enhanced 3D effect
        el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05) translate(${-moveX}px, ${-moveY}px)`;
      });
    });
    
    // Reset transforms when mouse leaves the document
    document.addEventListener('mouseleave', () => {
      const hoverElements = document.querySelectorAll('.mouse-track');
      hoverElements.forEach(el => {
        if (!(el instanceof HTMLElement)) return;
        
        el.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  };
  
  setupMagneticElements();
  trackMouse();

  // Advanced particle effects
  const setupParticleEffects = () => {
    const particleSections = document.querySelectorAll('.particle-section');
    
    particleSections.forEach(section => {
      if (!(section instanceof HTMLElement)) return;
      
      // Create a canvas for particles
      const canvas = document.createElement('canvas');
      canvas.classList.add('particle-canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '-1';
      
      // Adjust canvas size for high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = section.offsetWidth * dpr;
      canvas.height = section.offsetHeight * dpr;
      
      section.style.position = 'relative';
      section.appendChild(canvas);
      
      // Initialize particles if browser supports canvas
      if (canvas.getContext) {
        initializeParticles(canvas, section);
      }
    });
  };
  
  const initializeParticles = (canvas: HTMLCanvasElement, container: HTMLElement) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Scale context for high DPI displays
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
    
    const particles: Particle[] = [];
    const particleCount = Math.min(50, Math.floor(container.offsetWidth * container.offsetHeight / 10000));
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * container.offsetWidth,
        y: Math.random() * container.offsetHeight,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, container.offsetWidth, container.offsetHeight);
      
      // Update and draw particles
      particles.forEach(p => {
        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > container.offsetWidth) p.speedX *= -1;
        if (p.y < 0 || p.y > container.offsetHeight) p.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 56, 76, ${p.opacity})`;
        ctx.fill();
      });
      
      // Continue animation loop
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
  };
  
  // Initialize particle effects for supported browsers
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    // Only run on desktop for performance
    if (window.innerWidth >= 768) {
      setupParticleEffects();
    }
  }

  // Cleanup function
  return () => {
    const allElements = [
      ...Array.from(fadeElements),
      ...Array.from(slideElements),
      ...Array.from(rotateElements),
      ...Array.from(perspectiveElements),
      ...Array.from(parallaxElements),
      ...Array.from(staggerContainers),
      ...Array.from(layeredContainers),
      ...Array.from(splitTextElements),
      ...Array.from(spotlightElements),
      ...Array.from(liquidElements)
    ];
    
    allElements.forEach(element => {
      fadeObserver.unobserve(element);
      perspectiveObserver.unobserve(element);
      parallaxObserver.unobserve(element);
      staggerObserver.unobserve(element);
      layeredObserver.unobserve(element);
      textSplitObserver.unobserve(element);
      spotlightObserver.unobserve(element);
      liquidMaskObserver.unobserve(element);
    });
    
    // Remove event listeners
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.removeEventListener('mousemove', () => {});
        el.removeEventListener('mouseleave', () => {});
      }
    });
    
    // Clean up canvases
    const canvases = document.querySelectorAll('.particle-canvas');
    canvases.forEach(canvas => {
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
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
  const observer = new IntersectionObserver((entries) => {
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

  return observer;
}

// Easing functions for smoother animations
function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

// Particle interface for canvas animations
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}
