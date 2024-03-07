import {BaseAxios} from 'common';
import {AppConfig} from 'config/AppConfig';
import {HttpConfig} from 'config/HttpConfig';
import {ResultConfig} from 'config/ResultConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {Result} from 'model/base/Result';
import {LoyaltyDto} from 'model/dto/LoyaltyService/LoyaltyDto';
import {OrderLoyaltyDto} from 'model/dto/LoyaltyService/OrderLoyaltyDto';
import {MainStore} from 'reduxs/MainStore';
import {clearProfile, logout} from 'reduxs';

const getLoyaltyCustomer = (
  customer_id: number,
  onSuccess: (result: LoyaltyDto) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy thông tin khách hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(
    `${ServiceConfig.Loyalty}/loyalty-points/customer/${customer_id}`,
  )
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<LoyaltyDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(clearProfile());
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

const calculateLoyaltyPointApi = (
  customer_id: number,
  order_id: number,
  onSuccess: (result: Array<OrderLoyaltyDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy thông tin khách hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(
    `${ServiceConfig.Loyalty}/loyalty-points/customer/${customer_id}/order/${order_id}/calculate-variant-point`,
  )
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Array<OrderLoyaltyDto>> = response.data;
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

export {getLoyaltyCustomer, calculateLoyaltyPointApi};
