import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';

interface HeaderProps {
  title?: string;
  titleAlign?: 'left' | 'center';
  leftIconSource?: ImageSourcePropType;
  onLeftPress?: () => void;
  rightIconSource?: ImageSourcePropType;
  onRightPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Home',
  titleAlign = 'center',
  leftIconSource,
  onLeftPress,
  rightIconSource,
  onRightPress,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {leftIconSource ? (
        <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
          <Image source={leftIconSource} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      <View style={[styles.titleContainer, titleAlign === 'center' && { flex: 1, alignItems: 'center' }]}> 
        <Text style={[styles.title, titleStyle]}>{title}</Text>
      </View>
      {rightIconSource ? (
        <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
          <Image source={rightIconSource} style={styles.icon} resizeMode="contain" />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    // elevation: 2,
    zIndex: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  iconPlaceholder: {
    // width: 36,
    height: 36,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default Header;
