import { render, screen } from '@testing-library/react';
import { Marquee } from './Marquee';

describe('Marquee', () => {
  it('renders skill items', () => {
    render(<Marquee />);
    const items = screen.getAllByText('React');
    expect(items.length).toBeGreaterThan(0);
  });

  it('renders all unique skills at least once', () => {
    render(<Marquee />);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Node.js').length).toBeGreaterThan(0);
    expect(screen.getAllByText('AWS').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Python').length).toBeGreaterThan(0);
  });

  it('has aria-hidden on the scrolling track', () => {
    render(<Marquee />);
    const track = screen.getAllByText('React')[0].closest('[aria-hidden]');
    expect(track).toHaveAttribute('aria-hidden', 'true');
  });
});
