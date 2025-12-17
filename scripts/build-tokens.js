#!/usr/bin/env node
/**
 * Mono Card Design System - Token Build Script
 *
 * This script reads JSON token files and generates:
 * - dist/web/variables.css (CSS custom properties)
 * - dist/native/tokens.ts (TypeScript constants for React Native)
 *
 * IMPORTANT: The generated files are build artifacts.
 * Do not edit them directly - modify the JSON tokens instead.
 */

const fs = require('fs');
const path = require('path');

const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const DIST_DIR = path.join(__dirname, '..', 'dist');
const WEB_OUTPUT = path.join(DIST_DIR, 'web', 'variables.css');
const NATIVE_TS_OUTPUT = path.join(DIST_DIR, 'native', 'tokens.ts');
const NATIVE_JS_OUTPUT = path.join(DIST_DIR, 'native', 'tokens.js');
const NATIVE_DTS_OUTPUT = path.join(DIST_DIR, 'native', 'tokens.d.ts');

const HEADER_COMMENT = `/**
 * AUTO-GENERATED — DO NOT EDIT
 *
 * Mono Card Design System
 * Generated from: tokens/*.json
 * Build command: pnpm run build:tokens
 *
 * DARK THEME ONLY | IBM Plex Sans
 */`;

// Read all token files
function readTokens() {
  const colors = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'colors.json'), 'utf8'));
  const typography = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'typography.json'), 'utf8'));
  const spacing = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'spacing.json'), 'utf8'));
  const radius = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'radius.json'), 'utf8'));
  const shadows = JSON.parse(fs.readFileSync(path.join(TOKENS_DIR, 'shadows.json'), 'utf8'));

  return { colors, typography, spacing, radius, shadows };
}

// Convert nested object to flat CSS variables
function flattenTokensForCSS(obj, prefix = '') {
  const result = [];

  for (const [key, value] of Object.entries(obj)) {
    const newPrefix = prefix ? `${prefix}-${kebabCase(key)}` : kebabCase(key);

    if (value && typeof value === 'object' && 'value' in value) {
      result.push({ name: `--${newPrefix}`, value: value.value });
    } else if (value && typeof value === 'object') {
      result.push(...flattenTokensForCSS(value, newPrefix));
    }
  }

  return result;
}

// Convert camelCase to kebab-case
function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// Generate CSS variables file
function generateCSS(tokens) {
  const lines = [
    '/**',
    ' * AUTO-GENERATED — DO NOT EDIT',
    ' *',
    ' * Mono Card Design System - CSS Variables',
    ' * Source: tokens/*.json',
    ' * Build: pnpm run build:tokens',
    ' *',
    ' * DARK THEME ONLY | IBM Plex Sans',
    ' */',
    '',
    ':root {',
  ];

  // Colors
  lines.push('  /* Colors */');
  const colorVars = flattenTokensForCSS(tokens.colors.color);
  colorVars.forEach(v => lines.push(`  ${v.name}: ${v.value};`));
  lines.push('');

  // Typography
  lines.push('  /* Typography */');
  const typoVars = flattenTokensForCSS(tokens.typography.typography);
  typoVars.forEach(v => lines.push(`  ${v.name}: ${v.value};`));
  lines.push('');

  // Spacing
  lines.push('  /* Spacing */');
  for (const [key, val] of Object.entries(tokens.spacing.spacing)) {
    lines.push(`  --spacing-${key}: ${val.value};`);
  }
  lines.push('');

  // Radius
  lines.push('  /* Border Radius */');
  for (const [key, val] of Object.entries(tokens.radius.radius)) {
    lines.push(`  --radius-${key}: ${val.value};`);
  }
  lines.push('');

  // Shadows
  lines.push('  /* Shadows */');
  for (const [key, val] of Object.entries(tokens.shadows.shadow)) {
    lines.push(`  --shadow-${key}: ${val.value};`);
  }

  lines.push('}');
  lines.push('');

  return lines.join('\n');
}

