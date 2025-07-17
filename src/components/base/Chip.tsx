import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Text from './Text';
import { useTheme } from '../../config/theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, selected = false, onPress, style, textStyle, disabled = false }) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        { backgroundColor: selected ? theme.colors.primary[50] : theme.colors.background.secondary, borderColor: selected ? theme.colors.primary[500] : theme.colors.neutral[200] },
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text
        variant="body2"
        style={[
          { color: selected ? theme.colors.primary[600] : theme.colors.text.primary, fontWeight: selected ? '700' : '500' },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Chip; 