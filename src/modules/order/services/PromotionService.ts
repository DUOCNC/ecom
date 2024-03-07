import {VariantEntity} from '../models';
import BaseService from './BaseService';
import {PromotionApi} from '../api';
import {Pageable} from 'common';
import {PromotionResponse} from '../models/responses';
import {PromotionRequest} from '../models/request';
import {DiscountItemEntity} from '../models/entities';
import {ErrorType} from 'common-ui';
import CustomerDiscountEntity from '../models/entities/CustomerDiscountEntity';

class PromotionService extends BaseService {
  private promotionApi: PromotionApi;
  constructor() {
    super();
    this.promotionApi = new PromotionApi();
  }

  private getPromotionsApi(
    request: PromotionRequest,
    onSuccess: (
      result: Pageable<PromotionResponse>,
      page: number,
      canLoadMore: boolean,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    this.promotionApi
      .getPromotion(request)
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          return;
        }

        let result = res.data;
        let metadata = result.data.metadata;
        if (metadata.total === 0) {
          onError(
            'SearchNotfound',
            'Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác',
          );
          return;
        }
        let totalPage = Math.ceil(metadata.total / metadata.limit);
        let canLoadMore = metadata.page + 1 <= totalPage;
        onSuccess(result.data, metadata.page, canLoadMore);
      })
      .catch(e => this.handlerCatch(e))
      .finally(onFinally);
  }

  getDiscountItems(
    request: Partial<PromotionRequest>,
    variant: VariantEntity,
    onResult: (
      promotion: Array<DiscountItemEntity>,
      page: number,
      canLoadMore: boolean,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.getPromotionsApi(
      {
        type: 'AUTOMATIC',
        variantId: variant.getId(),
        productId: variant.getProductId(),
        limit: 15,
        page: request.page,
        states: 'ACTIVE',
        query: request.query,
      },
      (result: Pageable<PromotionResponse>, page, canLoadMore) => {
        variant.getRetailPriceValue();
        let entities = result.items.map(item =>
          DiscountItemEntity.createFromResponse(item),
        );
        entities = entities.sort((a, b) => {
          return (
            a.getPriceAfterDiscountValue(variant.getRetailPriceValue()) -
            b.getPriceAfterDiscountValue(variant.getRetailPriceValue())
          );
        });
        onResult(entities, page, canLoadMore);
      },
      onError,
      onFinally,
    );
  }

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
