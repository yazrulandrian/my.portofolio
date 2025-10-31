// Simple JavaScript tanpa CSP issues
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navLinks) navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.glass-nav');
        if (!navbar) return;
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(30, 41, 59, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(30, 41, 59, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add pre-animate class to elements
    const animatedElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-actions, .tech-sphere-3d, .tech-item, .timeline-item-3d, .expertise-card-3d, .project-card-3d, .testimonial-card-3d');
    
    animatedElements.forEach(function(el) {
        el.classList.add('pre-animate');
    });

    // Animate elements on load
    setTimeout(function() {
        animatedElements.forEach(function(el) {
            el.classList.add('animate-in');
        });
    }, 100);

    // Scroll to top button
    const scrollToTop = document.createElement('div');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTop);

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
});
