import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { ThemedText } from '../themed-text';
import { Card } from './Card';
import { colors } from '@/theme';

interface RewardCardProps {
  title: string;
  amount: string;
  icon: string;
  style?: StyleProp<ViewStyle>;
}

export function RewardCard({ title, amount, icon, style }: RewardCardProps) {
  return (
    <Card variant="outline" style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <ThemedText style={styles.icon}>{icon}</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText type="caption" style={styles.title}>{title}</ThemedText>
        <ThemedText type="cardTitle" style={styles.amount}>{amount}</ThemedText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  amount: {
    color: colors.dark.warning, // Warning is Gold/Orange in this theme
  },
});
