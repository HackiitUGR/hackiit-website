import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

// Esquema de sanitización con Zod
const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  message: z.string().min(10).max(2000).trim(),
  'g-recaptcha-response': z.string().min(1, "Captcha obligatorio"),
});

// Función de escape para evitar inyecciones en el bot de Telegram
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Rate limiting pendiente de mejorar con redis o similar
const submissions = new Map<string, number[]>();
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 5 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const times = (submissions.get(ip) || []).filter(t => now - t < WINDOW_MS);
  if (times.length >= MAX_SUBMISSIONS) return true;
  times.push(now);
  submissions.set(ip, times);
  return false;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = clientAddress || 'unknown';

  try {
    // Rate Limiting
    if (checkRateLimit(ip)) {
      return new Response(JSON.stringify({ error: 'Límite excedido. Reintenta en 5 min.' }), { status: 429 });
    }

    // Validación de datos de entrada
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());
    const validatedData = ContactSchema.safeParse(payload);

    if (!validatedData.success) {
      return new Response(JSON.stringify({ error: 'Datos no válidos' }), { status: 400 });
    }

    const { name, email, message, 'g-recaptcha-response': captchaToken } = validatedData.data;

    // Verificación con la API de Google
    const googleVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;

    const captchaRes = await fetch(googleVerifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: captchaToken,
        remoteip: ip,
      }),
    });

    const captchaResult = await captchaRes.json();

    if (!captchaResult.success) {
      return new Response(JSON.stringify({ error: 'Fallo en la validación del Captcha' }), { status: 403 });
    }

    // Envío a Telegram con escape de caracteres
    const botToken = import.meta.env.TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.TELEGRAM_CHAT_ID;

    const telegramMessage = `
<b>Mensaje desde la Web</b>
<b>Nombre:</b> ${escapeHTML(name)}
<b>Email:</b> ${escapeHTML(email)}
<b>Mensaje:</b>
${escapeHTML(message)}
    `;

    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramRes.ok) throw new Error('Error en API de Telegram');

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
};