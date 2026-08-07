import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, shadows } from '@/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline';
}

export function Card({ children, variant = 'default', style, ...props }: CardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'elevated':
        return [styles.card, styles.elevated];
      case 'outline':
        return [styles.card, styles.outline];
      default:
        return [styles.card, styles.default];
    }
  };

  return (
    <View style={[getVariantStyles(), style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: colors.dark.surfaceGlass,
    borderWidth: 1,
    borderColor: colors.dark.borderGlass,
  },
  elevated: {
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: colors.dark.border,
    ...shadows.sm,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.dark.border,
  }
});
