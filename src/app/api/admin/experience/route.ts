import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getExperience, upsertExperience } from '@/lib/db';

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const experience = await getExperience();
  return NextResponse.json(experience);
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

  const saved = await upsertExperience(entry);
  revalidatePath('/');
  return NextResponse.json(saved, { status: 201 });
}
