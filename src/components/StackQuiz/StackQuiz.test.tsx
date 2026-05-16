import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { StackQuiz } from './StackQuiz';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// projects data is used inside StackQuiz — no need to mock it

describe('StackQuiz', () => {
  it('renders title and subtitle', async () => {
    render(<StackQuiz />);
    expect(screen.getByText('Stack Smash')).toBeInTheDocument();
    expect(screen.getByText('Which project used this technology?')).toBeInTheDocument();
  });

  it('shows the three project options after loading', async () => {
    render(<StackQuiz />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Sidetrek' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'myHealth' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Power System Forecasting' })).toBeInTheDocument();
    });
  });

  it('shows feedback after selecting an answer', async () => {
    render(<StackQuiz />);
    await waitFor(() => screen.getByRole('button', { name: 'Sidetrek' }));
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByRole('button', { name: /next|see results/i })).toBeInTheDocument();
  });

  it('buttons are disabled in feedback phase', async () => {
    render(<StackQuiz />);
    await waitFor(() => screen.getByRole('button', { name: 'Sidetrek' }));
    const options = screen.getAllByRole('button').slice(0, 3);
    fireEvent.click(options[0]);
    options.forEach(btn => expect(btn).toBeDisabled());
  });

  it('advances to next question on Next click', async () => {
    render(<StackQuiz />);
    await waitFor(() => screen.getByRole('button', { name: 'Sidetrek' }));

    const firstTech = screen.getByText((_, el) => el?.className?.includes('techName') ?? false)?.textContent;
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getByRole('button', { name: /next/i }));

    const nextTech = screen.getByText((_, el) => el?.className?.includes('techName') ?? false)?.textContent;
    expect(nextTech).not.toBe(firstTech);
  });

  it('shows results screen after completing all questions', async () => {
    render(<StackQuiz />);
    await waitFor(() => screen.getByRole('button', { name: 'Sidetrek' }));

    for (let i = 0; i < 10; i++) {
      const buttons = screen.getAllByRole('button').filter(b =>
        ['Sidetrek', 'myHealth', 'Power System Forecasting'].includes(b.textContent ?? '')
      );
      fireEvent.click(buttons[0]);

      const nextBtn = screen.queryByRole('button', { name: /see results/i });
      if (nextBtn) {
        fireEvent.click(nextBtn);
        break;
      }
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
    }

    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
  });

  it('resets to question phase on Play Again', async () => {
    render(<StackQuiz />);
    await waitFor(() => screen.getByRole('button', { name: 'Sidetrek' }));

    for (let i = 0; i < 10; i++) {
      const options = screen.getAllByRole('button').filter(b =>
        ['Sidetrek', 'myHealth', 'Power System Forecasting'].includes(b.textContent ?? '')
      );
      fireEvent.click(options[0]);
      const seeResults = screen.queryByRole('button', { name: /see results/i });
      if (seeResults) { fireEvent.click(seeResults); break; }
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
    }

    fireEvent.click(screen.getByRole('button', { name: /play again/i }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Sidetrek' })).toBeInTheDocument()
    );
  });

  it('renders the back link to games hub', () => {
    render(<StackQuiz />);
    expect(screen.getByRole('link', { name: /games/i })).toHaveAttribute('href', '/play');
  });

  it('advances on Enter key during feedback', async () => {
    render(<StackQuiz />);
    await waitFor(() => screen.getByRole('button', { name: 'Sidetrek' }));

    const firstTech = screen.getByText((_, el) => el?.className?.includes('techName') ?? false)?.textContent;
    fireEvent.click(screen.getAllByRole('button')[0]);
    act(() => { fireEvent.keyDown(window, { key: 'Enter' }); });

    const nextTech = screen.getByText((_, el) => el?.className?.includes('techName') ?? false)?.textContent;
    expect(nextTech).not.toBe(firstTech);
  });
});
