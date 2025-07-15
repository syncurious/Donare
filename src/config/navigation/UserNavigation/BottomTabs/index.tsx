import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../../screens/home/Home';
import { Donate, Volunteer } from '../../../../screens/home';
import Header from '../../../../components/base/Header';
import BottomNavBar from '../../../../components/base/BottomNavBar';

// Placeholder screens for other tabs
const Placeholder = ({ label }: { label: string }) => (
  <Header titleAlign="left" title={label} />
);

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'shift',
      }}
      tabBar={props => <BottomNavBar {...props} />}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Donate" component={Donate} />
      <Tab.Screen name="Volunteer" component={Volunteer} />
      <Tab.Screen
        name="Qibla"
        children={() => <Placeholder label="Qibla" />}
      />
      <Tab.Screen
        name="Profile"
        children={() => <Placeholder label="Profile" />}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
