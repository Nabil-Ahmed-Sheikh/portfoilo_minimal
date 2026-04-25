import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { PersonalInfo } from '@/types';
import styles from './Nav.module.css';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

interface NavProps {
  personal: PersonalInfo;
}

export function Nav({ personal }: NavProps) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        {personal.name}
      </Link>
      <div className={styles.right}>
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </div>
    </nav>
  );
}
