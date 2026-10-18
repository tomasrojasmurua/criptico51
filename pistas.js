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
    "pista": "Lo que va sobre el techo del coche, de oído, da leche",
    "respuesta": "VACA",
    "definicion": [
      "da leche"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de oído",
    "explicacion": "Sobre el techo del coche va la BACA, que de oído suena igual que VACA, la que da leche."
  },
  {
    "pista": "Letras con él, en desorden, brilla de noche",
    "respuesta": "ESTRELLA",
    "definicion": [
      "brilla de noche"
    ],
    "tipo": "Anagrama",
    "indicador": "en desorden",
    "explicacion": "LETRAS + ÉL en desorden forman ESTRELLA, que brilla de noche."
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
    "pista": "Aborrecimiento devuelto, ya escuchado",
    "respuesta": "OIDO",
    "definicion": [
      "escuchado"
    ],
    "tipo": "Reverso",
    "indicador": "devuelto",
    "explicacion": "El aborrecimiento es ODIO; devuelto, al revés, da OÍDO, escuchado."
  },
  {
    "pista": "La cabeza de un bufón sobre una carcajada, apenas viento",
    "respuesta": "BRISA",
    "definicion": [
      "apenas viento"
    ],
    "tipo": "Selector + charada",
    "indicador": "La cabeza de",
    "explicacion": "La cabeza de «bufón» es B y una carcajada es RISA. B + RISA = BRISA, apenas viento."
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
    "pista": "Ruta del viejo de pelo blanco con mi nota dentro",
    "respuesta": "CAMINO",
    "definicion": [
      "Ruta"
    ],
    "tipo": "Contenedor",
    "indicador": "dentro",
    "explicacion": "El de pelo blanco es CANO; con la nota MI dentro queda CA·MI·NO, una ruta."
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
    "pista": "Bestia de vuelta, chapa delgada",
    "respuesta": "LAMINA",
    "definicion": [
      "chapa delgada"
    ],
    "tipo": "Reverso",
    "indicador": "de vuelta",
    "explicacion": "La bestia es un ANIMAL; de vuelta, al revés, da LÁMINA, una chapa delgada."
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
    "pista": "Circula por el tronco y, de oído, todo lo sabe",
    "respuesta": "SAVIA",
    "definicion": [
      "Circula por el tronco"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de oído",
    "explicacion": "La SAVIA circula por el tronco y de oído suena igual que SABIA, la que todo lo sabe."
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
    "pista": "Satélite que asoma al frente de las urbes nocturnas antiguas",
    "respuesta": "LUNA",
    "definicion": [
      "Satélite"
    ],
    "tipo": "Selector",
    "indicador": "al frente de",
    "explicacion": "Al frente de Las Urbes Nocturnas Antiguas están sus iniciales, LUNA, el satélite."
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
    "pista": "Asesina del mar, oculta por cada ola",
    "respuesta": "ORCA",
    "definicion": [
      "Asesina del mar"
    ],
    "tipo": "Palabra escondida",
    "indicador": "oculta",
    "explicacion": "Oculta en pOR CAda está ORCA, la asesina del mar."
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
    "pista": "La primera de amor en la ciudad eterna deja una fragancia",
    "respuesta": "AROMA",
    "definicion": [
      "una fragancia"
    ],
    "tipo": "Selector + charada",
    "indicador": "La primera de",
    "explicacion": "La primera de «amor» es A y la ciudad eterna, ROMA. A + ROMA = AROMA, una fragancia."
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
    "pista": "Segundo puesto, cabeza de pez en la conserva",
    "respuesta": "PLATA",
    "definicion": [
      "Segundo puesto"
    ],
    "tipo": "Selector + charada",
    "indicador": "cabeza de",
    "explicacion": "La cabeza de «pez» es P y la conserva viene en LATA. P + LATA = PLATA, el segundo puesto."
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
    "pista": "Un francés antiguo guarda cincuenta y despierta al pueblo",
    "respuesta": "GALLO",
    "definicion": [
      "despierta al pueblo"
    ],
    "tipo": "Contenedor",
    "indicador": "guarda",
    "explicacion": "Un francés antiguo es un GALO; guarda la L, cincuenta en romanos, y queda GA·L·LO, el que despierta al pueblo."
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
    "pista": "Noel revuelto ruge en la sabana",
    "respuesta": "LEON",
    "definicion": [
      "ruge en la sabana"
    ],
    "tipo": "Anagrama",
    "indicador": "revuelto",
    "explicacion": "NOEL revuelto da LEÓN, el que ruge en la sabana."
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
    "pista": "Amarrar, de vuelta, la que corre por la cloaca",
    "respuesta": "RATA",
    "definicion": [
      "la que corre por la cloaca"
    ],
    "tipo": "Reverso",
    "indicador": "de vuelta",
    "explicacion": "Amarrar es ATAR; de vuelta, al revés, da RATA, la que corre por la cloaca."
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
