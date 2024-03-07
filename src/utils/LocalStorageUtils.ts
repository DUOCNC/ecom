import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from 'enums';

const COUNTRY_KEY = '@COUNTRY';
const DISTRICT_KEY = '@DISTRICT';
const WARD_KEY = '@WARD';
const STORE_DEFAULT_KEY = '@STORE_DEFAULT';

const LocalStorageUtils = {
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
  setOnBoardReport: async (onBoard: string) => {
    await AsyncStorage.setItem(AsyncStorageKey.ON_BOARD_REPORT, onBoard);
  },
  getOnBoardReport: () => {
    return AsyncStorage.getItem(AsyncStorageKey.ON_BOARD_REPORT);
  },
  setFcm: async (fcmToken: string) => {
    await AsyncStorage.setItem(AsyncStorageKey.FCM, fcmToken);
  },
  getFcm: () => {
    return AsyncStorage.getItem(AsyncStorageKey.FCM);
  },
  setYoScanOrders: async (orders: string) => {
    await AsyncStorage.setItem(AsyncStorageKey.YOSCAN_ORDER, orders);
  },
  getYoScanOrders: () => {
    return AsyncStorage.getItem(AsyncStorageKey.YOSCAN_ORDER);
  },
  setTabOrderActive: async (tab: string) => {
    await AsyncStorage.setItem(AsyncStorageKey.TAB_ORDER_ACTIVE, tab);
  },
  getTabOrderActive: () => {
    return AsyncStorage.getItem(AsyncStorageKey.TAB_ORDER_ACTIVE);
  },
};

export default LocalStorageUtils;
