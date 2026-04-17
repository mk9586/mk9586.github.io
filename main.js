/* GAKK Consulting — main.js
   Responsibilities: mobile nav toggle, contact form validation, scroll animations */

// --- Mobile nav toggle ---

const toggleBtn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('nav-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// --- Dropdown click-toggle (desktop) ---

document.querySelectorAll('.has-dropdown').forEach(item => {
    item.querySelector(':scope > a').addEventListener('click', e => {
        if (window.innerWidth > 768) {
            e.preventDefault();
            item.classList.toggle('open');
        }
    });
});

document.addEventListener('click', e => {
    if (window.innerWidth > 768 && !e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown.open')
            .forEach(el => el.classList.remove('open'));
    }
});

// --- Scroll-triggered reveal animations ---

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealElements = document.querySelectorAll('.animate-in');

    if (revealElements.length) {
        // Stagger items inside grids
        document.querySelectorAll('.value-grid, .stagger-group').forEach(group => {
            group.querySelectorAll('.animate-in').forEach((el, i) => {
                el.style.transitionDelay = (i * 100) + 'ms';
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }
}

// --- Contact form validation ---

const form = document.getElementById('contactForm');

if (form) {
    form.setAttribute('novalidate', '');

    form.addEventListener('submit', e => {
        let valid = true;

        form.querySelectorAll('[required]').forEach(field => {
            clearError(field);
            const val = field.value.trim();
            if (!val) {
                showError(field, 'This field is required.');
                valid = false;
            } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                showError(field, 'Enter a valid email address.');
                valid = false;
            }
        });

        if (!valid) e.preventDefault();
    });

    form.querySelectorAll('[required]').forEach(field => {
        field.addEventListener('input', () => clearError(field));
    });
}

function showError(field, msg) {
    const err = document.createElement('span');
    err.className = 'field-error';
    err.textContent = msg;
    field.parentNode.appendChild(err);
    field.setAttribute('aria-invalid', 'true');
}

function clearError(field) {
    const err = field.parentNode.querySelector('.field-error');
    if (err) err.remove();
    field.removeAttribute('aria-invalid');
}

// --- Update Banner (TEMPORARY: auto-disappears after 2026-04-24) ---

(function () {
    const EXPIRES = Date.parse('2026-04-24T23:59:59');
    const DISMISS_KEY = 'gakk-update-banner-2026-04-17';

    if (Date.now() >= EXPIRES) return;
    try {
        if (localStorage.getItem(DISMISS_KEY) === '1') return;
    } catch (e) { /* private mode — continue and show banner */ }
    if (/references\.html$/i.test(location.pathname)) return;

    const banner = document.createElement('div');
    banner.className = 'update-banner';
    banner.setAttribute('role', 'status');
    banner.innerHTML =
        '<div class="update-banner-inner">' +
            '<p class="update-banner-text">' +
                '<a href="references.html">New reference letters from Rural Health Group and Metro Community Health Center &rarr;</a>' +
            '</p>' +
            '<button class="update-banner-close" type="button" aria-label="Dismiss">&times;</button>' +
        '</div>';

    document.body.insertBefore(banner, document.body.firstChild);

    banner.querySelector('.update-banner-close').addEventListener('click', () => {
        banner.remove();
        try { localStorage.setItem(DISMISS_KEY, '1'); } catch (e) { /* ignore */ }
    });
})();
