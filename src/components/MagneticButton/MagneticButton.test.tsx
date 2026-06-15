import { render, screen } from '@testing-library/react';
import { MagneticButton } from './MagneticButton';

describe('MagneticButton', () => {
  it('renders its children', () => {
    render(
      <MagneticButton>
        <a href="#test">Click me</a>
      </MagneticButton>,
    );
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('preserves child element href', () => {
    render(
      <MagneticButton>
        <a href="#target">Link</a>
      </MagneticButton>,
    );
    expect(screen.getByText('Link').closest('a')).toHaveAttribute('href', '#target');
  });

  it('renders multiple children', () => {
    render(
      <MagneticButton>
        <button type="button">
          <span>Icon</span>
          <span>Label</span>
        </button>
      </MagneticButton>,
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});
