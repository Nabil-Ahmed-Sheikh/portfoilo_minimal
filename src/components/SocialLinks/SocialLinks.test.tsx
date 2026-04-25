import { render, screen } from '@testing-library/react';
import { SocialLinks } from './SocialLinks';
import { socialLinks } from '@/data/personal';

describe('SocialLinks', () => {
  it('renders all social link labels', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders all social link display text', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    expect(screen.getByText('github.com/Nabil-Ahmed-Sheikh')).toBeInTheDocument();
    expect(screen.getByText('linkedin.com/in/nabil-ahmed11')).toBeInTheDocument();
    expect(screen.getByText('nabilahmed.cloud@gmail.com')).toBeInTheDocument();
  });

  it('links to correct hrefs', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/Nabil-Ahmed-Sheikh');
    expect(hrefs).toContain('https://www.linkedin.com/in/nabil-ahmed11/');
    expect(hrefs).toContain('mailto:nabilahmed.cloud@gmail.com');
  });

  it('external links open in new tab', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    const githubLink = screen.getByText('github.com/Nabil-Ahmed-Sheikh').closest('a');
    expect(githubLink).toHaveAttribute('target', '_blank');
  });

  it('email link does not open in new tab', () => {
    render(<SocialLinks socialLinks={socialLinks} />);
    const emailLink = screen.getByText('nabilahmed.cloud@gmail.com').closest('a');
    expect(emailLink).not.toHaveAttribute('target', '_blank');
  });
});
