import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';

import { ThemedText } from '../themed-text';
import { Card } from './Card';
import { colors } from '@/theme';

interface AvatarCardProps {
  name: string;
  level: number;
  style?: StyleProp<ViewStyle>;
}

export function AvatarCard({ name, level, style }: AvatarCardProps) {
  return (
    <Card variant="default" style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        {/* Placeholder for actual 3D avatar */}
        <ThemedText style={{ fontSize: 40 }}>👦</ThemedText>
      </View>
      <View style={styles.content}>
        <ThemedText type="cardTitle" style={styles.name}>{name}</ThemedText>
        <View style={styles.levelBadge}>
          <ThemedText style={styles.levelText}>Level {level}</ThemedText>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  imageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  name: {
    color: colors.dark.text,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.dark.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});
