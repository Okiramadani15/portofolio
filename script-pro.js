// Professional Portfolio Enhancements

document.addEventListener('DOMContentLoaded', function() {
  // Create background grid
  createBackgroundGrid();
  
  // Initialize advanced animations
  initAdvancedAnimations();
  
  // Initialize parallax effects
  initParallaxEffects();
  
  // Initialize 3D hover effects
  init3DHoverEffects();
  
  // Initialize scroll animations with more sophistication
  initScrollAnimations();
  
  // Initialize text scramble effect for hero title
  initTextScramble();
  
  // Initialize cursor effects
  initCustomCursor();
});

// Create background grid for hero section
function createBackgroundGrid() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const grid = document.createElement('div');
  grid.className = 'background-grid';
  hero.appendChild(grid);
}

// Initialize advanced animations
function initAdvancedAnimations() {
  // Add floating elements
  const floatingElements = document.querySelectorAll('.section-header h3, .skills-category h4');
  floatingElements.forEach(el => {
    el.innerHTML = `<span>${el.textContent}</span>`;
    const span = el.querySelector('span');
    span.style.display = 'inline-block';
    span.style.transition = 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)';
  });
  
  // Add hover effect to floating elements
  document.addEventListener('mousemove', function(e) {
    floatingElements.forEach(el => {
      const span = el.querySelector('span');
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = (e.clientX - centerX) / 20;
      const distanceY = (e.clientY - centerY) / 20;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < 100) {
        span.style.transform = `translate(${distanceX / 3}px, ${distanceY / 3}px)`;
      } else {
        span.style.transform = 'translate(0, 0)';
      }
    });
  });
}

// Initialize parallax effects
function initParallaxEffects() {
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroHeight = hero.offsetHeight;
      if (scrollPosition <= heroHeight) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    }
    
    // Parallax for section backgrounds
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition > sectionTop - window.innerHeight && 
          scrollPosition < sectionTop + sectionHeight) {
        const yPos = (scrollPosition - sectionTop) * 0.2;
        section.style.backgroundPositionY = `${yPos}px`;
      }
    });
  });
}

// Initialize 3D hover effects for cards
function init3DHoverEffects() {
  const cards = document.querySelectorAll('.project-card, .skills-category, .timeline-content');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Initialize enhanced scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Add staggered animation to child elements
        const children = entry.target.querySelectorAll('.stagger-item');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('active');
        });
        
        // If it's a progress bar, animate it
        if (entry.target.classList.contains('skill-item')) {
          const progressBar = entry.target.querySelector('.progress');
          if (progressBar) {
            setTimeout(() => {
              const width = progressBar.getAttribute('data-width') || progressBar.style.width;
              progressBar.style.width = width;
            }, 300);
          }
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Text scramble effect for hero title
function initTextScramble() {
  const heroTitle = document.querySelector('.hero-text h2');
  if (!heroTitle) return;
  
  const originalText = heroTitle.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  
  let iteration = 0;
  let interval = null;
  
  clearInterval(interval);
  interval = setInterval(() => {
    heroTitle.innerText = originalText
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    if (iteration >= originalText.length) {
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

// Custom cursor effect
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', function(e) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-item, .skill-item');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('active');
    });
    
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('active');
    });
  });
}

// Add scroll-triggered animations to timeline
document.addEventListener('scroll', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    
    if (isVisible) {
      item.classList.add('animate');
    }
  });
});

// Initialize skill bars with counter animation
function initSkillCounters() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const percentage = item.querySelector('.skill-percentage');
    const progress = item.querySelector('.progress');
    
    if (!percentage || !progress) return;
    
    const targetValue = parseInt(percentage.textContent);
    let currentValue = 0;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const interval = setInterval(() => {
            if (currentValue >= targetValue) {
              clearInterval(interval);
              return;
            }
            
            currentValue += 1;
            percentage.textContent = `${currentValue}%`;
            progress.style.width = `${currentValue}%`;
          }, 20);
          
          observer.unobserve(item);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(item);
  });
}

// Call skill counters initialization
document.addEventListener('DOMContentLoaded', initSkillCounters);

