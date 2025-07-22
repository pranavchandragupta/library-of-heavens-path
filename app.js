// Library of heavens path - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Focus management for accessibility
                    setTimeout(() => {
                        targetElement.focus();
                    }, 500);
                }
            });
        });
    }
    
    // Enhanced card interactions
    function initCardInteractions() {
        const cards = document.querySelectorAll('.category-card, .intro-card');
        
        cards.forEach(card => {
            // Add subtle animation on hover
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-6px)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.matches(':focus')) {
                    this.style.transform = 'translateY(0)';
                }
            });
            
            // Enhanced focus handling
            card.addEventListener('focus', function() {
                this.style.transform = 'translateY(-6px)';
            });
            
            card.addEventListener('blur', function() {
                if (!this.matches(':hover')) {
                    this.style.transform = 'translateY(0)';
                }
            });
            
            // Add keyboard navigation for category cards
            if (card.classList.contains('category-card')) {
                card.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        // Since these are links, trigger click
                        this.click();
                    }
                });
            }
        });
    }
    
    // Scroll-based animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for grids
                    if (entry.target.classList.contains('intro-grid') || 
                        entry.target.classList.contains('categories-grid')) {
                        const children = entry.target.children;
                        Array.from(children).forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.intro-grid, .categories-grid, .section-title');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
        
        // Initial setup for grid children
        const gridChildren = document.querySelectorAll('.intro-card, .category-card');
        gridChildren.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(20px)';
            child.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }
    
    // Header scroll effect
    function initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.boxShadow = '0 4px 20px rgba(30, 58, 95, 0.25)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = '0 4px 20px rgba(30, 58, 95, 0.15)';
                header.style.backdropFilter = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Enhanced keyboard navigation
    function initKeyboardNavigation() {
        // Add arrow key navigation for card grids
        const cardGrids = document.querySelectorAll('.intro-grid, .categories-grid');
        
        cardGrids.forEach(grid => {
            const cards = grid.querySelectorAll('.intro-card, .category-card');
            
            cards.forEach((card, index) => {
                card.addEventListener('keydown', function(e) {
                    let targetIndex = index;
                    
                    switch(e.key) {
                        case 'ArrowRight':
                            e.preventDefault();
                            targetIndex = (index + 1) % cards.length;
                            break;
                        case 'ArrowLeft':
                            e.preventDefault();
                            targetIndex = (index - 1 + cards.length) % cards.length;
                            break;
                        case 'ArrowDown':
                            e.preventDefault();
                            // Calculate grid columns based on viewport
                            const columns = getComputedGridColumns(grid);
                            targetIndex = Math.min(index + columns, cards.length - 1);
                            break;
                        case 'ArrowUp':
                            e.preventDefault();
                            const columnsUp = getComputedGridColumns(grid);
                            targetIndex = Math.max(index - columnsUp, 0);
                            break;
                        case 'Home':
                            e.preventDefault();
                            targetIndex = 0;
                            break;
                        case 'End':
                            e.preventDefault();
                            targetIndex = cards.length - 1;
                            break;
                    }
                    
                    if (targetIndex !== index) {
                        cards[targetIndex].focus();
                    }
                });
            });
        });
    }
    
    // Helper function to calculate grid columns
    function getComputedGridColumns(grid) {
        const gridStyle = getComputedStyle(grid);
        const columns = gridStyle.gridTemplateColumns.split(' ').length;
        return columns;
    }
    
    // Add loading animation for hero section
    function initHeroAnimation() {
        const heroContent = document.querySelector('.hero-content');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCreator = document.querySelector('.hero-creator');
        const heroNav = document.querySelector('.hero-nav');
        
        // Initial state
        [heroTitle, heroSubtitle, heroCreator, heroNav].forEach((el, index) => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                // Staggered animation
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, index * 200 + 300);
            }
        });
    }
    
    // Enhanced focus indicators
    function initFocusEnhancements() {
        // Add focus ring enhancement
        const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--color-library-accent)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }
    
    // Skip link functionality
    function initSkipLink() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    }
    
    // Add subtle parallax effect to hero background
    function initParallaxEffect() {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${parallax}px)`;
            }
        });
    }
    
    // Initialize all functions
    initSmoothScrolling();
    initCardInteractions();
    initScrollAnimations();
    initHeaderScrollEffect();
    initKeyboardNavigation();
    initHeroAnimation();
    initFocusEnhancements();
    initSkipLink();
    initParallaxEffect();
    
    // Add custom event for when all animations are complete
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('libraryAnimationsComplete'));
    }, 2000);
    
    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Apply throttling to scroll-heavy functions
    const throttledScrollHandler = throttle(function() {
        // Any additional scroll-based functionality can go here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', function() {
        // Recalculate any layout-dependent features
        const cards = document.querySelectorAll('.category-card, .intro-card');
        cards.forEach(card => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add error handling for any failed animations
    window.addEventListener('error', function(e) {
        console.warn('Animation error caught:', e.message);
    });
    
    // Accessibility: Respect reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Disable animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
});

// Export functions for potential testing or external use
window.LibraryOfHeavens = {
    // Utility function to highlight a specific category
    highlightCategory: function(categoryTitle) {
        const cards = document.querySelectorAll('.category-card');
        cards.forEach(card => {
            const title = card.querySelector('.category-title');
            if (title && title.textContent.includes(categoryTitle)) {
                card.style.borderColor = 'var(--color-library-gold)';
                card.style.boxShadow = '0 8px 30px rgba(212, 175, 55, 0.3)';
                card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    },
    
    // Utility function to update editable content
    updateEditableContent: function(sectionTitle, newContent) {
        const introCards = document.querySelectorAll('.intro-card');
        introCards.forEach(card => {
            const title = card.querySelector('.intro-title');
            if (title && title.textContent === sectionTitle) {
                const content = card.querySelector('.intro-content');
                if (content) {
                    content.textContent = newContent;
                }
            }
        });
    }
};