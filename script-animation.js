// Enhanced Animation Script for Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const skillItems = document.querySelectorAll('.skill-item');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Initialize progress bars at 0 width
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach(progress => {
    const targetWidth = progress.style.width;
    progress.style.width = '0';
    progress.dataset.width = targetWidth;
  });

  // Scroll Observer for animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // If it's a progress bar, animate it
        if (entry.target.classList.contains('skill-item')) {
          const progressBar = entry.target.querySelector('.progress');
          if (progressBar && progressBar.dataset.width) {
            setTimeout(() => {
              progressBar.style.width = progressBar.dataset.width;
            }, 200);
          }
        }
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all elements with reveal class
  revealElements.forEach(el => {
    observer.observe(el);
  });

  // Add staggered delay to skill items
  skillItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });

  // Add staggered delay to project cards
  projectCards.forEach((card, index) => {
    card.classList.add('reveal');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // Particle background effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    createParticles(hero);
  }

  // Theme toggle with enhanced animation
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark-mode');
      
      // Update icon
      const icon = this.querySelector('i');
      if (document.documentElement.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
      } else {
        icon.className = 'fas fa-moon';
      }
      
      // Add animation class
      this.classList.add('theme-toggle-animation');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        this.classList.remove('theme-toggle-animation');
      }, 500);
      
      // Save theme preference
      const isDarkMode = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
      themeToggleBtn.querySelector('i').className = 'fas fa-sun';
    } else {
      document.documentElement.classList.remove('dark-mode');
      themeToggleBtn.querySelector('i').className = 'fas fa-moon';
    }
  }

  // Smooth hover effect for navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Project filter animation
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectGrid = document.getElementById('project-grid');
  
  if (filterBtns.length && projectGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Add exit animation to all cards
        const cards = projectGrid.querySelectorAll('.project-card');
        cards.forEach(card => {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
        });
        
        // After exit animation, filter and show cards
        setTimeout(() => {
          cards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category.includes(filter)) {
              card.style.display = 'block';
              
              // Staggered entrance animation
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 100);
            } else {
              card.style.display = 'none';
            }
          });
        }, 300);
      });
    });
  }

  // Back to top button animation
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Mobile menu animation
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinksContainer.classList.toggle('active');
      
      // Change icon
      const icon = this.querySelector('i');
      if (navLinksContainer.classList.contains('active')) {
        icon.className = 'fas fa-times';
        this.style.transform = 'rotate(90deg)';
      } else {
        icon.className = 'fas fa-bars';
        this.style.transform = 'rotate(0deg)';
      }
    });
  }
});

// Create particle background effect
function createParticles(container) {
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 15 + 5;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    
    // Set styles
    particle.style.cssText = `
      position: absolute;
      top: ${posY}%;
      left: ${posX}%;
      width: ${size}px;
      height: ${size}px;
      background-color: var(--primary-color);
      opacity: ${opacity};
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
      filter: blur(${size/3}px);
      animation: float ${duration}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
  }
}

// Add typing animation to hero title
function setupTypingAnimation() {
  const heroTitle = document.querySelector('.hero-text h2');
  if (!heroTitle) return;
  
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '3px solid var(--primary-color)';
  
  let charIndex = 0;
  const typingSpeed = 100;
  
  function typeText() {
    if (charIndex < text.length) {
      heroTitle.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeText, typingSpeed);
    } else {
      heroTitle.style.borderRight = 'none';
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeText, 500);
}

// Initialize typing animation after page load
window.addEventListener('load', setupTypingAnimation);

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    const heroHeight = hero.offsetHeight;
    const parallaxFactor = 0.4;
    
    if (scrollPosition <= heroHeight) {
      hero.style.backgroundPositionY = `${scrollPosition * parallaxFactor}px`;
    }
  }
});

// Add tilt effect to project cards
function setupTiltEffect() {
  const cards = document.querySelectorAll('.project-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;
      
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;
      
      const rotateX = mouseY * -0.05;
      const rotateY = mouseX * 0.05;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Initialize tilt effect after page load
window.addEventListener('load', setupTiltEffect);