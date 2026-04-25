import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';

describe('Experience', () => {
  it('renders the section label', () => {
    render(<Experience />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders all experience entries', () => {
    render(<Experience />);
    expect(screen.getByText('SideTrek')).toBeInTheDocument();
    expect(screen.getByText('Flex Connect')).toBeInTheDocument();
  });

  it('renders roles', () => {
    render(<Experience />);
    expect(screen.getByText('Cloud Engineer I')).toBeInTheDocument();
    expect(screen.getByText('Data Visualization Intern')).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Experience />);
    expect(document.getElementById('experience')).toBeInTheDocument();
  });
});
