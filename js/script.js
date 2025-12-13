document.addEventListener('DOMContentLoaded', () => {
    alert("Cargando cursos");
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
});