import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/theme';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/Card';

const COSTUMES = [
  { id: 1, name: 'Cyber Mercenary', url: 'https://tr.rbxcdn.com/30DAY-Avatar-355CF216CA290788033FD093C4FD81AD-Png/420/420/Avatar/Png/noFilter' },
  { id: 2, name: 'Neon Hacker', url: 'https://tr.rbxcdn.com/30DAY-Avatar-62EDAD8205BA2291F50F6416BB770CC7-Png/420/420/Avatar/Png/noFilter' },
  { id: 3, name: 'Pro Gamer', url: 'https://tr.rbxcdn.com/30DAY-Avatar-8816FF42CADB1EE2B0F2B999B7308145-Png/420/420/Avatar/Png/noFilter' },
  { id: 4, name: 'Golden King', url: 'https://tr.rbxcdn.com/30DAY-Avatar-F7DBA94919A160DBB97142D118319718-Png/420/420/Avatar/Png/noFilter' },
  { id: 5, name: 'Shadow Mage', url: 'https://tr.rbxcdn.com/30DAY-Avatar-1D6664C2E9169CCCF329BAB69C9936EE-Png/420/420/Avatar/Png/noFilter' },
  { id: 6, name: 'Mecha Suit', url: 'https://tr.rbxcdn.com/30DAY-Avatar-3ECB5F6D88CF5AF53D6F884DDD8DD058-Png/420/420/Avatar/Png/noFilter' },
  { id: 7, name: 'Cosmic Entity', url: 'https://tr.rbxcdn.com/30DAY-Avatar-2FB24C1D291EAC675B77159F13A643F7-Png/420/420/Avatar/Png/noFilter' },
  { id: 8, name: 'Classic Noob', url: 'https://tr.rbxcdn.com/30DAY-Avatar-310966282D3529E36976BF6B07B1DC90-Png/420/420/Avatar/Png/noFilter' },
  { id: 9, name: 'Pixel Adventurer', url: 'https://tr.rbxcdn.com/30DAY-Avatar-9A3C11044D5172166CEFC75C64ECD14E-Png/420/420/Avatar/Png/noFilter' },
  { id: 10, name: 'Blocky Knight', url: 'https://tr.rbxcdn.com/30DAY-Avatar-650068051F798ECE3799004AE4C13819-Png/420/420/Avatar/Png/noFilter' },
  { id: 11, name: 'Cyber Mercenary V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-355CF216CA290788033FD093C4FD81AD-Png/420/420/Avatar/Png/noFilter' },
  { id: 12, name: 'Neon Hacker V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-62EDAD8205BA2291F50F6416BB770CC7-Png/420/420/Avatar/Png/noFilter' },
  { id: 13, name: 'Pro Gamer V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-8816FF42CADB1EE2B0F2B999B7308145-Png/420/420/Avatar/Png/noFilter' },
  { id: 14, name: 'Golden King V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-F7DBA94919A160DBB97142D118319718-Png/420/420/Avatar/Png/noFilter' },
  { id: 15, name: 'Shadow Mage V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-1D6664C2E9169CCCF329BAB69C9936EE-Png/420/420/Avatar/Png/noFilter' },
  { id: 16, name: 'Mecha Suit V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-3ECB5F6D88CF5AF53D6F884DDD8DD058-Png/420/420/Avatar/Png/noFilter' },
  { id: 17, name: 'Cosmic Entity V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-2FB24C1D291EAC675B77159F13A643F7-Png/420/420/Avatar/Png/noFilter' },
  { id: 18, name: 'Classic Noob V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-310966282D3529E36976BF6B07B1DC90-Png/420/420/Avatar/Png/noFilter' },
  { id: 19, name: 'Pixel Adventurer V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-9A3C11044D5172166CEFC75C64ECD14E-Png/420/420/Avatar/Png/noFilter' },
  { id: 20, name: 'Blocky Knight V2', url: 'https://tr.rbxcdn.com/30DAY-Avatar-650068051F798ECE3799004AE4C13819-Png/420/420/Avatar/Png/noFilter' },
];

export default function CustomizationRoute() {
  const router = useRouter();
  const setCustomizationCompleted = useAppStore((state) => state.setCustomizationCompleted);
  const completeSetup = useAppStore((state) => state.completeSetup);
  
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleFinish = () => {
    if (!selectedId) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCustomizationCompleted(true);
    completeSetup(); // Marks isFirstLaunchFinished = true
    router.replace('/(main)' as any);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.header}>
        <ThemedText type="screenTitle" style={styles.title}>
          Choose Costume
        </ThemedText>
        <ThemedText type="body" style={styles.subtitle}>
          Select your starting outfit. You can unlock more later!
        </ThemedText>
      </Animated.View>

      <ScrollView style={styles.gridScroll} contentContainerStyle={styles.gridContent}>
        {COSTUMES.map((item, index) => {
          const isSelected = selectedId === item.id;
          return (
            <Animated.View
              key={item.id}
              entering={FadeInUp.delay(300 + index * 50).duration(500)}
              style={{ width: '48%', marginBottom: 16 }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setSelectedId(item.id);
                }}
              >
                <Card variant="elevated" style={[styles.card, isSelected && styles.cardSelected]}>
                  <View style={styles.itemPlaceholder}>
                    <Image 
                      source={{ uri: item.url }}
                      style={{ width: '100%', height: '100%' }}
                      contentFit="cover"
                    />
                  </View>
                  <ThemedText style={styles.itemName} numberOfLines={1}>{item.name}</ThemedText>
                </Card>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </ScrollView>

      <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.button, !selectedId && styles.buttonDisabled]}
          disabled={!selectedId}
          onPress={handleFinish}
        >
          <ThemedText style={styles.buttonText}>Finish Setup</ThemedText>
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
  gridScroll: {
    flex: 1,
  },
  gridContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '100%',
    borderRadius: 20,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardSelected: {
    borderColor: Colors.dark.primary,
    transform: [{ scale: 1.05 }],
  },
  itemPlaceholder: {
    width: '100%',
    aspectRatio: 0.75,
    backgroundColor: Colors.dark.backgroundSelected,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  itemName: {
    fontSize: 12,
    color: Colors.dark.text,
    fontWeight: 'bold',
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
