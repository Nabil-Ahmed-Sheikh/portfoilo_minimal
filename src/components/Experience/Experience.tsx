import { FadeIn } from '@/components/FadeIn';
import { SectionLabel } from '@/components/SectionLabel';
import { ExperienceItem } from '@/components/ExperienceItem';
import { experience } from '@/data/experience';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <FadeIn>
        <SectionLabel>Experience</SectionLabel>
      </FadeIn>
      <div className={styles.list}>
        {experience.map((entry, i) => (
          <FadeIn key={entry.id} delay={i * 100}>
            <ExperienceItem entry={entry} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
