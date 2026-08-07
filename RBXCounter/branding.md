# Brand Identity: RBX Counter

This document outlines the complete original brand identity for **RBX Counter: Memes & Games**.

## Brand Philosophy
The RBX Counter brand is designed to be highly energetic, premium, and instantly recognizable to fans of the gaming ecosystem while remaining 100% original. It uses modern glassmorphism, bold neon accents, and smooth geometry to communicate fun, progression, and virtual economy tracking.

## Core Identity
- **Application Name**: RBX Counter: Memes & Games
- **Short Name**: RBX Counter

## Color Palette
The colors are configured in the application theme system.

### Primary
- **Electric Blue**: `#00F0FF` (Used for primary actions, counters, and highlights)
- **Neon Cyan**: `#00E5FF` (Used for gradients and glow effects)

### Secondary
- **Purple**: `#8A2BE2` (Used for secondary elements and gradients)
- **Deep Indigo**: `#4B0082` (Used for deep shadows and depth)

### Accent
- **Gold**: `#FFD700` (Used for premium rewards and achievements)
- **Lime**: `#32CD32` (Used for success states and active indicators)

### Backgrounds
- **Dark Slate**: `#1A1A24` (Used for card backgrounds and elevated elements)
- **Space Black**: `#0a0a0c` (Used for the main application background)

## Typography
The application uses the **Nunito** font family to provide a friendly, rounded, and highly readable gaming aesthetic.
- **Primary Font**: Nunito (Bold for headings, Regular for body text)

## Logo & Icons
- **Vector Logo**: Located at `src/components/SvgLogo.tsx`. This is a fully original, scalable geometric "R" emblem combined with a digital counter motif.
- **App Icon**: The master `icon.png` is an AI-generated high-resolution premium asset utilizing the Neon Cyan and Electric Blue gradient on a Dark Slate background. Expo handles scaling this to all required sizes (1024x1024 down to 16x16).
- **Adaptive Icons**: 
  - Foreground: `assets/images/adaptive-icon-foreground.png`
  - Background: `assets/images/adaptive-icon-background.png`

## Usage Guidelines
1. **Never** use official Roblox copyrighted assets, logos, or Robux symbols.
2. **Always** use the `SvgLogo` component for in-app branding as it scales perfectly without pixelation.
3. **Contrast**: Ensure text placed on top of Electric Blue remains readable (prefer Space Black or Dark Slate text over bright backgrounds).

## Asset Locations
- **Logo Component**: `src/components/SvgLogo.tsx`
- **Master Icon**: `assets/images/icon.png`
- **Favicon**: `assets/images/favicon.png`
- **Adaptive Foreground**: `assets/images/adaptive-icon-foreground.png`
- **Adaptive Background**: `assets/images/adaptive-icon-background.png`
