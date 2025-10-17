// ============================================
// MOBILE MENU TOGGLE
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
if (navLinks.length) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
        });
    });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSelector = this.getAttribute('href');
        if (!targetSelector || targetSelector === '#') return;

        const target = document.querySelector(targetSelector);

        if (target) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// TESTIMONIAL CAROUSEL
// ============================================
const testimonialTrack = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('carouselDots');
const testimonials = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;
let autoSlideInterval;

if (testimonialTrack && dotsContainer && testimonials.length) {
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        const offset = -currentIndex * 100;
        testimonialTrack.style.transform = `translateX(${offset}%)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateCarousel();
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Start auto-sliding
    startAutoSlide();

    // Pause on hover
    testimonialTrack.addEventListener('mouseenter', stopAutoSlide);
    testimonialTrack.addEventListener('mouseleave', startAutoSlide);
}

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
const animatedElements = document.querySelectorAll(
    '.service-card, .project-card, .skill-category, .testimonial-card, .about-grid, .contact-grid'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// CONTACT FORM HANDLING
// ============================================


// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================
let scrollTopBtn = null;

function createScrollTopButton() {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 999;
        font-size: 1.2rem;
    `;

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollTopBtn);
}

createScrollTopButton();

window.addEventListener('scroll', () => {
    if (!scrollTopBtn) return;
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION - Lazy Loading
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset && img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imgObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// TYPING EFFECT FOR HERO (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }

// ============================================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ============================================
function createCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.circle');

    if (circles.length === 0) return;

    circles.forEach((circle) => {
        circle.x = 0;
        circle.y = 0;
    });

    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });

    function animateCircles() {
        let x = coords.x;
        let y = coords.y;

        circles.forEach((circle, index) => {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();
}


// ============================================
// ACTIVE SECTION HIGHLIGHT IN NAVIGATION
// ============================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinksLocal = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinksLocal.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id') || '';
            }
        });

        navLinksLocal.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (current && href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

highlightActiveSection();

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');

    // Log performance metrics (optional)
    try {
        if (window.performance && window.performance.timing) {
            const perfData = window.performance.timing;
            const navigationStart = perfData.navigationStart || 0;
            const loadEventEnd = perfData.loadEventEnd || 0;
            if (navigationStart && loadEventEnd && loadEventEnd >= navigationStart) {
                const pageLoadTime = loadEventEnd - navigationStart;
                console.log(`Page loaded in ${pageLoadTime}ms`);
            }
        }
    } catch (e) {
        // ignore
    }
});// ============================================
// EMAILJS INTEGRATION FOR CONTACT FORM
// ============================================
(function initEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.warn('EmailJS library not found. Skipping email integration.');
    return;
  }

  try {
    emailjs.init('mS2oDfOm5fvbktnAx'); // Replace with your real EmailJS Public Key
  } catch (err) {
    console.error('EmailJS init error:', err);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Prevent multiple handlers
    if (form.dataset.emailjsAttached === 'true') return;
    form.dataset.emailjsAttached = 'true';

    const status = document.getElementById('form-status');
    const sendBtn = document.getElementById('sendBtn');

    function setStatus(message, color) {
      if (status) {
        status.textContent = message;
        status.style.color = color || '';
      } else {
        alert(message);
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
      }

      // Send email using EmailJS
      emailjs.sendForm('service_ezw1qrh', 'template_fxvpa12', this)
        .then(function () {
          setStatus('✅ Message sent successfully!', 'green');
          form.reset();
        }, function (error) {
          console.error('EmailJS Error:', error);
          setStatus('❌ Failed to send message. Please try again.', 'red');
        })
        .finally(function () {
          if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Message';
          }
        });
    });
  });
})();

