/**
 * @format
 */

import {Platform, AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/vi-VN');
}

messaging().setBackgroundMessageHandler(async message => {
  console.log(message);
});

AppRegistry.registerComponent(appName, () => App);
