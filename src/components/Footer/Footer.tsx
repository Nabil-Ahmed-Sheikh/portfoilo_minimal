import type { PersonalInfo } from '@/types';
import styles from './Footer.module.css';

interface FooterProps {
  personal: PersonalInfo;
}

export function Footer({ personal }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>© {year} {personal.name}</p>
      <p className={styles.tagline}>{personal.tagline}.</p>
    </footer>
  );
}
