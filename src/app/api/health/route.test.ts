/**
 * @jest-environment node
 */

// Build a controllable mock client once; tests mutate the resolved values.
const mockLimit = jest.fn();
const mockSelect = jest.fn(() => ({ limit: mockLimit }));
const mockFrom = jest.fn(() => ({ select: mockSelect }));
const mockGetBucket = jest.fn();

jest.mock('@/lib/supabase', () => ({
  isConfigured: jest.fn(() => true),
  getSupabase: jest.fn(() => ({
    from: mockFrom,
    storage: { getBucket: mockGetBucket },
  })),
}));

import { GET } from './route';
import { isConfigured } from '@/lib/supabase';

const OLD_ENV = process.env;

beforeEach(() => {
  process.env = {
    ...OLD_ENV,
    NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-service-key',
    JWT_SECRET: 'test-jwt-secret',
    ADMIN_PASSWORD: 'test-admin-pw',
    RESEND_API_KEY: 'test-resend-key',
  };
  mockLimit.mockResolvedValue({ error: null });
  mockGetBucket.mockResolvedValue({ error: null });
  (isConfigured as jest.Mock).mockReturnValue(true);
});

afterAll(() => {
  process.env = OLD_ENV;
});

describe('GET /api/health', () => {
  it('returns 200 and healthy when all checks pass', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe('healthy');
    expect(json.checks.database.status).toBe('ok');
    expect(json.checks.storage.status).toBe('ok');
    expect(json.checks.email.status).toBe('ok');
    expect(json.checks.env.status).toBe('ok');
    expect(typeof json.uptime_s).toBe('number');
    expect(typeof json.timestamp).toBe('string');
  });

  it('includes latency_ms for database and storage checks', async () => {
    const res = await GET();
    const json = await res.json();
    expect(typeof json.checks.database.latency_ms).toBe('number');
    expect(typeof json.checks.storage.latency_ms).toBe('number');
  });

  it('returns 200 and degraded when storage fails but DB is ok', async () => {
    mockGetBucket.mockResolvedValue({ error: { message: 'Bucket not found' } });
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe('degraded');
    expect(json.checks.database.status).toBe('ok');
    expect(json.checks.storage.status).toBe('error');
    expect(json.checks.storage.message).toMatch(/bucket not found/i);
  });

  it('returns 200 and degraded when email key is missing', async () => {
    delete process.env.RESEND_API_KEY;
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.status).toBe('degraded');
    expect(json.checks.email.status).toBe('error');
  });

  it('returns 503 and unhealthy when database fails', async () => {
    mockLimit.mockResolvedValue({ error: { message: 'Connection refused' } });
    const res = await GET();
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.status).toBe('unhealthy');
    expect(json.checks.database.status).toBe('error');
    expect(json.checks.database.message).toMatch(/connection refused/i);
  });

  it('returns 503 when Supabase throws during DB check', async () => {
    mockLimit.mockRejectedValue(new Error('Network timeout'));
    const res = await GET();
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.status).toBe('unhealthy');
    expect(json.checks.database.message).toMatch(/network timeout/i);
  });

  it('reports missing env vars in env check', async () => {
    delete process.env.JWT_SECRET;
    delete process.env.ADMIN_PASSWORD;
    const res = await GET();
    const json = await res.json();
    expect(json.checks.env.status).toBe('error');
    expect(json.checks.env.missing).toEqual(
      expect.arrayContaining(['JWT_SECRET', 'ADMIN_PASSWORD']),
    );
  });

  it('reports error when Supabase not configured', async () => {
    (isConfigured as jest.Mock).mockReturnValue(false);
    const res = await GET();
    expect(res.status).toBe(503);
    const json = await res.json();
    expect(json.checks.database.status).toBe('error');
    expect(json.checks.storage.status).toBe('error');
  });
});
