import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  runOnJS,
  FadeInDown,
  ZoomIn
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useAppStore } from '@/store/useAppStore';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width - 64;

const PRIZES = [500, 10, 50, 20, 100, 5, 200, 10];
const SLICE_ANGLE = 360 / PRIZES.length;

export default function SpinRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addBalance = useAppStore((state) => state.addBalance);

  const [isSpinning, setIsSpinning] = useState(false);
  const [winAmount, setWinAmount] = useState<number | null>(null);
  const rotation = useSharedValue(0);

  const handleSpinEnd = (finalAngle: number) => {
    setIsSpinning(false);
    
    // Calculate which slice won
    // 0 degrees is the top. The wheel rotates clockwise.
    // The top pointer points to the prize.
    const normalizedAngle = (360 - (finalAngle % 360)) % 360;
    const winningIndex = Math.floor(normalizedAngle / SLICE_ANGLE);
    const reward = PRIZES[winningIndex];

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    addBalance(reward);
    setWinAmount(reward);
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Spin 5 to 8 full rotations + random angle
    const randomSpins = Math.floor(Math.random() * 4) + 5;
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation.value + (randomSpins * 360) + randomAngle;

    rotation.value = withTiming(
      totalRotation,
      {
        duration: 4000,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(handleSpinEnd)(totalRotation);
        }
      }
    );
  };

  const wheelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Spin the Wheel</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.subtitle}>
          Test your luck! Win up to 500 RBX.
        </ThemedText>

        <View style={styles.wheelContainer}>
          <View style={styles.pointer} />
          
          <Animated.View style={[styles.wheel, wheelAnimatedStyle]}>
            {PRIZES.map((prize, index) => {
              const rotationAngle = index * SLICE_ANGLE;
              return (
                <View 
                  key={index} 
                  style={[
                    styles.slice, 
                    { transform: [{ rotate: `${rotationAngle}deg` }] }
                  ]}
                >
                  <View style={[
                    styles.sliceContent,
                    { backgroundColor: index % 2 === 0 ? '#F472B6' : '#831843' }
                  ]}>
                    <ThemedText style={styles.prizeText}>{prize}</ThemedText>
                  </View>
                </View>
              );
            })}
          </Animated.View>
        </View>

        <TouchableOpacity 
          style={[styles.spinButton, isSpinning && styles.spinButtonDisabled]} 
          onPress={spinWheel}
          disabled={isSpinning}
          activeOpacity={0.8}
        >
          <ThemedText style={styles.spinButtonText}>
            {isSpinning ? "SPINNING..." : "SPIN NOW"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Premium Winning Modal Overlay */}
      {winAmount !== null && (
        <View style={styles.modalOverlay}>
          <Animated.View entering={ZoomIn.duration(400).springify()} style={styles.modalContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="gift" size={48} color="#FFD166" />
            </View>
            <ThemedText style={styles.modalTitle}>JACKPOT!</ThemedText>
            <ThemedText style={styles.modalSubtitle}>You won</ThemedText>
            <ThemedText style={styles.modalAmount}>{winAmount} RBX</ThemedText>
            
            <TouchableOpacity 
              style={styles.modalButton} 
              activeOpacity={0.8}
              onPress={() => setWinAmount(null)}
            >
              <ThemedText style={styles.modalButtonText}>AWESOME!</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
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
    flex: 1,
    alignItems: 'center',
    padding: 32,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 48,
  },
  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  pointer: {
    position: 'absolute',
    top: -20,
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    zIndex: 10,
    transform: [{ rotate: '45deg' }],
    borderRadius: 4,
  },
  wheel: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    borderRadius: WHEEL_SIZE / 2,
    borderWidth: 4,
    borderColor: '#FFF',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#12131A',
  },
  slice: {
    position: 'absolute',
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    alignItems: 'center',
  },
  sliceContent: {
    width: 60,
    height: WHEEL_SIZE / 2,
    alignItems: 'center',
    paddingTop: 20,
    transform: [{ perspective: 200 }],
  },
  prizeText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
    transform: [{ rotate: '-90deg' }, { translateX: -30 }],
  },
  spinButton: {
    backgroundColor: '#F472B6',
    paddingHorizontal: 48,
    paddingVertical: 20,
    borderRadius: 100,
    shadowColor: '#F472B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  spinButtonDisabled: {
    backgroundColor: '#831843',
    shadowOpacity: 0,
    elevation: 0,
  },
  spinButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '900',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: '#12131A',
    width: width - 64,
    borderRadius: 32,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD166',
    shadowColor: '#FFD166',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1A1400',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD166',
  },
  modalTitle: {
    color: '#FFD166',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  modalSubtitle: {
    color: '#888',
    fontSize: 16,
    marginBottom: 8,
  },
  modalAmount: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: '900',
    marginBottom: 32,
  },
  modalButton: {
    backgroundColor: '#FFD166',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 100,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: '900',
  }
});
