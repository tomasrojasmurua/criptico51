// Banco de pistas. Una por día a partir de FECHA_INICIO (UTC).
// - respuesta: en mayúsculas, sin tildes (Ñ permitida). Varias palabras separadas por espacio.
// - definicion: fragmentos exactos de la pista que funcionan como definición
// - tipo: mecanismo críptico (ver sección Aprender)
// - indicador: fragmento exacto que señala el mecanismo (opcional)
// - explicacion: cómo se resuelve
const FECHA_INICIO = "2026-10-11";

const PISTAS = [
  {
    pista: "Ave: medio papá delante de la colina",
    respuesta: "PALOMA",
    definicion: ["Ave"],
    tipo: "Charada",
    indicador: "medio",
    explicacion: "Medio papá es PA; la colina es una LOMA. PA + LOMA = PALOMA, un ave."
  },
  {
    pista: "Rumiante que suena como el portaequipajes del coche",
    respuesta: "VACA",
    definicion: ["Rumiante"],
    tipo: "Onomatopeya",
    indicador: "suena como",
    explicacion: "El portaequipajes del techo del coche es la BACA, que suena igual que VACA, un rumiante."
  },
  {
    pista: "Mezcla letras con él para dar con un astro",
    respuesta: "ESTRELLA",
    definicion: ["un astro"],
    tipo: "Anagrama",
    indicador: "Mezcla",
    explicacion: "Mezclando las letras de LETRAS + ÉL sale ESTRELLA, un astro."
  },
  {
    pista: "Hortaliza: caracol sin rostro",
    respuesta: "COL",
    definicion: ["Hortaliza"],
    tipo: "Sustracción",
    indicador: "sin rostro",
    explicacion: "El rostro es la CARA. CARACOL sin CARA deja COL, una hortaliza."
  },
  {
    pista: "Telefonea al camélido andino",
    respuesta: "LLAMA",
    definicion: ["Telefonea", "camélido andino"],
    tipo: "Doble definición",
    indicador: "",
    explicacion: "LLAMA es «telefonea» y también el camélido de los Andes."
  },
  {
    pista: "Sentido que devuelve el rencor",
    respuesta: "OIDO",
    definicion: ["Sentido"],
    tipo: "Reverso",
    indicador: "devuelve",
    explicacion: "El rencor es ODIO; devuelto, al revés, da OÍDO, un sentido."
  },
  {
    pista: "Viento suave: comienzo de broma y carcajada",
    respuesta: "BRISA",
    definicion: ["Viento suave"],
    tipo: "Selector + charada",
    indicador: "comienzo de",
    explicacion: "El comienzo de «broma» es B, y una carcajada es RISA. B + RISA = BRISA, un viento suave."
  },
  {
    pista: "Agotado, el casado acoge al norte",
    respuesta: "CANSADO",
    definicion: ["Agotado"],
    tipo: "Contenedor",
    indicador: "acoge",
    explicacion: "CASADO acoge la N (norte): CA·N·SADO = CANSADO, agotado."
  },
  {
    pista: "Ser mítico del mar con resina fundida",
    respuesta: "SIRENA",
    definicion: ["Ser mítico del mar"],
    tipo: "Anagrama",
    indicador: "fundida",
    explicacion: "Las letras de RESINA, «fundidas», forman SIRENA, un ser mítico del mar."
  },
  {
    pista: "Canoso que se traga una nota en el sendero",
    respuesta: "CAMINO",
    definicion: ["sendero"],
    tipo: "Contenedor",
    indicador: "se traga",
    explicacion: "Canoso es CANO; se traga la nota MI: CA·MI·NO = CAMINO, un sendero."
  },
  {
    pista: "Trofeo en lo alto del árbol",
    respuesta: "COPA",
    definicion: ["Trofeo", "lo alto del árbol"],
    tipo: "Doble definición",
    indicador: "",
    explicacion: "Una COPA es un trofeo y también la parte alta de un árbol."
  },
  {
    pista: "Hierro y oxígeno: nada bonito",
    respuesta: "FEO",
    definicion: ["nada bonito"],
    tipo: "Misceláneas",
    indicador: "",
    explicacion: "Los símbolos químicos del hierro (Fe) y del oxígeno (O) forman FEO, nada bonito."
  },
  {
    pista: "Capta señales oculta en el elefante nadador",
    respuesta: "ANTENA",
    definicion: ["Capta señales"],
    tipo: "Palabra escondida",
    indicador: "oculta en",
    explicacion: "Dentro de «elef-ANTE NA-dador» se esconde ANTENA, que capta señales."
  },
  {
    pista: "Estrella con años de aislamiento",
    respuesta: "SOLEDAD",
    definicion: ["aislamiento"],
    tipo: "Charada",
    indicador: "",
    explicacion: "La estrella es el SOL y los años son la EDAD. SOL + EDAD = SOLEDAD, aislamiento."
  },
  {
    pista: "Hoja de metal: animal que da marcha atrás",
    respuesta: "LAMINA",
    definicion: ["Hoja de metal"],
    tipo: "Reverso",
    indicador: "da marcha atrás",
    explicacion: "ANIMAL leído al revés da LÁMINA, una hoja de metal."
  },
  {
    pista: "Licor de un crustáceo que perdió la cama",
    respuesta: "RON",
    definicion: ["Licor"],
    tipo: "Sustracción",
    indicador: "perdió",
    explicacion: "El crustáceo es un CAMARÓN; si pierde la CAMA queda RON, un licor."
  },
  {
    pista: "Líquido vegetal que se oye como la erudita",
    respuesta: "SAVIA",
    definicion: ["Líquido vegetal"],
    tipo: "Onomatopeya",
    indicador: "se oye como",
    explicacion: "La erudita es SABIA, que se oye igual que SAVIA, el líquido de las plantas."
  },
  {
    pista: "No obstante, carece de incautación",
    respuesta: "SIN EMBARGO",
    definicion: ["No obstante"],
    tipo: "Charada",
    indicador: "",
    explicacion: "«Carece de» es SIN y una incautación es un EMBARGO: SIN EMBARGO, es decir, no obstante."
  },
  {
    pista: "Estrella del espectáculo: jornada con cinco dentro",
    respuesta: "DIVA",
    definicion: ["Estrella del espectáculo"],
    tipo: "Contenedor",
    indicador: "dentro",
    explicacion: "La jornada es un DÍA; con el cinco romano (V) dentro: DI·V·A = DIVA."
  },
  {
    pista: "Satélite visto en cabezas de las urbes nocturnas antiguas",
    respuesta: "LUNA",
    definicion: ["Satélite"],
    tipo: "Selector",
    indicador: "cabezas de",
    explicacion: "Las cabezas (iniciales) de Las Urbes Nocturnas Antiguas forman LUNA, un satélite."
  },
  {
    pista: "Juguete donde llevas el reloj",
    respuesta: "MUÑECA",
    definicion: ["Juguete", "donde llevas el reloj"],
    tipo: "Doble definición",
    indicador: "",
    explicacion: "Una MUÑECA es un juguete y también la parte del brazo donde llevas el reloj."
  },
  {
    pista: "Mutismo de cines con lío alborotado",
    respuesta: "SILENCIO",
    definicion: ["Mutismo"],
    tipo: "Anagrama",
    indicador: "alborotado",
    explicacion: "Las letras de CINES + LÍO, alborotadas, forman SILENCIO, mutismo."
  },
  {
    pista: "Agarra la infusión: fruto rojo",
    respuesta: "TOMATE",
    definicion: ["fruto rojo"],
    tipo: "Charada",
    indicador: "",
    explicacion: "TOMA (agarra) + TÉ (la infusión) = TOMATE, un fruto rojo."
  },
  {
    pista: "Bribón: estrecho con nota",
    respuesta: "CANALLA",
    definicion: ["Bribón"],
    tipo: "Charada",
    indicador: "",
    explicacion: "Un estrecho de mar es un CANAL; la nota es LA. CANAL + LA = CANALLA, un bribón."
  },
  {
    pista: "Mueble: escopeta y corriente",
    respuesta: "ARMARIO",
    definicion: ["Mueble"],
    tipo: "Charada",
    indicador: "",
    explicacion: "Una escopeta es un ARMA y una corriente de agua es un RÍO. ARMA + RÍO = ARMARIO."
  }
];
