// Comprehensive Bug Fix Script

document.addEventListener('DOMContentLoaded', function() {
  // Fix all bugs
  fixThemeToggle();
  fixProjectCards();
  fixProgressBars();
  fixHeroTitle();
  fixMissingImages();
  fixNavigationLinks();
  fixMobileMenu();
  fixSocialLinks();
  fixScrollAnimation();
  fixLanguageToggle();
  fixIncompleteCSS();
});

// Fix theme toggle functionality
function fixThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  if (!themeToggleBtn) return;
  
  // Ensure correct icon is displayed
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  themeToggleBtn.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  
  // Fix theme toggle click handler
  themeToggleBtn.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    
    // Update icon
    const isDarkMode = document.documentElement.classList.contains('dark-mode');
    this.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Force refresh CSS custom properties
    document.body.style.transition = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.transition = '';
    
    // Update RGB variables
    if (isDarkMode) {
      document.documentElement.style.setProperty('--primary-color-rgb', '14, 225, 229');
      document.documentElement.style.setProperty('--secondary-color-rgb', '173, 181, 189');
    } else {
      document.documentElement.style.setProperty('--primary-color-rgb', '8, 176, 171');
      document.documentElement.style.setProperty('--secondary-color-rgb', '108, 117, 125');
    }
  });
}

// Fix project cards structure and display
function fixProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Ensure proper structure
    const projectImg = card.querySelector('.project-img');
    const projectInfo = card.querySelector('.project-info');
    
    if (projectImg && !projectInfo) {
      // Find next sibling that might be the detached project-info
      let nextElement = card.nextElementSibling;
      if (nextElement && nextElement.classList.contains('project-info')) {
        // Move the project-info inside the card
        card.appendChild(nextElement);
      }
    }
    
    // Fix image width if truncated in CSS
    const img = card.querySelector('.project-img img');
    if (img) {
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
    }
    
    // Fix overlay position
    const overlay = card.querySelector('.project-overlay');
    if (overlay) {
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      
      // Remove any text nodes that might be causing issues
      overlay.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          node.textContent = '';
        }
      });
    }
  });
}

// Fix progress bars animation and display
function fixProgressBars() {
  const progressBars = document.querySelectorAll('.progress');
  
  progressBars.forEach(bar => {
    // Store original width
    const width = bar.style.width;
    
    // Reset width to 0
    bar.style.width = '0';
    
    // Set data attribute for animation
    bar.setAttribute('data-width', width);
    
    // Animate progress bars when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.width = entry.target.getAttribute('data-width');
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(bar);
  });
}

// Fix hero title animation
function fixHeroTitle() {
  const heroTitle = document.querySelector('.hero-text h2[data-id="hero-title"]');
  
  if (!heroTitle) return;
  
  // Remove any existing animations
  heroTitle.style.animation = 'none';
  
  // Add simple fade-in animation
  heroTitle.style.opacity = '0';
  heroTitle.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    heroTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    heroTitle.style.opacity = '1';
    heroTitle.style.transform = 'translateY(0)';
  }, 500);
}

// Fix missing images with placeholders
function fixMissingImages() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add error handler to replace broken images
    img.onerror = function() {
      // Check if it's a profile image
      if (img.classList.contains('profile-img')) {
        this.src = 'https://via.placeholder.com/350x350?text=Profile+Photo';
      } else {
        this.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
      }
      this.onerror = null; // Prevent infinite loop
    };
    
    // Force reload to check if image exists
    const currentSrc = img.src;
    img.src = '';
    img.src = currentSrc;
  });
}

// Fix navigation links active state
function fixNavigationLinks() {
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Set active class based on current section
  function setActiveLink() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    // If at the top, set home as active
    if (scrollPosition < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#') {
          link.classList.add('active');
        }
      });
    }
  }
  
  // Set active link on scroll
  window.addEventListener('scroll', setActiveLink);
  
  // Set active link on page load
  setActiveLink();
}

// Fix mobile menu functionality
function fixMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!mobileMenuBtn || !navLinks) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    
    // Toggle icon
    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });
  
  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
      }
    });
  });
}

