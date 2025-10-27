/**
 * Rutas predefinidas para vehículos en Piura, Perú
 */

export type RoutePoint = {
  lat: number;
  lng: number;
};

export type Route = {
  id: string;
  name: string;
  points: RoutePoint[];
};

export const predefindedRoutes: Route[] = [
  {
    id: "route_1",
    name: "Ruta Centro - Avenida Grau a Plaza de Armas",
    points: [
      { lat: -5.19449, lng: -80.63282 }, // Av. Grau - Centro
      { lat: -5.19000, lng: -80.62800 }, // Plaza de Armas
      { lat: -5.18500, lng: -80.62500 }, // Mercado Central
      { lat: -5.18000, lng: -80.62200 }, // Terminal
      { lat: -5.17800, lng: -80.61800 }, // Estación de Servicio
      { lat: -5.17600, lng: -80.61500 }, // Hospital
      { lat: -5.17400, lng: -80.61200 }, // Universidad
    ],
  },
  {
    id: "route_2",
    name: "Ruta Norte - Avenida Sánchez Cerro",
    points: [
      { lat: -5.20456, lng: -80.64567 }, // Av. Don Bosco
      { lat: -5.21000, lng: -80.65000 }, // Av. Sánchez Cerro
      { lat: -5.21500, lng: -80.65500 }, // Coliseo
      { lat: -5.22000, lng: -80.66000 }, // Centro Comercial
      { lat: -5.22500, lng: -80.66500 }, // Terminal Norte
      { lat: -5.23000, lng: -80.67000 }, // Zona Industrial
      { lat: -5.23500, lng: -80.67500 }, // Aeropuerto
    ],
  },
  {
    id: "route_3",
    name: "Ruta Este - Zona Residencial",
    points: [
      { lat: -5.18000, lng: -80.61000 }, // Hospital
      { lat: -5.17500, lng: -80.60800 }, // Colegio
      { lat: -5.17000, lng: -80.60600 }, // Parque
      { lat: -5.16500, lng: -80.60400 }, // Comercio
      { lat: -5.16000, lng: -80.60200 }, // Residencial
      { lat: -5.15500, lng: -80.60000 }, // Cerca del río
    ],
  },
  {
    id: "route_4",
    name: "Ruta Sur - Terminal Terrestre",
    points: [
      { lat: -5.21500, lng: -80.65500 }, // Terminal Terrestre
      { lat: -5.22000, lng: -80.65800 }, // Av. Vice
      { lat: -5.22500, lng: -80.66100 }, // Mercado Modelo
      { lat: -5.23000, lng: -80.66400 }, // Zona Comercial
      { lat: -5.23500, lng: -80.66700 }, // Av. Bolognesi
      { lat: -5.24000, lng: -80.67000 }, // Periférico
    ],
  },
  {
    id: "route_5",
    name: "Ruta Oeste - Avenida Independencia",
    points: [
      { lat: -5.19449, lng: -80.63282 }, // Av. Grau
      { lat: -5.19600, lng: -80.63400 }, // Av. Independencia
      { lat: -5.19800, lng: -80.63600 }, // Policía
      { lat: -5.20000, lng: -80.63800 }, // Banco
      { lat: -5.20200, lng: -80.64000 }, // Restaurante
      { lat: -5.20400, lng: -80.64200 }, // Parque Infantil
    ],
  },
  {
    id: "route_6",
    name: "Ruta Circular - Vuelta Completa",
    points: [
      { lat: -5.19449, lng: -80.63282 }, // Inicio
      { lat: -5.20000, lng: -80.63000 }, // Centro
      { lat: -5.20500, lng: -80.63500 }, // Norte
      { lat: -5.21000, lng: -80.64000 }, // Este
      { lat: -5.21500, lng: -80.64500 }, // Sur
      { lat: -5.21000, lng: -80.65000 }, // Oeste
      { lat: -5.20500, lng: -80.64500 }, // Regreso
      { lat: -5.20000, lng: -80.64000 }, // Regreso
      { lat: -5.19500, lng: -80.63500 }, // Regreso
      { lat: -5.19449, lng: -80.63282 }, // Inicio
    ],
  },
];

/**
 * Asigna una ruta aleatoria a un vehículo
 */
export function assignRandomRoute(vehicleId: string): Route & { currentPointIndex: number } {
  const randomRoute = predefindedRoutes[Math.floor(Math.random() * predefindedRoutes.length)];
  return {
    ...randomRoute,
    currentPointIndex: 0,
  };
}

/**
 * Calcula la distancia entre dos puntos (Haversine)
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
}

/**
 * Calcula el rumbo (heading) entre dos puntos
 */
export function calculateHeading(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const dLon = toRad(lon2 - lon1);
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);

  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  let brng = toDeg(Math.atan2(y, x));

  brng = (brng + 360) % 360; // Normalizar a 0-360
  return brng;
}

