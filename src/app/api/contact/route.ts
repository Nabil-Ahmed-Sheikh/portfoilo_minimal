import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveContactMessage } from '@/lib/db';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // Persist message to DB (non-blocking — don't fail the email if DB is down)
  saveContactMessage({ name, email, message }).catch(console.error);

  const to = process.env.RESEND_TO_EMAIL ?? 'nabilahmed.cloud@gmail.com';
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
