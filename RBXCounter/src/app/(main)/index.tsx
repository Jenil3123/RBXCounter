import React from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { colors } from '@/theme';
import { useAppStore } from '@/store/useAppStore';

export default function HomeRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const balance = useAppStore((state) => state.balance);

  const navigateTo = (path: string) => {
    router.push(`/(main)/${path}` as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <ThemedText style={styles.titleCyan}>RBX </ThemedText>
            <ThemedText style={styles.titlePurple}>COUNTER</ThemedText>
          </View>
          <TouchableOpacity onPress={() => navigateTo('settings')}>
            <Ionicons name="settings-outline" size={28} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceTextSection}>
            <ThemedText style={styles.hubStatus}>HUB STATUS: OPTIMAL</ThemedText>
            <ThemedText style={styles.balanceAmount}>{balance} RBX</ThemedText>
            <ThemedText style={styles.balanceLabel}>WALLET BALANCE</ThemedText>
          </View>
          <View style={styles.lightningIconContainer}>
            <Ionicons name="flash" size={32} color="#FFD166" />
          </View>
        </View>

        {/* Daily Reward Button */}
        <TouchableOpacity style={styles.dailyRewardButton} activeOpacity={0.8} onPress={() => navigateTo('rewards')}>
          <View style={styles.dailyRewardIconContainer}>
            <Ionicons name="gift-outline" size={24} color="#FFF" />
          </View>
          <View style={styles.dailyRewardTextContainer}>
            <ThemedText style={styles.dailyRewardTitle}>Claim Daily Reward</ThemedText>
            <ThemedText style={styles.dailyRewardSubtitle}>Tap to claim your free RBX</ThemedText>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        {/* Subheading */}
        <ThemedText style={styles.subheading}>CORE SYSTEMS</ThemedText>

        {/* Grid */}
        <View style={styles.grid}>
          {/* Card 1: Play Game (Link placeholder) */}
          <TouchableOpacity 
            style={styles.systemCard} 
            activeOpacity={0.8} 
            onPress={() => Alert.alert('Play Game', 'This will be an external link to a game.')}
          >
            <View style={[styles.iconCircle, { backgroundColor: '#0A3338' }]}>
              <Ionicons name="game-controller-outline" size={32} color="#2DD4BF" />
            </View>
            <ThemedText style={styles.cardTitle}>Play Game</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Play smart, Play hard</ThemedText>
          </TouchableOpacity>

          {/* Card 2: Use Spin wheel */}
          <TouchableOpacity style={styles.systemCard} activeOpacity={0.8} onPress={() => navigateTo('spin')}>
            <View style={[styles.iconCircle, { backgroundColor: '#381628' }]}>
              <Ionicons name="aperture-outline" size={32} color="#F472B6" />
            </View>
            <ThemedText style={styles.cardTitle}>Use Spin wheel</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Spin the wheel for rewards</ThemedText>
          </TouchableOpacity>

          {/* Card 3: Scratch Card */}
          <TouchableOpacity style={styles.systemCard} activeOpacity={0.8} onPress={() => navigateTo('scratch')}>
            <View style={[styles.iconCircle, { backgroundColor: '#0D361F' }]}>
              <Ionicons name="sparkles-outline" size={32} color="#4ADE80" />
            </View>
            <ThemedText style={styles.cardTitle}>Scratch Card</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Scratch the card win a prize</ThemedText>
          </TouchableOpacity>

          {/* Card 4: Quiz time */}
          <TouchableOpacity style={styles.systemCard} activeOpacity={0.8} onPress={() => navigateTo('quiz')}>
            <View style={[styles.iconCircle, { backgroundColor: '#0E2142' }]}>
              <Ionicons name="bulb-outline" size={32} color="#60A5FA" />
            </View>
            <ThemedText style={styles.cardTitle}>Quiz time</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Play quiz and get amazing gifts</ThemedText>
          </TouchableOpacity>

          {/* Card 5: meme */}
          <TouchableOpacity style={styles.systemCard} activeOpacity={0.8} onPress={() => navigateTo('meme')}>
            <View style={[styles.iconCircle, { backgroundColor: '#42330A' }]}>
              <Ionicons name="happy-outline" size={32} color="#FBBF24" />
            </View>
            <ThemedText style={styles.cardTitle}>meme</ThemedText>
            <ThemedText style={styles.cardSubtitle}>View and share funny memes</ThemedText>
          </TouchableOpacity>

          {/* Card 6: Card Match */}
          <TouchableOpacity style={styles.systemCard} activeOpacity={0.8} onPress={() => navigateTo('cards')}>
            <View style={[styles.iconCircle, { backgroundColor: '#381628' }]}>
              <Ionicons name="albums-outline" size={32} color="#F87171" />
            </View>
            <ThemedText style={styles.cardTitle}>Card Match</ThemedText>
            <ThemedText style={styles.cardSubtitle}>Match pairs to win RBX</ThemedText>
          </TouchableOpacity>
        </View>
        
        {/* Extra padding for scroll */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0F', // Deep dark solid background
  },
  content: {
    padding: 24,
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCyan: {
    fontSize: 24,
    fontWeight: '900',
    color: '#00E5FF', // Cyan
    letterSpacing: 1,
  },
  titlePurple: {
    fontSize: 24,
    fontWeight: '900',
    color: '#9D7AFF', // Purple
    letterSpacing: 1,
  },
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#12131A',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#3D221F', // Subtle orange/red border
    marginBottom: 40,
  },
  balanceTextSection: {
    flex: 1,
  },
  hubStatus: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  balanceAmount: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 4,
  },
  balanceLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  lightningIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E85D04',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E85D04',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  dailyRewardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12131A',
    borderRadius: 20,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#9D7AFF', // Purple accent border
  },
  dailyRewardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#9D7AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  dailyRewardTextContainer: {
    flex: 1,
  },
  dailyRewardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dailyRewardSubtitle: {
    color: '#888',
    fontSize: 12,
  },
  subheading: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  systemCard: {
    width: '48%',
    backgroundColor: '#12131A',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1F202B',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
