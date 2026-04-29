'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ExperienceEntry } from '@/types';
import styles from './ExperienceForm.module.css';

interface Props {
  initialData?: ExperienceEntry;
}

export default function ExperienceForm({ initialData }: Props) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [form, setForm] = useState({
    company: initialData?.company ?? '',
    role: initialData?.role ?? '',
    period: initialData?.period ?? '',
    description: initialData?.description ?? '',
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    setError('');

    const url = isEdit
      ? `/api/admin/experience/${initialData!.id}`
      : '/api/admin/experience';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/admin/experience');
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
        <label className={styles.label} htmlFor="company">
          Company *
        </label>
        <input
          id="company"
          name="company"
          className={styles.input}
          value={form.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="role">
          Role *
        </label>
        <input
          id="role"
          name="role"
          className={styles.input}
          value={form.role}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="period">
          Period *
        </label>
        <input
          id="period"
          name="period"
          className={styles.input}
          value={form.period}
          onChange={handleChange}
          placeholder="e.g. 2023 – Present"
          required
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="description">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          className={styles.textarea}
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Experience'}
        </button>
        <Link href="/admin/experience" className={styles.cancelBtn}>
          Cancel
        </Link>
        {status === 'error' && <span className={styles.errorMsg}>{error}</span>}
      </div>
    </form>
  );
}
