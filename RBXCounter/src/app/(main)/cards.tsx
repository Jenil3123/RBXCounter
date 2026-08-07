import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  interpolate,
  useSharedValue,
  FadeIn
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useAppStore } from '@/store/useAppStore';

const ICONS = [
  'game-controller', 'rocket', 'diamond', 'star',
  'flash', 'flame', 'planet', 'skull'
];

interface CardData {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// 4x4 Grid calculations
const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48 - 36) / 4; // 24px padding on sides, 12px gap between 4 cards = 3 gaps

const FlipCard = ({ card, onPress }: { card: CardData; onPress: () => void }) => {
  const flipValue = useSharedValue(0);

  useEffect(() => {
    if (card.isFlipped || card.isMatched) {
      flipValue.value = withSpring(180, { damping: 15, stiffness: 120 });
    } else {
      flipValue.value = withSpring(0, { damping: 15, stiffness: 120 });
    }
  }, [card.isFlipped, card.isMatched]);

  const frontStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 180], [0, 180]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      zIndex: flipValue.value < 90 ? 1 : 0,
      opacity: flipValue.value < 90 ? 1 : 0,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipValue.value, [0, 180], [180, 360]);
    return {
      transform: [{ rotateY: `${rotateY}deg` }],
      zIndex: flipValue.value >= 90 ? 1 : 0,
      opacity: flipValue.value >= 90 ? 1 : 0,
    };
  });

  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} disabled={card.isFlipped || card.isMatched}>
      <View style={styles.cardContainer}>
        {/* Front of card (Backside of design, what you see when face down) */}
        <Animated.View style={[styles.card, styles.cardFront, frontStyle]}>
          <Ionicons name="help" size={32} color="#444" />
        </Animated.View>
        
        {/* Back of card (The actual icon) */}
        <Animated.View style={[styles.card, styles.cardBack, backStyle, card.isMatched && styles.cardMatched]}>
          <Ionicons name={card.icon as any} size={32} color={card.isMatched ? "#4ADE80" : "#FFF"} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default function CardsRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addBalance = useAppStore((state) => state.addBalance);

  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const initializeGame = useCallback(() => {
    const pairedIcons = [...ICONS, ...ICONS];
    // Shuffle
    for (let i = pairedIcons.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairedIcons[i], pairedIcons[j]] = [pairedIcons[j], pairedIcons[i]];
    }
    
    setCards(pairedIcons.map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    })));
    setFlippedIndices([]);
    setMatches(0);
    setMoves(0);
    setIsLocked(false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCardPress = (index: number) => {
    if (isLocked) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIndex, secondIndex] = newFlippedIndices;
      if (newCards[firstIndex].icon === newCards[secondIndex].icon) {
        // Match found
        setTimeout(() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          const matchedCards = [...newCards];
          matchedCards[firstIndex].isMatched = true;
          matchedCards[secondIndex].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatches((m) => {
            const newMatches = m + 1;
            if (newMatches === 8) {
              handleGameOver(moves + 1);
            }
            return newMatches;
          });
          setIsLocked(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          const resetCards = [...newCards];
          resetCards[firstIndex].isFlipped = false;
          resetCards[secondIndex].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  const handleGameOver = (finalMoves: number) => {
    // Reward calculation: Perfect game is 8 moves.
    // Base 50 RBX, minus 2 for every extra move. Min 10 RBX.
    const penalty = (finalMoves - 8) * 2;
    const reward = Math.max(10, 50 - penalty);
    
    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      addBalance(reward);
      Alert.alert(
        "You Win!", 
        `You found all pairs in ${finalMoves} moves!\n\nReward: +${reward} RBX`,
        [
          { text: "Play Again", onPress: initializeGame },
          { text: "Exit", onPress: () => router.back() }
        ]
      );
    }, 500);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Card Match</ThemedText>
        <TouchableOpacity style={styles.resetButton} onPress={initializeGame}>
          <Ionicons name="refresh" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <ThemedText style={styles.statLabel}>MOVES</ThemedText>
          <ThemedText style={styles.statValue}>{moves}</ThemedText>
        </View>
        <View style={styles.statBox}>
          <ThemedText style={styles.statLabel}>MATCHES</ThemedText>
          <ThemedText style={styles.statValue}>{matches} / 8</ThemedText>
        </View>
      </View>

      <View style={styles.gameBoard}>
        {cards.map((card, index) => (
          <Animated.View key={card.id} entering={FadeIn.delay(index * 50)}>
            <FlipCard card={card} onPress={() => handleCardPress(index)} />
          </Animated.View>
        ))}
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
  resetButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#381628',
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingHorizontal: 24,
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
    fontSize: 24,
    fontWeight: '900',
  },
  gameBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    rowGap: 12,
    marginTop: 20,
  },
  cardContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE * 1.2,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardFront: {
    backgroundColor: '#1A1B23',
    borderWidth: 1,
    borderColor: '#2A2B36',
  },
  cardBack: {
    backgroundColor: '#3D221F',
    borderWidth: 1,
    borderColor: '#E85D04',
  },
  cardMatched: {
    backgroundColor: '#0D361F',
    borderColor: '#4ADE80',
    opacity: 0.5,
  }
});
