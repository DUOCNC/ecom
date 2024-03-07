import {ShipmentResponse} from './ShipmentResponse';
import {LineItemResponse} from './TransferResponse';

export interface FulfillmentResponse {
  deliveryServiceProviderName: string;
  deliveryServiceProviderCode: string;
  shippingFeePaidToThreePls: string;
  trackingCode: string;
  deliveryTransportType: string;
  status: string;
  shipment: ShipmentResponse;
  createdDate: Date;
  lineItems: Array<LineItemResponse>;
  code: string;
}
