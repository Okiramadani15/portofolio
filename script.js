document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const body = document.querySelector('body');
  const header = document.querySelector('header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const langIdBtn = document.getElementById('lang-id');
  const langEnBtn = document.getElementById('lang-en');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const backToTopBtn = document.querySelector('.back-to-top');
  const contactForm = document.getElementById('contactForm');
  
  // Language translations
  const translations = {
    'en': {
      'nav-about': 'About',
      'nav-skills': 'Skills',
      'nav-projects': 'Projects',
      'nav-experience': 'Experience',
      'nav-contact': 'Contact',
      'nav-home': 'Home',
      'hero-title': 'Welcome to My Portfolio',
      'hero-subtitle': 'I am a Project Manager and Web Developer with a passion for building modern applications. I focus on effective project management, optimal user experience, and high-quality code implementation to ensure functional and sustainable results.',
      'hero-cta': 'Contact Me',
      'view-cv': 'View CV',
      'about-title': 'About Me',
      'about-subtitle': 'Get to know me better and what I do',
      'about-description': 'I am a Project Manager and Web Developer with over 5 years of experience in the technology industry. I have a passion for building modern applications that focus on effective project management, optimal user experience, and high-quality code implementation.',
      'about-description-2': 'With a strong technical background and good management skills, I am able to bridge the gap between technical and business teams to deliver solutions that meet user needs and business goals.',
      'skills-title': 'Skills',
      'skills-subtitle': 'Technologies and tools I master',
      'dev-skills-title': 'Development Skills',
      'other-skills-title': 'Other Skills',
      'tech-stack-title': 'Technology Stack',
      'projects-title': 'Projects',
      'projects-subtitle': 'Some of the latest projects I have worked on',
      'view-projects-btn': 'View All Projects',
      'view-project-btn': 'View Project',
      'load-more-btn': 'Load More',
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
      'nav-home': 'Beranda',
      'hero-title': 'Selamat Datang di Portfolio Saya',
      'hero-subtitle': 'Saya adalah seorang Project Manager sekaligus Web Developer yang memiliki semangat tinggi dalam membangun aplikasi modern. Saya berfokus pada manajemen proyek yang efektif, pengalaman pengguna yang optimal, dan penerapan kode berkualitas tinggi untuk memastikan hasil yang fungsional dan berkelanjutan.',
      'hero-cta': 'Hubungi Saya',
      'view-cv': 'Lihat CV',
      'about-title': 'Tentang Saya',
      'about-subtitle': 'Mengenal lebih dekat siapa saya dan apa yang saya lakukan',
      'about-description': 'Saya adalah seorang Project Manager sekaligus Web Developer dengan pengalaman lebih dari 5 tahun dalam industri teknologi. Saya memiliki semangat tinggi dalam membangun aplikasi modern yang berfokus pada manajemen proyek yang efektif, pengalaman pengguna yang optimal, dan penerapan kode berkualitas tinggi.',
      'about-description-2': 'Dengan latar belakang teknis yang kuat dan kemampuan manajemen yang baik, saya mampu menjembatani kesenjangan antara tim teknis dan bisnis untuk menghasilkan solusi yang memenuhi kebutuhan pengguna dan tujuan bisnis.',
      'skills-title': 'Keahlian',
      'skills-subtitle': 'Teknologi dan alat yang saya kuasai',
      'dev-skills-title': 'Development Skills',
      'other-skills-title': 'Other Skills',
      'tech-stack-title': 'Technology Stack',
      'projects-title': 'Proyek',
      'projects-subtitle': 'Beberapa proyek terbaru yang telah saya kerjakan',
      'view-projects-btn': 'Lihat Semua Proyek',
      'view-project-btn': 'Lihat Proyek',
      'load-more-btn': 'Muat Lebih Banyak',
      'experience-title': 'Pengalaman Kerja',
      'experience-subtitle': 'Perjalanan karir profesional saya',
      'contact-title': 'Hubungi Saya',
      'contact-subtitle': 'Tertarik untuk bekerja sama? Silakan hubungi saya'
    }
  };
  
  // Functions
  
  // Mobile Menu Toggle
  function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
  }
  
  // Theme Toggle
  function toggleTheme() {
    document.documentElement.classList.toggle('dark-mode');
    
    // Update theme icon
    if (document.documentElement.classList.contains('dark-mode')) {
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem('theme', 'dark');
      
      // Add animation
      themeToggleBtn.classList.add('theme-toggle-animation');
      setTimeout(() => {
        themeToggleBtn.classList.remove('theme-toggle-animation');
      }, 500);
    } else {
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', 'light');
      
      // Add animation
      themeToggleBtn.classList.add('theme-toggle-animation');
      setTimeout(() => {
        themeToggleBtn.classList.remove('theme-toggle-animation');
      }, 500);
    }
  }
  
  // Check saved theme
  function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark-mode');
      themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
  
  // Change Language
  function changeLanguage(lang) {
    // Update active language button
    if (lang === 'id') {
      langIdBtn.classList.add('active');
      langEnBtn.classList.remove('active');
    } else {
      langEnBtn.classList.add('active');
      langIdBtn.classList.remove('active');
    }
    
    // Update all text elements with data-id attribute
    document.querySelectorAll('[data-id]').forEach(element => {
      const key = element.getAttribute('data-id');
      if (translations[lang][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[lang][key];
        } else {
          element.textContent = translations[lang][key];
        }
      }
    });
    
    // Save language preference
    localStorage.setItem('language', lang);
  }
  
  // Check saved language
  function checkSavedLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'id';
    changeLanguage(savedLanguage);
  }
  
  // Filter Projects
  function filterProjects(category) {
    projectCards.forEach(card => {
      const cardCategories = card.getAttribute('data-category');
      
      if (category === 'all' || (cardCategories && cardCategories.includes(category))) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Scroll Animation
  function revealOnScroll() {
    const elements = document.querySelectorAll('.section-header, .skill-item, .project-card, .timeline-item, .contact-item');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('reveal');
      }
    });
  }
  
  // Back to Top Button
  function toggleBackToTopBtn() {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  }
  
  // Animate Progress Bars
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = width;
      }, 300);
    });
  }
  
  // Print CV
  function printCV() {
    window.print();
  }
  
  // Event Listeners
  
  // Mobile Menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Theme Toggle
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  
  // Language Toggle
  if (langIdBtn && langEnBtn) {
    langIdBtn.addEventListener('click', () => changeLanguage('id'));
    langEnBtn.addEventListener('click', () => changeLanguage('en'));
  }
  
  // Project Filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter projects
      const category = btn.getAttribute('data-filter');
      filterProjects(category);
    });
  });
  
  // Back to Top Button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Print CV Button
  const printCVBtn = document.querySelector('button[onclick="window.print()"]');
  if (printCVBtn) {
    printCVBtn.addEventListener('click', printCV);
  }
  
  // Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Here you would typically send the form data to a server
      // For now, we'll just log it and show a success message
      console.log('Form submitted:', { name, email, subject, message });
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Scroll Events
  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Toggle back to top button
    toggleBackToTopBtn();
    
    // Reveal elements on scroll
    revealOnScroll();
  });
  
  // Initialize
  checkSavedTheme();
  checkSavedLanguage();
  animateProgressBars();
  revealOnScroll();
  toggleBackToTopBtn();
  
  // Add CSS for scroll reveal animation
  const style = document.createElement('style');
  style.textContent = `
    .section-header, .skill-item, .project-card, .timeline-item, .contact-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section-header.reveal, .skill-item.reveal, .project-card.reveal, .timeline-item.reveal, .contact-item.reveal {
      opacity: 1;
      transform: translateY(0);
    }
    
    .skill-item, .project-card, .timeline-item, .contact-item {
      transition-delay: calc(var(--i, 0) * 0.1s);
    }
  `;
  document.head.appendChild(style);
  
  // Set transition delays for staggered animations
  document.querySelectorAll('.skill-item, .project-card, .timeline-item, .contact-item').forEach((el, i) => {
    el.style.setProperty('--i', i);
  });
});