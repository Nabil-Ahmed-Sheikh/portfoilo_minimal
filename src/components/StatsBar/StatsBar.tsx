import { FadeIn } from '@/components/FadeIn';
import { stats } from '@/data/stats';
import styles from './StatsBar.module.css';

export function StatsBar() {
  return (
    <FadeIn>
      <div className={styles.bar}>
        {stats.map((stat) => (
          <div key={stat.id} className={styles.stat}>
            <div className={styles.num}>
              {stat.prefix && <span className={styles.accent}>{stat.prefix}</span>}
              {stat.value}
            </div>
            <div className={styles.label}>
              {stat.label.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < stat.label.split('\n').length - 1 && <br />}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
