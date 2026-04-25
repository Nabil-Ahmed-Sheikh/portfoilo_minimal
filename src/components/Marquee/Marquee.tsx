import styles from './Marquee.module.css';

const skills = [
  'React',
  'TypeScript',
  'Node.js',
  'AWS',
  'Python',
  'Cloud Engineering',
  'Scalable Systems',
  'Data Pipelines',
];

export function Marquee() {
  const doubled = [...skills, ...skills];

  return (
    <div className={styles.wrap}>
      <div className={styles.track} aria-hidden="true">
        {doubled.map((skill, i) => (
          <span key={i} className={styles.item}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
