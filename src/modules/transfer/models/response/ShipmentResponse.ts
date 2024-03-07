export interface ShipmentResponse {
  deliveryServiceProviderCode: string | null;
  deliveryServiceProviderId: number | null;
  deliveryServiceProviderName: string | null;
  deliveryServiceProviderType: string | null;
  deliveryServiceNote: string | null;
  deliveryTransportType: string | null;
  insuranceFee: number | null;
  shipperCode: string | null;
  shipperName: string | null;
  handoverId: number | null;
  service: string | null;
  whoPaid: string | null;
  feeType: string | null;
  feeBaseOn: string | null;
  deliveryFee: number | null;
  shippingFeeInformedToCustomer: number | null;
  shippingFeePaidToThreePls: number | null;
  expectedReceivedDate: string | null;
  referenceStatus: string | null;
  referenceStatusExplanation: string | null;
  cancelReason: string | null;
  trackingCode: string | null;
  recipientSortCode?: string | null;
  trackingUrl: string | null;
  pushingStatus: string | null;
  pushingNote: string | null;
  receivedDate: string | null;
  senderAddressId: number | null;
  noteToShipper: string | null;
  requirements: string | null;
  requirementsName: string | null;
  fulfillmentId: string | null;
  cod: number;
  officeTime: boolean | null;
  infoShipper: string | null;
}