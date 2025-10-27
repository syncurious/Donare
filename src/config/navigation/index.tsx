import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const MainNavigation = () => {
  const isAuth = useSelector((state: RootState) => state?.profile?.profile?.token);
  const isAdmin = useSelector((state: RootState) => state?.profile?.profile?.user?.role);

  return (
    <NavigationContainer>
      {isAuth ? (
        isAdmin === 'admin' ? (
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
