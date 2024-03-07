import Config from 'react-native-config';
import {Platform} from 'react-native';

const AppConfig = {
  BaseUrlV1: Config.API_BASE_URL_V1,
  BaseUrlV2: Config.API_BASE_URL_V2,
  Timeout: Config.API_TIME_OUT,
  DefaultError: 'Có lỗi khi gọi api ',
  CONTENT_TIME_EXPIRE: 1000 * 60 * 60 * 24 * 30 * 12,
  MaxLimit: 10,
  UrlFe: Config.URL_FE,
  Currency: 'VND',
  Point: 1000,
  hotline: '0888464258',
  MaxSuggestPrice: 2000000,
  JumpPrice: 50000,
  Version: parseInt(Config.APP_VERSION ? Config.APP_VERSION : '1', 10),
  OS: Platform.select({ios: 'IOS', android: 'ANDROID', default: ''}),
  StoreMaxDistance: 30,
  minValueChart: 0,
  CDN_YODY: Config.CDN_YODY,
  clientId: Config.CLIENT_ID ? Config.CLIENT_ID : 'unicorn-internal-app',
  issuer: Config.ISSUER ?? '',
  clientSecret: Config.CLIENT_SECRET
    ? Config.CLIENT_SECRET
    : 'Y9xWXGL1cBBoMF8tNt76pqfK9aHjkOxg',
  redirectUrl: Config.REDIRECT_URL ?? '',
  keyCloakUrl: Config.KEYCLOAK_URL ? Config.KEYCLOAK_URL : 'https://id.yody.vn',
  realm: Config.REALM ? Config.REALM : 'yody-dev',
  appVersion: 'v2',
  BasePegasusUrl: Config.API_BASE_PEGASUS_URL,
  UniChatApi: Config.REACT_APP_UNICHAT_API,
  CDN: Config.REACT_APP_CDN ?? 'https://dev-unicorn.yodycdn.com',
};

export {AppConfig};
