import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { ThemedText } from '../themed-text';
import { Card } from './Card';

interface PremiumHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function PremiumHeader({ title, subtitle, rightElement, style }: PremiumHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <ThemedText type="screenTitle" style={styles.title}>{title}</ThemedText>
        {subtitle && <ThemedText type="caption" style={styles.subtitle}>{subtitle}</ThemedText>}
      </View>
      {rightElement && (
        <Card variant="outline" style={styles.rightContainer}>
          {rightElement}
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  title: {},
  subtitle: {},
  rightContainer: {
    padding: 12,
    borderRadius: 16,
  },
});
