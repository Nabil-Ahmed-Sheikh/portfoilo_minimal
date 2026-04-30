'use client';

import { useState } from 'react';
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
  const [open, setOpen] = useState(false);

  return (
    <>
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
          <a href="/resume.pdf" download className={styles.resumeBtn}>
            Resume ↓
          </a>
          <ThemeToggle />
          <button
            className={styles.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`${styles.burgerLine} ${open ? styles.burgerLineOpen1 : ''}`} />
            <span className={`${styles.burgerLine} ${open ? styles.burgerLineOpen2 : ''}`} />
            <span className={`${styles.burgerLine} ${open ? styles.burgerLineOpen3 : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
        aria-hidden={!open}
      >
        <ul className={styles.drawerLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.drawerLink}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/resume.pdf"
          download
          className={styles.drawerResume}
          onClick={() => setOpen(false)}
        >
          Resume ↓
        </a>
      </div>

      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
