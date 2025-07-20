import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminBottomNavigation from './BottomTabs';


type AdminStackParamList = {
  AdminBottomTabs: undefined;
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
     
    </Stack.Navigator>
  );
};

export default AdminNavigation;
export type { AdminStackParamList };
