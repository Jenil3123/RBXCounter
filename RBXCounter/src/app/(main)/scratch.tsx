import React, { useState, useRef, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Dimensions, PanResponder } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Svg, { Rect, Defs, Pattern, Path, G, Polygon } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { useAppStore } from '@/store/useAppStore';

const { width } = Dimensions.get('window');
const SCRATCH_AREA = width - 48; // Padding on sides
const RESOLUTION = 12; // Higher resolution for smoother scratching
const CELL_SIZE = SCRATCH_AREA / RESOLUTION;
const TOTAL_CELLS = RESOLUTION * RESOLUTION;

const PRIZES = [10, 50, 100, 200, 500];

// The unified dark texture that perfectly tiles across the grid
const FoilTexture = () => (
  <Svg width={SCRATCH_AREA} height={SCRATCH_AREA}>
    <Rect width="100%" height="100%" fill="#23242C" />
    <Defs>
      <Pattern id="rbx" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(20)">
        <G transform="translate(20, 20) scale(0.8)">
          <Polygon points="30,0 60,15 60,45 30,60 0,45 0,15" fill="#3D4054" />
          <Rect x="20" y="20" width="20" height="20" fill="#23242C" transform="rotate(15 30 30)" />
        </G>
      </Pattern>
    </Defs>
    <Rect width="100%" height="100%" fill="url(#rbx)" />
    
    {/* Dark Claw Marks */}
    <Path d="M 20 60 Q 150 90 320 140" stroke="#12131A" strokeWidth="12" fill="none" strokeLinecap="round" />
    <Path d="M 10 110 Q 150 140 330 190" stroke="#12131A" strokeWidth="18" fill="none" strokeLinecap="round" />
    <Path d="M 30 170 Q 150 200 310 250" stroke="#12131A" strokeWidth="14" fill="none" strokeLinecap="round" />
    <Path d="M 50 220 Q 150 250 290 300" stroke="#12131A" strokeWidth="16" fill="none" strokeLinecap="round" />
  </Svg>
);

