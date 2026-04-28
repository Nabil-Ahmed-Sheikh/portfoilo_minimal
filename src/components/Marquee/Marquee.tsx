'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './Marquee.module.css';

const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'AWS',
  'Python',
  'Cloud Engineering',
  'Scalable Systems',
  'Data Pipelines',
];

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...skills, ...skills];

  useEffect(() => {
    const el = trackRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const totalWidth = el.scrollWidth / 2;
    const tween = gsap.to(el, {
      x: -totalWidth,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.track} ref={trackRef} aria-hidden="true">
        {doubled.map((skill, i) => (
          <span key={i} className={styles.item}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
