import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const PARTICLE_COUNT = 20;

interface ParticleProps {
  delay: number;
  startX: number;
  startY: number;
  size: number;
  duration: number;
}

const Particle = ({ delay, startX, startY, size, duration }: ParticleProps) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-height, {
          duration,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.6, { duration: duration * 0.2 }),
          withTiming(0.6, { duration: duration * 0.6 }),
          withTiming(0, { duration: duration * 0.2 })
        ),
        -1,
        false
      )
    );

    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: duration * 0.5 }),
          withTiming(0.5, { duration: duration * 0.5 })
        ),
        -1,
        true
      )
    );
  }, [delay, duration, opacity, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: startX,
          top: startY,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={['rgba(138, 43, 226, 0.8)', 'rgba(0, 212, 255, 0.4)']}
        style={StyleSheet.absoluteFill as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
};

const generateParticles = () => {
  return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
    id: i,
    delay: Math.random() * 5000,
    startX: Math.random() * width,
    startY: height + Math.random() * 200,
    size: Math.random() * 15 + 5,
    duration: Math.random() * 8000 + 7000,
  }));
};

export const ParticleBackground = () => {
  const [particles] = React.useState(() => generateParticles());

  return (
    <Animated.View style={StyleSheet.absoluteFill as any} pointerEvents="none">
      {particles.map((p) => (
        <Particle
          key={p.id}
          delay={p.delay}
          startX={p.startX}
          startY={p.startY}
          size={p.size}
          duration={p.duration}
        />
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    overflow: 'hidden',
  },
});
