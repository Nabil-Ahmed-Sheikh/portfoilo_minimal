import Link from 'next/link';
import { fetchPortfolio } from '@/lib/portfolio';
import DeleteButton from '../DeleteButton';
import styles from '../admin.module.css';
import tableStyles from '../table.module.css';

export default async function AdminExperiencePage() {
  const data = await fetchPortfolio();
  const { experience } = data;

  return (
    <>
      <h1 className={styles.pageTitle}>Experience</h1>
      <div className={tableStyles.toolbar}>
        <span style={{ color: '#666', fontSize: '0.85rem' }}>{experience.length} entries</span>
        <Link href="/admin/experience/new" className={tableStyles.addBtn}>
          + Add Experience
        </Link>
      </div>
      {experience.length === 0 ? (
        <div className={tableStyles.empty}>No experience entries yet.</div>
      ) : (
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Period</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experience.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.company}</td>
                <td>{entry.role}</td>
                <td>{entry.period}</td>
                <td>
                  <div className={tableStyles.actions}>
                    <Link
                      href={`/admin/experience/${entry.id}/edit`}
                      className={tableStyles.editBtn}
                    >
                      Edit
                    </Link>
                    <DeleteButton endpoint={`/api/admin/experience/${entry.id}`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
