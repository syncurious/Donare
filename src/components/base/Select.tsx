import React from 'react';
import { TouchableOpacity, View, StyleSheet, TextStyle, ViewStyle, Image } from 'react-native';
import Text from './Text';
import { useTheme } from '../../config/theme';

interface SelectProps {
  label?: string;
  value?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const arrowIcon = require('../../assets/icons/checkbox_checked.png'); // Use a right/chevron icon from your assets

const Select: React.FC<SelectProps> = ({
  label,
  value,
  placeholder = 'Select...',
  error,
  disabled = false,
  onPress,
  style,
  inputStyle,
}) => {
  const { theme } = useTheme();
  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text variant="caption" color={error ? 'error' : 'secondary'} style={styles.label}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: disabled ? theme.colors.neutral[100] : '#F2F2F5', borderColor: error ? theme.colors.error[600] : 'transparent' },
        ]}
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text
          variant="body1"
          color={value ? 'primary' : 'tertiary'}
          style={[styles.value, inputStyle]}
        >
          {value || placeholder}
        </Text>
        <Image source={arrowIcon} style={styles.icon} />
      </TouchableOpacity>
      {error && (
        <Text variant="caption" color="error" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 48,
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#6B7582',
    marginLeft: 8,
  },
  error: {
    marginTop: 4,
  },
});

export default Select; 