import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminBottomNavigation from './BottomTabs';
import VolunteerDetailsScreen from '../../../screens/admin/volunteers/VolunteerDetailsScreen';
import RequestDetails from '../../../screens/admin/Request/RequestDetails';

// Add VolunteerDetails type for navigation param
interface VolunteerDetails {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  email: string;
  on_week_days: 'AVAILABLE' | 'NOT_AVAILABLE';
  on_week_ends: 'AVAILABLE' | 'NOT_AVAILABLE';
  skills: string;
  message: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}

type AdminStackParamList = {
  AdminBottomTabs: undefined;
  VolunteerDetails: { volunteer: VolunteerDetails };
  RequestDetails: { requestId: string; request?: any };
};

const Stack = createNativeStackNavigator<AdminStackParamList>();
const AdminNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="AdminBottomTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AdminBottomTabs" component={AdminBottomNavigation} />
      <Stack.Screen
        name="VolunteerDetails"
        component={VolunteerDetailsScreen}
        options={{
          headerShown: true,
          title: 'Volunteer Details',
        }}
      />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{
          headerShown: true,
          title: 'Help Request Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigation;
export type { AdminStackParamList };
