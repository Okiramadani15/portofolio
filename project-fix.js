// Project Structure Fix Script

document.addEventListener('DOMContentLoaded', function() {
  // Fix broken project card structure
  fixProjectCardStructure();
  
  // Fix project filter functionality
  enhanceProjectFilters();
});

// Fix broken project card structure
function fixProjectCardStructure() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Check if card has proper structure
    const projectImg = card.querySelector('.project-img');
    const projectInfo = card.querySelector('.project-info');
    
    // Fix cards with missing or broken structure
    if (projectImg && !projectInfo) {
      // Find next sibling that might be the detached project-info
      let nextElement = card.nextElementSibling;
      if (nextElement && nextElement.classList.contains('project-info')) {
        // Move the project-info inside the card
        card.appendChild(nextElement);
      }
    }
    
    // Ensure proper styling
    if (card.style.display !== 'none') {
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
    }
    
    // Fix overlay position
    const overlay = card.querySelector('.project-overlay');
    if (overlay && projectImg) {
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
    }
  });
}

// Enhance project filters
function enhanceProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const projectGrid = document.getElementById('project-grid');
  
  if (!filterBtns.length || !projectCards.length || !projectGrid) return;
  
  // Fix initial state - show all projects
  projectCards.forEach(card => {
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
  
  // Add enhanced filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Add exit animation to all cards
      projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
      });
      
      // After exit animation, filter and show cards
      setTimeout(() => {
        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filter === 'all' || (category && category.includes(filter))) {
            card.style.display = 'flex';
            
            // Staggered entrance animation
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.display = 'none';
          }
        });
      }, 300);
    });
  });
}

// Fix project card that has an extra 's' character in the overlay
function fixProjectOverlayTypo() {
  const projectOverlays = document.querySelectorAll('.project-overlay');
  
  projectOverlays.forEach(overlay => {
    // Check if overlay contains only text nodes with 's'
    if (overlay.childNodes.length > 0) {
      overlay.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === 's') {
          // Remove the erroneous 's' character
          node.textContent = '';
        }
      });
    }
  });
}

// Call the fix for overlay typo
document.addEventListener('DOMContentLoaded', fixProjectOverlayTypo);