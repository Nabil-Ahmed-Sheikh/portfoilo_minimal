import type { Project } from '@/types';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <a className={styles.card} href={project.href} target="_blank" rel="noopener noreferrer">
      <div className={styles.img}>
        <div className={styles.imgStripes} />
        <span className={styles.imgLabel}>Project Screenshot</span>
      </div>
      <p className={styles.tag}>{project.tag}</p>
      <h3 className={styles.title}>
        {project.title}
        {project.subtitle && (
          <em className={styles.subtitle}>{project.subtitle}</em>
        )}
      </h3>
      <p className={styles.desc}>{project.description}</p>
      {project.arrowLabel && (
        <span className={styles.arrow}>{project.arrowLabel}</span>
      )}
    </a>
  );
}
