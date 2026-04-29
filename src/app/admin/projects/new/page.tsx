import styles from '../../admin.module.css';
import ProjectForm from '@/components/admin/ProjectForm/ProjectForm';

export default function NewProjectPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Add Project</h1>
      <ProjectForm />
    </>
  );
}
