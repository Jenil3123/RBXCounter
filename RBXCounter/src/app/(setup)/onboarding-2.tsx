import React from 'react';
import { View, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/theme';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/Card';

export default function Onboarding2Route() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const setOnboardingCompleted = useAppStore((state) => state.setOnboardingCompleted);

  const handleNext = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setOnboardingCompleted(true);
    router.push('/(setup)/character' as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View entering={ZoomIn.duration(800).springify()} style={styles.imageContainer}>
          <View style={[styles.circle, { width: width * 0.65, height: width * 0.65 }]}>
            <View style={[styles.iconPlaceholder, { width: width * 0.4, height: width * 0.4, borderRadius: width * 0.2 }]}>
              <ThemedText style={{ fontSize: width * 0.25, lineHeight: width * 0.3, textAlign: 'center' }}>🎮</ThemedText>
            </View>
          </View>
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <ThemedText type="screenTitle" style={styles.title}>
              Play Mini-Games
            </ThemedText>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(500).duration(600)}>
            <ThemedText style={styles.subtitle}>
              Enjoy daily games and meme challenges to multiply your earnings faster!
            </ThemedText>
          </Animated.View>
        </View>
      </View>

      <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.footer}>
        <View style={styles.dots}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>
        
        <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleNext}>
          <ThemedText style={styles.buttonText}>Get Started</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  imageContainer: {
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
    backgroundColor: Colors.dark.surface,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  iconPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 32,
    color: Colors.dark.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.textSecondary,
    opacity: 0.3,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.dark.primary,
    opacity: 1,
  },
  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    color: Colors.dark.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
