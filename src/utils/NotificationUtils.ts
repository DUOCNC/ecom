import messaging from '@react-native-firebase/messaging';
import LocalStorageUtils from './LocalStorageUtils';
import {PermissionsAndroid, Platform} from 'react-native';
import notificationService from 'modules/notification/service/NotificationService';
import DeviceInfo from 'react-native-device-info';

// request permission for notification message
export const requestUserPermission = async (code: string) => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (Platform.OS === 'ios' && enabled) {
    getFcmToken();
    return;
  }
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      'android.permission.POST_NOTIFICATIONS',
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getFcmToken();
      return;
    }
  }
};

// get fcmToken to send notification
export const getFcmToken = async () => {
  let fcmToken = await LocalStorageUtils.getFcm();
  if (!fcmToken) {
    try {
      const token = await messaging().getToken();
      const name = await DeviceInfo.getDeviceName();
      if (token) {
        //save token, fake api
        notificationService.saveFCMToken(
          {
            deviceName: name,
            token: token,
          },
          () => {},
          () => {},
        );
        LocalStorageUtils.setFcm(token);
      }
    } catch (error) {
      console.log(`Can not get fcm token ${error}`);
    }
  }
};
