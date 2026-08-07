import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeProvider';

interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export const GlassCard = ({
  children,
  intensity = 50,
  tint = 'default',
  style,
  ...props
}: GlassCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { borderRadius: theme.radius.xl }, style]} {...props}>
      <BlurView
        intensity={intensity}
        tint={tint === 'default' ? (theme.isDark ? 'dark' : 'light') : tint}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: theme.colors.surfaceGlass,
            borderColor: theme.colors.borderGlass,
            borderRadius: theme.radius.xl,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    borderWidth: 1,
    padding: 24,
  },
});
