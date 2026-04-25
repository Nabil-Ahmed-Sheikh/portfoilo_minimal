import { render, screen } from '@testing-library/react';
import { Contact } from './Contact';
import { socialLinks } from '@/data/personal';

describe('Contact', () => {
  it('renders the section label', () => {
    render(<Contact socialLinks={socialLinks} />);
    expect(screen.getByText("Let's Work Together")).toBeInTheDocument();
  });

  it('renders the heading', () => {
    render(<Contact socialLinks={socialLinks} />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByText('mind?')).toBeInTheDocument();
  });

  it('renders the subtext', () => {
    render(<Contact socialLinks={socialLinks} />);
    expect(screen.getByText(/Open to interesting engineering roles/)).toBeInTheDocument();
  });

  it('renders social links', () => {
    render(<Contact socialLinks={socialLinks} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    // 'Email' appears in both social links label and form label — verify at least one exists
    expect(screen.getAllByText('Email').length).toBeGreaterThan(0);
  });

  it('renders the contact form', () => {
    render(<Contact socialLinks={socialLinks} />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
  });

  it('has the correct section id', () => {
    render(<Contact socialLinks={socialLinks} />);
    expect(document.getElementById('contact')).toBeInTheDocument();
  });
});
