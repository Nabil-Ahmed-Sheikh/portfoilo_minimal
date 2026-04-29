import { timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME, signToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  // FUTURE: Replace with database user lookup + bcrypt.compare
  const a = Buffer.from(password ?? '');
  const b = Buffer.from(adminPassword);
  const match = a.length === b.length && timingSafeEqual(a, b);

  if (!match) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = await signToken({ role: 'admin' });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/admin',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ ok: true });
}
