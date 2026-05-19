'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';
import styles from './StackQuiz.module.css';

interface Question {
  tech: string;
  correctId: string;
}

function buildQuestionBank(): Question[] {
  const techToProjects: Record<string, string[]> = {};
  for (const project of projects) {
    for (const tech of project.tech ?? []) {
      (techToProjects[tech] ??= []).push(project.id);
    }
  }
  return Object.entries(techToProjects)
    .filter(([, ids]) => ids.length === 1)
    .map(([tech, ids]) => ({ tech, correctId: ids[0] }));
}

const QUESTION_BANK = buildQuestionBank();

const PROJECT_LABELS: Record<string, string> = {
  sidetrek: 'Sidetrek',
  myhealth: 'myHealth',
  'power-system': 'Power System Forecasting',
};

const PROJECT_IDS = projects.map(p => p.id);
const QUESTION_COUNT = 10;

const PRAISE = ['Perfect score!', 'Excellent!', 'Great job!', 'Nice work!'];

function pickQuestions(): Question[] {
  return [...QUESTION_BANK]
    .sort(() => Math.random() - 0.5)
    .slice(0, QUESTION_COUNT);
}

type Phase = 'question' | 'feedback' | 'done';

export function StackQuiz() {
  const [queue, setQueue] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>('question');
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQueue(pickQuestions());
  }, []);

  const reset = useCallback(() => {
    setQueue(pickQuestions());
    setIdx(0);
    setSelected(null);
    setPhase('question');
    setScore(0);
  }, []);

  const handleAnswer = useCallback((projectId: string) => {
    if (phase !== 'question' || queue.length === 0) return;
    setSelected(projectId);
    if (projectId === queue[idx].correctId) setScore(s => s + 1);
    setPhase('feedback');
  }, [phase, queue, idx]);

  const handleNext = useCallback(() => {
    if (idx === queue.length - 1) {
      setPhase('done');
    } else {
      setIdx(i => i + 1);
      setSelected(null);
      setPhase('question');
    }
  }, [idx, queue.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && phase === 'feedback') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, handleNext]);

  if (queue.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading…</div>
      </div>
    );
  }

  const current = queue[idx];
  const total = queue.length;
  const progressPct = (idx / total) * 100;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/play" className={styles.back}>← Games</Link>
        <h1 className={styles.title}>Stack Smash</h1>
        <p className={styles.subtitle}>Which project used this technology?</p>
      </header>

      {phase !== 'done' && (
        <div className={styles.game}>
          <div className={styles.progressRow}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
            <span className={styles.progressLabel}>{idx + 1} / {total}</span>
          </div>

          <div className={styles.card}>
            <p className={styles.cardLabel}>Which project used</p>
            <p className={styles.techName}>{current.tech}</p>
          </div>

          <div className={styles.options}>
            {PROJECT_IDS.map(id => {
              const isCorrect = id === current.correctId;
              const isSelected = id === selected;
              const cls = [
                styles.option,
                phase === 'feedback' && isCorrect ? styles.optionCorrect : '',
                phase === 'feedback' && isSelected && !isCorrect ? styles.optionWrong : '',
                phase === 'feedback' && !isCorrect && !isSelected ? styles.optionDim : '',
              ].filter(Boolean).join(' ');

              return (
                <button
                  key={id}
                  className={cls}
                  onClick={() => handleAnswer(id)}
                  disabled={phase === 'feedback'}
                >
                  {PROJECT_LABELS[id]}
                </button>
              );
            })}
          </div>

          {phase === 'feedback' && (
            <div className={styles.feedbackRow}>
              <p className={`${styles.feedbackMsg} ${selected === current.correctId ? styles.feedbackGood : styles.feedbackBad}`}>
                {selected === current.correctId
                  ? '✓ Correct'
                  : `✗ ${PROJECT_LABELS[current.correctId]}`}
              </p>
              <button className={styles.nextBtn} onClick={handleNext}>
                {idx === total - 1 ? 'See Results' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className={styles.results}>
          <div className={styles.scoreBig}>
            <span className={styles.scoreNum}>{score}</span>
            <span className={styles.scoreTotal}>/ {total}</span>
          </div>
          <p className={styles.praiseText}>
            {score === total
              ? PRAISE[0]
              : score >= total * 0.7
              ? PRAISE[1]
              : score >= total * 0.5
              ? PRAISE[2]
              : PRAISE[3]}
          </p>
          <button className={styles.restartBtn} onClick={reset}>
            Play Again
          </button>
          <Link href="/play/typing" className={styles.switchLink}>
            Try Type the Stack instead →
          </Link>
        </div>
      )}
    </div>
  );
}
