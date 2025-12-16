window.onload = function () {
    // Se crean los usuarios en caso de que no existan
    const usuarios = [
        { username: 'admin', email: 'admin', password: 'admin' },
        { username: 'user', email: 'user', password: 'user' }
    ];

    const localUsers = JSON.parse(localStorage.getItem('usuarios'));

    if (!localUsers) {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    // Cuando hay un usuario logueado, redirige a la página de inicio
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    if (userLogged) {
        window.location.href = '../index.html';
    }

    // Limpiar errores cuando el usuario empieza a escribir
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput) {
        emailInput.addEventListener('input', clearError);
    }
    if (passwordInput) {
        passwordInput.addEventListener('input', clearError);
    }
}

// Función para limpiar mensajes de error
function clearError() {
    const error = document.getElementById('error');
    if (error) {
        error.innerHTML = '';
        error.style.display = 'none';
    }

    // Quitar borde rojo de los campos
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
}

// Función para mostrar error
function showError(message) {
    const error = document.getElementById('error');
    if (error) {
        error.innerHTML = message;
        error.style.display = 'block';
    }
}

// Función para validar formato de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('userLogged');
    location.reload();
}

function login() {
    clearError();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Validar campos vacíos
    if (!email || !password) {
        if (!email) {
            emailInput.classList.add('input-error');
        }
        if (!password) {
            passwordInput.classList.add('input-error');
        }
        showError('Has de completar tots els camps');
        return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 4) {
        passwordInput.classList.add('input-error');
        showError('La contrasenya ha de tenir almenys 4 caràcters');
        return;
    }

    // Validar formato de email solo si no es un username
    if (email.includes('@') && !isValidEmail(email)) {
        emailInput.classList.add('input-error');
        showError('Format de correu electrònic invàlid');
        return;
    }

    const localUsers = JSON.parse(localStorage.getItem('usuarios'));

    if (!localUsers || localUsers.length === 0) {
        showError('No hi ha usuaris registrats');
        return;
    }

    // Buscar usuario
    let userFound = false;
    for (let user of localUsers) {
        const usernameUser = user.username;
        const emailUser = user.email;
        const passwordUser = user.password;

        if ((usernameUser === email || email === emailUser) && password === passwordUser) {
            localStorage.setItem('userLogged', JSON.stringify(user));
            window.location.href = '../index.html';
            userFound = true;
            return;
        }
    }

    // Si no se encontró el usuario
    if (!userFound) {
        emailInput.classList.add('input-error');
        passwordInput.classList.add('input-error');
        showError('Credencials incorrectes');
    }
}