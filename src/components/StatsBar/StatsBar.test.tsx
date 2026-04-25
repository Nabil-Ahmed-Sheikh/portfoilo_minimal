import { render, screen } from '@testing-library/react';
import { StatsBar } from './StatsBar';

describe('StatsBar', () => {
  it('renders all three stats', () => {
    render(<StatsBar />);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders stat prefix symbols', () => {
    render(<StatsBar />);
    const plusSigns = screen.getAllByText('+');
    expect(plusSigns).toHaveLength(2);
  });

  it('renders stat labels', () => {
    render(<StatsBar />);
    expect(screen.getByText(/Years of/i)).toBeInTheDocument();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Companies/i)).toBeInTheDocument();
  });
});
