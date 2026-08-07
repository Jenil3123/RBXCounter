import React, { useMemo } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { colors } from '@/theme';
import { useAppStore } from '@/store/useAppStore';

const REWARD_DAYS = [
  { day: 1, amount: 10 },
  { day: 2, amount: 20 },
  { day: 3, amount: 30 },
  { day: 4, amount: 50 },
  { day: 5, amount: 75 },
  { day: 6, amount: 100 },
  { day: 7, amount: 250 }, // Big reward
];

export default function RewardsRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  
  const currentStreak = useAppStore((state) => state.currentStreak);
  const lastClaimedDate = useAppStore((state) => state.lastClaimedDate);
  const claimDailyReward = useAppStore((state) => state.claimDailyReward);
  
  const today = new Date().toISOString().split('T')[0];
  const isClaimedToday = lastClaimedDate === today;

  const handleClaim = (amount: number) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    claimDailyReward(amount);
    Alert.alert("Reward Claimed!", `You received ${amount} RBX.`);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Daily Rewards</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <ThemedText style={styles.subtitle}>
            Come back every day to claim your free RBX. Don't break your streak!
          </ThemedText>
        </Animated.View>

        <View style={styles.grid}>
          {REWARD_DAYS.map((item, index) => {
            const isClaimed = item.day <= currentStreak;
            const isAvailable = !isClaimed && !isClaimedToday && item.day === currentStreak + 1;
            const isNextTomorrow = !isClaimed && isClaimedToday && item.day === currentStreak + 1;
            const isLocked = !isClaimed && !isAvailable && !isNextTomorrow;

            // Day 7 gets full width
            const isDay7 = item.day === 7;

            return (
              <Animated.View 
                key={item.day}
                entering={FadeInUp.delay(200 + index * 50).duration(500)}
                style={[
                  styles.cardWrapper, 
                  isDay7 ? { width: '100%' } : { width: '31%' }
                ]}
              >
                <TouchableOpacity 
                  style={[
                    styles.card,
                    isClaimed && styles.cardClaimed,
                    isAvailable && styles.cardAvailable,
                    isLocked && styles.cardLocked,
                    isNextTomorrow && styles.cardNextTomorrow
                  ]}
                  activeOpacity={0.8}
                  disabled={!isAvailable}
                  onPress={() => handleClaim(item.amount)}
                >
                  <ThemedText style={[
                    styles.dayText, 
                    isAvailable && { color: '#FFD166' }
                  ]}>
                    DAY {item.day}
                  </ThemedText>
                  
                  <View style={styles.iconContainer}>
                    {isClaimed ? (
                      <Ionicons name="checkmark-circle" size={isDay7 ? 48 : 32} color="#4ADE80" />
                    ) : isLocked || isNextTomorrow ? (
                      <Ionicons name="lock-closed" size={isDay7 ? 48 : 32} color="#555" />
                    ) : (
                      <Ionicons name="gift" size={isDay7 ? 48 : 32} color="#FFD166" />
                    )}
                  </View>

                  <ThemedText style={[
                    styles.amountText,
                    isClaimed && { color: '#4ADE80' },
                    isAvailable && { color: '#FFF' },
                    (isLocked || isNextTomorrow) && { color: '#888' }
                  ]}>
                    +{item.amount}
                  </ThemedText>
                  
                  {isAvailable && (
                    <View style={styles.claimBadge}>
                      <ThemedText style={styles.claimBadgeText}>CLAIM</ThemedText>
                    </View>
                  )}
                  {isNextTomorrow && (
                    <ThemedText style={styles.tomorrowText}>Tomorrow</ThemedText>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F202B',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#12131A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1F202B',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  content: {
    padding: 24,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#12131A',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1F202B',
    aspectRatio: 0.8,
  },
  cardClaimed: {
    backgroundColor: '#0A1A12',
    borderColor: '#113320',
  },
  cardAvailable: {
    backgroundColor: '#1A1400',
    borderColor: '#FFD166',
    shadowColor: '#FFD166',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cardLocked: {
    backgroundColor: '#0D0E14',
    opacity: 0.8,
  },
  cardNextTomorrow: {
    backgroundColor: '#12131A',
    borderColor: '#333',
  },
  dayText: {
    color: '#888',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontSize: 18,
    fontWeight: '900',
    marginTop: 8,
  },
  claimBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: '#FFD166',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  claimBadgeText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
  },
  tomorrowText: {
    color: '#FF6B00',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
  }
});
