/* Dataset de paquetes — Viajes Inolvidables
   Compartido entre index.html (destacados) y paquetes.html (catálogo completo). */

const PAQUETES = [
  {
    id: "ctg",
    destino: "Cartagena",
    pais: "Colombia",
    origenCod: "BOG",
    destinoCod: "CTG",
    precio: 850000,
    moneda: "COP",
    noches: 4,
    categoria: "Playa",
    perfiles: ["pareja", "grupo", "solo"],
    img: "https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=900&q=80",
    resumen: "Ciudad amurallada, atardeceres desde las murallas y playas de Bocagrande.",
    incluye: ["Vuelo ida y vuelta", "Hotel 4★ centro histórico", "Traslados aeropuerto", "City tour a pie"],
    destacado: true
  },
  {
    id: "sai",
    destino: "San Andrés",
    pais: "Colombia",
    origenCod: "BOG",
    destinoCod: "ADZ",
    precio: 980000,
    moneda: "COP",
    noches: 4,
    categoria: "Playa",
    perfiles: ["familia", "pareja"],
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    resumen: "El mar de los siete colores, ideal para snorkel y planes en familia.",
    incluye: ["Vuelo ida y vuelta", "Hotel todo incluido", "Tour Johnny Cay", "Seguro de viaje"],
    destacado: true
  },
  {
    id: "eje",
    destino: "Eje Cafetero",
    pais: "Colombia",
    origenCod: "BOG",
    destinoCod: "AXM",
    precio: 620000,
    moneda: "COP",
    noches: 3,
    categoria: "Naturaleza",
    perfiles: ["grupo", "familia", "solo"],
    img: "https://images.unsplash.com/photo-1621898099436-fd21a92e21c8?auto=format&fit=crop&w=900&q=80",
    resumen: "Fincas cafeteras, Valle de Cocora y turismo rural entre montañas.",
    incluye: ["Transporte terrestre", "Finca cafetera con desayuno", "Entrada Valle de Cocora", "Guía local"]
  },
  {
    id: "can",
    destino: "Cancún",
    pais: "México",
    origenCod: "BOG",
    destinoCod: "CUN",
    precio: 2450000,
    moneda: "COP",
    noches: 5,
    categoria: "Playa",
    perfiles: ["familia", "pareja"],
    img: "https://images.unsplash.com/photo-1519821172141-b5d8d5b0a233?auto=format&fit=crop&w=900&q=80",
    resumen: "Resort todo incluido frente al Caribe mexicano, ideal para desconectar.",
    incluye: ["Vuelo ida y vuelta", "Resort todo incluido", "Traslados privados", "Asistencia médica"],
    destacado: true
  },
  {
    id: "mac",
    destino: "Machu Picchu",
    pais: "Perú",
    origenCod: "BOG",
    destinoCod: "CUZ",
    precio: 1850000,
    moneda: "COP",
    noches: 5,
    categoria: "Aventura",
    perfiles: ["solo", "grupo"],
    img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=900&q=80",
    resumen: "Cusco, Valle Sagrado y la ciudadela inca en un recorrido guiado.",
    incluye: ["Vuelo ida y vuelta", "Hotel en Cusco", "Tren + entrada a la ciudadela", "Guía en español"]
  },
  {
    id: "nor",
    destino: "Fiordos de Noruega",
    pais: "Noruega",
    origenCod: "BOG",
    destinoCod: "BGO",
    precio: 6900000,
    moneda: "COP",
    noches: 8,
    categoria: "Naturaleza",
    perfiles: ["tercera-edad", "pareja"],
    img: "https://images.unsplash.com/photo-1500932334442-8761ee4810a7?auto=format&fit=crop&w=900&q=80",
    resumen: "Crucero panorámico por los fiordos, a un ritmo pausado y cómodo.",
    incluye: ["Vuelos internacionales", "Crucero por fiordos", "Hotel 4★", "Asistencia médica ampliada"]
  },
  {
    id: "par",
    destino: "París",
    pais: "Francia",
    origenCod: "BOG",
    destinoCod: "CDG",
    precio: 4500000,
    moneda: "COP",
    noches: 6,
    categoria: "Romántico",
    perfiles: ["pareja"],
    img: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=900&q=80",
    resumen: "Torre Eiffel, Louvre y crucero por el Sena en la ciudad del amor.",
    incluye: ["Vuelo ida y vuelta", "Hotel boutique", "City tour + Museo del Louvre", "Crucero por el Sena"]
  },
  {
    id: "tok",
    destino: "Tokio",
    pais: "Japón",
    origenCod: "BOG",
    destinoCod: "HND",
    precio: 5200000,
    moneda: "COP",
    noches: 7,
    categoria: "Cultural",
    perfiles: ["solo", "grupo"],
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80",
    resumen: "Tradición y modernidad: templos, barrios neón y tren bala a Kioto.",
    incluye: ["Vuelo ida y vuelta", "Hotel en Shinjuku", "Japan Rail Pass 7 días", "Tour gastronómico"]
  }
];

/* Corrige un id de imagen inválido si llegó a colarse (defensivo) */
PAQUETES.forEach(p => {
  if (!/^https:\/\/images\.unsplash\.com/.test(p.img)) {
    p.img = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80";
  }
});
