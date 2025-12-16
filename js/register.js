window.onload = () => {
    // Cuando hay un usuario logueado, redirige a la página de inicio
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    if (userLogged) {
        window.location.href = '../index.html';
    }
}

function register() {
    const nomUsuari = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const contrasenya = document.getElementById('password').value;
    const confirmContrasenya = document.getElementById('confirm_password').value;
    const avatar = document.getElementById('avatar');

    if (!nomUsuari || !email || !contrasenya || !confirmContrasenya || !avatar.files[0]) {
        const error = document.getElementById('error');
        error.innerHTML = 'Has de completar tots els camps';
        error.style.display = 'block';
        return;
    }

    if (contrasenya !== confirmContrasenya) {
        const error = document.getElementById('error');
        error.innerHTML = 'Les contrasenyes no coincideixen';
        error.style.display = 'block';
        return;
    }

    const localUsers = JSON.parse(localStorage.getItem('usuarios'));
    let userExists = false;

    localUsers.forEach(user => {
        if (user.email === email) {
            userExists = true;
        }
    });

    if (userExists) {
        const error = document.getElementById('error');
        error.innerHTML = 'El correu electrònic ja existeix';
        error.style.display = 'block';
        return;
    }
    
    // A continuación se va a guardar la imagen del avatar en el localStorage 
    // Se obtiene el file
    const file = avatar.files[0];
    // Creamos un nuevo reader para leer el archivo
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

}