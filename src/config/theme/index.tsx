import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Font families
export const fonts = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
  thin: 'System',
  // Add custom fonts here when you have them
  // regular: 'Poppins-Regular',
  // medium: 'Poppins-Medium',
  // bold: 'Poppins-Bold',
};

// Font sizes
export const fontSizes = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  '6xl': 36,
  '7xl': 40,
  '8xl': 48,
  '9xl': 56,
};

// Spacing scale
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 2,
  base: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

// Screen dimensions
export const screenDimensions = {
  width,
  height,
  // Responsive breakpoints
  isSmallDevice: width < 375,
  isMediumDevice: width >= 375 && width < 768,
  isLargeDevice: width >= 768,
};

// Light theme colors
const lightColors = {
  // Primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main accent blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  // Secondary colors
  secondary: {
    50: '#f8fafc', // Main background
    100: '#f5f6fa', // Card background
    200: '#e5e7eb', // Border
    300: '#cbd5e1',
    400: '#94a3b8', // Muted gray
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  // Success, warning, error, neutral (unchanged)
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  // Background colors
  background: {
    primary: '#f8fafc', // Main app background
    secondary: '#fff', // Card/surface background
    tertiary: '#f1f5f9', // Section background
  },
  // Text colors
  text: {
    primary: '#111827', // Main text
    secondary: '#64748b', // Subtext
    tertiary: '#94a3b8', // Muted
    inverse: '#fff',
  },
  // Border colors
  border: {
    primary: '#e5e7eb', // Card/border
    secondary: '#cbd5e1',
    tertiary: '#f1f5f9',
  },
  // Shadow colors
  shadow: {
    primary: 'rgba(0, 0, 0, 0.06)',
    secondary: 'rgba(0, 0, 0, 0.03)',
  },
};

// Dark theme colors
const darkColors = {
  // Primary colors (same as light for consistency)
  primary: lightColors.primary,
  
  // Secondary colors
  secondary: {
    50: '#0f172a',
    100: '#1e293b',
    200: '#334155',
    300: '#475569',
    400: '#64748b',
    500: '#94a3b8',
    600: '#cbd5e1',
    700: '#e2e8f0',
    800: '#f1f5f9',
    900: '#f8fafc',
  },
  
  // Success colors (same as light)
  success: lightColors.success,
  
  // Warning colors (same as light)
  warning: lightColors.warning,
  
  // Error colors (same as light)
  error: lightColors.error,
  
  // Neutral colors
  neutral: {
    50: '#171717',
    100: '#262626',
    200: '#404040',
    300: '#525252',
    400: '#737373',
    500: '#a3a3a3',
    600: '#d4d4d4',
    700: '#e5e5e5',
    800: '#f5f5f5',
    900: '#fafafa',
  },
  
  // Background colors
  background: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
  },
  
  // Text colors
  text: {
    primary: '#f8fafc',
    secondary: '#cbd5e1',
    tertiary: '#94a3b8',
    inverse: '#0f172a',
  },
  
  // Border colors
  border: {
    primary: '#334155',
    secondary: '#475569',
    tertiary: '#1e293b',
  },
  
  // Shadow colors
  shadow: {
    primary: 'rgba(0, 0, 0, 0.3)',
    secondary: 'rgba(0, 0, 0, 0.2)',
  },
};

// Theme configuration
export const theme = {
  fonts,
  fontSizes,
  spacing,
  borderRadius,
  screenDimensions,
  colors: lightColors, // Default to light theme
};

// Theme types for TypeScript
export type ThemeColors = typeof lightColors;
export type Theme = typeof theme;

// Theme context and provider
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (darkMode: boolean) => {
    setIsDark(darkMode);
  };

  const currentTheme: Theme = {
    ...theme,
    colors: isDark ? darkColors : lightColors,
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Utility functions
export const getResponsiveFontSize = (size: keyof typeof fontSizes): number => {
  const baseSize = fontSizes[size];
  if (screenDimensions.isSmallDevice) {
    return baseSize * 0.9;
  } else if (screenDimensions.isLargeDevice) {
    return baseSize * 1.1;
  }
  return baseSize;
};

export const getResponsiveSpacing = (space: keyof typeof spacing): number => {
  const baseSpace = spacing[space];
  if (screenDimensions.isSmallDevice) {
    return baseSpace * 0.9;
  } else if (screenDimensions.isLargeDevice) {
    return baseSpace * 1.1;
  }
  return baseSpace;
};

// Export theme as default
export default theme; 