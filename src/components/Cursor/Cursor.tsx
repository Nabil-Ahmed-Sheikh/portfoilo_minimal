'use client';

import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = -200,
      mouseY = -200;
    let ringX = -200,
      ringY = -200;
    let dotScale = 1,
      dotScaleTarget = 1;
    let ringScale = 1,
      ringScaleTarget = 1;
    let rafId: number;

    document.documentElement.classList.add('cursor-custom');

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], label, input, textarea, select')) {
        dotScaleTarget = 0;
        ringScaleTarget = 1.8;
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button, [role="button"], label, input, textarea, select')) {
        dotScaleTarget = 1;
        ringScaleTarget = 1;
      }
    };

    const tick = () => {
      dotScale += (dotScaleTarget - dotScale) * 0.18;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%) scale(${dotScale})`;

      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      ringScale += (ringScaleTarget - ringScale) * 0.1;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ringScale})`;

      rafId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('cursor-custom');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
    </>
  );
}
