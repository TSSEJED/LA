// Simple preloader hide when everything is loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    document.body.classList.remove('loading');
});

// Fallback in case load event doesn't fire
setTimeout(function() {
    document.body.classList.add('loaded');
    document.body.classList.remove('loading');
}, 2000);

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.reveal, .content-box');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Initialize animations
    animateOnScroll();

    // Add hover effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', (e) => {
            const rect = ctaButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctaButton.style.setProperty('--x', `${x}px`);
            ctaButton.style.setProperty('--y', `${y}px`);
        });
    }

    // Add loading animation
    document.body.classList.add('loaded');

    // Smooth scroll to top on page refresh
    window.onbeforeunload = () => {
        window.scrollTo(0, 0);
    };
});

// Add touch support for mobile devices
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    // Add swipe up/down handling if needed
}
