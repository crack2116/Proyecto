import { NextRequest, NextResponse } from 'next/server';
import { createSampleData } from '@/lib/sample-data';

export async function POST(request: NextRequest) {
  try {
    const { clients, drivers, vehicles, serviceRequests } = createSampleData();
    
    return NextResponse.json({
      success: true,
      message: 'Datos de ejemplo generados exitosamente',
      data: {
        clients: clients.length,
        drivers: drivers.length,
        vehicles: vehicles.length,
        serviceRequests: serviceRequests.length,
        sampleData: {
          clients: clients.slice(0, 3), // Mostrar solo los primeros 3 como ejemplo
          drivers: drivers.slice(0, 3),
          vehicles: vehicles.slice(0, 3),
          serviceRequests: serviceRequests.slice(0, 3)
        }
      }
    });
  } catch (error) {
    console.error('Error generating sample data:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al generar datos de ejemplo',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
