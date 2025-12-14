document.addEventListener('DOMContentLoaded', () => {
    // Cuando se recarga la pagina, mirar si se tiene que isnertar el JSON de los cursos en caso de que no exista
    insertarCursos();

    // LLamamos a la funcion que se encarga de mostrar los mejores cursos, los mejores profes y algunas valoraciones
    cargarMejoresCursos();
    cargarMejoresProfesores();
    cargarAlgunasValoraciones();
});

function insertarCursos() {
    const cursos = JSON.parse(localStorage.getItem('cursos'));

    if (!cursos) {
        console.log("No hay cursos en localStorage");
        const insertCursos = [
            {
                "nombre": "Desenvolupament Web",
                "puntuacion_media": 4.5,
                "profesores": [
                    {
                        "nombre": "Jordi Casals",
                        "titulo": "Expert en Desenvolupament Web",
                        "descripcion": "Professor apassionat del DAW, amb experiència en projectes reals de programació i disseny web. Els seus alumnes destaquen la claredat i la paciència.",
                        "estrellas": 4
                    },
                    {
                        "nombre": "Elena Puig",
                        "titulo": "Full Stack Developer",
                        "descripcion": "Especialista en frameworks moderns i arquitectures escalables.",
                        "estrellas": 5
                    }
                ],
                "valoraciones": [
                    {
                        "usuario": "dev_alex",
                        "comentario": "El temario es muy completo y actualizado.",
                        "estrellas": 5
                    },
                    {
                        "usuario": "lucia_g",
                        "comentario": "Buenas prácticas explicadas desde el principio.",
                        "estrellas": 4
                    }
                ]
            },
            {
                "nombre": "Administració Sistemes",
                "puntuacion_media": 4.0,
                "profesores": [
                    {
                        "nombre": "Marta Soler",
                        "titulo": "Administradora Sistemes",
                        "descripcion": "Especialista en ASIX, amb coneixements avançats en seguretat i xarxes. Coneguda per fer les classes molt pràctiques i adaptades al món laboral.",
                        "estrellas": 3
                    },
                    {
                        "nombre": "Jordi Mata",
                        "titulo": "SysAdmin Senior",
                        "descripcion": "Expert en virtualització i cloud computing.",
                        "estrellas": 5
                    }
                ],
                "valoraciones": [
                    {
                        "usuario": "sysadmin_joan",
                        "comentario": "Mucha práctica con servidores Linux, genial.",
                        "estrellas": 5
                    },
                    {
                        "usuario": "ana_tech",
                        "comentario": "Un poco denso al principio pero muy útil.",
                        "estrellas": 3
                    }
                ]
            },
            {
                "nombre": "Ciberseguretat",
                "puntuacion_media": 4.8,
                "profesores": [
                    {
                        "nombre": "Carlos Riera",
                        "titulo": "Expert en Ciberseguretat",
                        "descripcion": "Consultor de seguretat amb anys d'experiència en auditories y pentesting.",
                        "estrellas": 5
                    },
                    {
                        "nombre": "Sofia Vidal",
                        "titulo": "Analista Forense",
                        "descripcion": "Especialista en anàlisi de malware i resposta a incidents.",
                        "estrellas": 4
                    }
                ],
                "valoraciones": [
                    {
                        "usuario": "hacker_neo",
                        "comentario": "Increíble el módulo de pentesting.",
                        "estrellas": 5
                    },
                    {
                        "usuario": "security_pro",
                        "comentario": "Profesores muy expertos en la materia.",
                        "estrellas": 5
                    }
                ]
            },
            {
                "nombre": "Microinformàtica",
                "puntuacion_media": 4.2,
                "profesores": [
                    {
                        "nombre": "Pau Ferrer",
                        "titulo": "Tècnic en Microinformàtica",
                        "descripcion": "Expert en muntatge i reparació d'equips, amb un enfocament molt pràctic.",
                        "estrellas": 4
                    },
                    {
                        "nombre": "Laura Pons",
                        "titulo": "Suport Tècnic",
                        "descripcion": "Gran capacitat per resoldre incidències de hardware i software.",
                        "estrellas": 4
                    }
                ],
                "valoraciones": [
                    {
                        "usuario": "newbie_pc",
                        "comentario": "Perfecto para empezar desde cero.",
                        "estrellas": 4
                    },
                    {
                        "usuario": "repair_man",
                        "comentario": "Bien explicado el hardware.",
                        "estrellas": 5
                    }
                ]
            }
        ]
        localStorage.setItem('cursos', JSON.stringify(insertCursos));
    }
}

