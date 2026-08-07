import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path, Rect, G } from 'react-native-svg';

interface SvgLogoProps {
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export const SvgLogo = ({
  width = 120,
  height = 120,
  primaryColor = '#00F0FF',
  secondaryColor = '#8A2BE2',
}: SvgLogoProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" fill="none">
      <Defs>
        <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
          <Stop offset="100%" stopColor={secondaryColor} stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <Stop offset="100%" stopColor={primaryColor} stopOpacity="0.2" />
        </LinearGradient>
      </Defs>

      {/* Outer Hexagon Shape */}
      <Path
        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
        fill="url(#grad2)"
        stroke="url(#grad1)"
        strokeWidth="3"
      />

      {/* Inner Hexagon Outline */}
      <Path
        d="M50 15 L80 30 L80 70 L50 85 L20 70 L20 30 Z"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Stylized 'R' */}
      <G transform="translate(32, 30)">
        <Path
          d="M 0 0 L 0 40 M 0 0 L 15 0 C 25 0 25 15 15 15 L 0 15 M 10 15 L 20 40"
          stroke="url(#grad1)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>

      {/* Counter / Digital accents */}
      <Rect x="42" y="75" width="4" height="4" fill="#00F0FF" />
      <Rect x="50" y="75" width="4" height="4" fill="#00F0FF" />
      <Rect x="58" y="75" width="4" height="4" fill="#00F0FF" />
    </Svg>
  );
};
