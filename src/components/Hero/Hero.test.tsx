import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';
import { personal } from '@/data/personal';

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero personal={personal} />);
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders the bio text', () => {
    render(<Hero personal={personal} />);
    expect(screen.getByText(/Building fast, scalable web apps/)).toBeInTheDocument();
  });

  it('renders the View Work CTA with correct href', () => {
    render(<Hero personal={personal} />);
    const link = screen.getByText('View Work ↓');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '#projects');
  });

  it('renders the Get in Touch CTA with correct href', () => {
    render(<Hero personal={personal} />);
    const link = screen.getByText('Get in Touch');
    expect(link.closest('a')).toHaveAttribute('href', '#contact');
  });

  it('renders the profile photo', () => {
    render(<Hero personal={personal} />);
    expect(screen.getByAltText('Profile photo')).toBeInTheDocument();
  });
});
