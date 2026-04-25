'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'sent';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    // TODO: Replace with your email provider (e.g. Resend, EmailJS, Formspree)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 3000);
  };

  const isSent = status === 'sent';
  const isSending = status === 'sending';

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
    </form>
  );
}
