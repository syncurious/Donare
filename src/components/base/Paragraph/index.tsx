import React, { useState, useCallback, useRef } from 'react';
import { StyleProp, TextStyle, TouchableOpacity } from 'react-native';
import Text, { TextVariant, TextColor } from '../Text';
import { useTheme } from '../../../config/theme';

interface ParagraphProps {
  variant?: TextVariant;
  color?: TextColor;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  showSeeMore?: boolean;
  numberOfLines?: number;
  seeMoreText?: string;
  seeLessText?: string;
}

const Paragraph: React.FC<ParagraphProps> = ({
  variant = 'body1',
  color = 'primary',
  style,
  children,
  showSeeMore = false,
  numberOfLines = 2,
  seeMoreText = 'See more',
  seeLessText = 'See less',
  ...props
}) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeMoreOption, setShowSeeMoreOption] = useState(false);
  const hasCheckedLayout = useRef(false);

  const handleTextLayout = useCallback((event: any) => {
    if (showSeeMore && !hasCheckedLayout.current) {
      const shouldShow = event.nativeEvent.lines.length > numberOfLines;
      setShowSeeMoreOption(shouldShow);
      hasCheckedLayout.current = true;
    }
  }, [showSeeMore, numberOfLines]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Reset when children change
  React.useEffect(() => {
    hasCheckedLayout.current = false;
    setShowSeeMoreOption(false);
    setIsExpanded(false);
  }, [children]);

  return (
    <>
      <Text
        variant={variant}
        color={color}
        style={style}
        numberOfLines={showSeeMoreOption && !isExpanded ? numberOfLines : undefined}
        onTextLayout={handleTextLayout}
        {...props}
      >
        {children}
      </Text>
      {showSeeMoreOption && (
        <TouchableOpacity onPress={toggleExpanded} style={{ marginTop: 4 }}>
          <Text
            variant="caption"
            color="primary"
            style={{ color: theme.colors.primary[600] }}
          >
            {isExpanded ? seeLessText : seeMoreText}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Paragraph; 