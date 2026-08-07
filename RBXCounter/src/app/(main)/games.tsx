import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useAppStore } from '@/store/useAppStore';

const { width, height } = Dimensions.get('window');
const TARGET_SIZE = 60;
const PLAY_AREA_WIDTH = width - 48;
const PLAY_AREA_HEIGHT = height - 300;

export default function GamesRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addBalance = useAppStore((state) => state.addBalance);

  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [targetPos, setTargetPos] = useState({ top: 100, left: 100 });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (isPlaying && timeLeft === 0) {
      handleGameOver();
    }
    return () => clearTimeout(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    moveTarget();
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const reward = score * 2; // 2 RBX per tap
    addBalance(reward);
    Alert.alert(
      "Time's Up!", 
      `You tapped ${score} targets!\n\nReward: +${reward} RBX`,
      [
        { text: "Play Again", onPress: startGame },
        { text: "Exit", onPress: () => router.back() }
      ]
    );
  };

  const moveTarget = () => {
    const maxTop = PLAY_AREA_HEIGHT - TARGET_SIZE;
    const maxLeft = PLAY_AREA_WIDTH - TARGET_SIZE;
    setTargetPos({
      top: Math.random() * maxTop,
      left: Math.random() * maxLeft,
    });
  };

  const handleTap = () => {
    if (!isPlaying) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setScore(s => s + 1);
    moveTarget();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Reflex Tap</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <ThemedText style={styles.statLabel}>TIME</ThemedText>
          <ThemedText style={[styles.statValue, timeLeft <= 5 && { color: '#F87171' }]}>
            {timeLeft}s
          </ThemedText>
        </View>
        <View style={styles.statBox}>
          <ThemedText style={styles.statLabel}>SCORE</ThemedText>
          <ThemedText style={styles.statValue}>{score}</ThemedText>
        </View>
      </View>

      <View style={styles.playArea}>
        {!isPlaying && timeLeft === 15 ? (
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <ThemedText style={styles.startButtonText}>START GAME</ThemedText>
            <ThemedText style={styles.startButtonSub}>15 seconds. Tap fast!</ThemedText>
          </TouchableOpacity>
        ) : isPlaying ? (
          <TouchableOpacity 
            style={[styles.target, { top: targetPos.top, left: targetPos.left }]} 
            activeOpacity={0.5} 
            onPress={handleTap}
          >
            <Ionicons name="disc" size={TARGET_SIZE} color="#2DD4BF" />
          </TouchableOpacity>
        ) : null}
      </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#12131A',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1F202B',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
  },
  playArea: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: '#050508',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1F202B',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  target: {
    position: 'absolute',
    width: TARGET_SIZE,
    height: TARGET_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    backgroundColor: '#0A3338',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2DD4BF',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
  },
  startButtonSub: {
    color: '#2DD4BF',
    fontSize: 14,
  }
});
