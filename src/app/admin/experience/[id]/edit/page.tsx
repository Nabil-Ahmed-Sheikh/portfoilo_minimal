import { notFound } from 'next/navigation';
import { fetchPortfolio } from '@/lib/portfolio';
import ExperienceForm from '@/components/admin/ExperienceForm/ExperienceForm';
import styles from '../../../admin.module.css';

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchPortfolio();
  const entry = data.experience.find((e) => e.id === id);
  if (!entry) notFound();

  return (
    <>
      <h1 className={styles.pageTitle}>Edit Experience</h1>
      <ExperienceForm initialData={entry} />
    </>
  );
}
