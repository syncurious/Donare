import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../../screens/home/Home';
import { Donate, Volunteer } from '../../../../screens/home';
import Header from '../../../../components/base/Header';
import BottomNavBar from '../../../../components/base/BottomNavBar';
import Profile from '../../../../screens/profile';
import Qibla from '../../../../screens/qibla';
import AdminDashboard from '../../../../screens/admin/dashboard';
import AdminVolunteerApplications from '../../../../screens/admin/volunteers';
import HelpRequest from '../../../../screens/home/HelpRequest';
import DonationHistory from '../../../../screens/profile/DonationHistory';

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
      <Tab.Screen name="VolunteersList" component={AdminVolunteerApplications} />
      <Tab.Screen name="HelpRequest" component={HelpRequest} />
      <Tab.Screen name="DonationList" component={DonationHistory} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigation;
