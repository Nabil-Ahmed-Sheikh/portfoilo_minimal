import Link from 'next/link';
import { fetchPortfolio } from '@/lib/portfolio';
import DeleteButton from '../DeleteButton';
import styles from '../admin.module.css';
import tableStyles from '../table.module.css';

export default async function AdminProjectsPage() {
  const data = await fetchPortfolio();
  const { projects } = data;

  return (
    <>
      <h1 className={styles.pageTitle}>Projects</h1>
      <div className={tableStyles.toolbar}>
        <span style={{ color: '#666', fontSize: '0.85rem' }}>{projects.length} projects</span>
        <Link href="/admin/projects/new" className={tableStyles.addBtn}>
          + Add Project
        </Link>
      </div>
      {projects.length === 0 ? (
        <div className={tableStyles.empty}>No projects yet. Add your first project.</div>
      ) : (
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Tag</th>
              <th>Year</th>
              <th>Media</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <strong>{project.title}</strong>
                  {project.subtitle && (
                    <span style={{ color: '#999', fontSize: '0.8rem', display: 'block' }}>
                      {project.subtitle}
                    </span>
                  )}
                </td>
                <td>{project.tag}</td>
                <td>{project.year || '—'}</td>
                <td>
                  {project.coverImage ? '🖼 Cover' : ''}
                  {project.images?.length ? ` +${project.images.length} img` : ''}
                  {project.videoUrl ? ' 🎥' : ''}
                  {!project.coverImage && !project.images?.length && !project.videoUrl ? '—' : ''}
                </td>
                <td>
                  <div className={tableStyles.actions}>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className={tableStyles.editBtn}
                    >
                      Edit
                    </Link>
                    <DeleteButton endpoint={`/api/admin/projects/${project.id}`} />
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
