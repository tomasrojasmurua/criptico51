// Banco de pistas. Una por día a partir de FECHA_INICIO (UTC).
// - respuesta: en mayúsculas, sin tildes (Ñ permitida)
// - definicion: fragmentos exactos de la pista que funcionan como definición
// - tipo: mecanismo críptico (ver sección Aprender)
// - indicador: palabra que señala el mecanismo (opcional)
// - explicacion: cómo se resuelve
const FECHA_INICIO = "2026-10-11";

const PISTAS = [
  {
    pista: "Amor revuelto en la capital italiana",
    respuesta: "ROMA",
    definicion: ["la capital italiana"],
    tipo: "Anagrama",
    indicador: "revuelto",
    explicacion: "Las letras de AMOR, «revueltas», forman ROMA, la capital italiana."
  },
  {
    pista: "Fruta oculta en la témpera",
    respuesta: "PERA",
    definicion: ["Fruta"],
    tipo: "Palabra escondida",
    indicador: "oculta en",
    explicacion: "Dentro de «tém-PERA» se esconde PERA, una fruta."
  },
  {
    pista: "Flor que da vueltas al astro",
    respuesta: "GIRASOL",
    definicion: ["Flor"],
    tipo: "Charada",
    indicador: "",
    explicacion: "GIRA (da vueltas) + SOL (el astro) = GIRASOL, una flor."
  },
  {
    pista: "Roedor que vuelve a amarrar",
    respuesta: "RATA",
    definicion: ["Roedor"],
    tipo: "Inversión",
    indicador: "vuelve",
    explicacion: "Amarrar es ATAR; leído al revés («vuelve») da RATA, un roedor."
  },
  {
    pista: "Calzado: serpiente que abraza una te",
    respuesta: "BOTA",
    definicion: ["Calzado"],
    tipo: "Contenedor",
    indicador: "abraza",
    explicacion: "BOA (serpiente) abraza la letra T: BO·T·A = BOTA, un calzado."
  },
  {
    pista: "Unir en matrimonio sin final da hogar",
    respuesta: "CASA",
    definicion: ["hogar"],
    tipo: "Eliminación",
    indicador: "sin final",
    explicacion: "Unir en matrimonio es CASAR; sin su última letra queda CASA, un hogar."
  },
  {
    pista: "Saludo que suena como una onda del mar",
    respuesta: "HOLA",
    definicion: ["Saludo"],
    tipo: "Homófono",
    indicador: "suena como",
    explicacion: "Una onda del mar es una OLA, que suena igual que HOLA, un saludo."
  },
  {
    pista: "Religiosa con jamón alocado",
    respuesta: "MONJA",
    definicion: ["Religiosa"],
    tipo: "Anagrama",
    indicador: "alocado",
    explicacion: "Las letras de JAMÓN, «alocadas», forman MONJA, una religiosa."
  },
  {
    pista: "Felino que levanta coches",
    respuesta: "GATO",
    definicion: ["Felino", "levanta coches"],
    tipo: "Doble definición",
    indicador: "",
    explicacion: "Un GATO es un felino y también la herramienta que levanta coches."
  },
  {
    pista: "Tranquilidad al comienzo de Pedro, Ana y Zoé",
    respuesta: "PAZ",
    definicion: ["Tranquilidad"],
    tipo: "Acróstico",
    indicador: "al comienzo de",
    explicacion: "Las iniciales de Pedro, Ana y Zoé forman PAZ, tranquilidad."
  },
  {
    pista: "Bucanero: número irracional y roedor",
    respuesta: "PIRATA",
    definicion: ["Bucanero"],
    tipo: "Charada",
    indicador: "",
    explicacion: "PI (número irracional) + RATA (roedor) = PIRATA, un bucanero."
  },
  {
    pista: "Animal escondido en lo gracioso",
    respuesta: "OSO",
    definicion: ["Animal"],
    tipo: "Palabra escondida",
    indicador: "escondido en",
    explicacion: "Dentro de «graci-OSO» se esconde OSO, un animal."
  },
  {
    pista: "Militar: astro y cubo de juego",
    respuesta: "SOLDADO",
    definicion: ["Militar"],
    tipo: "Charada",
    indicador: "",
    explicacion: "SOL (astro) + DADO (cubo de juego) = SOLDADO, un militar."
  },
  {
    pista: "Asiento que tiene cajeros",
    respuesta: "BANCO",
    definicion: ["Asiento", "tiene cajeros"],
    tipo: "Doble definición",
    indicador: "",
    explicacion: "Un BANCO es un asiento y también la entidad que tiene cajeros."
  },
  {
    pista: "Animal de granja con credo trastocado",
    respuesta: "CERDO",
    definicion: ["Animal de granja"],
    tipo: "Anagrama",
    indicador: "trastocado",
    explicacion: "Las letras de CREDO, «trastocadas», forman CERDO, un animal de granja."
  },
  {
    pista: "Comida marina: faena del pescador con nota",
    respuesta: "PESCADO",
    definicion: ["Comida marina"],
    tipo: "Charada",
    indicador: "",
    explicacion: "PESCA (faena del pescador) + DO (nota musical) = PESCADO."
  },
  {
    pista: "Mensaje en el menú del restaurante",
    respuesta: "CARTA",
    definicion: ["Mensaje", "menú del restaurante"],
    tipo: "Doble definición",
    indicador: "",
    explicacion: "Una CARTA es un mensaje escrito y también el menú de un restaurante."
  }
];
