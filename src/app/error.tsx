'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        padding: '48px 24px',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(5rem, 15vw, 9rem)',
          lineHeight: 1,
          color: 'var(--line)',
        }}
      >
        500
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          color: 'var(--ink)',
          fontWeight: 400,
        }}
      >
        Something went wrong
      </h1>
      <p style={{ color: 'var(--ink2)', maxWidth: '36ch' }}>
        An unexpected error occurred. You can try again or return to the portfolio.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            padding: '12px 28px',
            background: 'var(--ink)',
            color: 'var(--bg)',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            padding: '12px 28px',
            border: '1px solid var(--line)',
            color: 'var(--ink)',
            fontSize: '0.78rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          ← Portfolio
        </Link>
      </div>
    </main>
  );
}
