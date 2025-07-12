import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Text, { TextVariant, TextColor } from '../Text';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  level: HeadingLevel;
  color?: TextColor;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  numberOfLines?: number;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  color = 'primary',
  style,
  children,
  numberOfLines,
  ...props
}) => {
  const getVariant = (level: HeadingLevel): TextVariant => {
    return `h${level}` as TextVariant;
  };

  return (
    <Text
      variant={getVariant(level)}
      color={color}
      style={style}
      numberOfLines={numberOfLines}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Heading; 