import { render, screen } from '@testing-library/react';
import { SectionLabel } from './SectionLabel';

describe('SectionLabel', () => {
  it('renders children text', () => {
    render(<SectionLabel>Recent Projects</SectionLabel>);
    expect(screen.getByText('Recent Projects')).toBeInTheDocument();
  });

  it('applies the label class', () => {
    render(<SectionLabel>Tech Stack</SectionLabel>);
    const el = screen.getByText('Tech Stack');
    expect(el.tagName).toBe('P');
  });
});
