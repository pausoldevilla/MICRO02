# Documentació del Projecte Jaume Viladoms

## Descripció General

**El projecte** és una plataforma web dissenyada per valorar cursos i professors d'educació tecnològica. Permet als usuaris consultar informació sobre diferents cursos (Desenvolupament Web, Administració de Sistemes, Ciberseguretat i Microinformàtica), veure els professors que els imparteixen i deixar valoracions amb comentaris i puntuacions d'estrelles.

## Característiques Principals

- **Consulta de cursos**: Visualització dels cursos millor valorats
- **Perfils de professors**: Informació detallada sobre cada professor
- **Sistema de valoracions**: Possibilitat de valorar cursos i professors amb estrelles i comentaris
- **Sistema d'autenticació**: Registre i inici de sessió d'usuaris
- **Cercador de cursos**: Funcionalitat de cerca amb suggeriments automàtics
- **Disseny responsive**: Adaptable a diferents dispositius


## Tecnologies Utilitzades

- **HTML5**: Estructura del contingut
- **CSS3**: Estils i disseny responsive
- **JavaScript (Vanilla)**: Lògica i interactivitat
- **LocalStorage**: Emmagatzematge de dades en el navegador
- **Google Fonts**: Tipografies Montserrat, Playfair Display i Inter

## Descripció dels Fitxers HTML

### index.html

Pàgina principal que mostra:
- Hero section amb cercador de cursos
- Secció de cursos millor valorats (top 3)
- Secció de professors millor valorats (top 3)
- Algunes valoracions d'usuaris

### curso.html

Pàgina de detall d'un curs específic que inclou:
- Títol del curs
- Llista de professors que l'imparteixen
- Opinions detallades dels alumnes
- Formulari per valorar el curs

### profesores.html

Pàgina de perfil d'un professor que mostra:
- Nom i imatge del professor
- Llista de cursos que imparteix
- Opinions dels alumnes sobre el professor
- Formulari per valorar el professor

### login.html

Pàgina d'autenticació amb:
- Formulari d'inici de sessió
- Validació d'usuari/email i contrasenya
- Enllaç a la pàgina de registre

### register.html

Pàgina de registre amb:
- Formulari de creació de compte
- Càrrega d'avatar (convertit a Base64)
- Validacions de camps
- Enllaç a la pàgina de login

## Descripció dels Fitxers JavaScript

### script.js

**Funcions principals:**

- `insertarCursos()`: Inicialitza les dades dels cursos en localStorage si no existeixen
- `cargarMejoresCursos()`: Mostra els 3 cursos millor valorats
- `cargarMejoresProfesores()`: Mostra els 3 professors millor valorats
- `cargarAlgunasValoraciones()`: Mostra 6 valoracions d'usuaris
- `cargarEstrellas(marcadas)`: Genera HTML per mostrar estrelles (plenes o buides)
- `ObtenerCurso(nombreCurso)`: Guarda el curs seleccionat i redirigeix a curso.html
- `ObtenerProfesor(nombreProfesor)`: Guarda el professor seleccionat i redirigeix a profesores.html
- `buscarCurso()`: Cerca un curs per nom i redirigeix al seu detall
- `mostrarLista()`: Mostra suggeriments de cursos mentre l'usuari escriu

**Estructura de dades dels cursos:**

```javascript
{
  nombre: "Nom del curs",
  puntuacion_media: 4.5,
  profesores: [
    {
      nombre: "Nom professor",
      titulo: "Títol professional",
      descripcion: "Descripció",
      estrellas: 4,
      url: "imatge.png",
      valoraciones: [...]
    }
  ],
  valoraciones: [
    {
      usuario: "nom_usuari",
      comentario: "Text del comentari",
      estrellas: 5
    }
  ]
}
```

### curso.js

**Funcions principals:**

- `cargarInfo()`: Carrega la informació del curs seleccionat des de localStorage
- `cargarEstrellas(marcadas)`: Genera les estrelles de valoració
- `obtenerFotoUser(nombreUser)`: Obté l'avatar de l'usuari des de localStorage
- `valorarCurso()`: Afegeix una nova valoració al curs
- `calcularMediaEstrellas(curso)`: Recalcula la mitjana de valoracions

**Flux de valoració:**

1. L'usuari selecciona estrelles i escriu un comentari
2. Es validen els camps
3. Es crea un objecte amb la nova valoració
4. S'actualitza el curs en localStorage
5. Es recalcula la puntuació mitjana
6. Es recarrega la pàgina

### profesores.js

**Funcions principals:**

- `cargarInfo()`: Carrega informació del professor i cursos associats
- `valorarProfesor()`: Afegeix una valoració al professor
- `cargarEstrellas(marcadas)`: Genera HTML d'estrelles
- `obtenerFotoUser(nombreUser)`: Obté avatar de l'usuari
- `calcularMediaEstrellas(profesor)`: Calcula mitjana de valoracions


### login.js

**Funcions principals:**

- `window.onload`: Inicialitza usuaris predeterminats i comprova si hi ha sessió activa
- `login()`: Gestiona el procés d'inici de sessió
- `clearError()`: Elimina missatges d'error
- `showError(message)`: Mostra missatges d'error
- `isValidEmail(email)`: Valida format d'email
- `logout()`: Tanca la sessió de l'usuari

**Usuaris predeterminats:**

