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
    return datos.partidas[n];
  };

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
    $("#numero").textContent = n === hoy ? `Nº ${n} · Hoy` : `Nº ${n} · ${formatoFecha(fechaDe(n))}`;
    const racha = calcularRachas().actual;
    $("#racha-mini").textContent = `Racha: ${racha}`;

    const lista = ayudasDe(p);
    const usadas = lista.slice(0, partida.ayudas);
    const marcas = new Set(usadas.filter((a) => a.marca).map((a) => a.marca));
    if (terminado()) { marcas.add("def"); if (p.indicador) marcas.add("ind"); }
    $("#pista").innerHTML = pistaHTML(p, marcas);

    const primeraFija = usadas.some((a) => a.primera);
    const casillas = [...$("#casillas").children];
    casillas.forEach((c, i) => {
      c.textContent = partida.letras[i] || "";
      c.classList.toggle("cursor", i === cursor && !terminado());
      c.classList.toggle("fija", i === 0 && primeraFija && !terminado());
      c.disabled = terminado();
    });
    $("#casillas").classList.toggle("bien", partida.estado === "resuelto");

    $("#ayudas").innerHTML = usadas
      .filter((a) => !a.revelar)
      .map((a) => `<li><b>${a.titulo}:</b>${escapar(a.texto)}</li>`).join("");

    const siguiente = lista[partida.ayudas];
    const btnPista = $("#btn-pista");
    btnPista.textContent = siguiente && siguiente.revelar ? "Revelar" : "Pista";
    ["#btn-comprobar", "#btn-pista", "#btn-borrar"].forEach((s) => ($(s).disabled = terminado()));
    $("#teclado").hidden = terminado();

    const final = $("#final");
    final.hidden = !terminado();
    if (terminado()) {
      const pistasSinRevelar = Math.min(partida.ayudas, lista.length - 1);
      $("#final-texto").textContent = partida.estado === "resuelto"
        ? (pistasSinRevelar === 0 ? "¡Resuelto sin ayudas! 🎉" : `¡Resuelto con ${pistasSinRevelar} ${pistasSinRevelar === 1 ? "ayuda" : "ayudas"}!`)
        : `La respuesta era ${p.respuesta}.`;
      $("#final-explicacion").textContent = p.explicacion;
    }
  }

  function escribir(letra) {
    if (terminado()) return;
    if (cursor === 0 && primeraEsFija()) cursor = 1;
    partida.letras[cursor] = letra;
    if (cursor < letrasDe(p).length - 1) cursor++;
    guardar(); pintar();
  }

  function primeraEsFija() {
    return ayudasDe(p).slice(0, partida.ayudas).some((a) => a.primera);
  }

  function retroceder() {
    if (terminado()) return;
    const minimo = primeraEsFija() ? 1 : 0;
    if (!partida.letras[cursor] && cursor > minimo) cursor--;
    if (cursor >= minimo) partida.letras[cursor] = "";
    guardar(); pintar();
  }

  function mover(d) {
    cursor = Math.min(letrasDe(p).length - 1, Math.max(0, cursor + d));
    pintar();
  }

  function borrarTodo() {
    if (terminado()) return;
    const fija = primeraEsFija();
    partida.letras = partida.letras.map((l, i) => (fija && i === 0 ? l : ""));
    cursor = fija ? 1 : 0;
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
      if (cursor === 0) cursor = 1;
    }
    if (a.revelar) {
      partida.letras = letrasDe(p).split("");
      partida.estado = "revelado";
    }
    $("#mensaje").textContent = "";
    guardar(); pintar();
  }

  async function compartir() {
    const lista = ayudasDe(p);
    const ayudas = Math.min(partida.ayudas, lista.length - 1);
    const linea = partida.estado === "resuelto"
      ? `✅ ${ayudas === 0 ? "sin ayudas" : "💡".repeat(ayudas)}`
      : "🏳️ revelado";
    const texto = `Críptico 51 · Nº ${n}\n${linea}\n${location.origin + location.pathname}`;
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
    resueltas.forEach((x) => cubos[Math.min(x.ayudas, 4)]++);
    const max = Math.max(1, ...cubos);
    const etiquetas = ["Sin ayudas", "1 ayuda", "2 ayudas", "3 ayudas", "4 ayudas"];
    $("#est-barras").innerHTML = cubos.map((c, i) =>
      `<div class="barra"><span>${etiquetas[i]}</span><span class="relleno" style="width:${Math.max(8, (c / max) * 100)}%">${c}</span></div>`
    ).join("");
  }

  // ---------- Archivo ----------
  function pintarArchivo() {
    const hoy = numeroDeHoy();
    const items = [];
    for (let k = hoy; k >= 1; k--) {
      const x = datos.partidas[k];
      const estado = !x ? "Sin jugar"
        : x.estado === "resuelto" ? "✅ Resuelto"
        : x.estado === "revelado" ? "🏳️ Revelado" : "En curso";
      items.push(`<li><a href="#n/${k}"><span><strong>Nº ${k}</strong> <span class="fecha">· ${formatoFecha(fechaDe(k))}${k === hoy ? " (hoy)" : ""}</span></span><span class="estado">${estado}</span></a></li>`);
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
      cargar(k >= 1 && k <= hoy ? k : hoy);
    } else if (h === "hoy" || !["archivo", "aprender", "estadisticas"].includes(h)) {
      vista = "juego";
      cargar(hoy);
    }
    document.querySelectorAll(".vista").forEach((s) => (s.hidden = s.id !== `vista-${vista}`));
    const activa = vista === "juego" ? (m && +m[1] !== hoy ? "archivo" : "hoy") : vista;
    document.querySelectorAll(".menu a").forEach((a) => a.classList.toggle("activo", a.dataset.vista === activa));
    if (vista === "archivo") pintarArchivo();
    if (vista === "estadisticas") pintarEstadisticas();
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
    if (s <= 0) setTimeout(enrutar, 1500);
  }

  // ---------- Arranque ----------
  $("#btn-comprobar").onclick = comprobar;
  $("#btn-pista").onclick = pedirAyuda;
  $("#btn-borrar").onclick = borrarTodo;
  $("#btn-compartir").onclick = compartir;
  construirTeclado();
  window.addEventListener("hashchange", enrutar);
  enrutar();
  tic();
  setInterval(tic, 1000);
})();
