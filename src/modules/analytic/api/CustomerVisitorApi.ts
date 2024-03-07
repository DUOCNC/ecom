import {BaseApi, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {CustomerVisitorResponse} from '../models';
import {CustomerVisitorDetailResponse} from '../models/responses';

class CustomerVisitorApi extends BaseApi {
  private readonly BaseUrlApi = '/api';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  get(query: string) {
    let url = this.getUrl(
      StringUtils.format('customer-visitors/key-drivers/sum?{0}', query),
    );
    return BaseAxios.get<Array<CustomerVisitorResponse>>(url, {
      timeout: 3 * 60 * 1000,
    });
  }

  getDetail(query: string) {
    let url = this.getUrl(StringUtils.format('customer-visitors?{0}', query));
    return BaseAxios.get<Array<CustomerVisitorDetailResponse>>(url, {
      timeout: 3 * 60 * 1000,
    });
  }
}

export default CustomerVisitorApi;
