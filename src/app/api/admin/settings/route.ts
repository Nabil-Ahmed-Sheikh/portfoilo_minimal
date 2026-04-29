import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { readOverride, writeOverride } from '@/lib/override';
import { fetchPortfolio } from '@/lib/portfolio';

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const data = await fetchPortfolio();
  return NextResponse.json({ personal: data.personal, socialLinks: data.socialLinks });
}

export async function PUT(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  // FUTURE: Replace with database UPDATE
  const body: { email?: string; githubHref?: string; linkedinHref?: string } =
    await request.json();

  const data = await fetchPortfolio();
  const override = await readOverride();

  const personal = { ...(override.personal ?? data.personal) };
  if (body.email) personal.email = body.email;

  const socialLinks = (override.socialLinks ?? data.socialLinks).map((link) => {
    if (link.id === 'github' && body.githubHref) return { ...link, href: body.githubHref };
    if (link.id === 'linkedin' && body.linkedinHref) return { ...link, href: body.linkedinHref };
    return link;
  });

  await writeOverride({ ...override, personal, socialLinks });

  revalidatePath('/');
  return NextResponse.json({ personal, socialLinks });
}
