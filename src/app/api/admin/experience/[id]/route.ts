import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { readOverride, writeOverride } from '@/lib/override';
import { fetchPortfolio } from '@/lib/portfolio';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const body = await request.json();

  const data = await fetchPortfolio();
  const existing = data.experience.find((e) => e.id === id);
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = { ...existing, ...body, id };

  const override = await readOverride();
  const entries = override.experience ?? [];
  const idx = entries.findIndex((e) => e.id === id);
  if (idx >= 0) {
    entries[idx] = updated;
  } else {
    entries.push(updated);
  }
  await writeOverride({ ...override, experience: entries });

  revalidatePath('/');
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const override = await readOverride();

  const deletedExperienceIds = [...(override.deletedExperienceIds ?? [])];
  if (!deletedExperienceIds.includes(id)) deletedExperienceIds.push(id);

  const entries = (override.experience ?? []).filter((e) => e.id !== id);
  await writeOverride({ ...override, experience: entries, deletedExperienceIds });

  revalidatePath('/');
  return NextResponse.json({ ok: true });
}
