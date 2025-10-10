export const serviceRequests = [
  {
    id: 'SRV-001',
    client: 'Acme Corp',
    pickup: '123 Industrial Way, Piura',
    destination: '789 Commercial Ave, Sullana',
    date: '2024-08-15',
    status: 'Completed',
    driver: 'Carlos Rodriguez',
  },
  {
    id: 'SRV-002',
    client: 'Globex Inc.',
    pickup: '456 Warehouse St, Piura',
    destination: '321 Port Rd, Paita',
    date: '2024-08-16',
    status: 'In Progress',
    driver: 'Maria Garcia',
  },
  {
    id: 'SRV-003',
    client: 'Stark Industries',
    pickup: '222 Tech Park, Piura',
    destination: '555 Market Blvd, Talara',
    date: '2024-08-17',
    status: 'Pending',
    driver: 'Not Assigned',
  },
  {
    id: 'SRV-004',
    client: 'Wayne Enterprises',
    pickup: '888 Gotham Lane, Piura',
    destination: '111 Justice Ave, Catacaos',
    date: '2024-08-18',
    status: 'Pending',
    driver: 'Not Assigned',
  },
  {
    id: 'SRV-005',
    client: 'Cyberdyne Systems',
    pickup: '999 Future St, Piura',
    destination: '444 Robot Rd, Sechura',
    date: '2024-08-15',
    status: 'Cancelled',
    driver: 'Juan Perez',
  },
];

export const vehicles = [
    { id: 'V01', driver: 'Carlos Rodriguez', lat: -5.178, lng: -80.652, status: 'En viaje' },
    { id: 'V02', driver: 'Maria Garcia', lat: -5.194, lng: -80.632, status: 'En viaje' },
    { id: 'V03', driver: 'Luis Hernandez', lat: -5.210, lng: -80.615, status: 'Disponible' },
    { id: 'V04', driver: 'Ana Martinez', lat: -5.185, lng: -80.640, status: 'En descanso' },
];

export const servicePerformanceData = [
    { month: 'Ene', onTime: 80, delayed: 20 },
    { month: 'Feb', onTime: 85, delayed: 15 },
    { month: 'Mar', onTime: 90, delayed: 10 },
    { month: 'Abr', onTime: 88, delayed: 12 },
    { month: 'May', onTime: 92, delayed: 8 },
    { month: 'Jun', onTime: 95, delayed: 5 },
];

export const vehicleUtilizationData = [
    { date: '2024-06-01', utilization: 75 },
    { date: '2024-06-02', utilization: 78 },
    { date: '2024-06-03', utilization: 80 },
    { date: '2024-06-04', utilization: 82 },
    { date: '2024-06-05', utilization: 79 },
    { date: '2024-06-06', utilization: 85 },
    { date: '2024-06-07', utilization: 88 },
];

export const faqs = [
  {
    question: "¿Cómo solicito un nuevo servicio de transporte?",
    answer: "Puede solicitar un nuevo servicio navegando a la página 'Solicitudes de Servicio' y haciendo clic en el botón 'Crear Nueva Solicitud'. Complete los detalles requeridos, como la ubicación de recogida, el destino, la fecha y la hora, y envíe el formulario."
  },
  {
    question: "¿Puedo rastrear mi envío en tiempo real?",
    answer: "Sí, una vez que se asigna un conductor y el servicio está en progreso, puede monitorear la ubicación del vehículo en tiempo real en la página de 'Seguimiento en Tiempo Real'."
  },
  {
    question: "¿Cómo se asignan los conductores a las solicitudes?",
    answer: "Los administradores asignan conductores según su disponibilidad, el tipo de vehículo requerido para el servicio y la ruta óptima. Se le notificará una vez que se asigne un conductor."
  },
  {
    question: "¿Qué sucede si un servicio se retrasa?",
    answer: "Recibirá una notificación automática por correo electrónico o SMS si hay retrasos significativos. El mapa de seguimiento en tiempo real también reflejará la hora estimada de llegada actualizada."
  }
];
