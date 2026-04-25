import { FadeIn } from '@/components/FadeIn';
import { SectionLabel } from '@/components/SectionLabel';
import { SocialLinks } from '@/components/SocialLinks';
import { ContactForm } from '@/components/ContactForm';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <FadeIn>
        <SectionLabel>Let&apos;s Work Together</SectionLabel>
      </FadeIn>
      <div className={styles.grid}>
        <FadeIn>
          <h2 className={styles.heading}>
            Got a project
            <br />
            in <em className={styles.em}>mind?</em>
          </h2>
          <p className={styles.sub}>
            Open to interesting engineering roles, freelance projects, and collaborations. Drop me a
            line and let&apos;s build something great.
          </p>
          <SocialLinks />
        </FadeIn>
        <FadeIn delay={150}>
          <ContactForm />
        </FadeIn>
      </div>
    </section>
  );
}
