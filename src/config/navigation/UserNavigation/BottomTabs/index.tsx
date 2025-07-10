import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../screens/UserScreens/Home';
import Message from '../../../screens/UserScreens/Messages';
import Notification from '../../../screens/UserScreens/Notification';
import Profile from '../../../screens/UserScreens/Profile';
import {Image} from 'react-native';
import {
  HomeIcon,
  MessageIcon,
  NotificationIcon,
  ProfileIcon,
} from '../../../assets';
import {primary} from '../../../constant/colors';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarStyle: {
          backgroundColor: '#262628',
          height: 70,
          paddingTop: 7,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12,
        },
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: primary,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon({color, focused, size}) {
            return (
              <Image
                source={HomeIcon}
                style={{height: size, width: size}}
                tintColor={color}
                resizeMode="contain"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Message}
        options={{
          tabBarIcon({color, focused, size}) {
            return (
              <Image
                source={MessageIcon}
                style={{height: size, width: size}}
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon({color, focused, size}) {
            return (
              <Image
                source={NotificationIcon}
                style={{height: size, width: size}}
                tintColor={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon({color, focused, size}) {
            return (
              <Image
                source={ProfileIcon}
                style={{height: size, width: size}}
                tintColor={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
