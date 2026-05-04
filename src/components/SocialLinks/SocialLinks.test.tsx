import { render, screen } from '@testing-library/react';
import { SocialLinks } from './SocialLinks';
import type { SocialLink } from '@/types';

const socialLinks: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    display: 'github.com/test-user',
    href: 'https://github.com/test-user',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    display: 'linkedin.com/in/test-user',
    href: 'https://www.linkedin.com/in/test-user/',
  },
  {
    id: 'email',
    label: 'Email',
    display: 'test@example.com',
    href: 'mailto:test@example.com',
  },
];

describe('SocialLinks', () => {
  it('renders all social link labels', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders all social link display text', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    expect(screen.getByText('github.com/test-user')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/test-user')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('links to correct hrefs', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/test-user');
    expect(hrefs).toContain('https://www.linkedin.com/in/test-user/');
    expect(hrefs).toContain('mailto:test@example.com');
  });

  it('external links open in new tab', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    const githubLink = screen.getByText('github.com/test-user').closest('a');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('email link does not open in new tab', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    const emailLink = screen.getByText('test@example.com').closest('a');
    expect(emailLink).not.toHaveAttribute('target', '_blank');
  });
});
