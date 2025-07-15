import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabs';
import VolunteerFrom from '../../../screens/home/VolunteerFrom';

const Stack = createNativeStackNavigator();
const UserNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomNavigation} />
      <Stack.Screen
        name="VolunteerForm"
        options={{
          animation: 'slide_from_bottom',
          headerShown: true,
          title: 'Volunteer Form',
        }}
        component={VolunteerFrom}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
