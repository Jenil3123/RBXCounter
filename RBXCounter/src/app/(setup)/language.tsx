import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/theme';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const LANGUAGES = [
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { id: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { id: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { id: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
];

export default function LanguageRoute() {
  const router = useRouter();
  const setLanguageSelected = useAppStore((state) => state.setLanguageSelected);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedId(id);
  };

  const handleContinue = () => {
    if (!selectedId) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setLanguageSelected(true);
    if (selectedId !== 'en') {
      router.push('/(setup)/unsupported-language' as any);
    } else {
      router.push('/(setup)/onboarding-1' as any);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.header}>
        <ThemedText type="screenTitle" style={styles.title}>
          Select Language
        </ThemedText>
        <ThemedText type="body" style={styles.subtitle}>
          Choose your preferred language to continue.
        </ThemedText>
      </Animated.View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {LANGUAGES.map((lang, index) => {
          const isSelected = selectedId === lang.id;
          return (
            <Animated.View
              key={lang.id}
              entering={FadeInUp.delay(300 + index * 50).duration(400)}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelect(lang.id)}
              >
                <Card variant="elevated" 
                  style={[styles.card, isSelected && styles.cardSelected]}
                >
                  <View style={styles.cardLeft}>
                  <ThemedText style={styles.flag}>{lang.flag}</ThemedText>
                  <View>
                    <ThemedText type="body" style={[styles.langName, { fontWeight: 'bold' }]}>
                      {lang.nativeName}
                    </ThemedText>
                    <ThemedText style={styles.langEnglishName}>{lang.name}</ThemedText>
                  </View>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                </Card>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.footer}>
        <Button
          title="Continue"
          variant="primary"
          disabled={!selectedId}
          onPress={handleContinue}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    flex: 1,
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
    color: Colors.dark.text,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.dark.textSecondary,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: Colors.dark.primary,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  flag: {
    fontSize: 28,
  },
  langName: {
    fontSize: 18,
    color: Colors.dark.text,
  },
  langEnglishName: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginTop: 2,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.dark.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: Colors.dark.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.dark.primary,
  },
  footer: {
    padding: 24,
    paddingBottom: 48,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  button: {
    backgroundColor: Colors.dark.primary,
    paddingVertical: 18,
    borderRadius: 100,
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: Colors.dark.backgroundElement,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: Colors.dark.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
