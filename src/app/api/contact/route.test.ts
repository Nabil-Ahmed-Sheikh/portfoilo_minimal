/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Declare the spy before the mock factory so hoisting doesn't break it
let sendSpy: jest.Mock;

jest.mock('resend', () => {
  // Re-assign inside factory body so jest.mock hoisting sees the assignment
  const fn = jest.fn();
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: { send: fn },
    })),
    __esModule: true,
    // expose the inner fn so tests can control it
    _getSendSpy: () => fn,
  };
});

beforeAll(async () => {
  const mod = await import('resend');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendSpy = (mod as any)._getSendSpy();
});

import { POST } from './route';

function makeRequest(body: object) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    sendSpy?.mockClear();
  });

  it('returns 400 when fields are missing', async () => {
    const res = await POST(makeRequest({ name: 'Alice' }));
    expect(res.status).toBe(400);
  });

  it('sends an email and returns 200 on success', async () => {
    sendSpy.mockResolvedValue({ error: null });
    const res = await POST(
      makeRequest({ name: 'Alice', email: 'alice@example.com', message: 'Hello!' }),
    );
    expect(res.status).toBe(200);
    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining({ subject: expect.stringContaining('Alice') }),
    );
  });

  it('returns 500 when Resend returns an error', async () => {
    sendSpy.mockResolvedValue({ error: { message: 'Rate limit exceeded' } });
    const res = await POST(
      makeRequest({ name: 'Bob', email: 'bob@example.com', message: 'Hi' }),
    );
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json.error).toMatch(/rate limit/i);
  });
});
