import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from './Nav';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { personal } from '@/data/personal';

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
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    expect(screen.getByText('Nabil Ahmed')).toBeInTheDocument();
  });

  it('logo links to /', () => {
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    const logo = screen.getByText('Nabil Ahmed').closest('a');
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders all navigation links in the desktop nav', () => {
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    // Each link appears in both desktop nav and mobile drawer — check at least one exists
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Experience').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Stack').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('navigation links have correct hrefs', () => {
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    const projectLinks = screen.getAllByText('Projects').map((el) => el.closest('a'));
    expect(projectLinks.some((a) => a?.getAttribute('href') === '/#projects')).toBe(true);
    const experienceLinks = screen.getAllByText('Experience').map((el) => el.closest('a'));
    expect(experienceLinks.some((a) => a?.getAttribute('href') === '/#experience')).toBe(true);
  });

  it('renders the theme toggle button', () => {
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /switch to (dark|light) mode/i })).toBeInTheDocument();
  });

  it('renders the hamburger menu button', () => {
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('opens the mobile drawer when hamburger is clicked', () => {
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    const burger = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(burger);
    expect(burger).toHaveAttribute('aria-expanded', 'true');
    expect(burger).toHaveAttribute('aria-label', 'Close menu');
  });

  it('renders a resume download link', () => {
    render(<Nav personal={personal} />, { wrapper: Wrapper });
    const resumeLinks = screen.getAllByText(/Resume/i).map((el) => el.closest('a'));
    expect(resumeLinks.some((a) => a?.getAttribute('href') === '/resume.pdf')).toBe(true);
    expect(resumeLinks.some((a) => a?.hasAttribute('download'))).toBe(true);
  });
});
