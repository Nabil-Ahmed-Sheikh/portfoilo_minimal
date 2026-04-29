import { SignJWT, jwtVerify } from 'jose';

export const SESSION_COOKIE_NAME = 'admin_session';

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET env var is not set');
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<Record<string, unknown>> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as Record<string, unknown>;
}
