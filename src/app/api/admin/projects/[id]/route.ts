import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { readOverride, writeOverride } from '@/lib/override';
import { fetchPortfolio } from '@/lib/portfolio';
import { saveUploadedFile } from '@/lib/upload';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;
  const formData = await request.formData();

  const data = await fetchPortfolio();
  const existing = data.projects.find((p) => p.id === id);
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const techRaw = formData.get('tech') as string;
  const highlightsRaw = formData.getAll('highlights') as string[];

  let coverImage = existing.coverImage;
  const coverFile = formData.get('coverImage') as File | null;
  if (coverFile && coverFile.size > 0) {
    coverImage = await saveUploadedFile(coverFile, id);
  } else if (formData.get('coverImageUrl')) {
    coverImage = formData.get('coverImageUrl') as string;
  }

  const imageFiles = formData.getAll('images') as File[];
  let images = existing.images ?? [];
  const newImages: string[] = [];
  for (const file of imageFiles) {
    if (file && file.size > 0) {
      newImages.push(await saveUploadedFile(file, id));
    }
  }
  if (newImages.length) images = [...images, ...newImages];

  const updated = {
    ...existing,
    title: (formData.get('title') as string) || existing.title,
    subtitle: (formData.get('subtitle') as string) || existing.subtitle,
    tag: (formData.get('tag') as string) || existing.tag,
    description: (formData.get('description') as string) || existing.description,
    longDescription: (formData.get('longDescription') as string) || existing.longDescription,
    year: (formData.get('year') as string) || existing.year,
    role: (formData.get('role') as string) || existing.role,
    href: (formData.get('href') as string) || existing.href,
    arrowLabel: (formData.get('arrowLabel') as string) || existing.arrowLabel,
    liveHref: (formData.get('liveHref') as string) || existing.liveHref,
    tech: techRaw ? techRaw.split(',').map((s) => s.trim()).filter(Boolean) : existing.tech,
    highlights:
      highlightsRaw.filter(Boolean).length
        ? highlightsRaw.filter(Boolean)
        : existing.highlights,
    coverImage,
    images: images.length ? images : undefined,
    videoUrl: (formData.get('videoUrl') as string) || existing.videoUrl,
  };

  const override = await readOverride();
  const overrideProjects = override.projects ?? [];
  const idx = overrideProjects.findIndex((p) => p.id === id);
  if (idx >= 0) {
    overrideProjects[idx] = updated;
  } else {
    overrideProjects.push(updated);
  }
  await writeOverride({ ...override, projects: overrideProjects });

  revalidatePath('/');
  revalidatePath('/projects/[id]', 'page');

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

  const deletedProjectIds = [...(override.deletedProjectIds ?? [])];
  if (!deletedProjectIds.includes(id)) deletedProjectIds.push(id);

  const overrideProjects = (override.projects ?? []).filter((p) => p.id !== id);
  await writeOverride({ ...override, projects: overrideProjects, deletedProjectIds });

  revalidatePath('/');
  revalidatePath('/projects/[id]', 'page');

  return NextResponse.json({ ok: true });
}
