// Dark/Light Mode Fix Script

document.addEventListener('DOMContentLoaded', function() {
  // Get theme toggle button and HTML element
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  
  // Function to properly set theme
  function setTheme(theme) {
    if (theme === 'dark') {
      // Apply dark mode
      htmlElement.classList.add('dark-mode');
      bodyElement.classList.add('dark-mode');
      
      // Update theme toggle button icon
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      }
      
      // Update RGB variables for dark mode
      document.documentElement.style.setProperty('--primary-color-rgb', '14, 225, 229');
      document.documentElement.style.setProperty('--secondary-color-rgb', '173, 181, 189');
    } else {
      // Apply light mode
      htmlElement.classList.remove('dark-mode');
      bodyElement.classList.remove('dark-mode');
      
      // Update theme toggle button icon
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      }
      
      // Update RGB variables for light mode
      document.documentElement.style.setProperty('--primary-color-rgb', '8, 176, 171');
      document.documentElement.style.setProperty('--secondary-color-rgb', '108, 117, 125');
    }
    
    // Store theme preference
    localStorage.setItem('theme', theme);
    
    // Force refresh CSS custom properties
    refreshCustomProperties();
  }
  
  // Function to refresh custom properties
  function refreshCustomProperties() {
    // Force a repaint by getting offsetHeight
    document.body.style.display = 'none';
    document.body.offsetHeight; // This triggers a reflow
    document.body.style.display = '';
    
    // Update all elements that use CSS variables
    updateElementsWithCssVariables();
  }
  
  // Update elements that use CSS variables
  function updateElementsWithCssVariables() {
    const elementsToUpdate = [
      '.progress',
      '.project-overlay',
      '.timeline-dot',
      '.section-header h3::after',
      '.skills-category h4::before',
      '.primary-btn',
      '.secondary-btn',
      '.social-links a',
      '.project-tech span',
      '#theme-toggle-btn',
      '.contact-card::before'
    ];
    
    elementsToUpdate.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Force a style recalculation
        el.style.transition = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.transition = '';
      });
    });
  }
  
  // Toggle theme function
  function toggleTheme() {
    const isDarkMode = htmlElement.classList.contains('dark-mode');
    setTheme(isDarkMode ? 'light' : 'dark');
    
    // Add animation to theme toggle button
    themeToggleBtn.classList.add('theme-toggle-animation');
    setTimeout(() => {
      themeToggleBtn.classList.remove('theme-toggle-animation');
    }, 500);
  }
  
  // Check system preference for dark mode
  function getSystemPreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Initialize theme based on saved preference or system preference
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const preferredTheme = savedTheme || getSystemPreference();
    setTheme(preferredTheme);
    
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
  initializeTheme();
  
  // Add keyboard shortcut for theme toggle (Alt+T)
  document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 't') {
      toggleTheme();
    }
  });
  
  // Add theme toggle button to mobile menu if it doesn't exist
  const mobileMenu = document.querySelector('.nav-links');
  if (mobileMenu && !mobileMenu.querySelector('.theme-toggle-mobile')) {
    const mobileThemeToggle = document.createElement('div');
    mobileThemeToggle.className = 'theme-toggle-mobile';
    mobileThemeToggle.innerHTML = `
      <button id="theme-toggle-btn-mobile" aria-label="Toggle Dark/Light Mode">
        <i class="${htmlElement.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon'}"></i>
        <span>${htmlElement.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode'}</span>
      </button>
    `;
    mobileMenu.appendChild(mobileThemeToggle);
    
    // Add event listener to mobile theme toggle button
    const mobileThemeToggleBtn = document.getElementById('theme-toggle-btn-mobile');
    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
  }
});