import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../../screens/SplashScreen';
import GetStarted from '../../../screens/home/GetStarted';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <Stack.Screen name="GetStarted" component={GetStarted} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
