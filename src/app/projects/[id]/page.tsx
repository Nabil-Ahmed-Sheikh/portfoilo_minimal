import { notFound } from 'next/navigation';
import { fetchPortfolio } from '@/lib/portfolio';
import { Nav } from '@/components/Nav';
import { ProjectDetail } from '@/components/ProjectDetail';

export async function generateStaticParams() {
  const { projects } = await fetchPortfolio();
  return projects.map((p) => ({ id: p.id }));
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
