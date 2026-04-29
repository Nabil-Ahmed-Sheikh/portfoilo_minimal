'use client';

import { useRouter } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  return (
    <button className={styles.logoutBtn} onClick={handleLogout}>
      Log out
    </button>
  );
}
