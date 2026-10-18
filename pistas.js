// Banco de pistas. Una por día a partir de FECHA_INICIO (UTC).
// - respuesta: en mayúsculas, sin tildes (Ñ permitida). Varias palabras separadas por espacio.
// - definicion: fragmentos exactos de la pista que funcionan como definición
// - tipo: mecanismo críptico (ver sección Aprender)
// - indicador: fragmento exacto que señala el mecanismo (opcional)
// - explicacion: cómo se resuelve
const FECHA_INICIO = "2026-10-11";

const PISTAS = [
  {
    "pista": "Medio papá en la colina se vuelve ave",
    "respuesta": "PALOMA",
    "definicion": [
      "ave"
    ],
    "tipo": "Charada",
    "indicador": "Medio",
    "explicacion": "Medio papá es PA; la colina es una LOMA. PA + LOMA = PALOMA, un ave."
  },
  {
    "pista": "Lo que viaja sobre el coche suena a rumiante",
    "respuesta": "VACA",
    "definicion": [
      "rumiante"
    ],
    "tipo": "Onomatopeya",
    "indicador": "suena a",
    "explicacion": "El portaequipajes del techo del coche es la BACA, que suena igual que VACA, un rumiante."
  },
  {
    "pista": "Él mezcla letras y nace un astro",
    "respuesta": "ESTRELLA",
    "definicion": [
      "un astro"
    ],
    "tipo": "Anagrama",
    "indicador": "mezcla",
    "explicacion": "Mezclando las letras de LETRAS + ÉL sale ESTRELLA, un astro."
  },
  {
    "pista": "Al caracol le roban el rostro y queda una hortaliza",
    "respuesta": "COL",
    "definicion": [
      "una hortaliza"
    ],
    "tipo": "Sustracción",
    "indicador": "le roban el rostro",
    "explicacion": "El rostro es la CARA. CARACOL sin CARA deja COL, una hortaliza."
  },
  {
    "pista": "Telefonea al camélido andino",
    "respuesta": "LLAMA",
    "definicion": [
      "Telefonea",
      "camélido andino"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "LLAMA es «telefonea» y también el camélido de los Andes."
  },
  {
    "pista": "Rencor que regresa convertido en sentido",
    "respuesta": "OIDO",
    "definicion": [
      "sentido"
    ],
    "tipo": "Reverso",
    "indicador": "regresa",
    "explicacion": "El rencor es ODIO; devuelto, al revés, da OÍDO, un sentido."
  },
  {
    "pista": "Un principio de broma y una carcajada traen viento suave",
    "respuesta": "BRISA",
    "definicion": [
      "viento suave"
    ],
    "tipo": "Selector + charada",
    "indicador": "principio de",
    "explicacion": "El comienzo de «broma» es B, y una carcajada es RISA. B + RISA = BRISA, un viento suave."
  },
  {
    "pista": "El casado acoge al norte y queda agotado",
    "respuesta": "CANSADO",
    "definicion": [
      "agotado"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "explicacion": "CASADO acoge la N (norte): CA·N·SADO = CANSADO, agotado."
  },
  {
    "pista": "La resina se funde en un ser mítico del mar",
    "respuesta": "SIRENA",
    "definicion": [
      "un ser mítico del mar"
    ],
    "tipo": "Anagrama",
    "indicador": "se funde",
    "explicacion": "Las letras de RESINA, «fundidas», forman SIRENA, un ser mítico del mar."
  },
  {
    "pista": "Un canoso se traga una nota en el sendero",
    "respuesta": "CAMINO",
    "definicion": [
      "sendero"
    ],
    "tipo": "Contenedor",
    "indicador": "se traga",
    "explicacion": "Canoso es CANO; se traga la nota MI: CA·MI·NO = CAMINO, un sendero."
  },
  {
    "pista": "Trofeo en lo alto del árbol",
    "respuesta": "COPA",
    "definicion": [
      "Trofeo",
      "lo alto del árbol"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Una COPA es un trofeo y también la parte alta de un árbol."
  },
  {
    "pista": "Hierro junto a oxígeno resulta nada bonito",
    "respuesta": "FEO",
    "definicion": [
      "nada bonito"
    ],
    "tipo": "Misceláneas",
    "indicador": "",
    "explicacion": "Los símbolos químicos del hierro (Fe) y del oxígeno (O) forman FEO, nada bonito."
  },
  {
    "pista": "El elefante nadador esconde lo que capta señales",
    "respuesta": "ANTENA",
    "definicion": [
      "lo que capta señales"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconde",
    "explicacion": "Dentro de «elef-ANTE NA-dador» se esconde ANTENA, que capta señales."
  },
  {
    "pista": "Estrella con años de aislamiento",
    "respuesta": "SOLEDAD",
    "definicion": [
      "aislamiento"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La estrella es el SOL y los años son la EDAD. SOL + EDAD = SOLEDAD, aislamiento."
  },
  {
    "pista": "El animal da marcha atrás y se vuelve hoja de metal",
    "respuesta": "LAMINA",
    "definicion": [
      "hoja de metal"
    ],
    "tipo": "Reverso",
    "indicador": "da marcha atrás",
    "explicacion": "ANIMAL leído al revés da LÁMINA, una hoja de metal."
  },
  {
    "pista": "Licor de un crustáceo que perdió la cama",
    "respuesta": "RON",
    "definicion": [
      "Licor"
    ],
    "tipo": "Sustracción",
    "indicador": "perdió",
    "explicacion": "El crustáceo es un CAMARÓN; si pierde la CAMA queda RON, un licor."
  },
  {
    "pista": "Se oye como la erudita la sangre de los árboles",
    "respuesta": "SAVIA",
    "definicion": [
      "la sangre de los árboles"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Se oye como",
    "explicacion": "La erudita es SABIA, que se oye igual que SAVIA, el líquido de las plantas."
  },
  {
    "pista": "Aun así quedó libre de incautación",
    "respuesta": "SIN EMBARGO",
    "definicion": [
      "Aun así"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "«Libre de» es SIN y una incautación es un EMBARGO: SIN EMBARGO, es decir, aun así."
  },
  {
    "pista": "Una jornada con cinco dentro brilla como estrella del espectáculo",
    "respuesta": "DIVA",
    "definicion": [
      "estrella del espectáculo"
    ],
    "tipo": "Contenedor",
    "indicador": "dentro",
    "explicacion": "La jornada es un DÍA; con el cinco romano (V) dentro: DI·V·A = DIVA."
  },
  {
    "pista": "Satélite que asoma en las cabezas de las urbes nocturnas antiguas",
    "respuesta": "LUNA",
    "definicion": [
      "Satélite"
    ],
    "tipo": "Selector",
    "indicador": "cabezas de",
    "explicacion": "Las cabezas (iniciales) de «Las Urbes Nocturnas Antiguas» forman LUNA, un satélite."
  },
  {
    "pista": "Juguete donde llevas el reloj",
    "respuesta": "MUÑECA",
    "definicion": [
      "Juguete",
      "donde llevas el reloj"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Una MUÑECA es un juguete y también la parte del brazo donde llevas el reloj."
  },
  {
    "pista": "Cines con lío alborotado piden mutismo",
    "respuesta": "SILENCIO",
    "definicion": [
      "mutismo"
    ],
    "tipo": "Anagrama",
    "indicador": "alborotado",
    "explicacion": "Las letras de CINES + LÍO, alborotadas, forman SILENCIO, mutismo."
  },
  {
    "pista": "Agarra la infusión y madura un fruto rojo",
    "respuesta": "TOMATE",
    "definicion": [
      "un fruto rojo"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "TOMA (agarra) + TÉ (la infusión) = TOMATE, un fruto rojo."
  },
  {
    "pista": "Un estrecho y una nota forman al bribón",
    "respuesta": "CANALLA",
    "definicion": [
      "bribón"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Un estrecho de mar es un CANAL; la nota es LA. CANAL + LA = CANALLA, un bribón."
  },
  {
    "pista": "Escopeta junto a la corriente descansa en el mueble",
    "respuesta": "ARMARIO",
    "definicion": [
      "mueble"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Una escopeta es un ARMA y una corriente de agua es un RÍO. ARMA + RÍO = ARMARIO."
  }
];
