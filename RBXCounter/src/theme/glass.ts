import { colors } from './colors';
import { ViewStyle } from 'react-native';

export const glassStyles = {
  container: {
    backgroundColor: colors.dark.surfaceGlass,
    borderColor: colors.dark.borderGlass,
    borderWidth: 1,
    borderRadius: 16, // Reduced to 16px for minimal look
    overflow: 'hidden',
  } as ViewStyle,
  blurIntensity: 15, // Reduced from 30 for subtle blur
};
