import {PromotionRequest, PromotionResponse, VariantEntity} from '../models';
import BaseService from './BaseService';
import {PromotionApi} from '../api';
import {Pageable} from 'common';
import {PromotionEntity} from '../models';

class PromotionService extends BaseService {
  private promotionApi: PromotionApi;
  constructor() {
    super();
    this.promotionApi = new PromotionApi();
  }

  private getPromotionsApi(
    request: PromotionRequest,
    onSuccess: (result: Pageable<PromotionResponse>) => void,
  ) {
    this.promotionApi
      .getPromotion(request)
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          return;
        }
        let result = res.data;
        onSuccess(result.data);
      })
      .catch(e => this.handlerCatch(e));
  }

  getPromotions(
    variant: VariantEntity,
    onResult: (promotion: Array<PromotionEntity>) => void,
    store_ids: number | undefined,
  ) {
    this.getPromotionsApi(
      {
        type: 'AUTOMATIC',
        variantId: variant.getId(),
        productId: variant.getProductId(),
        limit: 15,
        page: 1,
        states: 'ACTIVE',
        entitledMethods: 'QUANTITY,FIXED_PRICE',
        store_ids,
        orderType: 'B2C',
      },
      (result: Pageable<PromotionResponse>) => {
        try {
          variant.getRetailPriceValue();

          let entities = result.items.map(item =>
            PromotionEntity.createFromResponse(item),
          );
          entities = entities.sort((a, b) => {
            return (
              a.getPriceAfterDiscountValue(variant.getRetailPriceValue()) -
              b.getPriceAfterDiscountValue(variant.getRetailPriceValue())
            );
          });
          onResult(entities);
        } catch (e) {
          console.log('ERROR', e);
        }
      },
    );
  }
}

const promotionService = new PromotionService();

export default promotionService;
