import {BaseApi, StringUtils, BaseAxios} from 'common';
import {CustomerVisitorRequest, CustomerVisitorResponse} from '../models';

class CustomerVisitorApi extends BaseApi {
  private readonly BaseUrlApi = '/api';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  get(query: string) {
    let url = this.getUrl(StringUtils.format('customer-visitors?{0}', query));
    return BaseAxios.get<Array<CustomerVisitorResponse>>(url, {
      timeout: 3 * 60 * 1000,
    });
  }

  post(request: CustomerVisitorRequest) {
    let url = this.getUrl('customer-visitors');
    return BaseAxios.post<CustomerVisitorResponse>(url, request, {
      timeout: 3 * 60 * 1000,
    });
  }
}

export default CustomerVisitorApi;
