import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavBar from '../../../../components/base/BottomNavBar';
import AdminDashboard from '../../../../screens/admin/dashboard';
import AdminVolunteerApplications from '../../../../screens/admin/volunteers';
import DonationHistory from '../../../../screens/admin/donation/DonationHistory';
import HelpRequest from '../../../../screens/admin/Request/HelpRequest';
import AdminProfile from '../../../../screens/admin/profile';


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
      <Tab.Screen
        name="VolunteersList"
        component={AdminVolunteerApplications}
      />
      <Tab.Screen name="HelpRequest" component={HelpRequest} />
      <Tab.Screen name="DonationList" component={DonationHistory} />
      <Tab.Screen name="Profile" component={AdminProfile} />
    </Tab.Navigator>
  );
};

export default AdminBottomNavigation;
