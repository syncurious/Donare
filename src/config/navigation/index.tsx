import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../../store/auth';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';

const MainNavigation = () => {
  const isAuth = useAuthStore(state => state.isLoggedIn);
  const isAdmin = useAuthStore(state => state.user?.role === 'admin');
  return (
    <NavigationContainer>
      {isAuth ? (
        isAdmin ? (
          <AdminNavigation />
        ) : (
          <UserNavigation />
        )
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default MainNavigation;
