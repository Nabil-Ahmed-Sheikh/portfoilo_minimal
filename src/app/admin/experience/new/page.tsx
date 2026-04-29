import styles from '../../admin.module.css';
import ExperienceForm from '@/components/admin/ExperienceForm/ExperienceForm';

export default function NewExperiencePage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Add Experience</h1>
      <ExperienceForm />
    </>
  );
}
