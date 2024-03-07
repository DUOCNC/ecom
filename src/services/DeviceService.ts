import {NetInfoState} from '@react-native-community/netinfo';
import {connectionConnected, connectionDisconnected} from 'reduxs';
import {MainStore} from 'reduxs/MainStore';
import BaseService from './BaseService';

class DeviceService extends BaseService {
  constructor() {
    super();
  }
  handleNetwork(state: NetInfoState) {
    let networkConnect = state.isInternetReachable;
    if (networkConnect == null) {
      networkConnect = false;
    }
    if (!networkConnect) {
      MainStore.dispatch(connectionDisconnected());
      return;
    }
    MainStore.dispatch(connectionConnected(state.type));
  }
}

const deviceService = new DeviceService();

export default deviceService;
