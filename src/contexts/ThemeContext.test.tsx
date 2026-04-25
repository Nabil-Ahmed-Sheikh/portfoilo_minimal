import { act, render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

function TestConsumer() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
    document.documentElement.removeAttribute('data-theme');
  });

  it('provides the default light theme', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('toggles from light to dark', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByText('Toggle').click();
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('toggles from dark back to light', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByText('Set Dark').click();
    });
    await act(async () => {
      screen.getByText('Toggle').click();
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('sets data-theme attribute on documentElement', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByText('Set Dark').click();
    });
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('persists theme to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    await act(async () => {
      screen.getByText('Set Dark').click();
    });
    expect(window.localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('restores theme from localStorage on mount', async () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue('dark');
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    await act(async () => {});
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});
