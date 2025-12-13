document.addEventListener('DOMContentLoaded', () => {
    cargarInfo();
});

function cargarInfo() {
    const cursos = JSON.parse(localStorage.getItem('cursos'));

    if (cursos && cursos.length > 0) {
        const curso = cursos[0];

        // 1. Update Hero Title
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.textContent = curso.nombre;
        }

        // 2. Update Professors
        const professorsContainer = document.getElementById('llista-professors');

        // Se resetea el container para evitar que se mezcle información
        if (professorsContainer) {
            professorsContainer.innerHTML = '';
        }

        if (professorsContainer && curso.profesores) {
            console.log(curso.profesores);

            curso.profesores.forEach(profe => {
                const nombre = profe.nombre;
                const estrellas = profe.estrellas;

                const estrellasHtml = cargarEstrellas(estrellas);

                professorsContainer.innerHTML += `
                    <article class="tarja professor-tarja targeta-professor-petita">
                        <div class="professor-icona"></div>
                        <h4 class="titol-targeta">${nombre}</h4>
                        <div class="nota-estrelles nota-petita" role="img">${estrellasHtml}</div>
                        <a href="#" class="boto-accio btn-small">Ver perfil</a>
                    </article>
                `;
            });
        }

        const opinionsContainer = document.getElementById('llista-opinions');

        // Resetear el contenedor para que no haya info de más
        if (opinionsContainer) {
            opinionsContainer.innerHTML = '';
        }

        if (opinionsContainer && curso.valoraciones) {

            curso.valoraciones.forEach(val => {
                const estrellasHtml = cargarEstrellas(val.estrellas);
                const avatar = obtenerFotoUser(val.usuario);

                let foto;
                // 
                if(avatar === 'avatar-buit') {
                    foto = `
                        <div class="avatar-buit">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path
                                    d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                            </svg>
                        </div>`;
                }else{
                    
                    foto = `
                        <div class="avatar">
                            <img src="${avatar}" alt="Avatar">
                        </div>
                    `;
                }

                opinionsContainer.innerHTML += `
                    <article class="opinio-detallada">
                        ${foto}
                        <div class="contingut-opinio">
                            <strong>${val.usuario}</strong>
                            <small>Estudiant matriculat</small>
                            <p class="text-opinio">${val.comentario}</p>
                        </div>
                        <div class="nota-opinio" role="img">
                            <span class="nota-petita">${estrellasHtml}</span>
                        </div>
                    </article>
                `;
            });
        }
    }


}


function cargarEstrellas(marcadas) {
    let estrellasHtml = '';
    for (let i = 1; i <= 5; i++) {
        // SVG para la estrella
        // Usamos un color diferente o clase si está marcada
        const fill = i <= marcadas ? '#FFC107' : '#E0E0E0';

        estrellasHtml += `
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="${fill}">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
        `;
    }
    return estrellasHtml;
}

function obtenerFotoUser(nombreUser) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
    // Si no hay usuarios en localStorage, devolvemos avatar vacío
    if (!usuarios) {
        return 'avatar-buit';
    }
    const usuario = usuarios.find(user => user.username === nombreUser);
    if (!usuario) {
        return 'avatar-buit';
    }
    // Asumimos que el usuario tiene una propiedad imagen o avatar, si no, devolvemos el default
    return usuario.avatar || 'avatar-buit';
}

function valorarCurso(e) {
    e.preventDefault();

    // 1. Get User
    const userLogged = JSON.parse(localStorage.getItem('userLogged'));

    // Default to 'Anònim' if not logged in
    const usuarioNombre = userLogged ? userLogged.username : 'Anònim';

    // 2. Get Rating
    const ratingInput = document.querySelector('input[name="rating"]:checked');
    if (!ratingInput) {
        alert("Si us plau, selecciona una puntuació (estrelles).");
        return;
    }
    const estrellas = parseInt(ratingInput.value);

    // 3. Get Comment
    const commentInput = document.getElementById('comment');
    const comentario = commentInput.value;

    if (!comentario.trim()) {
        alert("Si us plau, escriu un comentari.");
        return;
    }

    // 4. Create Review Object
    const nuevaValoracion = {
        usuario: usuarioNombre,
        comentario: comentario,
        estrellas: estrellas
    };

    // 5. Save to LocalStorage
    const cursos = JSON.parse(localStorage.getItem('cursos'));
    if (cursos && cursos.length > 0) {
        // Add to the first course (Target course)
        if (!cursos[0].valoraciones) {
            cursos[0].valoraciones = [];
        }
        cursos[0].valoraciones.push(nuevaValoracion);

        // Save back to localStorage
        localStorage.setItem('cursos', JSON.stringify(cursos));
    }

    // 6. Update UI immediately
    const opinionsContainer = document.getElementById('llista-opinions');
    if (opinionsContainer) {
        const estrellasHtml = cargarEstrellas(estrellas);

        opinionsContainer.innerHTML += `
            <article class="opinio-detallada">
                <div class="avatar-buit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                    </svg>
                </div>
                <div class="contingut-opinio">
                    <strong>${usuarioNombre}</strong>
                    <small>Estudiant matriculat (Nou)</small>
                    <p class="text-opinio">${comentario}</p>
                </div>
                <div class="nota-opinio" role="img">
                    <span class="nota-petita">${estrellasHtml}</span>
                </div>
            </article>
        `;
    }

    // 7. Reset Form
    document.querySelector('.formulari-valoracio').reset();

    alert("Gràcies per la teva valoració!");
}
