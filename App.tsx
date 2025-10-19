import { Provider } from 'react-redux';
import MainNavigation from './src/config/navigation';
import theme, { ThemeProvider } from './src/config/theme';
import { Platform, StatusBar, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/toastconfig';

const App = () => {
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
