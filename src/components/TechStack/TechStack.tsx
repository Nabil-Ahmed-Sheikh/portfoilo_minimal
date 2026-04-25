import { FadeIn } from '@/components/FadeIn';
import { SectionLabel } from '@/components/SectionLabel';
import { StackItem } from '@/components/StackItem';
import type { StackEntry } from '@/types';
import styles from './TechStack.module.css';

interface TechStackProps {
  stack: StackEntry[];
}

export function TechStack({ stack }: TechStackProps) {
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
