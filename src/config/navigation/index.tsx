import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';

const MainNavigation = () => {
  const isAuth = useSelector((state: RootState) => state?.profile?.profile?.token);
  const isAdmin = useSelector((state: RootState) => state?.profile?.profile?.user?.role);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevAuthRef = useRef(isAuth);

  useEffect(() => {
    // Small delay to allow redux-persist to rehydrate and prevent navigation crash
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Detect auth state change
    if (prevAuthRef.current !== isAuth) {
      setIsTransitioning(true);
      
      // Allow time for current navigation to unmount cleanly
      const transitionTimer = setTimeout(() => {
        setIsTransitioning(false);
        prevAuthRef.current = isAuth;
      }, 150);

      return () => clearTimeout(transitionTimer);
    }
  }, [isAuth]);

  if (!isReady || isTransitioning) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
