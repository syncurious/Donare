import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabs';
import VolunteerFrom from '../../../screens/home/VolunteerFrom';
import BenefitsZakat from '../../../screens/home/BenefitsZakat';
import BenefitsSadaqah from '../../../screens/home/BenefitsSadaqah';
import BenefitsFidyah from '../../../screens/home/BenefitsFidyah';
import BenefitsKaffarah from '../../../screens/home/BenefitsKaffarah';

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
      <Stack.Screen
        name="BenefitsZakat"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Zakat Benefits',
        }}
        component={BenefitsZakat}
      />
      <Stack.Screen
        name="BenefitsSadaqah"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Sadaqah Benefits',
        }}
        component={BenefitsSadaqah}
      />
      <Stack.Screen
        name="BenefitsFidyah"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Fidyah Benefits',
        }}
        component={BenefitsFidyah}
      />
      <Stack.Screen
        name="BenefitsKaffarah"
        options={{
          animation: 'slide_from_right',
          headerShown: true,
          title: 'Kaffarah Benefits',
        }}
        component={BenefitsKaffarah}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