// Fix social links
function fixSocialLinks() {
  const socialLinks = document.querySelectorAll('.social-links a');
  
  socialLinks.forEach(link => {
    // Ensure target="_blank" and rel="noopener" for security
    if (link.getAttribute('href').startsWith('http')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
    
    // Fix hover effect
    link.addEventListener('mouseenter', function() {
      this.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
      this.style.color = 'white';
      this.style.transform = 'translateY(-3px)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '';
      this.style.color = '';
      this.style.transform = '';
    });
  });
}

// Fix scroll animation
function fixScrollAnimation() {
  const animatedElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
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

// Fix language toggle
function fixLanguageToggle() {
  const langIdBtn = document.getElementById('lang-id');
  const langEnBtn = document.getElementById('lang-en');
  
  if (!langIdBtn || !langEnBtn) return;
  
  // Fix language toggle buttons
  langIdBtn.addEventListener('click', function() {
    langIdBtn.classList.add('active');
    langEnBtn.classList.remove('active');
    localStorage.setItem('language', 'id');
    
    // Update text content based on language
    updateLanguage('id');
  });
  
  langEnBtn.addEventListener('click', function() {
    langEnBtn.classList.add('active');
    langIdBtn.classList.remove('active');
    localStorage.setItem('language', 'en');
    
    // Update text content based on language
    updateLanguage('en');
  });
  
  // Check saved language
  const savedLanguage = localStorage.getItem('language') || 'id';
  if (savedLanguage === 'id') {
    langIdBtn.classList.add('active');
    langEnBtn.classList.remove('active');
  } else {
    langEnBtn.classList.add('active');
    langIdBtn.classList.remove('active');
  }
  
  // Update language on page load
  updateLanguage(savedLanguage);
}

// Update text content based on language
function updateLanguage(lang) {
  const translations = {
    'en': {
      'nav-about': 'About',
      'nav-skills': 'Skills',
      'nav-projects': 'Projects',
      'nav-experience': 'Experience',
      'nav-contact': 'Contact',
      'hero-title': 'Welcome to My Portfolio',
      'hero-subtitle': 'I am a Project Manager and Web Developer with a passion for building modern applications. I focus on effective project management, optimal user experience, and high-quality code implementation to ensure functional and sustainable results.',
      'hero-cta': 'Contact Me',
      'view-cv': 'View CV',
      'about-title': 'About Me',
      'about-subtitle': 'Get to know me better and what I do',
      'skills-title': 'Skills',
      'skills-subtitle': 'Technologies and tools I master',
      'projects-title': 'Projects',
      'projects-subtitle': 'Some of the latest projects I have worked on',
      'experience-title': 'Work Experience',
      'experience-subtitle': 'My professional career journey',
      'contact-title': 'Contact Me',
      'contact-subtitle': 'Interested in working together? Get in touch'
    },
    'id': {
      'nav-about': 'Tentang',
      'nav-skills': 'Keahlian',
      'nav-projects': 'Proyek',
      'nav-experience': 'Pengalaman',
      'nav-contact': 'Kontak',
      'hero-title': 'Selamat Datang di Portfolio Saya',
      'hero-subtitle': 'Saya adalah seorang Project Manager sekaligus Web Developer yang memiliki semangat tinggi dalam membangun aplikasi modern. Saya berfokus pada manajemen proyek yang efektif, pengalaman pengguna yang optimal, dan penerapan kode berkualitas tinggi untuk memastikan hasil yang fungsional dan berkelanjutan.',
      'hero-cta': 'Hubungi Saya',
      'view-cv': 'Lihat CV',
      'about-title': 'Tentang Saya',
      'about-subtitle': 'Mengenal lebih dekat siapa saya dan apa yang saya lakukan',
      'skills-title': 'Keahlian',
      'skills-subtitle': 'Teknologi dan alat yang saya kuasai',
      'projects-title': 'Proyek',
      'projects-subtitle': 'Beberapa proyek terbaru yang telah saya kerjakan',
      'experience-title': 'Pengalaman Kerja',
      'experience-subtitle': 'Perjalanan karir profesional saya',
      'contact-title': 'Hubungi Saya',
      'contact-subtitle': 'Tertarik untuk bekerja sama? Silakan hubungi saya'
    }
  };
  
  // Update all text elements with data-id attribute
  document.querySelectorAll('[data-id]').forEach(element => {
    const key = element.getAttribute('data-id');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// Fix incomplete CSS
function fixIncompleteCSS() {
  // Fix truncated project image CSS
  const style = document.createElement('style');
  style.textContent = `
    .project-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);
    }
    
    .project-card:hover .project-img img {
      transform: scale(1.1);
    }
    
    /* Fix any other missing CSS */
    .project-info {
      padding: 25px;
    }
    
    .project-info h4 {
      font-size: 1.2rem;
      margin-bottom: 15px;
      color: var(--text-color);
    }
    
    .project-info p {
      font-size: 0.9rem;
      color: var(--secondary-color);
      margin-bottom: 20px;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .project-tech span {
      font-size: 0.8rem;
      padding: 5px 12px;
      background-color: rgba(74, 108, 247, 0.1);
      color: var(--primary-color);
      border-radius: 50px;
    }
    
    .btn-outline {
      padding: 8px 20px;
      background-color: transparent;
      border: 1px solid var(--primary-color);
      color: var(--primary-color);
      border-radius: 50px;
      font-size: 0.9rem;
      font-weight: 500;
      transition: var(--transition);
    }
    
    .btn-outline:hover {
      background-color: var(--primary-color);
      color: white;
    }
  `;
  document.head.appendChild(style);
}