import { PermissionsAndroid, Platform, Alert } from 'react-native';
import messaging, {
  AuthorizationStatus,
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { showToast } from './toast';

/**
 * Request notification permission for Firebase messaging
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    // Request POST_NOTIFICATIONS permission for Android 13+
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('POST_NOTIFICATIONS permission denied');
        return false;
      }
    }

    // Request Firebase messaging permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === AuthorizationStatus.AUTHORIZED ||
      authStatus === AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted:', authStatus);
      return true;
    } else {
      console.log('Notification permission denied');
      return false;
    }
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

/**
 * Get FCM token for the device
 */
export const getFcmToken = async (): Promise<string | null> => {
  try {
    const token = await messaging().getToken();
    console.log('🔥 FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

/**
 * Initialize Firebase messaging and get token
 */
export const initializeFirebaseMessaging = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      console.log('No notification permission, cannot get FCM token');
      return null;
    }

    const token = await getFcmToken();
    return token;
  } catch (error) {
    console.error('Error initializing Firebase messaging:', error);
    return null;
  }
};

/**
 * Set up foreground message handler
 */
export const setupForegroundMessageHandler = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('Received foreground message:', remoteMessage);
    showToast('info', remoteMessage.notification?.title || 'New Message');
  });

  return unsubscribe;
};

/**
 * Set up background message handler (should be called at app level)
 */
export const setupBackgroundMessageHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

/**
 * Get initial notification from app quit state
 */
export const getInitialNotification =
  async (): Promise<FirebaseMessagingTypes.RemoteMessage | null> => {
    try {
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log('App opened from quit state:', initialNotification);
      }
      return initialNotification;
    } catch (error) {
      console.error('Error getting initial notification:', error);
      return null;
    }
  };

/**
 * Handle notification when app is in background
 */
export const setupNotificationOpenedHandler = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('App opened from background state:', remoteMessage);
    // Handle navigation or other actions based on the notification
  });
};
