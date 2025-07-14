import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../../screens/SplashScreen';
import GetStarted from '../../../screens/home/GetStarted';
import Login from '../../../screens/home/Login';
import SignUp from '../../../screens/home/SignUp';

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
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