function cargarMejoresCursos() {
    const cursos = JSON.parse(localStorage.getItem('cursos'));
    if (!cursos) return;

    /*
        Usamos el metodo de sort para ordenar los cursos segun su puntiacion, de más a menos.
        Para ello se tiene que restar el valor de la puntuacion media de un curso a la de otro.
        Cuando el resultado es negativo el curso a va antes sino el curso b ira antes. Esto lo hace internamente el sort.
        Después se usa el slice para obtener unicamente los 3 primeros cursos que sera los que se mostraran en la pagina web.
    */  

    const mejoresCursos = cursos
        .sort((a, b) => (b.puntuacion_media) - (a.puntuacion_media))
        .slice(0, 3);

    const gridCursos = document.getElementById('grid-cursos');
    if (!gridCursos) return;

    gridCursos.innerHTML = '';
    mejoresCursos.forEach(curso => {
        // Se redondea la puntuación ya que aveces hay decimales y luego se cargan las estrellas
        const estrellasRedondeadas = Math.round(curso.puntuacion_media || 0);
        const estrellasHtml = cargarEstrellas(estrellasRedondeadas);

        gridCursos.innerHTML += `
            <article class="card">
                <h3 class="card-title">${curso.nombre}</h3>
                <hr class="divider">
                <div class="rating" role="img">${estrellasHtml}</div>
                <p class="card-description">Curs excel·lent de ${curso.nombre}</p>
                <a class="btn-more" onclick="ObtenerCurso('${curso.nombre}')")>Ver mas</a>
            </article>
        `;
    });
}

function cargarMejoresProfesores() {
    const cursos = JSON.parse(localStorage.getItem('cursos'));
    if (!cursos) return;

    let profesores = [];
    cursos.forEach(curso => {
        profesores.push(...curso.profesores);
    });

    const mejoresProfesores = profesores
        .sort((a, b) => (b.estrellas) - (a.estrellas))
        .slice(0, 3);

    const gridProfesores = document.getElementById('grid-profesores');
    if (!gridProfesores) return;

    gridProfesores.innerHTML = '';
    
    mejoresProfesores.forEach(profesor => {
        // Se redondea la puntuación ya que aveces hay decimales y luego se cargan las estrellas
        const estrellasRedondeadas = Math.round(profesor.estrellas || 0);
        const estrellasHtml = cargarEstrellas(estrellasRedondeadas);

        gridProfesores.innerHTML += `
            <article class="card professor-card">
                <div class="professor-avatar" aria-hidden="true"></div>
                <h3 class="card-title">${profesor.nombre} – ${profesor.titulo}</h3>
                <hr class="divider">
                <div class="rating" role="img">${estrellasHtml}</div>
                <p class="card-description">${profesor.descripcion}</p>
                <a href="./html/profesor.html" class="btn-more">Ver mas</a>
            </article>
        `;
    });
}

function cargarAlgunasValoraciones(){
    const cursos = JSON.parse(localStorage.getItem('cursos'));

    let valoraciones = [];

    /*
        Recorremos todos los cursos, por cada valoracion añadiremos el nombre del curso para después podermo mostrar.
        Y por cada curso unicamente nos vamos a guardar dos valoraciones
    */
    cursos.forEach(curso => {
       curso.valoraciones.forEach(valoracion => {
        // añadimos el nombre del curso dentro del objeto original
        valoracion.cursoNombre = curso.nombre;
    });
    valoraciones.push(curso.valoraciones[0]);
    valoraciones.push(curso.valoraciones[1]);
    });

    // Nos quedamos con seis valoraciones unicamente
    valoraciones = valoraciones.slice(0, 6);
    let valoracionesContainer = document.getElementById('valoracionesContainer');
    valoracionesContainer.innerHTML = '';
    valoraciones.forEach(valoracion => {
        valoracionesContainer.innerHTML += `
             <article class="review-item">
                    <div class="avatar-placeholder" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path
                                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                        </svg>
                    </div>
                    <div class="review-content">
                        <strong>${valoracion.usuario}</strong>
                        <small>Alumne de ${valoracion.cursoNombre}</small>
                        <p class="review-text">${valoracion.comentario}</p>
                    </div>
                    <div class="review-rating" role="img" aria-label="Valoración: 5 de 5 estrellas">
                        <span class="rating-small">★ ★ ★ ★ ★</span>
                    </div>
                </article>
        `;
    });
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

function ObtenerCurso(nombreCurso) {
    const cursos = JSON.parse(localStorage.getItem('cursos'));
    const cursoSeleccionado = cursos.find(c => c.nombre === nombreCurso);
    if (cursoSeleccionado) {
        localStorage.setItem('cursoSeleccionado', JSON.stringify(cursoSeleccionado));
    }

    window.location.href = './html/curso.html';
}
