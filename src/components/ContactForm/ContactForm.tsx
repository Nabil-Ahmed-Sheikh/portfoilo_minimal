'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setStatus('sent');
        form.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        const data = await res.json();
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — please try again.');
      setStatus('error');
    }
  };

  const isSent = status === 'sent';
  const isSending = status === 'sending';
  const isError = status === 'error';

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          className={styles.input}
          type="text"
          placeholder="Your name"
          required
          disabled={isSending || isSent}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          className={styles.input}
          type="email"
          placeholder="your@email.com"
          required
          disabled={isSending || isSent}
        />
      </div>
      <div className={styles.group}>
        <label className={styles.label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          rows={5}
          placeholder="Tell me about your project..."
          required
          disabled={isSending || isSent}
        />
      </div>
      <button className={styles.submit} type="submit" disabled={isSending || isSent}>
        {isSent ? 'Message Sent ✓' : isSending ? 'Sending...' : 'Send Message'}
      </button>
      {isError && <p className={styles.error}>{errorMsg}</p>}
    </form>
  );
}
