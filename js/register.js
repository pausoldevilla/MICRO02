window.onload = () => {
    // Cuando hay un usuario logueado, redirige a la página de inicio
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    if (userLogged) {
        window.location.href = '../index.html';
    }

    // Limpiar errores cuando el usuario empieza a escribir
    const inputs = ['username', 'email', 'password', 'confirm_password', 'avatar'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', clearError);
            input.addEventListener('change', clearError);
        }
    });
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

// Función para validar nombre de usuario
function isValidUsername(username) {
    // Solo letras, números y guiones bajos, mínimo 3 caracteres
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
}

// Función para validar formato de imagen
function isValidImageFile(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
}

// Función para validar tamaño de imagen (máximo 2MB)
function isValidImageSize(file) {
    const maxSize = 2 * 1024 * 1024; // 2MB en bytes
    return file.size <= maxSize;
}

function register() {
    clearError();

    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const avatarInput = document.getElementById('avatar');

    const nomUsuari = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const contrasenya = passwordInput.value;
    const confirmContrasenya = confirmPasswordInput.value;

    // Validar campos vacíos
    if (!nomUsuari || !email || !contrasenya || !confirmContrasenya || !avatarInput.files[0]) {
        if (!nomUsuari) usernameInput.classList.add('input-error');
        if (!email) emailInput.classList.add('input-error');
        if (!contrasenya) passwordInput.classList.add('input-error');
        if (!confirmContrasenya) confirmPasswordInput.classList.add('input-error');
        if (!avatarInput.files[0]) avatarInput.classList.add('input-error');

        showError('Has de completar tots els camps');
        return;
    }

    // Validar nombre de usuario
    if (!isValidUsername(nomUsuari)) {
        usernameInput.classList.add('input-error');
        showError('El nom d\'usuari ha de tenir almenys 3 caràcters i només pot contenir lletres, números i guions baixos');
        return;
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
        emailInput.classList.add('input-error');
        showError('Format de correu electrònic invàlid');
        return;
    }

    // Validar longitud de contraseña
    if (contrasenya.length < 6) {
        passwordInput.classList.add('input-error');
        showError('La contrasenya ha de tenir almenys 6 caràcters');
        return;
    }

    // Validar que las contraseñas coinciden
    if (contrasenya !== confirmContrasenya) {
        passwordInput.classList.add('input-error');
        confirmPasswordInput.classList.add('input-error');
        showError('Les contrasenyes no coincideixen');
        return;
    }

    // Validar archivo de imagen
    const file = avatarInput.files[0];

    if (!isValidImageFile(file)) {
        avatarInput.classList.add('input-error');
        showError('El fitxer ha de ser una imatge (JPG, PNG, GIF o WebP)');
        return;
    }

    if (!isValidImageSize(file)) {
        avatarInput.classList.add('input-error');
        showError('La imatge no pot superar els 2MB');
        return;
    }

    // Verificar si el email ya existe
    const localUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
    let userExists = false;

    localUsers.forEach(user => {
        if (user.email === email) {
            userExists = true;
        }
    });

    if (userExists) {
        emailInput.classList.add('input-error');
        showError('El correu electrònic ja existeix');
        return;
    }

    // Verificar si el username ya existe
    let usernameExists = false;
    localUsers.forEach(user => {
        if (user.username === nomUsuari) {
            usernameExists = true;
        }
    });

    if (usernameExists) {
        usernameInput.classList.add('input-error');
        showError('El nom d\'usuari ja existeix');
        return;
    }

    // Guardar la imagen del avatar en el localStorage
    const reader = new FileReader();

    // Le indicamos que archivo tiene que leer el reader
    reader.readAsDataURL(file);

    // Una vez termine de leer el archivo, se ejecuta la siguiente función
    reader.onload = () => {
        // Se guarda en base64 el resultado que da el reader cuando a terminado que esta en formato base64
        const base64 = reader.result;

        const newUser = {
            "username": nomUsuari,
            "email": email,
            "password": contrasenya,
            "avatar": base64
        };

        localUsers.push(newUser);
        localStorage.setItem('usuarios', JSON.stringify(localUsers));

        localStorage.setItem('userLogged', JSON.stringify(newUser));

        window.location.href = '../index.html';
    };

    // Manejar errores de lectura del archivo
    reader.onerror = () => {
        avatarInput.classList.add('input-error');
        showError('Error al llegir el fitxer d\'imatge');
    };
}