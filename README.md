![Mono Card App Design](https://raw.githubusercontent.com/mono-labs-org/.github/prod/media/github-banners/monocard/mono-card-app-design.png)

# @monolythium/mono-card-app-design

Mono Card Design System — the **single source of truth** for all design tokens.

- **Dark theme only**
- **IBM Plex Sans only**

## Installation

```bash
pnpm add @monolythium/mono-card-app-design
```

## Build

To regenerate token outputs from JSON sources:

```bash
pnpm install
pnpm run build
```

This generates:

| Output | Path | Description |
|--------|------|-------------|
| CSS Variables | `dist/web/variables.css` | CSS custom properties for web |
| TypeScript | `dist/native/tokens.ts` | Source TypeScript for reference |
| JavaScript | `dist/native/tokens.js` | CommonJS module for React Native |
| Type Definitions | `dist/native/tokens.d.ts` | TypeScript declarations |

## Usage

### Next.js (Web)

Import CSS variables in your root layout or globals.css:

```tsx
// app/layout.tsx
import '@monolythium/mono-card-app-design/web/variables.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Or in CSS:

```css
/* globals.css */
@import '@monolythium/mono-card-app-design/web/variables.css';

body {
  background-color: var(--background-primary);
  color: var(--text-primary);
  font-family: var(--font-family-primary);
}
```

### React Native (Mobile)

Import tokens directly:

```tsx
import { Colors, Typography, Spacing } from '@monolythium/mono-card-app-design/native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundPrimary,
    padding: Spacing.s4,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: Typography.fontSize.xl,
    fontFamily: Typography.fontFamily.primary,
    fontWeight: Typography.fontWeight.bold,
  },
});
```

## Token Structure

### Colors

- `backgroundPrimary`, `backgroundSecondary`, `backgroundTertiary`, `backgroundElevated`
- `surfaceDefault`, `surfaceHover`, `surfaceActive`, `surfaceDisabled`
- `borderDefault`, `borderSubtle`, `borderStrong`
- `textPrimary`, `textSecondary`, `textTertiary`, `textDisabled`, `textInverse`
- `accentPrimary`, `accentPrimaryHover`, `accentSecondary`, `accentSecondaryHover`
- `statusSuccess`, `statusSuccessBg`, `statusWarning`, `statusWarningBg`, `statusError`, `statusErrorBg`, `statusInfo`, `statusInfoBg`

### Typography

- **Font Family**: `primary` (IBM Plex Sans), `mono` (IBM Plex Mono)
- **Font Size**: `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`
- **Font Weight**: `regular`, `medium`, `semibold`, `bold`
- **Line Height**: `tight`, `normal`, `relaxed`

### Spacing

- `s0` (0px), `s1` (4px), `s2` (8px), `s3` (12px), `s4` (16px), `s5` (20px), `s6` (24px), `s8` (32px), `s10` (40px), `s12` (48px), `s16` (64px), `s20` (80px), `s24` (96px)

### Radius

- `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full`

### Shadows

- `sm`, `md`, `lg`, `xl`, `card`, `dropdown`, `glow`

## Token Sources

All tokens are defined in JSON files under `tokens/`:

```
tokens/
├── colors.json
├── spacing.json
├── typography.json
├── radius.json
└── shadows.json
```

**Do not edit generated files in `dist/`.** Modify the JSON sources and run `pnpm run build`.

## Rules

1. **NO hardcoded colors** — Always use design tokens
2. **NO hardcoded font sizes** — Use typography scale
3. **NO ad-hoc spacing** — Use spacing scale
4. **NO light theme** — Dark theme only
5. **IBM Plex Sans only** — No other fonts permitted

## License

MIT
