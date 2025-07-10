import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../screens/SplashScreen';

const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  const [isloading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const auth = true;
  // useSelector<any>(state => {
  //   return state?.auth?.isLogin;
  // });
  // useEffect(() => {
  //   if (auth) {
  //     setIsAuth(true);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //     setIsAuth(false);
  //   }
  // }, [auth]);


  return (
    <NavigationContainer>
      {/* {isloading ? (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={() => <SplashScreen onFinish={() => {
            setIsLoading(false);
          }} />} />
        </Stack.Navigator>
      ) : isAuth ? (
        <UserNavigation />
      ) : (
      )} */}
      <AuthNavigation />
    </NavigationContainer>
  );
};

export default MainNavigation;
