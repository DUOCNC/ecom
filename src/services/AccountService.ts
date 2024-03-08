import {Result} from 'common';
import {MobileApi} from 'api';
import {saveInfo} from 'reduxs';
import BaseService from './BaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppInfo, MobileConfigResponse} from 'model';
import {MainStore} from 'reduxs/MainStore';
import {AsyncStorageKey} from 'enums';

class AccountService extends BaseService {
  private readonly mobileApi: MobileApi;
  constructor() {
    super();
    this.mobileApi = new MobileApi();
  }

  private getConfigApi(
    onSuccess: (result: Result<MobileConfigResponse>) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.mobileApi
      .getConfig()
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          return;
        }
        onSuccess(res.data);
      })
      .catch(e => this.handlerCatch(e));
  }

  private getStorage() {
    AsyncStorage.getItem(AsyncStorageKey.ON_BOARD).then(value => {
      let info: AppInfo = {
        firstLoad: value === null,
      };
      MainStore.dispatch(saveInfo(info));
    });
  }

  getConfig() {
    this.getStorage();
  }
}

const accountService = new AccountService();

export default accountService;
