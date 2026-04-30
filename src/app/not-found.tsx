import Link from 'next/link';

export default function NotFound() {
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
        404
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(1.4rem, 4vw, 2rem)',
          color: 'var(--ink)',
          fontWeight: 400,
        }}
      >
        Page not found
      </h1>
      <p style={{ color: 'var(--ink2)', maxWidth: '36ch' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '8px',
          padding: '12px 28px',
          background: 'var(--ink)',
          color: 'var(--bg)',
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        ← Back to Portfolio
      </Link>
    </main>
  );
}
