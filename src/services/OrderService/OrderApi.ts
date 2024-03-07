import {OrderConfigDto} from 'model/dto/OrderService/OrderConfigDto';
import {AppConfig} from 'config/AppConfig';
import {HttpConfig} from 'config/HttpConfig';
import {ResultConfig} from 'config/ResultConfig';
import {ServiceConfig} from 'config/ServiceConfig';
import {Result} from 'model/base/Result';
import {OrderDto} from 'model/dto/OrderService/OrderDto';
import {OrderQuery} from 'model/query/OrderQuery';
import {OrderRequest} from 'model/request/OrderRequest';
import {MainStore} from 'reduxs/MainStore';
import {clearProfile, logout} from 'reduxs';
import {Paging} from 'model/base/Paging';
import {OrderSearchDto} from 'model/dto/OrderService/OrderSearchDto';
import {OrderHistoryQuery} from 'model/query/OrderHistoryQuery';
import {OrderReturnQuery} from 'model/query/OrderReturnQuery';
import {OrderReturnSearchDto} from 'model/dto/OrderService/OrderReturnSearchDto';
import {OrderReturnDto} from 'model/dto/OrderService/OrderReturnDto';
import {OrderHistoryDto} from 'model/dto/OrderService/OrderHistoryDto';
import {OrderTrackingLogDto} from 'model/dto/OrderService/OrderTrackingLogDto';
import {BaseAxios} from 'common';

const createOrderApi = (
  request: OrderRequest,
  onSuccess: (result: OrderDto) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} tạo đơn hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.post(`${ServiceConfig.Order}/orders`, request)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<OrderDto> = response.data;
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
    .finally(() => {
      onFinally && onFinally();
    });
};

const getOrdersApi = (
  query: OrderQuery,
  onSuccess: (result: Paging<OrderSearchDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} danh sách đơn hàng. Vui lòng thử lại sau`,
  ];
  if (query.sub_status_code === 'all') {
    query = {...query, sub_status_code: undefined};
  }
  if (query.store_ids) {
    query = {
      ...query,
      store_and_financial_store: query.store_ids[0],
      store_ids: undefined,
    };
  }
  BaseAxios.get(`${ServiceConfig.Order}/orders`, {
    params: query,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<OrderSearchDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(clearProfile());
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
    .finally(() => {
      onFinally && onFinally();
    });
};

const getOrderReturnsApi = (
  query: OrderReturnQuery,
  onSuccess: (result: Paging<OrderReturnSearchDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} danh sách đơn hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Order}/orders/returns`, {
    params: query,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<OrderReturnSearchDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(clearProfile());
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
    .finally(() => {
      onFinally && onFinally();
    });
};

const getOrderHistoriesApi = (
  query: OrderHistoryQuery,
  onSuccess: (result: Paging<OrderHistoryDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} danh sách đơn hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Order}/order-histories`, {
    params: query,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<OrderHistoryDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
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
    .finally(() => {
      onFinally && onFinally();
    });
};

const getOrderDetailApi = (
  id: number,
  onSuccess: (result: OrderDto) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} danh sách đơn hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Order}/orders/${id}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<OrderDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
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
    .finally(() => {
      onFinally && onFinally();
    });
};

const getConfigOrderApi = (
  onSuccess: (result: OrderConfigDto) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} danh sách đơn hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Order}/orders-config`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<OrderConfigDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
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
    .finally(() => {
      onFinally && onFinally();
    });
};

const getOrderReturnApi = (
  id: number,
  onSuccess: (result: OrderReturnDto) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} chi tiết đơn trả. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Order}/orders/returns/${id}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<OrderReturnDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
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
    .finally(() => {
      onFinally && onFinally();
    });
};

const getOrderTrackingLogApi = (
  fulfillmentCode: string,
  onSuccess: (result: Array<OrderTrackingLogDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinally?: () => void,
) => {
  const defaultErrors = [
    `${AppConfig.DefaultError} thông tin vận chuyển. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(
    `${ServiceConfig.Order}/shipping/${fulfillmentCode}/tracking-log`,
  )
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Array<OrderTrackingLogDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(
              result.data.sort(
                (a, b) =>
                  new Date(b.createdDate).getTime() -
                  new Date(a.createdDate).getTime(),
              ),
            );
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(clearProfile());
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
    .finally(() => {
      onFinally && onFinally();
    });
};

export {
  createOrderApi,
  getOrdersApi,
  getOrderHistoriesApi,
  getOrderDetailApi,
  getConfigOrderApi,
  getOrderReturnsApi,
  getOrderReturnApi,
  getOrderTrackingLogApi,
};
