// Banco de pistas. Una por día a partir de FECHA_INICIO (UTC).
// - respuesta: en mayúsculas, sin tildes (Ñ permitida). Varias palabras separadas por espacio.
// - definicion: fragmentos exactos de la pista que funcionan como definición
// - tipo: mecanismo críptico (ver sección Aprender)
// - indicador: fragmento exacto que señala el mecanismo (opcional)
// - explicacion: cómo se resuelve
const FECHA_INICIO = "2026-10-11";

const PISTAS = [
  {
    "pista": "Papá a medias sube la colina y suelta la mensajera de la paz",
    "respuesta": "PALOMA",
    "definicion": [
      "la mensajera de la paz"
    ],
    "tipo": "Charada",
    "indicador": "a medias",
    "explicacion": "Papá a medias es PA y la colina, una LOMA. PA + LOMA = PALOMA, la mensajera de la paz."
  },
  {
    "pista": "La que pasta lleva, de boca en boca, las valijas en el techo",
    "respuesta": "VACA",
    "definicion": [
      "La que pasta"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de boca en boca",
    "explicacion": "Las valijas en el techo van en la BACA, que de boca en boca suena igual que VACA, la que pasta."
  },
  {
    "pista": "Letras y él, tras el baile, son la que brilla en la alfombra roja",
    "respuesta": "ESTRELLA",
    "definicion": [
      "la que brilla en la alfombra roja"
    ],
    "tipo": "Anagrama",
    "indicador": "tras el baile",
    "explicacion": "LETRAS + ÉL, tras el baile de sus letras, forman ESTRELLA, la que brilla en la alfombra roja."
  },
  {
    "pista": "Repollo que un caracol deja al perder la cara",
    "respuesta": "COL",
    "definicion": [
      "Repollo"
    ],
    "tipo": "Sustracción",
    "indicador": "al perder",
    "explicacion": "CARACOL al perder la CARA deja COL, un repollo."
  },
  {
    "pista": "Arde en la chimenea y escupe en los Andes",
    "respuesta": "LLAMA",
    "definicion": [
      "Arde en la chimenea",
      "escupe en los Andes"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La LLAMA arde en la chimenea, y la LLAMA de los Andes escupe."
  },
  {
    "pista": "Aborrecimiento en retroceso, ya escuchado",
    "respuesta": "OIDO",
    "definicion": [
      "escuchado"
    ],
    "tipo": "Reverso",
    "indicador": "en retroceso",
    "explicacion": "El aborrecimiento es ODIO; en retroceso, al revés, da OÍDO, escuchado."
  },
  {
    "pista": "Apenas viento cuando el bufón encabeza la carcajada",
    "respuesta": "BRISA",
    "definicion": [
      "Apenas viento"
    ],
    "tipo": "Selector + charada",
    "indicador": "encabeza",
    "explicacion": "El bufón encabeza con su B la carcajada, RISA. B + RISA = BRISA, apenas viento."
  },
  {
    "pista": "Rendido, el casado deja entrar al norte",
    "respuesta": "CANSADO",
    "definicion": [
      "Rendido"
    ],
    "tipo": "Contenedor",
    "indicador": "deja entrar",
    "explicacion": "CASADO deja entrar la N del norte y queda CA·N·SADO, rendido."
  },
  {
    "pista": "Canta en las rocas la resina derramada",
    "respuesta": "SIRENA",
    "definicion": [
      "Canta en las rocas"
    ],
    "tipo": "Anagrama",
    "indicador": "derramada",
    "explicacion": "RESINA derramada, con sus letras reordenadas, da SIRENA, la que canta en las rocas."
  },
  {
    "pista": "El cano abraza mi nota y marca la ruta",
    "respuesta": "CAMINO",
    "definicion": [
      "la ruta"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza",
    "explicacion": "El de pelo blanco es CANO; abraza la nota MI y queda CA·MI·NO, la ruta."
  },
  {
    "pista": "Se levanta para brindar en lo alto del árbol",
    "respuesta": "COPA",
    "definicion": [
      "Se levanta para brindar",
      "lo alto del árbol"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La COPA se levanta para brindar y también es lo alto del árbol."
  },
  {
    "pista": "Fe y anillo para un novio poco agraciado",
    "respuesta": "FEO",
    "definicion": [
      "poco agraciado"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "FE y un anillo, que por su forma es la O. FE + O = FEO, poco agraciado."
  },
  {
    "pista": "Lo que capta la señal se sumerge en un gigante nadador",
    "respuesta": "ANTENA",
    "definicion": [
      "Lo que capta la señal"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se sumerge en",
    "explicacion": "Sumergida en gigANTE NAdador está ANTENA, lo que capta la señal."
  },
  {
    "pista": "Una nota con los años vividos, falta de compañía",
    "respuesta": "SOLEDAD",
    "definicion": [
      "falta de compañía"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La nota SOL y los años vividos, la EDAD. SOL + EDAD = SOLEDAD, falta de compañía."
  },
  {
    "pista": "La bestia, en retirada, deja una chapa delgada",
    "respuesta": "LAMINA",
    "definicion": [
      "una chapa delgada"
    ],
    "tipo": "Reverso",
    "indicador": "en retirada",
    "explicacion": "La bestia es un ANIMAL; en retirada, al revés, da LÁMINA, una chapa delgada."
  },
  {
    "pista": "Bebida pirata de un crustáceo que se quedó sin cama",
    "respuesta": "RON",
    "definicion": [
      "Bebida pirata"
    ],
    "tipo": "Sustracción",
    "indicador": "se quedó sin",
    "explicacion": "El crustáceo es el CAMARÓN; sin CAMA queda RON, la bebida pirata."
  },
  {
    "pista": "Circula por el tronco la que, según dicen, todo lo sabe",
    "respuesta": "SAVIA",
    "definicion": [
      "Circula por el tronco"
    ],
    "tipo": "Onomatopeya",
    "indicador": "según dicen",
    "explicacion": "La SAVIA circula por el tronco y, dicha en voz alta, suena igual que SABIA, la que todo lo sabe."
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
    "pista": "Un día que guarda cinco, estrella del espectáculo",
    "respuesta": "DIVA",
    "definicion": [
      "estrella del espectáculo"
    ],
    "tipo": "Contenedor",
    "indicador": "que guarda",
    "explicacion": "DÍA guarda la V, cinco en romanos, y queda DI·V·A, la estrella del espectáculo."
  },
  {
    "pista": "Las urbes nocturnas antiguas, en primera fila, ven el satélite",
    "respuesta": "LUNA",
    "definicion": [
      "el satélite"
    ],
    "tipo": "Selector",
    "indicador": "en primera fila",
    "explicacion": "En primera fila de Las Urbes Nocturnas Antiguas van sus iniciales, LUNA, el satélite."
  },
  {
    "pista": "Tiene el pelo de lana y te toma el pulso",
    "respuesta": "MUÑECA",
    "definicion": [
      "Tiene el pelo de lana",
      "te toma el pulso"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La MUÑECA de trapo tiene el pelo de lana, y en la MUÑECA te toman el pulso."
  },
  {
    "pista": "Cines y lío, en plena trifulca, piden mutismo",
    "respuesta": "SILENCIO",
    "definicion": [
      "mutismo"
    ],
    "tipo": "Anagrama",
    "indicador": "en plena trifulca",
    "explicacion": "Las letras de CINES + LÍO, en plena trifulca, forman SILENCIO, mutismo."
  },
  {
    "pista": "Bebe la infusión el rojo de la ensalada",
    "respuesta": "TOMATE",
    "definicion": [
      "el rojo de la ensalada"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Bebe es TOMA y la infusión, un TÉ. TOMA + TE = TOMATE, el rojo de la ensalada."
  },
  {
    "pista": "La vía de Panamá con una nota, sinvergüenza",
    "respuesta": "CANALLA",
    "definicion": [
      "sinvergüenza"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La vía de Panamá es su CANAL, y la nota, LA. CANAL + LA = CANALLA, un sinvergüenza."
  },
  {
    "pista": "Fusil junto a una corriente, donde cuelgan las camisas",
    "respuesta": "ARMARIO",
    "definicion": [
      "donde cuelgan las camisas"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El fusil es un ARMA y la corriente, un RÍO. ARMA + RIO = ARMARIO, donde cuelgan las camisas."
  },
  {
    "pista": "Día de no casarse ni embarcarse, océano con infusiones",
    "respuesta": "MARTES",
    "definicion": [
      "Día de no casarse ni embarcarse"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El océano es el MAR y las infusiones, TÉS. MAR + TES = MARTES, el día en que ni te cases ni te embarques."
  },
  {
    "pista": "Asesina del mar, agazapada por cada ola",
    "respuesta": "ORCA",
    "definicion": [
      "Asesina del mar"
    ],
    "tipo": "Palabra escondida",
    "indicador": "agazapada",
    "explicacion": "Agazapada en pOR CAda está ORCA, la asesina del mar."
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
    "pista": "Amor encabeza la ciudad eterna y deja una fragancia",
    "respuesta": "AROMA",
    "definicion": [
      "una fragancia"
    ],
    "tipo": "Selector + charada",
    "indicador": "encabeza",
    "explicacion": "AMOR encabeza con su A; la ciudad eterna es ROMA. A + ROMA = AROMA, una fragancia."
  },
  {
    "pista": "La pera abraza a cincuenta y nace la joya del mar",
    "respuesta": "PERLA",
    "definicion": [
      "la joya del mar"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza",
    "explicacion": "PERA abraza la L, cincuenta en romanos, y queda PER·L·A, la joya del mar."
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
    "pista": "Segundo puesto para el pez que encabeza la conserva",
    "respuesta": "PLATA",
    "definicion": [
      "Segundo puesto"
    ],
    "tipo": "Selector + charada",
    "indicador": "encabeza",
    "explicacion": "PEZ encabeza con su P la conserva, que viene en LATA. P + LATA = PLATA, el segundo puesto."
  },
  {
    "pista": "Vigila al muerto y aprovecha el viento",
    "respuesta": "VELA",
    "definicion": [
      "Vigila al muerto",
      "aprovecha el viento"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Quien VELA vigila al muerto, y la VELA del barco aprovecha el viento."
  },
  {
    "pista": "Cae de la tormenta y se cuenta en la rueda",
    "respuesta": "RAYO",
    "definicion": [
      "Cae de la tormenta",
      "se cuenta en la rueda"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El RAYO cae de la tormenta y los RAYOS se cuentan en la rueda de la bicicleta."
  },
  {
    "pista": "Un francés antiguo abraza cincuenta y despierta al pueblo",
    "respuesta": "GALLO",
    "definicion": [
      "despierta al pueblo"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza",
    "explicacion": "Un francés antiguo es un GALO; abraza la L, cincuenta en romanos, y queda GA·L·LO, el que despierta al pueblo."
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
    "pista": "Un grito destemplado da el cereal dorado",
    "respuesta": "TRIGO",
    "definicion": [
      "el cereal dorado"
    ],
    "tipo": "Anagrama",
    "indicador": "destemplado",
    "explicacion": "Las letras de GRITO, destempladas, forman TRIGO, el cereal dorado."
  },
  {
    "pista": "La estación de las hojas caídas posa en una foto ñoña",
    "respuesta": "OTOÑO",
    "definicion": [
      "La estación de las hojas caídas"
    ],
    "tipo": "Palabra escondida",
    "indicador": "posa en",
    "explicacion": "Posando en fOTO ÑOña está OTOÑO, la estación de las hojas caídas."
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
    "pista": "Barro del río con norte, la fruta más ácida",
    "respuesta": "LIMON",
    "definicion": [
      "la fruta más ácida"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El barro del río es el LIMO; con la N del norte queda LIMÓN, la fruta más ácida."
  },
  {
    "pista": "Pieza de barro y una nota, techo de la casa",
    "respuesta": "TEJADO",
    "definicion": [
      "techo de la casa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La pieza de barro es una TEJA y la nota, DO. TEJA + DO = TEJADO, el techo de la casa."
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
    "pista": "Algo, tras la tormenta, es agua tranquila",
    "respuesta": "LAGO",
    "definicion": [
      "agua tranquila"
    ],
    "tipo": "Anagrama",
    "indicador": "tras la tormenta",
    "explicacion": "Las letras de ALGO, tras la tormenta, forman LAGO, agua tranquila."
  },
  {
    "pista": "Lo mío con él endulza el té",
    "respuesta": "MIEL",
    "definicion": [
      "endulza el té"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Lo mío es MI; con ÉL queda MIEL, que endulza el té."
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
    "pista": "El espíritu descansa en la calma",
    "respuesta": "ALMA",
    "definicion": [
      "El espíritu"
    ],
    "tipo": "Palabra escondida",
    "indicador": "descansa en",
    "explicacion": "En cALMA descansa ALMA, el espíritu."
  },
  {
    "pista": "La orilla se niega en la estación del calor",
    "respuesta": "VERANO",
    "definicion": [
      "la estación del calor"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La orilla es la VERA y negarse es decir NO. VERA + NO = VERANO, la estación del calor."
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
    "pista": "Cae el telón, torcido y pausado",
    "respuesta": "LENTO",
    "definicion": [
      "pausado"
    ],
    "tipo": "Anagrama",
    "indicador": "torcido",
    "explicacion": "Las letras de TELÓN, torcidas, forman LENTO, pausado."
  },
  {
    "pista": "Sal y usted, en corto, brindan por el bienestar",
    "respuesta": "SALUD",
    "definicion": [
      "el bienestar"
    ],
    "tipo": "Misceláneas",
    "indicador": "en corto",
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
    "pista": "Religiosa salida de un jamón mal cortado",
    "respuesta": "MONJA",
    "definicion": [
      "Religiosa"
    ],
    "tipo": "Anagrama",
    "indicador": "mal cortado",
    "explicacion": "Las letras de JAMÓN, mal cortadas, forman MONJA, una religiosa."
  },
  {
    "pista": "El que gruñe en la pocilga tiene un credo herético",
    "respuesta": "CERDO",
    "definicion": [
      "El que gruñe en la pocilga"
    ],
    "tipo": "Anagrama",
    "indicador": "herético",
    "explicacion": "Las letras de CREDO, en versión herética, forman CERDO, el que gruñe en la pocilga."
  },
  {
    "pista": "Tras un careo acalorado queda el metal templado",
    "respuesta": "ACERO",
    "definicion": [
      "el metal templado"
    ],
    "tipo": "Anagrama",
    "indicador": "acalorado",
    "explicacion": "Las letras de CAREO, acaloradas, forman ACERO, el metal templado."
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
    "pista": "Noel, perdido, es el que ruge en la sabana",
    "respuesta": "LEON",
    "definicion": [
      "el que ruge en la sabana"
    ],
    "tipo": "Anagrama",
    "indicador": "perdido",
    "explicacion": "Las letras de NOEL, perdidas, forman LEÓN, el que ruge en la sabana."
  },
  {
    "pista": "Mira, distraída, el eco del verso",
    "respuesta": "RIMA",
    "definicion": [
      "el eco del verso"
    ],
    "tipo": "Anagrama",
    "indicador": "distraída",
    "explicacion": "Las letras de MIRA, distraídas, forman RIMA, el eco del verso."
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
    "pista": "Termina mal lo que no es verdad",
    "respuesta": "MENTIRA",
    "definicion": [
      "lo que no es verdad"
    ],
    "tipo": "Anagrama",
    "indicador": "mal",
    "explicacion": "TERMINA, mal ordenado, da MENTIRA, lo que no es verdad."
  },
  {
    "pista": "El mero, enredado, es la pala del bote",
    "respuesta": "REMO",
    "definicion": [
      "la pala del bote"
    ],
    "tipo": "Anagrama",
    "indicador": "enredado",
    "explicacion": "El MERO, un pez, enredado en sus letras da REMO, la pala del bote."
  },
  {
    "pista": "Nacer, a la parrilla, da lo que se asa",
    "respuesta": "CARNE",
    "definicion": [
      "lo que se asa"
    ],
    "tipo": "Anagrama",
    "indicador": "a la parrilla",
    "explicacion": "Las letras de NACER, a la parrilla, forman CARNE, lo que se asa."
  },
  {
    "pista": "Pardo, despeinado, es un campo verde",
    "respuesta": "PRADO",
    "definicion": [
      "un campo verde"
    ],
    "tipo": "Anagrama",
    "indicador": "despeinado",
    "explicacion": "Las letras de PARDO, despeinadas, forman PRADO, un campo verde."
  },
  {
    "pista": "Un matón confundido, capa del rey",
    "respuesta": "MANTO",
    "definicion": [
      "capa del rey"
    ],
    "tipo": "Anagrama",
    "indicador": "confundido",
    "explicacion": "Las letras de MATÓN, confundidas, forman MANTO, la capa del rey."
  },
  {
    "pista": "Una mora aplastada se vuelve ramillete",
    "respuesta": "RAMO",
    "definicion": [
      "ramillete"
    ],
    "tipo": "Anagrama",
    "indicador": "aplastada",
    "explicacion": "Las letras de MORA, aplastadas, forman RAMO, un ramillete."
  },
  {
    "pista": "Opta por bailar el ave del estanque",
    "respuesta": "PATO",
    "definicion": [
      "el ave del estanque"
    ],
    "tipo": "Anagrama",
    "indicador": "por bailar",
    "explicacion": "Las letras de OPTA, al bailar, forman PATO, el ave del estanque."
  },
  {
    "pista": "Amor o sangre abrazan una flor",
    "respuesta": "ROSA",
    "definicion": [
      "una flor"
    ],
    "tipo": "Palabra escondida",
    "indicador": "abrazan",
    "explicacion": "AmoR O SAngre abrazan a ROSA, una flor."
  },
  {
    "pista": "El océano cabe en el alma rota",
    "respuesta": "MAR",
    "definicion": [
      "El océano"
    ],
    "tipo": "Palabra escondida",
    "indicador": "cabe en",
    "explicacion": "En alMA Rota cabe MAR, el océano."
  },
  {
    "pista": "El astro rey se cuela entre los olivos",
    "respuesta": "SOL",
    "definicion": [
      "El astro rey"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se cuela entre",
    "explicacion": "Entre loS OLivos se cuela SOL, el astro rey."
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
    "pista": "El hogar del pájaro anida en un jardín idolatrado",
    "respuesta": "NIDO",
    "definicion": [
      "El hogar del pájaro"
    ],
    "tipo": "Palabra escondida",
    "indicador": "anida en",
    "explicacion": "En jardíN IDOlatrado anida NIDO, el hogar del pájaro."
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
    "pista": "Un sonido que vuelve se pierde en la tarde cobriza",
    "respuesta": "ECO",
    "definicion": [
      "Un sonido que vuelve"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se pierde en",
    "explicacion": "En tardE COBriza se pierde ECO, el sonido que vuelve."
  },
  {
    "pista": "En el mar, parece, duerme un instrumento de cuerdas",
    "respuesta": "ARPA",
    "definicion": [
      "un instrumento de cuerdas"
    ],
    "tipo": "Palabra escondida",
    "indicador": "duerme",
    "explicacion": "En mAR, PArece duerme ARPA, un instrumento de cuerdas."
  },
  {
    "pista": "La fiera que aúlla viaja en globo",
    "respuesta": "LOBO",
    "definicion": [
      "La fiera que aúlla"
    ],
    "tipo": "Palabra escondida",
    "indicador": "viaja en",
    "explicacion": "En gLOBO viaja LOBO, la fiera que aúlla."
  },
  {
    "pista": "Un ser mágico baila en la dicha danzante",
    "respuesta": "HADA",
    "definicion": [
      "Un ser mágico"
    ],
    "tipo": "Palabra escondida",
    "indicador": "baila en",
    "explicacion": "En dicHA DAnzante baila HADA, un ser mágico."
  },
  {
    "pista": "La bestia del bosque, atrapada en un paso solemne",
    "respuesta": "OSO",
    "definicion": [
      "La bestia del bosque"
    ],
    "tipo": "Palabra escondida",
    "indicador": "atrapada en",
    "explicacion": "Atrapada en pasO SOlemne está OSO, la bestia del bosque."
  },
  {
    "pista": "Una corriente atraviesa el bosque sombrío",
    "respuesta": "RIO",
    "definicion": [
      "Una corriente"
    ],
    "tipo": "Palabra escondida",
    "indicador": "atraviesa",
    "explicacion": "sombRÍO lleva atravesada la palabra RÍO, una corriente."
  },
  {
    "pista": "Un tejido se aloja en el hotel antiguo",
    "respuesta": "TELA",
    "definicion": [
      "Un tejido"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se aloja en",
    "explicacion": "En hoTEL Antiguo se aloja TELA, un tejido."
  },
  {
    "pista": "El dibujo del mundo, en brazos de mamá paciente",
    "respuesta": "MAPA",
    "definicion": [
      "El dibujo del mundo"
    ],
    "tipo": "Palabra escondida",
    "indicador": "en brazos de",
    "explicacion": "En brazos de maMÁ PAciente está MAPA, el dibujo del mundo."
  },
  {
    "pista": "El alimento de cada día repica en la campana",
    "respuesta": "PAN",
    "definicion": [
      "El alimento de cada día"
    ],
    "tipo": "Palabra escondida",
    "indicador": "repica en",
    "explicacion": "En camPANa repica PAN, el alimento de cada día."
  },
  {
    "pista": "El amor, de espaldas, mira la ciudad eterna",
    "respuesta": "ROMA",
    "definicion": [
      "la ciudad eterna"
    ],
    "tipo": "Reverso",
    "indicador": "de espaldas",
    "explicacion": "AMOR de espaldas, al revés, da ROMA, la ciudad eterna."
  },
  {
    "pista": "Ocas reculando hacia la bolsa de arpillera",
    "respuesta": "SACO",
    "definicion": [
      "la bolsa de arpillera"
    ],
    "tipo": "Reverso",
    "indicador": "reculando",
    "explicacion": "OCAS reculando, al revés, da SACO, la bolsa de arpillera."
  },
  {
    "pista": "La rama, puesta del revés, aprende a querer",
    "respuesta": "AMAR",
    "definicion": [
      "querer"
    ],
    "tipo": "Reverso",
    "indicador": "del revés",
    "explicacion": "RAMA del revés da AMAR, querer."
  },
  {
    "pista": "Amarrar a contramano a la que corre por la cloaca",
    "respuesta": "RATA",
    "definicion": [
      "la que corre por la cloaca"
    ],
    "tipo": "Reverso",
    "indicador": "a contramano",
    "explicacion": "Amarrar es ATAR; a contramano, al revés, da RATA, la que corre por la cloaca."
  },
  {
    "pista": "El raso, dado vuelta, se atreve",
    "respuesta": "OSAR",
    "definicion": [
      "se atreve"
    ],
    "tipo": "Reverso",
    "indicador": "dado vuelta",
    "explicacion": "RASO dado vuelta, al revés, da OSAR, atreverse."
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
    "pista": "Pita con el norte en el pecho y llena de color la pared",
    "respuesta": "PINTA",
    "definicion": [
      "llena de color la pared"
    ],
    "tipo": "Contenedor",
    "indicador": "en el pecho",
    "explicacion": "PITA (de pitar) con la N del norte en el pecho da PI·N·TA, lo que hace quien llena de color la pared."
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
    "pista": "Puso cincuenta en el medio y late en la muñeca",
    "respuesta": "PULSO",
    "definicion": [
      "late en la muñeca"
    ],
    "tipo": "Contenedor",
    "indicador": "en el medio",
    "explicacion": "PUSO con la L (cincuenta en romanos) en el medio da PU·L·SO, lo que late en la muñeca."
  },
  {
    "pista": "Cavo hasta enterrar cincuenta y me quedo sin pelo",
    "respuesta": "CALVO",
    "definicion": [
      "sin pelo"
    ],
    "tipo": "Contenedor",
    "indicador": "hasta enterrar",
    "explicacion": "CAVO entierra la L (cincuenta en romanos) y queda CA·L·VO, sin pelo."
  },
  {
    "pista": "Astro y lo que rueda en el cubilete, hombre de uniforme",
    "respuesta": "SOLDADO",
    "definicion": [
      "hombre de uniforme"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "El astro es el SOL y en el cubilete rueda el DADO. SOL + DADO = SOLDADO, hombre de uniforme."
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
    "pista": "La primera de la escala junto al océano amansa al potro",
    "respuesta": "DOMAR",
    "definicion": [
      "amansa al potro"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La primera nota de la escala es DO y el océano, el MAR. DO + MAR = DOMAR, amansar al potro."
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
    "pista": "La segunda nota con un vecino de Astérix, envuelto para el cumpleaños",
    "respuesta": "REGALO",
    "definicion": [
      "envuelto para el cumpleaños"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "La segunda nota es RE y Astérix era GALO. RE + GALO = REGALO, lo que llega envuelto para el cumpleaños."
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
    "pista": "La tarde arranca con oro y embiste la bestia de la plaza",
    "respuesta": "TORO",
    "definicion": [
      "la bestia de la plaza"
    ],
    "tipo": "Selector + charada",
    "indicador": "arranca",
    "explicacion": "La tarde arranca con T; sumada al ORO da TORO, la bestia de la plaza."
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
    "pista": "Te sienta en la plaza y te presta",
    "respuesta": "BANCO",
    "definicion": [
      "Te sienta en la plaza",
      "te presta"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El BANCO de la plaza te sienta y el BANCO te presta dinero."
  },
  {
    "pista": "La degustación recibe al rey y llega por correo",
    "respuesta": "CARTA",
    "definicion": [
      "llega por correo"
    ],
    "tipo": "Contenedor",
    "indicador": "recibe",
    "explicacion": "La degustación es una CATA; recibe la R del rey, como en el ajedrez, y queda CA·R·TA, la que llega por correo."
  },
  {
    "pista": "Corta tablas y se eleva en Córdoba",
    "respuesta": "SIERRA",
    "definicion": [
      "Corta tablas",
      "se eleva en Córdoba"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La SIERRA corta tablas y también se eleva en Córdoba."
  },
  {
    "pista": "Ronronea bajo el auto pinchado",
    "respuesta": "GATO",
    "definicion": [
      "Ronronea",
      "bajo el auto pinchado"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El GATO ronronea, y el GATO es lo que pones bajo el auto pinchado para levantarlo."
  },
  {
    "pista": "El segundo puesto acoge al norte y crece en la maceta",
    "respuesta": "PLANTA",
    "definicion": [
      "crece en la maceta"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "explicacion": "El segundo puesto es la PLATA; acoge la N del norte y queda PLA·N·TA, lo que crece en la maceta."
  },
  {
    "pista": "Se cae del árbol y se escribe por ambas caras",
    "respuesta": "HOJA",
    "definicion": [
      "Se cae del árbol",
      "se escribe por ambas caras"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La HOJA se cae del árbol y la de papel se escribe por ambas caras."
  },
  {
    "pista": "Como el pecado, la ciudad más importante",
    "respuesta": "CAPITAL",
    "definicion": [
      "Como el pecado",
      "la ciudad más importante"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "Un pecado es CAPITAL, y la CAPITAL es la ciudad más importante."
  },
  {
    "pista": "Hueso del brazo que transmite el partido",
    "respuesta": "RADIO",
    "definicion": [
      "Hueso del brazo",
      "transmite el partido"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El RADIO es un hueso del brazo y la RADIO transmite el partido."
  },
  {
    "pista": "Punta de Hornos y rango bajo del cuartel",
    "respuesta": "CABO",
    "definicion": [
      "Punta de Hornos",
      "rango bajo del cuartel"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El CABO de Hornos es una punta de tierra y el CABO es un rango bajo del cuartel."
  },
  {
    "pista": "Oro en Perú, plata en Lima, bronce en Bolivia y la última de Colombia alimentan la linterna",
    "respuesta": "PILA",
    "definicion": [
      "alimentan la linterna"
    ],
    "tipo": "Selector",
    "indicador": "Oro en",
    "explicacion": "Oro, plata y bronce son los puestos 1, 2 y 3. La primera de Perú es P, la segunda de Lima es I, la tercera de Bolivia es L y la última de Colombia es A. PILA, lo que alimenta la linterna."
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
    "pista": "Cobre con radio, el que da misa",
    "respuesta": "CURA",
    "definicion": [
      "el que da misa"
    ],
    "tipo": "Misceláneas",
    "indicador": "",
    "explicacion": "CU es el símbolo del cobre y RA, el del radio. CU + RA = CURA, el que da misa."
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
    "pista": "Lo usa el tucán y también el minero",
    "respuesta": "PICO",
    "definicion": [
      "Lo usa el tucán",
      "el minero"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El tucán usa su PICO y el minero usa el PICO."
  },
  {
    "pista": "Muestra el niño travieso y se aprende en el extranjero",
    "respuesta": "LENGUA",
    "definicion": [
      "Muestra el niño travieso",
      "se aprende en el extranjero"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El niño travieso muestra la LENGUA, y una LENGUA se aprende en el extranjero."
  },
  {
    "pista": "La mueve el perro y se forma en el banco",
    "respuesta": "COLA",
    "definicion": [
      "La mueve el perro",
      "se forma en el banco"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "El perro mueve la COLA, y en el banco se forma una COLA para esperar."
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
    "pista": "La deforestación acoge cincuenta, medida de la ropa",
    "respuesta": "TALLA",
    "definicion": [
      "medida de la ropa"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "explicacion": "La deforestación es la TALA; acoge la L, cincuenta en romanos, y queda TA·L·LA, la medida de la ropa."
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
    "pista": "Cruza el pecho del presidente y toca en el baile",
    "respuesta": "BANDA",
    "definicion": [
      "Cruza el pecho del presidente",
      "toca en el baile"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La BANDA presidencial cruza el pecho del presidente y la BANDA toca en el baile."
  },
  {
    "pista": "Pelo blanco con cincuenta, vía de agua",
    "respuesta": "CANAL",
    "definicion": [
      "vía de agua"
    ],
    "tipo": "Charada",
    "indicador": "",
    "explicacion": "Un pelo blanco es una CANA y cincuenta en romanos es L. CANA + L = CANAL, una vía de agua."
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
    "pista": "Se estrecha al saludar y se da con la brocha",
    "respuesta": "MANO",
    "definicion": [
      "Se estrecha al saludar",
      "se da con la brocha"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "explicacion": "La MANO se estrecha al saludar, y una MANO de pintura se da con la brocha."
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
    "pista": "Late en el pecho de los toros un metal precioso",
    "respuesta": "ORO",
    "definicion": [
      "un metal precioso"
    ],
    "tipo": "Selector",
    "indicador": "en el pecho de",
    "explicacion": "En el pecho de TOROS, sin sus extremos, late ORO, un metal precioso."
  },
  {
    "pista": "Las casas, sin fronteras, dejan la oreja de la taza",
    "respuesta": "ASA",
    "definicion": [
      "la oreja de la taza"
    ],
    "tipo": "Selector",
    "indicador": "sin fronteras",
    "explicacion": "CASAS sin sus fronteras (la primera y la última letra) deja ASA, la oreja de la taza."
  },
  {
    "pista": "Los barcos sin proa ni popa son el arma del arquero",
    "respuesta": "ARCO",
    "definicion": [
      "el arma del arquero"
    ],
    "tipo": "Selector",
    "indicador": "sin proa ni popa",
    "explicacion": "BARCOS sin proa ni popa (la primera y la última letra) deja ARCO, el arma del arquero."
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
    "pista": "El dueño de la casa, en medio de los ramos",
    "respuesta": "AMO",
    "definicion": [
      "El dueño de la casa"
    ],
    "tipo": "Selector",
    "indicador": "en medio de",
    "explicacion": "En medio de RAMOS, sin sus extremos, queda AMO, el dueño de la casa."
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
    "pista": "La prisa, decapitada, estalla en carcajada",
    "respuesta": "RISA",
    "definicion": [
      "carcajada"
    ],
    "tipo": "Sustracción",
    "indicador": "decapitada",
    "explicacion": "PRISA decapitada, sin su primera letra, deja RISA, una carcajada."
  },
  {
    "pista": "La demora, sin preámbulo, madura en la fruta del zarzal",
    "respuesta": "MORA",
    "definicion": [
      "la fruta del zarzal"
    ],
    "tipo": "Sustracción",
    "indicador": "sin preámbulo",
    "explicacion": "DEMORA sin su preámbulo, las dos primeras letras DE, deja MORA, la fruta del zarzal."
  },
  {
    "pista": "La que rompe en la playa saluda por teléfono",
    "respuesta": "OLA",
    "definicion": [
      "La que rompe en la playa"
    ],
    "tipo": "Onomatopeya",
    "indicador": "por teléfono",
    "explicacion": "OLA, la que rompe en la playa, dicha por teléfono suena igual que HOLA, un saludo."
  },
  {
    "pista": "La cacería, de palabra, es el hogar",
    "respuesta": "CAZA",
    "definicion": [
      "La cacería"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de palabra",
    "explicacion": "CAZA, la cacería, dicha de palabra suena igual que CASA, el hogar, cuando se sesea."
  },
  {
    "pista": "Caño que, según el locutor, poseyó",
    "respuesta": "TUBO",
    "definicion": [
      "Caño"
    ],
    "tipo": "Onomatopeya",
    "indicador": "según el locutor",
    "explicacion": "TUBO, un caño, dicho en voz alta suena igual que TUVO, poseyó."
  },
  {
    "pista": "Pelo fino del brazo, hermoso en la radio",
    "respuesta": "VELLO",
    "definicion": [
      "Pelo fino del brazo"
    ],
    "tipo": "Onomatopeya",
    "indicador": "en la radio",
    "explicacion": "VELLO, el pelo fino del brazo, en la radio suena igual que BELLO, hermoso."
  },
  {
    "pista": "Recipiente del agua que, a viva voz, es un órgano del costado",
    "respuesta": "VASO",
    "definicion": [
      "Recipiente del agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "a viva voz",
    "explicacion": "VASO, el recipiente del agua, a viva voz suena igual que BAZO, un órgano del costado, cuando se sesea."
  },
  {
    "pista": "Dicho en voz alta, hacia el continente más extenso",
    "respuesta": "ASIA",
    "definicion": [
      "el continente más extenso"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Dicho en voz alta",
    "explicacion": "ASIA, el continente más extenso, dicho en voz alta suena igual que HACIA."
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
    "pista": "Isla pequeña con la dureza del pie, según cuentan",
    "respuesta": "CAYO",
    "definicion": [
      "Isla pequeña"
    ],
    "tipo": "Onomatopeya",
    "indicador": "según cuentan",
    "explicacion": "CAYO, una isla pequeña, dicho en voz alta suena igual que CALLO, la dureza del pie."
  },
  {
    "pista": "La curva que recorre el agua, de oídas, es profunda",
    "respuesta": "ONDA",
    "definicion": [
      "La curva que recorre el agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de oídas",
    "explicacion": "ONDA, la curva que recorre el agua, de oídas suena igual que HONDA, profunda."
  }
];
