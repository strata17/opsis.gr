// Newsletter signup. Forwards the address to Buttondown (double opt-in is set in Buttondown) and stores nothing here.
// Needs BUTTONDOWN_API_KEY in Vercel. Honeypot field "website" must stay empty.
import type { APIRoute } from 'astro';
export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const email = String(form.get('email') ?? '').trim().toLowerCase();
  if (String(form.get('website') ?? '') !== '') return redirect('/newsletter/ok/', 303); // bot: pretend success
  if (!EMAIL.test(email) || email.length > 254) return redirect('/newsletter/error/?reason=email', 303);
  const key = process.env.BUTTONDOWN_API_KEY?.trim();
  if (!key) return redirect('/newsletter/error/?reason=setup', 303);
  try {
    const r = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: { Authorization: `Token ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_address: email, tags: ['site'] }),
      signal: AbortSignal.timeout(8000),
    });
    if (r.ok) return redirect('/newsletter/ok/', 303);
    const body = await r.text();
    if (r.status === 400 && /already|exists/i.test(body)) return redirect('/newsletter/ok/', 303);
    return redirect('/newsletter/error/', 303);
  } catch {
    return redirect('/newsletter/error/', 303);
  }
};
