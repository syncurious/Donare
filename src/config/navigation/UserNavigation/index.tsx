import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomTabs';
import Chat from '../../screens/UserScreens/Chat';
import Filter from '../../screens/UserScreens/Filter';
import UserProfile from '../../screens/UserScreens/UserProfile';
import EditProfile from '../../screens/UserScreens/EditProfile';
import ProfileSetup from '../../screens/UserScreens/ProfileSetup';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Trial from '../../screens/UserScreens/Trial';
import Subscription from '../../screens/UserScreens/Subscription';
import Thanks from '../../screens/UserScreens/Thanks';
import WebViewScreen from '../../screens/UserScreens/WebView';
import Setting from '../../screens/UserScreens/Setting';
import IncomingCallScreen from '../../screens/UserScreens/Calls/incoming';
import OngoingCallScreen from '../../screens/UserScreens/Calls/ongoing';
import OutgoingCallScreen from '../../screens/UserScreens/Calls/outgoing';

const Stack = createNativeStackNavigator();
const UserNavigation = () => {
  const [profileCreate, setProfileCreated] = useState<string | null>(null);
  const isProfile = useSelector<any>(state => state?.auth?.isProfileComplete);

  useEffect(() => {
    const isPro = isProfile ? 'Bottom' : 'ProfileSetup';
    setProfileCreated(isPro);
  }, [isProfile]);

  if (profileCreate === null) {
    return null;
  }
  return (
    <Stack.Navigator
      initialRouteName={profileCreate}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Bottom" component={BottomNavigation} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Filter" component={Filter} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Trial" component={Trial} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="Thanks" component={Thanks} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
      <Stack.Screen name="PaymentSuccess" component={Thanks} />
      <Stack.Screen name="PaymentCancel" component={Subscription} />
      <Stack.Screen name="IncomingCallScreen" component={IncomingCallScreen} />
      <Stack.Screen name="OngoingCallScreen" component={OngoingCallScreen} />
      <Stack.Screen name="OutgoingCallScreen" component={OutgoingCallScreen} />
    </Stack.Navigator>
  );
};

export default UserNavigation;
