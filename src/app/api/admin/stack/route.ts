import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { getStack, upsertStack } from '@/lib/db';

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const stack = await getStack();
  return NextResponse.json(stack);
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body = await request.json();
  const entry = {
    id: body.id || `stack-${Date.now()}`,
    name: body.name,
    type: body.type,
    icon: body.icon,
  };

  const saved = await upsertStack(entry);
  revalidatePath('/');
  return NextResponse.json(saved, { status: 201 });
}
