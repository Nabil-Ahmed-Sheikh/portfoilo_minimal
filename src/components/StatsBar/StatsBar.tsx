'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Stat } from '@/types';
import styles from './StatsBar.module.css';

gsap.registerPlugin(ScrollTrigger);

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      gsap.from(el, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      });
    }

    el.querySelectorAll<HTMLElement>('[data-count]').forEach((numEl) => {
      const target = parseFloat(numEl.dataset.count ?? '0');
      if (isNaN(target) || reducedMotion) return;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
        onUpdate() {
          numEl.textContent = String(Math.round(obj.val));
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <div ref={barRef} className={styles.bar}>
      {stats.map((stat) => (
        <div key={stat.id} className={styles.stat}>
          <div className={styles.num}>
            {stat.prefix && <span className={styles.accent}>{stat.prefix}</span>}
            <span data-count={stat.value}>{stat.value}</span>
          </div>
          <div className={styles.label}>
            {stat.label.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
