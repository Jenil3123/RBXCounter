import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../themed-text';
import { colors, shadows, animations } from '@/theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'disabled';
  loading?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({ title, variant = 'primary', loading = false, style, disabled, ...props }: ButtonProps) {
  const scale = useSharedValue(1);
  
  const isActuallyDisabled = disabled || variant === 'disabled' || loading;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: any) => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(0.96, animations.spring);
    props.onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    // eslint-disable-next-line react-hooks/immutability
    scale.value = withSpring(1, animations.spring);
    props.onPressOut?.(e);
  };

  const renderContent = () => (
    <View style={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? colors.dark.text : colors.dark.background} />
      ) : (
        <ThemedText style={[
          styles.text, 
          variant === 'secondary' && styles.textSecondary,
          isActuallyDisabled && styles.textDisabled
        ]}>
          {title}
        </ThemedText>
      )}
    </View>
  );

  if (variant === 'primary' && !isActuallyDisabled) {
    return (
      <AnimatedTouchableOpacity
        activeOpacity={0.9}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[animatedStyle, style]}
        disabled={isActuallyDisabled}
        {...props}
      >
        <LinearGradient
          colors={colors.gradients.premium as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.base, styles.primary]}
        >
          {renderContent()}
        </LinearGradient>
      </AnimatedTouchableOpacity>
    );
  }

  const getContainerStyle = () => {
    if (isActuallyDisabled) return [styles.base, styles.disabled];
    if (variant === 'danger') return [styles.base, styles.danger];
    return [styles.base, styles.secondary];
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, getContainerStyle(), style]}
      disabled={isActuallyDisabled}
      {...props}
    >
      {renderContent()}
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16, // Requested 16-20px
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  contentContainer: {
    minHeight: 24,
    justifyContent: 'center',
  },
  primary: {
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: colors.dark.surface,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)', // Soft red background
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  disabled: {
    backgroundColor: colors.dark.surfaceGlass,
    borderWidth: 1,
    borderColor: 'transparent',
    opacity: 0.6,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // High contrast white for filled buttons
    letterSpacing: 0.5,
  },
  textSecondary: {
    color: colors.dark.text,
  },
  textDisabled: {
    color: colors.dark.textSecondary,
  },
});
