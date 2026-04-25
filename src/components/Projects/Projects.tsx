import { FadeIn } from '@/components/FadeIn';
import { SectionLabel } from '@/components/SectionLabel';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/types';
import styles from './Projects.module.css';

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className={styles.section}>
      <FadeIn>
        <SectionLabel>Recent Projects</SectionLabel>
      </FadeIn>
      <FadeIn delay={100}>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
