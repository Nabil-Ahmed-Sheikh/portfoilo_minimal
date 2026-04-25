import { render, screen } from '@testing-library/react';
import { TechStack } from './TechStack';
import { stack } from '@/data/stack';

describe('TechStack', () => {
  it('renders the section label', () => {
    render(<TechStack stack={stack} />);
    expect(screen.getByText('Tech Stack')).toBeInTheDocument();
  });

  it('renders all stack items', () => {
    render(<TechStack stack={stack} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('renders technology types', () => {
    render(<TechStack stack={stack} />);
    expect(screen.getAllByText('Frontend').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Language').length).toBeGreaterThan(0);
    expect(screen.getAllByText('DevOps').length).toBeGreaterThan(0);
  });

  it('has the correct section id', () => {
    render(<TechStack stack={stack} />);
    expect(document.getElementById('stack')).toBeInTheDocument();
  });
});
