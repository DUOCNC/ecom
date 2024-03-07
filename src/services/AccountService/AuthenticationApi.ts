import {HttpConfig} from 'config/HttpConfig';
import {ResultConfig} from 'config/ResultConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {Result} from 'model/base/Result';
import {MainStore} from 'reduxs/MainStore';
import {clearProfile, logout} from 'reduxs';
import {AppConfig} from 'config/AppConfig';
import {ChangePasswordRequest} from 'model/request/ChangePasswordRequest';
import {BaseAxios} from 'common';
import {AccountResponse} from 'model';

const updatePasswordApi = (
  request: ChangePasswordRequest,
  onSuccess: () => void,
  onFail: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultError = [
    `${AppConfig.DefaultError} đổi mật khẩu. Vui lòng thử lại sau`,
  ];
  BaseAxios.put(`${ServiceConfig.Account}/user/update-password`, request)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<AccountResponse> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess();
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            MainStore.dispatch(clearProfile());
            break;
          default:
            onFail(result.errors || defaultError);
            break;
        }
      } else {
        onFail(defaultError);
      }
    })
    .finally(() => onFinally && onFinally());
};

export {updatePasswordApi};
