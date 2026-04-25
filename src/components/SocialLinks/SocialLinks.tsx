import type { SocialLink } from '@/types';
import styles from './SocialLinks.module.css';

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    <div className={styles.list}>
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          className={styles.link}
          target={link.href.startsWith('mailto:') ? undefined : '_blank'}
          rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        >
          <span className={styles.label}>{link.label}</span>
          <span className={styles.display}>{link.display}</span>
        </a>
      ))}
    </div>
  );
}
