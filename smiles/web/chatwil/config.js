// ── CONFIGURACIÓN DE IA - CHATWIL ──
// IMPORTANTE: Si usas una API Key aquí, asegúrate de restringirla en Google AI Studio 
// (https://aistudio.google.com/) a tu dominio específico (wiihope.com) para evitar que otros la usen.
// Puedes obtener tu API Key gratuita en https://aistudio.google.com/

export const AI_CONFIG = {
  GEMINI_KEY: import.meta.env.VITE_GEMINI_KEY,
  MODEL: 'gemini-3.1-flash-lite-preview',
  TEMPERATURE: 1.0,
  MAX_TOKENS: 500,
};

// MODEL: 'gemini-2.5-flash',