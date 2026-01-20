import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Verificar todas las variables de entorno relacionadas con Resend
  const envVars = {
    RESEND_API_KEY: process.env.RESEND_API_KEY ? '✅ Configurada' : '❌ No configurada',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'No configurada',
    RESEND_TO_EMAIL_USER: process.env.RESEND_TO_EMAIL_USER || 'No configurada',
    RESEND_TO_EMAIL_COLLAB: process.env.RESEND_TO_EMAIL_COLLAB || 'No configurada',
    RESEND_TO_EMAIL_MEDIA: process.env.RESEND_TO_EMAIL_MEDIA || 'No configurada',
    RESEND_TO_EMAIL_INVES: process.env.RESEND_TO_EMAIL_INVES || 'No configurada',
  };

  // Mostrar prefijo de la API key para verificación (sin exponerla completa)
  const apiKeyPreview = process.env.RESEND_API_KEY 
    ? `${process.env.RESEND_API_KEY.substring(0, 10)}... (${process.env.RESEND_API_KEY.length} caracteres)`
    : 'No disponible';

  return NextResponse.json({
    message: 'Estado de las variables de entorno de Resend',
    environment: process.env.NODE_ENV,
    variables: envVars,
    apiKeyPreview: apiKeyPreview,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('RESEND')),
  });
}
