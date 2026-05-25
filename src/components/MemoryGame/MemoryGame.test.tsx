import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryGame, buildCards } from './MemoryGame';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// ─── buildCards unit tests ────────────────────────────────────────────────────

describe('buildCards', () => {
  it('returns 20 cards with each stackId appearing exactly twice', () => {
    const cards = buildCards();
    expect(cards).toHaveLength(20);
    const counts: Record<string, number> = {};
    cards.forEach(c => { counts[c.stackId] = (counts[c.stackId] ?? 0) + 1; });
    Object.values(counts).forEach(count => expect(count).toBe(2));
  });

  it('assigns unique uids covering 0–19', () => {
    const cards = buildCards();
    const uids = [...new Set(cards.map(c => c.uid))].sort((a, b) => a - b);
    expect(uids).toHaveLength(20);
    expect(uids[0]).toBe(0);
    expect(uids[19]).toBe(19);
  });

  it('all cards start face-down and unmatched', () => {
    const cards = buildCards();
    expect(cards.every(c => !c.flipped && !c.matched)).toBe(true);
  });
});

// ─── MemoryGame component tests ───────────────────────────────────────────────

describe('MemoryGame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('renders title, back link, and Start button in idle; no card grid', () => {
    render(<MemoryGame />);
    expect(screen.getByText('Tech Tycoon')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /games/i })).toHaveAttribute('href', '/play');
    expect(screen.getByRole('button', { name: /start game/i })).toBeInTheDocument();
    expect(document.querySelectorAll('[data-stackid]')).toHaveLength(0);
  });

  it('shows 20 cards and a timer after clicking Start', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });
    expect(document.querySelectorAll('[data-stackid]')).toHaveLength(20);
    expect(screen.getByText('00:00')).toBeInTheDocument();
  });

  it('timer increments during play', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });
    act(() => { jest.advanceTimersByTime(3000); });
    expect(screen.getByText('00:03')).toBeInTheDocument();
  });

  it('clicking the same flipped card a second time does not increment moves', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });
    const card = document.querySelectorAll('[data-stackid]')[0] as HTMLElement;
    fireEvent.click(card);         // first pick — flips card
    fireEvent.click(card);         // same card again — blocked (already flipped)
    expect(screen.getAllByText('0')[0]).toBeInTheDocument(); // moves still 0
  });

  it('two mismatching cards flip back after 900 ms', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });

    const allCards = Array.from(document.querySelectorAll('[data-stackid]')) as HTMLElement[];
    const card1 = allCards[0];
    const mismatch = allCards.find(el => el.dataset.stackid !== card1.dataset.stackid)!;

    fireEvent.click(card1);
    fireEvent.click(mismatch);

    expect(card1.getAttribute('aria-label')).not.toBe('face-down card');
    expect(mismatch.getAttribute('aria-label')).not.toBe('face-down card');

    act(() => { jest.advanceTimersByTime(900); });

    expect(card1.getAttribute('aria-label')).toBe('face-down card');
    expect(mismatch.getAttribute('aria-label')).toBe('face-down card');
  });

  it('locked state blocks a third card click during the 900 ms window', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });

    const allCards = Array.from(document.querySelectorAll('[data-stackid]')) as HTMLElement[];
    const card1 = allCards[0];
    const mismatch = allCards.find(el => el.dataset.stackid !== card1.dataset.stackid)!;
    const thirdCard = allCards.find(el => el !== card1 && el !== mismatch)!;

    fireEvent.click(card1);
    fireEvent.click(mismatch);
    // locked now — third click should be silently ignored
    fireEvent.click(thirdCard);
    expect(thirdCard.getAttribute('aria-label')).toBe('face-down card');
  });

  it('two matching cards stay face-up and appear in the acquired row', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });

    const allCards = Array.from(document.querySelectorAll('[data-stackid]')) as HTMLElement[];
    const card1 = allCards[0];
    const matchingCard = allCards.find(
      el => el !== card1 && el.dataset.stackid === card1.dataset.stackid
    )!;

    fireEvent.click(card1);
    fireEvent.click(matchingCard);

    expect(card1.getAttribute('aria-label')).not.toBe('face-down card');
    expect(matchingCard.getAttribute('aria-label')).not.toBe('face-down card');
    expect(screen.getByText('Acquired · 1 / 10')).toBeInTheDocument();
  });

  it('done screen appears with stats after all pairs are matched', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });

    for (let i = 0; i < 10; i++) {
      const faceDown = Array.from(document.querySelectorAll('[data-stackid]'))
        .filter(el => el.getAttribute('aria-label') === 'face-down card') as HTMLElement[];
      if (faceDown.length === 0) break;
      const first = faceDown[0];
      const match = faceDown.find(el => el !== first && el.dataset.stackid === first.dataset.stackid)!;
      // Fire clicks separately so React flushes firstPick between them
      act(() => { fireEvent.click(first); });
      act(() => { fireEvent.click(match); });
    }

    await waitFor(() => expect(screen.getByText('Efficiency')).toBeInTheDocument());
    expect(screen.getByText('Moves')).toBeInTheDocument();
    expect(screen.getByText('Your Tech Portfolio')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
  });

  it('Play Again starts a fresh game from the done screen', async () => {
    render(<MemoryGame />);
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /start game/i }));
    });

    for (let i = 0; i < 10; i++) {
      const faceDown = Array.from(document.querySelectorAll('[data-stackid]'))
        .filter(el => el.getAttribute('aria-label') === 'face-down card') as HTMLElement[];
      if (faceDown.length === 0) break;
      const first = faceDown[0];
      const match = faceDown.find(el => el !== first && el.dataset.stackid === first.dataset.stackid)!;
      act(() => { fireEvent.click(first); });
      act(() => { fireEvent.click(match); });
    }

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument()
    );

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /play again/i }));
    });

    expect(document.querySelectorAll('[data-stackid]')).toHaveLength(20);
    expect(screen.queryByText('Your Tech Portfolio')).not.toBeInTheDocument();
  });
});
