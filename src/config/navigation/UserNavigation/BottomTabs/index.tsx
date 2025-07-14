import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../../screens/home/Home';
import Header from '../../../../components/base/Header';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        header(props) {
          return <Header titleAlign='left' />;
        },
        animation: 'shift',

      }}
    >
      <Tab.Screen name="Home" component={Home} />
      {/* <Tab.Screen name="Messages" component={HomeScreen} />
      <Tab.Screen name="Notification" component={HomeScreen} />
      <Tab.Screen name="Profile" component={HomeScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
