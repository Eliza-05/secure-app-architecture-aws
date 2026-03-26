const API_URL = "https://tdseelizabackend.duckdns.org/api/auth";

function showTab(tab) {
    document.getElementById('login-section').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('register-section').style.display = tab === 'register' ? 'block' : 'none';
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
}

async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const status = document.getElementById('status');

    status.textContent = 'Conectando...';

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Error al iniciar sesión');

        status.style.color = '#4ecca3';
        status.textContent = ` Bienvenido, ${data.username}!`;
    } catch (error) {
        status.style.color = '#e94560';
        status.textContent = ` ${error.message}`;
    }
}

async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const status = document.getElementById('status');

    status.textContent = 'Registrando...';

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error('Error al registrar');

        status.style.color = '#4ecca3';
        status.textContent = ` ${data.message}`;
    } catch (error) {
        status.style.color = '#e94560';
        status.textContent = ` ${error.message}`;
    }
}