/**
 * AUTO-GENERATED — DO NOT EDIT
 *
 * Mono Card Design System
 * Generated from: tokens/*.json
 * Build command: pnpm run build:tokens
 *
 * DARK THEME ONLY | IBM Plex Sans
 */

export const Colors = {
  backgroundPrimary: '#0D0F14',
  backgroundSecondary: '#151821',
  backgroundTertiary: '#1C2029',
  backgroundElevated: '#252A36',
  surfaceDefault: '#1C2029',
  surfaceHover: '#252A36',
  surfaceActive: '#2E3444',
  surfaceDisabled: '#12151B',
  borderDefault: '#2E3444',
  borderSubtle: '#1F242E',
  borderStrong: '#3D4454',
  textPrimary: '#FFFFFF',
  textSecondary: '#A1A7B5',
  textTertiary: '#6B7280',
  textDisabled: '#4B5563',
  textInverse: '#0D0F14',
  accentPrimary: '#3B82F6',
  accentPrimaryHover: '#2563EB',
  accentSecondary: '#8B5CF6',
  accentSecondaryHover: '#7C3AED',
  statusSuccess: '#10B981',
  statusSuccessBg: '#10B98120',
  statusWarning: '#F59E0B',
  statusWarningBg: '#F59E0B20',
  statusError: '#EF4444',
  statusErrorBg: '#EF444420',
  statusInfo: '#3B82F6',
  statusInfoBg: '#3B82F620',
  cardVirtual: '#1E40AF',
  cardVirtualEnd: '#7C3AED',
  cardPhysical: '#1C2029',
} as const;

export const Typography = {
  fontFamily: {
    primary: 'IBM Plex Sans',
    mono: 'IBM Plex Mono',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    2xl: 24,
    3xl: 30,
    4xl: 36,
    5xl: 48,
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const Spacing = {
  s0: 0,
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
  s6: 24,
  s8: 32,
  s10: 40,
  s12: 48,
  s16: 64,
  s20: 80,
  s24: 96,
} as const;

export const Radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  2xl: 24,
  full: 9999,
} as const;

export const Shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  card: '0 4px 12px rgba(0, 0, 0, 0.25)',
  dropdown: '0 10px 40px rgba(0, 0, 0, 0.5)',
  glow: '0 0 20px rgba(59, 130, 246, 0.3)',
} as const;

export default {
  Colors,
  Typography,
  Spacing,
  Radius,
  Shadows,
};
