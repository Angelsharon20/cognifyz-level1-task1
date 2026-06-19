/**
 * script.js – Cognifyz Level 1 Task 1
 * Responsibilities:
 *  1. Navbar scroll effect
 *  2. Animated stat counters (home page)
 *  3. Real-time client-side form validation (contact page)
 *  4. Character counter for message textarea
 *  5. Loading state on form submit
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────
     1. NAVBAR – add .scrolled class on scroll
  ───────────────────────────────────────────────────── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ─────────────────────────────────────────────────────
     2. STAT COUNTERS (home page only)
  ───────────────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num[data-target]');

  if (statNums.length) {
    /**
     * Animate a single counter element from 0 → target.
     * Uses IntersectionObserver to fire only when visible.
     */
    const animateCounter = (el) => {
      const target   = parseInt(el.dataset.target, 10);
      const duration = 1400; // ms
      const start    = performance.now();

      const step = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNums.forEach(el => observer.observe(el));
  }

  /* ─────────────────────────────────────────────────────
     3. CLIENT-SIDE FORM VALIDATION
     Runs on every input/blur so users get instant feedback.
     Server-side validation (express-validator) is the
     authoritative guard – this is a UX layer only.
  ───────────────────────────────────────────────────── */
  const form = document.getElementById('contactForm');
  if (!form) return; // not on the contact page

  // ── 3a. Validation rules ──────────────────────────
  const rules = {
    fullName: {
      validate: (v) => {
        if (!v.trim())           return 'Full name is required.';
        if (v.trim().length < 2) return 'Name must be at least 2 characters.';
        if (v.trim().length > 60)return 'Name must be under 60 characters.';
        if (!/^[a-zA-Z\s'\-]+$/.test(v.trim())) return 'Only letters, spaces, hyphens, or apostrophes allowed.';
        return null;
      },
    },
    email: {
      validate: (v) => {
        if (!v.trim()) return 'Email address is required.';
        // RFC-ish email regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Please enter a valid email address.';
        return null;
      },
    },
    phone: {
      validate: (v) => {
        if (!v.trim()) return null; // optional
        if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v.trim())) {
          return 'Please enter a valid phone number.';
        }
        return null;
      },
    },
    subject: {
      validate: (v) => {
        if (!v.trim())           return 'Subject is required.';
        if (v.trim().length < 3) return 'Subject must be at least 3 characters.';
        if (v.trim().length > 100) return 'Subject must be under 100 characters.';
        return null;
      },
    },
    message: {
      validate: (v) => {
        if (!v.trim())            return 'Message is required.';
        if (v.trim().length < 10) return 'Message must be at least 10 characters.';
        if (v.trim().length > 1000) return 'Message must be under 1000 characters.';
        return null;
      },
    },
  };

  // ── 3b. Helper: show/clear a field's error ─────────
  const setFieldState = (fieldName, errorMsg) => {
    const input    = form.querySelector(`[name="${fieldName}"]`);
    const errorEl  = document.getElementById(`err-${fieldName}`);
    const groupEl  = input ? input.closest('.form-group-custom') : null;

    if (!input || !groupEl) return;

    if (errorMsg) {
      groupEl.classList.add('has-error');
      groupEl.classList.remove('is-valid');
      if (errorEl) errorEl.textContent = errorMsg;
    } else {
      groupEl.classList.remove('has-error');
      groupEl.classList.add('is-valid');
      if (errorEl) errorEl.textContent = '';
    }
  };

  // ── 3c. Validate a single field ────────────────────
  const validateField = (fieldName) => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (!input || !rules[fieldName]) return true;
    const error = rules[fieldName].validate(input.value);
    setFieldState(fieldName, error);
    return error === null;
  };

  // ── 3d. Attach blur listeners for real-time feedback
  Object.keys(rules).forEach(fieldName => {
    const input = form.querySelector(`[name="${fieldName}"]`);
    if (!input) return;

    // Validate on blur (when user leaves the field)
    input.addEventListener('blur', () => validateField(fieldName));

    // Clear error as soon as user starts typing again
    input.addEventListener('input', () => {
      const groupEl = input.closest('.form-group-custom');
      if (groupEl && groupEl.classList.contains('has-error')) {
        validateField(fieldName);
      }
    });
  });

  // ── 3e. Full form validation on submit ─────────────
  form.addEventListener('submit', (e) => {
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      if (!validateField(fieldName)) isValid = false;
    });

    if (!isValid) {
      e.preventDefault();
      // Scroll to first error
      const firstError = form.querySelector('.has-error .form-input-custom');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
      return;
    }

    // Show loading state so user knows something is happening
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      const btnText   = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      const btnIcon   = submitBtn.querySelector('.btn-icon');

      if (btnText)   btnText.classList.add('d-none');
      if (btnLoader) btnLoader.classList.remove('d-none');
      if (btnIcon)   btnIcon.classList.add('d-none');
      submitBtn.disabled = true;
    }
  });

  /* ─────────────────────────────────────────────────────
     4. CHARACTER COUNTER for message textarea
  ───────────────────────────────────────────────────── */
  const messageInput = document.getElementById('message');
  const charCount    = document.getElementById('charCount');
  const MAX_CHARS    = 1000;

  if (messageInput && charCount) {
    const updateCount = () => {
      const len = messageInput.value.length;
      charCount.textContent = `${len} / ${MAX_CHARS}`;

      charCount.classList.remove('near-limit', 'at-limit');
      if (len >= MAX_CHARS)        charCount.classList.add('at-limit');
      else if (len >= MAX_CHARS * 0.85) charCount.classList.add('near-limit');
    };

    messageInput.addEventListener('input', updateCount);
    // Initialise on page load (important when form data is repopulated after error)
    updateCount();
  }

});
