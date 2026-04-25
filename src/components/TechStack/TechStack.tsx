import { FadeIn } from '@/components/FadeIn';
import { SectionLabel } from '@/components/SectionLabel';
import { StackItem } from '@/components/StackItem';
import { stack } from '@/data/stack';
import styles from './TechStack.module.css';

export function TechStack() {
  return (
    <section id="stack" className={styles.section}>
      <FadeIn>
        <SectionLabel>Tech Stack</SectionLabel>
      </FadeIn>
      <FadeIn delay={100}>
        <div className={styles.grid}>
          {stack.map((entry) => (
            <StackItem key={entry.id} entry={entry} />
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
