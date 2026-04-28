import { render, screen } from '@testing-library/react';
import { FadeIn } from './FadeIn';
import gsap from 'gsap';

describe('FadeIn', () => {
  it('renders its children', () => {
    render(
      <FadeIn>
        <p>Hello world</p>
      </FadeIn>
    );
    expect(screen.getByText('Hello world')).toBeInTheDocument();
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

  it('triggers a gsap animation on mount', () => {
    render(
      <FadeIn>
        <span>content</span>
      </FadeIn>
    );
    expect((gsap as unknown as { to: jest.Mock }).to).toHaveBeenCalled();
  });

  it('passes delay to gsap as seconds', () => {
    render(
      <FadeIn delay={400}>
        <span>content</span>
      </FadeIn>
    );
    const toMock = (gsap as unknown as { to: jest.Mock }).to;
    const callArgs = toMock.mock.calls[toMock.mock.calls.length - 1];
    expect(callArgs[1]).toMatchObject({ delay: 0.4 });
  });
});
