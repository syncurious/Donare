import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminBottomNavigation from './BottomTabs';
import VolunteerDetailsScreen from '../../../screens/admin/volunteers/VolunteerDetailsScreen';
import RequestDetails from '../../../screens/admin/RequestDetails';

// Add VolunteerDetails type for navigation param
interface VolunteerDetails {
  name: string;
  email: string;
  phone: string;
  joined: string;
  skills: string[];
  availability: { label: string; value: string }[];
}

type AdminStackParamList = {
  AdminBottomTabs: undefined;
  VolunteerDetails: { volunteer: VolunteerDetails };
  RequestDetails: { requestId: string };
};

const Stack = createNativeStackNavigator<AdminStackParamList>();
const AdminNavigation = () => {
  return (
    <Stack.Navigator
      // initialRouteName="BottomTabs"
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
