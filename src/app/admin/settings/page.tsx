'use client';

import { useEffect, useState } from 'react';
import styles from '../admin.module.css';
import formStyles from '@/components/admin/ExperienceForm/ExperienceForm.module.css';

interface Settings {
  email: string;
  githubHref: string;
  linkedinHref: string;
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Settings>({ email: '', githubHref: '', linkedinHref: '' });
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        const github = data.socialLinks?.find((l: { id: string }) => l.id === 'github');
        const linkedin = data.socialLinks?.find((l: { id: string }) => l.id === 'linkedin');
        setForm({
          email: data.personal?.email ?? '',
          githubHref: github?.href ?? '',
          linkedinHref: linkedin?.href ?? '',
        });
      });
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('saving');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'saved' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <h1 className={styles.pageTitle}>Settings</h1>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={formStyles.form}>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="email">
              Contact Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={formStyles.input}
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="githubHref">
              GitHub URL
            </label>
            <input
              id="githubHref"
              name="githubHref"
              type="url"
              className={formStyles.input}
              value={form.githubHref}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="linkedinHref">
              LinkedIn URL
            </label>
            <input
              id="linkedinHref"
              name="linkedinHref"
              type="url"
              className={formStyles.input}
              value={form.linkedinHref}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className={formStyles.actions}>
            <button type="submit" className={formStyles.submitBtn} disabled={status === 'saving'}>
              {status === 'saving' ? 'Saving…' : 'Save Settings'}
            </button>
            {status === 'saved' && (
              <span className={formStyles.successMsg}>Settings saved.</span>
            )}
            {status === 'error' && (
              <span className={formStyles.errorMsg}>Save failed. Please try again.</span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
