// Cursor Fix Script - Ensures custom cursor works properly

document.addEventListener('DOMContentLoaded', function() {
  // Create custom cursor elements if they don't exist
  createCustomCursor();
  
  // Initialize cursor functionality
  initCustomCursor();
});

// Create custom cursor elements
function createCustomCursor() {
  // Check if cursor elements already exist
  if (!document.querySelector('.custom-cursor')) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  }
  
  if (!document.querySelector('.cursor-dot')) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
  }
}

// Initialize custom cursor functionality
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (!cursor || !cursorDot) return;
  
  // Make sure cursor is visible
  cursor.style.opacity = '1';
  cursorDot.style.opacity = '1';
  
  // Update cursor position on mouse move
  document.addEventListener('mousemove', function(e) {
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  });
  
  // Handle cursor visibility when mouse leaves/enters the window
  document.addEventListener('mouseenter', function() {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', function() {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  
  // Add hover effect to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .timeline-item, .skill-item, input, textarea, .filter-btn, .social-links a');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', function() {
      cursor.classList.add('active');
    });
    
    el.addEventListener('mouseleave', function() {
      cursor.classList.remove('active');
    });
  });
  
  // Fix for cursor on scroll
  document.addEventListener('scroll', function() {
    // Hide cursor during scroll to prevent jittering
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
    
    // Show cursor after scrolling stops
    clearTimeout(window.cursorScrollTimeout);
    window.cursorScrollTimeout = setTimeout(function() {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    }, 100);
  });
  
  // Fix for mobile devices
  if (isMobileDevice()) {
    disableCustomCursor();
  }
  
  // Listen for window resize to disable on mobile
  window.addEventListener('resize', function() {
    if (isMobileDevice()) {
      disableCustomCursor();
    } else {
      enableCustomCursor();
    }
  });
}

// Check if device is mobile
function isMobileDevice() {
  return (window.innerWidth <= 768) || 
         ('ontouchstart' in window) || 
         (navigator.maxTouchPoints > 0) || 
         (navigator.msMaxTouchPoints > 0);
}

// Disable custom cursor for mobile
function disableCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (cursor) cursor.style.display = 'none';
  if (cursorDot) cursorDot.style.display = 'none';
  
  document.body.style.cursor = 'auto';
}

// Enable custom cursor for desktop
function enableCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (cursor) cursor.style.display = 'block';
  if (cursorDot) cursorDot.style.display = 'block';
  
  document.body.style.cursor = 'none';
}