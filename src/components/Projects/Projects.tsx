'use client';

import { useState, useMemo } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { SectionLabel } from '@/components/SectionLabel';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/types';
import styles from './Projects.module.css';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(() => {
    const seen = new Set<string>();
    projects.forEach(p => p.tag.split(' · ').forEach(t => seen.add(t.trim())));
    return ['All', ...Array.from(seen)];
  }, [projects]);

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter(p => p.tag.split(' · ').some(t => t.trim() === activeTag));

  return (
    <section id="projects" className={styles.section}>
      <FadeIn>
        <SectionLabel>Recent Projects</SectionLabel>
      </FadeIn>
      <FadeIn delay={80}>
        <div className={styles.filters} role="group" aria-label="Filter projects by tag">
          {tags.map(tag => (
            <button
              key={tag}
              className={`${styles.chip} ${activeTag === tag ? styles.chipActive : ''}`}
              onClick={() => setActiveTag(tag)}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </FadeIn>
      <FadeIn delay={160}>
        <div className={styles.grid}>
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
