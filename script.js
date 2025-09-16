// Initialize EmailJS with your public key
(function() {
    emailjs.init("mzVVUMF7GPWPkNWU1");
})();

// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements that should animate
const animateElements = document.querySelectorAll('.about-content, .project-card, .certificate-card, .contact-content');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form validation functions
function validateName(name) {
    if (!name || name.trim().length === 0) {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return null;
}

function validateEmail(email) {
    if (!email || email.trim().length === 0) {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return null;
}

function validateMessage(message) {
    if (!message || message.trim().length === 0) {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return null;
}

function showFieldError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (errorMessage) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
    }
}

function clearAllErrors() {
    ['name', 'email', 'message'].forEach(field => {
        showFieldError(field, null);
    });
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('formMessage');
    messageElement.textContent = message;
    messageElement.className = `form-message show ${type}`;
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

// Contact form handling with EmailJS
const contactForm = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoader = submitButton.querySelector('.button-loader');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous errors and messages
    clearAllErrors();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate form fields
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const messageError = validateMessage(message);
    
    // Show validation errors
    showFieldError('name', nameError);
    showFieldError('email', emailError);
    showFieldError('message', messageError);
    
    // Stop if there are validation errors
    if (nameError || emailError || messageError) {
        showFormMessage('Please fix the errors above', 'error');
        return;
    }
    
    // Prepare template parameters
    const templateParams = {
        from_name: name.trim(),
        from_email: email.trim(),
        message: message.trim(),
        to_name: 'Anthony Moutafian'
    };
    
    // Show loading state
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoader.style.display = 'inline-block';
    
    // Send email using EmailJS
    emailjs.send('anthony-portfolio', 'template_t6qrvhl', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
            clearAllErrors();
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            showFormMessage('Oops! Something went wrong, please try again.', 'error');
        })
        .finally(function() {
            // Reset button state
            submitButton.disabled = false;
            buttonText.style.display = 'inline-block';
            buttonLoader.style.display = 'none';
        });
});

// Real-time validation
document.getElementById('name').addEventListener('blur', function() {
    const error = validateName(this.value);
    showFieldError('name', error);
});

document.getElementById('email').addEventListener('blur', function() {
    const error = validateEmail(this.value);
    showFieldError('email', error);
});

document.getElementById('message').addEventListener('blur', function() {
    const error = validateMessage(this.value);
    showFieldError('message', error);
});

// Clear errors on input
document.getElementById('name').addEventListener('input', function() {
    if (this.classList.contains('error')) {
        showFieldError('name', null);
    }
});

document.getElementById('email').addEventListener('input', function() {
    if (this.classList.contains('error')) {
        showFieldError('email', null);
    }
});

document.getElementById('message').addEventListener('input', function() {
    if (this.classList.contains('error')) {
        showFieldError('message', null);
    }
});

// Add loading animation to CTA button
const ctaButton = document.querySelector('.cta-button');

ctaButton.addEventListener('click', function(e) {
    // Create ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    
    this.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const rate = scrolled * -0.5;
    
    if (heroBackground) {
        heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
});

// Add typing animation to hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        setTimeout(() => {
            typeWriter(animatedText, 'Frontend Developer', 150);
        }, 2000);
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Add glow effect to buttons on hover
document.querySelectorAll('.cta-button, .submit-button, .project-link').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.5)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// Preloader (optional enhancement)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add smooth reveal animation for sections
const sections = document.querySelectorAll('section');
sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
});

// Enhanced scroll animations
const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections for enhanced animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    enhancedObserver.observe(section);
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.innerHTML = `&copy; ${currentYear} Anthony Moutafian. All rights reserved.`;
}