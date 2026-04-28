'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import type { Project } from '@/types';
import styles from './ProjectDetail.module.css';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-anim="meta"]', { opacity: 0, y: 16, duration: 0.6 })
        .from('[data-anim="title"]', { opacity: 0, y: 40, duration: 0.9 }, '-=0.4')
        .from('[data-anim="body"]', { opacity: 0, y: 24, duration: 0.7, stagger: 0.1 }, '-=0.5');
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Back to Portfolio
      </Link>

      <div data-anim="meta" className={styles.meta}>
        <span className={styles.tag}>{project.tag}</span>
        {project.year && <span className={styles.year}>{project.year}</span>}
      </div>

      <h1 data-anim="title" className={styles.title}>
        {project.title}
        {project.subtitle && <em className={styles.titleSub}>{project.subtitle}</em>}
      </h1>

      {project.role && (
        <p data-anim="body" className={styles.role}>{project.role}</p>
      )}

      <div className={styles.divider} />

      {project.longDescription && (
        <p data-anim="body" className={styles.longDesc}>{project.longDescription}</p>
      )}

      {project.tech && project.tech.length > 0 && (
        <div data-anim="body">
          <p className={styles.sectionLabel}>Technologies</p>
          <div className={styles.tech}>
            {project.tech.map((t) => (
              <span key={t} className={styles.techPill}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <div data-anim="body">
          <p className={styles.sectionLabel}>Highlights</p>
          <ul className={styles.highlights}>
            {project.highlights.map((h) => (
              <li key={h} className={styles.highlight}>{h}</li>
            ))}
          </ul>
        </div>
      )}

      <div data-anim="body" className={styles.actions}>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          View on GitHub →
        </a>
        {project.liveHref && (
          <a
            href={project.liveHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.btn} ${styles.btnGhost}`}
          >
            Live Demo →
          </a>
        )}
      </div>
    </div>
  );
}
