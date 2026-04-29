import { notFound } from 'next/navigation';
import { fetchPortfolio } from '@/lib/portfolio';
import StackForm from '@/components/admin/StackForm/StackForm';
import styles from '../../../admin.module.css';

export default async function EditStackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await fetchPortfolio();
  const item = data.stack.find((s) => s.id === id);
  if (!item) notFound();

  return (
    <>
      <h1 className={styles.pageTitle}>Edit Stack Item</h1>
      <StackForm initialData={item} />
    </>
  );
}
