// Modo multijugador: salas peer-to-peer con PeerJS.
// El navegador del anfitrión hace de servidor: elige las pistas, cronometra
// cada ronda, comprueba las respuestas y reparte los puntos.
const Multi = (() => {
  "use strict";

  const PEERJS_URL = "https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js";
  const PREFIJO = "criptico51-sala-";
  const LETRAS_CODIGO = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const MAX_JUGADORES = 8;
  const PAUSA_MS = 9000;
  const CLAVE_NOMBRE = "criptico51-nombre";
  const CLAVE_USADAS = "criptico51-multi-usadas";

  const $ = (sel) => document.querySelector(sel);
  const C = () => window.Criptico;
  const esc = (s) => C().escapar(String(s));

  // ---------- Estado ----------
  let peer = null;
  let anfitrion = false;
  let yo = null;            // id de este jugador (el id de su peer)
  let codigo = "";
  let alHost = null;        // conexión del invitado con el anfitrión
  const conexiones = new Map(); // anfitrión: id → conexión
  let sala = null;          // estado público que reparte el anfitrión
  let limite = 0;           // hora local en que termina la ronda o la pausa
  let tic = null;

  // Solo en el anfitrión
  let orden = [];
  let inicioRonda = 0;
  let temporizador = null;

  // Ronda local
  let rondaLocal = 0, letras = [], cursor = 0, ayudas = 0, resuelto = false, esperando = false;

  // ---------- Utilidades ----------
  function leer(clave, def) {
    try { const v = localStorage.getItem(clave); return v === null ? def : JSON.parse(v); } catch { return def; }
  }
  function escribirClave(clave, v) {
    try { localStorage.setItem(clave, JSON.stringify(v)); } catch { /* sin almacenamiento */ }
  }

  function cargarPeerJS() {
    if (window.Peer) return Promise.resolve();
    return new Promise((ok, mal) => {
      const s = document.createElement("script");
      s.src = PEERJS_URL;
      s.onload = ok;
      s.onerror = () => mal(new Error("No se pudo cargar la conexión. Revisa tu internet."));
      document.head.appendChild(s);
    });
  }

  function nuevoPeer(id) {
    return new window.Peer(id, window.CRIPTICO_PEER || {});
  }

  const pistaActual = () => PISTAS[sala.idx];
  const jugador = (id) => sala && sala.jugadores.find((j) => j.id === id);

  function avisar(texto) {
    $("#mp-aviso").textContent = texto || "";
  }

  // ---------- Elección de pistas ----------
  const NIVELES = {
    facil: { nombre: "fácil", rango: [1, 2] },
    media: { nombre: "media", rango: [3, 3] },
    dificil: { nombre: "difícil", rango: [4, 5] },
    progresiva: { nombre: "de fácil a difícil", rango: [1, 5] },
  };

  function elegirPistas(n, nivel) {
    const hoy = (Math.floor((Date.now() - Date.parse(FECHA_INICIO + "T00:00:00Z")) / 86400000)) % PISTAS.length;
    const usadas = new Set(leer(CLAVE_USADAS, []));
    const mezclar = (a) => {
      for (let i = a.length - 1; i > 0; i--) { const k = Math.floor(Math.random() * (i + 1)); [a[i], a[k]] = [a[k], a[i]]; }
      return a;
    };
    const dif = (i) => PISTAS[i].dificultad || 3;
    const [min, max] = (NIVELES[nivel] || NIVELES.media).rango;
    const lejania = (i) => Math.max(0, min - dif(i), dif(i) - max);
    const todas = PISTAS.map((_, i) => i).filter((i) => i !== hoy);
    // Primero las que no han salido; si no alcanzan, se vuelve a empezar el ciclo.
    const nuevas = mezclar(todas.filter((i) => !usadas.has(i)));
    const viejas = mezclar(todas.filter((i) => usadas.has(i)));
    let elegidas;
    if (nivel === "progresiva") {
      // La ronda k busca una pista de nivel cercano a uno que sube del 2 al 5.
      const pozo = nuevas.length >= n ? nuevas : nuevas.concat(viejas);
      elegidas = [];
      for (let k = 0; k < n; k++) {
        const meta = 2 + Math.round(3 * k / Math.max(1, n - 1));
        let mejor = 0;
        pozo.forEach((i, j) => { if (Math.abs(dif(i) - meta) < Math.abs(dif(pozo[mejor]) - meta)) mejor = j; });
        elegidas.push(pozo.splice(mejor, 1)[0]);
      }
    } else {
      // Las del nivel pedido primero; si faltan, las de niveles vecinos.
      const porNivel = (a) => a.sort((x, y) => lejania(x) - lejania(y));
      const enNivel = nuevas.filter((i) => !lejania(i));
      elegidas = (enNivel.length >= n ? enNivel : porNivel(nuevas.concat(viejas))).slice(0, n);
    }
    if (elegidas.some((i) => usadas.has(i))) usadas.clear();
    elegidas.forEach((i) => usadas.add(i));
    escribirClave(CLAVE_USADAS, [...usadas]);
    return elegidas;
  }

  // ---------- Anfitrión ----------
  function crearSala() {
    const nombre = nombreValido();
    if (!nombre) return;
    avisar("Creando sala…");
    cargarPeerJS().then(() => intentarCrear(nombre, 0)).catch((e) => avisar(e.message));
  }

  function intentarCrear(nombre, intento) {
    codigo = Array.from({ length: 4 }, () => LETRAS_CODIGO[Math.floor(Math.random() * LETRAS_CODIGO.length)]).join("");
    const p = nuevoPeer(PREFIJO + codigo);
    p.on("open", (id) => {
      peer = p; anfitrion = true; yo = id;
      sala = {
        codigo, fase: "espera", config: { rondas: 10, segundos: 300, dificultad: "progresiva" },
        ronda: 0, total: 0, idx: -1, restante: 0,
        jugadores: [{ id: yo, nombre, puntos: 0, conectado: true, resuelto: false, ganados: 0, tiempo: 0, anfitrion: true }]
      };
      location.hash = "#sala/" + codigo;
      avisar("");
      repartir();
    });
    p.on("error", (e) => {
      if (e.type === "unavailable-id" && intento < 5) { p.destroy(); intentarCrear(nombre, intento + 1); return; }
      if (!peer) { p.destroy(); avisar(mensajeError(e)); return; }
      console.warn("PeerJS", e);
    });
    p.on("disconnected", () => { if (peer === p && !p.destroyed) p.reconnect(); });
    p.on("connection", (conn) => {
      conn.on("data", (d) => recibir(conn.peer, d, conn));
      conn.on("close", () => desconectado(conn.peer));
      conn.on("error", () => desconectado(conn.peer));
    });
  }

  // Todo lo que llega al anfitrión pasa por aquí, también lo del propio anfitrión.
  function recibir(id, m, conn) {
    if (!anfitrion || !m || typeof m !== "object") return;
    if (m.t === "hola") {
      if (sala.jugadores.filter((j) => j.conectado).length >= MAX_JUGADORES) {
        conn.send({ t: "error", texto: "La sala está llena (máximo 8 jugadores)." });
        setTimeout(() => conn.close(), 500);
        return;
      }
      conexiones.set(id, conn);
      const nombre = String(m.nombre || "Jugador").slice(0, 16);
      const j = jugador(id);
      if (j) { j.conectado = true; j.nombre = nombre; }
      else sala.jugadores.push({ id, nombre, puntos: 0, conectado: true, resuelto: false, ganados: 0, tiempo: 0 });
      repartir();
    } else if (m.t === "adios") {
      desconectado(id);
    } else if (m.t === "intento") {
      const j = jugador(id);
      if (!j || sala.fase !== "ronda" || m.ronda !== sala.ronda || j.resuelto) return;
      const ok = String(m.letras) === C().letrasDe(pistaActual());
      let puntos = 0;
      if (ok) {
        const ms = sala.config.segundos * 1000;
        const tiempo = Math.min(ms, Date.now() - inicioRonda);
        const ayudasUsadas = Math.max(0, Math.min(3, m.ayudas | 0));
        puntos = Math.round(((200 + 800 * (1 - tiempo / ms)) * (1 - 0.2 * ayudasUsadas)) / 10) * 10;
        Object.assign(j, { resuelto: true, ganados: puntos, tiempo });
        j.puntos += puntos;
      }
      enviar(id, { t: "respuesta", ronda: sala.ronda, ok, puntos });
      if (sala.jugadores.every((x) => x.resuelto || !x.conectado)) cerrarRonda();
      else repartir();
    }
  }

  function desconectado(id) {
    conexiones.delete(id);
    const j = jugador(id);
    if (!j || !j.conectado) return;
    j.conectado = false;
    if (sala.fase === "espera") sala.jugadores = sala.jugadores.filter((x) => x !== j);
    if (sala.fase === "ronda" && sala.jugadores.every((x) => x.resuelto || !x.conectado)) cerrarRonda();
    else repartir();
  }

  function enviar(id, m) {
    if (id === yo) { manejar(m); return; }
    const c = conexiones.get(id);
    if (c && c.open) c.send(m);
  }

  function repartir() {
    if (sala.fase === "ronda") sala.restante = inicioRonda + sala.config.segundos * 1000 - Date.now();
    else if (sala.fase === "pausa") sala.restante = inicioRonda - Date.now();
    else sala.restante = 0;
    const m = { t: "estado", sala };
    conexiones.forEach((c) => { if (c.open) c.send(m); });
    manejar(m);
  }

  function comenzar() {
    clearTimeout(temporizador);
    sala.config.rondas = +$("#mp-rondas").value;
    sala.config.segundos = +$("#mp-segundos").value;
    sala.config.dificultad = $("#mp-dificultad").value;
    sala.jugadores = sala.jugadores.filter((j) => j.conectado);
    sala.jugadores.forEach((j) => { j.puntos = 0; j.ganados = 0; });
    sala.total = sala.config.rondas;
    sala.ronda = 0;
    orden = elegirPistas(sala.total, sala.config.dificultad);
    siguienteRonda();
  }

  function siguienteRonda() {
    clearTimeout(temporizador);
    if (sala.ronda >= sala.total) {
      sala.fase = "final";
      repartir();
      return;
    }
    sala.ronda++;
    sala.idx = orden[sala.ronda - 1];
    sala.fase = "ronda";
    sala.jugadores.forEach((j) => Object.assign(j, { resuelto: false, ganados: 0, tiempo: 0 }));
    inicioRonda = Date.now();
    temporizador = setTimeout(cerrarRonda, sala.config.segundos * 1000 + 400);
    repartir();
  }

  function cerrarRonda() {
    if (sala.fase !== "ronda") return;
    clearTimeout(temporizador);
    sala.fase = "pausa";
    inicioRonda = Date.now() + PAUSA_MS; // en la pausa, marca cuándo empieza la siguiente
    temporizador = setTimeout(siguienteRonda, PAUSA_MS);
    repartir();
  }

  function otraVez() {
    clearTimeout(temporizador);
    sala.fase = "espera";
    sala.ronda = 0;
    sala.jugadores = sala.jugadores.filter((j) => j.conectado);
    sala.jugadores.forEach((j) => Object.assign(j, { puntos: 0, ganados: 0, resuelto: false }));
    repartir();
  }

  // ---------- Invitado ----------
  function unirse() {
    const nombre = nombreValido();
    if (!nombre) return;
    const cod = $("#mp-codigo").value.trim().toUpperCase();
    if (!/^[A-Z]{4}$/.test(cod)) { avisar("El código tiene 4 letras."); return; }
    avisar("Conectando…");
    cargarPeerJS().then(() => {
      const p = nuevoPeer();
      let abierta = false;
      const espera = setTimeout(() => {
        if (!abierta) { p.destroy(); avisar("No se pudo conectar con esa sala. Revisa el código."); }
      }, 15000);
      p.on("open", (id) => {
        const conn = p.connect(PREFIJO + cod, { reliable: true });
        conn.on("open", () => {
          abierta = true; clearTimeout(espera);
          peer = p; anfitrion = false; yo = id; codigo = cod; alHost = conn;
          conn.send({ t: "hola", nombre });
          if (location.hash !== "#sala/" + cod) location.hash = "#sala/" + cod;
          avisar("");
        });
        conn.on("data", manejar);
        conn.on("close", () => { if (alHost === conn) cerrado("El anfitrión cerró la sala."); });
      });
      p.on("error", (e) => {
        if (!abierta) { clearTimeout(espera); p.destroy(); avisar(mensajeError(e)); }
      });
      p.on("disconnected", () => { if (peer === p && !p.destroyed) p.reconnect(); });
    }).catch((e) => avisar(e.message));
  }

  function alAnfitrion(m) {
    if (anfitrion) recibir(yo, m);
    else if (alHost && alHost.open) alHost.send(m);
  }

  function mensajeError(e) {
    if (e.type === "peer-unavailable") return "No existe ninguna sala con ese código.";
    if (e.type === "browser-incompatible") return "Este navegador no permite jugar en línea.";
    if (e.type === "network" || e.type === "server-error" || e.type === "socket-error") return "No se pudo conectar con el servidor. Prueba de nuevo.";
    return "Algo falló al conectar. Prueba de nuevo.";
  }

  // Avisa antes de irse, para que el anfitrión no espere a quien cerró la pestaña.
  function despedirse() {
    try {
      if (alHost && alHost.open) alHost.send({ t: "adios" });
      if (anfitrion) conexiones.forEach((c) => { if (c.open) c.send({ t: "error", texto: "El anfitrión cerró la sala." }); });
    } catch { /* la conexión ya estaba cerrada */ }
  }

  function cerrado(texto) {
    salir();
    avisar(texto);
  }

  function salir() {
    despedirse();
    clearTimeout(temporizador);
    clearInterval(tic); tic = null;
    alHost = null;
    const viejo = peer;
    if (viejo) setTimeout(() => viejo.destroy(), 300); // deja salir el último mensaje
    peer = null; sala = null; anfitrion = false; rondaLocal = 0;
    conexiones.clear();
    if (location.hash.startsWith("#sala/")) history.replaceState(null, "", "#multijugador");
    pintar();
  }

  // ---------- Mensajes recibidos (todos los jugadores) ----------
  function manejar(m) {
    if (!m || typeof m !== "object") return;
    if (m.t === "error") { cerrado(m.texto); return; }
    if (m.t === "estado") {
      if (!anfitrion) sala = m.sala;
      limite = Date.now() + Math.max(0, sala.restante);
      if (sala.fase === "ronda" && sala.ronda !== rondaLocal) empezarRonda();
      if (sala.fase === "espera") rondaLocal = 0;
      pintar();
    } else if (m.t === "respuesta" && sala && m.ronda === sala.ronda) {
      esperando = false;
      const msg = $("#mp-mensaje");
      if (m.ok) {
        resuelto = true;
        msg.textContent = `¡Correcto! +${m.puntos} puntos`;
        msg.className = "mensaje bien";
      } else {
        msg.textContent = "No es esa. Sigue intentando.";
        msg.className = "mensaje mal";
        const c = $("#mp-casillas");
        c.classList.remove("mal"); void c.offsetWidth; c.classList.add("mal");
      }
      pintarRonda();
    }
  }

  // ---------- Ronda ----------
  function empezarRonda() {
    rondaLocal = sala.ronda;
    const largo = C().letrasDe(pistaActual()).length;
    letras = Array(largo).fill("");
    cursor = 0; ayudas = 0; resuelto = false; esperando = false;
    $("#mp-mensaje").textContent = "";
    $("#mp-mensaje").className = "mensaje";
    construirCasillas();
  }

  function construirCasillas() {
    const p = pistaActual();
    const cont = $("#mp-casillas");
    cont.innerHTML = "";
    cont.className = "casillas";
    const total = C().letrasDe(p).length;
    cont.style.setProperty("--n", total);
    const finales = new Set();
    p.respuesta.split(" ").reduce((acc, w) => { finales.add(acc + w.length - 1); return acc + w.length; }, 0);
    for (let i = 0; i < total; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "casilla";
      if (finales.has(i) && i < total - 1) b.classList.add("fin-palabra");
      b.setAttribute("aria-label", `Letra ${i + 1}`);
      b.addEventListener("click", () => { cursor = i; pintarRonda(); });
      cont.appendChild(b);
    }
  }

  function ayudasDe(p) {
    return [
      { titulo: "Tipo", texto: p.tipo },
      { titulo: "Definición", texto: "resaltada en amarillo en la pista", marca: "def" },
      { titulo: "Primera letra", texto: C().letrasDe(p)[0], primera: true }
    ];
  }

  const tiempoAgotado = () => Date.now() >= limite;
  const bloqueado = () => !sala || sala.fase !== "ronda" || resuelto || esperando || tiempoAgotado();
  const primeraFija = () => ayudas >= 3;

  function escribir(l) {
    if (bloqueado()) return;
    if (cursor === 0 && primeraFija()) cursor = 1;
    letras[cursor] = l;
    if (cursor < letras.length - 1) cursor++;
    pintarRonda();
  }

  function retroceder() {
    if (bloqueado()) return;
    const minimo = primeraFija() ? 1 : 0;
    if (!letras[cursor] && cursor > minimo) cursor--;
    if (cursor >= minimo) letras[cursor] = "";
    pintarRonda();
  }

  function borrarTodo() {
    if (bloqueado()) return;
    letras = letras.map((l, i) => (primeraFija() && i === 0 ? l : ""));
    cursor = primeraFija() ? 1 : 0;
    pintarRonda();
  }

  function comprobar() {
    if (bloqueado()) return;
    if (letras.some((l) => !l)) {
      $("#mp-mensaje").textContent = "Faltan letras.";
      $("#mp-mensaje").className = "mensaje mal";
      return;
    }
    esperando = true;
    alAnfitrion({ t: "intento", ronda: sala.ronda, letras: letras.join(""), ayudas });
  }

  function pedirAyuda() {
    if (bloqueado() || ayudas >= 3) return;
    ayudas++;
    if (primeraFija()) {
      letras[0] = C().letrasDe(pistaActual())[0];
      if (cursor === 0) cursor = 1;
    }
    $("#mp-mensaje").textContent = "";
    pintarRonda();
  }

  // ---------- Pintar ----------
  function mostrarPanel(id) {
    ["mp-inicio", "mp-sala", "mp-juego", "mp-pausa", "mp-final"].forEach((p) => ($("#" + p).hidden = p !== id));
  }

  function pintar() {
    if (!sala) {
      mostrarPanel("mp-inicio");
      clearInterval(tic); tic = null;
      return;
    }
    if (!tic) tic = setInterval(pintarReloj, 250);
    if (sala.fase === "espera") pintarSala();
    else if (sala.fase === "ronda") { mostrarPanel("mp-juego"); pintarRonda(); }
    else if (sala.fase === "pausa") pintarPausa();
    else pintarFinal();
    pintarReloj();
  }

  function pintarSala() {
    mostrarPanel("mp-sala");
    $("#mp-codigo-grande").textContent = sala.codigo;
    $("#mp-cuantos").textContent = `${sala.jugadores.length} de ${MAX_JUGADORES} jugadores`;
    $("#mp-jugadores").innerHTML = sala.jugadores.map((j) =>
      `<li><span>${esc(j.nombre)}${j.id === yo ? " <small>(tú)</small>" : ""}</span>${j.anfitrion ? "<small>Anfitrión</small>" : ""}</li>`
    ).join("");
    $("#mp-config").hidden = !anfitrion;
    $("#mp-espera").hidden = anfitrion;
    $("#mp-espera").textContent = `Esperando a que el anfitrión comience · ${sala.config.rondas} rondas de ${sala.config.segundos / 60} minutos, dificultad ${(NIVELES[sala.config.dificultad] || NIVELES.media).nombre}`;
    if (anfitrion) {
      $("#mp-rondas").value = sala.config.rondas;
      $("#mp-segundos").value = sala.config.segundos;
      $("#mp-dificultad").value = sala.config.dificultad;
    }
  }

  function pintarRonda() {
    if (!sala || sala.fase !== "ronda" || rondaLocal !== sala.ronda) return;
    const p = pistaActual();
    $("#mp-ronda").textContent = `Ronda ${sala.ronda} de ${sala.total}`;
    const lista = ayudasDe(p).slice(0, ayudas);
    const marcas = new Set(lista.filter((a) => a.marca).map((a) => a.marca));
    $("#mp-pista").innerHTML = C().pistaHTML(p, marcas);
    const fin = bloqueado();
    [...$("#mp-casillas").children].forEach((c, i) => {
      c.textContent = letras[i] || "";
      c.classList.toggle("cursor", i === cursor && !fin);
      c.classList.toggle("fija", i === 0 && primeraFija() && !resuelto);
      c.disabled = fin;
    });
    $("#mp-casillas").classList.toggle("bien", resuelto);
    $("#mp-ayudas").innerHTML = lista.map((a) => `<li><b>${a.titulo}:</b>${esc(a.texto)}</li>`).join("");
    $("#mp-comprobar").disabled = fin;
    $("#mp-borrar").disabled = fin;
    $("#mp-pista-btn").disabled = fin || ayudas >= 3;
    $("#mp-pista-btn").textContent = ayudas >= 3 ? "Sin más pistas" : "Pista (−20 %)";
    $("#mp-teclado").hidden = fin;
    if (tiempoAgotado() && !resuelto && !$("#mp-mensaje").textContent) {
      $("#mp-mensaje").textContent = "¡Se acabó el tiempo!";
      $("#mp-mensaje").className = "mensaje mal";
    }
    $("#mp-marcador").innerHTML = ordenados().map((j) =>
      `<li class="${j.resuelto ? "hecho" : ""}${j.conectado ? "" : " fuera"}"><span>${j.resuelto ? "✓" : "…"} ${esc(j.nombre)}${j.id === yo ? " (tú)" : ""}</span><span>${j.puntos}</span></li>`
    ).join("");
  }

  const ordenados = () => [...sala.jugadores].sort((a, b) => b.puntos - a.puntos);

  function tablaHTML(conRonda) {
    let puesto = 0, anterior = null;
    return ordenados().map((j, i) => {
      if (j.puntos !== anterior) { puesto = i + 1; anterior = j.puntos; }
      const extra = conRonda
        ? (j.resuelto ? `<small>+${j.ganados} · ${(j.tiempo / 1000).toFixed(1)} s</small>` : "<small>sin resolver</small>")
        : "";
      return `<li class="${j.id === yo ? "yo" : ""}${j.conectado ? "" : " fuera"}"><span class="puesto">${puesto}</span><span class="nombre">${esc(j.nombre)}${j.conectado ? "" : " <small>(se fue)</small>"}</span>${extra}<strong>${j.puntos}</strong></li>`;
    }).join("");
  }

  function pintarPausa() {
    mostrarPanel("mp-pausa");
    const p = pistaActual();
    $("#mp-pausa-ronda").textContent = `Ronda ${sala.ronda} de ${sala.total}`;
    $("#mp-sol-pista").innerHTML = C().pistaHTML(p, new Set(["def", "ind", "rel"]));
    $("#mp-sol").textContent = p.respuesta;
    $("#mp-sol-expl").textContent = p.explicacion;
    $("#mp-tabla").innerHTML = tablaHTML(true);
  }

  function pintarFinal() {
    mostrarPanel("mp-final");
    const lista = ordenados();
    const mejores = lista.filter((j) => j.puntos === lista[0].puntos);
    $("#mp-ganador").textContent = lista.length < 2 ? `Terminaste con ${lista[0].puntos} puntos`
      : mejores.length > 1 ? `Empate entre ${mejores.map((j) => j.nombre).join(" y ")}`
      : mejores[0].id === yo ? "¡Ganaste! 🏆" : `Ganó ${mejores[0].nombre} 🏆`;
    $("#mp-tabla-final").innerHTML = tablaHTML(false);
    $("#mp-otra").hidden = !anfitrion;
    $("#mp-final-espera").hidden = anfitrion;
  }

  function pintarReloj() {
    if (!sala) return;
    const resta = Math.max(0, limite - Date.now());
    if (sala.fase === "ronda") {
      const s = Math.ceil(resta / 1000);
      $("#mp-tiempo").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      $("#mp-tiempo").classList.toggle("urgente", s <= 10);
      $("#mp-barra").style.width = `${(resta / (sala.config.segundos * 1000)) * 100}%`;
      if (resta === 0 && !$("#mp-juego").hidden && !$("#mp-teclado").hidden) pintarRonda();
    } else if (sala.fase === "pausa") {
      const s = Math.ceil(resta / 1000);
      $("#mp-siguiente").textContent = sala.ronda >= sala.total
        ? `Resultados finales en ${s}…` : `Siguiente ronda en ${s}…`;
    }
  }

  // ---------- Nombre e invitación ----------
  function nombreValido() {
    const n = $("#mp-nombre").value.trim().slice(0, 16);
    if (!n) { avisar("Escribe tu nombre para jugar."); $("#mp-nombre").focus(); return ""; }
    escribirClave(CLAVE_NOMBRE, n);
    return n;
  }

  async function invitar() {
    const url = `${location.origin}${location.pathname}#sala/${sala.codigo}`;
    const texto = `¡Juega Críptico 51 conmigo! Sala ${sala.codigo}`;
    try {
      if (navigator.share) await navigator.share({ text: texto, url });
      else {
        await navigator.clipboard.writeText(`${texto}\n${url}`);
        $("#mp-invitar").textContent = "¡Enlace copiado!";
        setTimeout(() => ($("#mp-invitar").textContent = "Invitar con un enlace"), 2000);
      }
    } catch { /* cancelado */ }
  }

  // ---------- Teclado ----------
  function construirTeclado() {
    const t = $("#mp-teclado");
    ["QWERTYUIOP", "ASDFGHJKLÑ", "←ZXCVBNM⌫"].forEach((fila) => {
      const div = document.createElement("div");
      div.className = "fila";
      [...fila].forEach((k) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "tecla";
        if (k === "←") { b.textContent = "Comprobar"; b.classList.add("ancha"); b.onclick = comprobar; }
        else if (k === "⌫") { b.textContent = "⌫"; b.classList.add("ancha"); b.setAttribute("aria-label", "Borrar"); b.onclick = retroceder; }
        else { b.textContent = k; b.onclick = () => escribir(k); }
        div.appendChild(b);
      });
      t.appendChild(div);
    });
  }

  document.addEventListener("keydown", (e) => {
    if ($("#vista-multijugador").hidden || $("#mp-juego").hidden) return;
    if (e.ctrlKey || e.metaKey || e.altKey || e.target.tagName === "INPUT") return;
    if (e.key === "Enter") { e.preventDefault(); comprobar(); return; }
    if (e.key === "Backspace") { e.preventDefault(); retroceder(); return; }
    if (e.key === "ArrowLeft") { cursor = Math.max(0, cursor - 1); pintarRonda(); return; }
    if (e.key === "ArrowRight") { cursor = Math.min(letras.length - 1, cursor + 1); pintarRonda(); return; }
    if (/^[a-zñáéíóúü]$/i.test(e.key)) { e.preventDefault(); escribir(C().normalizar(e.key)); }
  });

  // ---------- Arranque ----------
  let listo = false;
  function preparar() {
    if (listo) return;
    listo = true;
    $("#mp-nombre").value = leer(CLAVE_NOMBRE, "");
    $("#mp-crear").onclick = crearSala;
    $("#mp-unirse").onclick = unirse;
    $("#mp-codigo").addEventListener("keydown", (e) => { if (e.key === "Enter") unirse(); });
    $("#mp-codigo").addEventListener("input", (e) => (e.target.value = e.target.value.toUpperCase().replace(/[^A-Z]/g, "")));
    $("#mp-comenzar").onclick = comenzar;
    ["#mp-rondas", "#mp-segundos", "#mp-dificultad"].forEach((s) => $(s).addEventListener("change", () => {
      if (!anfitrion || !sala || sala.fase !== "espera") return;
      sala.config.rondas = +$("#mp-rondas").value;
      sala.config.segundos = +$("#mp-segundos").value;
      sala.config.dificultad = $("#mp-dificultad").value;
      repartir();
    }));
    $("#mp-invitar").onclick = invitar;
    $("#mp-comprobar").onclick = comprobar;
    $("#mp-pista-btn").onclick = pedirAyuda;
    $("#mp-borrar").onclick = borrarTodo;
    $("#mp-otra").onclick = otraVez;
    document.querySelectorAll(".mp-salir").forEach((b) => (b.onclick = () => {
      if (!sala || sala.fase === "espera" || sala.fase === "final" || confirm("¿Seguro que quieres salir de la partida?")) salir();
    }));
    window.addEventListener("pagehide", () => { despedirse(); if (peer) peer.destroy(); });
    construirTeclado();
  }

  function mostrar(cod) {
    preparar();
    if (!sala && cod) {
      $("#mp-codigo").value = cod.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
      if (!$("#mp-nombre").value) $("#mp-nombre").focus();
    }
    pintar();
  }

  return { mostrar };
})();
