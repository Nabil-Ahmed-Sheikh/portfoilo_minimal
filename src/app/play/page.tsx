import Link from 'next/link';
import styles from './play.module.css';

export const metadata = { title: 'Games' };

export default function PlayPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>← Portfolio</Link>
        <h1 className={styles.title}>Games</h1>
        <p className={styles.subtitle}>Take a break.</p>
      </header>

      <div className={styles.grid}>
        <Link href="/play/typing" className={styles.card}>
          <p className={styles.tag}>Typing Speed · 30s</p>
          <h2 className={styles.cardTitle}>Type the Stack</h2>
          <p className={styles.cardDesc}>
            How fast can you type through the tech stack? Race against the clock.
          </p>
          <span className={styles.cta}>Play →</span>
        </Link>

        <Link href="/play/quiz" className={styles.card}>
          <p className={styles.tag}>Quiz · 10 questions</p>
          <h2 className={styles.cardTitle}>Stack Smash</h2>
          <p className={styles.cardDesc}>
            Match each technology to the project that used it. Do you know the stack?
          </p>
          <span className={styles.cta}>Play →</span>
        </Link>
      </div>
    </div>
  );
}
