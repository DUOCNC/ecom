import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from 'enums';
import {Platform} from 'react-native';

const COUNTRY_KEY = '@COUNTRY';
const DISTRICT_KEY = '@DISTRICT';
const WARD_KEY = '@WARD';
const STORE_DEFAULT_KEY = '@STORE_DEFAULT';
const TOKEN_KEY = '@TOKEN_KEY';
const REFRESH_TOKEN_KEY = '@REFRESH_TOKEN_KEY';
const USER_NAME_KEY = '@USER_NAME_KEY';

const LocalStorageUtils = {
  setToken: async (token: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  },
  getToken: () => {
    return AsyncStorage.getItem(TOKEN_KEY);
  },
  setUserName: (username: string) => {
    return AsyncStorage.setItem(USER_NAME_KEY, username);
  },
  getUserName: () => {
    return AsyncStorage.getItem(USER_NAME_KEY);
  },
  removeToken: () => {
    return AsyncStorage.removeItem(TOKEN_KEY);
  },
  setRefreshToken: async (token: string) => {
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  getRefreshToken: () => {
    return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  },
  removeRefreshToken: () => {
    return AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  setCountries: async (country: string) => {
    await AsyncStorage.setItem(COUNTRY_KEY, country);
  },
  getCountries: () => {
    return AsyncStorage.getItem(COUNTRY_KEY);
  },
  setDistricts: async (districts: string) => {
    await AsyncStorage.setItem(DISTRICT_KEY, districts);
  },
  getDistricts: () => {
    return AsyncStorage.getItem(DISTRICT_KEY);
  },
  getWards: () => {
    return AsyncStorage.getItem(WARD_KEY);
  },
  setWards: async (wards: string) => {
    await AsyncStorage.setItem(WARD_KEY, wards);
  },
  setStoreDefault: async (storeDefault: string) => {
    await AsyncStorage.setItem(STORE_DEFAULT_KEY, storeDefault);
  },
  getStoreDefault: () => {
    return AsyncStorage.getItem(STORE_DEFAULT_KEY);
  },
  setOnBoard: async (onBoard: string) => {
    await AsyncStorage.setItem(AsyncStorageKey.ON_BOARD, onBoard);
  },
  getOnBoard: () => {
    return AsyncStorage.getItem(AsyncStorageKey.ON_BOARD);
  },
  setFcm: async (fcmToken: string) => {
    await AsyncStorage.setItem(AsyncStorageKey.FCM, fcmToken);
  },
  getFcm: () => {
    return AsyncStorage.getItem(AsyncStorageKey.FCM);
  },
  //Clear toàn bộ AsyncStorage
  clearGlobalEnv: async () => {
    try {
      const asyncStorageKeys = await AsyncStorage.getAllKeys();
      if (asyncStorageKeys.length > 0) {
        if (Platform.OS === 'android') {
          await AsyncStorage.clear();
        }
        if (Platform.OS === 'ios') {
          await AsyncStorage.multiRemove(asyncStorageKeys);
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
};

export default LocalStorageUtils;