export default function ScratchRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addBalance = useAppStore((state) => state.addBalance);

  const [winPrize, setWinPrize] = useState(0);

  // Scratchable cover blocks
  const [scratchedCells, setScratchedCells] = useState<Set<number>>(new Set());
  const [isGameOver, setIsGameOver] = useState(false);

  const scratchRef = useRef<View>(null);

  const startNewTicket = useCallback(() => {
    // 60% chance to win something
    const isWinner = Math.random() < 0.6;
    const prize = isWinner ? PRIZES[Math.floor(Math.random() * PRIZES.length)] : 0;

    setWinPrize(prize);
    setScratchedCells(new Set());
    setIsGameOver(false);
  }, []);

  React.useEffect(() => {
    startNewTicket();
  }, [startNewTicket]);

  const prizeRef = useRef(winPrize);
  React.useEffect(() => {
    prizeRef.current = winPrize;
  }, [winPrize]);

  const scratchAtPoint = (x: number, y: number) => {
    if (isGameOver) return;
    
    // Bounds check
    if (x < 0 || x > SCRATCH_AREA || y < 0 || y > SCRATCH_AREA) return;

    const col = Math.floor(x / CELL_SIZE);
    const row = Math.floor(y / CELL_SIZE);
    const index = row * RESOLUTION + col;

    if (index >= 0 && index < TOTAL_CELLS) {
      setScratchedCells((prev) => {
        if (prev.has(index)) return prev;
        const newSet = new Set(prev);
        
        // Scratch a 2x2 area to make it feel natural
        newSet.add(index);
        if (col < RESOLUTION - 1) newSet.add(index + 1);
        if (row < RESOLUTION - 1) newSet.add(index + RESOLUTION);
        if (col < RESOLUTION - 1 && row < RESOLUTION - 1) newSet.add(index + RESOLUTION + 1);

        if (newSet.size > TOTAL_CELLS * 0.6 && !isGameOver) {
          handleGameOver(prizeRef.current);
        }

        return newSet;
      });
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        scratchAtPoint(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      },
      onPanResponderMove: (evt) => {
        scratchAtPoint(evt.nativeEvent.locationX, evt.nativeEvent.locationY);
      },
    })
  ).current;

  const handleGameOver = (currentPrize: number) => {
    setIsGameOver(true);
    
    setTimeout(() => {
      if (currentPrize > 0) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        addBalance(currentPrize);
        Alert.alert(
          "Winner!", 
          `You scratched and won ${currentPrize} RBX!`,
          [{ text: "Play Again", onPress: startNewTicket }]
        );
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        Alert.alert(
          "No Win", 
          "Better luck next time!",
          [{ text: "Try Again", onPress: startNewTicket }]
        );
      }
    }, 500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Scratch & Win</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.subtitle}>
          Scratch the card! Find out if you won any RBX!
        </ThemedText>

        <View style={styles.ticket}>
          {/* Base Layer: The Prize Reveal */}
          <View style={styles.baseLayer}>
            {winPrize > 0 ? (
              <View style={styles.revealCenter}>
                <Ionicons name="gift" size={80} color="#FFD166" style={{ marginBottom: 16 }} />
                <ThemedText style={styles.winText}>YOU WON</ThemedText>
                <ThemedText style={styles.winAmount}>{winPrize} RBX</ThemedText>
              </View>
            ) : (
              <View style={styles.revealCenter}>
                <Ionicons name="sad-outline" size={80} color="#555" style={{ marginBottom: 16 }} />
                <ThemedText style={styles.loseText}>NO WIN</ThemedText>
                <ThemedText style={styles.loseSubtext}>Try again!</ThemedText>
              </View>
            )}
          </View>

          {/* Top Layer: The Tiled Unified Image */}
          <View 
            ref={scratchRef}
            style={styles.scratchLayer} 
            {...panResponder.panHandlers}
          >
            {Array.from({ length: TOTAL_CELLS }).map((_, index) => {
              const col = index % RESOLUTION;
              const row = Math.floor(index / RESOLUTION);
              const isScratched = scratchedCells.has(index) || isGameOver;
              
              return (
                <View 
                  key={index}
                  style={[
                    styles.foilBlock,
                    isScratched && styles.foilBlockScratched
                  ]}
                >
                  <View style={{
                    position: 'absolute',
                    top: -row * CELL_SIZE,
                    left: -col * CELL_SIZE,
                    width: SCRATCH_AREA,
                    height: SCRATCH_AREA,
                  }}>
                    <FoilTexture />
                  </View>
                </View>
              );
            })}
          </View>
          
          {scratchedCells.size === 0 && (
            <View style={styles.instructionOverlay} pointerEvents="none">
              <Ionicons name="hand-right-outline" size={48} color="#FFF" style={{ opacity: 0.8 }} />
              <ThemedText style={styles.instructionText}>SCRATCH HERE</ThemedText>
            </View>
          )}
        </View>

        {isGameOver && (
          <TouchableOpacity style={styles.resetButton} onPress={startNewTicket}>
            <ThemedText style={styles.resetButtonText}>Get New Ticket</ThemedText>
          </TouchableOpacity>
        )}
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
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  ticket: {
    width: SCRATCH_AREA,
    height: SCRATCH_AREA,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#1F202B',
    backgroundColor: '#1A1B23',
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  baseLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1B23',
  },
  revealCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  winText: {
    color: '#FFD166',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  winAmount: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: '900',
  },
  loseText: {
    color: '#888',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  loseSubtext: {
    color: '#555',
    fontSize: 20,
  },
  scratchLayer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  foilBlock: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    overflow: 'hidden',
  },
  foilBlockScratched: {
    opacity: 0, // Fully reveal underneath
  },
  instructionOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 8,
    letterSpacing: 2,
    opacity: 0.8,
  },
  resetButton: {
    marginTop: 40,
    backgroundColor: '#2DD4BF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 100,
  },
  resetButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
