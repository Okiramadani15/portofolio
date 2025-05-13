// Professional Preloader Script

document.addEventListener('DOMContentLoaded', function() {
  // Hide preloader after page loads
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    
    // Add fade-out class
    preloader.classList.add('fade-out');
    
    // Remove preloader from DOM after animation completes
    setTimeout(function() {
      preloader.style.display = 'none';
    }, 500);
  });
  
  // Animate dots in loading text
  const dots = document.querySelector('.dots');
  let dotCount = 0;
  
  setInterval(function() {
    dotCount = (dotCount + 1) % 4;
    dots.textContent = '.'.repeat(dotCount);
  }, 500);
});