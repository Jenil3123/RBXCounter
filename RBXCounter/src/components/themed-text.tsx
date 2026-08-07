import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'hero' | 'screenTitle' | 'sectionTitle' | 'cardTitle' | 'body' | 'caption' | 'link' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'body', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'hero' && styles.hero,
        type === 'screenTitle' && styles.screenTitle,
        type === 'sectionTitle' && styles.sectionTitle,
        type === 'cardTitle' && styles.cardTitle,
        type === 'body' && styles.body,
        type === 'caption' && styles.caption,
        type === 'link' && styles.link,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  hero: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '800',
    letterSpacing: -1,
  },
  screenTitle: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#A3A3A3',
  },
  link: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F8CFF',
    fontWeight: '500',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' as any }) ?? '500',
    fontSize: 13,
  },
});
