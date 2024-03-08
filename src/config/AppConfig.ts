import Config from 'react-native-config';
import {Platform} from 'react-native';

const AppConfig = {
  Timeout: Config.API_TIME_OUT,
  DefaultError: 'Có lỗi khi gọi api ',
  CONTENT_TIME_EXPIRE: 1000 * 60 * 60 * 24 * 30 * 12,
  MaxLimit: 10,
  hotline: '0961284899',
  Version: parseInt(Config.APP_VERSION ? Config.APP_VERSION : '1', 10),
  OS: Platform.select({ios: 'IOS', android: 'ANDROID', default: ''}),
  BaseUrl: Config.API_BASE_URL,
  AppID: Config.API_APP_ID ?? '0FBE6E70-150C-4730-81D0-9C073F1B45A3',
  Token: Config.API_TOKEN,
};

export {AppConfig};
