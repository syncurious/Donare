import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  RefreshControl,
  StatusBar,
  StatusBarStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTheme } from '../../../config/theme';

export type ContainerVariant = 'default' | 'card' | 'elevated' | 'outlined';

interface ContainerProps {
  children?: React.ReactNode;
  variant?: ContainerVariant;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  refreshControl?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
  padding?: number | 'none' | 'small' | 'medium' | 'large';
  margin?: number | 'none' | 'small' | 'medium' | 'large';
  backgroundColor?: string;
  borderRadius?: number;
  elevation?: number;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  statusBarStyle?: StatusBarStyle;
  statusBarHidden?: boolean;
  statusBarBackgroundColor?: string;
  statusBarTranslucent?: boolean;
  keyboardAvoidingView?: boolean;
  keyboardAvoidingViewBehavior?: 'height' | 'position' | 'padding';
}

const Container: React.FC<ContainerProps> = ({
  children,
  variant = 'default',
  style,
  contentContainerStyle,
  scrollable = false,
  horizontal = false,
  showsVerticalScrollIndicator = true,
  showsHorizontalScrollIndicator = false,
  refreshControl = false,
  onRefresh,
  refreshing = false,
  padding = 'medium',
  margin = 'none',
  backgroundColor,
  borderRadius,
  elevation = 0,
  shadowColor,
  shadowOffset,
  shadowOpacity,
  shadowRadius,
  statusBarStyle = 'dark-content',
  statusBarHidden = false,
  statusBarBackgroundColor,
  statusBarTranslucent = false,
  keyboardAvoidingView = false,
  keyboardAvoidingViewBehavior = Platform.OS === 'ios' ? 'padding' : 'height',
  ...props
}) => {
  const { theme } = useTheme();

  const getPadding = (): number => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return theme.spacing[4];
      case 'medium':
        return theme.spacing[6];
      case 'large':
        return theme.spacing[8];
      default:
        return typeof padding === 'number' ? padding : theme.spacing[6];
    }
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
        return typeof margin === 'number' ? margin : 0;
    }
  };

  const getBackgroundColor = (): string => {
    if (backgroundColor) return backgroundColor;
    
    switch (variant) {
      case 'card':
        return theme.colors.background.secondary;
      case 'elevated':
        return theme.colors.background.secondary;
      case 'outlined':
        return theme.colors.background.primary;
      default:
        return theme.colors.background.primary;
    }
  };

  const getBorderRadius = (): number => {
    if (borderRadius !== undefined) return borderRadius;
    
    switch (variant) {
      case 'card':
      case 'elevated':
        return theme.borderRadius.lg;
      case 'outlined':
        return theme.borderRadius.base;
      default:
        return 0;
    }
  };

  const getShadowStyle = () => {
    if (variant === 'elevated' || elevation > 0) {
      return {
        shadowColor: shadowColor || theme.colors.shadow.primary,
        shadowOffset: shadowOffset || { width: 0, height: 2 },
        shadowOpacity: shadowOpacity || 0.1,
        shadowRadius: shadowRadius || 4,
        elevation: elevation || 4,
      };
    }
    return {};
  };

  const getBorderStyle = () => {
    if (variant === 'outlined') {
      return {
        borderWidth: 1,
        borderColor: theme.colors.border.primary,
      };
    }
    return {};
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    {
      padding: getPadding(),
      margin: getMargin(),
      backgroundColor: getBackgroundColor(),
      borderRadius: getBorderRadius(),
      ...getShadowStyle(),
      ...getBorderStyle(),
    },
    style,
  ];

  const contentStyle: StyleProp<ViewStyle> = [
    styles.content,
    contentContainerStyle,
  ];

  const renderStatusBar = () => {
    if (statusBarHidden) return null;
    
    return (
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={statusBarBackgroundColor}
        translucent={statusBarTranslucent}
      />
    );
  };

  const renderRefreshControl = () => {
    if (!refreshControl || !onRefresh) return undefined;
    
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        tintColor={theme.colors.primary[600]}
        colors={[theme.colors.primary[600]]}
        progressBackgroundColor={theme.colors.background.primary}
        progressViewOffset={0}
      />
    );
  };

  if (scrollable) {
    const scrollView = (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={contentStyle}
        horizontal={horizontal}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        refreshControl={renderRefreshControl()}
        keyboardShouldPersistTaps="handled"
        {...props}
      >
        {children}
      </ScrollView>
    );

    if (keyboardAvoidingView) {
      return (
        <>
          {renderStatusBar()}
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={keyboardAvoidingViewBehavior}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            {scrollView}
          </KeyboardAvoidingView>
        </>
      );
    }

    return (
      <>
        {renderStatusBar()}
        {scrollView}
      </>
    );
  }

  return (
    <>
      {renderStatusBar()}
      <View style={containerStyle} {...props}>
        <View style={contentStyle}>
          {children}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default Container; 