document.addEventListener('DOMContentLoaded', () => {
    cargarInfo();
});

function cargarInfo() {
    const profesor = JSON.parse(localStorage.getItem('profesorSeleccionado'));
    console.log("Profesor: ", profesor);

    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.textContent = profesor.nombre;
    }

    const imagenProfe = document.getElementById('imagenProfe');

    imagenProfe.innerHTML = `
        <img src="../img/${profesor.url}">
    `;
    
    const cursosContainer = document.getElementById('llista-cursos');

    if (cursosContainer) {
        cursosContainer.innerHTML = ''; // limpiar antes de pintar
    }

    const insertCursos = JSON.parse(localStorage.getItem('cursos'));

    // Filtrar cursos donde aparece el profesor
    const cursosAsociados = insertCursos.filter(curso =>
        curso.profesores.find(p => p.nombre === profesor.nombre)
    );


    // Pintar cada curso asociado
    cursosAsociados.forEach(curso => {
        const estrellasHtml = cargarEstrellas(Math.round(curso.puntuacion_media));

        cursosContainer.innerHTML += `
            <article class="tarja professor-tarja targeta-professor-petita">
                <h4 class="titol-targeta">${curso.nombre}</h4>
                <div class="nota-estrelles nota-petita" role="img">${estrellasHtml}</div>
            </article>
        `;
    });

    const opinionsContainer = document.getElementById('llista-opinions');

    // Resetear el contenedor para que no haya info de más
    if (opinionsContainer) {
        opinionsContainer.innerHTML = '';
    }

    if (opinionsContainer && profesor.valoraciones) {

        profesor.valoraciones.forEach(val => {
            const estrellasHtml = cargarEstrellas(val.estrellas);
            const avatar = obtenerFotoUser(val.usuario);

            let foto;
            // 
            if (avatar === 'avatar-buit') {
                foto = `
                    <div class="avatar-buit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path
                                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                        </svg>
                    </div>`;
            } else {

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

function valorarProfesor() {

    const userLogged = JSON.parse(localStorage.getItem('userLogged'));

    // En el caso de que el usuario no esté logueado, se le asigna el nombre 'Anonim'
    const usuarioNombre = userLogged ? userLogged.username : 'Anonim';


    const ratingInput = document.getElementsByName('rating');

    let estrellas;

    ratingInput.forEach(input => {
        if (input.checked) {
            estrellas = parseInt(input.value);
        }
    });

    if (estrellas === undefined) {
        alert("Si us plau, selecciona una puntuació (estrelles).");
        return;
    }



    const commentInput = document.getElementById('comment');
    const comentario = commentInput.value;

    if (!comentario.trim()) {
        alert("Si us plau, escriu un comentari.");
        return;
    }

    const nuevaValoracion = {
        usuario: usuarioNombre,
        comentario: comentario,
        estrellas: estrellas
    };

    // Recuperar curso seleccionado
    const profesorSeleccionado = JSON.parse(localStorage.getItem('profesorSeleccionado'));
    if (!profesorSeleccionado) return;

    // Recalcular media
    profesorSeleccionado.estrellas = calcularMediaEstrellas(profesorSeleccionado);

    // Actualizar array completo de cursos
    const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

    const indexCurso = cursos.findIndex(curso =>
        curso.profesores.find(p => p.nombre === profesorSeleccionado.nombre)
    );

    if (indexCurso === -1) {
        alert("No s'ha pogut trobar el professor en cap curs.");
        console.error("Profesor no encontrado:", profesorSeleccionado.nombre);
        return;
    }

    const indexProfesor = cursos[indexCurso].profesores.findIndex(profe => 
        profe.nombre === profesorSeleccionado.nombre
    );

    if (indexProfesor === -1) {
        alert("Error intern: professor no trobat dins del curs.");
        return;
    }

    console.log("Index profesor: ", indexProfesor);
    cursos[indexCurso].profesores[indexProfesor].estrellas = nuevaValoracion.estrellas;
    if (indexCurso !== -1) {
        profesorSeleccionado.valoraciones.push(nuevaValoracion);
        localStorage.setItem('profesorSeleccionado', JSON.stringify(profesorSeleccionado))
        localStorage.setItem('cursos', JSON.stringify(cursos));
    }

    localStorage.setItem('cursos', JSON.stringify(cursos));

    window.location.reload();
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

function calcularMediaEstrellas(profesor) {
    const valoraciones = profesor.valoraciones;
    if (!valoraciones || valoraciones.length === 0) {
        return 0;
    }

    let estrellasTotales = 0;
    let numValoraciones = 0;

    valoraciones.forEach(valoracion => {
        const estrellas = valoracion.estrellas;
        estrellasTotales += estrellas;
        numValoraciones++;
    });

    const media = parseInt(estrellasTotales / numValoraciones).toFixed(2);
    console.log("Media: ", media);

    return media;
}