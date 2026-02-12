/**
 * Al-Hidayah Madrasa Website Scripts
 * Interactive features and form handling
 */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Registration Form Handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData);
            
            // Display success message
            alert('بارك الله فيك (Barakallahu feek)!\n\nThank you for your registration application!\n\nYour application has been received. Our admissions team will contact you within 3-5 business days.\n\nPlease check your email for confirmation and next steps.');
            
            // Log form data (in production, this would be sent to a server)
            console.log('Registration Form Submitted:', data);
            
            // Reset form
            registrationForm.reset();
        });
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Display success message
            alert('جزاك الله خيرا (Jazakallahu Khairan)!\n\nThank you for contacting us!\n\nYour message has been received. We will respond to your inquiry as soon as possible, insha\'Allah.\n\nPlease check your email for our response.');
            
            // Log form data (in production, this would be sent to a server)
            console.log('Contact Form Submitted:', data);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .value-card, .facility-item, .requirement-card, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Form validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add real-time email validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.style.borderColor = '#dc3545';
                // Add error message if it doesn't exist
                if (!this.nextElementSibling || !this.nextElementSibling.classList.contains('error-message')) {
                    const error = document.createElement('span');
                    error.className = 'error-message';
                    error.style.color = '#dc3545';
                    error.style.fontSize = '0.875rem';
                    error.textContent = 'Please enter a valid email address';
                    this.parentNode.appendChild(error);
                }
            } else {
                this.style.borderColor = '';
                // Remove error message if it exists
                if (this.nextElementSibling && this.nextElementSibling.classList.contains('error-message')) {
                    this.nextElementSibling.remove();
                }
            }
        });
    });
    
    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerYears = document.querySelectorAll('.footer-bottom p');
    footerYears.forEach(p => {
        if (p.textContent.includes('2026')) {
            p.textContent = p.textContent.replace('2026', currentYear);
        }
    });
});

// Utility function to format phone numbers
function formatPhoneNumber(input) {
    const cleaned = input.value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
        input.value = !match[2] ? match[1] : '(' + match[1] + ') ' + match[2] + (match[3] ? '-' + match[3] : '');
    }
}

// Add phone number formatting to phone inputs
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
});

// Prayer times update (placeholder - would need actual API integration)
function updatePrayerTimes() {
    // This is a placeholder. In production, you would fetch prayer times from an API
    // based on the user's location or the madrasa's location
    console.log('Prayer times would be updated here from an API');
}

// Check if user wants to update prayer times
if (document.querySelector('.prayer-times')) {
    updatePrayerTimes();
}
