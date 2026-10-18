// Service worker: guarda el juego para abrirlo sin conexión.
// Archivos propios: primero la red (para recibir pistas y cambios nuevos), y si no hay, la copia guardada.
// Fuentes de Google: primero la copia guardada. El resto (multijugador) pasa sin tocar.
const CACHE = "criptico51-v2";
const ARCHIVOS = [
  "./", "./index.html", "./style.css", "./app.js", "./multi.js", "./pistas.js",
  "./manifest.webmanifest", "./iconos/icono-192.png", "./iconos/icono-512.png", "./iconos/apple-touch-icon.png", "./iconos/favicon-32.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Red con límite de tiempo, para no quedarse colgado con mala señal.
function red(peticion, ms) {
  return new Promise((ok, mal) => {
    const t = setTimeout(() => mal(new Error("tiempo")), ms);
    fetch(peticion).then((r) => { clearTimeout(t); ok(r); }, (e) => { clearTimeout(t); mal(e); });
  });
}

async function primeroRed(peticion) {
  const cache = await caches.open(CACHE);
  try {
    const r = await red(peticion, 4000);
    if (r.ok) {
      // Se guarda sin el ?v=N para que la copia sirva para cualquier versión pedida.
      const url = new URL(peticion.url);
      url.search = "";
      cache.put(peticion.mode === "navigate" ? "./index.html" : url.href, r.clone());
    }
    return r;
  } catch (e) {
    const guardada = peticion.mode === "navigate"
      ? await cache.match("./index.html")
      : await cache.match(peticion, { ignoreSearch: true });
    if (guardada) return guardada;
    throw e;
  }
}

async function primeroCache(peticion) {
  const cache = await caches.open(CACHE);
  const guardada = await cache.match(peticion);
  if (guardada) return guardada;
  const r = await fetch(peticion);
  if (r.ok || r.type === "opaque") cache.put(peticion, r.clone());
  return r;
}

self.addEventListener("fetch", (e) => {
  const { request } = e;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin === location.origin) e.respondWith(primeroRed(request));
  else if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") e.respondWith(primeroCache(request));
});
