import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import * as NativeSplashScreen from 'expo-splash-screen';

import { ParticleBackground } from '../components/ParticleBackground';
import { Colors } from '@/theme';
import { ThemedText } from '@/components/themed-text';


interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [isReady, setIsReady] = useState(false);

  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const loaderOpacity = useSharedValue(0);

  useEffect(() => {
    // Hide the native splash screen immediately so our animated one shows
    NativeSplashScreen.hideAsync().catch(() => {});

    // Logo pop-in animation
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withSequence(
      withSpring(1.2, { damping: 12, stiffness: 90 }),
      withSpring(1, { damping: 15, stiffness: 100 })
    );

    // Text fade-in
    textOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));

    // Loader fade-in
    loaderOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));

    // Mark as ready after minimum display time
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [logoOpacity, logoScale, textOpacity, loaderOpacity]);

  useEffect(() => {
    if (isReady) {
      onFinish();
    }
  }, [isReady, onFinish]);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: withSpring(textOpacity.value === 1 ? 0 : 20) }],
  }));

  const animatedLoaderStyle = useAnimatedStyle(() => ({
    opacity: loaderOpacity.value,
  }));

  return (
    <LinearGradient
      colors={Colors.dark.gradientBg as any}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ParticleBackground />
      
      <View style={styles.content}>
        <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={{ width: 150, height: 150, borderRadius: 32 }}
            contentFit="contain"
          />
        </Animated.View>
        
        <Animated.View style={[styles.textContainer, animatedTextStyle]}>
          <View style={styles.glassTitleCard}>
            <ThemedText type="screenTitle" style={styles.title}>RBXCounter</ThemedText>
            <ThemedText type="caption" style={styles.subtitle}>Premium Companion App</ThemedText>
          </View>
        </Animated.View>

        <Animated.View style={[styles.loaderContainer, animatedLoaderStyle]}>
          <ActivityIndicator size="large" color={Colors.dark.primary} />
        </Animated.View>
      </View>

      <Animated.View style={[styles.versionContainer, animatedTextStyle]}>
        <ThemedText style={styles.version}>v1.0.0</ThemedText>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill as any,
    zIndex: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  logoContainer: {
    width: 150,
    height: 150,
    marginBottom: 24,
    shadowColor: '#00D4FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  glassTitleCard: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    letterSpacing: 2,
    marginTop: 4,
    textTransform: 'uppercase',
  },
  loaderContainer: {
    height: 40,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 40,
    zIndex: 2,
  },
  version: {
    fontSize: 12,
    color: '#666666',
    letterSpacing: 1,
  },
});
