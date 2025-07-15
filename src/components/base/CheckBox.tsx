import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Text from './Text';
import theme from '../../config/theme';

// Placeholder PNGs for checked/unchecked icons (replace with your own)
import checkedPng from '../../assets/icons/checkbox_checked.png';
import uncheckedPng from '../../assets/icons/checkbox_unchecked.png';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onPress,
  label,
  style,
  labelStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Image
        source={checked ? checkedPng : uncheckedPng}
        style={styles.icon}
        resizeMode="contain"
      />
      {label ? (
        <Text variant="body2" style={[styles.label, labelStyle]}>
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  label: {
    marginLeft: 8,
    color: theme.colors.text.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CheckBox; 