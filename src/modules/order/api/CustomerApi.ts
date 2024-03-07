import {BaseApi, Result, Pageable, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {CustomerRequest, CustomerResponse} from '../models';
import {CreateCustomerRequest} from 'modules/order/models/request/CreateCustomerRequest';

class CustomerApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/customer-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getCustomers(request: CustomerRequest) {
    let url = this.getUrl('customers');
    return BaseAxios.get<Result<Pageable<CustomerResponse>>>(url, {
      params: request,
    });
  }

  getCustomer(id: number) {
    let url = this.getUrl(StringUtils.format('customers/{0}', id));
    return BaseAxios.get<Result<CustomerResponse>>(url);
  }

  createCustomer(request: CreateCustomerRequest) {
    let url = this.getUrl('customers');
    return BaseAxios.post<Result<CustomerResponse>>(url, request);
  }
}

export default CustomerApi;
