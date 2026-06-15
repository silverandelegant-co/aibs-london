(function () {
  'use strict';

  /* Helpers */
  const $ = (selector, context) => (context || document).querySelector(selector);
  const $$ = (selector, context) => Array.from((context || document).querySelectorAll(selector));

  /* 1. Nav: scroll behaviour */
  const nav = $('#nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* 2. Mobile nav toggle */
  const navToggle = $('#nav-toggle');
  const navLinks  = $('#nav-links');
  const navOverlay = $('#nav-overlay');
  
  if (navToggle && navLinks) {
    const toggleMenu = (open) => {
      navLinks.classList.toggle('open', open);
      if (navOverlay) navOverlay.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    };

    navToggle.addEventListener('click', () => {
      const open = !navLinks.classList.contains('open');
      toggleMenu(open);
    });

    // Close when clicking overlay or menu links
    const closeElements = [navOverlay, ...$$('a', navLinks)];
    closeElements.forEach(el => {
      if (el) {
        el.addEventListener('click', () => toggleMenu(false));
      }
    });
  }

  /* 3. Smooth scrolling for internal anchor links */
  const anchors = $$('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = $(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Hide mobile menu if open
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (navOverlay) navOverlay.classList.remove('open');
          navToggle.classList.remove('open');
          document.body.style.overflow = '';
        }

        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = targetPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* 4. Scroll reveal using IntersectionObserver */
  const reveals = $$('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* 5. Contact Form Submission (Web3Forms AJAX) */
  const invitationForm = $('#invitation-form');
  if (invitationForm) {
    const submitBtn = $('#invite-submit', invitationForm);
    const btnText = $('.submit-text', submitBtn);
    const btnLoader = $('.btn-loader', submitBtn);
    const successAlert = $('.success-result');
    const errorAlert = $('.error-result');

    invitationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Hide any previous alerts
      if (successAlert) successAlert.style.display = 'none';
      if (errorAlert) errorAlert.style.display = 'none';

      // Show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
      }

      const formData = new FormData(invitationForm);
      const json = JSON.stringify(Object.fromEntries(formData));

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        let result = await response.json();
        if (response.status === 200) {
          // Success
          if (successAlert) successAlert.style.display = 'flex';
          invitationForm.reset();
          invitationForm.style.display = 'none';
        } else {
          // API error
          console.error(result);
          if (errorAlert) {
            const errorMsgEl = $('.error-msg', errorAlert);
            if (errorMsgEl && result.message) {
              errorMsgEl.textContent = result.message;
            }
            errorAlert.style.display = 'flex';
          }
        }
      })
      .catch((error) => {
        // Network error
        console.error(error);
        if (errorAlert) {
          const errorMsgEl = $('.error-msg', errorAlert);
          if (errorMsgEl) {
            errorMsgEl.textContent = 'Something went wrong. Please check your network connection and try again.';
          }
          errorAlert.style.display = 'flex';
        }
      })
      .then(() => {
        // Restore button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        }
      });
    });
  }

})();
