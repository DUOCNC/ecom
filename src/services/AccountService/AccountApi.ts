import {BaseAxios} from 'common';
import {AppConfig} from 'config/AppConfig';
import {HttpConfig} from 'config/HttpConfig';
import {ResultConfig} from 'config/ResultConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {Paging} from 'model/base/Paging';
import {Result} from 'model/base/Result';
import {AccountPublicDto} from 'model/dto/AccountService/AccountPublicDto';
import {MainStore} from 'reduxs/MainStore';
import {clearProfile, logout} from 'reduxs';
import {AccountReasonDeleteResponse} from 'model/responses';

const getPublicAccountsApi = (
  condition: string,
  onSuccess: (accounts: Array<AccountPublicDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách tài khoản. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Account}/accounts/public`, {
    params: {
      condition: condition,
    },
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<AccountPublicDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data.items);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            MainStore.dispatch(clearProfile());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinally && onFinally());
};

const getTicketReasonsApi = (
  onSuccess: (accounts: Array<AccountReasonDeleteResponse>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách lý do xóa tài khoản. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Mobile}/tickets/reasons`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Array<AccountReasonDeleteResponse>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            // MainStore.dispatch(logout());
            // MainStore.dispatch(clearProfile());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinally && onFinally());
};

const getTicketMeApi = (
  onSuccess: (accounts: Array<AccountReasonDeleteResponse>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy ticket xóa account. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Mobile}/ticket/me`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Array<AccountReasonDeleteResponse>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            // MainStore.dispatch(logout());
            // MainStore.dispatch(clearProfile());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinally && onFinally());
};

const deleteTicketMeApi = (
  reason_id: number,
  onSuccess: (accounts: AccountReasonDeleteResponse) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} xóa tài khoản. Vui lòng thử lại sau`,
  ];
  BaseAxios.post(`${ServiceConfig.Mobile}/ticket/me`, {
    reason_id: reason_id,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<AccountReasonDeleteResponse> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            // MainStore.dispatch(logout());
            // MainStore.dispatch(clearProfile());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinally && onFinally());
};
const cancelDeleteTicketMeApi = (
  onSuccess: (accounts: AccountReasonDeleteResponse) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} xóa yêu cầu. Vui lòng thử lại sau`,
  ];
  BaseAxios.delete(`${ServiceConfig.Mobile}/ticket/me`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<AccountReasonDeleteResponse> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            // MainStore.dispatch(logout());
            // MainStore.dispatch(clearProfile());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinally && onFinally());
};

export {
  getPublicAccountsApi,
  getTicketReasonsApi,
  getTicketMeApi,
  deleteTicketMeApi,
  cancelDeleteTicketMeApi,
};
