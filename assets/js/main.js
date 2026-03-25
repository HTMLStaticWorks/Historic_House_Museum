/**
 * Historic House Museum - Main JS
 * Features: Dark Mode, Sticky Header, Form Validation, Preloader, RTL Support Helper
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initStickyHeader();
    initDarkMode();
    initFormValidation();
    initActiveLinks();
    initAOS();
    initRTL();
    initPageTransition();
});

/**
 * Preloader Fade Out
 */
function initPreloader() {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 800);
    }
}

/**
 * Sticky Header Logic
 */
function initStickyHeader() {
    const header = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Dark Mode Toggler
 */
function initDarkMode() {
    const themeToggle = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-bs-theme', currentTheme);
    
    if (themeToggle) {
        if (currentTheme === 'dark') themeToggle.classList.add('active');
        
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme', theme);
            themeToggle.classList.toggle('active');
            
            // Switch icon
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
                } else {
                    icon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
                }
            }
        });
    }
}

/**
 * Bootstap Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Active Link Highlighting
 */
function initActiveLinks() {
    const currentLocation = location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

/**
 * Simple Intersection Observer for Animations (Alternative to AOS library)
 */
function initAOS() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * RTL Support Toggler
 */
function initRTL() {
    const rtlToggle = document.querySelector('#rtl-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';

    document.documentElement.setAttribute('dir', currentDir);
    
    if (rtlToggle) {
        if (currentDir === 'rtl') rtlToggle.classList.add('active');
        
        rtlToggle.addEventListener('click', () => {
            const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            document.documentElement.setAttribute('dir', dir);
            localStorage.setItem('dir', dir);
            rtlToggle.classList.toggle('active');
        });
    }
}

/**
 * RTL Support Helper (Manual switch if needed)
 */
function toggleRTL() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const newDir = isRTL ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    localStorage.setItem('dir', newDir);
}

/**
 * Fade overlay while navigating between pages to mask the brief blank screen.
 */
function initPageTransition() {
    const mask = document.createElement('div');
    mask.className = 'page-transition-mask';
    document.body.appendChild(mask);

    const shouldHandle = (link) => {
        if (!link.href) return false;
        if (link.target && link.target !== '_self') return false;
        if (link.hasAttribute('download') || link.getAttribute('aria-disabled') === 'true') return false;
        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin) return false;
        if (link.hash && url.pathname === window.location.pathname) return false;
        return true;
    };

    const onClick = (event) => {
        const anchor = event.target.closest('a');
        if (!anchor || !shouldHandle(anchor)) return;
        event.preventDefault();
        mask.classList.add('visible');
        const delay = 280;
        setTimeout(() => {
            window.location.assign(anchor.href);
        }, delay);
    };

    document.addEventListener('click', onClick, true);

    window.addEventListener('pageshow', () => {
        mask.classList.remove('visible');
    });
}
