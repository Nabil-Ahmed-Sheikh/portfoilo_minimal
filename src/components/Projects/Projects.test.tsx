import { render, screen } from '@testing-library/react';
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

  it('renders all project cards', () => {
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
});
