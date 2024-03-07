import {ErrorType} from 'common-ui';
import {MainStore} from 'reduxs/MainStore';
import {MobileApi, OrderApi, PromotionApi} from '../api';
import {
  CustomerEntity,
  OrderEntity,
  OrderLineEntity,
  VariantQueryRequest,
} from '../models';
import {DiscountItemEntity} from '../models/entities';
import {DiscountItemRequest} from '../models/request';
import {
  AppliedDiscountRequest,
  DiscountRequest,
} from '../models/request/PromotionRequest';
import {saveOrderConfig} from '../redux';
import BaseService from './BaseService';
import productService from './ProductService';
import {SuggestedDiscountEntity} from 'modules/order/models/entities';
import {DiscountItemResponse, DiscountResponse} from '../models/responses';
import {OrderDraftRequest} from 'modules/order/models/request/OrderDraftRequest';
import {OrderDraftResponse} from 'modules/order/models/responses/OrderDraftResponse';
import ApplyDiscountEntity from 'modules/order/models/entities/ApplyDiscountEntity';
import {
  GiftProgramItemRequest,
  GiftProgramRequest,
} from 'modules/order/models/request/GiftProgramRequest';
import {LineItemType, SalesChannelName} from 'modules/order/enums/Promotion';
import {GiftProgramResponse} from 'modules/order/models/responses/GiftProgramResponse';
import {GiftProgramEntity} from 'modules/order/models/entities/GiftProgramEntity';
import {
  OrderYoscanDetailRequest,
  OrderYoscanRequest,
} from 'modules/order/models/request/OrderYoscanRequest';
import {OrderYoscanResponse} from 'modules/order/models/responses/OrderYoscanResponse';
import {OrderYoscanEntity} from 'modules/order/models/entities/OrderYoscanEntity';
import {Metadata} from 'model/base/Metadata';
import {LogActionRequest} from 'modules/order/models/request/LogActionRequest';
import {LogActionResponse} from 'modules/order/models/responses/LogActionResponse';
import LogActionEntity from 'modules/order/models/entities/LogActionEntity';

class OrderService extends BaseService {
  private readonly orderConfigApi: OrderApi;
  private readonly promotionApi: PromotionApi;
  private readonly mobileApi: MobileApi;

  constructor() {
    super();
    this.orderConfigApi = new OrderApi();
    this.promotionApi = new PromotionApi();
    this.mobileApi = new MobileApi();
  }

  addCustomer(order: OrderEntity, customer: CustomerEntity) {
    let newOrder = OrderEntity.clone(order);
    newOrder.addCustomer(customer);
    return newOrder;
  }

  updateDiscountInfo(
    order: OrderEntity,
    discountInfo: SuggestedDiscountEntity,
  ) {
    let newOrder = OrderEntity.clone(order);
    newOrder.setSuggestedDiscountsEntity([discountInfo]);
    return newOrder;
  }

  clearCustomer(order: OrderEntity) {
    if (order.emptyCustomer()) {
      return order;
    }
    let newOrder = OrderEntity.clone(order);
    newOrder.clearCustomer();
    return newOrder;
  }

  updateNote(order: OrderEntity, note: string) {
    let newOrder = OrderEntity.clone(order);
    newOrder.setNote(note);
    return newOrder;
  }

  addOrderItem(order: OrderEntity, item: OrderLineEntity, position: number) {
    const newOrder = OrderEntity.clone(order);
    item.setPosition(position);
    newOrder.addLineItem(item);
    return newOrder;
  }

  updateLineItem(order: OrderEntity, item: OrderLineEntity, index: number) {
    const newOrder = OrderEntity.clone(order);
    newOrder.updateLineItem(index, item);
    return newOrder;
  }

  changeQuantity(orderLine: OrderLineEntity, newQuantity: number) {
    const newOrderLine = OrderLineEntity.clone(orderLine);
    newOrderLine.setQuantity(newQuantity);
    return newOrderLine;
  }

  private findLineItem(order: OrderEntity, index: number) {
    return order.getLineItems()[index];
  }

