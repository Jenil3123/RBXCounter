import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/theme';
import { useAppStore } from '@/store/useAppStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const CHARACTERS = [
  { id: 'avatar_1', name: 'Starter Boy', rarity: 'Common', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-310966282D3529E36976BF6B07B1DC90-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#A8E6CF' },
  { id: 'avatar_2', name: 'Starter Girl', rarity: 'Common', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-9A3C11044D5172166CEFC75C64ECD14E-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#FFD3B6' },
  { id: 'avatar_5', name: 'Pixel Ninja', rarity: 'Rare', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-355CF216CA290788033FD093C4FD81AD-Png/420/420/Avatar/Png/noFilter', locked: true, color: '#9D94FF' },
  { id: 'avatar_3', name: 'Cool Kid', rarity: 'Common', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-5D3112D29FE230F31350D3346E66000E-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#FFAAA5' },
  { id: 'avatar_4', name: 'Blocky Knight', rarity: 'Rare', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-650068051F798ECE3799004AE4C13819-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#FF8B94' },
  { id: 'avatar_8', name: 'Golden King', rarity: 'Legendary', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-F7DBA94919A160DBB97142D118319718-Png/420/420/Avatar/Png/noFilter', locked: true, color: '#FFD700' },
  { id: 'avatar_6', name: 'Neon Hacker', rarity: 'Epic', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-62EDAD8205BA2291F50F6416BB770CC7-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#94FFD8' },
  { id: 'avatar_7', name: 'Pro Gamer', rarity: 'Epic', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-8816FF42CADB1EE2B0F2B999B7308145-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#FF94E0' },
  { id: 'avatar_11', name: 'Cosmic Entity', rarity: 'Mythic', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-2FB24C1D291EAC675B77159F13A643F7-Png/420/420/Avatar/Png/noFilter', locked: true, color: '#00FFFF' },
  { id: 'avatar_9', name: 'Shadow Mage', rarity: 'Legendary', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-1D6664C2E9169CCCF329BAB69C9936EE-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#4A0E4E' },
  { id: 'avatar_10', name: 'Mecha Suit', rarity: 'Mythic', icon: 'https://tr.rbxcdn.com/30DAY-Avatar-3ECB5F6D88CF5AF53D6F884DDD8DD058-Png/420/420/Avatar/Png/noFilter', locked: false, color: '#FF3333' },
];

export default function CharacterRoute() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const CARD_WIDTH = width / 2 - 32;
  const setCharacterSelected = useAppStore((state) => state.setCharacterSelected);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (char: typeof CHARACTERS[0]) => {
    if (char.locked) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedId(char.id);
  };

  const handleNext = () => {
    if (!selectedId) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCharacterSelected(true);
    router.push('/(setup)/customization' as any);
  };

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.header}>
        <ThemedText type="screenTitle" style={styles.title}>
          Choose Avatar
        </ThemedText>
        <ThemedText type="body" style={styles.subtitle}>
          Select your starting character. You can unlock more later!
        </ThemedText>
      </Animated.View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <View style={styles.grid}>
          {CHARACTERS.map((char, index) => {
            const isSelected = selectedId === char.id;
            
            return (
              <Animated.View
                key={char.id}
                entering={FadeInUp.delay(300 + index * 100).duration(500)}
                style={{ width: '48%', marginBottom: 16 }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleSelect(char)}
                >
                  <Card variant="elevated"
                    style={[
                      styles.card,
                      isSelected && styles.cardSelected,
                      char.locked && styles.cardLocked
                    ]}
                  >
                  {/* Rarity Badge */}
                  <View style={[
                    styles.rarityBadge, 
                    char.rarity === 'Mythic' && styles.rarityMythic,
                    char.rarity === 'Legendary' && styles.rarityLegendary,
                    char.rarity === 'Epic' && styles.rarityEpic,
                    char.rarity === 'Rare' && styles.rarityRare,
                  ]}>
                    <ThemedText style={styles.rarityText}>{char.rarity}</ThemedText>
                  </View>

                  <View style={[styles.avatarPlaceholder, { width: CARD_WIDTH - 24, height: CARD_WIDTH + 20, backgroundColor: char.locked ? Colors.dark.backgroundSelected : char.color, overflow: 'hidden' }]}>
                    <Image 
                      source={{ uri: char.icon }} 
                      style={{ width: '100%', height: '100%', opacity: char.locked ? 0.3 : 1 }}
                      contentFit="cover"
                    />
                    {char.locked && (
                      <View style={styles.lockOverlay}>
                        <ThemedText style={{ fontSize: 24, lineHeight: 28 }}>🔒</ThemedText>
                      </View>
                    )}
                  </View>
                  
                  <ThemedText style={[styles.charName, char.locked && styles.textLocked]} numberOfLines={1}>
                    {char.name}
                  </ThemedText>
                  </Card>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>

      <Animated.View entering={FadeInUp.delay(800).duration(500)} style={styles.footer}>
        <Button
          title="Confirm Selection"
          variant="primary"
          disabled={!selectedId}
          onPress={handleNext}
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
  },
  grid: {
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
  cardLocked: {
    opacity: 0.7,
  },
  rarityBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.dark.textSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 2,
  },
  rarityRare: {
    backgroundColor: Colors.dark.secondary, // Purple
  },
  rarityEpic: {
    backgroundColor: '#FF00FF', // Magenta
  },
  rarityLegendary: {
    backgroundColor: Colors.dark.accent, // Gold
  },
  rarityMythic: {
    backgroundColor: '#FF0000', // Red
  },
  rarityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.dark.background,
    textTransform: 'uppercase',
  },
  avatarPlaceholder: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 20, // space for badge
  },
  lockOverlay: {
    ...StyleSheet.absoluteFill as any,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
  },
  charName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
  },
  textLocked: {
    color: Colors.dark.textSecondary,
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
