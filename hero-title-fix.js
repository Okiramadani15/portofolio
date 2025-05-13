// Hero Title Animation Fix

document.addEventListener('DOMContentLoaded', function() {
  // Fix hero title animation
  fixHeroTitleAnimation();
});

function fixHeroTitleAnimation() {
  // Get the hero title element
  const heroTitle = document.querySelector('.hero-text h2[data-id="hero-title"]');
  
  if (!heroTitle) return;
  
  // Store the original text
  const originalText = heroTitle.textContent;
  
  // Clear any existing text scramble animations
  clearTextScrambleAnimations();
  
  // Create a simple fade-in animation instead
  heroTitle.style.opacity = '0';
  heroTitle.style.transform = 'translateY(20px)';
  heroTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
  
  // Show the text after a short delay
  setTimeout(() => {
    heroTitle.textContent = originalText;
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
  }, 500);
}

function clearTextScrambleAnimations() {
  // Clear any intervals that might be running text scramble animations
  for (let i = 1; i < 10000; i++) {
    window.clearInterval(i);
  }
  
  // Remove any event listeners that might be affecting the hero title
  const scriptPro = document.querySelector('script[src="script-pro.js"]');
  if (scriptPro) {
    const newScriptPro = document.createElement('script');
    newScriptPro.src = 'script-pro.js';
    newScriptPro.setAttribute('data-no-scramble', 'true');
    scriptPro.parentNode.replaceChild(newScriptPro, scriptPro);
  }
}