  getOrderConfig() {
    this.orderConfigApi
      .getConfig()
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          return;
        }
        MainStore.dispatch(saveOrderConfig(res.data.data));
      })
      .catch(error => this.handlerCatch(error));
  }

  clearLineItem(order: OrderEntity, index: number) {
    if (order.emptyLineItems()) {
      return order;
    }
    let newOrder = OrderEntity.clone(order);
    newOrder.removeLineItemByIndex(index);
    return newOrder;
  }

  clearLineItemByVariantId(order: OrderEntity, variantIds: Array<number>) {
    if (order.emptyLineItems()) {
      return order;
    }
    let newOrder = OrderEntity.clone(order);
    variantIds.forEach(variantId => {
      newOrder.removeLineItemByVariantId(variantId);
    });
    return newOrder;
  }

  changeQuantityLineItem(
    order: OrderEntity,
    newQuantity: number,
    index: number,
  ) {
    const lineItem = order.getLineItemByIndex(index);
    lineItem.setQuantity(newQuantity);
    let newOrder = OrderEntity.clone(order);
    newOrder.updateLineItem(index, lineItem);
    return newOrder;
  }

  getGifts(
    storeIds: Array<number>,
    variantQuery: VariantQueryRequest,
    beforeCallApi: () => void,
    onSuccess: (
      orderLines: Array<OrderLineEntity>,
      page: number,
      canLoadMore: boolean,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi();
    productService.getVariants(
      storeIds,
      {
        page: variantQuery.page,
        limit: variantQuery.limit,
        info: variantQuery.info,
        saleable: true,
      },
      beforeCallApi,
      (variantEntities, page, canLoadMore) => {
        let orderLines: Array<OrderLineEntity> = [];
        if (variantEntities.length > 0) {
          for (let i = 0; i < variantEntities.length; i++) {
            const orderLine = OrderLineEntity.create(variantEntities[i]);
            orderLines.push(orderLine);
          }
        }
        onSuccess(orderLines, page, canLoadMore);
      },
      onError,
      onFinally,
    );
  }

  updateGifts(orderLine: OrderLineEntity, gifts: Array<OrderLineEntity>) {
    orderLine.setGifts(gifts);
    const newOrderLine = OrderLineEntity.clone(orderLine);
    return newOrderLine;
  }

  changeQuantityGift(
    orderLine: OrderLineEntity,
    newQuantity: number,
    index: number,
  ) {
    const gift = orderLine.findGiftByIndex(index);
    gift.setQuantity(newQuantity);
    return this.updateGift(orderLine, gift, index);
  }

  updateGift(
    orgOrderLine: OrderLineEntity,
    gift: OrderLineEntity,
    index: number,
  ) {
    const newOrderLine = OrderLineEntity.clone(orgOrderLine);
    if (gift.getQuantityValue() === 0) {
      newOrderLine.removeGift(index);
      return newOrderLine;
    }
    newOrderLine.updateGift(gift, index);
    return newOrderLine;
  }

  //promotion
  getSuggestedDiscounts(
    order: OrderEntity,
    lineItem: OrderLineEntity,
    onResult: (discountItemEntity: DiscountItemEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const request = this.getRequest(order, [lineItem]);
    this.promotionApi
      .getSuggestedDiscounts(request)
      .then(result => {
        if (result.data) {
          const discountItem = DiscountItemEntity.createFromResponse(
            result.data.data.lineItems[0],
          );
          if (discountItem.getSuggestedDiscounts().length > 0) {
            onResult(discountItem);
          } else {
            onError('SearchNotfound', 'Không có chương trình khuyến mãi nào');
          }
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }

  getCoupons(
    order: OrderEntity,
    lineItem: OrderLineEntity,
    keyword: string,
    onResult: (discountItemEntity: DiscountItemEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const request = this.getRequest(order, [lineItem], keyword);
    this.promotionApi
      .getSuggestedDiscounts(request)
      .then(result => {
        if (result.data) {
          const discountItem = DiscountItemEntity.createFromResponse(
            result.data.data.lineItems[0],
          );
          onResult(discountItem);
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }

  getDiscountOrder(
    order: OrderEntity,
    onResult: (
      discountItemEntityList: Array<
        SuggestedDiscountEntity | ApplyDiscountEntity
      >,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
    couponCode?: string,
  ) {
    beforeCallApi && beforeCallApi();
    const request = order.buildRequestApplyCoupon(couponCode);
    this.promotionApi
      .getSuggestedDiscounts(request)
      .then(result => {
        if (
          request.appliedDiscount &&
          result.data &&
          result.data.data &&
          result.data.data.appliedDiscount
        ) {
          const appliedDiscount = ApplyDiscountEntity.createFromResponse(
            result.data.data.appliedDiscount,
          );
          onResult([appliedDiscount]);
          return;
        } else if (
          result.data &&
          result.data.data &&
          result.data.data.suggestedDiscounts
        ) {
          if (result.data.data.suggestedDiscounts.length > 0) {
            const discountsList = result.data.data.suggestedDiscounts.map(
              item => {
                return SuggestedDiscountEntity.createFromResponse(item);
              },
            );
            onResult(discountsList);
            return;
          } else {
            onError('SearchNotfound', 'Không có chương trình khuyến mãi nào');
            return;
          }
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }

  private getRequest(
    order: OrderEntity,
    lineItems: Array<OrderLineEntity>,
    keyword?: string,
  ) {
    let discountRequest: DiscountRequest = {
      orderId: null,
      lineItems: [],
      salesChannelName: 'POS',
      customerId: order.getCustomer()?.getCustomerIdValue(),
      customerLevelId: order.getCustomer()?.getCustomerLevelId(),
      storeId: order.getStoreId(),
      orderSourceId: 1,
    };
    let appliedDiscountRequest: AppliedDiscountRequest | null = null;
    if (keyword) {
      appliedDiscountRequest = {code: keyword.toUpperCase()};
    }
    if (lineItems && lineItems.length > 0) {
      discountRequest.lineItems = lineItems.map(
        lineItem =>
          ({
            keyword: null,
            searchType: null,
            originalUnitPrice: lineItem.getVariant().getRetailPriceValue(),
            productId: lineItem.getVariant().getProductId(),
            quantity: lineItem.getQuantityValue(),
            sku: lineItem.getSku(),
            variantId: lineItem.getVariantId(),
            appliedDiscount: appliedDiscountRequest,
          } as DiscountItemRequest),
      );
    }
    return discountRequest;
  }

  private getSuggestedDiscountsApi(
    order: OrderEntity,
    lineItem: Array<OrderLineEntity>,
    onResult: (discountResponse: DiscountResponse) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const request = this.getRequest(order, lineItem);
    this.promotionApi
      .getSuggestedDiscounts(request)
      .then(result => {
        if (result.data) {
          onResult(result.data.data);
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }

  private getOrderYoscanApi(
    params: OrderYoscanRequest,
    onResult: (
      orderYoscanResponse: Array<OrderYoscanResponse>,
      metaData: Metadata,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.mobileApi
      .getOrderYoscan(params)
      .then(result => {
        if (result.data) {
          onResult(result.data.data.items, result.data.data.metadata);
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(() => {
        onFinally && onFinally();
      });
  }

  private getOrderYoscanDetailApi(
    params: OrderYoscanDetailRequest,
    yoscanOrderId: string,
    onResult: (orderYoscanResponse: OrderYoscanResponse) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.mobileApi
      .getOrderYoscanDetail(params, yoscanOrderId)
      .then(result => {
        if (result.data) {
          onResult(result.data.data);
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(() => {
        onFinally && onFinally();
      });
  }

  getOrderYoscan(
    params: OrderYoscanRequest,
    beforeCallApi: () => void,
    onSuccess: (
      orderYoscanEntities: Array<OrderYoscanEntity>,
      metaData: Metadata,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi();
    this.getOrderYoscanApi(
      params,
      (res, metaData) => {
        let orderYoscanEntities = res.map(item => new OrderYoscanEntity(item));
        onSuccess(orderYoscanEntities, metaData);
      },
      onError,
      beforeCallApi,
      onFinally,
    );
  }

  getOrderYoscanDetail(
    params: OrderYoscanDetailRequest,
    yoscanOrderId: string,
    beforeCallApi: () => void,
    onSuccess: (orderYoscanEntities: OrderYoscanEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi();
    this.getOrderYoscanDetailApi(
      params,
      yoscanOrderId,
      res => {
        onSuccess(new OrderYoscanEntity(res));
      },
      onError,
      beforeCallApi,
      onFinally,
    );
  }

  // ================ GIFT PROGRAM LINE INDEX  ============== START
  private getGiftProgramRequestWithLineIndex(
    order: OrderEntity,
    lineItems: Array<OrderLineEntity>,
    lineItemSelected: OrderLineEntity,
    lineIndex: number,
  ) {
    let giftProgramRequest: GiftProgramRequest = {
      orderId: null,
      customerId: null,
      lineItems: [],
      salesChannelName: SalesChannelName.POS,
      storeId: order.getStoreId(),
      orderSourceId: 1,
    };
    let isExist = false;
    if (lineItems && lineItems.length > 0) {
      giftProgramRequest.lineItems = lineItems.map((lineItem, index) => {
        // Kiểm tra nếu variant đã chọn sẵn thì thay thế type thành GIFT
        let type = lineItem.getType().toUpperCase();
        let lineAmountAfterLineDiscount =
          lineItem.getPriceValue() * lineItem.getQuantity();

        if (
          lineItemSelected.getVariantId() === lineItem.getVariantId() &&
          lineIndex === index
        ) {
          type = LineItemType.GIFT;
          lineAmountAfterLineDiscount = 0;
          isExist = true;
        }
        return {
          originalUnitPrice: lineItem.getVariant().getRetailPriceValue(),
          productId: lineItem.getVariant().getProductId(),
          quantity: lineItem.getQuantityValue(),
          sku: lineItem.getSku(),
          variantId: lineItem.getVariantId(),
          type,
          priceRuleId: null,
          lineAmountAfterLineDiscount,
        } as GiftProgramItemRequest;
      });
    }
    if (!isExist) {
      giftProgramRequest.lineItems = [
        ...giftProgramRequest.lineItems,
        {
          originalUnitPrice: lineItemSelected
            .getVariant()
            .getRetailPriceValue(),
          productId: lineItemSelected.getVariant().getProductId(),
          quantity: lineItemSelected.getQuantityValue(),
          sku: lineItemSelected.getSku(),
          variantId: lineItemSelected.getVariantId(),
          type: LineItemType.GIFT,
          priceRuleId: null,
          lineAmountAfterLineDiscount: 0,
        },
      ];
    }

    return giftProgramRequest;
  }

  private getGiftProgramWithLineIndexApi(
    order: OrderEntity,
    lineItems: Array<OrderLineEntity>,
    lineItemSelected: OrderLineEntity,
    lineIndex: number,
    onResult: (discountResponse: GiftProgramResponse) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const request = this.getGiftProgramRequestWithLineIndex(
      order,
      lineItems,
      lineItemSelected,
      lineIndex,
    );
    this.promotionApi
      .getSuggestedProgramDiscount(request)
      .then(result => {
        if (result.data) {
          onResult(result.data.data);
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }

  getGiftProgramWithLineIndex(
    order: OrderEntity,
    lineItemSelected: OrderLineEntity,
    lineIndex: number,
    onResult: (gift: GiftProgramEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    this.getGiftProgramWithLineIndexApi(
      order,
      order.getLineItems(),
      lineItemSelected,
      lineIndex,
      (res: GiftProgramResponse) => {
        if (res) {
          let giftList: GiftProgramEntity =
            GiftProgramEntity.createFromResponse(res);
          onResult(giftList);
        } else {
          onError('Notfound', 'Không có chương trình khuyến mại nào');
        }
      },
      (code: ErrorType, error: string) => {
        onError(code, error);
      },
      beforeCallApi,
      onFinally,
    );
  }

  // ================ GIFT PROGRAM LINE INDEX  ============== END

  // ================ GIFT PROGRAM  ============== START

  private getGiftProgramRequest(
    order: OrderEntity,
    lineItems: Array<OrderLineEntity>,
  ) {
    let giftProgramRequest: GiftProgramRequest = {
      orderId: null,
      customerId: null,
      lineItems: [],
      salesChannelName: SalesChannelName.POS,
      storeId: order.getStoreId(),
      orderSourceId: 1,
    };
    if (lineItems && lineItems.length > 0) {
      giftProgramRequest.lineItems = lineItems.map(lineItem => {
        let type = lineItem.getType().toUpperCase();
        let lineAmountAfterLineDiscount =
          type === LineItemType.GIFT
            ? 0
            : lineItem.getPriceValue() * lineItem.getQuantity();

        return {
          originalUnitPrice: lineItem.getVariant().getRetailPriceValue(),
          productId: lineItem.getVariant().getProductId(),
          quantity: lineItem.getQuantityValue(),
          sku: lineItem.getSku(),
          variantId: lineItem.getVariantId(),
          type,
          priceRuleId: lineItem.getGiftProgram()?.getId(),
          lineAmountAfterLineDiscount,
        } as GiftProgramItemRequest;
      });
    }
    return giftProgramRequest;
  }

  private getGiftProgramApi(
    order: OrderEntity,
    onResult: (discountResponse: GiftProgramResponse) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const request = this.getGiftProgramRequest(order, order.getLineItems());
    this.promotionApi
      .getSuggestedProgramDiscount(request)
      .then(result => {
        if (result.data) {
          onResult(result.data.data);
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }

  getGiftProgram(
    order: OrderEntity,
    onResult: (gift: GiftProgramEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    this.getGiftProgramApi(
      order,
      (res: GiftProgramResponse) => {
        if (res) {
          let giftList: GiftProgramEntity =
            GiftProgramEntity.createFromResponse(res);
          onResult(giftList);
        } else {
          onError('Notfound', 'Không có chương trình khuyến mại nào');
        }
      },
      (code: ErrorType, error: string) => {
        onError(code, error);
      },
      beforeCallApi,
      onFinally,
    );
  }

  // ================ GIFT PROGRAM  ============== END

  getDiscountsAuto(
    order: OrderEntity,
    onResult: (order: OrderEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    this.getSuggestedDiscountsApi(
      order,
      order.getLineItems(),
      (res: DiscountResponse) => {
        if (res) {
          //TODO: tính tổng khuyến mãi sản phẩm, tổng chiết khấu đơn hàng
          //so sánh nếu ck sp >= đơn hàng thì lấy sp và ngược lại
          let dVariants: Array<DiscountItemEntity> = [];
          res.lineItems.map(e => {
            dVariants.push(DiscountItemEntity.createFromResponse(e));
          });
          let [amountDiscountVariant, amountDiscountOrder] = [0, 0];
          //có chiết khấu sp và chiết khấu đơn thì đi so sánh tổng chiết khấu
          if (dVariants.length > 0) {
            amountDiscountVariant = dVariants.reduce(
              (amount: number, discountItemEntity: DiscountItemEntity) => {
                const discountAmount =
                  discountItemEntity.getAmountDiscountValue() *
                  discountItemEntity.getQuantity();
                return amount + discountAmount;
              },
              0,
            );
          }
          if (res.suggestedDiscounts && res.suggestedDiscounts.length > 0) {
            amountDiscountOrder =
              order.getDiscountAmountBuySuggestedDiscountsValue(
                res.suggestedDiscounts,
              );
          }
          const newOrder = OrderEntity.clone(order);
          //ck sản phẩm lớn chiết khấu đơn hàng
          if (
            amountDiscountVariant !== 0 &&
            amountDiscountVariant >= amountDiscountOrder
          ) {
            for (let i = 0; i < dVariants.length; i++) {
              const discountItem = dVariants[i];
              if (order.getAutoDiscount()) {
                newOrder.getLineItemByIndex(i).setDiscountItems([discountItem]);
              }
            }
            if (newOrder.getSuggestedDiscountManual().length > 0) {
              let discounts = newOrder.getSuggestedDiscounts();
              const discountIds = res.suggestedDiscounts.map(
                e => e.priceRuleId,
              );
              discounts = discounts.filter(e =>
                discountIds.includes(e.getPriceRuleId()),
              );
              newOrder.setSuggestedDiscountsEntity(discounts);
            } else {
              newOrder.setSuggestedDiscountsEntity([]);
            }
          }
          //chiết khấu đơn hàng > sản phẩm
          if (
            (amountDiscountOrder !== 0 &&
              amountDiscountOrder > amountDiscountVariant) ||
            amountDiscountVariant === 0
          ) {
            //clear ck sản phẩm
            // newOrder.updateLineItems(
            //   newOrder.getLineItems().map((e: OrderLineEntity) => {
            //     e.setDiscountItems([]);
            //     return e;
            //   }),
            // );
            let discounts = newOrder.getSuggestedDiscounts();
            const discountManual = newOrder.getSuggestedDiscountManual();
            const discountIds = res.suggestedDiscounts.map(e => e.priceRuleId);
            discounts = discounts.filter(e =>
              discountIds.includes(e.getPriceRuleId()),
            );
            const suggestDiscount = SuggestedDiscountEntity.createFromResponse(
              res.suggestedDiscounts[0],
            );
            //kiểm tra tồn tại chưa
            if (
              discounts.findIndex(
                e => e.getPriceRuleId() === suggestDiscount.getPriceRuleId(),
              ) === -1 &&
              newOrder.getAutoDiscount() &&
              discountManual.length === 0
            ) {
              discounts.unshift(suggestDiscount);
            }
            //kiểm tra chiết khấu mới có trong chiết khấu tay chưa
            newOrder.setSuggestedDiscountsEntity([...discounts]);
          }
          onResult(newOrder);
        } else {
          onError('Notfound', 'Không có chương trình khuyến mại nào');
        }
      },
      (code: ErrorType, error: string) => {
        onError(code, error);
      },
      beforeCallApi,
      onFinally,
    );
  }

  checkInvalidSuggestDiscountOld(
    order: OrderEntity,
    lineItem: OrderLineEntity,
    onResult: (invalid: boolean) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    let keyword;
    const discountItems = lineItem.getDiscountItems();
    //ck: chiết khấu
    //kt xem có ck chưa
    if (!discountItems || discountItems.length === 0) {
      onResult(true);
      return;
    }
    if (discountItems[0].getApplyDiscount()) {
      keyword = discountItems[0].getApplyDiscount()?.getCode();
    }

    const request = this.getRequest(order, [lineItem], keyword);
    this.promotionApi
      .getSuggestedDiscounts(request)
      .then(result => {
        if (!result.data || !result.data.data) {
          onResult(true);
          return;
        }
        //ck cũ là coupons thì kt xem có thấy coupons không
        if (discountItems[0].getApplyDiscount()) {
          if (
            result.data.data.lineItems[0] &&
            result.data.data.lineItems[0].appliedDiscount
          ) {
            onResult(false);
            return;
          } else {
            onResult(true);
            return;
          }
        }
        //kt ct khuyến mãi đã chọn
        const discountItem = DiscountItemEntity.createFromResponse(
          result.data.data.lineItems[0],
        );
        if (discountItem && discountItem.getSuggestedDiscounts()) {
          const discountOld = discountItems[0].getSuggestedDiscounts()[0];
          if (
            discountItem
              .getSuggestedDiscounts()
              .findIndex(
                e => e.getPriceRuleId() === discountOld.getPriceRuleId(),
              ) !== -1
          ) {
            onResult(false);
            return;
          }
        }
        onResult(true);
        return;
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }

  private createDraftOrderApi(
    request: OrderDraftRequest,
    onSuccess: (result: OrderDraftResponse) => void,
    onError?: (code: ErrorType, msg: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.mobileApi
      .createOrderDraft(request)
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

  private logActionOrderApi(
    request: LogActionRequest,
    onSuccess: (result: LogActionResponse) => void,
    onError?: (code: ErrorType, msg: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.mobileApi
      .logAction(request)
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

  private expiredDraftOrderApi(
    barcode: string,
    onSuccess: (result: OrderDraftResponse) => void,
    onError?: (code: ErrorType, msg: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.mobileApi
      .expiredOrderDraft(barcode)
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

  createDraftOrder(
    request: OrderDraftRequest,
    onSuccess: (customers: OrderDraftResponse) => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    this.createDraftOrderApi(
      request,
      res => {
        onSuccess(res);
      },
      onError,
      onFinally,
    );
  }

  logOrderAction(
    request: LogActionRequest,
    onSuccess: (logAction: LogActionEntity) => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    this.logActionOrderApi(
      request,
      res => {
        onSuccess(new LogActionEntity(res));
      },
      onError,
      onFinally,
    );
  }
  expiredDraftOrder(
    barcode: string,
    onSuccess: (orderDraft: OrderDraftResponse) => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    this.expiredDraftOrderApi(
      barcode,
      res => {
        onSuccess(res);
      },
      onError,
      onFinally,
    );
  }

  checkInvalidDiscountOrderOld(
    order: OrderEntity,
    onResult: (
      invalid: boolean,
      showMessage: boolean,
      newOrder: OrderEntity,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const newOrder = OrderEntity.clone(order);
    let coupon;
    const discountItems = newOrder.getSuggestedDiscounts();
    if (discountItems[0] && discountItems[0].getCode()) {
      coupon = discountItems[0].getCode();
    }
    const request = newOrder.buildRequestApplyCoupon(coupon);
    this.promotionApi
      .getSuggestedDiscounts(request)
      .then(result => {
        if (!result.data || !result.data.data) {
          onResult(true, false, newOrder);
          return;
        }
        //kiểm tra chiết khấu của từng line item
        if (newOrder.getLineItems() && result.data.data.lineItems) {
          newOrder.getLineItems().forEach((e, index) => {
            const newLineItem = this.checkInvalidDiscountLineItems(
              e,
              result.data.data.lineItems[index],
            );
            newOrder.updateLineItem(index, newLineItem);
          });
        }
        //ck cũ là coupons thì kt xem có thấy coupons không
        if (discountItems[0].getCode()) {
          if (
            result.data.data &&
            result.data.data.appliedDiscount &&
            !result.data.data.appliedDiscount.invalid
          ) {
            onResult(false, true, newOrder);
            return;
          } else {
            onResult(true, true, newOrder);
            return;
          }
        }
        //kt ct khuyến mại đã chọn
        if (result.data.data.suggestedDiscounts) {
          const suggestDiscounts = result.data.data.suggestedDiscounts.map(e =>
            SuggestedDiscountEntity.createFromResponse(e),
          );
          if (suggestDiscounts) {
            const discountOld = discountItems[0];
            if (
              suggestDiscounts.findIndex(
                e => e.getPriceRuleId() === discountOld.getPriceRuleId(),
              ) !== -1
            ) {
              onResult(false, true, newOrder);
              return;
            }
          }
        }
        onResult(true, true, newOrder);
        return;
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(onFinally);
  }
  private checkInvalidDiscountLineItems(
    lineItem: OrderLineEntity,
    discountItem: DiscountItemResponse,
  ) {
    const newLineItem = OrderLineEntity.clone(lineItem);
    const discountItems = newLineItem.getDiscountItems();
    if (!discountItems || discountItems.length === 0) {
      return newLineItem;
    }
    const newDiscountItem = DiscountItemEntity.createFromResponse(discountItem);
    //th lineitem chọn coupon mà k thấy trong list chiết khấu mới thì xóa đi
    if (discountItems[0].getApplyDiscount()) {
      if (!newDiscountItem || !newDiscountItem.getApplyDiscount()) {
        newLineItem.setDiscountItems([]);
        return newLineItem;
      }
      //th apply discount mới hết hiệu lực
      if (newDiscountItem) {
        const newApplyDiscount = newDiscountItem.getApplyDiscount();
        if (newApplyDiscount && newApplyDiscount.getInvalid()) {
          newLineItem.setDiscountItems([]);
          return newLineItem;
        }
      }
      return newLineItem;
    }
    //k thấy trong suggest discount  thì xóa đi
    if (
      discountItems[0].getSuggestedDiscounts() &&
      (!newDiscountItem.getSuggestedDiscounts() ||
        newDiscountItem.getSuggestedDiscounts().length === 0)
    ) {
      newLineItem.setDiscountItems([]);
      return newLineItem;
    }
    const discountOld = discountItems[0].getSuggestedDiscounts()[0];
    if (
      newDiscountItem
        .getSuggestedDiscounts()
        .findIndex(e => e.getPriceRuleId() === discountOld.getPriceRuleId()) ===
      -1
    ) {
      newLineItem.setDiscountItems([]);
      return newLineItem;
    }
    return newLineItem;
  }

  updatePoint(order: OrderEntity, point: number) {
    let newOrder = OrderEntity.clone(order);
    newOrder.setPoint(point);
    return newOrder;
  }
}

const orderService = new OrderService();

export default orderService;
