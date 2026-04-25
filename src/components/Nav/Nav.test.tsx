import { render, screen } from '@testing-library/react';
import { Nav } from './Nav';
import { ThemeProvider } from '@/contexts/ThemeContext';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

function Wrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('Nav', () => {
  beforeEach(() => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);
  });

  it('renders the logo with the correct name', () => {
    render(<Nav />, { wrapper: Wrapper });
    expect(screen.getByText('Nabil Ahmed')).toBeInTheDocument();
  });

  it('logo links to /', () => {
    render(<Nav />, { wrapper: Wrapper });
    const logo = screen.getByText('Nabil Ahmed').closest('a');
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    render(<Nav />, { wrapper: Wrapper });
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Stack')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('navigation links have correct hrefs', () => {
    render(<Nav />, { wrapper: Wrapper });
    expect(screen.getByText('Projects').closest('a')).toHaveAttribute('href', '#projects');
    expect(screen.getByText('Experience').closest('a')).toHaveAttribute('href', '#experience');
    expect(screen.getByText('Stack').closest('a')).toHaveAttribute('href', '#stack');
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact');
  });

  it('renders the theme toggle button', () => {
    render(<Nav />, { wrapper: Wrapper });
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
