import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { personal } from '@/data/personal';

describe('Footer', () => {
  it('renders the copyright notice with the author name', () => {
    render(<Footer personal={personal} />);
    expect(screen.getByText(/Nabil Ahmed/)).toBeInTheDocument();
  });

  it('renders the current year in the copyright', () => {
    render(<Footer personal={personal} />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Footer personal={personal} />);
    expect(screen.getByText(/Building fast, scalable web apps/)).toBeInTheDocument();
  });
});
