import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../../store/auth';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';

const MainNavigation = () => {
  const isAuth = useAuthStore((state) => state.isLoggedIn);
  return (
    <NavigationContainer>
      {isAuth ? <UserNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default MainNavigation;
