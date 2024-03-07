import BaseService from './BaseService';
import {PromotionApi} from '../api';
import {ErrorType} from 'common-ui';
import {CustomerDiscountEntity} from '../models/entities';

class PromotionService extends BaseService {
  private promotionApi: PromotionApi;
  constructor() {
    super();
    this.promotionApi = new PromotionApi();
  }

  // Chương trình đang có của khách hàng
  getCustomerDiscountCodes(
    customerId: number,
    onSuccess: (discounts: Array<CustomerDiscountEntity>) => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.promotionApi
      .getCustomerDiscountCodes(customerId)
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          return;
        }

        let result = res.data;
        if (result.data && result.data.length === 0) {
          onSuccess([]);
        }
        let customers = result.data.map(e =>
          CustomerDiscountEntity.fromResponse(e),
        );
        onSuccess(customers);
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }
}

const promotionService = new PromotionService();

export default promotionService;
