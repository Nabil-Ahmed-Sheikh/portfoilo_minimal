import Link from 'next/link';
import { fetchPortfolio } from '@/lib/portfolio';
import styles from './admin.module.css';

export default async function AdminDashboard() {
  const data = await fetchPortfolio();

  const sections = [
    {
      label: 'Projects',
      count: data.projects.length,
      href: '/admin/projects',
      action: 'Manage Projects',
    },
    {
      label: 'Experience',
      count: data.experience.length,
      href: '/admin/experience',
      action: 'Manage Experience',
    },
    {
      label: 'Tech Stack',
      count: data.stack.length,
      href: '/admin/stack',
      action: 'Manage Stack',
    },
  ];

  return (
    <>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {sections.map((s) => (
          <div key={s.href} className={styles.card} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>{s.count}</div>
            <div style={{ color: '#666', marginBottom: '16px', fontSize: '0.85rem' }}>{s.label}</div>
            <Link
              href={s.href}
              style={{
                display: 'inline-block',
                padding: '6px 14px',
                background: '#1a1a1a',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '0.8rem',
              }}
            >
              {s.action}
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.card} style={{ marginTop: '16px' }}>
        <strong>Settings</strong>
        <p style={{ margin: '8px 0', color: '#666', fontSize: '0.85rem' }}>
          Update your email, GitHub link, and LinkedIn link.
        </p>
        <Link
          href="/admin/settings"
          style={{
            display: 'inline-block',
            padding: '6px 14px',
            background: '#1a1a1a',
            color: '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '0.8rem',
          }}
        >
          Edit Settings
        </Link>
      </div>
    </>
  );
}
