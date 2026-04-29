import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-guard';
import { readOverride, writeOverride } from '@/lib/override';
import { fetchPortfolio } from '@/lib/portfolio';
import { saveUploadedFile } from '@/lib/upload';

export async function GET() {
  const guard = await requireAdmin();
  if (guard) return guard;

  const data = await fetchPortfolio();
  return NextResponse.json(data.projects);
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  const formData = await request.formData();

  const id =
    (formData.get('id') as string) ||
    `project-${Date.now()}`;

  const techRaw = formData.get('tech') as string;
  const highlightsRaw = formData.getAll('highlights') as string[];

  let coverImage: string | undefined;
  const coverFile = formData.get('coverImage') as File | null;
  if (coverFile && coverFile.size > 0) {
    coverImage = await saveUploadedFile(coverFile, id);
  } else if (formData.get('coverImageUrl')) {
    coverImage = formData.get('coverImageUrl') as string;
  }

  const imageFiles = formData.getAll('images') as File[];
  const images: string[] = [];
  for (const file of imageFiles) {
    if (file && file.size > 0) {
      images.push(await saveUploadedFile(file, id));
    }
  }

  const project = {
    id,
    title: formData.get('title') as string,
    subtitle: (formData.get('subtitle') as string) || undefined,
    tag: formData.get('tag') as string,
    description: formData.get('description') as string,
    longDescription: (formData.get('longDescription') as string) || undefined,
    year: (formData.get('year') as string) || undefined,
    role: (formData.get('role') as string) || undefined,
    href: formData.get('href') as string,
    arrowLabel: (formData.get('arrowLabel') as string) || undefined,
    liveHref: (formData.get('liveHref') as string) || undefined,
    tech: techRaw ? techRaw.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
    highlights: highlightsRaw.filter(Boolean).length ? highlightsRaw.filter(Boolean) : undefined,
    coverImage,
    images: images.length ? images : undefined,
    videoUrl: (formData.get('videoUrl') as string) || undefined,
  };

  const override = await readOverride();
  const existing = override.projects ?? [];
  const idx = existing.findIndex((p) => p.id === id);
  if (idx >= 0) {
    existing[idx] = project;
  } else {
    existing.push(project);
  }
  await writeOverride({ ...override, projects: existing });

  revalidatePath('/');
  revalidatePath('/projects/[id]', 'page');

  return NextResponse.json(project, { status: 201 });
}
