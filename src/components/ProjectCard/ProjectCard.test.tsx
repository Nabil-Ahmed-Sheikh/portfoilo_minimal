import { render, screen } from '@testing-library/react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/types';

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

  it('renders the arrow label', () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText('View →')).toBeInTheDocument();
  });

  it('links to the correct href', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('opens in a new tab', () => {
    render(<ProjectCard project={mockProject} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
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
