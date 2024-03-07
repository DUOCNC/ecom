import {BaseApi, Pageable, Result, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {OrderDraftResponse} from 'modules/order/models/responses/OrderDraftResponse';
import {OrderDraftRequest} from 'modules/order/models/request/OrderDraftRequest';
import {OrderYoscanResponse} from 'modules/order/models/responses/OrderYoscanResponse';
import {
  OrderYoscanDetailRequest,
  OrderYoscanRequest,
} from 'modules/order/models/request/OrderYoscanRequest';
import {LogActionResponse} from 'modules/order/models/responses/LogActionResponse';
import {LogActionRequest} from 'modules/order/models/request/LogActionRequest';

class MobileApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/mobile-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  createOrderDraft(request: OrderDraftRequest) {
    let url = this.getUrl('order-scans');
    return BaseAxios.post<Result<OrderDraftResponse>>(url, request);
  }

  getOrderYoscan(params: OrderYoscanRequest) {
    let url = this.getUrl('order-scans');
    return BaseAxios.get<Result<Pageable<OrderYoscanResponse>>>(url, {
      params,
    });
  }

  getOrderYoscanDetail(
    params: OrderYoscanDetailRequest,
    yoscanOrderId: string,
  ) {
    let url = this.getUrl(`order-scans/${yoscanOrderId}`);
    return BaseAxios.get<Result<OrderYoscanResponse>>(url, {
      params,
    });
  }

  logAction(request: LogActionRequest) {
    let url = this.getUrl('action-log');
    return BaseAxios.post<Result<LogActionResponse>>(url, request);
  }

  expiredOrderDraft(barcode: string) {
    let url = this.getUrl(
      StringUtils.format('order-scans/{0}/expired', barcode),
    );
    return BaseAxios.put<Result<OrderDraftResponse>>(url);
  }
}

export default MobileApi;
