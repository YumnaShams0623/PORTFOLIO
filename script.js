
    // DOM Elements
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = document.getElementById('scrollTop');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Theme Toggle Function
    function toggleTheme() {
      if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
        localStorage.setItem('theme', 'light');
      } else {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      
      // Update mobile menu background
      if (htmlElement.classList.contains('dark')) {
        mobileMenu.style.background = 'rgba(15, 23, 42, 0.95)';
      } else {
        mobileMenu.style.background = 'rgba(248, 250, 252, 0.95)';
      }
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      htmlElement.className = savedTheme;
    } else {
      // Use device preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        htmlElement.classList.remove('dark');
        htmlElement.classList.add('light');
      }
    }
    
    // Update mobile menu background initially
    if (htmlElement.classList.contains('dark')) {
      mobileMenu.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
      mobileMenu.style.background = 'rgba(248, 250, 252, 0.95)';
    }
    
    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      menuToggle.innerHTML = mobileMenu.classList.contains('open') ? 
        '<i class="fas fa-times text-2xl"></i>' : 
        '<i class="fas fa-bars text-2xl"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
      });
    });
    
    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = document.documentElement.scrollTop;
      const progress = (scrolled / scrollTotal) * 100;
      scrollProgress.style.width = `${progress}%`;
      
      // Show/hide scroll to top button
      if (scrolled > 300) {
        scrollTop.classList.add('visible');
      } else {
        scrollTop.classList.remove('visible');
      }
      
      // Update active nav link
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrolled >= sectionTop && scrolled < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
      
      // Animate elements when they come into view
      animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 50) {
          element.classList.add('visible');
        }
      });
    });
    
    // Scroll to top when button is clicked
    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Typing effect
    const typedTextElement = document.getElementById('typedText');
    const phrases = ['Graphic Designer', 'Web Developer', 'UI/UX Designer', 'BSCS Student'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1500; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next phrase
      }
      
      setTimeout(typeEffect, typeSpeed);
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return;
      }
      
      // In a real application, you would send this data to a server
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
    
    // Initialize animations on page load
    document.addEventListener('DOMContentLoaded', function() {
      // Start typing effect
      setTimeout(typeEffect, 1000);
      
      // Trigger scroll event to initialize animations
      window.dispatchEvent(new Event('scroll'));
      
      // Initialize progress bars
      setTimeout(() => {
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
      }, 1000);
    });
    
    // Initialize animations immediately without waiting for DOMContentLoaded
    setTimeout(() => {
      // Make hero section elements visible immediately
      document.querySelectorAll('#home .fade-in').forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 200);
      });
      
      // Trigger scroll event to initialize other animations
      window.dispatchEvent(new Event('scroll'));
    }, 300);
