import { withSpring, withTiming } from 'react-native-reanimated';

export const animations = {
  spring: {
    damping: 15,
    stiffness: 150,
  },
  bouncy: {
    damping: 10,
    stiffness: 100,
  },
  timing: {
    duration: 300,
  },
};

export const withBouncySpring = (value: number) => withSpring(value, animations.bouncy);
export const withSmoothSpring = (value: number) => withSpring(value, animations.spring);
export const withSmoothTiming = (value: number) => withTiming(value, animations.timing);
