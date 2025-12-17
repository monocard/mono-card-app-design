/**
 * Mono Card Design System - React Native Tokens
 * DARK THEME ONLY - No light theme variants
 * Generated from design-system/tokens/
 */

export const Colors = {
  // Background
  bgPrimary: '#0D0F14',
  bgSecondary: '#151821',
  bgTertiary: '#1C2029',
  bgElevated: '#252A36',

  // Surface
  surfaceDefault: '#1C2029',
  surfaceHover: '#252A36',
  surfaceActive: '#2E3444',
  surfaceDisabled: '#12151B',

  // Border
  borderDefault: '#2E3444',
  borderSubtle: '#1F242E',
  borderStrong: '#3D4454',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A7B5',
  textTertiary: '#6B7280',
  textDisabled: '#4B5563',
  textInverse: '#0D0F14',

  // Accent
  accentPrimary: '#3B82F6',
  accentPrimaryHover: '#2563EB',
  accentSecondary: '#8B5CF6',
  accentSecondaryHover: '#7C3AED',

  // Status
  statusSuccess: '#10B981',
  statusSuccessBg: 'rgba(16, 185, 129, 0.12)',
  statusWarning: '#F59E0B',
  statusWarningBg: 'rgba(245, 158, 11, 0.12)',
  statusError: '#EF4444',
  statusErrorBg: 'rgba(239, 68, 68, 0.12)',
  statusInfo: '#3B82F6',
  statusInfoBg: 'rgba(59, 130, 246, 0.12)',

  // Card
  cardVirtual: '#1E40AF',
  cardVirtualEnd: '#7C3AED',
  cardPhysical: '#1C2029',

  // Transparent
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const Typography = {
  fontFamily: {
    primary: 'IBMPlexSans-Regular',
    primaryMedium: 'IBMPlexSans-Medium',
    primarySemiBold: 'IBMPlexSans-SemiBold',
    primaryBold: 'IBMPlexSans-Bold',
    mono: 'IBMPlexMono-Regular',
    monoMedium: 'IBMPlexMono-Medium',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: -0.4,
    normal: 0,
    wide: 0.4,
  },
} as const;

export const Spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
} as const;

export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 12,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

// Theme object combining all tokens
export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  radius: Radius,
  shadows: Shadows,
} as const;

export default Theme;
