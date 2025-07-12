import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';

const MainNavigation = () => {
  const isAuth = true;
  return (
    <NavigationContainer>
      {isAuth ? <UserNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default MainNavigation;
