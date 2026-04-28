import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, className, 'aria-label': ariaLabel }: {
    children?: React.ReactNode;
    href: string;
    className?: string;
    'aria-label'?: string;
  }) => <a href={href} className={className} aria-label={ariaLabel}>{children}</a>,
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  tag: 'Frontend · React',
  description: 'A great test project description.',
  href: 'https://example.com',
  arrowLabel: 'View →',
};

describe('ProjectCard', () => {
  it('renders the project title', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders the project tag', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('Frontend · React')).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('A great test project description.')).toBeInTheDocument();
  });

  it('renders the arrow label as external link', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('View →')).toBeInTheDocument();
    const externalLink = screen.getByText('View →').closest('a');
    expect(externalLink).toHaveAttribute('href', 'https://example.com');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('links to the project detail page', () => {
    render(<ProjectCard project={mockProject} />);
    const detailLink = screen.getByRole('link', { name: /View Test Project details/i });
    expect(detailLink).toHaveAttribute('href', '/projects/test-project');
  });

  it('renders the subtitle when provided', () => {
    const project = { ...mockProject, subtitle: '@ Company' };
    render(<ProjectCard project={project} />);
    expect(screen.getByText('@ Company')).toBeInTheDocument();
  });

  it('does not render arrow label when not provided', () => {
    const project = { ...mockProject, arrowLabel: undefined };
    render(<ProjectCard project={project} />);
    expect(screen.queryByText('View →')).not.toBeInTheDocument();
  });
});
