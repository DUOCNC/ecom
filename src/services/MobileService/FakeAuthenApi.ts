import {BaseAxios} from 'common';
import {HttpConfig} from 'config/HttpConfig';
import {ResultConfig} from 'config/ResultConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {Result} from 'model/base/Result';
import {UserFakeDto} from 'model/dto/MobileService/UserFakeDto';
import {LoginRequest} from 'model/request/LoginRequest';
import {RegisterRequest} from 'model/request/RegisterRequest';

const fakeRegister = (
  register: RegisterRequest,
  onSuccess: (user: UserFakeDto) => void,
  onError: (error: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = ['Có lỗi khi sử dụng api đăng ký. Vui lòng thử lại sau'];
  BaseAxios.post(`${ServiceConfig.Mobile}/public/register`, register)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<UserFakeDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .finally(() => onFinally && onFinally());
};

const fakeLogin = (
  register: LoginRequest,
  onSuccess: (user: UserFakeDto) => void,
  onError: (error: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = ['Có lỗi khi sử dụng api đăng ký. Vui lòng thử lại sau'];
  BaseAxios.post(`${ServiceConfig.Mobile}/public/login`, register)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<UserFakeDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .finally(() => onFinally && onFinally());
};

export {fakeRegister, fakeLogin};
