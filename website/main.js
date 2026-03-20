/* GAKK Consulting — main.js
   Responsibilities: mobile nav toggle, contact form validation */

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
        if (window.innerWidth > 720) {
            nav.classList.remove('nav-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
}

// --- Dropdown click-toggle (desktop) ---

document.querySelectorAll('.has-dropdown').forEach(item => {
    item.querySelector(':scope > a').addEventListener('click', e => {
        if (window.innerWidth > 720) {
            e.preventDefault();
            item.classList.toggle('open');
        }
    });
});

document.addEventListener('click', e => {
    if (window.innerWidth > 720 && !e.target.closest('.has-dropdown')) {
        document.querySelectorAll('.has-dropdown.open')
            .forEach(el => el.classList.remove('open'));
    }
});

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
