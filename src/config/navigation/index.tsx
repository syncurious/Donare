import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

const MainNavigation = () => {
  const isAuth = useSelector((state: RootState) => state?.profile?.profile?.token);
  const isAdmin = useSelector((state: RootState) => state?.profile?.profile?.user?.role);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Small delay to allow redux-persist to rehydrate and prevent navigation crash
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer key={isAuth ? 'authenticated' : 'guest'}>
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
