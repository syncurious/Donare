import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../config/theme';
import Text from '../Text';

export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerOrientation = 'horizontal' | 'vertical';

interface DividerProps {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  color?: string;
  thickness?: number;
  margin?: number | 'none' | 'small' | 'medium' | 'large';
  style?: StyleProp<ViewStyle>;
  text?: string;
  textPosition?: 'left' | 'center' | 'right';
  textStyle?: StyleProp<ViewStyle>;
}

const Divider: React.FC<DividerProps> = ({
  variant = 'solid',
  orientation = 'horizontal',
  color,
  thickness = 1,
  margin = 'medium',
  style,
  text,
  textPosition = 'center',
  textStyle,
  ...props
}) => {
  const { theme } = useTheme();

  const getDividerColor = (): string => {
    if (color) return color;
    return theme.colors.border.primary;
  };

  const getMargin = (): number => {
    switch (margin) {
      case 'none':
        return 0;
      case 'small':
        return theme.spacing[2];
      case 'medium':
        return theme.spacing[4];
      case 'large':
        return theme.spacing[6];
      default:
        return typeof margin === 'number' ? margin : theme.spacing[4];
    }
  };

  const getBorderStyle = () => {
    switch (variant) {
      case 'dashed':
        return { borderStyle: 'dashed' as const };
      case 'dotted':
        return { borderStyle: 'dotted' as const };
      default:
        return {};
    }
  };

  const getDividerStyle = (): StyleProp<ViewStyle> => {
    const baseStyle = {
      backgroundColor: getDividerColor(),
      ...getBorderStyle(),
    };

    if (orientation === 'horizontal') {
      return [
        styles.horizontal,
        {
          height: thickness,
          marginVertical: getMargin(),
        },
        baseStyle,
      ];
    }

    return [
      styles.vertical,
      {
        width: thickness,
        marginHorizontal: getMargin(),
      },
      baseStyle,
    ];
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    orientation === 'horizontal' && styles.horizontalContainer,
    orientation === 'vertical' && styles.verticalContainer,
    style,
  ];

  if (text && orientation === 'horizontal') {
    return (
      <View style={[styles.textContainer, containerStyle]} {...props}>
        <View style={[getDividerStyle(), styles.textDivider]} />
        <Text
          variant="caption"
          color="secondary"
          style={[styles.text, textStyle]}
        >
          {text}
        </Text>
        <View style={[getDividerStyle(), styles.textDivider]} />
      </View>
    );
  }

  return (
    <View style={getDividerStyle()} {...props} />
  );
};

const styles = StyleSheet.create({
  container: {
    // Base container styles
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  horizontal: {
    flex: 1,
  },
  vertical: {
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDivider: {
    flex: 1,
  },
  text: {
    marginHorizontal: 16,
  },
});

export default Divider; 