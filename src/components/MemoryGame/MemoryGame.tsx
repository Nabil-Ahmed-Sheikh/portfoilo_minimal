'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { stack } from '@/data/stack';
import type { StackEntry } from '@/types';
import styles from './MemoryGame.module.css';

export interface Card {
  uid: number;
  stackId: string;
  flipped: boolean;
  matched: boolean;
}

type Status = 'idle' | 'playing' | 'done';

export function buildCards(): Card[] {
  return [...stack, ...stack]
    .map((entry, i) => ({ entry, sort: Math.random(), uid: i }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ entry, uid }) => ({
      uid,
      stackId: entry.id,
      flipped: false,
      matched: false,
    }));
}

function getEntry(id: string): StackEntry {
  return stack.find(s => s.id === id)!;
}

function formatTime(secs: number): string {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function MemoryGame() {
  const [status, setStatus] = useState<Status>('idle');
  const [cards, setCards] = useState<Card[]>([]);
  const [firstPick, setFirstPick] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setCards(buildCards());
  }, []);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (status === 'playing' && cards.length > 0 && cards.every(c => c.matched)) {
      if (timerRef.current) clearInterval(timerRef.current);
      setStatus('done');
    }
  }, [cards, status]);

  const matchedStackIds = useMemo(() => {
    const seen = new Set<string>();
    cards.forEach(c => { if (c.matched) seen.add(c.stackId); });
    return [...seen];
  }, [cards]);

  const acquiredByType = useMemo(() => {
    const byType: Record<string, StackEntry[]> = {};
    matchedStackIds.forEach(id => {
      const entry = getEntry(id);
      if (entry) (byType[entry.type] ??= []).push(entry);
    });
    return byType;
  }, [matchedStackIds]);

  const efficiency = moves > 0 ? Math.min(100, Math.round((10 / moves) * 100)) : 100;

  const start = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCards(buildCards());
    setFirstPick(null);
    setLocked(false);
    setMoves(0);
    setElapsed(0);
    setStatus('playing');
    timerRef.current = setInterval(() => {
      setElapsed(t => t + 1);
    }, 1000);
  }, []);

  const handleCardClick = useCallback((uid: number) => {
    if (locked || status !== 'playing') return;

    const card = cards.find(c => c.uid === uid);
    if (!card || card.flipped || card.matched) return;

    setCards(prev => prev.map(c => c.uid === uid ? { ...c, flipped: true } : c));

    if (firstPick === null) {
      setFirstPick(uid);
      return;
    }

    const firstCard = cards.find(c => c.uid === firstPick)!;
    setMoves(m => m + 1);

    if (firstCard.stackId === card.stackId) {
      setCards(prev => prev.map(c =>
        c.uid === firstPick || c.uid === uid ? { ...c, matched: true } : c
      ));
      setFirstPick(null);
    } else {
      setLocked(true);
      const fp = firstPick;
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.uid === fp || c.uid === uid ? { ...c, flipped: false } : c
        ));
        setFirstPick(null);
        setLocked(false);
      }, 900);
    }
  }, [locked, status, firstPick, cards]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/play" className={styles.back}>← Games</Link>
        <h1 className={styles.title}>Tech Tycoon</h1>
        <p className={styles.subtitle}>Flip pairs. Build your portfolio.</p>
      </header>

      {status === 'idle' && (
        <div className={styles.idleScreen}>
          <p className={styles.idleDesc}>
            20 face-down cards — 10 technologies, 2 copies each. Click to flip pairs.
            Match them all to acquire your tech portfolio.
          </p>
          <button className={styles.startBtn} onClick={start}>
            Start Game
          </button>
        </div>
      )}

      {status === 'playing' && (
        <div className={styles.gameArea}>
          <div className={styles.statsRow}>
            <div className={styles.stat}>
              <span className={styles.statVal}>{moves}</span>
              <span className={styles.statLabel}>moves</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>{formatTime(elapsed)}</span>
              <span className={styles.statLabel}>time</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statVal}>{matchedStackIds.length}</span>
              <span className={styles.statLabel}>acquired</span>
            </div>
          </div>

          <div className={styles.grid}>
            {cards.map(card => {
              const isFlipped = card.flipped || card.matched;
              const entry = isFlipped ? getEntry(card.stackId) : null;
              return (
                <div
                  key={card.uid}
                  role="button"
                  aria-label={isFlipped ? entry?.name : 'face-down card'}
                  aria-pressed={isFlipped}
                  data-stackid={card.stackId}
                  className={[
                    styles.cardWrapper,
                    isFlipped ? styles.cardFlipped : '',
                    card.matched ? styles.cardMatched : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => handleCardClick(card.uid)}
                >
                  <div className={styles.cardInner}>
                    <div className={`${styles.cardFace} ${styles.cardBack}`} />
                    <div className={`${styles.cardFace} ${styles.cardFront}`}>
                      {entry && (
                        <>
                          <span className={styles.cardIcon}>{entry.icon}</span>
                          <span className={styles.cardName}>{entry.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.acquiredRow}>
            <p className={styles.acquiredLabel}>
              Acquired · {matchedStackIds.length} / {stack.length}
            </p>
            <div className={styles.acquiredChips}>
              {matchedStackIds.map(id => {
                const entry = getEntry(id);
                return (
                  <span key={id} className={styles.chip}>
                    {entry.icon} {entry.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {status === 'done' && (
        <div className={styles.results}>
          <div className={styles.resultStats}>
            <div className={styles.resultCard}>
              <span className={styles.resultVal}>{moves}</span>
              <span className={styles.resultLabel}>Moves</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.resultVal}>{formatTime(elapsed)}</span>
              <span className={styles.resultLabel}>Time</span>
            </div>
            <div className={styles.resultCard}>
              <span className={styles.resultVal}>{efficiency}%</span>
              <span className={styles.resultLabel}>Efficiency</span>
            </div>
          </div>

          <div className={styles.portfolio}>
            <p className={styles.portfolioTitle}>Your Tech Portfolio</p>
            <div className={styles.portfolioGroups}>
              {Object.entries(acquiredByType).map(([type, entries]) => (
                <div key={type} className={styles.portfolioGroup}>
                  <span className={styles.groupLabel}>{type}</span>
                  <div className={styles.groupChips}>
                    {entries.map(entry => (
                      <span key={entry.id} className={styles.chip}>
                        {entry.icon} {entry.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className={styles.restartBtn} onClick={start}>Play Again</button>
          <Link href="/play/quiz" className={styles.switchLink}>
            Try Stack Smash instead →
          </Link>
        </div>
      )}
    </div>
  );
}
