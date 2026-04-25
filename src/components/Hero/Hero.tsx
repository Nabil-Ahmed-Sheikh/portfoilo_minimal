import { FadeIn } from '@/components/FadeIn';
import type { PersonalInfo } from '@/types';
import styles from './Hero.module.css';

interface HeroProps {
  personal: PersonalInfo;
}

export function Hero({ personal }: HeroProps) {
  return (
    <div className={styles.hero}>
      <FadeIn className={styles.text}>
        <h1 className={styles.heading}>
          Software
          <br />
          <em className={styles.em}>Engineer</em>
        </h1>
        <p className={styles.bio}>{personal.bio}</p>
        <div className={styles.ctas}>
          <a href="#projects" className={styles.cta}>
            View Work ↓
          </a>
          <a href="#contact" className={styles.ctaGhost}>
            Get in Touch
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={200} className={styles.photoWrapper}>
        <div className={styles.photo}>
          <div className={styles.photoStripes} />
          <div className={styles.photoLabel}>
            <span className={styles.photoInitials}>{personal.name.split(' ').map((n) => n[0]).join('')}</span>
            <span className={styles.photoText}>Photo</span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
