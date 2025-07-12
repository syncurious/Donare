import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import { useTheme } from '../../../config/theme';
import Text, { TextColor } from '../Text';

export type LoaderSize = 'small' | 'large';
export type LoaderVariant = 'default' | 'overlay' | 'inline';

interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  color?: TextColor;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  textColor?: TextColor;
  overlayColor?: string;
  overlayOpacity?: number;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'small',
  variant = 'default',
  color = 'primary',
  text,
  style,
  textStyle,
  textColor = 'secondary',
  overlayColor,
  overlayOpacity = 0.5,
  ...props
}) => {
  const { theme } = useTheme();

  const getLoaderColor = (colorType: TextColor): string => {
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
      case 'inverse':
        return theme.colors.text.inverse;
      default:
        return theme.colors.primary[600];
    }
  };

  const getOverlayColor = (): string => {
    if (overlayColor) return overlayColor;
    return theme.colors.background.primary;
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    variant === 'overlay' && [
      styles.overlay,
      {
        backgroundColor: getOverlayColor(),
        opacity: overlayOpacity,
      },
    ],
    variant === 'inline' && styles.inline,
    style,
  ];

  const contentStyle: StyleProp<ViewStyle> = [
    styles.content,
    variant === 'overlay' && styles.overlayContent,
    variant === 'inline' && styles.inlineContent,
  ];

  const renderLoader = () => (
    <ActivityIndicator
      size={size}
      color={getLoaderColor(color)}
      {...props}
    />
  );

  const renderContent = () => (
    <View style={contentStyle}>
      {renderLoader()}
      {text && (
        <Text
          variant="caption"
          color={textColor}
          style={[styles.text, textStyle]}
        >
          {text}
        </Text>
      )}
    </View>
  );

  if (variant === 'overlay') {
    return (
      <View style={containerStyle}>
        {renderContent()}
      </View>
    );
  }

  return (
    <View style={containerStyle}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  inline: {
    flex: 0,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContent: {
    // Additional styles for overlay content if needed
  },
  inlineContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export default Loader; 