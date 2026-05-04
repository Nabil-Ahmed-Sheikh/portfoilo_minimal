import { render, screen } from '@testing-library/react';
import { StatsBar } from './StatsBar';
import type { Stat } from '@/types';

const stats: Stat[] = [
  { id: 'years', value: '5', prefix: '+', label: 'Years of\nExperience' },
  { id: 'projects', value: '10', prefix: '+', label: 'Projects\nCompleted' },
  { id: 'companies', value: '4', label: 'Companies\nWorked At' },
];

describe('StatsBar', () => {
  it('renders all stat values', () => {
    render(<StatsBar stats={stats} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('renders stat prefix symbols', () => {
    render(<StatsBar stats={stats} />);
    const plusSigns = screen.getAllByText('+');
    expect(plusSigns).toHaveLength(2);
  });

  it('renders stat labels', () => {
    render(<StatsBar stats={stats} />);
    expect(screen.getByText(/Years of/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Companies/i)).toBeInTheDocument();
  });
});
