// Banco de pistas Extras (y las pistas de los días 1 a 8, que son las primeras 8). Las pistas del día desde el Nº 9 están cifradas en diarias.js.
// - respuesta: en mayúsculas, sin tildes (Ñ permitida). Varias palabras separadas por espacio.
// - definicion: fragmentos exactos de la pista que funcionan como definición
// - tipo: mecanismo críptico (ver sección Aprender)
// - indicador: fragmento exacto que señala el mecanismo, o una lista si hay varios (opcional)
// - relleno: fragmentos exactos de la pista con las letras o palabras que se manipulan (vacío en dobles definiciones)
// - notas: opcional, texto propio para la tarjeta de una pieza ({indicador, relleno, definicion})
// - explicacion: cómo se resuelve
// - dificultad: de 1 (fácil) a 5 (muy difícil); el multijugador filtra por este valor
const FECHA_INICIO = "2026-10-11";

const PISTAS = [
  {
    "pista": "Papá a medias sobre la colina, la mensajera de la paz.",
    "respuesta": "PALOMA",
    "definicion": [
      "la mensajera de la paz"
    ],
    "tipo": "Charada",
    "indicador": [
      "a medias",
      "sobre"
    ],
    "relleno": [
      "Papá",
      "la colina"
    ],
    "explicacion": "Papá a medias es PA y, sobre él, la colina: LOMA. PA + LOMA = PALOMA, la mensajera de la paz.",
    "dificultad": 3
  },
  {
    "pista": "La que da leche se marcha con el calcio",
    "respuesta": "VACA",
    "definicion": [
      "La que da leche"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "se marcha",
      "el calcio"
    ],
    "explicacion": "Se marcha es VA y el calcio, CA. VA + CA = VACA, la que da leche.",
    "dificultad": 3
  },
  {
    "pista": "Letras y él, tras el baile, brilla en la alfombra roja.",
    "respuesta": "ESTRELLA",
    "definicion": [
      "brilla en la alfombra roja"
    ],
    "tipo": "Anagrama",
    "indicador": [
      "y",
      "tras el baile"
    ],
    "relleno": [
      "Letras",
      "él"
    ],
    "explicacion": "LETRAS + ÉL, tras el baile de sus letras, forman ESTRELLA, la que brilla en la alfombra roja.",
    "dificultad": 2
  },
  {
    "pista": "Un caracol que perdió la cara es puro repollo.",
    "respuesta": "COL",
    "definicion": [
      "es puro repollo"
    ],
    "tipo": "Sustracción",
    "indicador": "que perdió",
    "relleno": [
      "Un caracol",
      "la cara"
    ],
    "explicacion": "CARACOL pierde la CARA y queda COL, un repollo.",
    "dificultad": 3
  },
  {
    "pista": "Arde en la chimenea; escupe en los Andes",
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
    "pista": "El rencor da marcha atrás para escuchar.",
    "respuesta": "OIDO",
    "definicion": [
      "para escuchar"
    ],
    "tipo": "Reverso",
    "indicador": "da marcha atrás",
    "relleno": [
      "El rencor"
    ],
    "explicacion": "El rencor es el ODIO; dado vuelta queda OÍDO, el sentido para escuchar.",
    "dificultad": 4
  },
  {
    "pista": "El bufón encabeza la carcajada, apenas viento.",
    "respuesta": "BRISA",
    "definicion": [
      "apenas viento"
    ],
    "tipo": "Selector + charada",
    "indicador": "encabeza",
    "relleno": [
      "El bufón",
      "la carcajada"
    ],
    "explicacion": "La B del bufón va a la cabeza de la carcajada, RISA: BRISA, apenas viento.",
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
    "pista": "Avanzo a pie; la ruta",
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
    "pista": "Se levanta para brindar; lo alto del árbol",
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
    "pista": "Fe y un anillo, poco agraciado.",
    "respuesta": "FEO",
    "definicion": [
      "poco agraciado"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Fe",
      "un anillo"
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
    "pista": "Una nota con los años vividos en falta de compañía.",
    "respuesta": "SOLEDAD",
    "definicion": [
      "en falta de compañía"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Una nota",
      "los años vividos"
    ],
    "explicacion": "La nota SOL y los años vividos, la EDAD. SOL + EDAD = SOLEDAD, falta de compañía.",
    "dificultad": 3
  },
  {
    "pista": "La bestia, en retirada, en una chapa delgada.",
    "respuesta": "LAMINA",
    "definicion": [
      "en una chapa delgada"
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
    "pista": "Bebida pirata, un crustáceo que se quedó sin cama.",
    "respuesta": "RON",
    "definicion": [
      "Bebida pirata"
    ],
    "tipo": "Sustracción",
    "indicador": "que se quedó sin",
    "relleno": [
      "un crustáceo",
      "cama"
    ],
    "explicacion": "El crustáceo es el CAMARÓN; sin CAMA queda RON, la bebida pirata.",
    "dificultad": 4
  },
  {
    "pista": "Circula por el tronco; según dicen, la que todo lo sabe",
    "respuesta": "SAVIA",
    "definicion": [
      "Circula por el tronco"
    ],
    "tipo": "Onomatopeya",
    "indicador": "según dicen,",
    "relleno": [
      "la que todo lo sabe"
    ],
    "explicacion": "La SAVIA circula por el tronco y, dicha en voz alta, suena igual que SABIA, la que todo lo sabe.",
    "dificultad": 3
  },
  {
    "pista": "Aun así, libre de incautación",
    "respuesta": "SIN EMBARGO",
    "definicion": [
      "Aun así"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "libre de",
      "incautación"
    ],
    "explicacion": "«Libre de» es SIN y una incautación es un EMBARGO: SIN EMBARGO, es decir, aun así.",
    "dificultad": 3
  },
  {
    "pista": "Un día que guarda cinco a la estrella del espectáculo.",
    "respuesta": "DIVA",
    "definicion": [
      "a la estrella del espectáculo"
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
    "pista": "Las urbes nocturnas antiguas, en primera fila, bajo el satélite.",
    "respuesta": "LUNA",
    "definicion": [
      "bajo el satélite"
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
    "pista": "Tiene el pelo de lana; te toma el pulso",
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
    "pista": "Cines y lío, en plena trifulca, con mutismo.",
    "respuesta": "SILENCIO",
    "definicion": [
      "con mutismo"
    ],
    "tipo": "Anagrama",
    "indicador": [
      "y",
      "en plena trifulca"
    ],
    "relleno": [
      "Cines",
      "lío"
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
    "pista": "Fusil junto a una corriente, donde cuelgan las camisas.",
    "respuesta": "ARMARIO",
    "definicion": [
      "donde cuelgan las camisas"
    ],
    "tipo": "Charada",
    "indicador": "junto a",
    "relleno": [
      "Fusil",
      "una corriente"
    ],
    "explicacion": "El fusil es un ARMA y la corriente, un RÍO. ARMA + RIO = ARMARIO, donde cuelgan las camisas.",
    "dificultad": 3
  },
  {
    "pista": "Día de no casarse ni embarcarse, océano con infusiones.",
    "respuesta": "MARTES",
    "definicion": [
      "Día de no casarse ni embarcarse"
    ],
    "tipo": "Charada",
    "indicador": "con",
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
    "pista": "Amor encabeza la ciudad eterna con una fragancia.",
    "respuesta": "AROMA",
    "definicion": [
      "con una fragancia"
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
    "pista": "La pera abraza a cincuenta, la joya del mar.",
    "respuesta": "PERLA",
    "definicion": [
      "la joya del mar"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza a",
    "relleno": [
      "La pera",
      "cincuenta"
    ],
    "explicacion": "PERA abraza la L, cincuenta en romanos, y queda PER·L·A, la joya del mar.",
    "dificultad": 3
  },
  {
    "pista": "Propio del coro, nacido en el arrecife",
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
    "pista": "Segundo puesto, el pez encabeza la conserva.",
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
    "pista": "Vigila al muerto; aprovecha el viento",
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
    "pista": "Cae de la tormenta; se cuenta en la rueda",
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
    "pista": "Canta al amanecer; se le escapa al tenor",
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
    "pista": "Animal del desierto; trafica en la esquina",
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
    "pista": "Un grito destemplado por el cereal dorado.",
    "respuesta": "TRIGO",
    "definicion": [
      "por el cereal dorado"
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
    "pista": "Sube y baja; aturde",
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
    "pista": "Barro del río con nitrógeno en la fruta más ácida.",
    "respuesta": "LIMON",
    "definicion": [
      "en la fruta más ácida"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Barro del río",
      "nitrógeno"
    ],
    "explicacion": "El barro del río es el LIMO y el nitrógeno, N. LIMO + N = LIMON, la fruta más ácida.",
    "dificultad": 3
  },
  {
    "pista": "Pieza de barro y una nota en el techo de la casa.",
    "respuesta": "TEJADO",
    "definicion": [
      "en el techo de la casa"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Pieza de barro",
      "una nota"
    ],
    "explicacion": "La pieza de barro es una TEJA y la nota, DO. TEJA + DO = TEJADO, el techo de la casa.",
    "dificultad": 3
  },
  {
    "pista": "Un paso en falso del anfibio.",
    "respuesta": "SAPO",
    "definicion": [
      "del anfibio"
    ],
    "tipo": "Anagrama",
    "indicador": "en falso",
    "relleno": [
      "Un paso"
    ],
    "explicacion": "Las letras de PASO, en falso, forman SAPO, el anfibio.",
    "dificultad": 2
  },
  {
    "pista": "Algo, tras la tormenta, es agua tranquila.",
    "respuesta": "LAGO",
    "definicion": [
      "es agua tranquila"
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
    "pista": "Cruza el río; alarga el fin de semana",
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
      "En la calma"
    ],
    "explicacion": "En cALMA se esconde ALMA, el espíritu.",
    "dificultad": 1
  },
  {
    "pista": "La orilla se niega en la estación del calor.",
    "respuesta": "VERANO",
    "definicion": [
      "en la estación del calor"
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
    "pista": "Heredero del trono; salta entre las olas",
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
    "pista": "Fruta prohibida; ocupa una cuadra",
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
    "pista": "El telón cae revuelto, pausado",
    "respuesta": "LENTO",
    "definicion": [
      "pausado"
    ],
    "tipo": "Anagrama",
    "indicador": "cae revuelto",
    "relleno": [
      "El telón"
    ],
    "explicacion": "TELÓN revuelto da LENTO, pausado.",
    "dificultad": 1
  },
  {
    "pista": "Bienestar, sal y usted, en corto.",
    "respuesta": "SALUD",
    "definicion": [
      "Bienestar"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "y",
      "en corto"
    ],
    "relleno": [
      "sal",
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
    "indicador": "junto a",
    "relleno": [
      "Arma de arquero",
      "parte del ojo"
    ],
    "explicacion": "ARCO (arma del arquero) + IRIS (parte del ojo) = ARCO IRIS.",
    "dificultad": 2
  },
  {
    "pista": "Perdía, sin rumbo, la roca",
    "respuesta": "PIEDRA",
    "definicion": [
      "la roca"
    ],
    "tipo": "Anagrama",
    "indicador": "sin rumbo",
    "relleno": [
      "Perdía"
    ],
    "explicacion": "Las letras de PERDÍA, sin rumbo, se reordenan en PIEDRA, una roca.",
    "dificultad": 2
  },
  {
    "pista": "Un jamón mal cortado escandaliza a la religiosa.",
    "respuesta": "MONJA",
    "definicion": [
      "escandaliza a la religiosa"
    ],
    "tipo": "Anagrama",
    "indicador": "mal cortado",
    "relleno": [
      "Un jamón"
    ],
    "explicacion": "Las letras de JAMÓN, mal cortadas, forman MONJA, una religiosa.",
    "dificultad": 2
  },
  {
    "pista": "El que gruñe en la pocilga, un credo herético",
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
    "pista": "Un careo acalorado con el metal templado.",
    "respuesta": "ACERO",
    "definicion": [
      "con el metal templado"
    ],
    "tipo": "Anagrama",
    "indicador": "acalorado",
    "relleno": [
      "Un careo"
    ],
    "explicacion": "Las letras de CAREO, acaloradas, forman ACERO, el metal templado.",
    "dificultad": 2
  },
  {
    "pista": "Un coral derretido por el bochorno.",
    "respuesta": "CALOR",
    "definicion": [
      "por el bochorno"
    ],
    "tipo": "Anagrama",
    "indicador": "derretido",
    "relleno": [
      "Un coral"
    ],
    "explicacion": "CORAL derretido, con sus letras reordenadas, da CALOR, el bochorno.",
    "dificultad": 2
  },
  {
    "pista": "Noel, perdido, el que ruge en la sabana.",
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
    "pista": "Unas bromas torcidas en una silueta oscura.",
    "respuesta": "SOMBRA",
    "definicion": [
      "en una silueta oscura"
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
    "pista": "El mero, enredado en la pala del bote.",
    "respuesta": "REMO",
    "definicion": [
      "en la pala del bote"
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
    "pista": "Nacer, revuelto, es lo que se asa.",
    "respuesta": "CARNE",
    "definicion": [
      "es lo que se asa"
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
    "pista": "Pardo, despeinado, en un campo verde.",
    "respuesta": "PRADO",
    "definicion": [
      "en un campo verde"
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
    "pista": "Una mora aplastada en el ramillete.",
    "respuesta": "RAMO",
    "definicion": [
      "en el ramillete"
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
    "pista": "Del 5 al 7 del girasol, lo que él sigue.",
    "respuesta": "SOL",
    "definicion": [
      "lo que él sigue"
    ],
    "tipo": "Selector",
    "indicador": "Del 5 al 7",
    "relleno": [
      "del girasol"
    ],
    "explicacion": "Las letras 5 a 7 de GIRASOL son S, O, L: SOL, justo lo que el girasol sigue con la cara.",
    "dificultad": 3
  },
  {
    "pista": "Anís, lavanda y en medio una tierra rodeada de mar",
    "respuesta": "ISLA",
    "definicion": [
      "una tierra rodeada de mar"
    ],
    "tipo": "Palabra escondida",
    "indicador": "y en medio",
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
      "En el mar, parece,"
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
    "pista": "El amor, de espaldas, en la ciudad eterna.",
    "respuesta": "ROMA",
    "definicion": [
      "en la ciudad eterna"
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
    "pista": "La rama, puesta del revés, para querer.",
    "respuesta": "AMAR",
    "definicion": [
      "para querer"
    ],
    "tipo": "Reverso",
    "indicador": "puesta del revés",
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
      "al roedor"
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
    "pista": "Adán retrocede hacia el vacío.",
    "respuesta": "NADA",
    "definicion": [
      "hacia el vacío"
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
    "pista": "Eva mira hacia atrás a un pájaro.",
    "respuesta": "AVE",
    "definicion": [
      "a un pájaro"
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
    "pista": "Que se suba al caballo en el cerro.",
    "respuesta": "MONTE",
    "definicion": [
      "Que se suba al caballo",
      "en el cerro"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "«Que monte» es que se suba al caballo, y un MONTE es un cerro.",
    "dificultad": 4
  },
  {
    "pista": "Abriga la cama; vuela bajo el mar",
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
    "pista": "Nades en zigzag por un camino estrecho.",
    "respuesta": "SENDA",
    "definicion": [
      "por un camino estrecho"
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
    "pista": "El mudo acoge al norte en el planeta.",
    "respuesta": "MUNDO",
    "definicion": [
      "en el planeta"
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
    "pista": "Pita con el norte en el pecho y llena de color la pared.",
    "respuesta": "PINTA",
    "definicion": [
      "y llena de color la pared"
    ],
    "tipo": "Contenedor",
    "indicador": [
      "con",
      "en el pecho"
    ],
    "relleno": [
      "Pita",
      "el norte"
    ],
    "explicacion": "PITA (de pitar) con la N del norte en el pecho da PI·N·TA, lo que hace quien llena de color la pared.",
    "dificultad": 3
  },
  {
    "pista": "Lo tosco se traga al uno con estrépito.",
    "respuesta": "RUIDO",
    "definicion": [
      "con estrépito"
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
    "pista": "Late en la muñeca; se gana sobre la mesa",
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
    "pista": "Cavo hasta enterrar cincuenta, sin pelo.",
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
    "pista": "Astro y lo que rueda en el cubilete, hombre de uniforme.",
    "respuesta": "SOLDADO",
    "definicion": [
      "hombre de uniforme"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Astro",
      "lo que rueda en el cubilete"
    ],
    "explicacion": "El astro es el SOL y en el cubilete rueda el DADO. SOL + DADO = SOLDADO, hombre de uniforme.",
    "dificultad": 3
  },
  {
    "pista": "Recorrido del músico con moneda peruana, la flor que busca la luz.",
    "respuesta": "GIRASOL",
    "definicion": [
      "la flor que busca la luz"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Recorrido del músico",
      "moneda peruana"
    ],
    "explicacion": "El recorrido de un músico es una GIRA y la moneda peruana, el SOL. GIRA + SOL = GIRASOL, la flor que busca la luz.",
    "dificultad": 4
  },
  {
    "pista": "Un número irracional y un roedor, el corsario.",
    "respuesta": "PIRATA",
    "definicion": [
      "el corsario"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Un número irracional",
      "un roedor"
    ],
    "explicacion": "PI es el número irracional del círculo y el roedor es una RATA. PI + RATA = PIRATA, un corsario.",
    "dificultad": 3
  },
  {
    "pista": "Le teme al gato; lo arrastras por el escritorio",
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
    "indicador": "con",
    "relleno": [
      "Rostro",
      "repollo"
    ],
    "explicacion": "El rostro es la CARA y el repollo, la COL. CARA + COL = CARACOL, que lleva la casa a cuestas.",
    "dificultad": 3
  },
  {
    "pista": "Repollo y mineral en bruto en el hogar de las abejas.",
    "respuesta": "COLMENA",
    "definicion": [
      "en el hogar de las abejas"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Repollo",
      "mineral en bruto"
    ],
    "explicacion": "El repollo es la COL y el mineral en bruto, la MENA. COL + MENA = COLMENA, el hogar de las abejas.",
    "dificultad": 3
  },
  {
    "pista": "El condimento se va y te rescata.",
    "respuesta": "SALVA",
    "definicion": [
      "y te rescata"
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
    "pista": "Pala de la barca con tela fina en un torbellino.",
    "respuesta": "REMOLINO",
    "definicion": [
      "en un torbellino"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Pala de la barca",
      "tela fina"
    ],
    "explicacion": "La pala de la barca es el REMO y la tela fina, el LINO. REMO + LINO = REMOLINO, un torbellino.",
    "dificultad": 3
  },
  {
    "pista": "Rodea el cuadro; se pagaba en Berlín",
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
    "pista": "Asiente y se adueña un primate.",
    "respuesta": "SIMIO",
    "definicion": [
      "un primate"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Asiente",
      "se adueña"
    ],
    "explicacion": "Quien asiente dice SÍ y quien se adueña dice MÍO. SI + MIO = SIMIO, un primate.",
    "dificultad": 3
  },
  {
    "pista": "Quinientos delante de Omar para amansar al potro.",
    "respuesta": "DOMAR",
    "definicion": [
      "para amansar al potro"
    ],
    "tipo": "Charada",
    "indicador": "delante de",
    "relleno": [
      "Quinientos",
      "Omar"
    ],
    "explicacion": "Quinientos en números romanos es D; delante de OMAR forma DOMAR, amansar al potro.",
    "dificultad": 4
  },
  {
    "pista": "Nota con papel de teatro, un engaño en el póker.",
    "respuesta": "FAROL",
    "definicion": [
      "un engaño en el póker"
    ],
    "tipo": "Charada",
    "indicador": "con",
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
    "pista": "La segunda nota con un vecino de Astérix, envuelto para el cumpleaños.",
    "respuesta": "REGALO",
    "definicion": [
      "envuelto para el cumpleaños"
    ],
    "tipo": "Charada",
    "indicador": "con",
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
    "pista": "Cruza el clima por un entretenimiento.",
    "respuesta": "PASATIEMPO",
    "definicion": [
      "por un entretenimiento"
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
    "pista": "El océano a la aldea. ¡Qué prodigio!",
    "respuesta": "MARAVILLA",
    "definicion": [
      "¡Qué prodigio!"
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
    "pista": "Detiene al astro la sombrilla de playa.",
    "respuesta": "PARASOL",
    "definicion": [
      "la sombrilla de playa"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Detiene",
      "al astro"
    ],
    "explicacion": "Detiene es PARA y el astro, el SOL. PARA + SOL = PARASOL, la sombrilla de playa.",
    "dificultad": 2
  },
  {
    "pista": "Lo malo se va en un color violáceo.",
    "respuesta": "MALVA",
    "definicion": [
      "en un color violáceo"
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
    "pista": "Una taberna con cobalto sale a navegar.",
    "respuesta": "BARCO",
    "definicion": [
      "sale a navegar"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Una taberna",
      "cobalto"
    ],
    "explicacion": "Una taberna es un BAR y el cobalto, CO. BAR + CO = BARCO, el que sale a navegar.",
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
    "pista": "El pescado pierde la ese en la falta del confesionario.",
    "respuesta": "PECADO",
    "definicion": [
      "en la falta del confesionario"
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
    "pista": "Guerrero del Olimpo romano; brilla rojizo de noche",
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
    "pista": "La tarde arranca con oro en la bestia de la plaza.",
    "respuesta": "TORO",
    "definicion": [
      "en la bestia de la plaza"
    ],
    "tipo": "Selector + charada",
    "indicador": [
      "arranca",
      "con"
    ],
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
    "pista": "Uno chequea a escondidas la oscuridad.",
    "respuesta": "NOCHE",
    "definicion": [
      "la oscuridad"
    ],
    "tipo": "Palabra escondida",
    "indicador": "a escondidas",
    "relleno": [
      "Uno chequea"
    ],
    "explicacion": "A escondidas en uNO CHEquea está NOCHE, la oscuridad.",
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
    "pista": "Un millar y el artículo femenino en la medida inglesa.",
    "respuesta": "MILLA",
    "definicion": [
      "en la medida inglesa"
    ],
    "tipo": "Charada",
    "indicador": "y",
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
    "indicador": "apenas",
    "relleno": [
      "Entregué",
      "llegó"
    ],
    "explicacion": "Entregué es DI y llegó es VINO (de venir). DI + VINO = DIVINO, celestial.",
    "dificultad": 4
  },
  {
    "pista": "Calcio con un sí y un no donde se apuesta en la ruleta.",
    "respuesta": "CASINO",
    "definicion": [
      "donde se apuesta en la ruleta"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "con",
      "y"
    ],
    "relleno": [
      "Calcio",
      "un sí",
      "un no"
    ],
    "explicacion": "CA es el símbolo del calcio; luego SÍ y NO. CA + SI + NO = CASINO, donde se apuesta en la ruleta.",
    "dificultad": 4
  },
  {
    "pista": "Te sienta en la plaza; te presta",
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
    "pista": "La degustación recibe al rey y llega por correo.",
    "respuesta": "CARTA",
    "definicion": [
      "y llega por correo"
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
    "pista": "Corta tablas; se eleva en Córdoba",
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
    "pista": "Crece en la maceta; la pisas al andar",
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
    "pista": "Se cae del árbol; se escribe por ambas caras",
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
    "pista": "Hueso del brazo; transmite el partido",
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
    "pista": "Punta de Hornos, rango bajo del cuartel",
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
    "indicador": [
      "Oro en",
      "plata en",
      "bronce en",
      "y",
      "la última de"
    ],
    "relleno": [
      "Perú",
      "Lima",
      "Bolivia",
      "Colombia"
    ],
    "explicacion": "Oro, plata y bronce son los puestos 1, 2 y 3. La primera de Perú es P, la segunda de Lima es I, la tercera de Bolivia es L y la última de Colombia es A. PILA, lo que alimenta la linterna.",
    "dificultad": 4
  },
  {
    "pista": "Del 2 al 5 del clima, la capital de la garúa.",
    "respuesta": "LIMA",
    "definicion": [
      "la capital de la garúa"
    ],
    "tipo": "Selector",
    "indicador": "Del 2 al 5",
    "relleno": [
      "del clima"
    ],
    "explicacion": "Las letras 2 a 5 de CLIMA son L, I, M, A: LIMA, la capital famosa por su garúa.",
    "dificultad": 3
  },
  {
    "pista": "Cobre con radio para el que da misa.",
    "respuesta": "CURA",
    "definicion": [
      "para el que da misa"
    ],
    "tipo": "Misceláneas",
    "indicador": "con",
    "relleno": [
      "Cobre",
      "radio"
    ],
    "explicacion": "CU es el símbolo del cobre y RA, el del radio. CU + RA = CURA, el que da misa.",
    "dificultad": 4
  },
  {
    "pista": "Trepa a los árboles; se oye por un solo canal",
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
    "pista": "Herida de cuchillo; la residencia del rey",
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
    "pista": "Lo que guarda la carta; por encima",
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
    "pista": "Fruta tropical; se agarra en la sartén",
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
    "pista": "Lo usa el tucán, lo usa el minero",
    "respuesta": "PICO",
    "definicion": [
      "Lo usa el tucán",
      "lo usa el minero"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El tucán usa su PICO y el minero usa el PICO.",
    "dificultad": 2
  },
  {
    "pista": "Muestra el niño travieso; se aprende en el extranjero",
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
    "pista": "La mueve el perro; se forma en el banco",
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
    "pista": "Atrapa peces; conecta al mundo.",
    "respuesta": "RED",
    "definicion": [
      "Atrapa peces",
      "conecta al mundo"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La RED del pescador atrapa peces, y la red, internet, conecta al mundo.",
    "dificultad": 2
  },
  {
    "pista": "Calzado alto; guarda vino",
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
    "pista": "Prenda de la ladera del monte.",
    "respuesta": "FALDA",
    "definicion": [
      "Prenda",
      "de la ladera del monte"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La FALDA es una prenda y también la ladera del monte.",
    "dificultad": 2
  },
  {
    "pista": "Mide la camisa; se esculpe en madera",
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
    "pista": "Norma; traza líneas rectas",
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
    "pista": "Cruza el pecho del presidente; toca en el baile",
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
    "pista": "Lo cambias con el control; lo cruzan barcos entre esclusas",
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
    "pista": "Viste al ave; escribe la carta",
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
    "pista": "Lugar del tren; dura tres meses",
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
    "pista": "Se estrecha al saludar; se da con la brocha",
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
    "pista": "Se sirve con salsa; se pone en el cepillo",
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
    "pista": "Valla; no queda lejos",
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
    "indicador": "Late en el pecho de",
    "relleno": [
      "los toros"
    ],
    "explicacion": "En el pecho de TOROS, sin sus extremos, late ORO, un metal precioso.",
    "dificultad": 3
  },
  {
    "pista": "Las casas, sin fronteras, en la oreja de la taza.",
    "respuesta": "ASA",
    "definicion": [
      "en la oreja de la taza"
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
    "pista": "Los barcos sin proa ni popa, el arma del arquero.",
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
    "pista": "Época en el corazón de las peras",
    "respuesta": "ERA",
    "definicion": [
      "Época"
    ],
    "tipo": "Selector",
    "indicador": "en el corazón de",
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
    "pista": "Al camaleón se le escapa el león donde duermes.",
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
    "pista": "La piel sin cola es lo que camina.",
    "respuesta": "PIE",
    "definicion": [
      "es lo que camina"
    ],
    "tipo": "Sustracción",
    "indicador": "sin cola",
    "relleno": [
      "La piel"
    ],
    "explicacion": "La PIEL sin cola (sin su última letra) queda en PIE, lo que camina.",
    "dificultad": 3
  },
  {
    "pista": "La camisa se desprende del calcio en la ceremonia del domingo.",
    "respuesta": "MISA",
    "definicion": [
      "en la ceremonia del domingo"
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
    "pista": "La prisa, decapitada, en una carcajada.",
    "respuesta": "RISA",
    "definicion": [
      "en una carcajada"
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
    "pista": "La demora, sin preámbulo, en la fruta del zarzal.",
    "respuesta": "MORA",
    "definicion": [
      "en la fruta del zarzal"
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
    "pista": "La cacería, de palabra, el hogar",
    "respuesta": "CAZA",
    "definicion": [
      "La cacería"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de palabra",
    "relleno": [
      "el hogar"
    ],
    "explicacion": "CAZA, la cacería, dicha de palabra suena igual que CASA, el hogar, cuando se sesea.",
    "dificultad": 3
  },
  {
    "pista": "Caño, según el locutor, poseyó",
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
    "pista": "Recipiente del agua, a viva voz, un órgano del costado",
    "respuesta": "VASO",
    "definicion": [
      "Recipiente del agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "a viva voz",
    "relleno": [
      "un órgano del costado"
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
    "pista": "Animal con cuernos, al oído, un esclavo",
    "respuesta": "CIERVO",
    "definicion": [
      "Animal con cuernos"
    ],
    "tipo": "Onomatopeya",
    "indicador": "al oído",
    "relleno": [
      "un esclavo"
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
    "indicador": "que suena a",
    "relleno": [
      "dureza del pie"
    ],
    "explicacion": "CAYO, una isla pequeña, suena igual que CALLO, la dureza del pie.",
    "dificultad": 1
  },
  {
    "pista": "La curva que recorre el agua, de oídas, profunda",
    "respuesta": "ONDA",
    "definicion": [
      "La curva que recorre el agua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de oídas",
    "relleno": [
      "profunda"
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
    "pista": "Cien junto a el oso no soporta rivales en el amor.",
    "respuesta": "CELOSO",
    "definicion": [
      "no soporta rivales en el amor"
    ],
    "tipo": "Charada",
    "indicador": "junto a",
    "relleno": [
      "Cien",
      "el oso"
    ],
    "explicacion": "Cien en números romanos es C; junto a EL OSO da CELOSO, el que no soporta rivales en el amor.",
    "dificultad": 4
  },
  {
    "pista": "Un millar de campo. ¡Qué prodigio!",
    "respuesta": "MILAGRO",
    "definicion": [
      "¡Qué prodigio!"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Un millar",
      "de campo"
    ],
    "explicacion": "Un millar es MIL y el campo, AGRO (como en agricultura). MIL + AGRO = MILAGRO, un prodigio.",
    "dificultad": 4
  },
  {
    "pista": "La sirena pierde el sur y alborotada gobierna",
    "respuesta": "REINA",
    "definicion": [
      "gobierna"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "pierde",
      "y alborotada"
    ],
    "relleno": [
      "La sirena",
      "el sur"
    ],
    "explicacion": "SIRENA sin el sur (S) queda IRENA, y alborotada se ordena como REINA, la que gobierna.",
    "dificultad": 5
  },
  {
    "pista": "Objeción sin cola y que fume una fragancia de frasco.",
    "respuesta": "PERFUME",
    "definicion": [
      "una fragancia de frasco"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "sin cola",
      "y"
    ],
    "relleno": [
      "Objeción",
      "que fume"
    ],
    "explicacion": "La objeción es un PERO, que sin cola queda PER. Con FUME da PERFUME, una fragancia de frasco.",
    "dificultad": 5
  },
  {
    "pista": "Campo sin cola ante una eternidad geológica levanta la copa.",
    "respuesta": "CAMPEON",
    "definicion": [
      "levanta la copa"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "sin cola",
      "ante"
    ],
    "relleno": [
      "Campo",
      "una eternidad geológica"
    ],
    "explicacion": "El CAMPO sin cola es CAMP y una eternidad geológica, un EÓN. CAMP + EON = CAMPEON, el que levanta la copa.",
    "dificultad": 5
  },
  {
    "pista": "Toro sin rabo masca la hierba del mojito en pleno temporal.",
    "respuesta": "TORMENTA",
    "definicion": [
      "en pleno temporal"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "sin rabo",
      "masca"
    ],
    "relleno": [
      "Toro",
      "la hierba del mojito"
    ],
    "explicacion": "El TORO sin rabo queda TOR y la hierba del mojito es la MENTA. TOR + MENTA = TORMENTA, el temporal.",
    "dificultad": 5
  },
  {
    "pista": "La espalda pierde cincuenta y se desenvaina en el duelo.",
    "respuesta": "ESPADA",
    "definicion": [
      "y se desenvaina en el duelo"
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
    "pista": "Liquidación con sodio, por ella entra la luz.",
    "respuesta": "VENTANA",
    "definicion": [
      "por ella entra la luz"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Liquidación",
      "sodio"
    ],
    "explicacion": "Una liquidación es una VENTA y el sodio, NA. VENTA + NA = VENTANA, por donde entra la luz.",
    "dificultad": 4
  },
  {
    "pista": "Hierro junto a un brazo de mar, fiesta con puestos.",
    "respuesta": "FERIA",
    "definicion": [
      "fiesta con puestos"
    ],
    "tipo": "Charada",
    "indicador": "junto a",
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
    "indicador": "con",
    "relleno": [
      "Coro",
      "sodio"
    ],
    "explicacion": "El CORO con el sodio, NA, da CORONA, lo que va sobre la cabeza del rey.",
    "dificultad": 4
  },
  {
    "pista": "Lo sana. ¡Qué disparate!",
    "respuesta": "LOCURA",
    "definicion": [
      "¡Qué disparate!"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Lo",
      "sana"
    ],
    "explicacion": "«Lo sana» se dice LO CURA. LO + CURA = LOCURA, un disparate.",
    "dificultad": 4
  },
  {
    "pista": "Sodio, la existencia y quinientos se festejan en diciembre",
    "respuesta": "NAVIDAD",
    "definicion": [
      "se festejan en diciembre"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Sodio",
      "la existencia",
      "quinientos"
    ],
    "explicacion": "El sodio es NA, la existencia es la VIDA y quinientos en números romanos, D. NA + VIDA + D = NAVIDAD, que se festeja en diciembre.",
    "dificultad": 5
  },
  {
    "pista": "Pan sin cola y cabello liso donde vive el rey.",
    "respuesta": "PALACIO",
    "definicion": [
      "donde vive el rey"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "sin cola",
      "y"
    ],
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
    "indicador": [
      "se queda los pies de",
      "y, con",
      "corazón de"
    ],
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
    "indicador": "cuando suelta",
    "relleno": [
      "del que se duerme y se lo lleva la corriente",
      "el trago pirata"
    ],
    "explicacion": "El que se duerme y se lo lleva la corriente es el CAMARÓN. Si suelta el trago pirata, el RON, queda CAMA, el lecho.",
    "dificultad": 3
  },
  {
    "pista": "Lo que se pierde por ir a Melipilla, desarmado, en flores moradas.",
    "respuesta": "LILAS",
    "definicion": [
      "en flores moradas"
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
    "indicador": [
      "que sobra al restar",
      "de"
    ],
    "relleno": [
      "mi entrega",
      "lo que no se mira en un obsequio con crines"
    ],
    "explicacion": "A caballo regalado no se le mira el DIENTE. Al restar mi entrega, DI, queda ENTE, un ser.",
    "dificultad": 4
  },
  {
    "pista": "Más vale uno en mano que cien volando si suelta el oro descabezado en el heno.",
    "respuesta": "PAJA",
    "definicion": [
      "en el heno"
    ],
    "tipo": "Sustracción",
    "indicador": [
      "si suelta",
      "descabezado"
    ],
    "relleno": [
      "Más vale uno en mano que cien volando",
      "el oro"
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
    "indicador": "pierde a",
    "relleno": [
      "el que ladra y no muerde",
      "su rey"
    ],
    "explicacion": "El que ladra y no muerde es el PERRO. Si pierde a su rey, la R, queda PERO, sin embargo.",
    "dificultad": 3
  },
  {
    "pista": "Lo crías y te saca los ojos; con cinco menos, puro pellejo",
    "respuesta": "CUERO",
    "definicion": [
      "puro pellejo"
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
    "pista": "Los que no ven, con una rosa en la frente, colorados.",
    "respuesta": "ROJOS",
    "definicion": [
      "colorados"
    ],
    "tipo": "Charada",
    "indicador": [
      "con",
      "en la frente"
    ],
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
    "indicador": "aunque sin",
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
    "pista": "El que se juntó con las ganas de comer, ya con anillo, es todo un varón.",
    "respuesta": "HOMBRE",
    "definicion": [
      "es todo un varón"
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
  },
  {
    "pista": "Torso con rey, desfigurado, en la cara.",
    "respuesta": "ROSTRO",
    "definicion": [
      "en la cara"
    ],
    "tipo": "Anagrama",
    "indicador": [
      "con",
      "desfigurado"
    ],
    "relleno": [
      "Torso",
      "rey"
    ],
    "explicacion": "TORSO más la R del rey (como en el ajedrez), desfigurado, da ROSTRO, la cara.",
    "dificultad": 4
  },
  {
    "pista": "Las dalias marchitas, por dónde irse.",
    "respuesta": "SALIDA",
    "definicion": [
      "por dónde irse"
    ],
    "tipo": "Anagrama",
    "indicador": "marchitas",
    "relleno": [
      "Las dalias"
    ],
    "explicacion": "Las letras de DALIAS, marchitas, se reordenan en SALIDA, por dónde irse.",
    "dificultad": 3
  },
  {
    "pista": "La prima y la osa bailan y vuelan de flor en flor.",
    "respuesta": "MARIPOSA",
    "definicion": [
      "y vuelan de flor en flor"
    ],
    "tipo": "Anagrama",
    "indicador": [
      "y",
      "bailan"
    ],
    "relleno": [
      "La prima",
      "la osa"
    ],
    "explicacion": "PRIMA + OSA, bailando sus letras, forman MARIPOSA, la que vuela de flor en flor.",
    "dificultad": 3
  },
  {
    "pista": "Manila agitada por una bestia.",
    "respuesta": "ANIMAL",
    "definicion": [
      "por una bestia"
    ],
    "tipo": "Anagrama",
    "indicador": "agitada",
    "relleno": [
      "Manila"
    ],
    "explicacion": "MANILA, agitada, reordena sus letras en ANIMAL, una bestia.",
    "dificultad": 3
  },
  {
    "pista": "El médano, arrastrado por el viento, se paga en la caja",
    "respuesta": "MONEDA",
    "definicion": [
      "se paga en la caja"
    ],
    "tipo": "Anagrama",
    "indicador": "arrastrado por el viento",
    "relleno": [
      "El médano"
    ],
    "explicacion": "El MÉDANO es una duna; arrastrado por el viento, con sus letras revueltas, da MONEDA, lo que se paga en la caja.",
    "dificultad": 4
  },
  {
    "pista": "La mata acoge al este y gira alrededor del sol.",
    "respuesta": "PLANETA",
    "definicion": [
      "y gira alrededor del sol"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "relleno": [
      "La mata",
      "al este"
    ],
    "explicacion": "La mata es una PLANTA; acoge la E del este y queda PLAN·E·TA, que gira alrededor del sol.",
    "dificultad": 4
  },
  {
    "pista": "Una cita deja pasar al norte, lo que ata el regalo.",
    "respuesta": "CINTA",
    "definicion": [
      "lo que ata el regalo"
    ],
    "tipo": "Contenedor",
    "indicador": "deja pasar",
    "relleno": [
      "Una cita",
      "al norte"
    ],
    "explicacion": "CITA deja pasar la N del norte y queda CI·N·TA, lo que ata el regalo.",
    "dificultad": 3
  },
  {
    "pista": "El pellejo encierra al norte y adorna la frente del toro.",
    "respuesta": "CUERNO",
    "definicion": [
      "y adorna la frente del toro"
    ],
    "tipo": "Contenedor",
    "indicador": "encierra",
    "relleno": [
      "El pellejo",
      "al norte"
    ],
    "explicacion": "El pellejo es el CUERO; encierra la N del norte y queda CUER·N·O, lo que adorna la frente del toro.",
    "dificultad": 4
  },
  {
    "pista": "Gansos que dan vuelta la chaqueta",
    "respuesta": "OCAS",
    "definicion": [
      "Gansos"
    ],
    "tipo": "Reverso",
    "indicador": "que dan vuelta",
    "relleno": [
      "la chaqueta"
    ],
    "explicacion": "La chaqueta es un SACO; dado vuelta, al revés, da OCAS, gansos.",
    "dificultad": 4
  },
  {
    "pista": "El que sostiene el mundo brinca de vuelta",
    "respuesta": "ATLAS",
    "definicion": [
      "El que sostiene el mundo"
    ],
    "tipo": "Reverso",
    "indicador": "de vuelta",
    "relleno": [
      "brinca"
    ],
    "explicacion": "Brinca es SALTA; de vuelta, al revés, da ATLAS, el titán que sostiene el mundo.",
    "dificultad": 4
  },
  {
    "pista": "Advertir, el roedor da marcha atrás.",
    "respuesta": "NOTAR",
    "definicion": [
      "Advertir"
    ],
    "tipo": "Reverso",
    "indicador": "da marcha atrás",
    "relleno": [
      "el roedor"
    ],
    "explicacion": "El roedor es el RATÓN; dando marcha atrás, al revés, da NOTAR, advertir.",
    "dificultad": 4
  },
  {
    "pista": "Al revés, curar a las que croan.",
    "respuesta": "RANAS",
    "definicion": [
      "a las que croan"
    ],
    "tipo": "Reverso",
    "indicador": "Al revés",
    "relleno": [
      "curar"
    ],
    "explicacion": "Curar es SANAR; al revés da RANAS, las que croan.",
    "dificultad": 3
  },
  {
    "pista": "Un humor adaptado cobija la vivienda",
    "respuesta": "MORADA",
    "definicion": [
      "la vivienda"
    ],
    "tipo": "Palabra escondida",
    "indicador": "cobija",
    "relleno": [
      "Un humor adaptado"
    ],
    "explicacion": "Cobijada en huMOR ADAptado está MORADA, la vivienda.",
    "dificultad": 4
  },
  {
    "pista": "Una mena norteña oculta al pequeño de Blancanieves",
    "respuesta": "ENANO",
    "definicion": [
      "al pequeño de Blancanieves"
    ],
    "tipo": "Palabra escondida",
    "indicador": "oculta",
    "relleno": [
      "Una mena norteña"
    ],
    "explicacion": "Oculto en mENA NOrteña está ENANO, uno de los pequeños de Blancanieves.",
    "dificultad": 4
  },
  {
    "pista": "Mapas telúricos esconden un dulce de cumpleaños",
    "respuesta": "PASTEL",
    "definicion": [
      "un dulce de cumpleaños"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconden",
    "relleno": [
      "Mapas telúricos"
    ],
    "explicacion": "Escondido en maPAS TELúricos está PASTEL, un dulce de cumpleaños.",
    "dificultad": 3
  },
  {
    "pista": "Para Renata se guarda lo que hay en la playa",
    "respuesta": "ARENA",
    "definicion": [
      "lo que hay en la playa"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se guarda",
    "relleno": [
      "Para Renata"
    ],
    "explicacion": "Guardada en parA RENAta está ARENA, lo que hay en la playa.",
    "dificultad": 3
  },
  {
    "pista": "Océano precede a lo que se fue, el esposo.",
    "respuesta": "MARIDO",
    "definicion": [
      "el esposo"
    ],
    "tipo": "Charada",
    "indicador": "precede a",
    "relleno": [
      "Océano",
      "lo que se fue"
    ],
    "explicacion": "El océano es el MAR y lo que se fue, IDO. MAR delante de IDO = MARIDO, el esposo.",
    "dificultad": 4
  },
  {
    "pista": "Cada isla espera la ola, al comienzo, bajo el firmamento.",
    "respuesta": "CIELO",
    "definicion": [
      "bajo el firmamento"
    ],
    "tipo": "Selector",
    "indicador": "al comienzo",
    "relleno": [
      "Cada isla espera la ola"
    ],
    "explicacion": "Al comienzo de Cada Isla Espera La Ola están sus iniciales: CIELO, el firmamento.",
    "dificultad": 3
  },
  {
    "pista": "La fibra blanca pierde algo de talento.",
    "respuesta": "DON",
    "definicion": [
      "de talento"
    ],
    "tipo": "Sustracción",
    "indicador": "pierde",
    "relleno": [
      "La fibra blanca",
      "algo"
    ],
    "explicacion": "La fibra blanca es el ALGODÓN; si pierde ALGO queda DON, el talento.",
    "dificultad": 4
  },
  {
    "pista": "Hermoso, el pelo que soltó el calcio.",
    "respuesta": "BELLO",
    "definicion": [
      "Hermoso"
    ],
    "tipo": "Sustracción",
    "indicador": "que soltó",
    "relleno": [
      "el pelo",
      "el calcio"
    ],
    "explicacion": "El pelo es el CABELLO y el calcio, CA. CABELLO sin CA deja BELLO, hermoso.",
    "dificultad": 4
  },
  {
    "pista": "El astro rey, seguido de un ave de la pampa, sin pareja.",
    "respuesta": "SOLTERO",
    "definicion": [
      "sin pareja"
    ],
    "tipo": "Charada",
    "indicador": "seguido de",
    "relleno": [
      "El astro rey",
      "un ave de la pampa"
    ],
    "explicacion": "El astro rey es el SOL y el ave de la pampa, el TERO. SOL + TERO = SOLTERO, sin pareja.",
    "dificultad": 5
  },
  {
    "pista": "Un perro delante del cubo del azar cierra el portón",
    "respuesta": "CANDADO",
    "definicion": [
      "cierra el portón"
    ],
    "tipo": "Charada",
    "indicador": "delante del",
    "relleno": [
      "Un perro",
      "cubo del azar"
    ],
    "explicacion": "Un perro es un CAN y el cubo del azar, un DADO. CAN delante de DADO = CANDADO, lo que cierra el portón.",
    "dificultad": 3
  },
  {
    "pista": "Un perro mira al este antes que la nota en la especia del arroz con leche.",
    "respuesta": "CANELA",
    "definicion": [
      "en la especia del arroz con leche"
    ],
    "tipo": "Charada",
    "indicador": [
      "mira",
      "antes que"
    ],
    "relleno": [
      "Un perro",
      "al este",
      "la nota"
    ],
    "explicacion": "Un perro es un CAN, el este es E y la nota es LA. CAN + E + LA = CANELA, la especia del arroz con leche.",
    "dificultad": 4
  },
  {
    "pista": "La segunda nota, seguida de la infusión rioplatense, el broche final.",
    "respuesta": "REMATE",
    "definicion": [
      "el broche final"
    ],
    "tipo": "Charada",
    "indicador": "seguida de",
    "relleno": [
      "La segunda nota",
      "la infusión rioplatense"
    ],
    "explicacion": "La segunda nota es RE y la infusión rioplatense, el MATE. RE + MATE = REMATE, el broche final.",
    "dificultad": 3
  },
  {
    "pista": "El lecho antes del trago pirata, crustáceo rosado",
    "respuesta": "CAMARON",
    "definicion": [
      "crustáceo rosado"
    ],
    "tipo": "Charada",
    "indicador": "antes del",
    "relleno": [
      "El lecho",
      "trago pirata"
    ],
    "explicacion": "El lecho es la CAMA y el trago pirata, el RON. CAMA antes de RON = CAMARÓN, un crustáceo rosado.",
    "dificultad": 3
  },
  {
    "pista": "La cabeza de un ave más una extremidad, un apretón cariñoso.",
    "respuesta": "ABRAZO",
    "definicion": [
      "un apretón cariñoso"
    ],
    "tipo": "Selector + charada",
    "indicador": [
      "La cabeza de",
      "más"
    ],
    "relleno": [
      "un ave",
      "una extremidad"
    ],
    "explicacion": "La cabeza de AVE es la A, y una extremidad es el BRAZO. A + BRAZO = ABRAZO, un apretón cariñoso.",
    "dificultad": 4
  },
  {
    "pista": "Lo que bate el pájaro, devuelto, donde se reciben visitas.",
    "respuesta": "SALA",
    "definicion": [
      "donde se reciben visitas"
    ],
    "tipo": "Reverso",
    "indicador": "devuelto",
    "relleno": [
      "Lo que bate el pájaro"
    ],
    "explicacion": "Lo que bate el pájaro son las ALAS; devueltas, al revés, dan SALA, donde se reciben visitas.",
    "dificultad": 4
  },
  {
    "pista": "Gastado por el uso, aborrecer se echa atrás",
    "respuesta": "RAIDO",
    "definicion": [
      "Gastado por el uso"
    ],
    "tipo": "Reverso",
    "indicador": "se echa atrás",
    "relleno": [
      "aborrecer"
    ],
    "explicacion": "Aborrecer es ODIAR; echado atrás, al revés, da RAÍDO, gastado por el uso.",
    "dificultad": 5
  },
  {
    "pista": "El ritmo del músico guarda cincuenta en el lugar sagrado.",
    "respuesta": "TEMPLO",
    "definicion": [
      "en el lugar sagrado"
    ],
    "tipo": "Contenedor",
    "indicador": "guarda",
    "relleno": [
      "El ritmo del músico",
      "cincuenta"
    ],
    "explicacion": "El ritmo del músico es el TEMPO; guarda la L, cincuenta en romanos, y queda TEMP·L·O, el lugar sagrado.",
    "dificultad": 4
  },
  {
    "pista": "El extremo helado de la Tierra acoge medio centenar y sale del huevo.",
    "respuesta": "POLLO",
    "definicion": [
      "y sale del huevo"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "relleno": [
      "El extremo helado de la Tierra",
      "medio centenar"
    ],
    "explicacion": "El extremo helado de la Tierra es un POLO; acoge medio centenar, la L de cincuenta, y queda POL·L·O, que sale del huevo.",
    "dificultad": 4
  },
  {
    "pista": "Con el sur adentro, una mancha de la cara tira el anzuelo",
    "respuesta": "PESCA",
    "definicion": [
      "tira el anzuelo"
    ],
    "tipo": "Contenedor",
    "indicador": [
      "Con",
      "adentro"
    ],
    "relleno": [
      "el sur",
      "una mancha de la cara"
    ],
    "explicacion": "Una mancha de la cara es una PECA; con la S del sur adentro queda PE·S·CA, el que tira el anzuelo.",
    "dificultad": 4
  },
  {
    "pista": "El asiento del rey acoge cien y sostiene la copa del árbol.",
    "respuesta": "TRONCO",
    "definicion": [
      "y sostiene la copa del árbol"
    ],
    "tipo": "Contenedor",
    "indicador": "acoge",
    "relleno": [
      "El asiento del rey",
      "cien"
    ],
    "explicacion": "El asiento del rey es el TRONO; acoge la C, cien en romanos, y queda TRON·C·O, lo que sostiene la copa del árbol.",
    "dificultad": 4
  },
  {
    "pista": "La planta y el oxígeno, en la licuadora, la fruta amarilla.",
    "respuesta": "PLATANO",
    "definicion": [
      "la fruta amarilla"
    ],
    "tipo": "Anagrama",
    "indicador": [
      "y",
      "en la licuadora"
    ],
    "relleno": [
      "La planta",
      "el oxígeno"
    ],
    "explicacion": "PLANTA + O (el oxígeno), en la licuadora, reordenan sus letras en PLÁTANO, la fruta amarilla.",
    "dificultad": 3
  },
  {
    "pista": "Sergio, alocado, es un peligro.",
    "respuesta": "RIESGO",
    "definicion": [
      "es un peligro"
    ],
    "tipo": "Anagrama",
    "indicador": "alocado",
    "relleno": [
      "Sergio"
    ],
    "explicacion": "Las letras de SERGIO, alocadas, forman RIESGO, un peligro.",
    "dificultad": 3
  },
  {
    "pista": "Marta enreda el argumento",
    "respuesta": "TRAMA",
    "definicion": [
      "el argumento"
    ],
    "tipo": "Anagrama",
    "indicador": "enreda",
    "relleno": [
      "Marta"
    ],
    "explicacion": "Marta enreda sus letras y forma TRAMA, el argumento.",
    "dificultad": 3
  },
  {
    "pista": "Ramón rompe la regla",
    "respuesta": "NORMA",
    "definicion": [
      "la regla"
    ],
    "tipo": "Anagrama",
    "indicador": "rompe",
    "relleno": [
      "Ramón"
    ],
    "explicacion": "Ramón rompe sus letras y forma NORMA, la regla.",
    "dificultad": 4
  },
  {
    "pista": "Pedro, trastornado por el mando",
    "respuesta": "PODER",
    "definicion": [
      "el mando"
    ],
    "tipo": "Anagrama",
    "indicador": "trastornado por",
    "relleno": [
      "Pedro"
    ],
    "explicacion": "Las letras de PEDRO, trastornadas, forman PODER, el mando.",
    "dificultad": 3
  },
  {
    "pista": "Teresa, revolcada en la alfombra de junco.",
    "respuesta": "ESTERA",
    "definicion": [
      "en la alfombra de junco"
    ],
    "tipo": "Anagrama",
    "indicador": "revolcada",
    "relleno": [
      "Teresa"
    ],
    "explicacion": "Las letras de TERESA, revolcadas, forman ESTERA, la alfombra de junco.",
    "dificultad": 4
  },
  {
    "pista": "Masa blanda con relleno de ají que hace volar la cabeza.",
    "respuesta": "COJIN",
    "definicion": [
      "Masa blanda"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "relleno de",
      "que hace volar la cabeza"
    ],
    "relleno": [
      "con",
      "ají"
    ],
    "explicacion": "El ají pierde la cabeza, su inicial, y queda JI. Si con eso rellenamos «con», obtenemos CO·JI·N, COJÍN, una masa blanda. (Pista propuesta por Tomás.)",
    "dificultad": 4
  },
  {
    "pista": "Los capitanes pusieron algo tarde ostras saladas en el lago.",
    "respuesta": "PATOS",
    "definicion": [
      "en el lago"
    ],
    "tipo": "Selector",
    "indicador": "Los capitanes",
    "relleno": [
      "pusieron algo tarde ostras saladas"
    ],
    "explicacion": "Los capitanes van a la cabeza: las iniciales de Pusieron Algo Tarde Ostras Saladas forman PATOS, que están en el lago. (Pista propuesta por Tomás.)",
    "dificultad": 4
  },
  {
    "pista": "Se escucha como ríe y explota, en Asia.",
    "respuesta": "JAPON",
    "definicion": [
      "en Asia"
    ],
    "tipo": "Onomatopeya",
    "indicador": [
      "Se escucha como",
      "y"
    ],
    "relleno": [
      "ríe",
      "explota"
    ],
    "explicacion": "Se escucha como la risa, JA, y como una explosión, PON. JA + PON = JAPÓN, que está en Asia. (Pista propuesta por Tomás.)",
    "dificultad": 4
  },
  {
    "pista": "Los vestidos religiosos son costumbres.",
    "respuesta": "HABITOS",
    "definicion": [
      "Los vestidos religiosos",
      "son costumbres"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "Los HÁBITOS son los vestidos de monjas y frailes, y los hábitos también son costumbres. (Pista propuesta por Tomás.)",
    "dificultad": 3
  },
  {
    "pista": "Verde del mar se oxida en metal gastado",
    "respuesta": "ALGA",
    "definicion": [
      "Verde del mar"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se oxida en",
    "relleno": [
      "metal gastado"
    ],
    "explicacion": "Oxidada en metAL GAstado está ALGA, lo verde del mar.",
    "dificultad": 4
  },
  {
    "pista": "Sofía pierde a uno donde se sienta la visita.",
    "respuesta": "SOFA",
    "definicion": [
      "donde se sienta la visita"
    ],
    "tipo": "Sustracción",
    "indicador": "pierde a",
    "relleno": [
      "Sofía",
      "uno"
    ],
    "explicacion": "SOFÍA pierde la I, el uno romano, y queda SOFÁ, donde se sienta la visita.",
    "dificultad": 3
  },
  {
    "pista": "Es, con cobalto y bario, lo que barre",
    "respuesta": "ESCOBA",
    "definicion": [
      "lo que barre"
    ],
    "tipo": "Charada",
    "indicador": [
      "con",
      "y"
    ],
    "relleno": [
      "Es",
      "cobalto",
      "bario"
    ],
    "explicacion": "ES, con CO (el cobalto) y BA (el bario): ESCOBA, lo que barre.",
    "dificultad": 4
  },
  {
    "pista": "La cama del perro frente al dios del sol para la sopa.",
    "respuesta": "CUCHARA",
    "definicion": [
      "para la sopa"
    ],
    "tipo": "Charada",
    "indicador": "frente al",
    "relleno": [
      "La cama del perro",
      "dios del sol"
    ],
    "explicacion": "La cama del perro es la CUCHA y el dios egipcio del sol, RA. CUCHA + RA = CUCHARA, para la sopa.",
    "dificultad": 4
  },
  {
    "pista": "La fruta del verano se traga el aluminio en el calzado de playa.",
    "respuesta": "SANDALIA",
    "definicion": [
      "en el calzado de playa"
    ],
    "tipo": "Contenedor",
    "indicador": "se traga",
    "relleno": [
      "La fruta del verano",
      "el aluminio"
    ],
    "explicacion": "La fruta del verano es la SANDÍA; se traga AL, el aluminio, y queda SAND·AL·IA, SANDALIA, calzado de playa.",
    "dificultad": 4
  },
  {
    "pista": "Un pez de río abraza a la muda donde cuelga la camisa.",
    "respuesta": "PERCHA",
    "definicion": [
      "donde cuelga la camisa"
    ],
    "tipo": "Contenedor",
    "indicador": "abraza a",
    "relleno": [
      "Un pez de río",
      "la muda"
    ],
    "explicacion": "La PERCA es un pez de río; abraza a la H, la letra muda, y queda PERC·H·A, PERCHA, donde cuelga la camisa.",
    "dificultad": 4
  },
  {
    "pista": "Marraqueta pegada al punto débil de Aquiles se usa con cinturón.",
    "respuesta": "PANTALON",
    "definicion": [
      "se usa con cinturón"
    ],
    "tipo": "Charada",
    "indicador": "pegada al",
    "relleno": [
      "Marraqueta",
      "punto débil de Aquiles"
    ],
    "explicacion": "La marraqueta es PAN y el punto débil de Aquiles, su TALÓN. PAN + TALÓN = PANTALÓN, que se usa con cinturón.",
    "dificultad": 4
  },
  {
    "pista": "Camino accidentado lleva la carga.",
    "respuesta": "CAMION",
    "definicion": [
      "lleva la carga"
    ],
    "tipo": "Anagrama",
    "indicador": "accidentado",
    "relleno": [
      "Camino"
    ],
    "explicacion": "Las letras de CAMINO, accidentadas, forman CAMIÓN, el que lleva la carga.",
    "dificultad": 3
  },
  {
    "pista": "Romeo recibe al rey en la hierba del cordero.",
    "respuesta": "ROMERO",
    "definicion": [
      "en la hierba del cordero"
    ],
    "tipo": "Contenedor",
    "indicador": "recibe al",
    "relleno": [
      "Romeo",
      "rey"
    ],
    "explicacion": "ROMEO recibe la R del rey y queda ROME·R·O, ROMERO, la hierba que acompaña al cordero.",
    "dificultad": 4
  },
  {
    "pista": "La herramienta del jardinero con tiempo dentro va en el completo italiano.",
    "respuesta": "PALTA",
    "definicion": [
      "va en el completo italiano"
    ],
    "tipo": "Contenedor",
    "indicador": [
      "con",
      "dentro"
    ],
    "relleno": [
      "La herramienta del jardinero",
      "tiempo"
    ],
    "explicacion": "La herramienta del jardinero es la PALA; con la T del tiempo dentro queda PAL·T·A, PALTA, el verde del completo italiano.",
    "dificultad": 4
  },
  {
    "pista": "Va en la humita, enterrado en mucho cloro",
    "respuesta": "CHOCLO",
    "definicion": [
      "Va en la humita"
    ],
    "tipo": "Palabra escondida",
    "indicador": "enterrado en",
    "relleno": [
      "mucho cloro"
    ],
    "explicacion": "Enterrado en muCHO CLOro está CHOCLO, lo que va en la humita.",
    "dificultad": 4
  },
  {
    "pista": "Cordillera entre los grandes",
    "respuesta": "ANDES",
    "definicion": [
      "Cordillera"
    ],
    "tipo": "Palabra escondida",
    "indicador": "entre",
    "relleno": [
      "los grandes"
    ],
    "explicacion": "Entre los grANDES está ANDES, la cordillera.",
    "dificultad": 3
  },
  {
    "pista": "Departamento con cien dentro, el de la piscola.",
    "respuesta": "PISCO",
    "definicion": [
      "el de la piscola"
    ],
    "tipo": "Contenedor",
    "indicador": [
      "con",
      "dentro"
    ],
    "relleno": [
      "Departamento",
      "cien"
    ],
    "explicacion": "El departamento es un PISO; con la C de cien dentro queda PIS·C·O, PISCO, el de la piscola.",
    "dificultad": 3
  },
  {
    "pista": "Se reza; tiene sujeto y predicado",
    "respuesta": "ORACION",
    "definicion": [
      "Se reza",
      "tiene sujeto y predicado"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La ORACIÓN se reza, y una oración también tiene sujeto y predicado.",
    "dificultad": 3
  },
  {
    "pista": "Teje en el rincón; cuelga del techo del salón",
    "respuesta": "ARAÑA",
    "definicion": [
      "Teje en el rincón",
      "cuelga del techo del salón"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La ARAÑA teje en el rincón, y una araña es también la lámpara de varios brazos que cuelga del techo del salón.",
    "dificultad": 3
  },
  {
    "pista": "Abre la puerta; inmoviliza en la lucha",
    "respuesta": "LLAVE",
    "definicion": [
      "Abre la puerta",
      "inmoviliza en la lucha"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La LLAVE abre la puerta, y en la lucha una llave inmoviliza al rival.",
    "dificultad": 3
  },
  {
    "pista": "Hija de la tía a la orilla en la estación florida.",
    "respuesta": "PRIMAVERA",
    "definicion": [
      "en la estación florida"
    ],
    "tipo": "Charada",
    "indicador": "a la",
    "relleno": [
      "Hija de la tía",
      "orilla"
    ],
    "explicacion": "La hija de la tía es la PRIMA y la orilla, la VERA. PRIMA + VERA = PRIMAVERA, la estación florida.",
    "dificultad": 4
  },
  {
    "pista": "Volumen abreviado y perro escupen lava.",
    "respuesta": "VOLCAN",
    "definicion": [
      "escupen lava"
    ],
    "tipo": "Charada",
    "indicador": [
      "abreviado",
      "y"
    ],
    "relleno": [
      "Volumen",
      "perro"
    ],
    "explicacion": "Volumen abreviado es VOL y el perro, CAN. VOL + CAN = VOLCÁN, que escupe lava.",
    "dificultad": 4
  },
  {
    "pista": "Un calcetín para la oscuridad a las doce en punto.",
    "respuesta": "MEDIANOCHE",
    "definicion": [
      "a las doce en punto"
    ],
    "tipo": "Charada",
    "indicador": "para",
    "relleno": [
      "Un calcetín",
      "la oscuridad"
    ],
    "explicacion": "Un calcetín es una MEDIA y la oscuridad, la NOCHE. MEDIA + NOCHE = MEDIANOCHE, las doce en punto.",
    "dificultad": 2
  },
  {
    "pista": "Lo que hace aquel a quien Dios ayuda y luego regala las horas antes del alba.",
    "respuesta": "MADRUGADA",
    "definicion": [
      "las horas antes del alba"
    ],
    "tipo": "Charada",
    "indicador": "y luego",
    "relleno": [
      "Lo que hace aquel a quien Dios ayuda",
      "regala"
    ],
    "explicacion": "Al que MADRUGA, Dios lo ayuda; luego, regala es DA. MADRUGA + DA = MADRUGADA, las horas antes del alba.",
    "dificultad": 5
  },
  {
    "pista": "Bajo el sol latino se cuece la cazuela",
    "respuesta": "OLLA",
    "definicion": [
      "la cazuela"
    ],
    "tipo": "Palabra escondida",
    "indicador": "se cuece",
    "relleno": [
      "Bajo el sol latino"
    ],
    "explicacion": "Cociéndose en bajo el sOL LAtino está OLLA, la cazuela.",
    "dificultad": 4
  },
  {
    "pista": "Que rece, luego triunfo, en la hierba de la pizza.",
    "respuesta": "OREGANO",
    "definicion": [
      "en la hierba de la pizza"
    ],
    "tipo": "Charada",
    "indicador": "luego",
    "relleno": [
      "Que rece",
      "triunfo"
    ],
    "explicacion": "Que rece es que ORE, y triunfo es GANO. ORE + GANO = ORÉGANO, la hierba de la pizza.",
    "dificultad": 4
  },
  {
    "pista": "¡_ocur_, _isparat_, _onterí_!",
    "respuesta": "SIN PIES NI CABEZA",
    "definicion": [
      "¡_ocur_, _isparat_, _onterí_!"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A cada palabra le faltan la cabeza y los pies, su primera y su última letra: (L)ocur(a), (D)isparat(e), (T)onterí(a). Y una locura, un disparate o una tontería son cosas SIN PIES NI CABEZA.",
    "dificultad": 4
  },
  {
    "pista": "Habla neutro: cafe, te, papa, mama",
    "respuesta": "SIN ACENTO",
    "definicion": [
      "Habla neutro: cafe, te, papa, mama"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A café, té, papá y mamá les falta la tilde: están sin acento. Y quien habla neutro habla SIN ACENTO.",
    "dificultad": 4
  },
  {
    "pista": "_ocuelo, _onto, _espistado",
    "respuesta": "SIN CABEZA",
    "definicion": [
      "_ocuelo, _onto, _espistado"
    ],
    "tipo": "Letras omitidas",
    "indicador": "",
    "relleno": [],
    "explicacion": "A cada palabra le falta la cabeza, su primera letra: (L)ocuelo, (T)onto, (D)espistado. Y alguien así de atolondrado es alguien SIN CABEZA.",
    "dificultad": 3
  },
  {
    "pista": "El cerro, según los cabecillas de mil ovejas nunca trepan a ñandúes asustados",
    "respuesta": "MONTAÑA",
    "definicion": [
      "El cerro"
    ],
    "tipo": "Selector",
    "indicador": "según los cabecillas de",
    "relleno": [
      "mil ovejas nunca trepan a ñandúes asustados"
    ],
    "explicacion": "Los cabecillas de Mil Ovejas Nunca Trepan A Ñandúes Asustados son sus iniciales: MONTAÑA, el cerro.",
    "dificultad": 4
  },
  {
    "pista": "Lo que arrastran robot, mono, stop, gato excava bajo el pasto.",
    "respuesta": "TOPO",
    "definicion": [
      "excava bajo el pasto"
    ],
    "tipo": "Selector",
    "indicador": "Lo que arrastran",
    "relleno": [
      "robot, mono, stop, gato"
    ],
    "explicacion": "Lo que arrastran es su cola, la última letra: robo(T), mon(O), sto(P), gat(O). TOPO, el que excava bajo el pasto.",
    "dificultad": 5
  },
  {
    "pista": "Prenda con botones abduce al extraterrestre, la del equipo.",
    "respuesta": "CAMISETA",
    "definicion": [
      "la del equipo"
    ],
    "tipo": "Contenedor",
    "indicador": "abduce al",
    "relleno": [
      "Prenda con botones",
      "extraterrestre"
    ],
    "explicacion": "La prenda con botones es la CAMISA; abduce a ET, el extraterrestre, y queda CAMIS·ET·A, CAMISETA, la del equipo.",
    "dificultad": 4
  },
  {
    "pista": "La astuta del cuento, de vuelta, en la paella",
    "respuesta": "ARROZ",
    "definicion": [
      "en la paella"
    ],
    "tipo": "Reverso",
    "indicador": "de vuelta",
    "relleno": [
      "La astuta del cuento"
    ],
    "explicacion": "La astuta del cuento es la ZORRA; de vuelta, al revés, da ARROZ, que está en la paella.",
    "dificultad": 4
  },
  {
    "pista": "Anita, de regreso, acierta",
    "respuesta": "ATINA",
    "definicion": [
      "acierta"
    ],
    "tipo": "Reverso",
    "indicador": "de regreso",
    "relleno": [
      "Anita"
    ],
    "explicacion": "ANITA, de regreso, se lee ATINA, acierta.",
    "dificultad": 3
  },
  {
    "pista": "Doce brazos camuflan a la rayada de la sabana",
    "respuesta": "CEBRA",
    "definicion": [
      "a la rayada de la sabana"
    ],
    "tipo": "Palabra escondida",
    "indicador": "camuflan",
    "relleno": [
      "Doce brazos"
    ],
    "explicacion": "Camuflada en doCE BRAzos está CEBRA, la rayada de la sabana.",
    "dificultad": 4
  },
  {
    "pista": "Trece dromedarios dan sombra a un árbol del Líbano",
    "respuesta": "CEDRO",
    "definicion": [
      "un árbol del Líbano"
    ],
    "tipo": "Palabra escondida",
    "indicador": "dan sombra a",
    "relleno": [
      "Trece dromedarios"
    ],
    "explicacion": "A la sombra de treCE DROmedarios está CEDRO, el árbol del Líbano.",
    "dificultad": 4
  },
  {
    "pista": "Cines de otra cartelera, el del lago de Tchaikovsky.",
    "respuesta": "CISNE",
    "definicion": [
      "el del lago de Tchaikovsky"
    ],
    "tipo": "Anagrama",
    "indicador": "de otra cartelera",
    "relleno": [
      "Cines"
    ],
    "explicacion": "Las letras de CINES, con otra cartelera, forman CISNE, el de «El lago de los cisnes».",
    "dificultad": 4
  },
  {
    "pista": "Neón y tosca, el de Isla Negra.",
    "respuesta": "NERUDA",
    "definicion": [
      "el de Isla Negra"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Neón",
      "tosca"
    ],
    "explicacion": "NE es el símbolo del neón y tosca es RUDA. NE + RUDA = NERUDA, el poeta de Isla Negra.",
    "dificultad": 5
  },
  {
    "pista": "Una pareja y el dios del sol dan uvas en el patio.",
    "respuesta": "PARRA",
    "definicion": [
      "dan uvas en el patio"
    ],
    "tipo": "Charada",
    "indicador": "y",
    "relleno": [
      "Una pareja",
      "el dios del sol"
    ],
    "explicacion": "Una pareja es un PAR y el dios egipcio del sol, RA. PAR + RA = PARRA, la que da uvas en el patio (y la Violeta de «Gracias a la vida»).",
    "dificultad": 4
  },
  {
    "pista": "Amarra el lecho en el desierto más seco.",
    "respuesta": "ATACAMA",
    "definicion": [
      "en el desierto más seco"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "Amarra",
      "el lecho"
    ],
    "explicacion": "Amarra es ATA y el lecho, la CAMA. ATA + CAMA = ATACAMA, el desierto más seco.",
    "dificultad": 4
  },
  {
    "pista": "La primera millonaria en la ciudad de la eterna primavera.",
    "respuesta": "ARICA",
    "definicion": [
      "en la ciudad de la eterna primavera"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "La primera",
      "millonaria"
    ],
    "explicacion": "La primera letra es la A y millonaria es RICA. A + RICA = ARICA, la ciudad de la eterna primavera.",
    "dificultad": 5
  },
  {
    "pista": "Semejante con calcio va antes de París y Londres",
    "respuesta": "TALCA",
    "definicion": [
      "va antes de París y Londres"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Semejante",
      "calcio"
    ],
    "explicacion": "Semejante es TAL y el calcio, CA. TAL + CA = TALCA, la que va antes de París y Londres en el dicho.",
    "dificultad": 4
  },
  {
    "pista": "Palo de la bandera, de oídas, precede a la vista",
    "respuesta": "ASTA",
    "definicion": [
      "Palo de la bandera"
    ],
    "tipo": "Onomatopeya",
    "indicador": "de oídas",
    "relleno": [
      "precede a la vista"
    ],
    "explicacion": "El ASTA es el palo de la bandera y, de oídas, suena igual que HASTA, lo que precede a «la vista».",
    "dificultad": 4
  },
  {
    "pista": "Metal de la fragua; dicho en voz alta, me equivoco",
    "respuesta": "HIERRO",
    "definicion": [
      "Metal de la fragua"
    ],
    "tipo": "Onomatopeya",
    "indicador": "dicho en voz alta,",
    "relleno": [
      "me equivoco"
    ],
    "explicacion": "El HIERRO es el metal de la fragua y, dicho en voz alta, suena igual que YERRO, me equivoco.",
    "dificultad": 4
  },
  {
    "pista": "Unir con aguja, según se oye, hervir la papa",
    "respuesta": "COSER",
    "definicion": [
      "Unir con aguja"
    ],
    "tipo": "Onomatopeya",
    "indicador": "según se oye",
    "relleno": [
      "hervir la papa"
    ],
    "explicacion": "COSER es unir con aguja y, según se oye, suena igual que COCER, hervir la papa, cuando se sesea.",
    "dificultad": 3
  },
  {
    "pista": "Apretar con cariño, al oído, quemar",
    "respuesta": "ABRAZAR",
    "definicion": [
      "Apretar con cariño"
    ],
    "tipo": "Onomatopeya",
    "indicador": "al oído",
    "relleno": [
      "quemar"
    ],
    "explicacion": "ABRAZAR es apretar con cariño y, al oído, suena igual que ABRASAR, quemar, cuando se sesea.",
    "dificultad": 3
  },
  {
    "pista": "Microbio con forma de bastón, por lo que se oye, dudo",
    "respuesta": "BACILO",
    "definicion": [
      "Microbio con forma de bastón"
    ],
    "tipo": "Onomatopeya",
    "indicador": "por lo que se oye",
    "relleno": [
      "dudo"
    ],
    "explicacion": "El BACILO es un microbio con forma de bastón y, por lo que se oye, suena igual que VACILO, dudo.",
    "dificultad": 4
  },
  {
    "pista": "Bolso de la dama; ministerio",
    "respuesta": "CARTERA",
    "definicion": [
      "Bolso de la dama",
      "ministerio"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La CARTERA es el bolso de la dama, y una cartera es también un ministerio.",
    "dificultad": 4
  },
  {
    "pista": "Lodo; grano de la cara",
    "respuesta": "BARRO",
    "definicion": [
      "Lodo",
      "grano de la cara"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "El BARRO es lodo, y un barro es también un grano de la cara.",
    "dificultad": 4
  },
  {
    "pista": "Cráneo; juerguista",
    "respuesta": "CALAVERA",
    "definicion": [
      "Cráneo",
      "juerguista"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La CALAVERA es el cráneo, y un calavera es un juerguista.",
    "dificultad": 4
  },
  {
    "pista": "Paro; está de más",
    "respuesta": "HUELGA",
    "definicion": [
      "Paro",
      "está de más"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "La HUELGA es un paro, y «huelga» también quiere decir que algo está de más, como en «huelga decir».",
    "dificultad": 5
  },
  {
    "pista": "Del rey, de verdad",
    "respuesta": "REAL",
    "definicion": [
      "Del rey",
      "de verdad"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "REAL es lo del rey y también lo que es de verdad.",
    "dificultad": 3
  },
  {
    "pista": "Con mucha sal; carísimo en Chile",
    "respuesta": "SALADO",
    "definicion": [
      "Con mucha sal",
      "carísimo en Chile"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "SALADO es lo que tiene mucha sal y, en Chile, lo que está carísimo.",
    "dificultad": 3
  },
  {
    "pista": "El argumento esconde un estacionamiento. ¡Qué engaño!",
    "respuesta": "TRAMPA",
    "definicion": [
      "¡Qué engaño!"
    ],
    "tipo": "Contenedor",
    "indicador": "esconde",
    "relleno": [
      "El argumento",
      "un estacionamiento"
    ],
    "explicacion": "El argumento es la TRAMA; esconde la P de estacionamiento y queda TRAM·P·A, TRAMPA, un engaño.",
    "dificultad": 4
  },
  {
    "pista": "Se lleva lo ajeno, la nave sin piloto.",
    "respuesta": "LADRON",
    "definicion": [
      "Se lleva lo ajeno"
    ],
    "tipo": "Charada",
    "indicador": "",
    "relleno": [
      "la",
      "nave sin piloto"
    ],
    "explicacion": "LA y la nave sin piloto, un DRON. LA + DRON = LADRÓN, el que se lleva lo ajeno.",
    "dificultad": 4
  },
  {
    "pista": "Añoranza de un revuelto Santiago a los cincuenta",
    "respuesta": "NOSTALGIA",
    "definicion": [
      "Añoranza"
    ],
    "tipo": "Anagrama",
    "indicador": [
      "de un revuelto",
      "a los"
    ],
    "relleno": [
      "Santiago",
      "cincuenta"
    ],
    "explicacion": "SANTIAGO más la L, cincuenta en romanos, revueltos, forman NOSTALGIA, la añoranza.",
    "dificultad": 5
  },
  {
    "pista": "Damitas de juerga en el lazo entre amigos.",
    "respuesta": "AMISTAD",
    "definicion": [
      "en el lazo entre amigos"
    ],
    "tipo": "Anagrama",
    "indicador": "de juerga",
    "relleno": [
      "Damitas"
    ],
    "explicacion": "Las letras de DAMITAS, de juerga, forman AMISTAD, el lazo entre amigos.",
    "dificultad": 3
  },
  {
    "pista": "Ritmo de La Habana con carcajada, el gesto de la Gioconda.",
    "respuesta": "SONRISA",
    "definicion": [
      "el gesto de la Gioconda"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "Ritmo de La Habana",
      "carcajada"
    ],
    "explicacion": "El ritmo de La Habana es el SON y la carcajada, la RISA. SON + RISA = SONRISA, el gesto de la Gioconda.",
    "dificultad": 4
  },
  {
    "pista": "Al frente de varios ejércitos nunca usan sables por la diosa del amor.",
    "respuesta": "VENUS",
    "definicion": [
      "por la diosa del amor"
    ],
    "tipo": "Selector",
    "indicador": "Al frente de",
    "relleno": [
      "varios ejércitos nunca usan sables"
    ],
    "explicacion": "Al frente de Varios Ejércitos Nunca Usan Sables van sus iniciales: VENUS, la diosa del amor.",
    "dificultad": 3
  },
  {
    "pista": "Pocos lo usan, tan olvidado, ninguneado, desde el comienzo, el planeta degradado.",
    "respuesta": "PLUTON",
    "definicion": [
      "el planeta degradado"
    ],
    "tipo": "Selector",
    "indicador": "desde el comienzo",
    "relleno": [
      "Pocos lo usan, tan olvidado, ninguneado"
    ],
    "explicacion": "Las iniciales de «pocos lo usan, tan olvidado, ninguneado» forman PLUTÓN, el planeta degradado.",
    "dificultad": 4
  },
  {
    "pista": "Estatuilla de Hollywood entre dos caras",
    "respuesta": "OSCAR",
    "definicion": [
      "Estatuilla de Hollywood"
    ],
    "tipo": "Palabra escondida",
    "indicador": "entre",
    "relleno": [
      "dos caras"
    ],
    "explicacion": "Entre dOS CARas está ÓSCAR, la estatuilla de Hollywood.",
    "dificultad": 4
  },
  {
    "pista": "La que no has de beber, junto a nada, en pleno chaparrón.",
    "respuesta": "AGUACERO",
    "definicion": [
      "en pleno chaparrón"
    ],
    "tipo": "Charada",
    "indicador": "junto a",
    "relleno": [
      "La que no has de beber",
      "nada"
    ],
    "explicacion": "Agua que no has de beber, déjala correr: AGUA. Junto a nada, CERO, forma AGUACERO, un chaparrón.",
    "dificultad": 5
  },
  {
    "pista": "El que muere por la boca con garra en el pie del chancho.",
    "respuesta": "PEZUÑA",
    "definicion": [
      "en el pie del chancho"
    ],
    "tipo": "Charada",
    "indicador": "con",
    "relleno": [
      "El que muere por la boca",
      "garra"
    ],
    "explicacion": "Por la boca muere el PEZ; con la garra, la UÑA, forma PEZUÑA, el pie del chancho.",
    "dificultad": 5
  },
  {
    "pista": "Como aire guarda un coloso de Rapa Nui",
    "respuesta": "MOAI",
    "definicion": [
      "un coloso de Rapa Nui"
    ],
    "tipo": "Palabra escondida",
    "indicador": "guarda",
    "relleno": [
      "Como aire"
    ],
    "explicacion": "En coMO AIre se guarda MOAI, el coloso de Rapa Nui.",
    "dificultad": 4
  },
  {
    "pista": "Capa del rey sin anillo ante él cubre la mesa.",
    "respuesta": "MANTEL",
    "definicion": [
      "cubre la mesa"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "sin anillo",
      "ante"
    ],
    "relleno": [
      "Capa del rey",
      "él"
    ],
    "explicacion": "La capa del rey es el MANTO; sin el anillo, la O, queda MANT, y ante ÉL forma MANTEL, lo que cubre la mesa.",
    "dificultad": 5
  },
  {
    "pista": "Un varón cambia el final por un anillo donde se apoya el amigo.",
    "respuesta": "HOMBRO",
    "definicion": [
      "donde se apoya el amigo"
    ],
    "tipo": "Misceláneas",
    "indicador": "cambia el final por un anillo",
    "relleno": [
      "Un varón"
    ],
    "explicacion": "Un varón es un HOMBRE; si cambia su final, la E, por un anillo, la O, queda HOMBRO, donde se apoya el amigo.",
    "dificultad": 4
  },
  {
    "pista": "El hombre americano con un litro extra en tequila. ¡Cuántas calorías doradas!",
    "respuesta": "MANTEQUILLA",
    "definicion": [
      "¡Cuántas calorías doradas!"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "americano",
      "con",
      "extra en"
    ],
    "relleno": [
      "hombre",
      "un litro",
      "tequila"
    ],
    "notas": {
      "indicador": "«Americano» pide pasar al inglés, «extra en» mete algo dentro y «con» es un simple conector."
    },
    "explicacion": "«El hombre americano» nos indica que la primera parte es MAN, la palabra hombre en inglés. Luego seguimos con un litro, L, extra en, es decir dentro de, TEQUILA. Si lo juntamos todo nos queda la respuesta final, MANTEQUILLA: algo que tiene muchas calorías y es dorado.",
    "dificultad": 4
  },
  {
    "pista": "Al laboratorio de 9 a 5... Cambiar de turno...",
    "respuesta": "ROTAR",
    "definicion": [
      "Cambiar de turno..."
    ],
    "tipo": "Selector",
    "indicador": "de 9 a 5",
    "relleno": [
      "laboratorio"
    ],
    "notas": {
      "indicador": "Es un selector especial que nos dice en qué caracteres fijarnos en algún relleno."
    },
    "explicacion": "Se toman las letras de LABORATORIO desde la novena hasta la quinta, contando hacia atrás: R, O, T, A, R. Queda ROTAR, que es cambiar de turno.",
    "dificultad": 4
  },
  {
    "pista": "El gato inglés con una nota se tiende en una cama sencilla.",
    "respuesta": "CATRE",
    "definicion": [
      "se tiende en una cama sencilla"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "inglés",
      "con"
    ],
    "relleno": [
      "El gato",
      "una nota"
    ],
    "notas": {
      "indicador": "«Inglés» pide pasar al inglés y «con» une las piezas."
    },
    "explicacion": "El gato en inglés es CAT; con una nota, RE, forma CATRE, una cama sencilla donde tenderse.",
    "dificultad": 4
  },
  {
    "pista": "El auto gringo, una nota y una infusión arman la fiesta del viernes.",
    "respuesta": "CARRETE",
    "definicion": [
      "arman la fiesta del viernes"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "gringo",
      "y"
    ],
    "relleno": [
      "El auto",
      "una nota",
      "una infusión"
    ],
    "notas": {
      "indicador": "«Gringo» pide pasar al inglés y «y» une las piezas."
    },
    "explicacion": "El auto gringo es CAR; una nota es RE y una infusión, TÉ. CAR + RE + TE = CARRETE, la fiesta del viernes en Chile.",
    "dificultad": 4
  },
  {
    "pista": "El chico inglés con la primera del abecedario flota en el mar.",
    "respuesta": "BOYA",
    "definicion": [
      "flota en el mar"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "inglés",
      "con"
    ],
    "relleno": [
      "El chico",
      "la primera del abecedario"
    ],
    "explicacion": "El chico en inglés es BOY; con la primera letra del abecedario, la A, forma BOYA, lo que flota en el mar.",
    "dificultad": 3
  },
  {
    "pista": "El hombre gringo con uno se come en el estadio.",
    "respuesta": "MANI",
    "definicion": [
      "se come en el estadio"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "gringo",
      "con"
    ],
    "relleno": [
      "El hombre",
      "uno"
    ],
    "notas": {
      "relleno": "«Uno» se escribe I en números romanos."
    },
    "explicacion": "El hombre gringo es MAN y uno, en números romanos, es I. MAN + I = MANÍ, lo que se come en el estadio.",
    "dificultad": 4
  },
  {
    "pista": "Ríe sin final dentro del caño. ¡Amor de abuela!",
    "respuesta": "CARIÑO",
    "definicion": [
      "¡Amor de abuela!"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "sin final",
      "dentro del"
    ],
    "relleno": [
      "Ríe",
      "caño"
    ],
    "explicacion": "RÍE sin su final queda RI; metido dentro de CAÑO da CA·RI·ÑO, CARIÑO, el amor de abuela.",
    "dificultad": 4
  },
  {
    "pista": "Bebé en Santiago; bus en La Habana.",
    "respuesta": "GUAGUA",
    "definicion": [
      "Bebé en Santiago",
      "bus en La Habana"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "En Chile la GUAGUA es el bebé, y en Cuba la guagua es el bus.",
    "dificultad": 3
  },
  {
    "pista": "Novio en Santiago; escarabajo que zumba en verano.",
    "respuesta": "POLOLO",
    "definicion": [
      "Novio en Santiago",
      "escarabajo que zumba en verano"
    ],
    "tipo": "Doble definición",
    "indicador": "",
    "relleno": [],
    "explicacion": "En Chile el POLOLO es el novio, y también un escarabajo verde que zumba en verano.",
    "dificultad": 3
  },
  {
    "pista": "Restan, revueltos, donde se fríen los huevos.",
    "respuesta": "SARTEN",
    "definicion": [
      "donde se fríen los huevos"
    ],
    "tipo": "Anagrama",
    "indicador": "revueltos",
    "relleno": [
      "Restan"
    ],
    "explicacion": "Las letras de RESTAN, revueltas como los huevos, forman SARTÉN, donde se fríen.",
    "dificultad": 3
  },
  {
    "pista": "La galería, alborotada de felicidad.",
    "respuesta": "ALEGRIA",
    "definicion": [
      "de felicidad"
    ],
    "tipo": "Anagrama",
    "indicador": "alborotada",
    "relleno": [
      "La galería"
    ],
    "explicacion": "Las letras de GALERÍA, alborotadas, forman ALEGRÍA, la felicidad.",
    "dificultad": 3
  },
  {
    "pista": "Un adiós escondido en mucha ola.",
    "respuesta": "CHAO",
    "definicion": [
      "Un adiós"
    ],
    "tipo": "Palabra escondida",
    "indicador": "escondido en",
    "relleno": [
      "mucha ola"
    ],
    "explicacion": "En muCHA Ola se esconde CHAO, un adiós.",
    "dificultad": 2
  },
  {
    "pista": "Lucas pierde la cola y vale mil pesos.",
    "respuesta": "LUCA",
    "definicion": [
      "y vale mil pesos"
    ],
    "tipo": "Sustracción",
    "indicador": "pierde la cola",
    "relleno": [
      "Lucas"
    ],
    "explicacion": "LUCAS sin la cola, su última letra, queda LUCA, que en Chile son mil pesos.",
    "dificultad": 2
  },
  {
    "pista": "El grifo metálico esconde algo aburrido.",
    "respuesta": "FOME",
    "definicion": [
      "algo aburrido"
    ],
    "tipo": "Palabra escondida",
    "indicador": "esconde",
    "relleno": [
      "El grifo metálico"
    ],
    "explicacion": "En el griFO MEtálico se esconde FOME, que en Chile es aburrido.",
    "dificultad": 3
  },
  {
    "pista": "El portaequipajes mira al norte. ¡Buenísimo!",
    "respuesta": "BACAN",
    "definicion": [
      "¡Buenísimo!"
    ],
    "tipo": "Charada",
    "indicador": "mira al",
    "relleno": [
      "El portaequipajes",
      "norte"
    ],
    "explicacion": "El portaequipajes del techo es la BACA; mirando al norte suma la N: BACÁN, que en Chile es buenísimo.",
    "dificultad": 3
  },
  {
    "pista": "Lo caliente de Londres, con él, te recibe en vacaciones.",
    "respuesta": "HOTEL",
    "definicion": [
      "te recibe en vacaciones"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "de Londres",
      "con"
    ],
    "relleno": [
      "Lo caliente",
      "él"
    ],
    "notas": {
      "indicador": "«De Londres» pide pasar al inglés y «con» une las piezas."
    },
    "explicacion": "Caliente en inglés, el idioma de Londres, es HOT; con ÉL forma HOTEL, que te recibe en vacaciones.",
    "dificultad": 4
  },
  {
    "pista": "Diez y es, para un gringo, se juega con raqueta.",
    "respuesta": "TENIS",
    "definicion": [
      "se juega con raqueta"
    ],
    "tipo": "Misceláneas",
    "indicador": [
      "y",
      "para un gringo"
    ],
    "relleno": [
      "Diez",
      "es"
    ],
    "explicacion": "Para un gringo, diez es TEN y es es IS. TEN + IS = TENIS, que se juega con raqueta.",
    "dificultad": 4
  },
  {
    "pista": "Los capitanes cruzan el río rápido, osados, hasta el San Cristóbal.",
    "respuesta": "CERRO",
    "definicion": [
      "hasta el San Cristóbal"
    ],
    "tipo": "Selector",
    "indicador": "Los capitanes",
    "relleno": [
      "cruzan el río rápido, osados"
    ],
    "explicacion": "Los capitanes van a la cabeza: Cruzan, El, Río, Rápido, Osados forman CERRO, como el San Cristóbal de Santiago.",
    "dificultad": 3
  }
];
