import type { StackEntry } from '@/types';
import styles from './StackItem.module.css';

interface StackItemProps {
  entry: StackEntry;
}

export function StackItem({ entry }: StackItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.icon} aria-hidden="true">
        {entry.icon}
      </div>
      <span className={styles.name}>{entry.name}</span>
      <span className={styles.type}>{entry.type}</span>
    </div>
  );
}
