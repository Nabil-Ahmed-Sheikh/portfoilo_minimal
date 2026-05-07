const mockTween = { kill: jest.fn() };
const mockTimeline = {
  from: jest.fn().mockReturnThis(),
  to: jest.fn().mockReturnThis(),
  kill: jest.fn(),
};

const gsap = {
  from: jest.fn(() => mockTween),
  to: jest.fn((_target: unknown, vars: { onComplete?: () => void } = {}) => {
    vars?.onComplete?.();
    return mockTween;
  }),
  fromTo: jest.fn(() => mockTween),
  set: jest.fn(),
  timeline: jest.fn(() => mockTimeline),
  registerPlugin: jest.fn(),
  killTweensOf: jest.fn(),
  context: jest.fn((fn: () => void) => {
    fn?.();
    return { revert: jest.fn() };
  }),
  utils: {
    unitize: jest.fn((fn: (x: number) => number) => fn),
  },
};

export default gsap;
