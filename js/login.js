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

    const userLogged = JSON.parse(localStorage.getItem('userLogged'));
    console.log("UserLogged ", userLogged);
    if (userLogged) {
        const btnLogin = document.getElementById('btnLogin');
        const btnLoginMobile = document.getElementById('btnLoginMobile');

        const userHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
            </svg>
            ${userLogged.username}
            <button class="btn-logout" onclick="logout()">X</button>
        `;

        if (btnLogin) btnLogin.innerHTML = userHTML;
        if (btnLoginMobile) btnLoginMobile.innerHTML = userHTML;
    }
}

function login() {
    const localUsers = JSON.parse(localStorage.getItem('usuarios'));

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Has de completar tots els camps');
        return;
    }

    for (let user of localUsers) {
        const usernameUser = user.username;
        const emailUser = user.email;
        const passwordUser = user.password;

        if ((usernameUser === email || email === emailUser) && password === passwordUser) {
            localStorage.setItem('userLogged', JSON.stringify(user));
            const btnLogin = document.getElementById('btnLogin');
            const btnLoginMobile = document.getElementById('btnLoginMobile');

            const userHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px">
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                </svg>
                ${user.username}
                <button class="btn-logout">X</button>
            `;

            if (btnLogin) btnLogin.innerHTML = userHTML;
            if (btnLoginMobile) btnLoginMobile.innerHTML = userHTML;
            return;
        }
    }

    const error = document.getElementById('error');
    error.innerHTML = 'Login incorrecte';
}

function logout() {
    localStorage.removeItem('userLogged');
    const btnLogin = document.getElementById('btnLogin');
    const btnLoginMobile = document.getElementById('btnLoginMobile');
    btnLogin.innerHTML = 'Login';
    btnLoginMobile.innerHTML = 'Login';
}