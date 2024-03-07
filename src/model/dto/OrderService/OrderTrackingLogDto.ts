import {BaseDto} from 'model/base/BaseDto';

export interface OrderTrackingLogDto extends BaseDto {
  serviceType: string;
  externalServiceCode: string;
  transportType: string;
  fulfillmentCode: string;
  shippingCode: string;
  expectedDeliveryTime: string;
  shippingFee: number;
  partnerNote: string;
  shippingStatus: string;
  orderSubStatus: string;
  fulfillmentStatus: string;
  yodyStoreId: number;
  status: string;
}
