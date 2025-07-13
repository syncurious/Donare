import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';

const MainNavigation = () => {
  const isAuth = false;
  return (
    <NavigationContainer>
      {isAuth ? <UserNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default MainNavigation;
