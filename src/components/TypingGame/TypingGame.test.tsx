import { render, screen, fireEvent, act } from '@testing-library/react';
import { TypingGame } from './TypingGame';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('TypingGame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the title and start button', () => {
    render(<TypingGame />);
    expect(screen.getByText('Type the Stack')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('renders the stats row with initial values', () => {
    render(<TypingGame />);
    expect(screen.getByText('wpm')).toBeInTheDocument();
    expect(screen.getByText('sec')).toBeInTheDocument();
    expect(screen.getByText('accuracy')).toBeInTheDocument();
  });

  it('shows the word area and input after clicking start', () => {
    render(<TypingGame />);
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
  });

  it('counts down the timer after starting', () => {
    render(<TypingGame />);
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    expect(screen.getByText('30')).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('27')).toBeInTheDocument();
  });

  it('shows results screen when timer reaches zero', () => {
    render(<TypingGame />);
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => { jest.advanceTimersByTime(30000); });
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByText('WPM')).toBeInTheDocument();
    expect(screen.getByText('Accuracy')).toBeInTheDocument();
  });

  it('resets to idle when Try Again is clicked', () => {
    render(<TypingGame />);
    fireEvent.click(screen.getByRole('button', { name: /start/i }));
    act(() => { jest.advanceTimersByTime(30000); });
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('renders the back link to games hub', () => {
    render(<TypingGame />);
    expect(screen.getByRole('link', { name: /games/i })).toHaveAttribute('href', '/play');
  });
});
