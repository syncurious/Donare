import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
