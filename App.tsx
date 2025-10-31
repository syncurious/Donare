import { Provider } from 'react-redux';
import MainNavigation from './src/config/navigation';
import theme, { ThemeProvider } from './src/config/theme';
import { Platform, StatusBar, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastconfig';
import '@react-native-firebase/app';
import { useEffect } from 'react';
import {
  setupForegroundMessageHandler,
  setupBackgroundMessageHandler,
  getInitialNotification,
  setupNotificationOpenedHandler,
} from './src/utils/firebase';

const App = () => {
  useEffect(() => {
    // Setup Firebase messaging handlers
    const unsubscribeForeground = setupForegroundMessageHandler();
    setupBackgroundMessageHandler();
    setupNotificationOpenedHandler();

    // Check if app was opened from notification (quit state)
    getInitialNotification();

    // Cleanup on unmount
    return () => {
      if (unsubscribeForeground) {
        unsubscribeForeground();
      }
    };
  }, []);

  return (
    <ThemeProvider>
      <View style={{ flex: 1, paddingTop: Platform.OS == 'ios' ? 30 : 0 }}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={theme.colors.primary[500]}
        />
        <Provider store={store}>
          <PersistGate loading={<View />} persistor={persistor}>
            <MainNavigation />
            <Toast config={toastConfig} />
          </PersistGate>
        </Provider>
      </View>
    </ThemeProvider>
  );
};

export default App;
