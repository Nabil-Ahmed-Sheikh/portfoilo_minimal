'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { StackEntry } from '@/types';
import styles from './StackForm.module.css';

interface Props {
  initialData?: StackEntry;
}

export default function StackForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    type: initialData?.type ?? '',
    icon: initialData?.icon ?? '',
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    setError('');

    const url = isEdit ? `/api/admin/stack/${initialData!.id}` : '/api/admin/stack';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/admin/stack');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Save failed');
        setStatus('error');
      }
    } catch {
      setError('Network error — please try again');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="icon">
          Icon (emoji or symbol) *
        </label>
        <input
          id="icon"
          name="icon"
          className={styles.input}
          value={form.icon}
          onChange={handleChange}
          placeholder="e.g. ⚛️ or Ts"
          required
          style={{ fontSize: '1.4rem' }}
        />
        <span className={styles.hint}>Paste an emoji or a short symbol (1–3 chars)</span>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">
          Name *
        </label>
        <input
          id="name"
          name="name"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. React"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="type">
          Type *
        </label>
        <input
          id="type"
          name="type"
          className={styles.input}
          value={form.type}
          onChange={handleChange}
          placeholder="e.g. Frontend, Backend, DevOps"
          required
        />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : isEdit ? 'Save Changes' : 'Add to Stack'}
        </button>
        <Link href="/admin/stack" className={styles.cancelBtn}>
          Cancel
        </Link>
        {status === 'error' && <span className={styles.errorMsg}>{error}</span>}
      </div>
    </form>
  );
}
