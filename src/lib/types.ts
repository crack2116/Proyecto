export type Client = {
    id: string;
    ruc: string;
    name: string;
    address: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
};

export type Driver = {
    id: string;
    dni: string;
    firstName: string;
    lastName: string;
    licenseNumber: string;
    licenseStatus: 'active' | 'expired' | 'suspended' | 'unknown';
    contactPhone: string;
    fechaRegistro: string;
};

export type Vehicle = {
    id: string;
    driverId?: string;
    make: string;
    model: string;
    licensePlate: string;
    vehicleType: string;
};

export type ServiceRequest = {
    id: string;
    clientId: string;
    driverId?: string;
    vehicleId?: string;
    pickupLocation: string;
    destination: string;
    requestDate: string;
    serviceDate: string;
    specialRequirements?: string;
    status: 'Pending' | 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled';
};

export type Route = {
    id: string;
    serviceRequestId: string;
    startPoint: string;
    endPoint: string;

    distance: number;
    estimatedTime: number;
};

export type User = {
    id: string;
    username: string;
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombresCompletos: string;
    fechaNacimiento: string;
    edad: number;
    direccion: string;
    role: 'administrator' | 'assistant';
    fechaRegistro: string;
};
