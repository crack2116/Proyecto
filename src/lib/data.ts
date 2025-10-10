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
    { id: 'V01', driver: 'Carlos Rodriguez', lat: -5.178, lng: -80.652, status: 'On-trip' },
    { id: 'V02', driver: 'Maria Garcia', lat: -5.194, lng: -80.632, status: 'On-trip' },
    { id: 'V03', driver: 'Luis Hernandez', lat: -5.210, lng: -80.615, status: 'Available' },
    { id: 'V04', driver: 'Ana Martinez', lat: -5.185, lng: -80.640, status: 'On-break' },
];

export const servicePerformanceData = [
    { month: 'Jan', onTime: 80, delayed: 20 },
    { month: 'Feb', onTime: 85, delayed: 15 },
    { month: 'Mar', onTime: 90, delayed: 10 },
    { month: 'Apr', onTime: 88, delayed: 12 },
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
    question: "How do I request a new transport service?",
    answer: "You can request a new service by navigating to the 'Service Requests' page and clicking the 'Create New Request' button. Fill out the required details such as pickup location, destination, date, and time, and submit the form."
  },
  {
    question: "Can I track my shipment in real-time?",
    answer: "Yes, once a driver is assigned and the service is in progress, you can monitor the vehicle's location in real-time on the 'Real-Time Tracking' page."
  },
  {
    question: "How are drivers assigned to requests?",
    answer: "Administrators assign drivers based on their availability, the type of vehicle required for the service, and the optimal route. You will be notified once a driver is assigned."
  },
  {
    question: "What happens if a service is delayed?",
    answer: "You will receive an automated notification via email or SMS if there are any significant delays. The real-time tracking map will also reflect the updated ETA."
  }
];
