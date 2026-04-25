import { render, screen } from '@testing-library/react';
import { Projects } from './Projects';

describe('Projects', () => {
  it('renders the section label', () => {
    render(<Projects />);
    expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  });

  it('renders all project cards', () => {
    render(<Projects />);
    expect(screen.getByText('Sidetrek')).toBeInTheDocument();
    expect(screen.getByText('Cloud Infrastructure')).toBeInTheDocument();
  });

  it('renders project descriptions', () => {
    render(<Projects />);
    expect(screen.getByText(/Make your data pipeline/)).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Projects />);
    expect(document.getElementById('projects')).toBeInTheDocument();
  });
});
