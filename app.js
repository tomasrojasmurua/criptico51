(() => {
  "use strict";

  const DIA_MS = 86400000;
  const CLAVE = "criptico51-v2";
  const inicio = Date.parse(FECHA_INICIO + "T00:00:00Z");

  // ---------- Utilidades ----------
  const $ = (sel) => document.querySelector(sel);
  const numeroDeHoy = () => Math.floor((Date.now() - inicio) / DIA_MS) + 1;

  // Cada partida tiene una clave: el número del día ("9") o «e» y el número de la extra ("e12").
  // Los primeros DIAS_ANTIGUOS días usaron las primeras pistas de PISTAS; desde ahí, las pistas
  // del día salen del banco cifrado DIARIAS (diarias.js), que solo se descifra al llegar su día.
  // Las Extras son el resto de PISTAS y se pueden jugar en cualquier momento.
  const DIAS_ANTIGUOS = 8;
  const totalExtras = () => PISTAS.length - DIAS_ANTIGUOS;
  const esExtra = (id) => String(id)[0] === "e";
  const numeroDe = (id) => parseInt(String(id).replace("e", ""), 10);
  const descifradas = {};
  function diaria(n) {
    const i = n - DIAS_ANTIGUOS - 1;
    if (typeof DIARIAS === "undefined" || i >= DIARIAS.length) return PISTAS[(n - 1) % PISTAS.length];
    if (!descifradas[i]) {
      const bytes = Uint8Array.from(atob(DIARIAS[i]), (c) => c.charCodeAt(0));
      const llave = "criptico51";
      bytes.forEach((b, k) => { bytes[k] = b ^ llave.charCodeAt((k + i) % llave.length); });
      descifradas[i] = JSON.parse(new TextDecoder().decode(bytes));
    }
    return descifradas[i];
  }
  const pistaDe = (id) => {
    const k = numeroDe(id);
    if (esExtra(id)) return PISTAS[DIAS_ANTIGUOS + k - 1];
    return k <= DIAS_ANTIGUOS ? PISTAS[k - 1] : diaria(Math.min(k, numeroDeHoy()));
  };
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

  // El indicador puede ser un texto o una lista de textos (si la pista tiene varios).
  const indicadoresDe = (p) => (Array.isArray(p.indicador) ? p.indicador : p.indicador ? [p.indicador] : []);
  // «a», «b» y «c»
  const enumerar = (xs) => {
    const q = xs.map((x) => `«${escapar(x)}»`);
    return q.length > 1 ? `${q.slice(0, -1).join(", ")} y ${q[q.length - 1]}` : q[0] || "";
  };

  // ---------- Guardado ----------
  let datos;
  try { datos = JSON.parse(localStorage.getItem(CLAVE)) || {}; } catch { datos = {}; }
  datos.partidas = datos.partidas || {};
  // Antes, las pistas posteriores al día 8 se jugaban como extras con el número de su posición.
  if (!datos.extrasSeparadas) {
    Object.keys(datos.partidas).forEach((k) => {
      if (/^\d+$/.test(k) && +k > DIAS_ANTIGUOS) {
        datos.partidas["e" + (k - DIAS_ANTIGUOS)] = datos.partidas[k];
        delete datos.partidas[k];
      }
    });
    datos.extrasSeparadas = true;
  }
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
      { titulo: "Definición", texto: "resaltada en azul en la pista", marca: "def" }
    ];
    const inds = indicadoresDe(p);
    if (inds.length) lista.push({ titulo: inds.length > 1 ? "Indicadores" : "Indicador", texto: `${inds.map((x) => `«${x}»`).join(", ")}, ${inds.length > 1 ? "resaltados" : "resaltado"} en naranja`, marca: "ind" });
    if (p.relleno && p.relleno.length) lista.push({ titulo: "Relleno", texto: "lo que hay que manipular, resaltado en verde", marca: "rel" });
    lista.push({ titulo: "Primera letra", texto: letrasDe(p)[0], primera: true });
    lista.push({ titulo: "Solución", texto: p.respuesta, revelar: true });
    return lista;
  }

  // Envuelve los fragmentos de definición, indicador y relleno en <mark>.
  // Cada fragmento va en la primera aparición como palabra completa que no esté ya ocupada
  // (así «a» no cae dentro de «océano»). Se recorren siempre los tres, para que las
  // posiciones no cambien según qué ayudas se hayan pedido.
  function pistaHTML(p, marcas) {
    const texto = p.pista;
    const tipo = Array(texto.length).fill(null);
    const letra = (c) => c !== undefined && /\p{L}/u.test(c);
    const libre = (i, frag) => {
      for (let k = i; k < i + frag.length; k++) if (tipo[k] !== null) return false;
      return !letra(texto[i - 1]) && !letra(texto[i + frag.length]);
    };
    const marcar = (frag, clase) => {
      if (!frag) return;
      let i = texto.indexOf(frag);
      while (i >= 0 && !libre(i, frag)) i = texto.indexOf(frag, i + 1);
      if (i < 0) i = texto.indexOf(frag);
      if (i < 0) return;
      for (let k = i; k < i + frag.length; k++) tipo[k] = clase;
    };
    p.definicion.forEach((d) => marcar(d, "def"));
    indicadoresDe(p).forEach((x) => marcar(x, "ind"));
    (p.relleno || []).forEach((r) => marcar(r, "rel"));
    for (let k = 0; k < texto.length; k++) if (tipo[k] && !marcas.has(tipo[k])) tipo[k] = null;

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

  // ---------- Explicación de la solución ----------
  const etiqueta = (clase, texto) => `<span class="etiqueta ${clase}">${texto}</span>`;
  const LEYENDA = etiqueta("def", "Definición") + etiqueta("rel", "Relleno") + etiqueta("ind", "Indicador");

  // Una tarjeta por pieza de la pista (indicador, relleno y definición), el juego de palabras
  // y la respuesta. Las pistas pueden añadir una nota propia a cada pieza en p.notas.
  function desgloseHTML(p) {
    const notas = p.notas || {};
    const nota = (k) => (notas[k] ? " " + escapar(notas[k]) : "");
    const inds = indicadoresDe(p), rels = p.relleno || [], defs = p.definicion;
    const partes = [];
    if (inds.length) {
      partes.push([etiqueta("ind", "Indicador"), inds.length > 1
        ? `${enumerar(inds)} son nuestros indicadores. Nos dicen qué hacer con el relleno.`
        : `${enumerar(inds)} es nuestro indicador. Nos dice qué hacer con el relleno.`, "indicador"]);
    }
    if (rels.length) {
      const como = inds.length ? "como nos lo muestre el indicador" : "y uniéndolas";
      partes.push([etiqueta("rel", "Relleno"), rels.length > 1
        ? `${enumerar(rels)} son nuestros rellenos. Encontraremos la respuesta modificando estas palabras (o unos sustitutos) ${como}.`
        : `${enumerar(rels)} es nuestro relleno. Encontraremos la respuesta modificándolo (o un sustituto) ${como}.`, "relleno"]);
    }
    partes.push([etiqueta("def", "Definición"), defs.length > 1
      ? `${enumerar(defs)} son nuestras definiciones: la respuesta tiene que significar las dos cosas.`
      : `Estas palabras forman nuestra definición, y la respuesta será algo que signifique ${enumerar(defs)}.`, "definicion"]);
    return `<div class="piezas">${partes.map(([e, t, k]) => `<div class="pieza">${e}<p>${t}${nota(k)}</p></div>`).join("")}</div>
      <div class="juego-palabras"><h3>Juego de palabras</h3><p>${escapar(p.explicacion)}</p></div>
      <p class="respuesta">Respuesta: <span>${escapar(p.respuesta)}</span></p>`;
  }

  // Lo que comparte el modo multijugador (multi.js).
  window.Criptico = { letrasDe, enumeracion, normalizar, escapar, pistaHTML, desgloseHTML, LEYENDA };

  // ---------- Juego ----------
  let n, p, partida, cursor = 0;

  function cargar(id) {
    n = String(id);
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
    const k = numeroDe(n);
    $("#numero").textContent = esExtra(n) ? `Extra ${k}` : k === hoy ? `Nº ${k} · Hoy` : `Nº ${k} · ${formatoFecha(fechaDe(k))}`;
    const racha = calcularRachas().actual;
    $("#racha-mini").textContent = `Racha: ${racha}`;

    const lista = ayudasDe(p);
    const usadas = lista.slice(0, partida.ayudas);
    const marcas = new Set(usadas.filter((a) => a.marca).map((a) => a.marca));
    if (terminado()) ["def", "ind", "rel"].forEach((m) => marcas.add(m));
    $("#pista").innerHTML = pistaHTML(p, marcas);
    $("#leyenda").innerHTML = terminado() ? LEYENDA : "";

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
      $("#desglose").innerHTML = desgloseHTML(p);
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
      partida.enFecha = n === String(numeroDeHoy());
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
    const lineaRacha = n === String(numeroDeHoy()) && racha > 0 ? `\n🔥 Racha de ${racha} ${racha === 1 ? "día" : "días"}` : "";
    const k = numeroDe(n);
    const titulo = esExtra(n) ? `Extra ${k}` : `Nº ${k}`;
    const enlace = esExtra(n) ? `#extra/${k}` : `#n/${k}`;
    const texto = `Críptico 51 · ${titulo}\n${linea}${lineaRacha}\n${location.origin + location.pathname}${enlace}`;
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
      if (x.estado === "resuelto") cubos[Math.min(ayudasTotales(x, k), 4)]++;
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
    const estadoDe = (id) => {
      const x = datos.partidas[id];
      return !x ? "Sin jugar" : x.estado === "resuelto" ? "✅ Resuelto" : x.estado === "revelado" ? "🏳️ Revelado" : "En curso";
    };
    const fila = (enlace, titulo, detalle, id) =>
      `<li><a href="${enlace}"><span><strong>${titulo}</strong> <span class="fecha">· ${detalle}</span></span><span class="estado">${estadoDe(id)}</span></a></li>`;
    const dias = [];
    for (let k = hoy; k >= 1; k--) {
      dias.push(fila(`#n/${k}`, `Nº ${k}`, k === hoy ? `${formatoFecha(fechaDe(k))} (hoy)` : formatoFecha(fechaDe(k)), k));
    }
    const extras = [];
    for (let k = 1; k <= totalExtras(); k++) extras.push(fila(`#extra/${k}`, `Extra ${k}`, `dificultad ${pistaDe("e" + k).dificultad || 3}`, "e" + k));
    $("#lista-archivo").innerHTML = dias.join("");
    $("#lista-extras").innerHTML = extras.join("");
  }

  // ---------- Navegación ----------
  function enrutar() {
    const h = location.hash.slice(1) || "hoy";
    const hoy = numeroDeHoy();
    let vista = h;
    const m = h.match(/^(n|extra)\/(\d+)$/);
    if (m) {
      const k = parseInt(m[2], 10);
      vista = "juego";
      if (m[1] === "extra" && k >= 1 && k <= totalExtras()) cargar("e" + k);
      else cargar(m[1] === "n" && k >= 1 && k <= hoy ? k : hoy);
    } else if (h === "multijugador" || h.startsWith("sala/")) {
      vista = "multijugador";
    } else if (h === "hoy" || !["archivo", "aprender", "estadisticas"].includes(h)) {
      vista = "juego";
      cargar(hoy);
    }
    document.querySelectorAll(".vista").forEach((s) => (s.hidden = s.id !== `vista-${vista}`));
    const activa = vista === "juego" ? (n !== String(hoy) ? "archivo" : "hoy") : vista;
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
