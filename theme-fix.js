// Theme Fix Script - Fixes dark/light mode bugs

document.addEventListener('DOMContentLoaded', function() {
  // Get theme toggle button
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  // Function to properly set theme
  function setTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      
      // Update CSS variables for dark mode
      document.documentElement.style.setProperty('--primary-color-rgb', '129, 140, 248');
      document.documentElement.style.setProperty('--secondary-color-rgb', '52, 211, 153');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      
      // Update CSS variables for light mode
      document.documentElement.style.setProperty('--primary-color-rgb', '99, 102, 241');
      document.documentElement.style.setProperty('--secondary-color-rgb', '16, 185, 129');
    }
    
    // Store theme preference
    localStorage.setItem('theme', theme);
  }
  
  // Toggle theme function with bug fixes
  function toggleTheme() {
    // Check current theme
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    
    // Toggle theme
    if (isDarkMode) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
    
    // Add animation
    themeToggleBtn.classList.add('theme-toggle-animation');
    setTimeout(() => {
      themeToggleBtn.classList.remove('theme-toggle-animation');
    }, 500);
    
    // Force refresh CSS custom properties
    refreshCustomProperties();
  }
  
  // Function to refresh custom properties
  function refreshCustomProperties() {
    // Get all elements that might have custom properties
    const elements = document.querySelectorAll('*');
    
    // Force a repaint on key elements
    elements.forEach(el => {
      if (el.classList.contains('progress') || 
          el.classList.contains('project-overlay') ||
          el.classList.contains('custom-cursor') ||
          el.classList.contains('section-header') ||
          el.classList.contains('timeline-dot')) {
        // Force a repaint by getting offsetHeight
        el.style.display = 'none';
        el.offsetHeight; // This triggers a reflow
        el.style.display = '';
      }
    });
  }
  
  // Check saved theme on page load
  function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply saved theme
    setTheme(savedTheme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  // Add event listener to theme toggle button
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  // Initialize theme
  checkSavedTheme();
  
  // Fix cursor issues in dark mode
  fixCursorInDarkMode();
});

// Fix cursor issues in dark mode
function fixCursorInDarkMode() {
  const customCursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  
  if (customCursor && cursorDot) {
    // Update cursor colors based on theme
    function updateCursorColors() {
      const isDarkMode = document.documentElement.classList.contains('dark-mode');
      
      if (isDarkMode) {
        customCursor.style.borderColor = '#818cf8';
        cursorDot.style.backgroundColor = '#818cf8';
      } else {
        customCursor.style.borderColor = '#6366f1';
        cursorDot.style.backgroundColor = '#6366f1';
      }
    }
    
    // Update cursor colors initially
    updateCursorColors();
    
    // Update cursor colors when theme changes
    document.getElementById('theme-toggle-btn').addEventListener('click', updateCursorColors);
  }
}

// Fix preloader issues
document.addEventListener('DOMContentLoaded', function() {
  const preloader = document.querySelector('.preloader');
  
  if (preloader) {
    // Apply current theme to preloader
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    preloader.classList.toggle('dark-mode', isDarkMode);
    
    // Update gradient colors based on theme
    const gradient = document.querySelector('#gradient');
    if (gradient) {
      const stops = gradient.querySelectorAll('stop');
      if (stops.length >= 2) {
        if (isDarkMode) {
          stops[0].setAttribute('stop-color', '#818cf8');
          stops[1].setAttribute('stop-color', '#34d399');
        } else {
          stops[0].setAttribute('stop-color', '#6366f1');
          stops[1].setAttribute('stop-color', '#10b981');
        }
      }
    }
  }
});