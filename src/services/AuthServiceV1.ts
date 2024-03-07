import {AccountApi, CoreApi, MobileApi} from 'api';
import BaseService from './BaseService';
import {LoginRequest} from 'model/request/LoginRequest';
import {
  AccountResponse,
  AccountResponseV2,
  LoginResponse,
  StoreResponse,
} from 'model/responses';
import {
  AccountProvider,
  Location,
  LocationSelectedProvider,
} from 'model/providers';
import {Result} from 'common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageKey} from 'enums';
import {LocationStorage} from 'model';
import {ErrorType} from 'common-ui';
import {AppConfig} from 'config/AppConfig';

class AuthServiceV1 extends BaseService {
  private readonly accountApi: AccountApi;
  private readonly mobileApi: MobileApi;
  private readonly coreApi: CoreApi;
  constructor() {
    super();
    this.accountApi = new AccountApi();
    this.mobileApi = new MobileApi();
    this.coreApi = new CoreApi();
  }

  private fakeLoginApi(
    login: LoginRequest,
    onSuccess: () => void,
    onError: (msg: string) => void,
  ) {
    this.mobileApi
      .fakeLogin(login)
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          return;
        }
        onSuccess && onSuccess();
      })
      .catch(() => {
        onError('Có lỗi vui lòng thử lại sau');
      });
  }

  private getProfileApi(
    onSuccess: (result: AccountResponse) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.accountApi
      .getProfile()
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          onError && onError('Error', '');
          return;
        }
        onSuccess(res.data.data);
      })
      .catch(e => this.handlerCatch(e, onError));
  }

  private getProfileApi2(
    onSuccess: (result: AccountResponseV2) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.accountApi
      .getProfileV2()
      .then(res => {
        onSuccess(res.data);
      })
      .catch(e => this.handlerCatch(e, onError));
  }

  private loginApi(
    login: LoginRequest,
    onSuccess: (response: LoginResponse) => void,
    onError: (msg: string) => void,
  ) {
    this.accountApi
      .postLoginApi(login)
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          onError(
            response.data.errors
              ? response.data.errors[0]
              : 'Có lỗi vui lòng thử lại sau',
          );
          return;
        }
        onSuccess(response.data.data);
      })
      .catch(() => {
        onError('Có lỗi vui lòng thử lại sau');
      });
  }

  login(
    request: LoginRequest,
    beforeRequest: () => void,
    onSuccess: (token: string, refreshToken: string) => void,
    onError: (nsg: string) => void,
  ) {
    beforeRequest();
    this.fakeLoginApi(
      request,
      () => {
        this.loginApi(
          request,
          r => {
            onSuccess(r.accessToken, r.refreshToken);
          },
          onError,
        );
      },
      onError,
    );
  }

  getProfile(
    onSuccess: (account: AccountProvider) => void,
    onError: (code: ErrorType, msg: string) => void,
  ) {
    if (AppConfig.appVersion === 'v1') {
      this.getProfileApi(
        response => {
          onSuccess(AccountProvider.createV1(response));
        },
        () => {},
        onError,
      );
      return;
    }
    this.getProfileApi2(
      response => {
        onSuccess(AccountProvider.createV2(response));
      },
      () => {},
      onError,
    );
  }

  private getStoreApi(
    onSuccess: (result: Result<Array<StoreResponse>>) => void,
    onError?: (code: ErrorType, msg: string) => void,
  ) {
    this.coreApi
      .getStores()
      .then(res => {
        onSuccess(res.data);
      })
      .catch(e => {
        this.handlerCatch(e, onError);
      });
  }

  getStores(
    onSuccess: (result: Array<Location>) => void,
    onError: (msg: string) => void,
  ) {
    this.getStoreApi(
      res => {
        if (this.notSuccessResult(res)) {
          this.handleResponse(res);
          return;
        }
        const stores = res.data.map(store => Location.createV1(store));
        onSuccess(stores);
      },
      (errorCode, msg) => onError(msg),
    );
  }

  getSelectedInfo(
    code: string,
    onSelected: (locationSelected: LocationSelectedProvider) => void,
  ) {
    AsyncStorage.getItem(AsyncStorageKey.STORE_ACTIVATED).then(value => {
      let location: LocationSelectedProvider = {
        supported: false,
        locationId: -1,
        locationName: 'Tất cả cửa hàng',
        selected: false,
        departmentId: null,
      };
      if (value === null) {
        onSelected(location);
        return;
      }
      let locationStorage: LocationStorage = JSON.parse(value);
      let index = locationStorage.locations.findIndex(
        item => item.code === code,
      );
      if (index === -1) {
        onSelected(location);
        return;
      }
      onSelected(locationStorage.locations[index].location);
    });
  }

  setSelectedInfo(code: string, location: LocationSelectedProvider) {
    AsyncStorage.getItem(AsyncStorageKey.STORE_ACTIVATED).then(value => {
      let locationStorage: LocationStorage = {
        locations: [],
      };
      if (value !== null) {
        let storeActiveStorageTemp: LocationStorage = JSON.parse(value);
        locationStorage = storeActiveStorageTemp;
      }
      let index = locationStorage.locations.findIndex(
        item => item.code === code,
      );
      if (index === -1) {
        locationStorage.locations.push({
          code: code,
          location: location,
        });
        AsyncStorage.setItem(
          AsyncStorageKey.STORE_ACTIVATED,
          JSON.stringify(locationStorage),
        );
        return;
      }
      locationStorage.locations[index].location = location;
      AsyncStorage.setItem(
        AsyncStorageKey.STORE_ACTIVATED,
        JSON.stringify(locationStorage),
      );
    });
  }
}

const authServiceV1 = new AuthServiceV1();

export default authServiceV1;
