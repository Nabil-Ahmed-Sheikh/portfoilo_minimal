export type ThemeKey = 'light' | 'dark';

export interface ThemeDefinition {
  key: ThemeKey;
  label: string;
  cssVars: Record<string, string>;
}

export const themes: Record<ThemeKey, ThemeDefinition> = {
  light: {
    key: 'light',
    label: 'Light',
    cssVars: {
      '--bg': 'oklch(97% 0.008 60)',
      '--bg2': 'oklch(94% 0.010 60)',
      '--ink': 'oklch(14% 0.012 60)',
      '--ink2': 'oklch(45% 0.010 60)',
      '--accent': 'oklch(52% 0.11 160)',
      '--accent-light': 'oklch(90% 0.06 160)',
      '--line': 'oklch(88% 0.010 60)',
    },
  },
  dark: {
    key: 'dark',
    label: 'Dark',
    cssVars: {
      '--bg': 'oklch(12% 0.008 60)',
      '--bg2': 'oklch(17% 0.008 60)',
      '--ink': 'oklch(92% 0.005 60)',
      '--ink2': 'oklch(60% 0.006 60)',
      '--accent': 'oklch(52% 0.11 160)',
      '--accent-light': 'oklch(25% 0.06 160)',
      '--line': 'oklch(25% 0.008 60)',
    },
  },
};

export const defaultTheme: ThemeKey = 'light';

export const themeKeys = Object.keys(themes) as ThemeKey[];
