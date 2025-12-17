# Jaume Viladoms - Plataforma de Valoració de Cursos i Professors

## Descripció del Projecte

**Jaume Viladoms** és una plataforma web desenvolupada en HTML, CSS i JavaScript vanilla que permet als usuaris consultar, valorar i descobrir els millors cursos i professors en l'àmbit de la informàtica i la tecnologia.

La plataforma ofereix una experiència intuïtiva on els estudiants poden:
- Explorar cursos de diferents especialitats (Desenvolupament Web, Administració de Sistemes, Ciberseguretat, Microinformàtica)
- Consultar perfils de professors amb les seves valoracions
- Deixar comentaris i puntuacions sobre cursos i professors
- Cercar cursos específics amb un sistema de suggeriments en temps real
- Registrar-se i iniciar sessió per deixar valoracions personalitzades

## Característiques Principals

### Pàgina Principal (Home)
- **Hero Section** amb cercador de cursos amb autocompletat
- Visualització dels **3 millors cursos** valorats
- Mostra dels **3 millors professors** segons la seva puntuació
- Secció de **valoracions destacades** dels alumnes

### Pàgines de Cursos
- Informació detallada de cada curs
- Llistat de professors que imparteixen el curs
- Valoracions i comentaris dels alumnes
- Sistema per afegir noves valoracions (amb estrelles i comentari)
- Recàlcul automàtic de la mitjana de puntuació

### Pàgines de Professors
- Perfil complet del professor amb imatge
- Cursos que imparteix el professor
- Valoracions i opinions dels alumnes
- Formulari per valorar el professor

### Sistema d'Autenticació
- **Login**: Accés amb usuari/email i contrasenya
- **Registre**: Creació de nous comptes amb avatar personalitzat
- **Gestió de sessió**: Visualització del nom d'usuari i avatar a la barra de navegació
- **Logout**: Tancament de sessió amb un sol clic
- Usuaris predefinits per a proves: `admin/admin` i `user/user`

### Disseny Responsive
- Adaptació completa a dispositius mòbils, tablets i escriptori
- Navegació optimitzada per a pantalles petites
- Layouts flexibles amb CSS Grid i Flexbox

## Tecnologies Utilitzades

- **HTML5**: Estructura semàntica del projecte
- **CSS3**: 
  - Variables CSS (Custom Properties)
  - Flexbox i CSS Grid
  - Transicions i animacions
  - Media queries per responsive design
  - Google Fonts (Montserrat, Playfair Display, Inter)
- **JavaScript (Vanilla)**: 
  - Manipulació del DOM
  - LocalStorage per a persistència de dades
  - Gestió d'esdeveniments
  - FileReader API per a càrrega d'avatars
- **LocalStorage**: Emmagatzematge de dades (cursos, professors, usuaris, sessions)

## Funcionalitats Tècniques

### Sistema de Dades amb LocalStorage

El projecte utilitza LocalStorage per emmagatzemar:
- **Cursos**: Informació completa dels cursos amb valoracions
- **Usuaris**: Comptes d'usuari amb credencials i avatars
- **Sessió**: Usuari actualment autenticat
- **Seleccions temporals**: Curs o professor seleccionat per visualitzar

### Sistema de Valoracions

- Selector d'estrelles interactiu (1-5 estrelles)
- Camp de comentari obligatori
- Assignació automàtica de "Anonim" si l'usuari no està autenticat
- Recàlcul de mitjana aritmètica després de cada nova valoració
- Actualització en temps real de les dades

### Cercador Intel·ligent

- Filtrat en temps real mentre l'usuari escriu
- Llista de suggeriments desplegable
- Cerca insensible a majúscules/minúscules
- Utilitza `includes()` per coincidències parcials

### Gestió d'Avatars

- Càrrega de fitxers d'imatge al registre
- Conversió a Base64 per emmagatzematge
- Visualització d'avatar personalitzat a la navegació
- Avatar per defecte (icona SVG) si no s'especifica

## Ús

### Usuaris de Prova

El sistema crea automàticament dos usuaris per defecte:

| Usuari/Email | Contrasenya |
|--------------|-------------|
| admin        | admin       |
| user         | user        |

## Flux d'Ús de l'Aplicació

1. **Accés inicial**: L'usuari accedeix a la pàgina principal i visualitza els millors cursos i professors
2. **Cerca**: Pot utilitzar el cercador per trobar un curs específic
3. **Exploració**: Navega per les targetes de cursos o professors
4. **Detall**: Clic a "Veure més" per accedir als detalls
5. **Valoració**: 
   - Si no està autenticat, pot valorar com a "Anonim"
   - Si vol utilitzar el seu nom, ha d'iniciar sessió o registrar-se
6. **Registre/Login**: Completa el formulari corresponent
7. **Valoració autenticada**: Deixa la seva opinió amb el seu nom d'usuari
8. **Navegació**: Pot explorar professors des dels cursos i viceversa

## Paleta de Colors

El projecte utilitza un esquema de colors coherent definit amb variables CSS:

- **Primary Color**: `#F4D35E` (Groc/Daurat)
- **Secondary Color**: `#0D3B66` (Blau fosc)
- **Accent 1**: `#EE964B` (Taronja mitjà)
- **Accent 2**: `#F95738` (Taronja/Vermell)
- **Text**: `#333` (Gris fosc)

## Característiques Destacades del Codi

### Ordenació de Cursos i Professors
```javascript
const mejoresCursos = cursos
    .sort((a, b) => (b.puntuacion_media) - (a.puntuacion_media))
    .slice(0, 3);
```

### Generació Dinàmica d'Estrelles
```javascript
function cargarEstrellas(marcadas) {
    let estrellasHtml = '';
    for (let i = 1; i <= 5; i++) {
        const fill = i <= marcadas ? '#FFC107' : '#E0E0E0';
        estrellasHtml += `<svg>...</svg>`;
    }
    return estrellasHtml;
}
```

### Càrrega d'Avatar amb FileReader
```javascript
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => {
    const base64 = reader.result;
    // Emmagatzematge de l'avatar
};
```