import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the copyright notice with the author name', () => {
    render(<Footer />);
    expect(screen.getByText(/Nabil Ahmed/)).toBeInTheDocument();
  });

  it('renders the current year in the copyright', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/Building fast, scalable web apps/)).toBeInTheDocument();
  });
});
