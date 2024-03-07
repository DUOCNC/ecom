import {BaseApi, Result} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {RequestDeleteResponse} from '../models';

class MobileApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/mobile-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getTicket() {
    let url = this.getUrl('/ticket/me');
    return BaseAxios.get<Result<RequestDeleteResponse | null>>(url);
  }
}

export default MobileApi;
