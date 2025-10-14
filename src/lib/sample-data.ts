import { Client, Driver, Vehicle, ServiceRequest } from './types';

// Datos de ejemplo para Clientes
export const sampleClients: Omit<Client, 'id'>[] = [
  {
    ruc: "20123456789",
    name: "Distribuidora Lima Norte S.A.C.",
    address: "Av. Túpac Amaru 1234, Independencia, Lima",
    contactName: "María Elena Rodríguez",
    contactPhone: "987654321",
    contactEmail: "maria.rodriguez@limanorte.com"
  },
  {
    ruc: "20123456790",
    name: "Comercial San Miguel E.I.R.L.",
    address: "Av. La Marina 567, San Miguel, Lima",
    contactName: "Carlos Alberto Vargas",
    contactPhone: "987654322",
    contactEmail: "carlos.vargas@sanmiguel.com"
  },
  {
    ruc: "20123456791",
    name: "Importaciones del Pacífico S.A.",
    address: "Jr. Ucayali 890, Callao, Lima",
    contactName: "Ana Patricia Silva",
    contactPhone: "987654323",
    contactEmail: "ana.silva@pacifico.com"
  },
  {
    ruc: "20123456792",
    name: "Exportaciones Andinas S.A.C.",
    address: "Av. Javier Prado Este 2345, San Isidro, Lima",
    contactName: "Roberto Carlos Mendoza",
    contactPhone: "987654324",
    contactEmail: "roberto.mendoza@andinas.com"
  },
  {
    ruc: "20123456793",
    name: "Logística Integral S.A.",
    address: "Av. Panamericana Sur Km 15, Villa El Salvador, Lima",
    contactName: "Lucía Fernanda Torres",
    contactPhone: "987654325",
    contactEmail: "lucia.torres@logisticaintegral.com"
  },
  {
    ruc: "20123456794",
    name: "Comercializadora Sur E.I.R.L.",
    address: "Av. Los Héroes 123, San Juan de Miraflores, Lima",
    contactName: "Diego Armando Herrera",
    contactPhone: "987654326",
    contactEmail: "diego.herrera@comercializadora.com"
  },
  {
    ruc: "20123456795",
    name: "Distribuidora Central S.A.C.",
    address: "Av. Abancay 456, Lima Cercado, Lima",
    contactName: "Carmen Rosa Quispe",
    contactPhone: "987654327",
    contactEmail: "carmen.quispe@central.com"
  },
  {
    ruc: "20123456796",
    name: "Transportes del Norte S.A.",
    address: "Av. Universitaria 789, San Martín de Porres, Lima",
    contactName: "Fernando José Ramos",
    contactPhone: "987654328",
    contactEmail: "fernando.ramos@norte.com"
  },
  {
    ruc: "20123456797",
    name: "Comercial Este S.A.C.",
    address: "Av. El Sol 321, Ate Vitarte, Lima",
    contactName: "Patricia Alejandra Flores",
    contactPhone: "987654329",
    contactEmail: "patricia.flores@este.com"
  },
  {
    ruc: "20123456798",
    name: "Importaciones Globales S.A.",
    address: "Av. República de Panamá 654, La Molina, Lima",
    contactName: "Miguel Ángel Castro",
    contactPhone: "987654330",
    contactEmail: "miguel.castro@globales.com"
  },
  {
    ruc: "20123456799",
    name: "Exportaciones del Sur S.A.C.",
    address: "Av. Separadora Industrial 987, Lurín, Lima",
    contactName: "Sandra Elizabeth Morales",
    contactPhone: "987654331",
    contactEmail: "sandra.morales@delsur.com"
  },
  {
    ruc: "20123456800",
    name: "Distribuidora Oeste E.I.R.L.",
    address: "Av. Mariscal Castilla 147, San Juan de Lurigancho, Lima",
    contactName: "Jorge Luis Paredes",
    contactPhone: "987654332",
    contactEmail: "jorge.paredes@oeste.com"
  },
  {
    ruc: "20123456801",
    name: "Comercial Norte S.A.",
    address: "Av. Carlos Izaguirre 258, Los Olivos, Lima",
    contactName: "Rosa María Gutiérrez",
    contactPhone: "987654333",
    contactEmail: "rosa.gutierrez@norte.com"
  },
  {
    ruc: "20123456802",
    name: "Logística Express S.A.C.",
    address: "Av. Circunvalación 369, Comas, Lima",
    contactName: "Antonio José Delgado",
    contactPhone: "987654334",
    contactEmail: "antonio.delgado@express.com"
  },
  {
    ruc: "20123456803",
    name: "Importaciones Premium S.A.",
    address: "Av. Primavera 741, Surco, Lima",
    contactName: "Verónica Cristina Rojas",
    contactPhone: "987654335",
    contactEmail: "veronica.rojas@premium.com"
  }
];