```javascript
[
  { username: 'admin', email: 'admin', password: 'admin' },
  { username: 'user', email: 'user', password: 'user' }
]
```

**Validacions:**

- Camps obligatoris
- Contrasenya mínima de 4 caràcters
- Format d'email vàlid (si conté @)

### register.js

**Funcions principals:**

- `register()`: Gestiona el procés de registre complet
- `isValidUsername(username)`: Valida nom d'usuari (mínim 3 caràcters, només lletres, números i guions baixos)
- `isValidEmail(email)`: Valida format d'email
- `isValidImageFile(file)`: Comprova que el fitxer sigui una imatge
- `isValidImageSize(file)`: Verifica que la imatge no superi els 2MB

**Procés de registre:**

1. Validació de tots els camps
2. Comprovació que email i username no existeixin
3. Conversió de la imatge a Base64 amb FileReader
4. Creació del nou usuari
5. Guardat en localStorage
6. Inici de sessió automàtic

**Estructura d'usuari:**

```javascript
{
  username: "nom_usuari",
  email: "correu@exemple.cat",
  password: "contrasenya",
  avatar: "data:image/png;base64,..."
}
```

### nav.js

**Funcions principals:**

- `window.onload`: Comprova si hi ha usuari logat i actualitza el botó de login
- `logout()`: Elimina l'usuari de localStorage i recarrega la pàgina

**Funcionalitat:**

- Si l'usuari està logat, el botó de login mostra el nom d'usuari i el seu avatar
- Afegeix un botó "X" per tancar sessió
- Si no hi ha avatar, mostra un icona SVG per defecte

## Descripció dels Fitxers CSS

### general.css

**Variables CSS (Custom Properties):**

```css
--primary-color: #F4D35E;        /* Groc/Daurat */
--primary-hover: #eeaf02;
--secondary-color: #0D3B66;      /* Blau fosc */
--accent1-color: #EE964B;        /* Taronja mitjà */
--accent2-color: #F95738;        /* Taronja/Vermell */
```

**Components comuns:**

- Estils base del body
- Tipografies (h1, h2, h3)
- Header i navegació
- Botó de login
- Sistema de valoracions (estrelles)
- Tarjetes de revisió
- Footer
- Responsive design

### jaume.css

**Estils específics de la home:**

- Hero section amb imatge de fons i degradat
- Sistema d'inputs de cerca amb suggeriments
- Grid de cursos (responsive: 1 columna en mòbil, 3 en desktop)
- Targetes de cursos
- Targetes de professors amb avatar

### curso.css

**Estils per cursos i professors:**

- Hero section amb llistat de professors/cursos
- Opinions detallades amb avatars
- Formulari de valoració amb selector d'estrelles interactiu
- Layout amb imatge i formulari
- Targetes petites de professors

**Selector d'estrelles:**

- Utilitza `flex-direction: row-reverse` per il·luminar cap a l'esquerra en hover
- Estrelles amb color groc (#ffcc00) en hover
- Color daurat (#ffb800) quan estan seleccionades

### login.css

**Disseny d'autenticació:**

- Layout de dues columnes: imatge i formulari
- Columna d'imatge amb overlay semitransparent
- Formulari centrat verticalment
- Estils per errors amb animació
- Inputs amb focus destacat
- Responsive: columnes apilades en mòbil

## LocalStorage

El projecte utilitza localStorage per emmagatzemar:

### Claus utilitzades:

1. **`cursos`**: Array amb tots els cursos i la seva informació
2. **`usuarios`**: Array amb tots els usuaris registrats
3. **`userLogged`**: Objecte de l'usuari actualment logat
4. **`cursoSeleccionado`**: Objecte del curs que s'està visualitzant
5. **`profesorSeleccionado`**: Objecte del professor que s'està visualitzant

### Avantatges:

- Persistència de dades entre sessions
- No requereix servidor
- Accés ràpid a les dades

### Limitacions:

- Dades només en el navegador de l'usuari
- Límit d'emmagatzematge (normalment 5-10MB)
- No és adequat per dades sensibles
- Les dades es poden eliminar si l'usuari neteja la memòria cau

## Funcionalitats Destacades

### Sistema de Valoracions

- Selector visual d'estrelles (1-5)
- Validació de camps obligatoris
- Assignació de "Anonim" si l'usuari no està logat
- Recàlcul automàtic de la puntuació mitjana

### Gestió d'Avatars

- Càrrega de fitxers d'imatge
- Conversió a Base64 per emmagatzemar en localStorage
- Validació de tipus (jpg, png, gif, webp)
- Límit de mida: 2MB
- Mostra d'icona SVG per defecte si no hi ha avatar

### Cerca Dinàmica

- Suggeriments en temps real
- Filtratge amb `includes()` per cerca parcial
- Ocultació automàtica de suggeriments

### Responsive Design

- Grid adaptatiu (1 columna en mòbil, 3 en desktop)
- Header que es col·lapsa en mòbil
- Imatges i formularis que s'apilen verticalment
- Media queries per diferents punts de trencament (500px, 768px, 850px, 1000px, 1024px, 1200px)

## Credencials per Defecte

```
Usuari: admin
Contrasenya: admin

Usuari: user
Contrasenya: user
```

## Autor

Projecte educatiu - Jaume Viladoms

## Llicència

© 2025 Jaume Viladoms. Tots els drets reservats.

---

**Data de creació de la documentació:** Desembre 2025
**Versió del projecte:** 1.0