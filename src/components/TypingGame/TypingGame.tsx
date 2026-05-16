'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './TypingGame.module.css';

const WORD_POOL = [
  'TypeScript', 'Python', 'Go', 'React', 'Node',
  'AWS', 'Docker', 'Kubernetes', 'Terraform', 'PostgreSQL',
  'Express', 'MongoDB', 'Airflow', 'Scikit', 'Gurobi',
  'GraphQL', 'Redis', 'Nginx', 'Linux', 'Git',
  'Prisma', 'Webpack', 'Tailwind', 'Rust', 'Svelte',
];

const DURATION = 30;
const POOL_SIZE = 60;

function buildWordList(): string[] {
  const shuffled = [...WORD_POOL].sort(() => Math.random() - 0.5);
  const out: string[] = [];
  while (out.length < POOL_SIZE) out.push(...shuffled);
  return out.slice(0, POOL_SIZE);
}

type Status = 'idle' | 'playing' | 'done';

export function TypingGame() {
  const [status, setStatus] = useState<Status>('idle');
  const [words, setWords] = useState<string[]>([]);
  const [wordIdx, setWordIdx] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setWords(buildWordList());
  }, []);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const start = useCallback(() => {
    setStatus('playing');
    setTimeout(() => inputRef.current?.focus(), 0);
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setStatus('done');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setWords(buildWordList());
    setWordIdx(0);
    setInput('');
    setTimeLeft(DURATION);
    setCorrect(0);
    setIncorrect(0);
    setStatus('idle');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status !== 'playing') return;
    const val = e.target.value;
    if (val.endsWith(' ')) {
      const typed = val.trim();
      if (typed === words[wordIdx]) setCorrect(c => c + 1);
      else setIncorrect(c => c + 1);
      setWordIdx(i => i + 1);
      setInput('');
    } else {
      setInput(val);
    }
  };

  const elapsed = DURATION - timeLeft;
  const liveWpm = elapsed > 0 ? Math.round(correct / (elapsed / 60)) : 0;
  const finalWpm = Math.round(correct / (DURATION / 60));
  const accuracy =
    correct + incorrect > 0
      ? Math.round((correct / (correct + incorrect)) * 100)
      : 100;

  const currentWord = words[wordIdx] ?? '';
  const charStatuses = currentWord.split('').map((char, i) => ({
    char,
    state: i >= input.length ? 'pending' : input[i] === char ? 'correct' : 'wrong',
  }));
  const overflow = input.length > currentWord.length ? input.slice(currentWord.length) : '';

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>← Portfolio</Link>
        <h1 className={styles.title}>Type the Stack</h1>
        <p className={styles.subtitle}>How fast can you type through the tech stack?</p>
      </header>

      <div className={styles.game}>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statVal}>
              {status === 'done' ? finalWpm : liveWpm}
            </span>
            <span className={styles.statLabel}>wpm</span>
          </div>
          <div className={styles.stat}>
            <span className={`${styles.statVal} ${timeLeft <= 5 && status === 'playing' ? styles.urgent : ''}`}>
              {timeLeft}
            </span>
            <span className={styles.statLabel}>sec</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statVal}>{accuracy}%</span>
            <span className={styles.statLabel}>accuracy</span>
          </div>
        </div>

        {status !== 'done' && (
          <>
            <div
              className={styles.wordArea}
              onClick={() => status === 'playing' && inputRef.current?.focus()}
            >
              {words.slice(wordIdx, wordIdx + 24).map((word, rel) => {
                if (rel === 0) {
                  return (
                    <span key={wordIdx} className={styles.wordCurrent}>
                      {charStatuses.map(({ char, state }, i) => (
                        <span
                          key={i}
                          className={
                            state === 'correct'
                              ? styles.charCorrect
                              : state === 'wrong'
                              ? styles.charWrong
                              : styles.charPending
                          }
                        >
                          {char}
                        </span>
                      ))}
                      {overflow.split('').map((char, i) => (
                        <span key={`ov${i}`} className={styles.charOverflow}>{char}</span>
                      ))}
                      <span className={styles.caret} />
                    </span>
                  );
                }
                return (
                  <span key={wordIdx + rel} className={styles.wordPending}>
                    {word}
                  </span>
                );
              })}
            </div>

            <input
              ref={inputRef}
              className={`${styles.input} ${overflow ? styles.inputError : ''}`}
              value={input}
              onChange={handleChange}
              disabled={status !== 'playing'}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />

            {status === 'idle' && (
              <button className={styles.startBtn} onClick={start}>
                Start · {DURATION}s
              </button>
            )}
          </>
        )}

        {status === 'done' && (
          <div className={styles.results}>
            <div className={styles.resultGrid}>
              <div className={styles.resultCard}>
                <span className={styles.resultVal}>{finalWpm}</span>
                <span className={styles.resultLabel}>WPM</span>
              </div>
              <div className={styles.resultCard}>
                <span className={styles.resultVal}>{accuracy}%</span>
                <span className={styles.resultLabel}>Accuracy</span>
              </div>
              <div className={styles.resultCard}>
                <span className={styles.resultVal}>{correct}</span>
                <span className={styles.resultLabel}>Correct</span>
              </div>
              <div className={styles.resultCard}>
                <span className={styles.resultVal}>{incorrect}</span>
                <span className={styles.resultLabel}>Incorrect</span>
              </div>
            </div>
            <button className={styles.restartBtn} onClick={reset}>
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
