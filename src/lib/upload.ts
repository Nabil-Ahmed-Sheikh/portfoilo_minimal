import fs from 'fs/promises';
import path from 'path';

// FUTURE: Upload to S3/Cloudinary/Vercel Blob instead, return the remote URL
export async function saveUploadedFile(file: File, projectId: string): Promise<string> {
  const safeProjectId = projectId.replace(/[^a-z0-9-_]/gi, '-');
  const dir = path.join(process.cwd(), 'public', 'uploads', safeProjectId);
  await fs.mkdir(dir, { recursive: true });

  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-');
  const filePath = path.join(dir, safeName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, bytes);

  return `/uploads/${safeProjectId}/${safeName}`;
}
