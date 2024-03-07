import {BaseApi, Result} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {OrderConfigResponse} from '../models';

class OrderApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/order-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getConfig() {
    let url = this.getUrl('orders-config');
    return BaseAxios.get<Result<OrderConfigResponse>>(url);
  }
}

export default OrderApi;
