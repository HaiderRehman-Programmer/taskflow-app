const API = '';

/* ─── Tab Switching ─────────────────────────────────────────────────── */
function switchTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    hideAlert();

    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
    }
}

/* ─── Alert Helpers ─────────────────────────────────────────────────── */
function showAlert(message, type = 'error') {
    const el = document.getElementById('alert');
    el.textContent = message;
    el.className = `alert ${type}`;
}

function hideAlert() {
    const el = document.getElementById('alert');
    el.className = 'alert hidden';
}

/* ─── Loading Button Helpers ────────────────────────────────────────── */
function setLoading(btnId, loading) {
    const btn = document.getElementById(btnId);
    const text = btn.querySelector('.btn-text');
    const loader = btn.querySelector('.btn-loader');
    btn.disabled = loading;
    if (loading) {
        text.classList.add('hidden');
        loader.classList.remove('hidden');
    } else {
        text.classList.remove('hidden');
        loader.classList.add('hidden');
    }
}

/* ─── Login Form ────────────────────────────────────────────────────── */
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        return showAlert('Please fill in all fields.');
    }

    setLoading('login-btn', true);

    try {
        const res = await fetch(`${API}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!data.success) {
            showAlert(data.message || 'Login failed.');
        } else {
            localStorage.setItem('tf_token', data.token);
            localStorage.setItem('tf_user', JSON.stringify(data.user));
            showAlert('Welcome back! Redirecting…', 'success');
            setTimeout(() => (window.location.href = '/dashboard.html'), 800);
        }
    } catch (err) {
        showAlert('Network error. Is the server running?');
    } finally {
        setLoading('login-btn', false);
    }
});

/* ─── Register Form ─────────────────────────────────────────────────── */
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAlert();

    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;

    if (!name || !email || !password) {
        return showAlert('Please fill in all fields.');
    }
    if (password.length < 6) {
        return showAlert('Password must be at least 6 characters.');
    }

    setLoading('register-btn', true);

    try {
        const res = await fetch(`${API}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!data.success) {
            showAlert(data.message || 'Registration failed.');
        } else {
            localStorage.setItem('tf_token', data.token);
            localStorage.setItem('tf_user', JSON.stringify(data.user));
            showAlert('Account created! Redirecting…', 'success');
            setTimeout(() => (window.location.href = '/dashboard.html'), 800);
        }
    } catch (err) {
        showAlert('Network error. Is the server running?');
    } finally {
        setLoading('register-btn', false);
    }
});

/* ─── Redirect if already logged in ────────────────────────────────── */
if (localStorage.getItem('tf_token')) {
    window.location.href = '/dashboard.html';
}
