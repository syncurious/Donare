import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../../screens/SplashScreen';
import GetStarted from '../../../screens/home/GetStarted';
import LoginScreen from '../../../screens/Auth/Login';
import SignUp from '../../../screens/Auth/SignUp';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
