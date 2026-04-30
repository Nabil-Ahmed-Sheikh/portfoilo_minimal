import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchPortfolio } from '@/lib/portfolio';
import { Nav } from '@/components/Nav';
import { ProjectDetail } from '@/components/ProjectDetail';

export async function generateStaticParams() {
  const { projects } = await fetchPortfolio();
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { projects } = await fetchPortfolio();
  const project = projects.find((p) => p.id === id);
  if (!project) return {};

  const description = project.description ?? `Details about ${project.title}`;
  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: 'article',
      ...(project.coverImage ? { images: [{ url: project.coverImage }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
      ...(project.coverImage ? { images: [project.coverImage] } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { projects, personal } = await fetchPortfolio();
  const project = projects.find((p) => p.id === id);

  if (!project) notFound();

  return (
    <>
      <Nav personal={personal} />
      <main>
        <ProjectDetail project={project} />
      </main>
    </>
  );
}
