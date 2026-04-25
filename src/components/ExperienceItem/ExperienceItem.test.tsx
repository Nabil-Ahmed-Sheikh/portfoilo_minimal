import { render, screen } from '@testing-library/react';
import { ExperienceItem } from './ExperienceItem';
import type { ExperienceEntry } from '@/types';

const mockEntry: ExperienceEntry = {
  id: 'test',
  company: 'Acme Corp',
  role: 'Senior Engineer',
  period: '2022 — Present',
  description: 'Built great things at Acme.',
};

describe('ExperienceItem', () => {
  it('renders the company name', () => {
    render(<ExperienceItem entry={mockEntry} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders the role', () => {
    render(<ExperienceItem entry={mockEntry} />);
    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
  });

  it('renders the time period', () => {
    render(<ExperienceItem entry={mockEntry} />);
    expect(screen.getByText('2022 — Present')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<ExperienceItem entry={mockEntry} />);
    expect(screen.getByText('Built great things at Acme.')).toBeInTheDocument();
  });

  it('renders period as a time element', () => {
    render(<ExperienceItem entry={mockEntry} />);
    const timeEl = screen.getByText('2022 — Present');
    expect(timeEl.tagName).toBe('TIME');
  });
});
