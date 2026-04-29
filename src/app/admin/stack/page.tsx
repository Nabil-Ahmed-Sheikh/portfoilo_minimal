import Link from 'next/link';
import { fetchPortfolio } from '@/lib/portfolio';
import DeleteButton from '../DeleteButton';
import styles from '../admin.module.css';
import tableStyles from '../table.module.css';

export default async function AdminStackPage() {
  const data = await fetchPortfolio();
  const { stack } = data;

  return (
    <>
      <h1 className={styles.pageTitle}>Tech Stack</h1>
      <div className={tableStyles.toolbar}>
        <span style={{ color: '#666', fontSize: '0.85rem' }}>{stack.length} items</span>
        <Link href="/admin/stack/new" className={tableStyles.addBtn}>
          + Add Tech
        </Link>
      </div>
      {stack.length === 0 ? (
        <div className={tableStyles.empty}>No stack items yet.</div>
      ) : (
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stack.map((item) => (
              <tr key={item.id}>
                <td style={{ fontSize: '1.4rem' }}>{item.icon}</td>
                <td>{item.name}</td>
                <td>{item.type}</td>
                <td>
                  <div className={tableStyles.actions}>
                    <Link href={`/admin/stack/${item.id}/edit`} className={tableStyles.editBtn}>
                      Edit
                    </Link>
                    <DeleteButton endpoint={`/api/admin/stack/${item.id}`} />
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
