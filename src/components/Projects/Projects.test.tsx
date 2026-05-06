import { render, screen, fireEvent } from '@testing-library/react';
import { Projects } from './Projects';
import type { Project } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const projects: Project[] = [
  {
    id: 'proj-alpha',
    title: 'Project Alpha',
    tag: 'Open Source · Backend',
    description: 'A test project for rendering verification.',
    href: 'https://github.com/test/alpha',
  },
  {
    id: 'proj-beta',
    title: 'Project Beta',
    tag: 'Web · Frontend',
    description: 'Another test project with different content.',
    href: 'https://github.com/test/beta',
  },
];

describe('Projects', () => {
  it('renders the section label', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  });

  it('renders all project cards by default', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText('A test project for rendering verification.')).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Projects projects={projects} />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });

  it('renders filter chips for All and each unique tag', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open Source' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Backend' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Web' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Frontend' })).toBeInTheDocument();
  });

  it('filters to matching projects when a tag chip is clicked', () => {
    render(<Projects projects={projects} />);
    fireEvent.click(screen.getByRole('button', { name: 'Open Source' }));
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.queryByText('Project Beta')).not.toBeInTheDocument();
  });

  it('restores all projects when All chip is clicked after filtering', () => {
    render(<Projects projects={projects} />);
    fireEvent.click(screen.getByRole('button', { name: 'Backend' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Project Alpha')).toBeInTheDocument();
    expect(screen.getByText('Project Beta')).toBeInTheDocument();
  });

  it('marks the active chip with aria-pressed', () => {
    render(<Projects projects={projects} />);
    const allChip = screen.getByRole('button', { name: 'All' });
    expect(allChip).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Web' }));
    expect(allChip).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Web' })).toHaveAttribute('aria-pressed', 'true');
  });
});
