import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";


const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={() => <><Text>Home</Text></>} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
