# Críptico 51

Una pista críptica nueva cada día, en español. Sitio estático (HTML, CSS y JS; el modo multijugador carga PeerJS desde un CDN), listo para GitHub Pages.

## Archivos
- `index.html`: estructura y secciones (Hoy, Archivo, Aprender, Estadísticas).
- `style.css`: estilos, con modo oscuro automático.
- `app.js`: lógica del juego, ayudas, racha y estadísticas (guardadas en `localStorage`).
- `multi.js`: modo multijugador (salas de hasta 8 jugadores).
- `manifest.webmanifest`, `sw.js` e `iconos/`: app instalable (PWA) que funciona sin conexión.
- `pistas.js`: pistas Extras (las 8 primeras fueron las pistas de los días 1 a 8). Para añadir una Extra, agrega un objeto al final de `PISTAS` con su `dificultad` de 1 a 5.
- `diarias.js`: pistas del día desde el Nº 9 hasta el 31 de diciembre de 2027, cifradas para que no se vean antes de su día. Se generan con `validar.py` y `cifrar.py` desde la carpeta `criptico/diarias-fuente` del proyecto, que no está en este repositorio.

La pista del día se elige contando los días UTC desde `FECHA_INICIO`: los días 1 a 8 usan las primeras pistas de `pistas.js` y desde el 9 se descifra la de `diarias.js` solo cuando llega su día. El Archivo muestra los días pasados y las Extras por separado.

## Publicar en GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)`.

## Multijugador
Un jugador crea una sala y recibe un código de 4 letras; los demás se unen con ese código o con el enlace `#sala/CÓDIGO`. La conexión es directa entre navegadores (WebRTC) usando [PeerJS](https://peerjs.com/) y su servidor público gratuito solo para presentarse; no hay servidor propio ni cuentas.

El navegador del anfitrión hace de árbitro: elige pistas al azar sin repetir las ya jugadas en ese navegador y según la dificultad elegida (fácil, media, difícil o de fácil a difícil), cronometra cada ronda, comprueba las respuestas y reparte los puntos (1000 al instante, 200 al final del tiempo, −20 % por cada pista pedida). Si el anfitrión cierra la pestaña, la sala termina.

## App instalable
El service worker (`sw.js`) guarda los archivos del juego. Siempre pide primero la versión nueva a la red y, si no hay conexión, usa la copia guardada. Si agregas un archivo nuevo que el juego necesite, añádelo a `ARCHIVOS` en `sw.js` y sube el número de `CACHE`.
