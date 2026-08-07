import React from 'react';
import { TouchableOpacityProps, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Card } from './Card';
import { animations } from '@/theme';

interface AnimatedCardProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outline';
  cardStyle?: StyleProp<ViewStyle>;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export function AnimatedCard({ children, variant = 'default', style, cardStyle, ...props }: AnimatedCardProps) {
  const scale = useSharedValue(1);

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

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.9}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[animatedStyle, style]}
      {...props}
    >
      <Card variant={variant} style={cardStyle}>
        {children}
      </Card>
    </AnimatedTouchableOpacity>
  );
}
