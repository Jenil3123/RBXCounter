import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/theme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function UnsupportedLanguageRoute() {
  const router = useRouter();

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(setup)/onboarding-1' as any);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.content}>
        <ThemedText style={{ fontSize: 64, lineHeight: 72, marginBottom: 24, textAlign: 'center' }}>🌐</ThemedText>
        <ThemedText type="screenTitle" style={styles.title}>
          Not Supported Yet
        </ThemedText>
        <ThemedText type="body" style={styles.subtitle}>
          We are working hard to bring this language to RBX Counter in a future update!
        </ThemedText>
        
        <Card variant="outline" style={styles.card}>
          <ThemedText type="body" style={{ textAlign: 'center' }}>
            For now, the application will continue in English.
          </ThemedText>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInUp.delay(500).duration(500)} style={styles.footer}>
        <Button
          title="Continue in English"
          variant="primary"
          onPress={handleContinue}
        />
        <Button
          title="Go Back"
          variant="secondary"
          onPress={() => router.back()}
          style={{ marginTop: 12 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: Colors.dark.textSecondary,
    marginBottom: 32,
  },
  card: {
    padding: 20,
    alignItems: 'center',
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
});
