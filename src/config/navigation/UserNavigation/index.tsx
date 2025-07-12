import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./BottomTabs";

const Stack = createNativeStackNavigator();
const UserNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{headerShown: false}}>
      <Stack.Screen name="BottomTabs" component={BottomNavigation} />
    </Stack.Navigator>
  );
};

export default UserNavigation;