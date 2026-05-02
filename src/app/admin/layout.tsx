'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';
import AdminLogoutButton from './AdminLogoutButton';

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/stack', label: 'Tech Stack' },
  { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          Admin Portal
          <span>Portfolio CMS</span>
        </div>
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarFooter}>
          <AdminLogoutButton />
        </div>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
