import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image,
  ImageSourcePropType,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../../config/theme';
import Text, { TextColor } from '../Text';

export type InputVariant = 'outlined' | 'filled' | 'standard';
export type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  helperText?: string;
  variant?: InputVariant;
  size?: InputSize;
  color?: TextColor;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  errorStyle?: StyleProp<TextStyle>;
  helperStyle?: StyleProp<TextStyle>;
  prefixIcon?: ImageSourcePropType;
  suffixIcon?: ImageSourcePropType;
  iconPosition?: 'left' | 'right';
  onIconPress?: () => void;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  onEndEditing?: () => void;
  onSelectionChange?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onScroll?: (event: any) => void;
  onContentSizeChange?: (event: any) => void;
  onLayout?: (event: any) => void;
  blurOnSubmit?: boolean;
  clearButtonMode?: TextInputProps['clearButtonMode'];
  clearTextOnFocus?: boolean;
  contextMenuHidden?: boolean;
  dataDetectorTypes?: TextInputProps['dataDetectorTypes'];
  editable?: boolean;
  enablesReturnKeyAutomatically?: boolean;
  importantForAccessibility?: TextInputProps['importantForAccessibility'];
  inlineImageLeft?: string;
  inlineImagePadding?: number;
  lineBreakMode?: TextInputProps['lineBreakModeIOS'];
  maxFontSizeMultiplier?: number;
  multiline?: boolean;
  numberOfLines?: number;
  placeholderTextColor?: string;
  rejectResponderTermination?: boolean;
  scrollEnabled?: boolean;
  selectTextOnFocus?: boolean;
  selection?: { start: number; end?: number };
  selectionColor?: string;
  spellCheck?: boolean;
  textAlign?: TextInputProps['textAlign'];
  textAlignVertical?: TextInputProps['textAlignVertical'];
  underlineColorAndroid?: string;
}

interface InputRef {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  isFocused: () => boolean;
  setNativeProps: (nativeProps: object) => void;
}

