import React from 'react';
import { StyleSheet, Text, Pressable, PressableProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../theme/ThemeProvider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  style,
  onPress,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(0.95);
    // eslint-disable-next-line react-hooks/immutability
    opacity.value = withTiming(0.8);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1);
    // eslint-disable-next-line react-hooks/immutability
    opacity.value = withTiming(1);
  };

  const getContainerStyles = () => {
    const basePadding = size === 'sm' ? theme.spacing.sm : size === 'lg' ? theme.spacing.xl : theme.spacing.md;
    return {
      paddingVertical: basePadding,
      paddingHorizontal: basePadding * 2,
      borderRadius: theme.radius.xl,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      borderWidth: variant === 'outline' ? 2 : 0,
      borderColor: theme.colors.primary,
    };
  };

  const getTextStyles = () => {
    return {
      color: variant === 'outline' || variant === 'secondary' ? theme.colors.text : '#fff',
      fontSize: theme.typography.sizes[size],
      fontWeight: 'bold' as const,
    };
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[animatedStyle, getContainerStyles(), style as any]}
      {...props}
    >
      {variant === 'primary' ? (
        <LinearGradient
          colors={theme.gradients.premium as any}
          style={[StyleSheet.absoluteFill, { borderRadius: theme.radius.xl }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      ) : null}
      {variant === 'secondary' ? (
        <LinearGradient
          colors={[theme.colors.surface, theme.colors.surface]}
          style={[StyleSheet.absoluteFill, { borderRadius: theme.radius.xl }]}
        />
      ) : null}
      <Text style={getTextStyles()}>{title}</Text>
    </AnimatedPressable>
  );
};
