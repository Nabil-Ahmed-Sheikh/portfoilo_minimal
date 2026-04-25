import { personal } from '@/data/personal';
import styles from './Footer.module.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>© {year} {personal.name}</p>
      <p className={styles.tagline}>{personal.tagline}.</p>
    </footer>
  );
}
