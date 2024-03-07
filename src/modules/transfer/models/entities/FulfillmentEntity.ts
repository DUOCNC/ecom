import {FulfillmentResponse, ShipmentResponse} from '../response';

export default class FulfillmentEntity {
  private deliveryServiceProviderName: string;
  private deliveryServiceProviderCode: string;
  private shippingFeePaidToThreePls: string;
  private trackingCode: string;
  private deliveryTransportType: string;
  private status: string;
  private shipment: ShipmentResponse;
  private createdDate: Date;

  constructor(data: FulfillmentResponse) {
    this.deliveryServiceProviderName = data.deliveryServiceProviderName;
    this.deliveryServiceProviderCode = data.deliveryServiceProviderCode;
    this.shippingFeePaidToThreePls = data.shippingFeePaidToThreePls;
    this.trackingCode = data.trackingCode;
    this.deliveryTransportType = data.deliveryTransportType;
    this.status = data.pushingStatus;
    this.shipment = data.shipment;
    this.createdDate = data.createdDate;
  }

  getDeliveryServiceProviderName(): string {
    return this.deliveryServiceProviderName;
  }

  setDeliveryServiceProviderName(value: string) {
    this.deliveryServiceProviderName = value;
  }

  getDeliveryServiceProviderCode(): string {
    return this.deliveryServiceProviderCode;
  }

  setDeliveryServiceProviderCode(value: string) {
    this.deliveryServiceProviderCode = value;
  }

  getShippingFeePaidToThreePls(): string {
    return this.shippingFeePaidToThreePls;
  }

  setShippingFeePaidToThreePls(value: string) {
    this.shippingFeePaidToThreePls = value;
  }

  getTrackingCode(): string {
    return this.trackingCode;
  }

  setTrackingCode(value: string) {
    this.trackingCode = value;
  }

  getDeliveryTransportType(): string {
    return this.deliveryTransportType;
  }

  setDeliveryTransportType(value: string) {
    this.deliveryTransportType = value;
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(value: string) {
    this.status = value;
  }

  getShipment(): ShipmentResponse {
    return this.shipment;
  }

  setShipment(value: ShipmentResponse) {
    this.shipment = value;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  setCreatedDate(value: Date) {
    this.createdDate = value;
  }
}
