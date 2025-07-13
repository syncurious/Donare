import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { useTheme } from '../../../config/theme';
import Text, { TextColor } from '../Text';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: TextColor;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  prefixIcon?: ImageSourcePropType;
  suffixIcon?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  disabled = false,
  loading = false,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  style,
  textStyle,
  prefixIcon,
  suffixIcon,
  iconPosition = 'left',
  fullWidth = true,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonColor = (colorType: TextColor): string => {
    switch (colorType) {
      case 'primary':
        return theme.colors.primary[600];
      case 'secondary':
        return theme.colors.secondary[600];
      case 'success':
        return theme.colors.success[600];
      case 'warning':
        return theme.colors.warning[600];
      case 'error':
        return theme.colors.error[600];
      default:
        return theme.colors.primary[600];
    }
  };

  const getTextColor = (): string => {
    if (variant === 'contained') {
      return theme.colors.text.inverse;
    }
    return getButtonColor(color);
  };

  const buttonStyle: StyleProp<ViewStyle> = [
    styles.button,
    styles[size],
    styles[variant],
    {
      borderColor: variant === 'outlined' ? getButtonColor(color) : 'transparent',
      backgroundColor: variant === 'contained' ? getButtonColor(color) : 'transparent',
      width: fullWidth ? '100%' : 'auto',
    },
    (disabled || loading) && styles.disabled,
    style,
  ];

  const textStyleCombined: StyleProp<TextStyle> = [
    styles.text,
    styles[`${size}Text`],
    {
      color: getTextColor(),
    },
    textStyle,
  ];

  const renderIcon = (icon: ImageSourcePropType, position: 'left' | 'right') => {
    if (iconPosition !== position) return null;
    
    return (
      <Image
        source={icon}
        style={[
          styles.icon,
          styles[`${size}Icon`],
          position === 'right' && styles.iconRight,
        ]}
      />
    );
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'contained' ? theme.colors.text.inverse : getButtonColor(color)}
        />
      ) : (
        <>
          {prefixIcon && renderIcon(prefixIcon, 'left')}
          {suffixIcon && renderIcon(suffixIcon, 'right')}
          {children && (
            <Text
              variant="button"
              color={variant === 'contained' ? 'inverse' : color}
              style={textStyleCombined}
            >
              {children}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
  },
  
  // Size variants
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 36,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 44,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 52,
  },
  
  // Variant styles
  contained: {
    // Background color is set dynamically
  },
  outlined: {
    backgroundColor: 'transparent',
  },
  text: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  // Text styles
  // text: {
  //   fontWeight: '600',
  // },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  // Icon styles
  icon: {
    marginHorizontal: 8,
  },
  smallIcon: {
    width: 16,
    height: 16,
  },
  mediumIcon: {
    width: 20,
    height: 20,
  },
  largeIcon: {
    width: 24,
    height: 24,
  },
  iconRight: {
    marginLeft: 8,
    marginRight: 0,
  },
  
  // State styles
  disabled: {
    opacity: 0.5,
  },
});

export default Button; 