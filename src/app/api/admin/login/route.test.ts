/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from './route';

const mockSet = jest.fn();

jest.mock('next/headers', () => ({
  cookies: jest.fn(() =>
    Promise.resolve({ set: mockSet, get: jest.fn(() => undefined) }),
  ),
}));

jest.mock('@/lib/auth', () => ({
  SESSION_COOKIE_NAME: 'admin_session',
  signToken: jest.fn(() => Promise.resolve('signed-token')),
  verifyToken: jest.fn(),
}));

function makeRequest(body: object) {
  return new NextRequest('http://localhost/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/admin/login', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV, ADMIN_PASSWORD: 'secret123' };
    mockSet.mockClear();
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('returns 500 when ADMIN_PASSWORD is not set', async () => {
    delete process.env.ADMIN_PASSWORD;
    const res = await POST(makeRequest({ password: 'anything' }));
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/misconfigured/i);
  });

  it('returns 401 for wrong password', async () => {
    const res = await POST(makeRequest({ password: 'wrong' }));
    expect(res.status).toBe(401);
    const json = await res.json();
    expect(json.error).toMatch(/invalid/i);
  });

  it('returns 200 and sets cookie for correct password', async () => {
    const res = await POST(makeRequest({ password: 'secret123' }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(mockSet).toHaveBeenCalledWith(
      'admin_session',
      'signed-token',
      expect.objectContaining({ httpOnly: true }),
    );
  });
});
