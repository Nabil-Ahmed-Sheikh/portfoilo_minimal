import styles from '../../admin.module.css';
import StackForm from '@/components/admin/StackForm/StackForm';

export default function NewStackPage() {
  return (
    <>
      <h1 className={styles.pageTitle}>Add Tech Stack Item</h1>
      <StackForm />
    </>
  );
}
