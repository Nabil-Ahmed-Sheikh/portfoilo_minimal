'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { MagneticButton } from '@/components/MagneticButton';
import type { PersonalInfo } from '@/types';
import styles from './Hero.module.css';

const DISCIPLINES = ['Software', 'Cloud', 'Systems', 'Full-Stack'];
const INTERVAL_MS = 2400;

interface HeroProps {
  personal: PersonalInfo;
}

export function Hero({ personal }: HeroProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const emRef = useRef<HTMLElement>(null);
  const [disciplineIndex, setDisciplineIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(headingRef.current, { opacity: 0, y: 56, duration: 1 })
        .from(bioRef.current, { opacity: 0, y: 24, duration: 0.7 }, '-=0.55')
        .from(ctasRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.45')
        .from(photoRef.current, { opacity: 0, x: 48, scale: 0.92, duration: 1 }, '-=0.7');
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      const em = emRef.current;
      if (!em) return;

      gsap.to(em, {
        opacity: 0,
        y: -14,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => {
          setDisciplineIndex(i => (i + 1) % DISCIPLINES.length);
          gsap.fromTo(
            em,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out' },
          );
        },
      });
    }, INTERVAL_MS);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.text}>
        <h1 ref={headingRef} className={styles.heading}>
          <em ref={emRef} className={styles.em}>{DISCIPLINES[disciplineIndex]}</em>
          <br />
          Engineer
        </h1>
        <p ref={bioRef} className={styles.bio}>{personal.bio}</p>
        <div ref={ctasRef} className={styles.ctas}>
          <MagneticButton>
            <a href="#projects" className={styles.cta}>
              View Work ↓
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="#contact" className={styles.ctaGhost}>
              Get in Touch
            </a>
          </MagneticButton>
        </div>
      </div>

      <div ref={photoRef} className={styles.photoWrapper}>
        <div className={styles.photo}>
          <div className={styles.photoStripes} />
          <Image
            src="/hat.jpg"
            alt="Profile photo"
            fill
            loading="eager"
            priority
            className={styles.photoImg}
            sizes="320px"
          />
        </div>
      </div>
    </div>
  );
}
