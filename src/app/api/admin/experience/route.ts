import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { readOverride, writeOverride } from '@/lib/override';
import { fetchPortfolio } from '@/lib/portfolio';

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const data = await fetchPortfolio();
  return NextResponse.json(data.experience);
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await request.json();
  const entry = {
    id: body.id || `exp-${Date.now()}`,
    company: body.company,
    role: body.role,
    period: body.period,
    description: body.description,
  };

  const override = await readOverride();
  const existing = override.experience ?? [];
  existing.push(entry);
  await writeOverride({ ...override, experience: existing });

  revalidatePath('/');
  return NextResponse.json(entry, { status: 201 });
}
