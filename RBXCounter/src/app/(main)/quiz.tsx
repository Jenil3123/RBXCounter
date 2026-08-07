import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useAppStore } from '@/store/useAppStore';

const QUIZ_QUESTIONS = [
  {
    question: "In what year was Roblox officially released?",
    options: ["2004", "2006", "2008", "2010"],
    correctIndex: 1,
  },
  {
    question: "What was Roblox's original name?",
    options: ["DynaBlocks", "BloxCity", "BrickRigs", "Robloxia"],
    correctIndex: 0,
  },
  {
    question: "Who is the co-founder of Roblox alongside David Baszucki?",
    options: ["Notch", "Erik Cassel", "Gabe Newell", "John Doe"],
    correctIndex: 1,
  },
];

export default function QuizRoute() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const addBalance = useAppStore((state) => state.addBalance);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    const isCorrect = index === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex;
    
    if (isCorrect) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore(s => s + 1);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    setTimeout(() => {
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedOption(null);
      } else {
        handleGameOver(score + (isCorrect ? 1 : 0));
      }
    }, 1000);
  };

  const handleGameOver = (finalScore: number) => {
    setIsGameOver(true);
    const reward = finalScore * 25; // 25 RBX per correct answer
    
    setTimeout(() => {
      if (reward > 0) addBalance(reward);
      Alert.alert(
        "Quiz Finished!", 
        `You got ${finalScore}/${QUIZ_QUESTIONS.length} correct!\n\nReward: +${reward} RBX`,
        [
          { text: "Awesome", onPress: () => router.back() }
        ]
      );
    }, 500);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Quiz Time</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.progress}>
          Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
        </ThemedText>

        <View style={styles.questionCard}>
          <ThemedText style={styles.questionText}>
            {currentQuestion.question}
          </ThemedText>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            let bgColor = '#12131A';
            let borderColor = '#1F202B';
            
            if (selectedOption !== null) {
              if (index === currentQuestion.correctIndex) {
                bgColor = '#0A3338';
                borderColor = '#2DD4BF';
              } else if (index === selectedOption) {
                bgColor = '#381628';
                borderColor = '#F87171';
              }
            }

            return (
              <TouchableOpacity 
                key={index} 
                style={[styles.optionBtn, { backgroundColor: bgColor, borderColor }]}
                onPress={() => handleAnswer(index)}
                activeOpacity={0.8}
                disabled={selectedOption !== null}
              >
                <ThemedText style={styles.optionText}>{option}</ThemedText>
                {selectedOption !== null && index === currentQuestion.correctIndex && (
                  <Ionicons name="checkmark-circle" size={24} color="#2DD4BF" />
                )}
                {selectedOption === index && index !== currentQuestion.correctIndex && (
                  <Ionicons name="close-circle" size={24} color="#F87171" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
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
    padding: 24,
  },
  progress: {
    color: '#60A5FA',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 1,
  },
  questionCard: {
    backgroundColor: '#12131A',
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1F202B',
    marginBottom: 40,
    minHeight: 160,
    justifyContent: 'center',
  },
  questionText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 16,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  optionText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});