// Datos de ejemplo para Conductores
export const sampleDrivers: Omit<Driver, 'id'>[] = [
  {
    dni: "12345678",
    firstName: "Luis Alberto",
    lastName: "González Pérez",
    licenseNumber: "Q12345678",
    licenseStatus: "active",
    contactPhone: "987654321",
    fechaRegistro: "2025-01-15T10:30:00.000Z"
  },
  {
    dni: "23456789",
    firstName: "María Elena",
    lastName: "Rodríguez Silva",
    licenseNumber: "Q23456789",
    licenseStatus: "active",
    contactPhone: "987654322",
    fechaRegistro: "2025-01-16T11:15:00.000Z"
  },
  {
    dni: "34567890",
    firstName: "Carlos Alberto",
    lastName: "Vargas Mendoza",
    licenseNumber: "Q34567890",
    licenseStatus: "expired",
    contactPhone: "987654323",
    fechaRegistro: "2025-01-17T09:45:00.000Z"
  },
  {
    dni: "45678901",
    firstName: "Ana Patricia",
    lastName: "Silva Torres",
    licenseNumber: "Q45678901",
    licenseStatus: "active",
    contactPhone: "987654324",
    fechaRegistro: "2025-01-18T14:20:00.000Z"
  },
  {
    dni: "56789012",
    firstName: "Roberto Carlos",
    lastName: "Mendoza Herrera",
    licenseNumber: "Q56789012",
    licenseStatus: "suspended",
    contactPhone: "987654325",
    fechaRegistro: "2025-01-19T16:10:00.000Z"
  },
  {
    dni: "67890123",
    firstName: "Lucía Fernanda",
    lastName: "Torres Quispe",
    licenseNumber: "Q67890123",
    licenseStatus: "active",
    contactPhone: "987654326",
    fechaRegistro: "2025-01-20T08:30:00.000Z"
  },
  {
    dni: "78901234",
    firstName: "Diego Armando",
    lastName: "Herrera Ramos",
    licenseNumber: "Q78901234",
    licenseStatus: "active",
    contactPhone: "987654327",
    fechaRegistro: "2025-01-21T12:45:00.000Z"
  },
  {
    dni: "89012345",
    firstName: "Carmen Rosa",
    lastName: "Quispe Flores",
    licenseNumber: "Q89012345",
    licenseStatus: "unknown",
    contactPhone: "987654328",
    fechaRegistro: "2025-01-22T15:20:00.000Z"
  },
  {
    dni: "90123456",
    firstName: "Fernando José",
    lastName: "Ramos Castro",
    licenseNumber: "Q90123456",
    licenseStatus: "active",
    contactPhone: "987654329",
    fechaRegistro: "2025-01-23T10:15:00.000Z"
  },
  {
    dni: "01234567",
    firstName: "Patricia Alejandra",
    lastName: "Flores Morales",
    licenseNumber: "Q01234567",
    licenseStatus: "active",
    contactPhone: "987654330",
    fechaRegistro: "2025-01-24T13:30:00.000Z"
  }
];

// Datos de ejemplo para Vehículos
export const sampleVehicles: Omit<Vehicle, 'id'>[] = [
  {
    driverId: undefined, // Se asignará dinámicamente
    make: "Volvo",
    model: "FH16",
    licensePlate: "ABC-123",
    vehicleType: "Camión de Carga Pesada"
  },
  {
    driverId: undefined,
    make: "Scania",
    model: "R450",
    licensePlate: "DEF-456",
    vehicleType: "Camión de Carga Pesada"
  },
  {
    driverId: undefined,
    make: "Mercedes-Benz",
    model: "Actros 1845",
    licensePlate: "GHI-789",
    vehicleType: "Camión de Carga Pesada"
  },
  {
    driverId: undefined,
    make: "MAN",
    model: "TGX 18.480",
    licensePlate: "JKL-012",
    vehicleType: "Camión de Carga Pesada"
  },
  {
    driverId: undefined,
    make: "Iveco",
    model: "Stralis Hi-Way",
    licensePlate: "MNO-345",
    vehicleType: "Camión de Carga Pesada"
  },
  {
    driverId: undefined,
    make: "Ford",
    model: "Cargo 816",
    licensePlate: "PQR-678",
    vehicleType: "Camión de Carga Media"
  },
  {
    driverId: undefined,
    make: "Chevrolet",
    model: "NPR",
    licensePlate: "STU-901",
    vehicleType: "Camión de Carga Media"
  },
  {
    driverId: undefined,
    make: "Isuzu",
    model: "NPR 75",
    licensePlate: "VWX-234",
    vehicleType: "Camión de Carga Media"
  },
  {
    driverId: undefined,
    make: "Hino",
    model: "300 Series",
    licensePlate: "YZA-567",
    vehicleType: "Camión de Carga Media"
  },
  {
    driverId: undefined,
    make: "Mitsubishi",
    model: "Fuso Canter",
    licensePlate: "BCD-890",
    vehicleType: "Camión de Carga Ligera"
  }
];

