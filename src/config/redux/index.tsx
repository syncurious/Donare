import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistReducers = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
  reducer: {
    auth: persistReducers,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export {store, persistor};
