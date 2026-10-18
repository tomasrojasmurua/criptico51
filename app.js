(() => {
  "use strict";

  const DIA_MS = 86400000;
  const CLAVE = "criptico51-v2";
  const inicio = Date.parse(FECHA_INICIO + "T00:00:00Z");

  // ---------- Utilidades ----------
  const $ = (sel) => document.querySelector(sel);
  const numeroDeHoy = () => Math.floor((Date.now() - inicio) / DIA_MS) + 1;
  const pistaDe = (n) => PISTAS[(n - 1) % PISTAS.length];
  // Letras de la respuesta sin espacios, y su enumeración: "SIN EMBARGO" → (3,7)
  const letrasDe = (p) => p.respuesta.replace(/ /g, "");
  const enumeracion = (p) => p.respuesta.split(" ").map((w) => w.length).join(",");
  const fechaDe = (n) => new Date(inicio + (n - 1) * DIA_MS);
  const formatoFecha = (d) =>
    d.toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

  // Quita tildes pero conserva la Ñ.
  const normalizar = (s) =>
    s.toUpperCase().replace(/Ñ/g, "\u0000").normalize("NFD")
      .replace(/[̀-ͯ]/g, "").replace(/\u0000/g, "Ñ");

  const escapar = (s) =>
    s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // ---------- Guardado ----------
  let datos;
  try { datos = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch { datos = {}; }
  datos.partidas = datos.partidas || {};
  const guardar = () => {
    try { localStorage.setItem(CLAVE, JSON.stringify(datos)); } catch { /* sin almacenamiento */ }
  };
  const partidaDe = (n) => {
    const largo = letrasDe(pistaDe(n)).length;
    if (!datos.partidas[n]) {
      datos.partidas[n] = { letras: Array(largo).fill(""), ayudas: 0, estado: "jugando", intentos: 0 };
    }
    const x = datos.partidas[n];
    x.fijas = x.fijas || [];
    x.reveladas = x.reveladas || 0;
    x.chequeos = x.chequeos || 0;
    x.segundos = x.segundos || 0;
    return x;
  };

  // Total de ayudas usadas: pasos del botón Pista (sin contar la solución),
  // letras reveladas y comprobaciones de letras.
  const ayudasTotales = (x, num) => {
    const pasos = ayudasDe(pistaDe(num)).length - 1;
    return Math.min(x.ayudas, pasos) + (x.reveladas || 0) + (x.chequeos || 0);
  };
  const formatoTiempo = (seg) => `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;

  // ---------- Ayudas progresivas ----------
  function ayudasDe(p) {
    const lista = [
      { titulo: "Tipo", texto: p.tipo },
      { titulo: "Definición", texto: "resaltada en amarillo en la pista", marca: "def" }
    ];
    if (p.indicador) lista.push({ titulo: "Indicador", texto: `«${p.indicador}», resaltado en azul`, marca: "ind" });
    lista.push({ titulo: "Primera letra", texto: letrasDe(p)[0], primera: true });
    lista.push({ titulo: "Solución", texto: p.respuesta, revelar: true });
    return lista;
  }

  // Envuelve los fragmentos de definición e indicador en <mark>.
  function pistaHTML(p, marcas) {
    const texto = p.pista;
    const tipo = Array(texto.length).fill(null);
    const marcar = (frag, clase) => {
      const i = texto.indexOf(frag);
      if (i < 0 || !frag) return;
      for (let k = i; k < i + frag.length; k++) tipo[k] = clase;
    };
    if (marcas.has("def")) p.definicion.forEach((d) => marcar(d, "def"));
    if (marcas.has("ind")) marcar(p.indicador, "ind");

    let html = "", actual = null;
    for (let k = 0; k < texto.length; k++) {
      if (tipo[k] !== actual) {
        if (actual) html += "</mark>";
        if (tipo[k]) html += `<mark class="${tipo[k]}">`;
        actual = tipo[k];
      }
      html += escapar(texto[k]);
    }
    if (actual) html += "</mark>";
    return `${html} <span class="largo">(${enumeracion(p)})</span>`;
  }

  // Lo que comparte el modo multijugador (multi.js).
  window.Criptico = { letrasDe, enumeracion, normalizar, escapar, pistaHTML };

  // ---------- Juego ----------
  let n, p, partida, cursor = 0;

  function cargar(num) {
    n = num;
    p = pistaDe(n);
    partida = partidaDe(n);
    cursor = Math.max(0, partida.letras.findIndex((l) => !l));
    if (partida.letras.every(Boolean)) cursor = letrasDe(p).length - 1;
    $("#mensaje").textContent = "";
    $("#mensaje").className = "mensaje";
    construirCasillas();
    pintar();
  }

  function construirCasillas() {
    const cont = $("#casillas");
    cont.innerHTML = "";
    cont.className = "casillas";
    cont.style.setProperty("--n", letrasDe(p).length);
    const finales = new Set();
    p.respuesta.split(" ").reduce((acc, w) => { finales.add(acc + w.length - 1); return acc + w.length; }, 0);
    for (let i = 0; i < letrasDe(p).length; i++) {
      const b = document.createElement("button");
      if (finales.has(i) && i < letrasDe(p).length - 1) b.classList.add("fin-palabra");
      b.classList.add("casilla");
      b.type = "button";
      b.setAttribute("aria-label", `Letra ${i + 1}`);
      b.addEventListener("click", () => { cursor = i; pintar(); });
      cont.appendChild(b);
    }
  }

  function terminado() { return partida.estado !== "jugando"; }

  function pintar() {
    const hoy = numeroDeHoy();
    $("#numero").textContent = n === hoy ? `Nº ${n} · Hoy` : n > hoy ? `Nº ${n} · Extra` : `Nº ${n} · ${formatoFecha(fechaDe(n))}`;
    const racha = calcularRachas().actual;
    $("#racha-mini").textContent = `Racha: ${racha}`;

    const lista = ayudasDe(p);
    const usadas = lista.slice(0, partida.ayudas);
    const marcas = new Set(usadas.filter((a) => a.marca).map((a) => a.marca));
    if (terminado()) { marcas.add("def"); if (p.indicador) marcas.add("ind"); }
    $("#pista").innerHTML = pistaHTML(p, marcas);

    const f = fijas();
    const casillas = [...$("#casillas").children];
    casillas.forEach((c, i) => {
      c.textContent = partida.letras[i] || "";
      c.classList.toggle("cursor", i === cursor && !terminado());
      c.classList.toggle("fija", f.has(i) && !terminado());
      c.disabled = terminado();
    });
    $("#casillas").classList.toggle("bien", partida.estado === "resuelto");

    $("#ayudas").innerHTML = usadas
      .filter((a) => !a.revelar)
      .map((a) => `<li><b>${a.titulo}:</b>${escapar(a.texto)}</li>`).join("");

    const siguiente = lista[partida.ayudas];
    const btnPista = $("#btn-pista");
    btnPista.textContent = siguiente && siguiente.revelar ? "Revelar" : "Pista";
    ["#btn-comprobar", "#btn-pista", "#btn-borrar", "#btn-letra", "#btn-chequear"].forEach((s) => ($(s).disabled = terminado()));
    $("#teclado").hidden = terminado();

    const final = $("#final");
    final.hidden = !terminado();
    if (terminado()) {
      const total = ayudasTotales(partida, n);
      const tiempo = partida.segundos ? ` en ${formatoTiempo(partida.segundos)}` : "";
      $("#final-texto").textContent = partida.estado === "resuelto"
        ? (total === 0 ? `¡Resuelto sin ayudas${tiempo}! 🎉` : `¡Resuelto con ${total} ${total === 1 ? "ayuda" : "ayudas"}${tiempo}!`)
        : `La respuesta era ${p.respuesta}.`;
      $("#final-explicacion").textContent = p.explicacion;
    }
  }

  function escribir(letra) {
    if (terminado()) return;
    cursor = libre(cursor, 1);
    if (fijas().has(cursor)) cursor = libre(cursor, -1);
    if (fijas().has(cursor)) return;
    partida.letras[cursor] = letra;
    if (cursor < letrasDe(p).length - 1) cursor = libre(cursor + 1, 1);
    guardar(); pintar();
  }

  // Casillas que ya no se pueden cambiar: la primera letra pedida como ayuda
  // y las letras reveladas o comprobadas.
  function fijas() {
    const f = new Set(partida.fijas);
    if (ayudasDe(p).slice(0, partida.ayudas).some((a) => a.primera)) f.add(0);
    return f;
  }

  // Siguiente casilla libre desde i en la dirección d (o i si no hay ninguna).
  function libre(i, d) {
    const f = fijas(), largo = letrasDe(p).length;
    for (let k = i; k >= 0 && k < largo; k += d) if (!f.has(k)) return k;
    return i;
  }

  function retroceder() {
    if (terminado()) return;
    const f = fijas();
    if ((f.has(cursor) || !partida.letras[cursor]) && cursor > 0) cursor = libre(cursor - 1, -1);
    if (!f.has(cursor)) partida.letras[cursor] = "";
    guardar(); pintar();
  }

  function mover(d) {
    cursor = Math.min(letrasDe(p).length - 1, Math.max(0, cursor + d));
    pintar();
  }

  function borrarTodo() {
    if (terminado()) return;
    const f = fijas();
    partida.letras = partida.letras.map((l, i) => (f.has(i) ? l : ""));
    cursor = libre(0, 1);
    guardar(); pintar();
  }

  function comprobar() {
    if (terminado()) return;
    const msg = $("#mensaje");
    const intento = partida.letras.join("");
    if (intento.length < letrasDe(p).length) {
      msg.textContent = "Faltan letras.";
      msg.className = "mensaje mal";
      return;
    }
    partida.intentos++;
    if (intento === letrasDe(p)) {
      partida.estado = "resuelto";
      partida.enFecha = n === numeroDeHoy();
      msg.textContent = "¡Correcto!";
      msg.className = "mensaje bien";
    } else {
      msg.textContent = "No es esa. Prueba otra vez o pide una pista.";
      msg.className = "mensaje mal";
      const c = $("#casillas");
      c.classList.remove("mal"); void c.offsetWidth; c.classList.add("mal");
    }
    guardar(); pintar();
  }

  function pedirAyuda() {
    if (terminado()) return;
    const lista = ayudasDe(p);
    const a = lista[partida.ayudas];
    if (!a) return;
    if (a.revelar && !confirm("¿Seguro que quieres ver la solución?")) return;
    partida.ayudas++;
    if (a.primera) {
      partida.letras[0] = letrasDe(p)[0];
      if (cursor === 0) cursor = libre(0, 1);
    }
    if (a.revelar) {
      partida.letras = letrasDe(p).split("");
      partida.estado = "revelado";
    }
    $("#mensaje").textContent = "";
    guardar(); pintar();
  }

  // Revela la letra de la casilla seleccionada (o la siguiente libre).
  function revelarLetra() {
    if (terminado()) return;
    const f = fijas();
    let i = libre(cursor, 1);
    if (f.has(i)) i = libre(cursor, -1);
    if (f.has(i)) return;
    partida.letras[i] = letrasDe(p)[i];
    partida.fijas.push(i);
    partida.reveladas++;
    $("#mensaje").textContent = "";
    if (fijas().size === letrasDe(p).length) partida.estado = "revelado";
    else cursor = libre(i, 1) !== i ? libre(i, 1) : libre(i, -1);
    guardar(); pintar();
  }

  // Fija las letras escritas que son correctas y borra las demás.
  function comprobarLetras() {
    if (terminado()) return;
    const sol = letrasDe(p), f = fijas();
    if (partida.letras.join("") === sol) { comprobar(); return; }
    const escritas = partida.letras.map((l, i) => i).filter((i) => partida.letras[i] && !f.has(i));
    const msg = $("#mensaje");
    if (!escritas.length) {
      msg.textContent = "Escribe alguna letra primero.";
      msg.className = "mensaje mal";
      return;
    }
    partida.chequeos++;
    let bien = 0;
    escritas.forEach((i) => {
      if (partida.letras[i] === sol[i]) { partida.fijas.push(i); bien++; }
      else partida.letras[i] = "";
    });
    const mal = escritas.length - bien;
    msg.textContent = mal === 0 ? `Todas bien (${bien}).`
      : bien === 0 ? `Ninguna de las ${mal} estaba bien; las he borrado.`
      : `${bien} bien y ${mal} mal; he borrado las que no.`;
    msg.className = mal === 0 ? "mensaje bien" : "mensaje mal";
    cursor = libre(0, 1);
    guardar(); pintar();
  }

  async function compartir() {
    const ayudas = ayudasTotales(partida, n);
    const tiempo = partida.segundos ? ` en ${formatoTiempo(partida.segundos)}` : "";
    let linea;
    if (partida.estado === "resuelto") {
      const intentos = partida.intentos <= 1 ? "a la primera" : `${partida.intentos} intentos`;
      linea = `✅ Resuelto${tiempo} · ${intentos} · ${ayudas === 0 ? "sin ayudas" : "💡".repeat(Math.min(ayudas, 10))}`;
    } else {
      linea = `🏳️ Revelado${tiempo}`;
    }
    const racha = calcularRachas().actual;
    const lineaRacha = n === numeroDeHoy() && racha > 0 ? `\n🔥 Racha de ${racha} ${racha === 1 ? "día" : "días"}` : "";
    const texto = `Críptico 51 · Nº ${n}\n${linea}${lineaRacha}\n${location.origin + location.pathname}#n/${n}`;
    try {
      if (navigator.share) await navigator.share({ text: texto });
      else { await navigator.clipboard.writeText(texto); avisar("Copiado al portapapeles"); }
    } catch { /* cancelado */ }
  }

  function avisar(t) {
    const msg = $("#mensaje");
    msg.textContent = t; msg.className = "mensaje bien";
  }

  // ---------- Teclado ----------
  const FILAS = ["QWERTYUIOP", "ASDFGHJKLÑ", "←ZXCVBNM⌫"];
  function construirTeclado() {
    const t = $("#teclado");
    FILAS.forEach((fila) => {
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
    if ($("#vista-juego").hidden || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "Enter") { e.preventDefault(); comprobar(); return; }
    if (e.key === "Backspace") { e.preventDefault(); retroceder(); return; }
    if (e.key === "ArrowLeft") { mover(-1); return; }
    if (e.key === "ArrowRight") { mover(1); return; }
    if (/^[a-zñáéíóúü]$/i.test(e.key)) { e.preventDefault(); escribir(normalizar(e.key)); }
  });

  // ---------- Estadísticas ----------
  function calcularRachas() {
    const hoy = numeroDeHoy();
    const ok = (k) => datos.partidas[k] && datos.partidas[k].estado === "resuelto" && datos.partidas[k].enFecha;
    let actual = 0;
    let k = ok(hoy) ? hoy : hoy - 1;
    while (k >= 1 && ok(k)) { actual++; k--; }
    let mejor = 0, corrida = 0;
    for (let i = 1; i <= hoy; i++) { corrida = ok(i) ? corrida + 1 : 0; mejor = Math.max(mejor, corrida); }
    return { actual, mejor };
  }

  function pintarEstadisticas() {
    const partidas = Object.values(datos.partidas);
    const jugadas = partidas.filter((x) => x.estado !== "jugando" || x.intentos > 0 || x.ayudas > 0);
    const resueltas = partidas.filter((x) => x.estado === "resuelto");
    const { actual, mejor } = calcularRachas();
    $("#est-jugadas").textContent = jugadas.length;
    $("#est-resueltas").textContent = resueltas.length;
    $("#est-racha").textContent = actual;
    $("#est-mejor").textContent = mejor;

    const cubos = [0, 0, 0, 0, 0];
    Object.entries(datos.partidas).forEach(([k, x]) => {
      if (x.estado === "resuelto") cubos[Math.min(ayudasTotales(x, +k), 4)]++;
    });
    const max = Math.max(1, ...cubos);
    const etiquetas = ["Sin ayudas", "1 ayuda", "2 ayudas", "3 ayudas", "4 o más"];
    $("#est-barras").innerHTML = cubos.map((c, i) =>
      `<div class="barra"><span>${etiquetas[i]}</span><span class="relleno" style="width:${Math.max(8, (c / max) * 100)}%">${c}</span></div>`
    ).join("");
  }

  // ---------- Archivo ----------
  function pintarArchivo() {
    const hoy = numeroDeHoy();
    const items = [];
    const total = Math.max(hoy, PISTAS.length);
    for (let k = 1; k <= total; k++) {
      const x = datos.partidas[k];
      const estado = !x ? "Sin jugar"
        : x.estado === "resuelto" ? "✅ Resuelto"
        : x.estado === "revelado" ? "🏳️ Revelado" : "En curso";
      const cuando = k === hoy ? `${formatoFecha(fechaDe(k))} (hoy)` : k < hoy ? formatoFecha(fechaDe(k)) : "Extra";
      items.push(`<li><a href="#n/${k}"><span><strong>Nº ${k}</strong> <span class="fecha">· ${cuando}</span></span><span class="estado">${estado}</span></a></li>`);
    }
    $("#lista-archivo").innerHTML = items.join("");
  }

  // ---------- Navegación ----------
  function enrutar() {
    const h = location.hash.slice(1) || "hoy";
    const hoy = numeroDeHoy();
    let vista = h;
    const m = h.match(/^n\/(\d+)$/);
    if (m) {
      const k = parseInt(m[1], 10);
      vista = "juego";
      cargar(k >= 1 && k <= Math.max(hoy, PISTAS.length) ? k : hoy);
    } else if (h === "multijugador" || h.startsWith("sala/")) {
      vista = "multijugador";
    } else if (h === "hoy" || !["archivo", "aprender", "estadisticas"].includes(h)) {
      vista = "juego";
      cargar(hoy);
    }
    document.querySelectorAll(".vista").forEach((s) => (s.hidden = s.id !== `vista-${vista}`));
    const activa = vista === "juego" ? (m && +m[1] !== hoy ? "archivo" : "hoy") : vista;
    document.querySelectorAll(".menu a").forEach((a) => a.classList.toggle("activo", a.dataset.vista === activa));
    if (vista === "archivo") pintarArchivo();
    if (vista === "estadisticas") pintarEstadisticas();
    if (vista === "multijugador") Multi.mostrar(h.startsWith("sala/") ? h.slice(5) : "");
    window.scrollTo(0, 0);
  }

  // ---------- Cuenta atrás ----------
  function tic() {
    const resta = DIA_MS - ((Date.now() - inicio) % DIA_MS);
    const s = Math.floor(resta / 1000);
    const hh = String(Math.floor(s / 3600)).padStart(2, "0");
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    $("#cuenta-atras").textContent = `${hh}:${mm}:${ss}`;
    // Tiempo de juego: solo cuenta con la pista a la vista y sin terminar.
    if (partida && !terminado() && !$("#vista-juego").hidden && document.visibilityState === "visible") {
      partida.segundos++;
      if (partida.segundos % 5 === 0) guardar();
    }
    if (s <= 0) setTimeout(enrutar, 1500);
  }

  // ---------- Arranque ----------
  $("#btn-comprobar").onclick = comprobar;
  $("#btn-pista").onclick = pedirAyuda;
  $("#btn-borrar").onclick = borrarTodo;
  $("#btn-letra").onclick = revelarLetra;
  $("#btn-chequear").onclick = comprobarLetras;
  $("#btn-compartir").onclick = compartir;
  construirTeclado();
  window.addEventListener("hashchange", enrutar);
  enrutar();
  tic();
  setInterval(tic, 1000);

  // ---------- App instalable y sin conexión ----------
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => { /* sin service worker */ });
  }
  let invitacion = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    invitacion = e;
    $("#instalar").hidden = false;
  });
  $("#btn-instalar").onclick = async () => {
    if (!invitacion) return;
    invitacion.prompt();
    await invitacion.userChoice.catch(() => {});
    invitacion = null;
    $("#instalar").hidden = true;
  };
  window.addEventListener("appinstalled", () => { $("#instalar").hidden = true; });
})();
