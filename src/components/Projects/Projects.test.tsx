import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';
import { projects } from '@/data/projects';

describe('Projects', () => {
  it('renders the section label', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  });

  it('renders all project cards', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText('Sidetrek')).toBeInTheDocument();
    expect(screen.getByText('Cloud Infrastructure')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<Projects projects={projects} />);
    expect(screen.getByText(/Make your data pipeline/)).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Projects projects={projects} />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });
});
