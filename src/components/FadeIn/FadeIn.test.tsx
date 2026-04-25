import { render, screen } from '@testing-library/react';
import { FadeIn } from './FadeIn';

describe('FadeIn', () => {
  it('renders its children', () => {
    render(
      <FadeIn>
        <p>Hello world</p>
      </FadeIn>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('starts without visible class', () => {
    const { container } = render(
      <FadeIn>
        <span>content</span>
      </FadeIn>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).not.toMatch(/visible/);
  });

  it('applies an optional extra className', () => {
    const { container } = render(
      <FadeIn className="extra">
        <span>content</span>
      </FadeIn>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toMatch(/extra/);
  });

  it('applies transition-delay style when delay is provided', () => {
    const { container } = render(
      <FadeIn delay={200}>
        <span>content</span>
      </FadeIn>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.transitionDelay).toBe('200ms');
  });

  it('calls IntersectionObserver observe on mount', () => {
    render(
      <FadeIn>
        <span>content</span>
      </FadeIn>
    );
    expect(global.IntersectionObserver).toHaveBeenCalled();
  });
});
