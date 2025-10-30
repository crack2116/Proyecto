"use server";

type SunatData = {
  success: boolean;
  data?: {
    ruc: string;
    razonSocial: string;
    direccion: string;
    estado: string;
    condicion: string;
  };
  message?: string;
};

type DniData = {
  success: boolean;
  data?: {
    dni: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombresCompletos: string;
    edad?: string;
    direccion?: string;
  };
  message?: string;
};

export async function getDniData(dni: string): Promise<DniData> {
  if (!dni || dni.length !== 8) {
    return { success: false, message: "El DNI debe tener 8 dígitos." };
  }

  // Lista de APIs para consulta de DNI
  const apis = [
    `https://api.dni.xyz/dni/${dni}`,
    `https://api.apis.net.pe/v1/dni?numero=${dni}`,
    `https://dniruc.apisperu.com/api/v1/dni/${dni}`,
  ];

  for (const apiUrl of apis) {
    try {
      console.log(`Intentando consultar DNI con API: ${apiUrl}`);
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        console.log(`API ${apiUrl} falló con status: ${response.status}`);
        continue;
      }

      const data = await response.json();
      console.log(`Datos recibidos de ${apiUrl}:`, data);

      // Función helper para extraer datos de manera inteligente
      const extractField = (obj: any, possibleKeys: string[]): string => {
        for (const key of possibleKeys) {
          if (obj[key] && obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
            return String(obj[key]).trim();
          }
        }
        return '';
      };

      // Extraer datos usando múltiples nombres de campos posibles
      const nombres = extractField(data, [
        'nombres', 'nombre', 'nombres_completos', 'primer_nombre', 'first_name'
      ]);
      
      const apellidoPaterno = extractField(data, [
        'apellido_paterno', 'apellidoPaterno', 'paterno', 'apellido_p', 'last_name'
      ]);
      
      const apellidoMaterno = extractField(data, [
        'apellido_materno', 'apellidoMaterno', 'materno', 'apellido_m', 'mother_last_name'
      ]);

      // Extraer edad (si está disponible) - Las APIs públicas generalmente no tienen esta info
      const edad = extractField(data, [
        'edad', 'age', 'fecha_nacimiento', 'birth_date', 'fechaNacimiento', 'fecha_nac'
      ]);

      // Extraer dirección (si está disponible) - Las APIs públicas generalmente no tienen esta info
      const direccion = extractField(data, [
        'direccion', 'address', 'domicilio', 'residencia', 'ubicacion', 'location', 'domicilio_legal'
      ]);

      // Log para debugging - ver qué datos están disponibles
      console.log('Datos disponibles en la respuesta:', Object.keys(data));
      console.log('Edad encontrada:', edad);
      console.log('Dirección encontrada:', direccion);

      // Solo devolver éxito si tenemos al menos los nombres
      if (nombres) {
        const nombresCompletos = `${nombres} ${apellidoPaterno} ${apellidoMaterno}`.trim();
        return { 
          success: true, 
          data: {
            dni: dni,
            nombres: nombres,
            apellidoPaterno: apellidoPaterno || '',
            apellidoMaterno: apellidoMaterno || '',
            nombresCompletos: nombresCompletos,
            edad: edad || undefined,
            direccion: direccion || undefined,
          }
        };
      }
    } catch (error) {
      console.log(`Error con API ${apiUrl}:`, error);
      continue;
    }
  }

  return { 
    success: false, 
    message: "No se pudo obtener información del DNI. Verifica que sea correcto o ingresa los datos manualmente." 
  };
}

type LicenseStatus = {
  success: boolean;
  status?: 'active' | 'expired' | 'suspended' | 'unknown';
  message?: string;
  details?: {
    licenseNumber: string;
    expirationDate?: string;
    status: string;
    category?: string;
  };
};

