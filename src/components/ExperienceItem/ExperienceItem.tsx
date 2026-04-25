import type { ExperienceEntry } from '@/types';
import styles from './ExperienceItem.module.css';

interface ExperienceItemProps {
  entry: ExperienceEntry;
}

export function ExperienceItem({ entry }: ExperienceItemProps) {
  return (
    <div className={styles.item}>
      <time className={styles.date}>{entry.period}</time>
      <div>
        <h3 className={styles.company}>{entry.company}</h3>
        <p className={styles.role}>{entry.role}</p>
        <p className={styles.desc}>{entry.description}</p>
      </div>
    </div>
  );
}
