// Banco de pistas. Una por día a partir de FECHA_INICIO (UTC).
// - respuesta: en mayúsculas, sin tildes (Ñ permitida). Varias palabras separadas por espacio.
// - definicion: fragmentos exactos de la pista que funcionan como definición
// - tipo: mecanismo críptico (ver sección Aprender)
// - indicador: fragmento exacto que señala el mecanismo (opcional)
// - relleno: fragmentos exactos de la pista con las letras o palabras que se manipulan (vacío en dobles definiciones)
// - explicacion: cómo se resuelve
// - dificultad: de 1 (fácil) a 5 (muy difícil); el multijugador filtra por este valor
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
    "relleno": [
      "Papá",
      "la colina"
    ],
    "explicacion": "Papá a medias es PA y la colina, una LOMA. PA + LOMA = PALOMA, la mensajera de la paz.",
    "dificultad": 3
  },
  {
    "pista": "La que da leche se marcha con el calcio",
    "respuesta": "VACA",
    "definicion": [
      "La que da leche"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "se marcha",
      "el calcio"
    ],
    "explicacion": "Se marcha es VA y el calcio, CA. VA + CA = VACA, la que da leche.",
    "dificultad": 3
  },
  {
    "pista": "Letras y él, tras el baile, son la que brilla en la alfombra roja",
    "respuesta": "ESTRELLA",
    "definicion": [
      "la que brilla en la alfombra roja"
    ],
    "tipo": "Anagrama",
    "indicador": "tras el baile",
    "relleno": [
      "Letras y él"
    ],
    "explicacion": "LETRAS + ÉL, tras el baile de sus letras, forman ESTRELLA, la que brilla en la alfombra roja.",
    "dificultad": 2
  },
  {
    "pista": "Repollo que un caracol deja al perder la cara",
    "respuesta": "COL",
    "definicion": [
      "Repollo"
    ],
    "tipo": "Sustracción",
    "indicador": "al perder",
    "relleno": [
      "un caracol",
      "la cara"
    ],
    "explicacion": "CARACOL al perder la CARA deja COL, un repollo.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "La LLAMA arde en la chimenea, y la LLAMA de los Andes escupe.",
    "dificultad": 3
  },
  {
    "pista": "Aborrecimiento en retroceso, ya escuchado",
    "respuesta": "OIDO",
    "definicion": [
      "escuchado"
    ],
    "tipo": "Reverso",
    "indicador": "en retroceso",
    "relleno": [
      "Aborrecimiento"
    ],
    "explicacion": "El aborrecimiento es ODIO; en retroceso, al revés, da OÍDO, escuchado.",
    "dificultad": 4
  },
  {
    "pista": "Apenas viento cuando el bufón encabeza la carcajada",
    "respuesta": "BRISA",
    "definicion": [
      "Apenas viento"
    ],
    "tipo": "Selector + charada",
    "indicador": "encabeza",
    "relleno": [
      "el bufón",
      "la carcajada"
    ],
    "explicacion": "El bufón encabeza con su B la carcajada, RISA. B + RISA = BRISA, apenas viento.",
    "dificultad": 3
  },
  {
    "pista": "Rendido, el casado deja entrar al norte",
    "respuesta": "CANSADO",
    "definicion": [
      "Rendido"
    ],
    "tipo": "Contenedor",
    "indicador": "deja entrar",
    "relleno": [
      "el casado",
      "al norte"
    ],
    "explicacion": "CASADO deja entrar la N del norte y queda CA·N·SADO, rendido.",
    "dificultad": 3
  },
  {
    "pista": "Canta en las rocas la resina derramada",
    "respuesta": "SIRENA",
    "definicion": [
      "Canta en las rocas"
    ],
    "tipo": "Anagrama",
    "indicador": "derramada",
    "relleno": [
      "la resina"
    ],
    "explicacion": "RESINA derramada, con sus letras reordenadas, da SIRENA, la que canta en las rocas.",
    "dificultad": 2
  },
  {
    "pista": "Avanzo a pie por la ruta",
    "respuesta": "CAMINO",
    "definicion": [
      "Avanzo a pie",
      "la ruta"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "Avanzo a pie es CAMINO (de caminar), y un CAMINO es una ruta.",
    "dificultad": 4
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
    "relleno": [],
    "explicacion": "La COPA se levanta para brindar y también es lo alto del árbol.",
    "dificultad": 3
  },
  {
    "pista": "Fe y anillo para un novio poco agraciado",
    "respuesta": "FEO",
    "definicion": [
      "poco agraciado"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Fe",
      "anillo"
    ],
    "explicacion": "FE y un anillo, que por su forma es la O. FE + O = FEO, poco agraciado.",
    "dificultad": 2
  },
  {
    "pista": "Lo que capta la señal se sumerge en un gigante nadador",
    "respuesta": "ANTENA",
    "definicion": [
      "Lo que capta la señal"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se sumerge en",
    "relleno": [
      "un gigante nadador"
    ],
    "explicacion": "Sumergida en gigANTE NAdador está ANTENA, lo que capta la señal.",
    "dificultad": 3
  },
  {
    "pista": "Una nota con los años vividos, falta de compañía",
    "respuesta": "SOLEDAD",
    "definicion": [
      "falta de compañía"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Una nota",
      "los años vividos"
    ],
    "explicacion": "La nota SOL y los años vividos, la EDAD. SOL + EDAD = SOLEDAD, falta de compañía.",
    "dificultad": 3
  },
  {
    "pista": "La bestia, en retirada, deja una chapa delgada",
    "respuesta": "LAMINA",
    "definicion": [
      "una chapa delgada"
    ],
    "tipo": "Reverso",
    "indicador": "en retirada",
    "relleno": [
      "La bestia"
    ],
    "explicacion": "La bestia es un ANIMAL; en retirada, al revés, da LÁMINA, una chapa delgada.",
    "dificultad": 4
  },
  {
    "pista": "Bebida pirata de un crustáceo que se quedó sin cama",
    "respuesta": "RON",
    "definicion": [
      "Bebida pirata"
    ],
    "tipo": "Sustracción",
    "indicador": "se quedó sin",
    "relleno": [
      "un crustáceo",
      "cama"
    ],
    "explicacion": "El crustáceo es el CAMARÓN; sin CAMA queda RON, la bebida pirata.",
    "dificultad": 4
  },
  {
    "pista": "Circula por el tronco la que, según dicen, todo lo sabe",
    "respuesta": "SAVIA",
    "definicion": [
      "Circula por el tronco"
    ],
    "tipo": "Onomatopeya",
    "indicador": "según dicen",
    "relleno": [
      "la que",
      "todo lo sabe"
    ],
    "explicacion": "La SAVIA circula por el tronco y, dicha en voz alta, suena igual que SABIA, la que todo lo sabe.",
    "dificultad": 3
  },
  {
    "pista": "Aun así quedó libre de incautación",
    "respuesta": "SIN EMBARGO",
    "definicion": [
      "Aun así"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "quedó libre de incautación"
    ],
    "explicacion": "«Libre de» es SIN y una incautación es un EMBARGO: SIN EMBARGO, es decir, aun así.",
    "dificultad": 3
  },
  {
    "pista": "Un día que guarda cinco, estrella del espectáculo",
    "respuesta": "DIVA",
    "definicion": [
      "estrella del espectáculo"
    ],
    "tipo": "Contenedor",
    "indicador": "que guarda",
    "relleno": [
      "Un día",
      "cinco"
    ],
    "explicacion": "DÍA guarda la V, cinco en romanos, y queda DI·V·A, la estrella del espectáculo.",
    "dificultad": 4
  },
  {
    "pista": "Las urbes nocturnas antiguas, en primera fila, ven el satélite",
    "respuesta": "LUNA",
    "definicion": [
      "el satélite"
    ],
    "tipo": "Selector",
    "indicador": "en primera fila",
    "relleno": [
      "Las urbes nocturnas antiguas"
    ],
    "explicacion": "En primera fila de Las Urbes Nocturnas Antiguas van sus iniciales, LUNA, el satélite.",
    "dificultad": 4
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
    "relleno": [],
    "explicacion": "La MUÑECA de trapo tiene el pelo de lana, y en la MUÑECA te toman el pulso.",
    "dificultad": 3
  },
  {
    "pista": "Cines y lío, en plena trifulca, piden mutismo",
    "respuesta": "SILENCIO",
    "definicion": [
      "mutismo"
    ],
    "tipo": "Anagrama",
    "indicador": "en plena trifulca",
    "relleno": [
      "Cines y lío"
    ],
    "explicacion": "Las letras de CINES + LÍO, en plena trifulca, forman SILENCIO, mutismo.",
    "dificultad": 2
  },
  {
    "pista": "Bebe la infusión el rojo de la ensalada",
    "respuesta": "TOMATE",
    "definicion": [
      "el rojo de la ensalada"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Bebe",
      "la infusión"
    ],
    "explicacion": "Bebe es TOMA y la infusión, un TÉ. TOMA + TE = TOMATE, el rojo de la ensalada.",
    "dificultad": 3
  },
  {
    "pista": "Perro a lo lejos, sinvergüenza",
    "respuesta": "CANALLA",
    "definicion": [
      "sinvergüenza"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Perro",
      "a lo lejos"
    ],
    "explicacion": "CAN es un perro y a lo lejos es ALLÁ. CAN + ALLA = CANALLA, un sinvergüenza.",
    "dificultad": 4
  },
  {
    "pista": "Fusil junto a una corriente, donde cuelgan las camisas",
    "respuesta": "ARMARIO",
    "definicion": [
      "donde cuelgan las camisas"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Fusil",
      "una corriente"
    ],
    "explicacion": "El fusil es un ARMA y la corriente, un RÍO. ARMA + RIO = ARMARIO, donde cuelgan las camisas.",
    "dificultad": 3
  },
  {
    "pista": "Día de no casarse ni embarcarse, océano con infusiones",
    "respuesta": "MARTES",
    "definicion": [
      "Día de no casarse ni embarcarse"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "océano",
      "infusiones"
    ],
    "explicacion": "El océano es el MAR y las infusiones, TÉS. MAR + TES = MARTES, el día en que ni te cases ni te embarques.",
    "dificultad": 4
  },
  {
    "pista": "Asesina del mar, agazapada por cada ola",
    "respuesta": "ORCA",
    "definicion": [
      "Asesina del mar"
    ],
    "tipo": "Palabra escondida",
    "indicador": "agazapada",
    "relleno": [
      "por cada ola"
    ],
    "explicacion": "Agazapada en pOR CAda está ORCA, la asesina del mar.",
    "dificultad": 2
  },
  {
    "pista": "Viene en remolino lo que cae blanco del cielo",
    "respuesta": "NIEVE",
    "definicion": [
      "lo que cae blanco del cielo"
    ],
    "tipo": "Anagrama",
    "indicador": "en remolino",
    "relleno": [
      "Viene"
    ],
    "explicacion": "Las letras de VIENE, en remolino, forman NIEVE.",
    "dificultad": 2
  },
  {
    "pista": "Amor encabeza la ciudad eterna y deja una fragancia",
    "respuesta": "AROMA",
    "definicion": [
      "una fragancia"
    ],
    "tipo": "Selector + charada",
    "indicador": "encabeza",
    "relleno": [
      "Amor",
      "la ciudad eterna"
    ],
    "explicacion": "AMOR encabeza con su A; la ciudad eterna es ROMA. A + ROMA = AROMA, una fragancia.",
    "dificultad": 3
  },
  {
    "pista": "La pera abraza a cincuenta y nace la joya del mar",
    "respuesta": "PERLA",
    "definicion": [
      "la joya del mar"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza",
    "relleno": [
      "La pera",
      "cincuenta"
    ],
    "explicacion": "PERA abraza la L, cincuenta en romanos, y queda PER·L·A, la joya del mar.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "CORAL es lo propio del coro y también lo que forma los arrecifes.",
    "dificultad": 2
  },
  {
    "pista": "Segundo puesto para el pez que encabeza la conserva",
    "respuesta": "PLATA",
    "definicion": [
      "Segundo puesto"
    ],
    "tipo": "Selector + charada",
    "indicador": "encabeza",
    "relleno": [
      "el pez",
      "la conserva"
    ],
    "explicacion": "PEZ encabeza con su P la conserva, que viene en LATA. P + LATA = PLATA, el segundo puesto.",
    "dificultad": 4
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
    "relleno": [],
    "explicacion": "Quien VELA vigila al muerto, y la VELA del barco aprovecha el viento.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "El RAYO cae de la tormenta y los RAYOS se cuentan en la rueda de la bicicleta.",
    "dificultad": 2
  },
  {
    "pista": "Canta al amanecer y se le escapa al tenor",
    "respuesta": "GALLO",
    "definicion": [
      "Canta al amanecer",
      "se le escapa al tenor"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El GALLO canta al amanecer, y al tenor que desafina se le escapa un gallo.",
    "dificultad": 4
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
    "relleno": [],
    "explicacion": "Un CAMELLO es un animal del desierto y, en lenguaje coloquial, quien vende droga en la calle.",
    "dificultad": 2
  },
  {
    "pista": "Un grito destemplado da el cereal dorado",
    "respuesta": "TRIGO",
    "definicion": [
      "el cereal dorado"
    ],
    "tipo": "Anagrama",
    "indicador": "destemplado",
    "relleno": [
      "Un grito"
    ],
    "explicacion": "Las letras de GRITO, destempladas, forman TRIGO, el cereal dorado.",
    "dificultad": 2
  },
  {
    "pista": "La estación de las hojas caídas posa en una foto ñoña",
    "respuesta": "OTOÑO",
    "definicion": [
      "La estación de las hojas caídas"
    ],
    "tipo": "Palabra escondida",
    "indicador": "posa en",
    "relleno": [
      "una foto ñoña"
    ],
    "explicacion": "Posando en fOTO ÑOña está OTOÑO, la estación de las hojas caídas.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "La MAREA sube y baja, y algo que «marea» aturde.",
    "dificultad": 2
  },
  {
    "pista": "Barro del río con nitrógeno, la fruta más ácida",
    "respuesta": "LIMON",
    "definicion": [
      "la fruta más ácida"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Barro del río",
      "nitrógeno"
    ],
    "explicacion": "El barro del río es el LIMO y el nitrógeno, N. LIMO + N = LIMON, la fruta más ácida.",
    "dificultad": 3
  },
  {
    "pista": "Pieza de barro y una nota, techo de la casa",
    "respuesta": "TEJADO",
    "definicion": [
      "techo de la casa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Pieza de barro",
      "una nota"
    ],
    "explicacion": "La pieza de barro es una TEJA y la nota, DO. TEJA + DO = TEJADO, el techo de la casa.",
    "dificultad": 3
  },
  {
    "pista": "Un paso en falso y salta el anfibio",
    "respuesta": "SAPO",
    "definicion": [
      "el anfibio"
    ],
    "tipo": "Anagrama",
    "indicador": "en falso",
    "relleno": [
      "Un paso"
    ],
    "explicacion": "Las letras de PASO, puestas «en falso», forman SAPO, un anfibio.",
    "dificultad": 2
  },
  {
    "pista": "Algo, tras la tormenta, es agua tranquila",
    "respuesta": "LAGO",
    "definicion": [
      "agua tranquila"
    ],
    "tipo": "Anagrama",
    "indicador": "tras la tormenta",
    "relleno": [
      "Algo"
    ],
    "explicacion": "Las letras de ALGO, tras la tormenta, forman LAGO, agua tranquila.",
    "dificultad": 2
  },
  {
    "pista": "Lo que endulza el té, doblado en un origami elegante",
    "respuesta": "MIEL",
    "definicion": [
      "Lo que endulza el té"
    ],
    "tipo": "Palabra escondida",
    "indicador": "doblado en",
    "relleno": [
      "un origami elegante"
    ],
    "explicacion": "Doblado en origaMI ELegante está MIEL, lo que endulza el té.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "Un PUENTE cruza el río, y un «puente» festivo alarga el fin de semana.",
    "dificultad": 2
  },
  {
    "pista": "En la calma se esconde el espíritu",
    "respuesta": "ALMA",
    "definicion": [
      "el espíritu"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se esconde",
    "relleno": [
      "la calma"
    ],
    "explicacion": "En cALMA se esconde ALMA, el espíritu.",
    "dificultad": 1
  },
  {
    "pista": "La orilla se niega en la estación del calor",
    "respuesta": "VERANO",
    "definicion": [
      "la estación del calor"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "La orilla",
      "se niega"
    ],
    "explicacion": "La orilla es la VERA y negarse es decir NO. VERA + NO = VERANO, la estación del calor.",
    "dificultad": 3
  },
  {
    "pista": "Heredero del trono que salta entre las olas",
    "respuesta": "DELFIN",
    "definicion": [
      "Heredero del trono",
      "salta entre las olas"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El DELFÍN era el heredero del trono de Francia y también es el cetáceo que salta entre las olas.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "La MANZANA es la fruta prohibida y también el bloque de casas de una cuadra.",
    "dificultad": 2
  },
  {
    "pista": "El telón cae revuelto y pausado",
    "respuesta": "LENTO",
    "definicion": [
      "pausado"
    ],
    "tipo": "Anagrama",
    "indicador": "revuelto",
    "relleno": [
      "El telón"
    ],
    "explicacion": "TELÓN revuelto da LENTO, pausado.",
    "dificultad": 1
  },
  {
    "pista": "Sal y usted, en corto, brindan por el bienestar",
    "respuesta": "SALUD",
    "definicion": [
      "el bienestar"
    ],
    "tipo": "Misceláneas",
    "indicador": "en corto",
    "relleno": [
      "Sal",
      "usted"
    ],
    "explicacion": "SAL + UD (usted abreviado) = SALUD, el bienestar.",
    "dificultad": 2
  },
  {
    "pista": "Arma de arquero junto a parte del ojo pinta el cielo tras la lluvia",
    "respuesta": "ARCO IRIS",
    "definicion": [
      "pinta el cielo tras la lluvia"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Arma de arquero",
      "parte del ojo"
    ],
    "explicacion": "ARCO (arma del arquero) + IRIS (parte del ojo) = ARCO IRIS.",
    "dificultad": 2
  },
  {
    "pista": "Lo que perdía, sin rumbo, se volvió roca",
    "respuesta": "PIEDRA",
    "definicion": [
      "roca"
    ],
    "tipo": "Anagrama",
    "indicador": "sin rumbo",
    "relleno": [
      "Lo que perdía"
    ],
    "explicacion": "Las letras de PERDÍA, sin rumbo, se reordenan en PIEDRA, una roca.",
    "dificultad": 2
  },
  {
    "pista": "Religiosa salida de un jamón mal cortado",
    "respuesta": "MONJA",
    "definicion": [
      "Religiosa"
    ],
    "tipo": "Anagrama",
    "indicador": "mal cortado",
    "relleno": [
      "un jamón"
    ],
    "explicacion": "Las letras de JAMÓN, mal cortadas, forman MONJA, una religiosa.",
    "dificultad": 2
  },
  {
    "pista": "El que gruñe en la pocilga tiene un credo herético",
    "respuesta": "CERDO",
    "definicion": [
      "El que gruñe en la pocilga"
    ],
    "tipo": "Anagrama",
    "indicador": "herético",
    "relleno": [
      "un credo"
    ],
    "explicacion": "Las letras de CREDO, en versión herética, forman CERDO, el que gruñe en la pocilga.",
    "dificultad": 2
  },
  {
    "pista": "Tras un careo acalorado queda el metal templado",
    "respuesta": "ACERO",
    "definicion": [
      "el metal templado"
    ],
    "tipo": "Anagrama",
    "indicador": "acalorado",
    "relleno": [
      "un careo"
    ],
    "explicacion": "Las letras de CAREO, acaloradas, forman ACERO, el metal templado.",
    "dificultad": 2
  },
  {
    "pista": "Un coral se derrite en el bochorno",
    "respuesta": "CALOR",
    "definicion": [
      "el bochorno"
    ],
    "tipo": "Anagrama",
    "indicador": "se derrite",
    "relleno": [
      "Un coral"
    ],
    "explicacion": "CORAL derretido, con sus letras reordenadas, da CALOR, el bochorno.",
    "dificultad": 2
  },
  {
    "pista": "Noel, perdido, es el que ruge en la sabana",
    "respuesta": "LEON",
    "definicion": [
      "el que ruge en la sabana"
    ],
    "tipo": "Anagrama",
    "indicador": "perdido",
    "relleno": [
      "Noel"
    ],
    "explicacion": "Las letras de NOEL, perdidas, forman LEÓN, el que ruge en la sabana.",
    "dificultad": 2
  },
  {
    "pista": "Mira, distraída, el eco del verso",
    "respuesta": "RIMA",
    "definicion": [
      "el eco del verso"
    ],
    "tipo": "Anagrama",
    "indicador": "distraída",
    "relleno": [
      "Mira"
    ],
    "explicacion": "Las letras de MIRA, distraídas, forman RIMA, el eco del verso.",
    "dificultad": 2
  },
  {
    "pista": "Unas bromas torcidas dejan una silueta oscura",
    "respuesta": "SOMBRA",
    "definicion": [
      "una silueta oscura"
    ],
    "tipo": "Anagrama",
    "indicador": "torcidas",
    "relleno": [
      "Unas bromas"
    ],
    "explicacion": "Las letras de BROMAS, torcidas, forman SOMBRA, una silueta oscura.",
    "dificultad": 2
  },
  {
    "pista": "Termina mal lo que no es verdad",
    "respuesta": "MENTIRA",
    "definicion": [
      "lo que no es verdad"
    ],
    "tipo": "Anagrama",
    "indicador": "mal",
    "relleno": [
      "Termina"
    ],
    "explicacion": "TERMINA, mal ordenado, da MENTIRA, lo que no es verdad.",
    "dificultad": 2
  },
  {
    "pista": "El mero, enredado, es la pala del bote",
    "respuesta": "REMO",
    "definicion": [
      "la pala del bote"
    ],
    "tipo": "Anagrama",
    "indicador": "enredado",
    "relleno": [
      "El mero"
    ],
    "explicacion": "El MERO, un pez, enredado en sus letras da REMO, la pala del bote.",
    "dificultad": 2
  },
  {
    "pista": "Nacer, revuelto, da lo que se asa",
    "respuesta": "CARNE",
    "definicion": [
      "lo que se asa"
    ],
    "tipo": "Anagrama",
    "indicador": "revuelto",
    "relleno": [
      "Nacer"
    ],
    "explicacion": "NACER revuelto da CARNE, lo que se asa.",
    "dificultad": 1
  },
  {
    "pista": "Pardo, despeinado, es un campo verde",
    "respuesta": "PRADO",
    "definicion": [
      "un campo verde"
    ],
    "tipo": "Anagrama",
    "indicador": "despeinado",
    "relleno": [
      "Pardo"
    ],
    "explicacion": "Las letras de PARDO, despeinadas, forman PRADO, un campo verde.",
    "dificultad": 2
  },
  {
    "pista": "Un matón confundido, capa del rey",
    "respuesta": "MANTO",
    "definicion": [
      "capa del rey"
    ],
    "tipo": "Anagrama",
    "indicador": "confundido",
    "relleno": [
      "Un matón"
    ],
    "explicacion": "Las letras de MATÓN, confundidas, forman MANTO, la capa del rey.",
    "dificultad": 2
  },
  {
    "pista": "Una mora aplastada se vuelve ramillete",
    "respuesta": "RAMO",
    "definicion": [
      "ramillete"
    ],
    "tipo": "Anagrama",
    "indicador": "aplastada",
    "relleno": [
      "Una mora"
    ],
    "explicacion": "Las letras de MORA, aplastadas, forman RAMO, un ramillete.",
    "dificultad": 2
  },
  {
    "pista": "Opta por bailar el ave del estanque",
    "respuesta": "PATO",
    "definicion": [
      "el ave del estanque"
    ],
    "tipo": "Anagrama",
    "indicador": "por bailar",
    "relleno": [
      "Opta"
    ],
    "explicacion": "Las letras de OPTA, al bailar, forman PATO, el ave del estanque.",
    "dificultad": 2
  },
  {
    "pista": "Amor o sangre abrazan una flor",
    "respuesta": "ROSA",
    "definicion": [
      "una flor"
    ],
    "tipo": "Palabra escondida",
    "indicador": "abrazan",
    "relleno": [
      "Amor o sangre"
    ],
    "explicacion": "AmoR O SAngre abrazan a ROSA, una flor.",
    "dificultad": 2
  },
  {
    "pista": "El océano cabe en el alma rota",
    "respuesta": "MAR",
    "definicion": [
      "El océano"
    ],
    "tipo": "Palabra escondida",
    "indicador": "cabe en",
    "relleno": [
      "el alma rota"
    ],
    "explicacion": "En alMA Rota cabe MAR, el océano.",
    "dificultad": 2
  },
  {
    "pista": "El astro rey se cuela entre los olivos",
    "respuesta": "SOL",
    "definicion": [
      "El astro rey"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se cuela entre",
    "relleno": [
      "los olivos"
    ],
    "explicacion": "Entre loS OLivos se cuela SOL, el astro rey.",
    "dificultad": 2
  },
  {
    "pista": "Anís, lavanda y en medio una tierra rodeada de mar",
    "respuesta": "ISLA",
    "definicion": [
      "una tierra rodeada de mar"
    ],
    "tipo": "Palabra escondida",
    "indicador": "en medio",
    "relleno": [
      "Anís, lavanda"
    ],
    "explicacion": "Entre anÍS LAvanda queda en medio ISLA, una tierra rodeada de mar.",
    "dificultad": 3
  },
  {
    "pista": "El hogar del pájaro anida en un jardín idolatrado",
    "respuesta": "NIDO",
    "definicion": [
      "El hogar del pájaro"
    ],
    "tipo": "Palabra escondida",
    "indicador": "anida en",
    "relleno": [
      "un jardín idolatrado"
    ],
    "explicacion": "En jardíN IDOlatrado anida NIDO, el hogar del pájaro.",
    "dificultad": 3
  },
  {
    "pista": "El faro cansado guarda una piedra",
    "respuesta": "ROCA",
    "definicion": [
      "una piedra"
    ],
    "tipo": "Palabra escondida",
    "indicador": "guarda",
    "relleno": [
      "El faro cansado"
    ],
    "explicacion": "faRO CAnsado guarda ROCA, una piedra.",
    "dificultad": 2
  },
  {
    "pista": "Un sonido que vuelve se pierde en la tarde cobriza",
    "respuesta": "ECO",
    "definicion": [
      "Un sonido que vuelve"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se pierde en",
    "relleno": [
      "la tarde cobriza"
    ],
    "explicacion": "En tardE COBriza se pierde ECO, el sonido que vuelve.",
    "dificultad": 2
  },
  {
    "pista": "En el mar, parece, duerme un instrumento de cuerdas",
    "respuesta": "ARPA",
    "definicion": [
      "un instrumento de cuerdas"
    ],
    "tipo": "Palabra escondida",
    "indicador": "duerme",
    "relleno": [
      "el mar, parece"
    ],
    "explicacion": "En mAR, PArece duerme ARPA, un instrumento de cuerdas.",
    "dificultad": 3
  },
  {
    "pista": "El globo esconde la fiera que aúlla",
    "respuesta": "LOBO",
    "definicion": [
      "la fiera que aúlla"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconde",
    "relleno": [
      "El globo"
    ],
    "explicacion": "GLOBO esconde la palabra LOBO, la fiera que aúlla.",
    "dificultad": 1
  },
  {
    "pista": "Un ser mágico baila en la dicha danzante",
    "respuesta": "HADA",
    "definicion": [
      "Un ser mágico"
    ],
    "tipo": "Palabra escondida",
    "indicador": "baila en",
    "relleno": [
      "la dicha danzante"
    ],
    "explicacion": "En dicHA DAnzante baila HADA, un ser mágico.",
    "dificultad": 2
  },
  {
    "pista": "La bestia del bosque, atrapada en un paso solemne",
    "respuesta": "OSO",
    "definicion": [
      "La bestia del bosque"
    ],
    "tipo": "Palabra escondida",
    "indicador": "atrapada en",
    "relleno": [
      "un paso solemne"
    ],
    "explicacion": "Atrapada en pasO SOlemne está OSO, la bestia del bosque.",
    "dificultad": 2
  },
  {
    "pista": "Una corriente atraviesa el bosque sombrío",
    "respuesta": "RIO",
    "definicion": [
      "Una corriente"
    ],
    "tipo": "Palabra escondida",
    "indicador": "atraviesa",
    "relleno": [
      "el bosque sombrío"
    ],
    "explicacion": "sombRÍO lleva atravesada la palabra RÍO, una corriente.",
    "dificultad": 3
  },
  {
    "pista": "Un tejido se aloja en el hotel antiguo",
    "respuesta": "TELA",
    "definicion": [
      "Un tejido"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se aloja en",
    "relleno": [
      "el hotel antiguo"
    ],
    "explicacion": "En hoTEL Antiguo se aloja TELA, un tejido.",
    "dificultad": 2
  },
  {
    "pista": "El dibujo del mundo, en brazos de mamá paciente",
    "respuesta": "MAPA",
    "definicion": [
      "El dibujo del mundo"
    ],
    "tipo": "Palabra escondida",
    "indicador": "en brazos de",
    "relleno": [
      "mamá paciente"
    ],
    "explicacion": "En brazos de maMÁ PAciente está MAPA, el dibujo del mundo.",
    "dificultad": 3
  },
  {
    "pista": "El alimento de cada día repica en la campana",
    "respuesta": "PAN",
    "definicion": [
      "El alimento de cada día"
    ],
    "tipo": "Palabra escondida",
    "indicador": "repica en",
    "relleno": [
      "la campana"
    ],
    "explicacion": "En camPANa repica PAN, el alimento de cada día.",
    "dificultad": 2
  },
  {
    "pista": "El amor, de espaldas, mira la ciudad eterna",
    "respuesta": "ROMA",
    "definicion": [
      "la ciudad eterna"
    ],
    "tipo": "Reverso",
    "indicador": "de espaldas",
    "relleno": [
      "El amor"
    ],
    "explicacion": "AMOR de espaldas, al revés, da ROMA, la ciudad eterna.",
    "dificultad": 2
  },
  {
    "pista": "Prenda elegante agazapada en camisa cosida",
    "respuesta": "SACO",
    "definicion": [
      "Prenda elegante"
    ],
    "tipo": "Palabra escondida",
    "indicador": "agazapada en",
    "relleno": [
      "camisa cosida"
    ],
    "explicacion": "Agazapada en camiSA COsida está SACO, una prenda elegante.",
    "dificultad": 2
  },
  {
    "pista": "La rama, puesta del revés, aprende a querer",
    "respuesta": "AMAR",
    "definicion": [
      "querer"
    ],
    "tipo": "Reverso",
    "indicador": "del revés",
    "relleno": [
      "La rama"
    ],
    "explicacion": "RAMA del revés da AMAR, querer.",
    "dificultad": 2
  },
  {
    "pista": "Atar de vuelta al roedor",
    "respuesta": "RATA",
    "definicion": [
      "roedor"
    ],
    "tipo": "Reverso",
    "indicador": "de vuelta",
    "relleno": [
      "Atar"
    ],
    "explicacion": "ATAR de vuelta, al revés, da RATA, un roedor.",
    "dificultad": 1
  },
  {
    "pista": "El raso, dado vuelta, se atreve",
    "respuesta": "OSAR",
    "definicion": [
      "se atreve"
    ],
    "tipo": "Reverso",
    "indicador": "dado vuelta",
    "relleno": [
      "El raso"
    ],
    "explicacion": "RASO dado vuelta, al revés, da OSAR, atreverse.",
    "dificultad": 2
  },
  {
    "pista": "Adán retrocede hasta el vacío",
    "respuesta": "NADA",
    "definicion": [
      "el vacío"
    ],
    "tipo": "Reverso",
    "indicador": "retrocede",
    "relleno": [
      "Adán"
    ],
    "explicacion": "ADÁN leído hacia atrás da NADA, el vacío.",
    "dificultad": 2
  },
  {
    "pista": "Eva mira hacia atrás y es pájaro",
    "respuesta": "AVE",
    "definicion": [
      "pájaro"
    ],
    "tipo": "Reverso",
    "indicador": "mira hacia atrás",
    "relleno": [
      "Eva"
    ],
    "explicacion": "EVA al revés da AVE, un pájaro.",
    "dificultad": 2
  },
  {
    "pista": "Que cabalgue por la montaña",
    "respuesta": "MONTE",
    "definicion": [
      "Que cabalgue",
      "la montaña"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "Que cabalgue es que MONTE, y un MONTE es una montaña.",
    "dificultad": 4
  },
  {
    "pista": "Abriga la cama y vuela bajo el mar",
    "respuesta": "MANTA",
    "definicion": [
      "Abriga la cama",
      "vuela bajo el mar"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La MANTA abriga la cama, y la manta raya vuela bajo el mar.",
    "dificultad": 3
  },
  {
    "pista": "Nades en zigzag por un camino estrecho",
    "respuesta": "SENDA",
    "definicion": [
      "un camino estrecho"
    ],
    "tipo": "Anagrama",
    "indicador": "en zigzag",
    "relleno": [
      "Nades"
    ],
    "explicacion": "NADES en zigzag (desordenado) da SENDA, un camino estrecho.",
    "dificultad": 3
  },
  {
    "pista": "El mudo acoge al norte y gira el planeta",
    "respuesta": "MUNDO",
    "definicion": [
      "el planeta"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "relleno": [
      "El mudo",
      "al norte"
    ],
    "explicacion": "MUDO acoge la N del norte y queda MU·N·DO, el planeta.",
    "dificultad": 3
  },
  {
    "pista": "El árbol de la resina asoma en un paisaje alpino",
    "respuesta": "PINO",
    "definicion": [
      "El árbol de la resina"
    ],
    "tipo": "Palabra escondida",
    "indicador": "asoma en",
    "relleno": [
      "un paisaje alpino"
    ],
    "explicacion": "Asoma en alPINO el PINO, el árbol de la resina.",
    "dificultad": 2
  },
  {
    "pista": "Pita con el norte en el pecho y llena de color la pared",
    "respuesta": "PINTA",
    "definicion": [
      "llena de color la pared"
    ],
    "tipo": "Contenedor",
    "indicador": "en el pecho",
    "relleno": [
      "Pita",
      "el norte"
    ],
    "explicacion": "PITA (de pitar) con la N del norte en el pecho da PI·N·TA, lo que hace quien llena de color la pared.",
    "dificultad": 3
  },
  {
    "pista": "Lo tosco se traga al uno y resuena el estrépito",
    "respuesta": "RUIDO",
    "definicion": [
      "el estrépito"
    ],
    "tipo": "Contenedor",
    "indicador": "se traga",
    "relleno": [
      "Lo tosco",
      "al uno"
    ],
    "explicacion": "Lo tosco es RUDO; se traga la I, el uno romano, y queda RU·I·DO, el estrépito.",
    "dificultad": 4
  },
  {
    "pista": "Late en la muñeca y se gana sobre la mesa",
    "respuesta": "PULSO",
    "definicion": [
      "Late en la muñeca",
      "se gana sobre la mesa"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El PULSO late en la muñeca, y un pulso es el duelo de brazos que se gana sobre la mesa.",
    "dificultad": 4
  },
  {
    "pista": "Cavo hasta enterrar cincuenta y me quedo sin pelo",
    "respuesta": "CALVO",
    "definicion": [
      "sin pelo"
    ],
    "tipo": "Contenedor",
    "indicador": "hasta enterrar",
    "relleno": [
      "Cavo",
      "cincuenta"
    ],
    "explicacion": "CAVO entierra la L (cincuenta en romanos) y queda CA·L·VO, sin pelo.",
    "dificultad": 4
  },
  {
    "pista": "Astro y lo que rueda en el cubilete, hombre de uniforme",
    "respuesta": "SOLDADO",
    "definicion": [
      "hombre de uniforme"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Astro",
      "lo que rueda en el cubilete"
    ],
    "explicacion": "El astro es el SOL y en el cubilete rueda el DADO. SOL + DADO = SOLDADO, hombre de uniforme.",
    "dificultad": 3
  },
  {
    "pista": "Recorrido del músico con moneda peruana, la flor que busca la luz",
    "respuesta": "GIRASOL",
    "definicion": [
      "la flor que busca la luz"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Recorrido del músico",
      "moneda peruana"
    ],
    "explicacion": "El recorrido de un músico es una GIRA y la moneda peruana, el SOL. GIRA + SOL = GIRASOL, la flor que busca la luz.",
    "dificultad": 4
  },
  {
    "pista": "Un número irracional y un roedor forman al corsario",
    "respuesta": "PIRATA",
    "definicion": [
      "al corsario"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Un número irracional",
      "un roedor"
    ],
    "explicacion": "PI es el número irracional del círculo y el roedor es una RATA. PI + RATA = PIRATA, un corsario.",
    "dificultad": 3
  },
  {
    "pista": "Le teme al gato y lo arrastras por el escritorio",
    "respuesta": "RATON",
    "definicion": [
      "Le teme al gato",
      "lo arrastras por el escritorio"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El RATÓN le teme al gato, y el ratón de la computadora se arrastra por el escritorio.",
    "dificultad": 3
  },
  {
    "pista": "Rostro con repollo lleva la casa a cuestas",
    "respuesta": "CARACOL",
    "definicion": [
      "lleva la casa a cuestas"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Rostro",
      "repollo"
    ],
    "explicacion": "El rostro es la CARA y el repollo, la COL. CARA + COL = CARACOL, que lleva la casa a cuestas.",
    "dificultad": 3
  },
  {
    "pista": "Repollo y mineral en bruto, hogar de las abejas",
    "respuesta": "COLMENA",
    "definicion": [
      "hogar de las abejas"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Repollo",
      "mineral en bruto"
    ],
    "explicacion": "El repollo es la COL y el mineral en bruto, la MENA. COL + MENA = COLMENA, el hogar de las abejas.",
    "dificultad": 3
  },
  {
    "pista": "El condimento se va y te rescata",
    "respuesta": "SALVA",
    "definicion": [
      "te rescata"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "El condimento",
      "se va"
    ],
    "explicacion": "El condimento es la SAL; se va es VA. SAL + VA = SALVA, te rescata.",
    "dificultad": 2
  },
  {
    "pista": "Pala de la barca con tela fina forma un torbellino",
    "respuesta": "REMOLINO",
    "definicion": [
      "un torbellino"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Pala de la barca",
      "tela fina"
    ],
    "explicacion": "La pala de la barca es el REMO y la tela fina, el LINO. REMO + LINO = REMOLINO, un torbellino.",
    "dificultad": 3
  },
  {
    "pista": "Rodea el cuadro y se pagaba en Berlín",
    "respuesta": "MARCO",
    "definicion": [
      "Rodea el cuadro",
      "se pagaba en Berlín"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El MARCO rodea el cuadro, y el marco era la moneda alemana.",
    "dificultad": 3
  },
  {
    "pista": "Primate que asiente y se adueña",
    "respuesta": "SIMIO",
    "definicion": [
      "Primate"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "asiente",
      "se adueña"
    ],
    "explicacion": "Quien asiente dice SÍ y quien se adueña dice MÍO. SI + MIO = SIMIO, un primate.",
    "dificultad": 3
  },
  {
    "pista": "Amansa al potro con quinientos delante de Omar",
    "respuesta": "DOMAR",
    "definicion": [
      "Amansa al potro"
    ],
    "tipo": "Charada",
    "indicador": "delante de",
    "relleno": [
      "quinientos",
      "Omar"
    ],
    "explicacion": "Quinientos en números romanos es D, delante de OMAR. D + OMAR = DOMAR, amansar al potro.",
    "dificultad": 4
  },
  {
    "pista": "Nota con papel de teatro, un engaño en el póker",
    "respuesta": "FAROL",
    "definicion": [
      "un engaño en el póker"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Nota",
      "papel de teatro"
    ],
    "explicacion": "La nota FA y el papel de teatro, el ROL. FA + ROL = FAROL, un engaño en el póker.",
    "dificultad": 3
  },
  {
    "pista": "La res está acá, recuerdo amargo de la fiesta",
    "respuesta": "RESACA",
    "definicion": [
      "recuerdo amargo de la fiesta"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "La res",
      "está acá"
    ],
    "explicacion": "RES + ACÁ = RESACA, el recuerdo amargo de la fiesta.",
    "dificultad": 3
  },
  {
    "pista": "La segunda nota con un vecino de Astérix, envuelto para el cumpleaños",
    "respuesta": "REGALO",
    "definicion": [
      "envuelto para el cumpleaños"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "La segunda nota",
      "un vecino de Astérix"
    ],
    "explicacion": "La segunda nota es RE y Astérix era GALO. RE + GALO = REGALO, lo que llega envuelto para el cumpleaños.",
    "dificultad": 4
  },
  {
    "pista": "Brinca sierras el insecto verde del prado",
    "respuesta": "SALTAMONTES",
    "definicion": [
      "el insecto verde del prado"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Brinca",
      "sierras"
    ],
    "explicacion": "Brinca es SALTA y las sierras son MONTES. SALTA + MONTES = SALTAMONTES, el insecto verde del prado.",
    "dificultad": 2
  },
  {
    "pista": "Araña los firmamentos la torre de la ciudad",
    "respuesta": "RASCACIELOS",
    "definicion": [
      "la torre de la ciudad"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Araña",
      "los firmamentos"
    ],
    "explicacion": "Araña es RASCA y los firmamentos son los CIELOS. RASCA + CIELOS = RASCACIELOS, la torre de la ciudad.",
    "dificultad": 2
  },
  {
    "pista": "Cruza el clima y queda un entretenimiento",
    "respuesta": "PASATIEMPO",
    "definicion": [
      "un entretenimiento"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Cruza",
      "el clima"
    ],
    "explicacion": "Cruza es PASA y el clima es el TIEMPO. PASA + TIEMPO = PASATIEMPO, un entretenimiento.",
    "dificultad": 3
  },
  {
    "pista": "El océano a la aldea trae un prodigio",
    "respuesta": "MARAVILLA",
    "definicion": [
      "un prodigio"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "El océano",
      "a",
      "la aldea"
    ],
    "explicacion": "El océano es el MAR, luego A, y la aldea es una VILLA. MAR + A + VILLA = MARAVILLA, un prodigio.",
    "dificultad": 3
  },
  {
    "pista": "Detiene a la estrella la sombrilla de playa",
    "respuesta": "PARASOL",
    "definicion": [
      "la sombrilla de playa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Detiene",
      "la estrella"
    ],
    "explicacion": "Detiene es PARA y la estrella, el SOL. PARA + SOL = PARASOL, la sombrilla de playa.",
    "dificultad": 2
  },
  {
    "pista": "Lo malo se va y deja un color violáceo",
    "respuesta": "MALVA",
    "definicion": [
      "un color violáceo"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Lo malo",
      "se va"
    ],
    "explicacion": "Lo malo es el MAL y se va es VA. MAL + VA = MALVA, un color violáceo.",
    "dificultad": 2
  },
  {
    "pista": "Una taberna y el cobalto zarpan en la nave",
    "respuesta": "BARCO",
    "definicion": [
      "la nave"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Una taberna",
      "el cobalto"
    ],
    "explicacion": "La taberna es un BAR y CO es el símbolo del cobalto. BAR + CO = BARCO, la nave.",
    "dificultad": 3
  },
  {
    "pista": "Lanza una negativa el déspota",
    "respuesta": "TIRANO",
    "definicion": [
      "el déspota"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Lanza",
      "una negativa"
    ],
    "explicacion": "Lanza es TIRA y la negativa, NO. TIRA + NO = TIRANO, el déspota.",
    "dificultad": 2
  },
  {
    "pista": "El pescado pierde la ese y queda la falta del confesionario",
    "respuesta": "PECADO",
    "definicion": [
      "la falta del confesionario"
    ],
    "tipo": "Sustracción",
    "indicador": "pierde",
    "relleno": [
      "El pescado",
      "la ese"
    ],
    "explicacion": "PESCADO pierde la ese y queda PECADO, la falta que se cuenta en el confesionario.",
    "dificultad": 3
  },
  {
    "pista": "Guerrero del Olimpo romano que brilla rojizo de noche",
    "respuesta": "MARTE",
    "definicion": [
      "Guerrero del Olimpo romano",
      "brilla rojizo de noche"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "MARTE es el dios romano de la guerra y también el planeta que brilla rojizo de noche.",
    "dificultad": 3
  },
  {
    "pista": "La tarde arranca con oro y embiste la bestia de la plaza",
    "respuesta": "TORO",
    "definicion": [
      "la bestia de la plaza"
    ],
    "tipo": "Selector + charada",
    "indicador": "arranca",
    "relleno": [
      "La tarde",
      "oro"
    ],
    "explicacion": "La tarde arranca con T; sumada al ORO da TORO, la bestia de la plaza.",
    "dificultad": 3
  },
  {
    "pista": "Condición rechazada, el destino",
    "respuesta": "SINO",
    "definicion": [
      "el destino"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Condición",
      "rechazada"
    ],
    "explicacion": "Una condición empieza con SI y rechazar es decir NO. SI + NO = SINO, el destino.",
    "dificultad": 4
  },
  {
    "pista": "Negativa y un saludo porteño traen la oscuridad",
    "respuesta": "NOCHE",
    "definicion": [
      "la oscuridad"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Negativa",
      "un saludo porteño"
    ],
    "explicacion": "La negativa es NO y el saludo porteño, CHE. NO + CHE = NOCHE, la oscuridad.",
    "dificultad": 2
  },
  {
    "pista": "Entregué al querido la piedra más dura",
    "respuesta": "DIAMANTE",
    "definicion": [
      "la piedra más dura"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Entregué",
      "al querido"
    ],
    "explicacion": "Entregué es DI y el querido, un AMANTE. DI + AMANTE = DIAMANTE, la piedra más dura.",
    "dificultad": 3
  },
  {
    "pista": "Un millar y el artículo femenino recorren la medida inglesa",
    "respuesta": "MILLA",
    "definicion": [
      "la medida inglesa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Un millar",
      "el artículo femenino"
    ],
    "explicacion": "Un millar es MIL y el artículo femenino, LA. MIL + LA = MILLA, la medida inglesa.",
    "dificultad": 3
  },
  {
    "pista": "Entregué apenas llegó, celestial",
    "respuesta": "DIVINO",
    "definicion": [
      "celestial"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Entregué",
      "llegó"
    ],
    "explicacion": "Entregué es DI y llegó es VINO (de venir). DI + VINO = DIVINO, celestial.",
    "dificultad": 4
  },
  {
    "pista": "Calcio con un sí y un no, donde se apuesta en la ruleta",
    "respuesta": "CASINO",
    "definicion": [
      "donde se apuesta en la ruleta"
    ],
    "tipo": "Misceláneas",
    "indicador": "",
    "relleno": [
      "Calcio",
      "un sí",
      "un no"
    ],
    "explicacion": "CA es el símbolo del calcio; luego SÍ y NO. CA + SI + NO = CASINO, donde se apuesta en la ruleta.",
    "dificultad": 4
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
    "relleno": [],
    "explicacion": "El BANCO de la plaza te sienta y el BANCO te presta dinero.",
    "dificultad": 2
  },
  {
    "pista": "La degustación recibe al rey y llega por correo",
    "respuesta": "CARTA",
    "definicion": [
      "llega por correo"
    ],
    "tipo": "Contenedor",
    "indicador": "recibe",
    "relleno": [
      "La degustación",
      "al rey"
    ],
    "explicacion": "La degustación es una CATA; recibe la R del rey, como en el ajedrez, y queda CA·R·TA, la que llega por correo.",
    "dificultad": 4
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
    "relleno": [],
    "explicacion": "La SIERRA corta tablas y también se eleva en Córdoba.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "El GATO ronronea, y el GATO es lo que pones bajo el auto pinchado para levantarlo.",
    "dificultad": 2
  },
  {
    "pista": "Crece en la maceta y la pisas al andar",
    "respuesta": "PLANTA",
    "definicion": [
      "Crece en la maceta",
      "la pisas al andar"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La PLANTA crece en la maceta, y con la planta del pie pisas al andar.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "La HOJA se cae del árbol y la de papel se escribe por ambas caras.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "Un pecado es CAPITAL, y la CAPITAL es la ciudad más importante.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "El RADIO es un hueso del brazo y la RADIO transmite el partido.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "El CABO de Hornos es una punta de tierra y el CABO es un rango bajo del cuartel.",
    "dificultad": 2
  },
  {
    "pista": "Oro en Perú, plata en Lima, bronce en Bolivia y la última de Colombia alimentan la linterna",
    "respuesta": "PILA",
    "definicion": [
      "alimentan la linterna"
    ],
    "tipo": "Selector",
    "indicador": "Oro en",
    "relleno": [
      "Perú",
      "Lima",
      "Bolivia",
      "la última de Colombia"
    ],
    "explicacion": "Oro, plata y bronce son los puestos 1, 2 y 3. La primera de Perú es P, la segunda de Lima es I, la tercera de Bolivia es L y la última de Colombia es A. PILA, lo que alimenta la linterna.",
    "dificultad": 4
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
    "relleno": [],
    "explicacion": "LIMA es la capital del Perú y también la herramienta que pule las uñas.",
    "dificultad": 2
  },
  {
    "pista": "Cobre con radio, el que da misa",
    "respuesta": "CURA",
    "definicion": [
      "el que da misa"
    ],
    "tipo": "Misceláneas",
    "indicador": "",
    "relleno": [
      "Cobre",
      "radio"
    ],
    "explicacion": "CU es el símbolo del cobre y RA, el del radio. CU + RA = CURA, el que da misa.",
    "dificultad": 4
  },
  {
    "pista": "Trepa a los árboles y se oye por un solo canal",
    "respuesta": "MONO",
    "definicion": [
      "Trepa a los árboles",
      "se oye por un solo canal"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El MONO trepa a los árboles, y un sonido MONO se oye por un solo canal.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "Un CORTE es una herida de cuchillo y la CORTE es la residencia del rey.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "El SOBRE guarda la carta y «sobre» también significa por encima.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "El MANGO es una fruta tropical y también la parte de la sartén que se agarra.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "El tucán usa su PICO y el minero usa el PICO.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "El niño travieso muestra la LENGUA, y una LENGUA se aprende en el extranjero.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "El perro mueve la COLA, y en el banco se forma una COLA para esperar.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "La RED del pescador y la RED que conecta al mundo.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "La BOTA es un calzado alto y también el recipiente de cuero que guarda vino.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "La FALDA es una prenda y también la ladera del monte.",
    "dificultad": 2
  },
  {
    "pista": "Mide la camisa y se esculpe en madera",
    "respuesta": "TALLA",
    "definicion": [
      "Mide la camisa",
      "se esculpe en madera"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La TALLA mide la camisa, y una talla es una figura esculpida en madera.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "La REGLA es una norma y también el instrumento que traza líneas rectas.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "La PRESA es la víctima del león y también el muro que detiene el río.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "Un MUELLE es un resorte y también el lugar donde atracan los barcos.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "La BANDA presidencial cruza el pecho del presidente y la BANDA toca en el baile.",
    "dificultad": 2
  },
  {
    "pista": "Lo cambias con el control y lo cruzan barcos entre esclusas",
    "respuesta": "CANAL",
    "definicion": [
      "Lo cambias con el control",
      "lo cruzan barcos entre esclusas"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El CANAL de televisión se cambia con el control, y por un canal cruzan barcos entre esclusas.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "La PLUMA viste al ave y también escribe la carta.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "La ESTACIÓN del tren y la ESTACIÓN del año, que dura tres meses.",
    "dificultad": 2
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
    "relleno": [],
    "explicacion": "La MANO se estrecha al saludar, y una MANO de pintura se da con la brocha.",
    "dificultad": 2
  },
  {
    "pista": "Se sirve con salsa y se pone en el cepillo",
    "respuesta": "PASTA",
    "definicion": [
      "Se sirve con salsa",
      "se pone en el cepillo"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La PASTA se sirve con salsa, y la pasta de dientes se pone en el cepillo.",
    "dificultad": 3
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
    "relleno": [],
    "explicacion": "Una CERCA es una valla y «cerca» es lo que no queda lejos.",
    "dificultad": 2
  },
  {
    "pista": "Late en el pecho de los toros un metal precioso",
    "respuesta": "ORO",
    "definicion": [
      "un metal precioso"
    ],
    "tipo": "Selector",
    "indicador": "en el pecho de",
    "relleno": [
      "los toros"
    ],
    "explicacion": "En el pecho de TOROS, sin sus extremos, late ORO, un metal precioso.",
    "dificultad": 3
  },
  {
    "pista": "Las casas, sin fronteras, dejan la oreja de la taza",
    "respuesta": "ASA",
    "definicion": [
      "la oreja de la taza"
    ],
    "tipo": "Selector",
    "indicador": "sin fronteras",
    "relleno": [
      "Las casas"
    ],
    "explicacion": "CASAS sin sus fronteras (la primera y la última letra) deja ASA, la oreja de la taza.",
    "dificultad": 3
  },
  {
    "pista": "Los barcos sin proa ni popa son el arma del arquero",
    "respuesta": "ARCO",
    "definicion": [
      "el arma del arquero"
    ],
    "tipo": "Selector",
    "indicador": "sin proa ni popa",
    "relleno": [
      "Los barcos"
    ],
    "explicacion": "BARCOS sin proa ni popa (la primera y la última letra) deja ARCO, el arma del arquero.",
    "dificultad": 3
  },
  {
    "pista": "En el corazón de las peras late una época",
    "respuesta": "ERA",
    "definicion": [
      "una época"
    ],
    "tipo": "Selector",
    "indicador": "el corazón de",
    "relleno": [
      "las peras"
    ],
    "explicacion": "El corazón de PERAS, sin sus extremos, es ERA, una época.",
    "dificultad": 3
  },
  {
    "pista": "El dueño de la casa, en medio de los ramos",
    "respuesta": "AMO",
    "definicion": [
      "El dueño de la casa"
    ],
    "tipo": "Selector",
    "indicador": "en medio de",
    "relleno": [
      "los ramos"
    ],
    "explicacion": "En medio de RAMOS, sin sus extremos, queda AMO, el dueño de la casa.",
    "dificultad": 3
  },
  {
    "pista": "Al camaleón se le escapa el león y queda donde duermes",
    "respuesta": "CAMA",
    "definicion": [
      "donde duermes"
    ],
    "tipo": "Sustracción",
    "indicador": "se le escapa",
    "relleno": [
      "Al camaleón",
      "el león"
    ],
    "explicacion": "CAMALEÓN sin LEÓN deja CAMA, donde duermes.",
    "dificultad": 3
  },
  {
    "pista": "Lo que camina sale de la piel sin cola",
    "respuesta": "PIE",
    "definicion": [
      "Lo que camina"
    ],
    "tipo": "Sustracción",
    "indicador": "sin cola",
    "relleno": [
      "la piel"
    ],
    "explicacion": "La PIEL sin cola (sin su última letra) queda en PIE, lo que camina.",
    "dificultad": 3
  },
  {
    "pista": "La camisa se desprende del calcio y queda la ceremonia del domingo",
    "respuesta": "MISA",
    "definicion": [
      "la ceremonia del domingo"
    ],
    "tipo": "Sustracción",
    "indicador": "se desprende",
    "relleno": [
      "La camisa",
      "del calcio"
    ],
    "explicacion": "CA es el símbolo del calcio. CAMISA sin CA deja MISA, la ceremonia del domingo.",
    "dificultad": 4
  },
  {
    "pista": "La prisa, decapitada, estalla en carcajada",
    "respuesta": "RISA",
    "definicion": [
      "carcajada"
    ],
    "tipo": "Sustracción",
    "indicador": "decapitada",
    "relleno": [
      "La prisa"
    ],
    "explicacion": "PRISA decapitada, sin su primera letra, deja RISA, una carcajada.",
    "dificultad": 3
  },
  {
    "pista": "La demora, sin preámbulo, madura en la fruta del zarzal",
    "respuesta": "MORA",
    "definicion": [
      "la fruta del zarzal"
    ],
    "tipo": "Sustracción",
    "indicador": "sin preámbulo",
    "relleno": [
      "La demora"
    ],
    "explicacion": "DEMORA sin su preámbulo, las dos primeras letras DE, deja MORA, la fruta del zarzal.",
    "dificultad": 4
  },
  {
    "pista": "La que rompe en la playa saluda por teléfono",
    "respuesta": "OLA",
    "definicion": [
      "La que rompe en la playa"
    ],
    "tipo": "Onomatopeya",
    "indicador": "por teléfono",
    "relleno": [
      "saluda"
    ],
    "explicacion": "OLA, la que rompe en la playa, dicha por teléfono suena igual que HOLA, un saludo.",
    "dificultad": 3
  },
  {
    "pista": "La cacería, de palabra, es el hogar",
    "respuesta": "CAZA",
    "definicion": [
      "La cacería"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de palabra",
    "relleno": [
      "es el hogar"
    ],
    "explicacion": "CAZA, la cacería, dicha de palabra suena igual que CASA, el hogar, cuando se sesea.",
    "dificultad": 3
  },
  {
    "pista": "Caño que, según el locutor, poseyó",
    "respuesta": "TUBO",
    "definicion": [
      "Caño"
    ],
    "tipo": "Onomatopeya",
    "indicador": "según el locutor",
    "relleno": [
      "poseyó"
    ],
    "explicacion": "TUBO, un caño, dicho en voz alta suena igual que TUVO, poseyó.",
    "dificultad": 3
  },
  {
    "pista": "Se escucha hermoso el pelo fino del brazo",
    "respuesta": "VELLO",
    "definicion": [
      "el pelo fino del brazo"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Se escucha",
    "relleno": [
      "hermoso"
    ],
    "explicacion": "VELLO, el pelo fino del brazo, se escucha igual que BELLO, hermoso.",
    "dificultad": 1
  },
  {
    "pista": "Recipiente del agua que, a viva voz, es un órgano del costado",
    "respuesta": "VASO",
    "definicion": [
      "Recipiente del agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "a viva voz",
    "relleno": [
      "es un órgano del costado"
    ],
    "explicacion": "VASO, el recipiente del agua, a viva voz suena igual que BAZO, un órgano del costado, cuando se sesea.",
    "dificultad": 3
  },
  {
    "pista": "Dicho en voz alta, hacia el continente más extenso",
    "respuesta": "ASIA",
    "definicion": [
      "el continente más extenso"
    ],
    "tipo": "Onomatopeya",
    "indicador": "Dicho en voz alta",
    "relleno": [
      "hacia"
    ],
    "explicacion": "ASIA, el continente más extenso, dicho en voz alta suena igual que HACIA.",
    "dificultad": 3
  },
  {
    "pista": "Animal con cuernos que al oído es un esclavo",
    "respuesta": "CIERVO",
    "definicion": [
      "Animal con cuernos"
    ],
    "tipo": "Onomatopeya",
    "indicador": "al oído",
    "relleno": [
      "es un esclavo"
    ],
    "explicacion": "CIERVO, animal con cuernos, suena igual que SIERVO, un esclavo, cuando se sesea.",
    "dificultad": 3
  },
  {
    "pista": "Isla pequeña que suena a dureza del pie",
    "respuesta": "CAYO",
    "definicion": [
      "Isla pequeña"
    ],
    "tipo": "Onomatopeya",
    "indicador": "suena a",
    "relleno": [
      "dureza del pie"
    ],
    "explicacion": "CAYO, una isla pequeña, suena igual que CALLO, la dureza del pie.",
    "dificultad": 1
  },
  {
    "pista": "La curva que recorre el agua, de oídas, es profunda",
    "respuesta": "ONDA",
    "definicion": [
      "La curva que recorre el agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de oídas",
    "relleno": [
      "es profunda"
    ],
    "explicacion": "ONDA, la curva que recorre el agua, de oídas suena igual que HONDA, profunda.",
    "dificultad": 3
  },
  {
    "pista": "Uña peligrosa, pie parásito",
    "respuesta": "GARRAPATA",
    "definicion": [
      "parásito"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Uña peligrosa",
      "pie"
    ],
    "explicacion": "La uña peligrosa es la GARRA y el pie del animal, la PATA. GARRA + PATA = GARRAPATA, un parásito.",
    "dificultad": 3
  },
  {
    "pista": "Infusión al sur del metal precioso, lo que entierra el pirata",
    "respuesta": "TESORO",
    "definicion": [
      "lo que entierra el pirata"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Infusión",
      "al sur",
      "del metal precioso"
    ],
    "explicacion": "La infusión es el TÉ, el sur es S y el metal precioso, ORO. TE + S + ORO = TESORO, lo que entierra el pirata.",
    "dificultad": 4
  },
  {
    "pista": "Cien junto al oso, no soporta rivales en el amor",
    "respuesta": "CELOSO",
    "definicion": [
      "no soporta rivales en el amor"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Cien",
      "al oso"
    ],
    "explicacion": "Cien en números romanos es C, y junto al oso queda EL OSO. C + EL + OSO = CELOSO, el que no soporta rivales en el amor.",
    "dificultad": 4
  },
  {
    "pista": "Un millar en el campo obra el prodigio",
    "respuesta": "MILAGRO",
    "definicion": [
      "el prodigio"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Un millar",
      "el campo"
    ],
    "explicacion": "Un millar es MIL y el campo, AGRO (como en agricultura). MIL + AGRO = MILAGRO, un prodigio.",
    "dificultad": 4
  },
  {
    "pista": "La sirena pierde el sur y, alborotada, gobierna",
    "respuesta": "REINA",
    "definicion": [
      "gobierna"
    ],
    "tipo": "Misceláneas",
    "indicador": "alborotada",
    "relleno": [
      "La sirena",
      "el sur"
    ],
    "explicacion": "SIRENA sin el sur (S) queda IRENA, y alborotada se ordena como REINA, la que gobierna.",
    "dificultad": 5
  },
  {
    "pista": "Objeción sin cola y que fume, una fragancia de frasco",
    "respuesta": "PERFUME",
    "definicion": [
      "una fragancia de frasco"
    ],
    "tipo": "Misceláneas",
    "indicador": "sin cola",
    "relleno": [
      "Objeción",
      "que fume"
    ],
    "explicacion": "La objeción es un PERO, que sin cola queda PER. Con FUME da PERFUME, una fragancia de frasco.",
    "dificultad": 5
  },
  {
    "pista": "Campo sin cola ante una eternidad geológica, levanta la copa",
    "respuesta": "CAMPEON",
    "definicion": [
      "levanta la copa"
    ],
    "tipo": "Misceláneas",
    "indicador": "sin cola",
    "relleno": [
      "Campo",
      "una eternidad geológica"
    ],
    "explicacion": "El CAMPO sin cola es CAMP y una eternidad geológica, un EÓN. CAMP + EON = CAMPEON, el que levanta la copa.",
    "dificultad": 5
  },
  {
    "pista": "Toro sin rabo masca la hierba del mojito y se viene el temporal",
    "respuesta": "TORMENTA",
    "definicion": [
      "el temporal"
    ],
    "tipo": "Misceláneas",
    "indicador": "sin rabo",
    "relleno": [
      "Toro",
      "la hierba del mojito"
    ],
    "explicacion": "El TORO sin rabo queda TOR y la hierba del mojito es la MENTA. TOR + MENTA = TORMENTA, el temporal.",
    "dificultad": 5
  },
  {
    "pista": "La espalda pierde cincuenta y se desenvaina en el duelo",
    "respuesta": "ESPADA",
    "definicion": [
      "se desenvaina en el duelo"
    ],
    "tipo": "Sustracción",
    "indicador": "pierde",
    "relleno": [
      "La espalda",
      "cincuenta"
    ],
    "explicacion": "ESPALDA pierde cincuenta (L en números romanos) y queda ESPADA, que se desenvaina en el duelo.",
    "dificultad": 4
  },
  {
    "pista": "Liquidación con sodio, por ella entra la luz",
    "respuesta": "VENTANA",
    "definicion": [
      "por ella entra la luz"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Liquidación",
      "sodio"
    ],
    "explicacion": "Una liquidación es una VENTA y el sodio, NA. VENTA + NA = VENTANA, por donde entra la luz.",
    "dificultad": 4
  },
  {
    "pista": "Hierro junto a un brazo de mar, fiesta con puestos",
    "respuesta": "FERIA",
    "definicion": [
      "fiesta con puestos"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Hierro",
      "un brazo de mar"
    ],
    "explicacion": "El hierro es FE y un brazo de mar, una RÍA. FE + RIA = FERIA, una fiesta con puestos.",
    "dificultad": 4
  },
  {
    "pista": "Al oeste del asunto se apaga el día",
    "respuesta": "OCASO",
    "definicion": [
      "se apaga el día"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Al oeste",
      "del asunto"
    ],
    "explicacion": "El oeste es O y el asunto, un CASO. O + CASO = OCASO, cuando se apaga el día.",
    "dificultad": 4
  },
  {
    "pista": "Coro con sodio sobre la cabeza del rey",
    "respuesta": "CORONA",
    "definicion": [
      "sobre la cabeza del rey"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Coro",
      "sodio"
    ],
    "explicacion": "El CORO con el sodio, NA, da CORONA, lo que va sobre la cabeza del rey.",
    "dificultad": 4
  },
  {
    "pista": "Lo sana y aun así es un disparate",
    "respuesta": "LOCURA",
    "definicion": [
      "un disparate"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Lo sana"
    ],
    "explicacion": "Lo sana se dice LO CURA. LO + CURA = LOCURA, un disparate.",
    "dificultad": 4
  },
  {
    "pista": "Sodio, la existencia y quinientos se festejan en diciembre",
    "respuesta": "NAVIDAD",
    "definicion": [
      "se festejan en diciembre"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Sodio",
      "la existencia",
      "quinientos"
    ],
    "explicacion": "El sodio es NA, la existencia es la VIDA y quinientos en números romanos, D. NA + VIDA + D = NAVIDAD, que se festeja en diciembre.",
    "dificultad": 5
  },
  {
    "pista": "Pan sin cola y cabello liso, donde vive el rey",
    "respuesta": "PALACIO",
    "definicion": [
      "donde vive el rey"
    ],
    "tipo": "Misceláneas",
    "indicador": "sin cola",
    "relleno": [
      "Pan",
      "cabello liso"
    ],
    "explicacion": "El PAN sin cola es PA y el cabello liso es LACIO. PA + LACIO = PALACIO, donde vive el rey.",
    "dificultad": 5
  },
  {
    "pista": "Un semidiós se queda los pies de la noche y, con corazón de era, alienta hacia Barcelona",
    "respuesta": "HERCULES",
    "definicion": [
      "Un semidiós"
    ],
    "tipo": "Selector + charada",
    "indicador": "los pies de",
    "relleno": [
      "la noche",
      "era",
      "alienta hacia Barcelona"
    ],
    "explicacion": "Los pies de la NOCHE son HE, el corazón de ERA es R y los que alientan al Barcelona son los CULÉS. HE + R + CULES = HERCULES, un semidiós.",
    "dificultad": 5
  },
  {
    "pista": "Lecho del que se duerme y se lo lleva la corriente, cuando suelta el trago pirata",
    "respuesta": "CAMA",
    "definicion": [
      "Lecho"
    ],
    "tipo": "Sustracción",
    "indicador": "suelta",
    "relleno": [
      "del que se duerme y se lo lleva la corriente",
      "el trago pirata"
    ],
    "explicacion": "El que se duerme y se lo lleva la corriente es el CAMARÓN. Si suelta el trago pirata, el RON, queda CAMA, el lecho.",
    "dificultad": 3
  },
  {
    "pista": "Lo que se pierde por ir a Melipilla, desarmado, da flores moradas",
    "respuesta": "LILAS",
    "definicion": [
      "flores moradas"
    ],
    "tipo": "Anagrama",
    "indicador": "desarmado",
    "relleno": [
      "Lo que se pierde por ir a Melipilla"
    ],
    "explicacion": "Quien se fue a Melipilla perdió su SILLA. Desarmada, con sus letras reordenadas, da LILAS, flores moradas.",
    "dificultad": 4
  },
  {
    "pista": "Ser que sobra al restar mi entrega de lo que no se mira en un obsequio con crines",
    "respuesta": "ENTE",
    "definicion": [
      "Ser"
    ],
    "tipo": "Sustracción",
    "indicador": "al restar",
    "relleno": [
      "mi entrega",
      "lo que no se mira en un obsequio con crines"
    ],
    "explicacion": "A caballo regalado no se le mira el DIENTE. Al restar mi entrega, DI, queda ENTE, un ser.",
    "dificultad": 4
  },
  {
    "pista": "Más vale uno en mano que cien volando; queda heno si suelta el oro descabezado",
    "respuesta": "PAJA",
    "definicion": [
      "heno"
    ],
    "tipo": "Sustracción",
    "indicador": "suelta",
    "relleno": [
      "Más vale uno en mano que cien volando",
      "el oro descabezado"
    ],
    "explicacion": "El que vale más en mano que cien volando es el PÁJARO. Si suelta el oro descabezado, RO, queda PAJA, heno.",
    "dificultad": 3
  },
  {
    "pista": "Sin embargo, el que ladra y no muerde pierde a su rey",
    "respuesta": "PERO",
    "definicion": [
      "Sin embargo"
    ],
    "tipo": "Sustracción",
    "indicador": "pierde",
    "relleno": [
      "el que ladra y no muerde",
      "su rey"
    ],
    "explicacion": "El que ladra y no muerde es el PERRO. Si pierde a su rey, la R, queda PERO, sin embargo.",
    "dificultad": 3
  },
  {
    "pista": "Lo crías y te saca los ojos; con cinco menos, es puro pellejo",
    "respuesta": "CUERO",
    "definicion": [
      "pellejo"
    ],
    "tipo": "Sustracción",
    "indicador": "con cinco menos",
    "relleno": [
      "Lo crías y te saca los ojos"
    ],
    "explicacion": "Lo que se cría y te saca los ojos es el CUERVO. Con cinco menos, la V, queda CUERO, pellejo.",
    "dificultad": 4
  },
  {
    "pista": "Los que no ven, con una rosa en la frente, terminan colorados",
    "respuesta": "ROJOS",
    "definicion": [
      "colorados"
    ],
    "tipo": "Charada",
    "indicador": "en la frente",
    "relleno": [
      "Los que no ven",
      "una rosa"
    ],
    "explicacion": "Los que no ven son los OJOS. Con la R de rosa en la frente, R + OJOS = ROJOS, colorados.",
    "dificultad": 3
  },
  {
    "pista": "Vale más que nunca, aunque sin el té se quema",
    "respuesta": "ARDE",
    "definicion": [
      "se quema"
    ],
    "tipo": "Sustracción",
    "indicador": "sin",
    "relleno": [
      "Vale más que nunca",
      "el té"
    ],
    "explicacion": "Lo que vale más que nunca es TARDE. Sin el té, la T, queda ARDE, se quema.",
    "dificultad": 4
  },
  {
    "pista": "Lo que suena porque trae piedras, remontado, sirve para escuchar",
    "respuesta": "OIR",
    "definicion": [
      "sirve para escuchar"
    ],
    "tipo": "Reverso",
    "indicador": "remontado",
    "relleno": [
      "Lo que suena porque trae piedras"
    ],
    "explicacion": "Lo que suena porque trae piedras es el RÍO. Remontado, leído al revés, da OÍR, que sirve para escuchar.",
    "dificultad": 4
  },
  {
    "pista": "El que se juntó con las ganas de comer, ya con anillo, es todo un varón",
    "respuesta": "HOMBRE",
    "definicion": [
      "todo un varón"
    ],
    "tipo": "Misceláneas",
    "indicador": "ya con anillo",
    "relleno": [
      "El que se juntó con las ganas de comer"
    ],
    "explicacion": "Con las ganas de comer se juntó el HAMBRE. Con un anillo, la O, en lugar de la A, queda HOMBRE, todo un varón.",
    "dificultad": 4
  },
  {
    "pista": "¡¿Fal_a dón_e pod_r dor_ir?!",
    "respuesta": "SIN CUARTO",
    "definicion": [
      "¡¿Fal_a dón_e pod_r dor_ir?!"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A cada palabra le falta su cuarta letra: Fal(t)a, dón(d)e, pod(e)r, dor(m)ir. Sin cuarto, literalmente. Y la frase pregunta dónde poder dormir, que es no tener cuarto: SIN CUARTO.",
    "dificultad": 3
  },
  {
    "pista": "Jamá_ termin_",
    "respuesta": "SIN FIN",
    "definicion": [
      "Jamá_ termin_"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A cada palabra le falta su última letra: Jamá(s) termin(a). Sin fin, literalmente. Y la frase dice que nunca termina: SIN FIN.",
    "dificultad": 3
  },
  {
    "pista": "Cr_el, fi_ro y mal_ado",
    "respuesta": "SIN CORAZON",
    "definicion": [
      "Cr_el, fi_ro y mal_ado"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A cada palabra le falta la letra del medio: Cr(u)el, fi(e)ro, mal(v)ado. Sin corazón, literalmente. Y la frase describe a alguien cruel, fiero y malvado: SIN CORAZÓN.",
    "dificultad": 4
  },
  {
    "pista": "Po_re, indi_ente y arru_nado",
    "respuesta": "SIN MEDIOS",
    "definicion": [
      "Po_re, indi_ente y arru_nado"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A cada palabra le falta la letra del medio: Po(b)re, indi(g)ente, arru(i)nado. Sin medios, literalmente. Y la frase describe a quien no tiene dinero: SIN MEDIOS.",
    "dificultad": 4
  },
  {
    "pista": "Ningun_ fil_, ningun_ esper_",
    "respuesta": "SIN COLA",
    "definicion": [
      "Ningun_ fil_, ningun_ esper_"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A cada palabra le falta su cola, la última letra: Ningun(a) fil(a), ningun(a) esper(a). Sin cola, literalmente. Y la frase dice que no hay fila: SIN COLA.",
    "dificultad": 3
  }
];
