    document.addEventListener('DOMContentLoaded', function (){
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
    });

    // Función para cerrar sesión
    function logout() {
        localStorage.removeItem('userLogged');
        location.reload();
    }

    function login() {
        const localUsers = JSON.parse(localStorage.getItem('usuarios'));

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            const error = document.getElementById('error');
            error.innerHTML = 'Has de completar tots els camps';
            error.style.display = 'block';
            return;
        }

        for (let user of localUsers) {
            const usernameUser = user.username;
            const emailUser = user.email;
            const passwordUser = user.password;

            if ((usernameUser === email || email === emailUser) && password === passwordUser) {
                localStorage.setItem('userLogged', JSON.stringify(user));
                window.location.href = '../index.html';
            }
        }

        const error = document.getElementById('error');
        error.innerHTML = 'Login incorrecte';
        error.style.display = 'block';
    }