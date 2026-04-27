/**
 * Historic House Museum - Main JS
 * Features: Dark Mode, Sticky Header, Form Validation, RTL Support Helper
 */

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initDarkMode();
    initFormValidation();
    initActiveLinks();
    initAOS();
    initRTL();
    initNavCollapseOnLink();
});

/**
 * Sticky Header Logic
 */
function initStickyHeader() {
    const header = document.querySelector('.navbar');
    if (!header) return;
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
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
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
 * Close the collapsed navbar after selecting a menu item in tablet/phone view.
 */
function initNavCollapseOnLink() {
    const toggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarSupportedContent');
    if (!toggler || !navbarCollapse) return;

    const shouldHandle = () => {
        return window.innerWidth <= 1024 && window.getComputedStyle(toggler).display !== 'none';
    };

    navbarCollapse.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (shouldHandle() && navbarCollapse.classList.contains('show')) {
                toggler.click();
            }
        });
    });
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
