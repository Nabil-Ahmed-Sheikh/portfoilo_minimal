'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import type { Project } from '@/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseEnter = () => {
    gsap.to(cardRef.current, { y: -6, duration: 0.3, ease: 'power2.out' });
  };
  const onMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.4, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Full-card link to detail page — sits behind all interactive children */}
      <Link href={`/projects/${project.id}`} className={styles.cardOverlay} aria-label={`View ${project.title} details`} />

      <div className={styles.img}>
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <>
            <div className={styles.imgStripes} />
            <span className={styles.imgLabel}>Project Screenshot</span>
          </>
        )}
      </div>
      <p className={styles.tag}>{project.tag}</p>
      <h3 className={styles.title}>
        {project.title}
        {project.subtitle && <em className={styles.subtitle}>{project.subtitle}</em>}
      </h3>
      <p className={styles.desc}>{project.description}</p>

      {project.arrowLabel && (
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.arrow}
        >
          {project.arrowLabel}
        </a>
      )}
    </div>
  );
}
