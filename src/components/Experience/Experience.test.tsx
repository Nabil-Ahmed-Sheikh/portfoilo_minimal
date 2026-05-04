import { render, screen } from '@testing-library/react';
import { Experience } from './Experience';
import type { ExperienceEntry } from '@/types';

const experience: ExperienceEntry[] = [
  {
    id: 'test-co-1',
    company: 'Test Company A',
    role: 'Senior Engineer',
    period: 'Jan 2023 — Present',
    description: 'Built things.',
  },
  {
    id: 'test-co-2',
    company: 'Test Company B',
    role: 'Junior Engineer',
    period: 'Jan 2021 — Dec 2022',
    description: 'Learned things.',
  },
];

describe('Experience', () => {
  it('renders the section label', () => {
    render(<Experience experience={experience} />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders all experience entries', () => {
    render(<Experience experience={experience} />);
    expect(screen.getByText('Test Company A')).toBeInTheDocument();
    expect(screen.getByText('Test Company B')).toBeInTheDocument();
  });

  it('renders roles', () => {
    render(<Experience experience={experience} />);
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Junior Engineer')).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Experience experience={experience} />);
    expect(document.getElementById('experience')).toBeInTheDocument();
  });
});
