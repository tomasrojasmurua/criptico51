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
  },
  {
    "pista": "Lo que perdía, sin rumbo, se volvió roca",
    "respuesta": "PIEDRA",
    "definicion": [
      "roca"
    ],
    "tipo": "Anagrama",
    "indicador": "sin rumbo",
    "explicacion": "Las letras de PERDÍA, sin rumbo, se reordenan en PIEDRA, una roca."
  },
  {
    "pista": "Religiosa que sale de un jamón alterado",
    "respuesta": "MONJA",
    "definicion": [
      "Religiosa"
    ],
    "tipo": "Anagrama",
    "indicador": "alterado",
    "explicacion": "Alterando las letras de JAMÓN sale MONJA, una religiosa."
  },
  {
    "pista": "Se trastoca el credo y gruñe el animal de la pocilga",
    "respuesta": "CERDO",
    "definicion": [
      "el animal de la pocilga"
    ],
    "tipo": "Anagrama",
    "indicador": "Se trastoca",
    "explicacion": "CREDO trastocado da CERDO, el animal de la pocilga."
  },
  {
    "pista": "Tras un careo agitado queda el metal templado",
    "respuesta": "ACERO",
    "definicion": [
      "el metal templado"
    ],
    "tipo": "Anagrama",
    "indicador": "agitado",
    "explicacion": "Las letras de CAREO, agitadas, forman ACERO, el metal templado."
  },
  {
    "pista": "Un coral se derrite en el bochorno",
    "respuesta": "CALOR",
    "definicion": [
      "el bochorno"
    ],
    "tipo": "Anagrama",
    "indicador": "se derrite",
    "explicacion": "CORAL derretido, con sus letras reordenadas, da CALOR, el bochorno."
  },
  {
    "pista": "Noel se desordena y aparece el rey de la selva",
    "respuesta": "LEON",
    "definicion": [
      "el rey de la selva"
    ],
    "tipo": "Anagrama",
    "indicador": "se desordena",
    "explicacion": "NOEL desordenado da LEÓN, el rey de la selva."
  },
  {
    "pista": "Mira, desordenado, el eco del verso",
    "respuesta": "RIMA",
    "definicion": [
      "el eco del verso"
    ],
    "tipo": "Anagrama",
    "indicador": "desordenado",
    "explicacion": "MIRA desordenado da RIMA, el eco que repite el sonido al final del verso."
  },
  {
    "pista": "Unas bromas torcidas dejan una silueta oscura",
    "respuesta": "SOMBRA",
    "definicion": [
      "una silueta oscura"
    ],
    "tipo": "Anagrama",
    "indicador": "torcidas",
    "explicacion": "Las letras de BROMAS, torcidas, forman SOMBRA, una silueta oscura."
  },
  {
    "pista": "Termina de otra manera lo que no es verdad",
    "respuesta": "MENTIRA",
    "definicion": [
      "lo que no es verdad"
    ],
    "tipo": "Anagrama",
    "indicador": "de otra manera",
    "explicacion": "TERMINA escrito de otra manera da MENTIRA, lo que no es verdad."
  },
  {
    "pista": "El mero se revuelve en la pala del bote",
    "respuesta": "REMO",
    "definicion": [
      "la pala del bote"
    ],
    "tipo": "Anagrama",
    "indicador": "se revuelve",
    "explicacion": "El MERO, un pez, se revuelve y queda REMO, la pala del bote."
  },
  {
    "pista": "Revuelve nacer y sale lo que se asa",
    "respuesta": "CARNE",
    "definicion": [
      "lo que se asa"
    ],
    "tipo": "Anagrama",
    "indicador": "Revuelve",
    "explicacion": "Revolviendo las letras de NACER sale CARNE, lo que se asa."
  },
  {
    "pista": "Pardo, alborotado, es un campo verde",
    "respuesta": "PRADO",
    "definicion": [
      "un campo verde"
    ],
    "tipo": "Anagrama",
    "indicador": "alborotado",
    "explicacion": "PARDO alborotado da PRADO, un campo verde."
  },
  {
    "pista": "Un matón descompuesto es la capa del rey",
    "respuesta": "MANTO",
    "definicion": [
      "la capa del rey"
    ],
    "tipo": "Anagrama",
    "indicador": "descompuesto",
    "explicacion": "Las letras de MATÓN, descompuestas, forman MANTO, la capa del rey."
  },
  {
    "pista": "Una mora deshecha se vuelve ramillete",
    "respuesta": "RAMO",
    "definicion": [
      "ramillete"
    ],
    "tipo": "Anagrama",
    "indicador": "deshecha",
    "explicacion": "MORA deshecha da RAMO, un ramillete."
  },
  {
    "pista": "Ave del estanque que opta por cambiar",
    "respuesta": "PATO",
    "definicion": [
      "Ave del estanque"
    ],
    "tipo": "Anagrama",
    "indicador": "por cambiar",
    "explicacion": "OPTA, al cambiar sus letras, da PATO, el ave del estanque."
  },
  {
    "pista": "Amor o sangre esconden una flor",
    "respuesta": "ROSA",
    "definicion": [
      "una flor"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconden",
    "explicacion": "Entre amoR O SAngre se esconde ROSA, una flor."
  },
  {
    "pista": "En el alma rota se oculta el océano",
    "respuesta": "MAR",
    "definicion": [
      "el océano"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se oculta",
    "explicacion": "En alMA Rota se oculta MAR, el océano."
  },
  {
    "pista": "Dentro de los olivos brilla el astro rey",
    "respuesta": "SOL",
    "definicion": [
      "el astro rey"
    ],
    "tipo": "Palabra escondida",
    "indicador": "Dentro de",
    "explicacion": "Dentro de loS OLivos está SOL, el astro rey."
  },
  {
    "pista": "Anís, lavanda y en medio una tierra rodeada de mar",
    "respuesta": "ISLA",
    "definicion": [
      "una tierra rodeada de mar"
    ],
    "tipo": "Palabra escondida",
    "indicador": "en medio",
    "explicacion": "Entre anÍS LAvanda queda en medio ISLA, una tierra rodeada de mar."
  },
  {
    "pista": "En un jardín idolatrado se esconde el hogar del pájaro",
    "respuesta": "NIDO",
    "definicion": [
      "el hogar del pájaro"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se esconde",
    "explicacion": "En jardíN IDOlatrado se esconde NIDO, el hogar del pájaro."
  },
  {
    "pista": "El faro cansado guarda una piedra",
    "respuesta": "ROCA",
    "definicion": [
      "una piedra"
    ],
    "tipo": "Palabra escondida",
    "indicador": "guarda",
    "explicacion": "faRO CAnsado guarda ROCA, una piedra."
  },
  {
    "pista": "La tarde cobriza oculta un sonido que vuelve",
    "respuesta": "ECO",
    "definicion": [
      "un sonido que vuelve"
    ],
    "tipo": "Palabra escondida",
    "indicador": "oculta",
    "explicacion": "En tardE COBriza se oculta ECO, el sonido que vuelve."
  },
  {
    "pista": "El mar parece esconder un instrumento de cuerdas",
    "respuesta": "ARPA",
    "definicion": [
      "un instrumento de cuerdas"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconder",
    "explicacion": "En mAR PArece se esconde ARPA, un instrumento de cuerdas."
  },
  {
    "pista": "El globo lleva oculta la fiera que aúlla",
    "respuesta": "LOBO",
    "definicion": [
      "la fiera que aúlla"
    ],
    "tipo": "Palabra escondida",
    "indicador": "lleva oculta",
    "explicacion": "GLOBO lleva oculta la palabra LOBO, la fiera que aúlla."
  },
  {
    "pista": "La dicha danzante lleva dentro un ser mágico",
    "respuesta": "HADA",
    "definicion": [
      "un ser mágico"
    ],
    "tipo": "Palabra escondida",
    "indicador": "lleva dentro",
    "explicacion": "dicHA DAnzante lleva dentro HADA, un ser mágico."
  },
  {
    "pista": "Un paso solemne encierra a la bestia del bosque",
    "respuesta": "OSO",
    "definicion": [
      "la bestia del bosque"
    ],
    "tipo": "Palabra escondida",
    "indicador": "encierra",
    "explicacion": "pasO SOlemne encierra OSO, la bestia del bosque."
  },
  {
    "pista": "Por el bosque sombrío corre escondida una corriente",
    "respuesta": "RIO",
    "definicion": [
      "una corriente"
    ],
    "tipo": "Palabra escondida",
    "indicador": "escondida",
    "explicacion": "En sombRÍO va escondida la palabra RÍO, una corriente de agua."
  },
  {
    "pista": "En el hotel antiguo se guarda un tejido",
    "respuesta": "TELA",
    "definicion": [
      "un tejido"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se guarda",
    "explicacion": "En hoTEL Antiguo se guarda TELA, un tejido."
  },
  {
    "pista": "La mamá paciente esconde el dibujo del mundo",
    "respuesta": "MAPA",
    "definicion": [
      "el dibujo del mundo"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconde",
    "explicacion": "En maMÁ PAciente se esconde MAPA, el dibujo del mundo."
  },
  {
    "pista": "Dentro de la campana suena el alimento de cada día",
    "respuesta": "PAN",
    "definicion": [
      "el alimento de cada día"
    ],
    "tipo": "Palabra escondida",
    "indicador": "Dentro de",
    "explicacion": "Dentro de camPANa está PAN, el alimento de cada día."
  },
  {
    "pista": "El amor regresa a la ciudad eterna",
    "respuesta": "ROMA",
    "definicion": [
      "la ciudad eterna"
    ],
    "tipo": "Reverso",
    "indicador": "regresa",
    "explicacion": "AMOR leído al revés da ROMA, la ciudad eterna."
  },
  {
    "pista": "Ocas que vuelven, bolsa de arpillera",
    "respuesta": "SACO",
    "definicion": [
      "bolsa de arpillera"
    ],
    "tipo": "Reverso",
    "indicador": "que vuelven",
    "explicacion": "OCAS al revés da SACO, una bolsa de arpillera."
  },
  {
    "pista": "La rama da la vuelta para querer",
    "respuesta": "AMAR",
    "definicion": [
      "querer"
    ],
    "tipo": "Reverso",
    "indicador": "da la vuelta",
    "explicacion": "RAMA al revés da AMAR, querer."
  },
  {
    "pista": "Atar de vuelta al roedor",
    "respuesta": "RATA",
    "definicion": [
      "roedor"
    ],
    "tipo": "Reverso",
    "indicador": "de vuelta",
    "explicacion": "ATAR de vuelta, al revés, da RATA, un roedor."
  },
  {
    "pista": "El raso se da la vuelta para atreverse",
    "respuesta": "OSAR",
    "definicion": [
      "atreverse"
    ],
    "tipo": "Reverso",
    "indicador": "se da la vuelta",
    "explicacion": "RASO al revés da OSAR, atreverse."
  },
  {
    "pista": "Adán retrocede hasta el vacío",
    "respuesta": "NADA",
    "definicion": [
      "el vacío"
    ],
    "tipo": "Reverso",
    "indicador": "retrocede",
    "explicacion": "ADÁN leído hacia atrás da NADA, el vacío."
  },
  {
    "pista": "Eva mira hacia atrás y es pájaro",
    "respuesta": "AVE",
    "definicion": [
      "pájaro"
    ],
    "tipo": "Reverso",
    "indicador": "mira hacia atrás",
    "explicacion": "EVA al revés da AVE, un pájaro."
  },
  {
    "pista": "El apodo abraza al norte y se vuelve montaña",
    "respuesta": "MONTE",
    "definicion": [
      "montaña"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza",
    "explicacion": "El apodo es un MOTE; abraza la N del norte y queda MO·N·TE, una montaña."
  },
  {
    "pista": "Un arbusto envuelve al norte, abrigo de la cama",
    "respuesta": "MANTA",
    "definicion": [
      "abrigo de la cama"
    ],
    "tipo": "Contenedor",
    "indicador": "envuelve",
    "explicacion": "Un arbusto es una MATA; envuelve la N del norte y queda MA·N·TA, el abrigo de la cama."
  },
  {
    "pista": "La seda guarda al norte y se abre un camino estrecho",
    "respuesta": "SENDA",
    "definicion": [
      "un camino estrecho"
    ],
    "tipo": "Contenedor",
    "indicador": "guarda",
    "explicacion": "SEDA guarda la N del norte y queda SE·N·DA, un camino estrecho."
  },
  {
    "pista": "El mudo acoge al norte y gira el planeta",
    "respuesta": "MUNDO",
    "definicion": [
      "el planeta"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "explicacion": "MUDO acoge la N del norte y queda MU·N·DO, el planeta."
  },
  {
    "pista": "Un pío abraza al norte y se alza el árbol de la resina",
    "respuesta": "PINO",
    "definicion": [
      "el árbol de la resina"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza",
    "explicacion": "El PÍO del pájaro abraza la N del norte y queda PI·N·O, el árbol de la resina."
  },
  {
    "pista": "Pita con el norte dentro y llena de color la pared",
    "respuesta": "PINTA",
    "definicion": [
      "llena de color la pared"
    ],
    "tipo": "Contenedor",
    "indicador": "dentro",
    "explicacion": "PITA (de pitar) con la N del norte dentro da PI·N·TA, lo que hace quien llena de color la pared."
  },
  {
    "pista": "Lo tosco se traga al uno y resuena el estrépito",
    "respuesta": "RUIDO",
    "definicion": [
      "el estrépito"
    ],
    "tipo": "Contenedor",
    "indicador": "se traga",
    "explicacion": "Lo tosco es RUDO; se traga la I, el uno romano, y queda RU·I·DO, el estrépito."
  },
  {
    "pista": "Puso cincuenta dentro y late en la muñeca",
    "respuesta": "PULSO",
    "definicion": [
      "late en la muñeca"
    ],
    "tipo": "Contenedor",
    "indicador": "dentro",
    "explicacion": "PUSO con la L (cincuenta en romanos) dentro da PU·L·SO, lo que late en la muñeca."
  },
  {
    "pista": "Cavo con cincuenta dentro y me quedo sin pelo",
    "respuesta": "CALVO",
    "definicion": [
      "sin pelo"
    ],
    "tipo": "Contenedor",
    "indicador": "dentro",
    "explicacion": "CAVO con la L (cincuenta en romanos) dentro da CA·L·VO, sin pelo."
  },
  {
    "pista": "Estrella y cubo de juego forman al militar",
    "respuesta": "SOLDADO",
    "definicion": [
      "al militar"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Una estrella es el SOL y el cubo de juego, un DADO. SOL + DADO = SOLDADO, un militar."
  },
  {
    "pista": "Gira la estrella y nace una flor amarilla",
    "respuesta": "GIRASOL",
    "definicion": [
      "una flor amarilla"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "GIRA + SOL (la estrella) = GIRASOL, una flor amarilla."
  },
  {
    "pista": "Un número irracional y un roedor forman al corsario",
    "respuesta": "PIRATA",
    "definicion": [
      "al corsario"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "PI es el número irracional del círculo y el roedor es una RATA. PI + RATA = PIRATA, un corsario."
  },
  {
    "pista": "Un instante junto al norte y huye el que ama el queso",
    "respuesta": "RATON",
    "definicion": [
      "el que ama el queso"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Un instante es un RATO; junto a la N del norte queda RATÓN, el que ama el queso."
  },
  {
    "pista": "Rostro con repollo lleva la casa a cuestas",
    "respuesta": "CARACOL",
    "definicion": [
      "lleva la casa a cuestas"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El rostro es la CARA y el repollo, la COL. CARA + COL = CARACOL, que lleva la casa a cuestas."
  },
  {
    "pista": "Repollo y mineral en bruto, hogar de las abejas",
    "respuesta": "COLMENA",
    "definicion": [
      "hogar de las abejas"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El repollo es la COL y el mineral en bruto, la MENA. COL + MENA = COLMENA, el hogar de las abejas."
  },
  {
    "pista": "El condimento se va y te rescata",
    "respuesta": "SALVA",
    "definicion": [
      "te rescata"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El condimento es la SAL; se va es VA. SAL + VA = SALVA, te rescata."
  },
  {
    "pista": "Pala de la barca con tela fina forma un torbellino",
    "respuesta": "REMOLINO",
    "definicion": [
      "un torbellino"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La pala de la barca es el REMO y la tela fina, el LINO. REMO + LINO = REMOLINO, un torbellino."
  },
  {
    "pista": "El océano y el cobalto, borde del cuadro",
    "respuesta": "MARCO",
    "definicion": [
      "borde del cuadro"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El océano es el MAR y CO es el símbolo del cobalto. MAR + CO = MARCO, el borde del cuadro."
  },
  {
    "pista": "«Sí, mío», dice el primate",
    "respuesta": "SIMIO",
    "definicion": [
      "el primate"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "SÍ + MÍO = SIMIO, el primate."
  },
  {
    "pista": "Una nota y el océano para amansar al potro",
    "respuesta": "DOMAR",
    "definicion": [
      "amansar al potro"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La nota DO y el océano, el MAR. DO + MAR = DOMAR, amansar al potro."
  },
  {
    "pista": "Nota con papel de teatro, un engaño en el póker",
    "respuesta": "FAROL",
    "definicion": [
      "un engaño en el póker"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La nota FA y el papel de teatro, el ROL. FA + ROL = FAROL, un engaño en el póker."
  },
  {
    "pista": "La res está acá, recuerdo amargo de la fiesta",
    "respuesta": "RESACA",
    "definicion": [
      "recuerdo amargo de la fiesta"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "RES + ACÁ = RESACA, el recuerdo amargo de la fiesta."
  },
  {
    "pista": "Nota musical con un galo, lo que se envuelve en papel de fiesta",
    "respuesta": "REGALO",
    "definicion": [
      "lo que se envuelve en papel de fiesta"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La nota RE y un GALO, un antiguo francés. RE + GALO = REGALO."
  },
  {
    "pista": "Brinca sierras el insecto verde del prado",
    "respuesta": "SALTAMONTES",
    "definicion": [
      "el insecto verde del prado"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Brinca es SALTA y las sierras son MONTES. SALTA + MONTES = SALTAMONTES, el insecto verde del prado."
  },
  {
    "pista": "Araña los firmamentos la torre de la ciudad",
    "respuesta": "RASCACIELOS",
    "definicion": [
      "la torre de la ciudad"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Araña es RASCA y los firmamentos son los CIELOS. RASCA + CIELOS = RASCACIELOS, la torre de la ciudad."
  },
  {
    "pista": "Cruza el clima y queda un entretenimiento",
    "respuesta": "PASATIEMPO",
    "definicion": [
      "un entretenimiento"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Cruza es PASA y el clima es el TIEMPO. PASA + TIEMPO = PASATIEMPO, un entretenimiento."
  },
  {
    "pista": "El océano a la aldea trae un prodigio",
    "respuesta": "MARAVILLA",
    "definicion": [
      "un prodigio"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El océano es el MAR, luego A, y la aldea es una VILLA. MAR + A + VILLA = MARAVILLA, un prodigio."
  },
  {
    "pista": "Detiene a la estrella la sombrilla de playa",
    "respuesta": "PARASOL",
    "definicion": [
      "la sombrilla de playa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Detiene es PARA y la estrella, el SOL. PARA + SOL = PARASOL, la sombrilla de playa."
  },
  {
    "pista": "Lo malo se va y deja un color violáceo",
    "respuesta": "MALVA",
    "definicion": [
      "un color violáceo"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Lo malo es el MAL y se va es VA. MAL + VA = MALVA, un color violáceo."
  },
  {
    "pista": "Una taberna y el cobalto zarpan en la nave",
    "respuesta": "BARCO",
    "definicion": [
      "la nave"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La taberna es un BAR y CO es el símbolo del cobalto. BAR + CO = BARCO, la nave."
  },
  {
    "pista": "Lanza una negativa el déspota",
    "respuesta": "TIRANO",
    "definicion": [
      "el déspota"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Lanza es TIRA y la negativa, NO. TIRA + NO = TIRANO, el déspota."
  },
  {
    "pista": "Mancha de sol en la piel y una nota, el desliz que se confiesa",
    "respuesta": "PECADO",
    "definicion": [
      "el desliz que se confiesa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La mancha de sol en la piel es una PECA y la nota, DO. PECA + DO = PECADO, el desliz que se confiesa."
  },
  {
    "pista": "El océano sirve una infusión al planeta rojo",
    "respuesta": "MARTE",
    "definicion": [
      "al planeta rojo"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El océano es el MAR y la infusión, un TÉ. MAR + TE = MARTE, el planeta rojo."
  },
  {
    "pista": "El inicio de la tarde y el oro forman la bestia de la plaza",
    "respuesta": "TORO",
    "definicion": [
      "la bestia de la plaza"
    ],
    "tipo": "Selector + charada",
    "indicador": "El inicio de",
    "explicacion": "El inicio de «tarde» es T; con ORO queda TORO, la bestia de la plaza."
  },
  {
    "pista": "Afirmación y negación juntas dictan el destino",
    "respuesta": "SINO",
    "definicion": [
      "el destino"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La afirmación SÍ y la negación NO. SÍ + NO = SINO, el destino."
  },
  {
    "pista": "Negativa y un saludo porteño traen la oscuridad",
    "respuesta": "NOCHE",
    "definicion": [
      "la oscuridad"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La negativa es NO y el saludo porteño, CHE. NO + CHE = NOCHE, la oscuridad."
  },
  {
    "pista": "Di, amante, la piedra que más brilla",
    "respuesta": "DIAMANTE",
    "definicion": [
      "la piedra que más brilla"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "DI + AMANTE = DIAMANTE, la piedra que más brilla."
  },
  {
    "pista": "Mil y una nota recorren la distancia inglesa",
    "respuesta": "MILLA",
    "definicion": [
      "la distancia inglesa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "MIL y la nota LA. MIL + LA = MILLA, la distancia inglesa."
  },
  {
    "pista": "Di vino y fue celestial",
    "respuesta": "DIVINO",
    "definicion": [
      "celestial"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "DI + VINO = DIVINO, celestial."
  },
  {
    "pista": "Calcio con un sí y un no, donde se apuesta en la ruleta",
    "respuesta": "CASINO",
    "definicion": [
      "donde se apuesta en la ruleta"
    ],
    "tipo": "Misceláneas",
    "indicador": "",
    "explicacion": "CA es el símbolo del calcio; luego SÍ y NO. CA + SI + NO = CASINO, donde se apuesta en la ruleta."
  },
  {
    "pista": "Asiento de la plaza que guarda tu dinero",
    "respuesta": "BANCO",
    "definicion": [
      "Asiento de la plaza",
      "guarda tu dinero"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un BANCO es un asiento de la plaza y también la entidad que guarda tu dinero."
  },
  {
    "pista": "Mensaje en sobre que te trae el camarero",
    "respuesta": "CARTA",
    "definicion": [
      "Mensaje en sobre",
      "te trae el camarero"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La CARTA es un mensaje en sobre y también el menú que te trae el camarero."
  },
  {
    "pista": "Corta la madera y se eleva en cordillera",
    "respuesta": "SIERRA",
    "definicion": [
      "Corta la madera",
      "se eleva en cordillera"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La SIERRA corta la madera y también es una cordillera."
  },
  {
    "pista": "Felino que levanta el coche",
    "respuesta": "GATO",
    "definicion": [
      "Felino",
      "levanta el coche"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El GATO es un felino y también la herramienta que levanta el coche."
  },
  {
    "pista": "Crece en la maceta y es un piso del edificio",
    "respuesta": "PLANTA",
    "definicion": [
      "Crece en la maceta",
      "un piso del edificio"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La PLANTA crece en la maceta y también es un piso del edificio."
  },
  {
    "pista": "Cae en otoño y corta en el cuchillo",
    "respuesta": "HOJA",
    "definicion": [
      "Cae en otoño",
      "corta en el cuchillo"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La HOJA cae en otoño y también es la parte del cuchillo que corta."
  },
  {
    "pista": "Ciudad principal o dinero invertido",
    "respuesta": "CAPITAL",
    "definicion": [
      "Ciudad principal",
      "dinero invertido"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La CAPITAL es la ciudad principal y el CAPITAL es el dinero invertido."
  },
  {
    "pista": "Suena en la cocina y va del centro al borde",
    "respuesta": "RADIO",
    "definicion": [
      "Suena en la cocina",
      "va del centro al borde"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La RADIO suena en la cocina y el RADIO va del centro al borde del círculo."
  },
  {
    "pista": "Saliente de la costa y soldado con galones",
    "respuesta": "CABO",
    "definicion": [
      "Saliente de la costa",
      "soldado con galones"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un CABO es un saliente de la costa y también un soldado con galones."
  },
  {
    "pista": "Montón de platos que alimenta la linterna",
    "respuesta": "PILA",
    "definicion": [
      "Montón de platos",
      "alimenta la linterna"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Una PILA es un montón de platos y también la batería que alimenta la linterna."
  },
  {
    "pista": "Capital del Perú que pule las uñas",
    "respuesta": "LIMA",
    "definicion": [
      "Capital del Perú",
      "pule las uñas"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "LIMA es la capital del Perú y también la herramienta que pule las uñas."
  },
  {
    "pista": "El párroco que sana la herida",
    "respuesta": "CURA",
    "definicion": [
      "El párroco",
      "sana la herida"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El CURA es el párroco y CURA es lo que hace quien sana la herida."
  },
  {
    "pista": "Traje de trabajo que trepa a los árboles",
    "respuesta": "MONO",
    "definicion": [
      "Traje de trabajo",
      "trepa a los árboles"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El MONO es un traje de trabajo de una pieza y también el animal que trepa a los árboles."
  },
  {
    "pista": "Herida de cuchillo en la residencia del rey",
    "respuesta": "CORTE",
    "definicion": [
      "Herida de cuchillo",
      "la residencia del rey"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un CORTE es una herida de cuchillo y la CORTE es la residencia del rey."
  },
  {
    "pista": "Lo que guarda la carta está por encima",
    "respuesta": "SOBRE",
    "definicion": [
      "Lo que guarda la carta",
      "por encima"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El SOBRE guarda la carta y «sobre» también significa por encima."
  },
  {
    "pista": "Fruta tropical que se agarra en la sartén",
    "respuesta": "MANGO",
    "definicion": [
      "Fruta tropical",
      "se agarra en la sartén"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El MANGO es una fruta tropical y también la parte de la sartén que se agarra."
  },
  {
    "pista": "Boca del pájaro en la cima nevada",
    "respuesta": "PICO",
    "definicion": [
      "Boca del pájaro",
      "la cima nevada"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El PICO es la boca del pájaro y también la cima de una montaña."
  },
  {
    "pista": "Saborea en la boca y se habla en cada país",
    "respuesta": "LENGUA",
    "definicion": [
      "Saborea en la boca",
      "se habla en cada país"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La LENGUA saborea en la boca y también es el idioma que se habla en cada país."
  },
  {
    "pista": "Fila de espera que el perro mueve",
    "respuesta": "COLA",
    "definicion": [
      "Fila de espera",
      "el perro mueve"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La COLA es una fila de espera y también lo que el perro mueve."
  },
  {
    "pista": "La del pescador conecta al mundo",
    "respuesta": "RED",
    "definicion": [
      "La del pescador",
      "conecta al mundo"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La RED del pescador y la RED que conecta al mundo."
  },
  {
    "pista": "Calzado alto que guarda vino",
    "respuesta": "BOTA",
    "definicion": [
      "Calzado alto",
      "guarda vino"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La BOTA es un calzado alto y también el recipiente de cuero que guarda vino."
  },
  {
    "pista": "Prenda que viste la ladera del monte",
    "respuesta": "FALDA",
    "definicion": [
      "Prenda",
      "la ladera del monte"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La FALDA es una prenda y también la ladera del monte."
  },
  {
    "pista": "Medida de la ropa esculpida en madera",
    "respuesta": "TALLA",
    "definicion": [
      "Medida de la ropa",
      "esculpida en madera"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La TALLA es la medida de la ropa y también una figura esculpida en madera."
  },
  {
    "pista": "Norma que traza líneas rectas",
    "respuesta": "REGLA",
    "definicion": [
      "Norma",
      "traza líneas rectas"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La REGLA es una norma y también el instrumento que traza líneas rectas."
  },
  {
    "pista": "La víctima del león detiene el río",
    "respuesta": "PRESA",
    "definicion": [
      "La víctima del león",
      "detiene el río"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La PRESA es la víctima del león y también el muro que detiene el río."
  },
  {
    "pista": "Resorte donde atracan los barcos",
    "respuesta": "MUELLE",
    "definicion": [
      "Resorte",
      "donde atracan los barcos"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un MUELLE es un resorte y también el lugar donde atracan los barcos."
  },
  {
    "pista": "Franja de tela que toca en la fiesta",
    "respuesta": "BANDA",
    "definicion": [
      "Franja de tela",
      "toca en la fiesta"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La BANDA es una franja de tela y también el grupo que toca en la fiesta."
  },
  {
    "pista": "Vía de agua que cambias con el control",
    "respuesta": "CANAL",
    "definicion": [
      "Vía de agua",
      "cambias con el control"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un CANAL es una vía de agua y también lo que cambias con el control de la tele."
  },
  {
    "pista": "Viste al ave y escribe la carta",
    "respuesta": "PLUMA",
    "definicion": [
      "Viste al ave",
      "escribe la carta"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La PLUMA viste al ave y también escribe la carta."
  },
  {
    "pista": "Lugar del tren que dura tres meses",
    "respuesta": "ESTACION",
    "definicion": [
      "Lugar del tren",
      "dura tres meses"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La ESTACIÓN del tren y la ESTACIÓN del año, que dura tres meses."
  },
  {
    "pista": "Capa de pintura con cinco dedos",
    "respuesta": "MANO",
    "definicion": [
      "Capa de pintura",
      "cinco dedos"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Una MANO es una capa de pintura y también lo que tiene cinco dedos."
  },
  {
    "pista": "Fideos que llenan la cartera",
    "respuesta": "PASTA",
    "definicion": [
      "Fideos",
      "llenan la cartera"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La PASTA son los fideos y, en lenguaje coloquial, el dinero que llena la cartera."
  },
  {
    "pista": "Valla que no queda lejos",
    "respuesta": "CERCA",
    "definicion": [
      "Valla",
      "no queda lejos"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Una CERCA es una valla y «cerca» es lo que no queda lejos."
  },
  {
    "pista": "El corazón de los toros late como metal precioso",
    "respuesta": "ORO",
    "definicion": [
      "metal precioso"
    ],
    "tipo": "Selector",
    "indicador": "El corazón de",
    "explicacion": "En el corazón de TOROS, sin sus extremos, queda ORO, un metal precioso."
  },
  {
    "pista": "Las casas sin bordes dejan la oreja de la taza",
    "respuesta": "ASA",
    "definicion": [
      "la oreja de la taza"
    ],
    "tipo": "Selector",
    "indicador": "sin bordes",
    "explicacion": "CASAS sin sus bordes (la primera y la última letra) deja ASA, la oreja de la taza."
  },
  {
    "pista": "El centro de los barcos es el arma del arquero",
    "respuesta": "ARCO",
    "definicion": [
      "el arma del arquero"
    ],
    "tipo": "Selector",
    "indicador": "El centro de",
    "explicacion": "El centro de BARCOS, sin la primera y la última letra, es ARCO, el arma del arquero."
  },
  {
    "pista": "En el corazón de las peras late una época",
    "respuesta": "ERA",
    "definicion": [
      "una época"
    ],
    "tipo": "Selector",
    "indicador": "el corazón de",
    "explicacion": "El corazón de PERAS, sin sus extremos, es ERA, una época."
  },
  {
    "pista": "Lo central de los ramos es el dueño de la casa",
    "respuesta": "AMO",
    "definicion": [
      "el dueño de la casa"
    ],
    "tipo": "Selector",
    "indicador": "Lo central de",
    "explicacion": "Lo central de RAMOS, sin sus extremos, es AMO, el dueño de la casa."
  },
  {
    "pista": "Al camaleón se le escapa el león y queda donde duermes",
    "respuesta": "CAMA",
    "definicion": [
      "donde duermes"
    ],
    "tipo": "Sustracción",
    "indicador": "se le escapa",
    "explicacion": "CAMALEÓN sin LEÓN deja CAMA, donde duermes."
  },
  {
    "pista": "La piel se queda sin cincuenta y es lo que camina",
    "respuesta": "PIE",
    "definicion": [
      "lo que camina"
    ],
    "tipo": "Sustracción",
    "indicador": "se queda sin",
    "explicacion": "PIEL sin la L (cincuenta en romanos) deja PIE, lo que camina."
  },
  {
    "pista": "La camisa se desprende del calcio y queda la ceremonia del domingo",
    "respuesta": "MISA",
    "definicion": [
      "la ceremonia del domingo"
    ],
    "tipo": "Sustracción",
    "indicador": "se desprende",
    "explicacion": "CA es el símbolo del calcio. CAMISA sin CA deja MISA, la ceremonia del domingo."
  },
  {
    "pista": "La prisa olvida su comienzo y estalla en carcajada",
    "respuesta": "RISA",
    "definicion": [
      "carcajada"
    ],
    "tipo": "Sustracción",
    "indicador": "olvida su comienzo",
    "explicacion": "PRISA sin su primera letra deja RISA, una carcajada."
  },
  {
    "pista": "La demora pierde su primer par y madura la fruta del zarzal",
    "respuesta": "MORA",
    "definicion": [
      "la fruta del zarzal"
    ],
    "tipo": "Sustracción",
    "indicador": "pierde su primer par",
    "explicacion": "DEMORA sin sus dos primeras letras deja MORA, la fruta del zarzal."
  },
  {
    "pista": "Se oye como un saludo la que rompe en la playa",
    "respuesta": "OLA",
    "definicion": [
      "la que rompe en la playa"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Se oye como",
    "explicacion": "OLA suena igual que HOLA, un saludo."
  },
  {
    "pista": "La cacería suena como el hogar",
    "respuesta": "CAZA",
    "definicion": [
      "La cacería"
    ],
    "tipo": "Onomatopeya",
    "indicador": "suena como",
    "explicacion": "CAZA, la cacería, suena igual que CASA, el hogar, cuando se sesea."
  },
  {
    "pista": "Caño que, dicen, poseyó",
    "respuesta": "TUBO",
    "definicion": [
      "Caño"
    ],
    "tipo": "Onomatopeya",
    "indicador": "dicen",
    "explicacion": "TUBO, un caño, suena igual que TUVO, poseyó."
  },
  {
    "pista": "Se escucha hermoso el pelo fino del brazo",
    "respuesta": "VELLO",
    "definicion": [
      "el pelo fino del brazo"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Se escucha",
    "explicacion": "VELLO, el pelo fino del brazo, suena igual que BELLO, hermoso."
  },
  {
    "pista": "Recipiente del agua que se oye como un órgano del costado",
    "respuesta": "VASO",
    "definicion": [
      "Recipiente del agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "se oye como",
    "explicacion": "VASO, el recipiente del agua, suena igual que BAZO, un órgano del costado, cuando se sesea."
  },
  {
    "pista": "Se oye hacia el continente más extenso",
    "respuesta": "ASIA",
    "definicion": [
      "el continente más extenso"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Se oye",
    "explicacion": "ASIA, el continente más extenso, suena igual que HACIA."
  },
  {
    "pista": "Animal con cuernos que al oído es un esclavo",
    "respuesta": "CIERVO",
    "definicion": [
      "Animal con cuernos"
    ],
    "tipo": "Onomatopeya",
    "indicador": "al oído",
    "explicacion": "CIERVO, animal con cuernos, suena igual que SIERVO, un esclavo, cuando se sesea."
  },
  {
    "pista": "Isla pequeña que suena a dureza del pie",
    "respuesta": "CAYO",
    "definicion": [
      "Isla pequeña"
    ],
    "tipo": "Onomatopeya",
    "indicador": "suena a",
    "explicacion": "CAYO, una isla pequeña, suena igual que CALLO, la dureza del pie."
  },
  {
    "pista": "Suena profunda la curva que recorre el agua",
    "respuesta": "ONDA",
    "definicion": [
      "la curva que recorre el agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Suena",
    "explicacion": "ONDA, la curva que recorre el agua, suena igual que HONDA, profunda."
  }
];
