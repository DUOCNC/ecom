import {ErrorType} from 'common-ui';
import {
  CustomerEntity,
  CustomerRequest,
  CustomerResponse,
} from 'modules/order/models';
import {Pageable} from 'common';
import {CreateCustomerRequest} from 'modules/order/models/request/CreateCustomerRequest';
import {LoyaltyEntity} from '../models/entities';
import {CustomerApi, LoyaltyApi} from '../api';
import BaseService from './BaseService';
import {CustomerPurchasedSpecificationResponse} from '../models/responses';

class CustomerService extends BaseService {
  private readonly customerApi: CustomerApi;
  private readonly loyaltyApi: LoyaltyApi;

  constructor() {
    super();
    this.customerApi = new CustomerApi();
    this.loyaltyApi = new LoyaltyApi();
  }

  private getCustomersApi(
    request: CustomerRequest,
    onSuccess: (result: Pageable<CustomerResponse>) => void,
    onError?: (code: ErrorType, msg: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.customerApi
      .getCustomers(request)
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          return;
        }
        onSuccess && onSuccess(response.data.data);
      })
      .catch(e => this.handlerCatch(e, onError))
      .finally(() => {
        onFinally && onFinally();
      });
  }

  searchCustomer(
    keyword: string,
    page: number,
    beforeCallApi: () => void,
    onSuccess: (
      customers: Array<CustomerEntity>,
      page: number,
      canLoadMore: boolean,
    ) => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally: () => void,
  ) {
    let request: CustomerRequest = {
      request: keyword,
      searchType: 'LIST',
      page: page,
      limit: 10,
    };
    this.getCustomersApi(
      request,
      res => {
        if (res.metadata.total === 0) {
          onError(
            'SearchNotfound',
            'Có vẻ số điện thoại này chưa được đăng ký khách hàng. Tạo mới khách hàng ngay tại đây!',
          );
          return;
        }
        const {metadata} = res;
        let customers = res.items.map(item =>
          CustomerEntity.createFromResponse(item),
        );
        let totalPage = Math.ceil(metadata.total / metadata.limit);
        let rsCanLoadMore = metadata.page + 1 <= totalPage;
        onSuccess(customers, res.metadata.page, rsCanLoadMore);
      },
      onError,
      beforeCallApi,
      onFinally,
    );
  }

  private getCustomerApi(
    id: number,
    onSuccess: (result: CustomerResponse) => void,
    onError?: (code: ErrorType, msg: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.customerApi
      .getCustomer(id)
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          return;
        }
        onSuccess && onSuccess(response.data.data);
      })
      .catch(e => this.handlerCatch(e, onError))
      .finally(() => {
        onFinally && onFinally();
      });
  }

  private createCustomerApi(
    request: CreateCustomerRequest,
    onSuccess: (result: CustomerResponse) => void,
    onError?: (code: ErrorType, msg: string) => void,
    // beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    // beforeCallApi && beforeCallApi();
    this.customerApi
      .createCustomer(request)
      .then(response => {
        if (
          this.notSuccessResult(response.data) &&
          response.data.errors &&
          response.data.errors.length > 0
        ) {
          if (onError) {
            onError('Error', response.data.errors[0]);
          }
          this.handleResponse(response.data);
          return;
        }
        onSuccess && onSuccess(response.data.data);
      })
      .catch(e => {
        return this.handlerCatch(e, onError);
      })
      .finally(() => {
        onFinally && onFinally();
      });
  }

  searchCustomerBarcode(
    keyword: string,
    page: number,
    beforeCallApi: () => void,
    onSuccess: (customer: CustomerEntity) => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    let request: CustomerRequest = {
      request: keyword,
      searchType: 'LIST',
      page: page,
      limit: 10,
    };
    this.getCustomersApi(
      request,
      res => {
        if (res.metadata.total === 0 || res.items.length === 0) {
          onError('SearchNotfound', 'Không tìm thấy người dùng');
          return;
        }
        let customerResponse = res.items[0];
        this.getLoyaltyService(
          customerResponse.id,
          r => {
            customerResponse.customerLevel = r.getLevel();
            customerResponse.customerLevelId = r.getLoyaltyLevelId();
            customerResponse.point = r.getPoint();
            onSuccess(CustomerEntity.createFromResponse(customerResponse));
            return;
          },
          () => {
            let customers = CustomerEntity.createFromResponse(customerResponse);
            onSuccess(customers);
          },
        );
      },
      onError,
      beforeCallApi,
      onFinally,
    );
  }

  getCustomerById(
    customerId: number,
    beforeCallApi: () => void,
    onSuccess: (customers: CustomerEntity) => void,
    onError: (code: ErrorType, msg: string) => void,
  ) {
    this.getCustomerApi(
      customerId,
      res => {
        let customerResponse = res;
        this.getLoyaltyService(
          customerResponse.id,
          r => {
            customerResponse.customerLevel = r.getLevel();
            customerResponse.customerLevelId = r.getLoyaltyLevelId();
            customerResponse.point = r.getPoint();
            onSuccess(CustomerEntity.createFromResponse(customerResponse));
            return;
          },
          () => {
            let customers = CustomerEntity.createFromResponse(res);
            onSuccess(customers);
          },
        );
      },
      onError,
      beforeCallApi,
    );
  }

  createCustomer(
    request: CreateCustomerRequest,
    onSuccess: (customers: CustomerEntity) => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally: () => void,
  ) {
    this.createCustomerApi(
      request,
      res => {
        let customers = CustomerEntity.createFromResponse(res);
        onSuccess(customers);
      },
      onError,
      onFinally,
    );
  }

  private getLoyaltyService(
    customerId: number,
    onSuccess: (res: LoyaltyEntity) => void,
    onError?: (error: string) => void,
  ) {
    this.loyaltyApi
      .getLoyalty(customerId)
      .then(res => {
        if (res.data && res.data.data) {
          const result = new LoyaltyEntity(res.data.data);
          onSuccess(result);
          return;
        }
        onSuccess(LoyaltyEntity.createEmpty());
      })
      .catch(onError && onError);
  }

  getCustomerPurchasedSpecification(
    id: number,
    onSuccess: (data: CustomerPurchasedSpecificationResponse) => void,
    onError: (code: ErrorType, msg: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.customerApi
      .getCustomerPurchasedSpecificationApi(id)
      .then(res => {
        if (res && res.data) {
          onSuccess(res.data.data);
        } else {
          onError('Notfound', 'Không có đặc điểm');
        }
      })
      .catch(e => {
        return this.handlerCatch(e, onError);
      })
      .finally(onFinally);
  }
}

const customerService = new CustomerService();

export default customerService;
