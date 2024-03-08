import {HttpConfig} from 'config/HttpConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {LoginRequest} from 'model/request/LoginRequest';
import {AppConfig} from 'config/AppConfig';
import {BaseAxios} from 'common';
import {LoginResponse} from 'model/responses';
import {AccountResponse} from 'model/responses/AccountResponse';
import {BaseResponse} from 'model/base/BaseResponse';

const loginApi = (
  request: LoginRequest,
  onSuccess: (res: LoginResponse) => void,
  onFail: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  request.appid = AppConfig.AppID;
  request.deviceinfo = '';
  return BaseAxios.get(`${ServiceConfig.Account}/Login`, {params: request})
    .then(response => {
      if (response.status === HttpConfig.OK) {
        const data: LoginResponse = response.data;
        if (data.messenger) {
          onFail([data.messenger]);
        } else {
          onSuccess(data);
        }
      } else {
        onFail([`${AppConfig.DefaultError} trong quá trình đăng nhập`]);
      }
    })
    .catch(() => {
      onFail([`${AppConfig.DefaultError} trong quá trình đăng nhập`]);
    })
    .finally(() => onFinally && onFinally());
};

const profileApi = (
  first: boolean,
  username: string,
  onSuccess: (dto: AccountResponse) => void,
  onFail: (errors: Array<string>) => void,
) => {
  let defaultError = [`${AppConfig.DefaultError} lấy thông tin người dùng`];
  BaseAxios.get(`${ServiceConfig.Account}/GetUserInfo`, {
    params: {username: username, appid: AppConfig.AppID},
  })
    .then(response => {
      let result: BaseResponse<AccountResponse> = response.data;
      if (result.ResponseStatus === 'OK') {
        onSuccess(result.ResponseData);
      } else {
        onFail([result.ResponseMessenger]);
      }
    })
    .catch(() => {
      onFail(defaultError);
    });
};

const logoutApi = (onLogout: () => void) => {
  BaseAxios.post(`${ServiceConfig.Account}/logout`).finally(() => {
    onLogout();
  });
};

export {loginApi, logoutApi, profileApi};
