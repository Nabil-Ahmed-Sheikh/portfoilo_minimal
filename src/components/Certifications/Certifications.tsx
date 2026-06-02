import { FadeIn } from '@/components/FadeIn';
import { SectionLabel } from '@/components/SectionLabel';
import type { Certification } from '@/types';
import styles from './Certifications.module.css';

interface CertificationsProps {
  certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
  return (
    <section id="certifications" className={styles.section}>
      <FadeIn>
        <SectionLabel>Certifications</SectionLabel>
      </FadeIn>
      <FadeIn delay={100}>
        <div className={styles.grid}>
          {certifications.map((cert) => {
            const inner = (
              <div className={styles.card}>
                <div className={styles.iconWrap} aria-hidden="true">
                  {cert.icon}
                </div>
                <div className={styles.body}>
                  <span className={styles.name}>{cert.name}</span>
                  <div className={styles.meta}>
                    <span className={styles.issuer}>{cert.issuer}</span>
                    <span className={styles.dot} aria-hidden="true">·</span>
                    <span className={styles.category}>{cert.category}</span>
                  </div>
                </div>
                <span className={styles.badge}>Certified</span>
              </div>
            );

            return cert.credentialUrl ? (
              <a
                key={cert.id}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
                aria-label={`${cert.name} credential`}
              >
                {inner}
              </a>
            ) : (
              <div key={cert.id} className={styles.cardLink}>
                {inner}
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
