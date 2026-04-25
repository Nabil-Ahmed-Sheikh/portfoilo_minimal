import { render, screen } from '@testing-library/react';
import { StackItem } from './StackItem';
import type { StackEntry } from '@/types';

const mockEntry: StackEntry = {
  id: 'react',
  name: 'React',
  type: 'Frontend',
  icon: '⚛',
};

describe('StackItem', () => {
  it('renders the technology name', () => {
    render(<StackItem entry={mockEntry} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the technology type', () => {
    render(<StackItem entry={mockEntry} />);
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('renders the icon with aria-hidden', () => {
    render(<StackItem entry={mockEntry} />);
    const icon = screen.getByText('⚛');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
