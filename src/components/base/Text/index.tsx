import React from 'react';
import { Text as RNText, TextProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../../../config/theme';

export type TextVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body1' | 'body2' | 'button' | 'caption' 
  | 'overline' | 'subtitle1' | 'subtitle2'
  | 'inherit';

export type TextColor = 
  | 'primary' | 'secondary' | 'tertiary' | 'inverse'
  | 'success' | 'warning' | 'error'
  | 'muted' | 'disabled';

interface BaseTextProps extends Omit<TextProps, 'style'> {
  variant?: TextVariant;
  color?: TextColor;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const Text: React.FC<BaseTextProps> = ({
  variant = 'body1',
  color = 'primary',
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const getTextColor = (colorType: TextColor): string => {
    switch (colorType) {
      case 'primary':
        return theme.colors.text.primary;
      case 'secondary':
        return theme.colors.text.secondary;
      case 'tertiary':
        return theme.colors.text.tertiary;
      case 'inverse':
        return theme.colors.text.inverse;
      case 'success':
        return theme.colors.success[600];
      case 'warning':
        return theme.colors.warning[600];
      case 'error':
        return theme.colors.error[600];
      case 'muted':
        return theme.colors.neutral[500];
      case 'disabled':
        return theme.colors.neutral[400];
      default:
        return theme.colors.text.primary;
    }
  };

  const textStyle: StyleProp<TextStyle> = [
    styles[variant],
    { color: getTextColor(color) },
    style,
  ];

  return (
    <RNText style={textStyle} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  
  // Body text
  body1: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
  },
  
  // Special variants
  button: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 16,
  },
  overline: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  inherit: {
    // Inherits parent styles
  },
});

export default Text; 