import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../../screens/home/Home';
import { Donate, Volunteer } from '../../../../screens/home';
import Header from '../../../../components/base/Header';
import BottomNavBar from '../../../../components/base/BottomNavBar';
import Profile from '../../../../screens/profile';
import Qibla from '../../../../screens/qibla';
import AdminDashboard from '../../../../screens/admin/dashboard';

// Placeholder screens for other tabs
const Placeholder = ({ label }: { label: string }) => (
  <Header titleAlign="left" title={label} />
);

const Tab = createBottomTabNavigator();
const AdminBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        animation: 'shift',
      }}
      tabBar={props => <BottomNavBar {...props} />}
    >
      <Tab.Screen name="Dashboard" component={AdminDashboard} />
      <Tab.Screen name="ManageUsers" component={() => <Placeholder label="Manage Users" />} />
      <Tab.Screen name="Settings" component={() => <Placeholder label="Settings" />} />
      <Tab.Screen name="Reports" component={() => <Placeholder label="Reports" />} />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigation;
