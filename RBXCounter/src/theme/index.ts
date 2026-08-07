import { Platform } from 'react-native';
import { colors, ThemeColors } from './colors';
import { spacing, radius } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';
import { glassStyles } from './glass';
import { animations } from './animations';

export { colors, spacing, radius, typography, shadows, glassStyles, animations };

export interface Theme {
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  shadows: typeof shadows;
  glass: typeof glassStyles;
  animations: typeof animations;
  isDark: boolean;
  gradients: typeof colors.gradients;
}

export const darkTheme: Theme = {
  colors: colors.dark,
  spacing,
  radius,
  typography,
  shadows,
  glass: glassStyles,
  animations,
  isDark: true,
  gradients: colors.gradients,
};

// We enforce dark theme
export const lightTheme: Theme = darkTheme;



// Backward compatibility aliases
export const Colors = colors;
export const Spacing = spacing;
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});
export type ThemeColor = Exclude<keyof typeof colors.dark, 'gradientBg'>;
