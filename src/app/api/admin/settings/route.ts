import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { personal as fallbackPersonal, socialLinks as fallbackSocialLinks } from '@/data/personal';
import { getPersonal, getSocialLinks, upsertPersonal, upsertSocialLinks } from '@/lib/db';

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const [personal, socialLinks] = await Promise.all([getPersonal(), getSocialLinks()]);
  return NextResponse.json({
    personal: personal ?? fallbackPersonal,
    socialLinks: socialLinks.length ? socialLinks : fallbackSocialLinks,
  });
}

export async function PUT(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const body: { email?: string; githubHref?: string; linkedinHref?: string } =
    await request.json();

  const [currentPersonal, currentLinks] = await Promise.all([getPersonal(), getSocialLinks()]);

  const personal = { ...(currentPersonal ?? fallbackPersonal) };
  if (body.email) personal.email = body.email;
  await upsertPersonal(personal);

  const links = (currentLinks.length ? currentLinks : fallbackSocialLinks).map((link) => {
    if (link.id === 'github' && body.githubHref) return { ...link, href: body.githubHref };
    if (link.id === 'linkedin' && body.linkedinHref) return { ...link, href: body.linkedinHref };
    return link;
  });
  await upsertSocialLinks(links);

  revalidatePath('/');
  return NextResponse.json({ personal, socialLinks: links });
}
