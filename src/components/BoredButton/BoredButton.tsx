import Link from 'next/link';
import styles from './BoredButton.module.css';

export function BoredButton() {
  return (
    <Link href="/play" className={styles.button} aria-label="Bored? Play a game">
      <span className={styles.eyebrow}>Bored?</span>
      <span className={styles.cta}>Play a game →</span>
    </Link>
  );
}
