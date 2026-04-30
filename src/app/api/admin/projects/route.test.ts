/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET, POST } from './route';

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

jest.mock('@/lib/admin-guard', () => ({
  requireAdmin: jest.fn(() => Promise.resolve(null)),
}));

const mockReadOverride = jest.fn(() => Promise.resolve({}));
const mockWriteOverride = jest.fn(() => Promise.resolve());

jest.mock('@/lib/override', () => ({
  readOverride: () => mockReadOverride(),
  writeOverride: (...args: unknown[]) => mockWriteOverride(...args),
}));

jest.mock('@/lib/portfolio', () => ({
  fetchPortfolio: jest.fn(() =>
    Promise.resolve({
      projects: [
        {
          id: 'proj-1',
          title: 'Alpha',
          tag: 'OSS',
          description: 'desc',
          href: 'https://github.com/a',
        },
      ],
    }),
  ),
}));

jest.mock('@/lib/upload', () => ({
  saveUploadedFile: jest.fn((file: File, id: string) =>
    Promise.resolve(`/uploads/${id}/${file.name}`),
  ),
}));

describe('GET /api/admin/projects', () => {
  it('returns the project list', async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toHaveLength(1);
    expect(json[0].id).toBe('proj-1');
  });

  it('returns 401 when not authenticated', async () => {
    const { requireAdmin } = await import('@/lib/admin-guard');
    (requireAdmin as jest.Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }),
    );
    const res = await GET();
    expect(res.status).toBe(401);
  });
});

describe('POST /api/admin/projects', () => {
  function makeProjectRequest(fields: Record<string, string>) {
    const fd = new FormData();
    Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
    return new NextRequest('http://localhost/api/admin/projects', {
      method: 'POST',
      body: fd,
    });
  }

  it('creates a project and returns 201', async () => {
    const res = await POST(
      makeProjectRequest({
        title: 'Beta',
        tag: 'Web',
        description: 'A project',
        href: 'https://github.com/b',
      }),
    );
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json.title).toBe('Beta');
    expect(mockWriteOverride).toHaveBeenCalled();
  });
});