export async function verifyLicenseStatus(licenseNumber: string): Promise<LicenseStatus> {
  if (!licenseNumber || licenseNumber.length < 5) {
    return { 
      success: false, 
      message: "El número de licencia debe tener al menos 5 caracteres." 
    };
  }

  // Simular verificación de licencia (en un caso real, esto sería una API oficial)
  // Por ahora, simularemos diferentes estados basados en el número
  
  try {
    console.log(`Verificando licencia: ${licenseNumber}`);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular diferentes estados basados en patrones del número
    const lastDigit = parseInt(licenseNumber.slice(-1));
    let status: 'active' | 'expired' | 'suspended' | 'unknown';
    let expirationDate: string;
    
    if (lastDigit % 4 === 0) {
      status = 'expired';
      expirationDate = '2023-12-31';
    } else if (lastDigit % 4 === 1) {
      status = 'suspended';
      expirationDate = '2024-06-15';
    } else if (lastDigit % 4 === 2) {
      status = 'active';
      expirationDate = '2025-12-31';
    } else {
      status = 'unknown';
      expirationDate = '2024-12-31';
    }
    
    return {
      success: true,
      status: status,
      details: {
        licenseNumber: licenseNumber,
        expirationDate: expirationDate,
        status: status,
        category: 'A-II' // Categoría común para transporte
      }
    };
    
  } catch (error) {
    console.error('Error verificando licencia:', error);
    return {
      success: false,
      message: "Error al verificar el estado de la licencia. Intenta de nuevo."
    };
  }
}

export async function getSunatData(ruc: string): Promise<SunatData> {
  if (!ruc || ruc.length !== 11) {
    return { success: false, message: "El RUC debe tener 11 dígitos." };
  }

  // Lista de APIs de respaldo para consulta RUC
  const apis = [
    `https://api.sunat.dev/ruc/${ruc}`,
    `https://api.apis.net.pe/v1/ruc?numero=${ruc}`,
    `https://ruc.com.pe/api/v1/ruc/${ruc}`,
  ];

  for (const apiUrl of apis) {
    try {
      console.log(`Intentando con API: ${apiUrl}`);
      const response = await fetch(apiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        // Timeout de 10 segundos
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) {
        console.log(`API ${apiUrl} falló con status: ${response.status}`);
        continue; // Intentar siguiente API
      }

      const data = await response.json();
      console.log(`Datos recibidos de ${apiUrl}:`, data); // Log para debugging
      
      // Función helper para extraer datos de manera inteligente
      const extractField = (obj: any, possibleKeys: string[]): string => {
        for (const key of possibleKeys) {
          if (obj[key] && obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
            return String(obj[key]).trim();
          }
        }
        return '';
      };

      // Extraer datos usando múltiples nombres de campos posibles
      const razonSocial = extractField(data, [
        'razon_social', 'razonSocial', 'nombreRazonSocial', 'nombre', 
        'razon_social_contribuyente', 'nombre_completo', 'denominacion'
      ]);
      
      const direccion = extractField(data, [
        'direccion', 'domicilio_fiscal', 'direccionCompleta', 'domicilio',
        'direccion_completa', 'direccion_fiscal', 'ubicacion'
      ]);
      
      const estado = extractField(data, [
        'estado', 'estadoContribuyente', 'estado_contribuyente', 
        'situacion', 'situacion_contribuyente'
      ]);
      
      const condicion = extractField(data, [
        'condicion', 'condicionContribuyente', 'condicion_contribuyente',
        'tipo_contribuyente'
      ]);

      // Solo devolver éxito si tenemos al menos la razón social
      if (razonSocial) {
        return { 
          success: true, 
          data: {
            ruc: data.ruc || data.numeroDocumento || ruc,
            razonSocial: razonSocial,
            direccion: direccion || 'Dirección no disponible',
            estado: estado || 'Estado no disponible',
            condicion: condicion || 'Condición no disponible',
          }
        };
      }
    } catch (error) {
      console.log(`Error con API ${apiUrl}:`, error);
      continue; // Intentar siguiente API
    }
  }

  // Si todas las APIs fallan, devolver error
  return { 
    success: false, 
    message: "No se pudo obtener información del RUC. Verifica que sea correcto o ingresa los datos manualmente." 
  };
}
