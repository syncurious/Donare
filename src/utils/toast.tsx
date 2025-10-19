import Toast from 'react-native-toast-message';

export const showToast = (
  status: 'success' | 'error' | 'info',
  message: string,
) => {
  Toast.show({
    type: 'gameToast',
    text1: message,
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
    bottomOffset: 40,
  });
};
