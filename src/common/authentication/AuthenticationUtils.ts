import AsyncStorage from '@react-native-async-storage/async-storage';
import {Authentication} from './Authentication';

export default class AuthenticationUtils {
  static Authentication = '@Authentication';

  static async get() {
    let authenticationStorage = await AsyncStorage.getItem(this.Authentication);
    if (authenticationStorage == null) {
      return null;
    }
    let authentication: Authentication = JSON.parse(authenticationStorage);
    return authentication;
  }

  static async save(authentication: Authentication) {
    let authenticationStorage = JSON.stringify(authentication);
    await AsyncStorage.setItem(this.Authentication, authenticationStorage);
  }

  static async remove() {
    await AsyncStorage.removeItem(this.Authentication);
  }
}
