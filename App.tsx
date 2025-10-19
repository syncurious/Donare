import { Provider } from 'react-redux';
import MainNavigation from './src/config/navigation';
import theme, { ThemeProvider } from './src/config/theme';
import { Platform, StatusBar, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';

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
          </PersistGate>
        </Provider>
      </View>
    </ThemeProvider>
  );
};

export default App;
