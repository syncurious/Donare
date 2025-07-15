import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '../../assets/icons/homeIcon.png';
import HomeIconFilled from '../../assets/icons/homeIconFilled.png';
import CompassIcon from '../../assets/icons/compassIcon.png';
import CompassIconFilled from '../../assets/icons/compassIconFilled.png';
import DuoIcon from '../../assets/icons/duoIcon.png';
import DuoIconFilled from '../../assets/icons/duoIconFilled.png';
import HeartIcon from '../../assets/icons/heartIcon.png';
import HeartIconFilled from '../../assets/icons/heartIconFilled.png';
import ProfileIcon from '../../assets/icons/profileIcon.png';
import ProfileIconFilled from '../../assets/icons/profileIconFilled.png';
import theme from '../../config/theme';

const TABS = [
  {
    name: 'Home',
    label: 'Home',
    icon: HomeIcon,
    iconActive: HomeIconFilled,
  },
  {
    name: 'Donate',
    label: 'Donate',
    icon: HeartIcon,
    iconActive: HeartIconFilled,
  },
  {
    name: 'Volunteer',
    label: 'Volunteer',
    icon: DuoIcon,
    iconActive: DuoIconFilled,
  },
  {
    name: 'Qibla',
    label: 'Qibla',
    icon: CompassIcon,
    iconActive: CompassIconFilled,
  },
  {
    name: 'Profile',
    label: 'Profile',
    icon: ProfileIcon,
    iconActive: ProfileIconFilled,
  },
];

const BottomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab, idx) => {
        const isFocused = state.index === idx;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[idx].key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };
        return (
          <TouchableOpacity
            key={tab.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={
              descriptors[state.routes[idx].key]?.options
                .tabBarAccessibilityLabel
            }
            testID={
              descriptors[state.routes[idx].key]?.options.tabBarButtonTestID
            }
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <Image
              source={isFocused ? tab.iconActive : tab.icon}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={[styles.label, isFocused && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: '500',
  },
  labelActive: {
    color: theme.colors.text.primary,
    fontWeight: '700',
  },
});

export default BottomNavBar;
