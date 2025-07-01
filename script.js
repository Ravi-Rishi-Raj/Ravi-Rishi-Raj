
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Mobile Navigation Toggle
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');
    const sidebar = document.getElementById('sidebar');
    
    mobileNavToggle.addEventListener('click', function() {
      if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      } else {
        sidebar.classList.add('active');
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      }
    });

  // Handle LinkedIn links explicitly
  const linkedinLinks = document.querySelectorAll('.linkedin');
  linkedinLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default link behavior
      window.open(this.href, '_blank'); // Open link in a new tab
    });
  });
    
    // Close mobile navigation when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 768) {
          sidebar.classList.remove('active');
          hamburgerIcon.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    });
    
    // Active Navigation Item Highlighting
    function highlightNavItem() {
      const sections = document.querySelectorAll('section');
      let currentSection = 'hero';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    
    // Typing Animation in Hero Section
    const typedText = document.getElementById('typed-text');
    const titles = ['Web Developer', 'Application Developer', 'Technical Expert', 'Photographer'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeEffect() {
      const currentTitle = titles[titleIndex % titles.length];
      
      if (isDeleting) {
        typedText.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 80; // Faster when deleting
      } else {
        typedText.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150; // Normal speed when typing
      }
      
      // If word is complete, start deleting after a pause
      if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause before starting to delete
      } 
      // If deletion is complete, move to next word
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex++;
        typingSpeed = 500; // Pause before typing the next word
      }
      
      setTimeout(typeEffect, typingSpeed);
    }
    
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Skills Animation
    function animateSkills() {
      const skillBars = document.querySelectorAll('.progress-fill');
      skillBars.forEach(skillBar => {
        const width = skillBar.style.width;
        skillBar.style.width = '0%';
        
        setTimeout(() => {
          skillBar.style.width = width;
        }, 300);
      });
    }
    
    // Trigger skill animation when scrolled into view
    const skillsSection = document.querySelector('.skills-section');
    let skillsAnimated = false;
    
    function checkSkillsInView() {
      if (skillsSection && !skillsAnimated) {
        const rect = skillsSection.getBoundingClientRect();
        const isInView = (rect.top <= window.innerHeight) && (rect.bottom >= 0);
        
        if (isInView) {
          animateSkills();
          skillsAnimated = true;
        }
      }
    }
    
    window.addEventListener('scroll', checkSkillsInView);
    checkSkillsInView(); // Check on initial load
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
          // Simulated success response
          alert('Your message has been sent. Thank you!');
          
          // Reset form
          contactForm.reset();
          submitButton.textContent = 'Send Message';
          submitButton.disabled = false;
        }, 1500);
      });
    }
    
    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('active');
      } else {
        scrollToTopBtn.classList.remove('active');
      }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Animation on Scroll
    function animateOnScroll() {
      const elementsToAnimate = document.querySelectorAll('.service-box, .portfolio-item, .resume-item');
      
      elementsToAnimate.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInView = (rect.top <= window.innerHeight - 100);
        
        if (isInView) {
          element.classList.add('animate-fade');
        }
      });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        sidebar.classList.add('active');
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      } else if (!sidebar.classList.contains('active')) {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });
    
    // Initialize
    if (window.innerWidth >= 768) {
      sidebar.classList.add('active');
    }
  });