// Add particle effect to hero section
function addParticleEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 10 + 2;
    
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
      z-index: 1;
      filter: blur(${size/3}px);
      animation: float ${duration}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
    `;
    
    hero.appendChild(particle);
  }
}

// Call particle effect
document.addEventListener('DOMContentLoaded', addParticleEffect);
// Professional Portfolio Enhancements

document.addEventListener('DOMContentLoaded', function() {
  // Create background grid
  createBackgroundGrid();
  
  // Initialize advanced animations
  initAdvancedAnimations();
  
  // Initialize parallax effects
  initParallaxEffects();
  
  // Initialize 3D hover effects
  init3DHoverEffects();
  
  // Initialize scroll animations with more sophistication
  initScrollAnimations();
  
  // Initialize text scramble effect for hero title
  initTextScramble();
  
  // Disable custom cursor functionality
  disableCustomCursor();
});

// Disable any custom cursor functionality
function disableCustomCursor() {
  // Remove any custom cursor elements that might exist
  const customCursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (customCursor) {
    customCursor.remove();
  }
  
  if (cursorDot) {
    cursorDot.remove();
  }
  
  // Reset cursor styles on body and interactive elements
  document.body.style.cursor = 'auto';
  
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-item, .skill-item');
  interactiveElements.forEach(el => {
    el.style.cursor = 'pointer';
  });
}

// Create background grid for hero section
function createBackgroundGrid() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const grid = document.createElement('div');
  grid.className = 'background-grid';
  hero.appendChild(grid);
}

// Initialize advanced animations
function initAdvancedAnimations() {
  // Add floating elements
  const floatingElements = document.querySelectorAll('.section-header h3, .skills-category h4');
  floatingElements.forEach(el => {
    el.innerHTML = `<span>${el.textContent}</span>`;
    const span = el.querySelector('span');
    span.style.display = 'inline-block';
    span.style.transition = 'transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)';
  });
  
  // Add hover effect to floating elements
  document.addEventListener('mousemove', function(e) {
    floatingElements.forEach(el => {
      const span = el.querySelector('span');
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = (e.clientX - centerX) / 20;
      const distanceY = (e.clientY - centerY) / 20;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance < 100) {
        span.style.transform = `translate(${distanceX / 3}px, ${distanceY / 3}px)`;
      } else {
        span.style.transform = 'translate(0, 0)';
      }
    });
  });
}

// Initialize parallax effects
function initParallaxEffects() {
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    // Parallax for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      const heroHeight = hero.offsetHeight;
      if (scrollPosition <= heroHeight) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    }
    
    // Parallax for section backgrounds
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition > sectionTop - window.innerHeight && 
          scrollPosition < sectionTop + sectionHeight) {
        const yPos = (scrollPosition - sectionTop) * 0.2;
        section.style.backgroundPositionY = `${yPos}px`;
      }
    });
  });
}

// Initialize 3D hover effects for cards
function init3DHoverEffects() {
  const cards = document.querySelectorAll('.project-card, .skills-category, .timeline-content');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Initialize enhanced scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Add staggered animation to child elements
        const children = entry.target.querySelectorAll('.stagger-item');
        children.forEach((child, index) => {
          child.style.transitionDelay = `${index * 0.1}s`;
          child.classList.add('active');
        });
        
        // If it's a progress bar, animate it
        if (entry.target.classList.contains('skill-item')) {
          const progressBar = entry.target.querySelector('.progress');
          if (progressBar) {
            setTimeout(() => {
              const width = progressBar.getAttribute('data-width') || progressBar.style.width;
              progressBar.style.width = width;
            }, 300);
          }
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Text scramble effect for hero title
function initTextScramble() {
  const heroTitle = document.querySelector('.hero-text h2');
  if (!heroTitle) return;
  
  const originalText = heroTitle.textContent;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  
  let iteration = 0;
  let interval = null;
  
  clearInterval(interval);
  interval = setInterval(() => {
    heroTitle.innerText = originalText
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    if (iteration >= originalText.length) {
      clearInterval(interval);
    }
    
    iteration += 1 / 3;
  }, 30);
}

// Add particle effect to hero section
function addParticleEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 10 + 2;
    
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
      z-index: 1;
      filter: blur(${size/3}px);
      animation: float ${duration}s infinite ease-in-out;
      animation-delay: ${Math.random() * 5}s;
    `;
    
    hero.appendChild(particle);
  }
}

// Call particle effect
document.addEventListener('DOMContentLoaded', addParticleEffect);