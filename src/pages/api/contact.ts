import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

// Esquema de sanitización con Zod
const ContactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  telegram: z.string().min(2).max(100).trim(),
  message: z.string().min(10).max(2000).trim(),
  'g-recaptcha-response': z.string().min(1, 'Captcha obligatorio'),
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
  const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };
  const genericError = { error: 'No se pudo procesar la solicitud.' };

  try {
    // Rate Limiting
    if (checkRateLimit(ip)) {
      return new Response(JSON.stringify(genericError), {
        status: 429,
        headers: jsonHeaders,
      });
    }

    // Validación de datos de entrada
    const formData = await request.formData();
    const payload = Object.fromEntries(formData.entries());
    const validatedData = ContactSchema.safeParse(payload);

    if (!validatedData.success) {
      return new Response(JSON.stringify(genericError), { status: 400, headers: jsonHeaders });
    }

    const { name, telegram, message, 'g-recaptcha-response': captchaToken } = validatedData.data;

    // Verificación con la API de Google
    const googleVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!secretKey || !botToken || !chatId) {
      return new Response(JSON.stringify(genericError), {
        status: 500,
        headers: jsonHeaders,
      });
    }

    const captchaRes = await fetch(googleVerifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: captchaToken,
        remoteip: ip,
      }),
    });

    if (!captchaRes.ok) {
      return new Response(JSON.stringify(genericError), {
        status: 502,
        headers: jsonHeaders,
      });
    }

    const captchaResult = await captchaRes.json();

    if (!captchaResult.success) {
      return new Response(JSON.stringify(genericError), {
        status: 403,
        headers: jsonHeaders,
      });
    }

    // Envío a Telegram con escape de caracteres
    const telegramMessage = `
<b>Mensaje desde la Web</b>
<b>Nombre:</b> ${escapeHTML(name)}
<b>Telegram:</b> ${escapeHTML(telegram)}
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

    if (!telegramRes.ok) {
      return new Response(JSON.stringify(genericError), {
        status: 502,
        headers: jsonHeaders,
      });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: jsonHeaders });

  } catch (error) {
    console.error('Server Error:', error);
    return new Response(JSON.stringify(genericError), { status: 500, headers: jsonHeaders });
  }
};