// Datos de ejemplo para Solicitudes de Servicio
export const sampleServiceRequests: Omit<ServiceRequest, 'id'>[] = [
  {
    clientId: "", // Se asignará dinámicamente
    driverId: "", // Se asignará dinámicamente
    vehicleId: "", // Se asignará dinámicamente
    pickupLocation: "Puerto del Callao - Terminal Portuario",
    destination: "Distribuidora Lima Norte S.A.C. - Av. Túpac Amaru 1234, Independencia",
    requestDate: "2025-01-15T08:00:00.000Z",
    serviceDate: "2025-01-15T10:00:00.000Z",
    specialRequirements: "Manejo cuidadoso de productos frágiles",
    status: "Completed"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Aeropuerto Jorge Chávez - Terminal de Carga",
    destination: "Comercial San Miguel E.I.R.L. - Av. La Marina 567, San Miguel",
    requestDate: "2025-01-16T09:30:00.000Z",
    serviceDate: "2025-01-16T11:00:00.000Z",
    specialRequirements: "Transporte refrigerado requerido",
    status: "In Progress"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Terminal Portuario del Callao - Muelle 3",
    destination: "Importaciones del Pacífico S.A. - Jr. Ucayali 890, Callao",
    requestDate: "2025-01-17T07:00:00.000Z",
    serviceDate: "2025-01-17T09:30:00.000Z",
    specialRequirements: "Documentación de importación incluida",
    status: "Assigned"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Centro de Distribución Sur - Villa El Salvador",
    destination: "Exportaciones Andinas S.A.C. - Av. Javier Prado Este 2345, San Isidro",
    requestDate: "2025-01-18T10:00:00.000Z",
    serviceDate: "2025-01-18T14:00:00.000Z",
    specialRequirements: "Embalaje especial para exportación",
    status: "Pending"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Almacén Central - Av. Panamericana Sur Km 15",
    destination: "Logística Integral S.A. - Av. Panamericana Sur Km 15, Villa El Salvador",
    requestDate: "2025-01-19T06:00:00.000Z",
    serviceDate: "2025-01-19T08:00:00.000Z",
    specialRequirements: "Carga urgente - Prioridad alta",
    status: "Completed"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Zona Industrial - Lurín",
    destination: "Comercializadora Sur E.I.R.L. - Av. Los Héroes 123, San Juan de Miraflores",
    requestDate: "2025-01-20T11:30:00.000Z",
    serviceDate: "2025-01-20T15:00:00.000Z",
    specialRequirements: "Transporte de productos químicos",
    status: "In Progress"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Mercado Central - Lima Cercado",
    destination: "Distribuidora Central S.A.C. - Av. Abancay 456, Lima Cercado",
    requestDate: "2025-01-21T05:00:00.000Z",
    serviceDate: "2025-01-21T07:00:00.000Z",
    specialRequirements: "Transporte de productos perecederos",
    status: "Assigned"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Terminal Terrestre Norte - San Martín de Porres",
    destination: "Transportes del Norte S.A. - Av. Universitaria 789, San Martín de Porres",
    requestDate: "2025-01-22T13:00:00.000Z",
    serviceDate: "2025-01-22T16:00:00.000Z",
    specialRequirements: "Carga de larga distancia",
    status: "Pending"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Centro Logístico Este - Ate Vitarte",
    destination: "Comercial Este S.A.C. - Av. El Sol 321, Ate Vitarte",
    requestDate: "2025-01-23T08:30:00.000Z",
    serviceDate: "2025-01-23T12:00:00.000Z",
    specialRequirements: "Manejo de carga pesada",
    status: "Completed"
  },
  {
    clientId: "",
    driverId: "",
    vehicleId: "",
    pickupLocation: "Zona Franca - La Molina",
    destination: "Importaciones Globales S.A. - Av. República de Panamá 654, La Molina",
    requestDate: "2025-01-24T09:00:00.000Z",
    serviceDate: "2025-01-24T11:30:00.000Z",
    specialRequirements: "Documentación aduanera completa",
    status: "Cancelled"
  }
];

// Función para generar IDs únicos más realistas
export function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Función para crear datos completos con IDs
export function createSampleData() {
  const clients = sampleClients.map(client => ({
    ...client,
    id: generateId()
  }));

  const drivers = sampleDrivers.map(driver => ({
    ...driver,
    id: generateId()
  }));

  const vehicles = sampleVehicles.map((vehicle, index) => ({
    ...vehicle,
    id: generateId(),
    driverId: drivers[index % drivers.length].id // Asignar conductor
  }));

  const serviceRequests = sampleServiceRequests.map((request, index) => ({
    ...request,
    id: generateId(),
    clientId: clients[index % clients.length].id, // Asignar cliente
    driverId: drivers[index % drivers.length].id, // Asignar conductor
    vehicleId: vehicles[index % vehicles.length].id // Asignar vehículo
  }));

  return {
    clients,
    drivers,
    vehicles,
    serviceRequests
  };
}