const Input = forwardRef<InputRef, InputProps>(({
  label,
  placeholder,
  value,
  defaultValue,
  error,
  helperText,
  variant = 'outlined',
  size = 'medium',
  color = 'primary',
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  helperStyle,
  prefixIcon,
  suffixIcon,
  iconPosition = 'left',
  onIconPress,
  required = false,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  autoComplete,
  textContentType,
  returnKeyType = 'default',
  onSubmitEditing,
  onFocus,
  onBlur,
  onChangeText,
  onEndEditing,
  onSelectionChange,
  onKeyPress,
  onScroll,
  onContentSizeChange,
  onLayout,
  blurOnSubmit = true,
  clearButtonMode,
  clearTextOnFocus = false,
  contextMenuHidden = false,
  dataDetectorTypes,
  editable = true,
  enablesReturnKeyAutomatically = false,
  importantForAccessibility,
  inlineImageLeft,
  inlineImagePadding,
  lineBreakMode,
  maxFontSizeMultiplier,
  placeholderTextColor,
  rejectResponderTermination = false,
  scrollEnabled = true,
  selectTextOnFocus = false,
  selection,
  selectionColor,
  spellCheck = true,
  textAlign = 'left',
  textAlignVertical = 'auto',
  underlineColorAndroid,
  ...props
}, ref) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || defaultValue || '');

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  const getInputColor = (colorType: TextColor): string => {
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

  const getBorderColor = (): string => {
    if (error) return theme.colors.error[600];
    if (isFocused) return getInputColor(color);
    return theme.colors.border.primary;
  };

  const getBackgroundColor = (): string => {
    if (disabled) return theme.colors.neutral[100];
    if (variant === 'filled') return theme.colors.neutral[50];
    return theme.colors.background.secondary;
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    styles[size],
    styles[variant],
    {
      borderColor: getBorderColor(),
      backgroundColor: getBackgroundColor(),
    },
    disabled && styles.disabled,
    style,
  ];

  const inputStyleCombined: StyleProp<TextStyle> = [
    styles.input,
    styles[`${size}Input`],
    {
      color: disabled ? theme.colors.text.tertiary : theme.colors.text.primary,
      backgroundColor: 'transparent',
    },
    prefixIcon && iconPosition === 'left' ? styles.inputWithLeftIcon : null,
    suffixIcon && iconPosition === 'right' ? styles.inputWithRightIcon : null,
    inputStyle,
  ];

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  const renderIcon = (icon: ImageSourcePropType, position: 'left' | 'right') => {
    if (iconPosition !== position) return null;
    
    return (
      <View style={[
        styles.iconContainer,
        position === 'left' ? styles.leftIcon : styles.rightIcon,
      ]}>
        <Image
          source={icon}
          style={[
            styles.icon,
            styles[`${size}Icon`],
          ]}
        />
      </View>
    );
  };

  useImperativeHandle(ref, () => ({
    focus: () => {},
    blur: () => {},
    clear: () => setInputValue(''),
    isFocused: () => isFocused,
    setNativeProps: () => {},
  }));

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text
          variant="caption"
          color={error ? 'error' : isFocused ? color : 'secondary'}
          style={[styles.label, labelStyle]}
        >
          {label}
          {required && <Text color="error"> *</Text>}
        </Text>
      )}
      
      <View style={containerStyle}>
        {prefixIcon && renderIcon(prefixIcon, 'left')}
        
        <TextInput
          style={inputStyleCombined}
          value={inputValue}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || theme.colors.text.tertiary}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onEndEditing={onEndEditing}
          onSelectionChange={onSelectionChange}
          onKeyPress={onKeyPress}
          onScroll={onScroll}
          onContentSizeChange={onContentSizeChange}
          onLayout={onLayout}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          autoComplete={autoComplete}
          textContentType={textContentType}
          returnKeyType={returnKeyType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          maxFontSizeMultiplier={maxFontSizeMultiplier}
          blurOnSubmit={blurOnSubmit}
          clearButtonMode={clearButtonMode}
          clearTextOnFocus={clearTextOnFocus}
          contextMenuHidden={contextMenuHidden}
          dataDetectorTypes={dataDetectorTypes}
          editable={editable && !disabled}
          enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
          importantForAccessibility={importantForAccessibility}
          inlineImageLeft={inlineImageLeft}
          inlineImagePadding={inlineImagePadding}
          lineBreakModeIOS={lineBreakMode}
          rejectResponderTermination={rejectResponderTermination}
          scrollEnabled={scrollEnabled}
          selectTextOnFocus={selectTextOnFocus}
          selection={selection}
          selectionColor={selectionColor || getInputColor(color)}
          spellCheck={spellCheck}
          textAlign={textAlign}
          textAlignVertical={textAlignVertical}
          underlineColorAndroid={underlineColorAndroid}
          {...props}
        />
        
        {suffixIcon && renderIcon(suffixIcon, 'right')}
      </View>
      
      {(error || helperText) && (
        <Text
          variant="caption"
          color={error ? 'error' : 'secondary'}
          style={[styles.helperText, error ? errorStyle : helperStyle]}
        >
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    position: 'relative',
  },
  
  // Size variants
  small: {
    minHeight: 40,
    paddingHorizontal: 12,
  },
  medium: {
    minHeight: 48,
    paddingHorizontal: 16,
  },
  large: {
    minHeight: 56,
    paddingHorizontal: 20,
  },
  
  // Variant styles
  outlined: {
    // Border is handled dynamically
  },
  filled: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
  },
  standard: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  
  // Input styles
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  smallInput: {
    fontSize: 14,
    paddingVertical: 8,
  },
  mediumInput: {
    fontSize: 16,
    paddingVertical: 12,
  },
  largeInput: {
    fontSize: 18,
    paddingVertical: 16,
  },
  
  // Icon styles
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  icon: {
    // Icon size is handled by size variants
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
  
  // Input with icons
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  
  // Label and helper text
  label: {
    marginBottom: 4,
  },
  helperText: {
    marginTop: 4,
  },
  
  // State styles
  disabled: {
    opacity: 0.6,
  },
});

Input.displayName = 'Input';

export default Input; 