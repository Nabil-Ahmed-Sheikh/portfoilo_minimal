import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import type { PersonalInfo } from '@/types';

const personal: PersonalInfo = {
  name: 'Test User',
  tagline: 'Full-Stack & Cloud Engineer',
  bio: 'Test bio.',
  email: 'test@example.com',
};

describe('Footer', () => {
  it('renders the copyright notice with the author name', () => {
    render(<Footer personal={personal} />);
    expect(screen.getByText(/Test User/)).toBeInTheDocument();
  });

  it('renders the current year in the copyright', () => {
    render(<Footer personal={personal} />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Footer personal={personal} />);
    expect(screen.getByText(/Full-Stack & Cloud Engineer/)).toBeInTheDocument();
  });
});
