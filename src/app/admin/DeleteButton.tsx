'use client';

import { useRouter } from 'next/navigation';
import styles from './table.module.css';

interface Props {
  endpoint: string;
  label?: string;
}

export default function DeleteButton({ endpoint, label = 'Delete' }: Props) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this item?')) return;
    const res = await fetch(endpoint, { method: 'DELETE' });
    if (res.ok) {
      router.refresh();
    } else {
      alert('Delete failed. Please try again.');
    }
  }

  return (
    <button className={styles.deleteBtn} onClick={handleDelete}>
      {label}
    </button>
  );
}
