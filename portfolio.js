const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Scroll to top button functionality
  const scrollToTopBtn = document.querySelector('.scroll-to-top'); // Fixed selector
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'block';
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.style.display = 'none';
      scrollToTopBtn.classList.remove('visible');
    }
  });
  
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Form submission animation
  const contactForm = document.getElementById('contactForm'); // Fixed form selector
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        submitButton.textContent = 'Sent!';
        submitButton.style.backgroundColor = '#27ae60';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after delay
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.backgroundColor = '';
          submitButton.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
  
  // Typing animation for intro text
  const introText = document.querySelector('.intro-text h1');
  if (introText) {
    const text = introText.textContent;
    introText.textContent = '';
  
    let charIndex = 0;
    function typeText() {
      if (charIndex < text.length) {
        introText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
      }
    }
  
    // Start typing animation when page loads
    window.addEventListener('load', typeText);
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });