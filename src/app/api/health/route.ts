import { NextResponse } from 'next/server';
import { getSupabase, isConfigured } from '@/lib/supabase';

// Each entry is a list of accepted names — any one present = satisfied
const REQUIRED_ENV: { label: string; vars: string[] }[] = [
  { label: 'NEXT_PUBLIC_SUPABASE_URL', vars: ['NEXT_PUBLIC_SUPABASE_URL'] },
  {
    label: 'SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)',
    vars: ['SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
  },
  { label: 'JWT_SECRET', vars: ['JWT_SECRET'] },
  { label: 'ADMIN_PASSWORD', vars: ['ADMIN_PASSWORD'] },
];

interface CheckResult {
  status: 'ok' | 'error';
  latency_ms: number;
  message?: string;
}

interface EnvCheckResult extends CheckResult {
  missing?: string[];
}

// ─── Individual checks ───────────────────────────────────────────────────────

async function checkDatabase(): Promise<CheckResult> {
  if (!isConfigured()) {
    return { status: 'error', latency_ms: 0, message: 'Supabase env vars not set' };
  }
  const t0 = Date.now();
  try {
    const { error } = await getSupabase()
      .from('portfolio_personal')
      .select('id')
      .limit(1);
    const latency_ms = Date.now() - t0;
    return error
      ? { status: 'error', latency_ms, message: error.message }
      : { status: 'ok', latency_ms };
  } catch (err) {
    return { status: 'error', latency_ms: Date.now() - t0, message: String(err) };
  }
}

async function checkStorage(): Promise<CheckResult> {
  if (!isConfigured()) {
    return { status: 'error', latency_ms: 0, message: 'Supabase env vars not set' };
  }
  const t0 = Date.now();
  try {
    const { error } = await getSupabase().storage.getBucket('portfolio-images');
    const latency_ms = Date.now() - t0;
    return error
      ? { status: 'error', latency_ms, message: error.message }
      : { status: 'ok', latency_ms };
  } catch (err) {
    return { status: 'error', latency_ms: Date.now() - t0, message: String(err) };
  }
}

function checkEmail(): CheckResult {
  const ok = Boolean(process.env.RESEND_API_KEY);
  return {
    status: ok ? 'ok' : 'error',
    latency_ms: 0,
    ...(ok ? {} : { message: 'RESEND_API_KEY not set' }),
  };
}

function checkEnv(): EnvCheckResult {
  const missing = REQUIRED_ENV.filter((entry) =>
    entry.vars.every((v) => !process.env[v]),
  ).map((entry) => entry.label);

  return {
    status: missing.length === 0 ? 'ok' : 'error',
    latency_ms: 0,
    ...(missing.length ? { missing, message: `Missing vars: ${missing.join(', ')}` } : {}),
  };
}

// ─── Route ───────────────────────────────────────────────────────────────────

export async function GET() {
  const [database, storage] = await Promise.all([checkDatabase(), checkStorage()]);
  const email = checkEmail();
  const env = checkEnv();

  const checks = { database, storage, email, env };
  const dbOk = database.status === 'ok';
  const allOk = Object.values(checks).every((c) => c.status === 'ok');

  // DB failure = unhealthy (critical); anything else = degraded
  const overallStatus = allOk ? 'healthy' : dbOk ? 'degraded' : 'unhealthy';
  const httpStatus = overallStatus === 'unhealthy' ? 503 : 200;

  return NextResponse.json(
    {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      uptime_s: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV ?? 'unknown',
      checks,
    },
    { status: httpStatus },
  );
}
