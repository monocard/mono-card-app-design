# Mono Card Design System

Single source of truth for design tokens across Web (ReactJS) and Mobile (React Native) platforms.

## Theme

**DARK THEME ONLY** - No light theme support.

## Font

**IBM Plex Sans** is the only font used across all platforms.

## Structure

```
design-system/
├── tokens/           # Source of truth (JSON)
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   ├── radius.json
│   └── shadows.json
├── web/              # Generated for ReactJS
│   └── variables.css
├── native/           # Generated for React Native
│   └── tokens.ts
└── README.md
```

## Usage

### ReactJS (Web)

Import the CSS variables file in your app entry point:

```javascript
import 'mono-card/design-system/web/variables.css';
```

Use variables in CSS/SCSS:

```css
.card {
  background-color: var(--color-surface-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-card);
}
```

### React Native

Import tokens directly:

```typescript
import { Colors, Typography, Spacing, Radius, Shadows } from 'mono-card/design-system/native/tokens';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceDefault,
    borderRadius: Radius.lg,
    padding: Spacing[4],
    ...Shadows.card,
  },
});
```

## Token Reference

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#0D0F14` | Main app background |
| `--color-bg-secondary` | `#151821` | Elevated surfaces |
| `--color-surface-default` | `#1C2029` | Card backgrounds |
| `--color-text-primary` | `#FFFFFF` | Primary text |
| `--color-text-secondary` | `#A1A7B5` | Secondary text |
| `--color-accent-primary` | `#3B82F6` | Primary accent |
| `--color-status-success` | `#10B981` | Success states |
| `--color-status-error` | `#EF4444` | Error states |

### Spacing Scale (4px base)

| Token | Value |
|-------|-------|
| `--spacing-1` | 4px |
| `--spacing-2` | 8px |
| `--spacing-3` | 12px |
| `--spacing-4` | 16px |
| `--spacing-6` | 24px |
| `--spacing-8` | 32px |

### Border Radius

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 12px |
| `--radius-xl` | 16px |
| `--radius-full` | 9999px |

## Rules

1. **NO hardcoded colors** - Always use design tokens
2. **NO hardcoded font sizes** - Use typography scale
3. **NO ad-hoc spacing** - Use spacing scale
4. **NO light theme** - Dark theme only
5. **IBM Plex Sans only** - No other fonts permitted
# mono-card-app-design
