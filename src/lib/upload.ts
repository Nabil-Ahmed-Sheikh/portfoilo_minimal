import { getSupabase } from './supabase';

const BUCKET = 'portfolio-images';

export async function saveUploadedFile(file: File, projectId: string): Promise<string> {
  const sb = getSupabase();
  const safeId = projectId.replace(/[^a-z0-9-_]/gi, '-');
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase();
  const storagePath = `${safeId}/${Date.now()}-${safeName}`;

  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await sb.storage.from(BUCKET).upload(storagePath, bytes, {
    contentType: file.type || 'application/octet-stream',
    upsert: true,
  });

  if (error) throw new Error(`Image upload failed: ${error.message}`);

  const { data } = sb.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}
