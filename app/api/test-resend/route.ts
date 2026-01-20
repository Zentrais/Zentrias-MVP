import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    
    // Verificar que la API key existe
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'RESEND_API_KEY no está configurada en .env.local',
          details: 'La variable de entorno RESEND_API_KEY no se encontró'
        },
        { status: 500 }
      );
    }
    
    // Verificar formato básico
    if (!apiKey.startsWith('re_')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Formato de API key incorrecto',
          details: 'La API key debe empezar con "re_"'
        },
        { status: 500 }
      );
    }
    
    // Intentar inicializar Resend y verificar autenticación
    const resend = new Resend(apiKey);
    
    // Hacer una llamada a la API para verificar autenticación
    // Usamos domains.list() que es una operación de solo lectura y no envía emails
    const domains = await resend.domains.list();
    
    // Verificar si hay error en la respuesta
    if (domains.error) {
      throw new Error(domains.error.message || 'Error al verificar dominios');
    }
    
    return NextResponse.json({
      success: true,
      message: 'API key válida y funcionando correctamente',
      details: {
        apiKeyPrefix: apiKey.substring(0, 10) + '...',
        apiKeyLength: apiKey.length,
        authenticated: true,
        domainsAvailable: domains.data ? true : false
      }
    });
    
  } catch (error: any) {
    console.error('Error verificando Resend API:', error);
    
    let errorMessage = 'Error desconocido';
    let errorDetails = '';
    
    if (error.message) {
      errorMessage = error.message;
    }
    
    if (error.message?.includes('401') || error.message?.includes('Unauthorized')) {
      errorDetails = 'La API key no es válida o ha expirado';
    } else if (error.message?.includes('403') || error.message?.includes('Forbidden')) {
      errorDetails = 'La API key no tiene permisos suficientes';
    } else if (error.message?.includes('Network') || error.message?.includes('fetch')) {
      errorDetails = 'Error de conexión con la API de Resend';
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: errorDetails || 'Error al verificar la API key'
      },
      { status: 500 }
    );
  }
}
