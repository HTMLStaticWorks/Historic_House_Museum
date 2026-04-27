/**
 * Historic House Museum - Dashboard JS
 * Logic for Admin/User Dashboard placeholders
 */

document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.dashboard-wrapper')) {
        initDashboard();
    }
});

function initDashboard() {
    console.log('Dashboard initialized');
    
    // User Stats Counter Example
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = 200;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // Mock Chart Rendering 
    const chartCtx = document.getElementById('analyticsChart');
    if (chartCtx) {
        // Placeholder for Chart implementation if a library like Chart.js were used
        // Since we are Vanilla JS, we'll just mock the container state
        chartCtx.innerHTML = '<div class="p-5 text-center text-muted">Analytics Chart Placeholder</div>';
    }
}

/**
 * Handle Dashboard Notifications
 */
function pushNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'dashboard-toast animate-in';
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
