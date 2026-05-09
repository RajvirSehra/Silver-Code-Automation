document.addEventListener('DOMContentLoaded', function () {
  /* =========================================================
     NAV SCROLL STATE
  ========================================================= */
  const nav = document.getElementById('nav');

  function handleNavScroll() {
    if (window.scrollY > 12) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  /* =========================================================
     MOBILE NAV
  ========================================================= */
  const navToggle = document.getElementById('navToggle');
  const mobilePanel = document.getElementById('mobilePanel');

  if (navToggle && mobilePanel) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobilePanel.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobilePanel.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =========================================================
     SMOOTH ANCHOR SCROLL WITH NAV OFFSET
  ========================================================= */
  const consultationLinks = document.querySelectorAll('a[href="#consultation-booking"]');

  consultationLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      const target = document.getElementById('consultation-booking');
      if (!target) {
        return;
      }

      event.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = Math.max(targetTop - navHeight - 10, 0);

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  });

  /* =========================================================
     REVEAL ON SCROLL
  ========================================================= */
  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0
      }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* =========================================================
     FAQ ACCORDION
  ========================================================= */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('open');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        otherAnswer.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* =========================================================
     DEMO FORM HANDLER
     Replace with real integration later
  ========================================================= */
  const auditForm = document.querySelector('.audit-form');

  // Form is now handled via formsubmit.co

});
