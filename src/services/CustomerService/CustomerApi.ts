import {ServiceConfig} from 'config/ServiceConfig';
import {CustomerQuery, UserInteractionQuery} from 'model/query/CustomerQuery';
import {BaseAxios} from 'common';
import {Result} from 'model/base/Result';
import {Paging} from 'model/base/Paging';
import {CustomerDto} from 'model/dto/CustomerService/CustomerDto';
import {HttpConfig} from 'config/HttpConfig';
import {AppConfig} from 'config/AppConfig';
import {ResultConfig} from 'config/ResultConfig';
import {MainStore} from 'reduxs/MainStore';
import {logout} from 'reduxs';
import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import {CustomerGroupDto} from 'model/dto/CustomerService/CustomerGroupDto';
import {CustomerRequest} from 'model/request/CustomerRequest';
import {IReactionHistoryRespon} from 'modules/customer/models/responses';
import BaseAxiosUniChat from 'common/base/BaseAxiosUniChat';

const getCustomersApi = (
  query: CustomerQuery,
  onSuccess: (data: Paging<CustomerDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách khách hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Customer}/customers`, {
    params: query,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<CustomerDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          case ResultConfig.Permission:
            onError(['NotPermission']);
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

const getCustomerApi = (
  customer_id: number,
  onSuccess: (data: DetailCustomerDto) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách khách hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Customer}/customers/${customer_id}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<DetailCustomerDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
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

const getCustomerGroupApi = (
  onSuccess: (result: Array<CustomerGroupDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy nhóm khách hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Customer}/customer-groups`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Array<CustomerGroupDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
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

const createCustomerpi = (
  request: CustomerRequest,
  onSuccess: (result: DetailCustomerDto) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} tạo khách hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.post(`${ServiceConfig.Customer}/customers`, request)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<DetailCustomerDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
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

const getUserInteractionApi = (
  query: UserInteractionQuery,
  onSuccess: (data: IReactionHistoryRespon) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách lịch sử tương tác. Vui lòng thử lại sau`,
  ];
  const phones = query.phones;

  if (phones && phones.length > 0) {
    const params = {
      filter: {phones: phones},
      limit: 10,
      page: query.page,
    };
    const queryString = Object.keys(params)
      .map(key => {
        const value = encodeURIComponent(JSON.stringify(params[key]));
        return `${encodeURIComponent(key)}=${value}`;
      })
      .join('&');
    BaseAxiosUniChat.get(`auth/user-interaction?${queryString}`)
      .then(response => {
        if (response.status === HttpConfig.OK) {
          let result: IReactionHistoryRespon = response.data.data;
          onSuccess(result);
        }
      })
      .catch(() => {
        onError(defaultErrors);
      })
      .finally(() => onFinally && onFinally());
  }
};

export {
  getCustomersApi,
  getCustomerApi,
  getCustomerGroupApi,
  createCustomerpi,
  getUserInteractionApi,
};
