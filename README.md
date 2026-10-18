# Críptico 51

Una pista críptica nueva cada día, en español. Sitio estático (HTML, CSS y JS sin dependencias), listo para GitHub Pages.

## Archivos
- `index.html`: estructura y secciones (Hoy, Archivo, Aprender, Estadísticas).
- `style.css`: estilos, con modo oscuro automático.
- `app.js`: lógica del juego, ayudas, racha y estadísticas (guardadas en `localStorage`).
- `pistas.js`: banco de pistas. Para añadir una, agrega un objeto al final de `PISTAS`.

La pista del día se elige contando los días UTC desde `FECHA_INICIO`; cuando se acaban, vuelve a empezar.

## Publicar en GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → rama `main`, carpeta `/ (root)`.
