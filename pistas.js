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
  },
  {
    "pista": "El mar sirve infusiones un día de la semana",
    "respuesta": "MARTES",
    "definicion": [
      "un día de la semana"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "MAR + TÉS (infusiones) = MARTES, un día de la semana."
  },
  {
    "pista": "Por cada ola se esconde la ballena asesina",
    "respuesta": "ORCA",
    "definicion": [
      "la ballena asesina"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se esconde",
    "explicacion": "Dentro de «p-OR CA-da» se esconde ORCA, la ballena asesina."
  },
  {
    "pista": "Viene en remolino lo que cae blanco del cielo",
    "respuesta": "NIEVE",
    "definicion": [
      "lo que cae blanco del cielo"
    ],
    "tipo": "Anagrama",
    "indicador": "en remolino",
    "explicacion": "Las letras de VIENE, en remolino, forman NIEVE."
  },
  {
    "pista": "La primera de amor llega a Roma convertida en perfume",
    "respuesta": "AROMA",
    "definicion": [
      "perfume"
    ],
    "tipo": "Selector + charada",
    "indicador": "La primera de",
    "explicacion": "La primera letra de «amor» es A; con ROMA forma AROMA, un perfume."
  },
  {
    "pista": "La pera guarda cincuenta en la joya del mar",
    "respuesta": "PERLA",
    "definicion": [
      "la joya del mar"
    ],
    "tipo": "Contenedor",
    "indicador": "guarda",
    "explicacion": "PERA guarda la L (cincuenta en números romanos): PER·L·A = PERLA, la joya del mar."
  },
  {
    "pista": "Propio del coro y nacido en el arrecife",
    "respuesta": "CORAL",
    "definicion": [
      "Propio del coro",
      "nacido en el arrecife"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "CORAL es lo propio del coro y también lo que forma los arrecifes."
  },
  {
    "pista": "Cabeza de pez con lata brilla como metal precioso",
    "respuesta": "PLATA",
    "definicion": [
      "metal precioso"
    ],
    "tipo": "Selector + charada",
    "indicador": "Cabeza de",
    "explicacion": "La cabeza de «pez» es P; con LATA forma PLATA, un metal precioso."
  },
  {
    "pista": "Ilumina la noche y empuja el barco",
    "respuesta": "VELA",
    "definicion": [
      "Ilumina la noche",
      "empuja el barco"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Una VELA ilumina la noche y otra VELA empuja el barco."
  },
  {
    "pista": "Destello de tormenta en la rueda de la bicicleta",
    "respuesta": "RAYO",
    "definicion": [
      "Destello de tormenta",
      "la rueda de la bicicleta"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un RAYO es el destello de la tormenta y también cada varilla de una rueda."
  },
  {
    "pista": "Un galo guarda cincuenta y canta al amanecer",
    "respuesta": "GALLO",
    "definicion": [
      "canta al amanecer"
    ],
    "tipo": "Contenedor",
    "indicador": "guarda",
    "explicacion": "GALO guarda la L (cincuenta romano): GAL·L·O = GALLO, que canta al amanecer."
  },
  {
    "pista": "Animal del desierto que trafica en la esquina",
    "respuesta": "CAMELLO",
    "definicion": [
      "Animal del desierto",
      "trafica en la esquina"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un CAMELLO es un animal del desierto y, en lenguaje coloquial, quien vende droga en la calle."
  },
  {
    "pista": "Un grito descompuesto es cereal dorado",
    "respuesta": "TRIGO",
    "definicion": [
      "cereal dorado"
    ],
    "tipo": "Anagrama",
    "indicador": "descompuesto",
    "explicacion": "Las letras de GRITO, descompuestas, forman TRIGO, un cereal dorado."
  },
  {
    "pista": "Una foto ñoña esconde la estación de las hojas caídas",
    "respuesta": "OTOÑO",
    "definicion": [
      "la estación de las hojas caídas"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconde",
    "explicacion": "Dentro de «f-OTO ÑO-ña» se esconde OTOÑO."
  },
  {
    "pista": "Sube y baja y además aturde",
    "respuesta": "MAREA",
    "definicion": [
      "Sube y baja",
      "aturde"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La MAREA sube y baja, y algo que «marea» aturde."
  },
  {
    "pista": "Lodo junto al norte madura en un fruto ácido",
    "respuesta": "LIMON",
    "definicion": [
      "un fruto ácido"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "LIMO (lodo) + N (norte) = LIMÓN, un fruto ácido."
  },
  {
    "pista": "Teja y nota forman la cubierta de la casa",
    "respuesta": "TEJADO",
    "definicion": [
      "la cubierta de la casa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "TEJA + DO (nota musical) = TEJADO, la cubierta de la casa."
  },
  {
    "pista": "Un paso en falso y salta el anfibio",
    "respuesta": "SAPO",
    "definicion": [
      "el anfibio"
    ],
    "tipo": "Anagrama",
    "indicador": "en falso",
    "explicacion": "Las letras de PASO, puestas «en falso», forman SAPO, un anfibio."
  },
  {
    "pista": "Algo se agita en el agua tranquila",
    "respuesta": "LAGO",
    "definicion": [
      "el agua tranquila"
    ],
    "tipo": "Anagrama",
    "indicador": "se agita",
    "explicacion": "Las letras de ALGO, agitadas, forman LAGO, agua tranquila."
  },
  {
    "pista": "Mi nota y él son lo dulce de la colmena",
    "respuesta": "MIEL",
    "definicion": [
      "lo dulce de la colmena"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "MI (nota musical) + ÉL = MIEL, lo dulce de la colmena."
  },
  {
    "pista": "Cruza el río y alarga el fin de semana",
    "respuesta": "PUENTE",
    "definicion": [
      "Cruza el río",
      "alarga el fin de semana"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un PUENTE cruza el río, y un «puente» festivo alarga el fin de semana."
  },
  {
    "pista": "En la calma se esconde el espíritu",
    "respuesta": "ALMA",
    "definicion": [
      "el espíritu"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se esconde",
    "explicacion": "Dentro de «c-ALMA» se esconde ALMA, el espíritu."
  },
  {
    "pista": "Una orilla con negativa anuncia la estación del calor",
    "respuesta": "VERANO",
    "definicion": [
      "la estación del calor"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "VERA (orilla, como en «a la vera del río») + NO (negativa) = VERANO."
  },
  {
    "pista": "Del final asoma un cetáceo juguetón",
    "respuesta": "DELFIN",
    "definicion": [
      "un cetáceo juguetón"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "DEL + FIN (final) = DELFÍN, un cetáceo juguetón."
  },
  {
    "pista": "Fruta prohibida que ocupa una cuadra",
    "respuesta": "MANZANA",
    "definicion": [
      "Fruta prohibida",
      "ocupa una cuadra"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La MANZANA es la fruta prohibida y también el bloque de casas de una cuadra."
  },
  {
    "pista": "El telón cae revuelto y pausado",
    "respuesta": "LENTO",
    "definicion": [
      "pausado"
    ],
    "tipo": "Anagrama",
    "indicador": "revuelto",
    "explicacion": "Las letras de TELÓN, revueltas, forman LENTO, pausado."
  },
  {
    "pista": "Sal y usted abreviado brindan por el bienestar",
    "respuesta": "SALUD",
    "definicion": [
      "el bienestar"
    ],
    "tipo": "Misceláneas",
    "indicador": "abreviado",
    "explicacion": "SAL + UD (usted abreviado) = SALUD, el bienestar."
  },
  {
    "pista": "Arma de arquero junto a parte del ojo pinta el cielo tras la lluvia",
    "respuesta": "ARCO IRIS",
    "definicion": [
      "pinta el cielo tras la lluvia"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "ARCO (arma del arquero) + IRIS (parte del ojo) = ARCO IRIS."
  }
];
