import { notFound } from 'next/navigation';
import { fetchPortfolio } from '@/lib/portfolio';
import ProjectForm from '@/components/admin/ProjectForm/ProjectForm';
import styles from '../../../admin.module.css';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchPortfolio();
  const project = data.projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <h1 className={styles.pageTitle}>Edit Project</h1>
      <ProjectForm initialData={project} />
    </>
  );
}