// Convert nested object to TypeScript
function flattenTokensForTS(obj, prefix = '') {
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}${capitalize(key)}` : key;

    if (value && typeof value === 'object' && 'value' in value) {
      result[newKey] = value.value;
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenTokensForTS(value, newKey));
    }
  }

  return result;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate TypeScript tokens file
function generateTS(tokens) {
  const lines = [
    HEADER_COMMENT,
    '',
  ];

  // Colors
  lines.push('export const Colors = {');
  const flatColors = flattenTokensForTS(tokens.colors.color);
  for (const [key, value] of Object.entries(flatColors)) {
    lines.push(`  ${key}: '${value}',`);
  }
  lines.push('} as const;');
  lines.push('');

  // Typography
  lines.push('export const Typography = {');
  lines.push('  fontFamily: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.fontFamily)) {
    // For React Native, extract just the first font name
    const fontName = val.value.split(',')[0].replace(/'/g, '').trim();
    lines.push(`    ${key}: '${fontName}',`);
  }
  lines.push('  },');
  lines.push('  fontSize: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.fontSize)) {
    const numValue = parseInt(val.value);
    lines.push(`    ${key}: ${numValue},`);
  }
  lines.push('  },');
  lines.push('  fontWeight: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.fontWeight)) {
    lines.push(`    ${key}: '${val.value}',`);
  }
  lines.push('  },');
  lines.push('  lineHeight: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.lineHeight)) {
    lines.push(`    ${key}: ${val.value},`);
  }
  lines.push('  },');
  lines.push('} as const;');
  lines.push('');

  // Spacing
  lines.push('export const Spacing = {');
  for (const [key, val] of Object.entries(tokens.spacing.spacing)) {
    const numValue = parseInt(val.value);
    lines.push(`  s${key}: ${numValue},`);
  }
  lines.push('} as const;');
  lines.push('');

  // Radius
  lines.push('export const Radius = {');
  for (const [key, val] of Object.entries(tokens.radius.radius)) {
    const numValue = val.value === '9999px' ? 9999 : parseInt(val.value);
    lines.push(`  ${key}: ${numValue},`);
  }
  lines.push('} as const;');
  lines.push('');

  // Shadows (as style objects for React Native)
  lines.push('export const Shadows = {');
  for (const [key, val] of Object.entries(tokens.shadows.shadow)) {
    lines.push(`  ${key}: '${val.value}',`);
  }
  lines.push('} as const;');
  lines.push('');

  // Export all
  lines.push('export default {');
  lines.push('  Colors,');
  lines.push('  Typography,');
  lines.push('  Spacing,');
  lines.push('  Radius,');
  lines.push('  Shadows,');
  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

// Generate JavaScript (CommonJS) output
function generateJS(tokens) {
  const lines = [
    HEADER_COMMENT,
    '',
    '"use strict";',
    'Object.defineProperty(exports, "__esModule", { value: true });',
    'exports.Shadows = exports.Radius = exports.Spacing = exports.Typography = exports.Colors = void 0;',
    '',
  ];

  // Colors
  lines.push('exports.Colors = {');
  const flatColors = flattenTokensForTS(tokens.colors.color);
  for (const [key, value] of Object.entries(flatColors)) {
    lines.push(`  ${key}: '${value}',`);
  }
  lines.push('};');
  lines.push('');

  // Typography
  lines.push('exports.Typography = {');
  lines.push('  fontFamily: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.fontFamily)) {
    const fontName = val.value.split(',')[0].replace(/'/g, '').trim();
    lines.push(`    ${key}: '${fontName}',`);
  }
  lines.push('  },');
  lines.push('  fontSize: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.fontSize)) {
    const numValue = parseInt(val.value);
    lines.push(`    ${key}: ${numValue},`);
  }
  lines.push('  },');
  lines.push('  fontWeight: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.fontWeight)) {
    lines.push(`    ${key}: '${val.value}',`);
  }
  lines.push('  },');
  lines.push('  lineHeight: {');
  for (const [key, val] of Object.entries(tokens.typography.typography.lineHeight)) {
    lines.push(`    ${key}: ${val.value},`);
  }
  lines.push('  },');
  lines.push('};');
  lines.push('');

  // Spacing
  lines.push('exports.Spacing = {');
  for (const [key, val] of Object.entries(tokens.spacing.spacing)) {
    const numValue = parseInt(val.value);
    lines.push(`  s${key}: ${numValue},`);
  }
  lines.push('};');
  lines.push('');

  // Radius
  lines.push('exports.Radius = {');
  for (const [key, val] of Object.entries(tokens.radius.radius)) {
    const numValue = val.value === '9999px' ? 9999 : parseInt(val.value);
    lines.push(`  ${key}: ${numValue},`);
  }
  lines.push('};');
  lines.push('');

  // Shadows
  lines.push('exports.Shadows = {');
  for (const [key, val] of Object.entries(tokens.shadows.shadow)) {
    lines.push(`  ${key}: '${val.value}',`);
  }
  lines.push('};');
  lines.push('');

  // Default export
  lines.push('exports.default = {');
  lines.push('  Colors: exports.Colors,');
  lines.push('  Typography: exports.Typography,');
  lines.push('  Spacing: exports.Spacing,');
  lines.push('  Radius: exports.Radius,');
  lines.push('  Shadows: exports.Shadows,');
  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

// Generate TypeScript declaration file
function generateDTS(tokens) {
  const lines = [
    HEADER_COMMENT,
    '',
  ];

  // Colors type
  lines.push('export declare const Colors: {');
  const flatColors = flattenTokensForTS(tokens.colors.color);
  for (const key of Object.keys(flatColors)) {
    lines.push(`  readonly ${key}: string;`);
  }
  lines.push('};');
  lines.push('');

  // Typography type
  lines.push('export declare const Typography: {');
  lines.push('  readonly fontFamily: {');
  for (const key of Object.keys(tokens.typography.typography.fontFamily)) {
    lines.push(`    readonly ${key}: string;`);
  }
  lines.push('  };');
  lines.push('  readonly fontSize: {');
  for (const key of Object.keys(tokens.typography.typography.fontSize)) {
    lines.push(`    readonly ${key}: number;`);
  }
  lines.push('  };');
  lines.push('  readonly fontWeight: {');
  for (const key of Object.keys(tokens.typography.typography.fontWeight)) {
    lines.push(`    readonly ${key}: string;`);
  }
  lines.push('  };');
  lines.push('  readonly lineHeight: {');
  for (const key of Object.keys(tokens.typography.typography.lineHeight)) {
    lines.push(`    readonly ${key}: number;`);
  }
  lines.push('  };');
  lines.push('};');
  lines.push('');

  // Spacing type
  lines.push('export declare const Spacing: {');
  for (const key of Object.keys(tokens.spacing.spacing)) {
    lines.push(`  readonly s${key}: number;`);
  }
  lines.push('};');
  lines.push('');

  // Radius type
  lines.push('export declare const Radius: {');
  for (const key of Object.keys(tokens.radius.radius)) {
    lines.push(`  readonly ${key}: number;`);
  }
  lines.push('};');
  lines.push('');

  // Shadows type
  lines.push('export declare const Shadows: {');
  for (const key of Object.keys(tokens.shadows.shadow)) {
    lines.push(`  readonly ${key}: string;`);
  }
  lines.push('};');
  lines.push('');

  // Default export type
  lines.push('declare const _default: {');
  lines.push('  Colors: typeof Colors;');
  lines.push('  Typography: typeof Typography;');
  lines.push('  Spacing: typeof Spacing;');
  lines.push('  Radius: typeof Radius;');
  lines.push('  Shadows: typeof Shadows;');
  lines.push('};');
  lines.push('export default _default;');
  lines.push('');

  return lines.join('\n');
}

// Main build function
function build() {
  console.log('Building design tokens...');

  const tokens = readTokens();

  // Ensure output directories exist
  fs.mkdirSync(path.join(DIST_DIR, 'web'), { recursive: true });
  fs.mkdirSync(path.join(DIST_DIR, 'native'), { recursive: true });

  // Generate and write CSS
  const cssContent = generateCSS(tokens);
  fs.writeFileSync(WEB_OUTPUT, cssContent);
  console.log('✓ Generated dist/web/variables.css');

  // Generate and write TypeScript
  const tsContent = generateTS(tokens);
  fs.writeFileSync(NATIVE_TS_OUTPUT, tsContent);
  console.log('✓ Generated dist/native/tokens.ts');

  // Generate and write JavaScript
  const jsContent = generateJS(tokens);
  fs.writeFileSync(NATIVE_JS_OUTPUT, jsContent);
  console.log('✓ Generated dist/native/tokens.js');

  // Generate and write TypeScript declarations
  const dtsContent = generateDTS(tokens);
  fs.writeFileSync(NATIVE_DTS_OUTPUT, dtsContent);
  console.log('✓ Generated dist/native/tokens.d.ts');

  console.log('Build complete!');
}

build();
