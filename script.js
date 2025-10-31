// Mobile Navigation Toggle dengan animasi hamburger
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        if (navLinks) navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (menuToggle) menuToggle.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        
        // Update active state
        navLinksItems.forEach(link => link.classList.remove('active'));
        item.classList.add('active');
    });
});

// Smooth scrolling for navigation links dengan offset untuk fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Navbar background change on scroll dengan glass effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.glass-nav');
    if (!navbar) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(30, 41, 59, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(30, 41, 59, 0.8)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 3D Parallax Effect untuk background shapes
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.floating-shape');
    if (shapes.length === 0) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * 20 * speed;
        const y = (mouseY - 0.5) * 20 * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Simple Intersection Observer untuk animasi
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.timeline-item-3d, .expertise-card-3d, .project-card-3d, .testimonial-card-3d');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.6s ease';
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Animate hero elements on load
function initHeroAnimations() {
    // Animate hero text elements dengan stagger
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-stats, .hero-actions');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + index * 200);
    });
    
    // Animate tech sphere
    const techSphere = document.querySelector('.tech-sphere-3d');
    if (techSphere) {
        techSphere.style.opacity = '0';
        techSphere.style.transform = 'scale(0.8) rotate(180deg)';
        techSphere.style.transition = 'all 1s ease 0.5s';
        
        setTimeout(() => {
            techSphere.style.opacity = '1';
            techSphere.style.transform = 'scale(1) rotate(0deg)';
        }, 600);
    }
    
    // Animate floating tech items
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0)';
        item.style.transition = `all 0.5s ease ${1 + index * 0.2}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        }, 1000 + index * 200);
    });
}

// Hover effects untuk cards
function initCardHoverEffects() {
    document.querySelectorAll('.timeline-card-3d, .expertise-card-3d, .project-card-3d, .testimonial-card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            card.style.boxShadow = `
                0 30px 60px rgba(0, 0, 0, 0.2),
                ${rotateY * 2}px ${rotateX * 2}px 20px rgba(0, 0, 0, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            
            // Reset transform setelah transition
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 300);
        });
    });
}

// Typewriter effect untuk hero title
function typeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title .title-line');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing setelah hero elements selesai animasi
    setTimeout(type, 1500);
}

// Counter animation untuk stats
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const target = parseInt(originalText);
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        function updateCounter() {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current) + (originalText.includes('%') ? '%' : '+');
                setTimeout(updateCounter, stepTime);
            } else {
                stat.textContent = originalText;
            }
        }
        
        // Start counter ketika stats masuk viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTop = document.createElement('div');
    scrollToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    document.body.appendChild(scrollToTop);

    // Style the scroll to top button
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
        font-size: 1.2rem;
        border: none;
        outline: none;
    `;

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
            scrollToTop.style.transform = 'translateY(0)';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
            scrollToTop.style.transform = 'translateY(20px)';
        }
    });
}

// Initialize semua functions ketika DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollAnimations();
    initCardHoverEffects();
    initScrollToTop();
    typeWriterEffect();
    animateCounters();
    
    // Add loaded class untuk trigger animations
    document.body.classList.add('loaded');
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            updateActiveNavLink();
        }, 100);
    }
});

// Touch device optimization
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Reduce animation durations untuk touch devices
    const style = document.createElement('style');
    style.textContent = `
        .touch-device * {
            animation-duration: 0.6s !important;
            transition-duration: 0.3s !important;
        }
    `;
    document.head.appendChild(style);
}

// Preloader removal
window.addEventListener('load', () => {
    // Remove preloader jika ada
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key untuk close mobile menu
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});
