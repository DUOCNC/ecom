import {BaseApi, Result, Pageable, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {CreateCustomerRequest} from 'modules/order/models/request/CreateCustomerRequest';
import {CustomerRequest} from '../models/requests';
import {
  CustomerPurchasedSpecificationResponse,
  CustomerResponse,
} from '../models/responses';

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

  getCustomerPurchasedSpecificationApi(id: number) {
    let url = StringUtils.format(
      'admin/v2/customers/purchased-specification/{0}.json',
      id,
    );
    return BaseAxios.get<Result<CustomerPurchasedSpecificationResponse>>(url);
  }
}

export default CustomerApi;
