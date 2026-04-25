import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('ThemeToggle', () => {
  beforeEach(() => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
  });

  it('renders a button', () => {
    render(<ThemeToggle />, { wrapper: Wrapper });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows moon icon in light mode', () => {
    render(<ThemeToggle />, { wrapper: Wrapper });
    expect(screen.getByRole('button')).toHaveTextContent('☽');
  });

  it('has correct aria-label in light mode', () => {
    render(<ThemeToggle />, { wrapper: Wrapper });
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('toggles theme on click', async () => {
    render(<ThemeToggle />, { wrapper: Wrapper });
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(btn).toHaveTextContent('☀');
    expect(btn).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});
