import moment from 'moment';
import {FulfillmentResponse, TransferResponse} from '../response';
import {TransferStatus} from 'modules/transfer/config/TransferStatus';
import {DateUtils, NumberUtils, StringUtils} from 'common';
import LineItemEntity from './LineItemEntity';
import {FulfillmentStatus} from 'modules/transfer/constant';

export default class TransferEntity {
  private id: number;
  private code: string;
  private fromStoreId: number;
  private fromStoreCode: string;
  private fromStoreName: string;
  private fromStorePhone: string;
  private fromStoreAddress: string;
  private toStoreId: number;
  private toStoreCode: string;
  private toStoreName: string;
  private toStorePhone: string;
  private toStoreAddress: string;
  private status: string;
  private createdBy: string;
  private createdName: string;
  private createdDate: Date;
  private arrivedBy: string;
  private arrivedName: string;
  private receivedBy: string;
  private receivedName: string;
  private cancelBy: string | null;
  private cancelName: string | null;
  private lineItems: Array<LineItemEntity>;
  private fulfillments: Array<FulfillmentResponse>;

  constructor(data: TransferResponse) {
    this.id = data.id;
    this.code = data.code;
    this.fromStoreId = data.fromStoreId;
    this.fromStoreCode = data.fromStoreCode;
    this.fromStoreName = data.fromStoreName;
    this.fromStorePhone = data.fromStorePhone;
    this.fromStoreAddress = data.fromStoreAddress;
    this.toStoreId = data.toStoreId;
    this.toStoreCode = data.toStoreCode;
    this.toStoreName = data.toStoreName;
    this.toStorePhone = data.toStorePhone;
    this.toStoreAddress = data.toStoreAddress;
    this.status = data.status;
    this.createdBy = data.createdBy;
    this.createdName = data.createdName;
    this.createdDate = data.createdDate;
    this.arrivedBy = data.arrivedBy;
    this.arrivedName = data.arrivedName;
    this.receivedBy = data.receivedBy;
    this.receivedName = data.receivedName;
    this.cancelBy = data.cancelBy;
    this.cancelName = data.cancelName;
    this.lineItems = data.lineItems
      ? data.lineItems.map(e => {
          return new LineItemEntity(e);
        })
      : [];
    this.fulfillments = data.fulfillments;
  }

  // Hàm tạo từ đối tượng TransferResponse
  static create(data: TransferResponse): TransferEntity {
    return new TransferEntity(data);
  }

  getId(): number {
    return this.id;
  }
  setId(value: number) {
    this.id = value;
  }

  getCode(): string {
    return this.code;
  }
  setCode(value: string) {
    this.code = value;
  }

  getFromStoreId(): number {
    return this.fromStoreId;
  }
  setFromStoreId(value: number) {
    this.fromStoreId = value;
  }

  getFromStoreCode(): string {
    return this.fromStoreCode;
  }
  setFromStoreCode(value: string) {
    this.fromStoreCode = value;
  }

  getFromStoreName(): string {
    return this.fromStoreName;
  }
  setFromStoreName(value: string) {
    this.fromStoreName = value;
  }

  getFromStorePhone(): string {
    return this.fromStorePhone;
  }
  setFromStorePhone(value: string) {
    this.fromStorePhone = value;
  }

  getFromStoreAddress(): string {
    return this.fromStoreAddress;
  }
  setFromStoreAddress(value: string) {
    this.fromStoreAddress = value;
  }

  getToStoreId(): number {
    return this.toStoreId;
  }
  setToStoreId(value: number) {
    this.toStoreId = value;
  }

  getToStoreCode(): string {
    return this.toStoreCode;
  }
  setToStoreCode(value: string) {
    this.toStoreCode = value;
  }

  getToStoreName(): string {
    return this.toStoreName;
  }
  setToStoreName(value: string) {
    this.toStoreName = value;
  }

  getToStorePhone(): string {
    return this.toStorePhone;
  }
  setToStorePhone(value: string) {
    this.toStorePhone = value;
  }

  getToStoreAddress(): string {
    return this.toStoreAddress;
  }
  setToStoreAddress(value: string) {
    this.toStoreAddress = value;
  }

  getStatus(): string {
    return this.status;
  }
  setStatus(value: string) {
    this.status = value;
  }

  getCreatedBy(): string {
    if (!this.createdBy) {
      return '';
    }
    return this.createdBy.toLocaleUpperCase();
  }
  setCreatedBy(value: string) {
    this.createdBy = value;
  }

  getCreatedName(): string {
    return this.createdName;
  }
  setCreatedName(value: string) {
    this.createdName = value;
  }

  getCreatedDate(): Date {
    return this.createdDate;
  }

  getCreatedDateStr(): string {
    return moment(this.createdDate).format('DD/MM/YYYY HH:mm');
  }

  setCreatedDate(value: Date) {
    this.createdDate = value;
  }

  getObjectStatus() {
    let index = TransferStatus.findIndex(value => value.code === this.status);
    if (index === -1) {
      return null;
    }
    return TransferStatus[index];
  }

  getCreatedByStr() {
    if (!this.createdBy) {
      return '-';
    }
    return StringUtils.format('{0} - {1}', this.createdBy, this.createdName);
  }

  getArrivedByStr() {
    if (!this.arrivedBy) {
      return '-';
    }
    return StringUtils.format('{0} - {1}', this.arrivedBy, this.arrivedName);
  }

  getReceivedByStr() {
    if (!this.receivedBy) {
      return '-';
    }
    return StringUtils.format('{0} - {1}', this.receivedBy, this.receivedName);
  }

  getCancelByStr() {
    if (!this.cancelBy) {
      return '-';
    }
    return StringUtils.format('{0} - {1}', this.cancelBy, this.createdName);
  }

  getProductNumbers() {
    if (!this.lineItems) {
      return 0;
    }
    return NumberUtils.formatNumber(this.lineItems.length);
  }

  getLineItems() {
    return this.lineItems;
  }

  static createEmpty(): TransferEntity {
    const emptyData: TransferResponse = {
      id: 0,
      code: '',
      fromStoreId: 0,
      fromStoreCode: '',
      fromStoreName: '',
      fromStorePhone: '',
      fromStoreAddress: '',
      toStoreId: 0,
      toStoreCode: '',
      toStoreName: '',
      toStorePhone: '',
      toStoreAddress: '',
      status: '',
      createdBy: '',
      createdName: '',
      createdDate: new Date(),
      arrivedBy: '',
      arrivedName: '',
      receivedBy: '',
      receivedName: '',
      cancelBy: null,
      cancelName: null,
      lineItems: [],
      version: 0,
      updatedBy: '',
      updatedName: '',
      updatedDate: '',
      totalSentVariant: 0,
      totalSentQuantity: 0,
      totalSentAmount: 0,
      requestedDate: null,
      requestedBy: '',
      requestedName: '',
      confirmedDate: '',
      confirmedBy: '',
      confirmedName: '',
      transferDate: '',
      transferBy: '',
      transferName: '',
      arrivedDate: '',
      receiveDate: '',
      pendingDate: null,
      pendingBy: null,
      pendingName: null,
      cancelDate: null,
      balanceDate: null,
      balanceBy: null,
      balanceName: null,
      attachedFiles: [],
      note: null,
      forwardNote: null,
      totalReceivedQuantity: 0,
      shipment: undefined,
      totalReceiveOnHand: null,
      receivedMethod: '',
      subStatus: undefined,
      fulfillments: [],
    };

    return new TransferEntity(emptyData);
  }

  //Vận chuyển
  getFulfillment() {
    if (this.fulfillments && this.fulfillments.length > 0) {
      return this.fulfillments[0];
    }
    return null;
  }

  //Đối tác giao hàng
  getDeliveryServiceProviderName() {
    const fulfillment = this.getFulfillment();
    if (fulfillment) {
      return fulfillment.shipment.deliveryServiceProviderName;
    }
    return '-';
  }

  getFulfillmentCreatedDate() {
    const fulfillment = this.getFulfillment();
    if (fulfillment) {
      return DateUtils.getDateFormatHHMMDDMMYYYY(fulfillment.createdDate);
    }
    return '-';
  }

  getTotalWeight() {
    let totalWeight = 0;
    this.fulfillments[0]?.lineItems?.forEach(item => {
      totalWeight += item.weight * item.transferQuantity;
    });
    return totalWeight;
  }

  getWeightUnit() {
    let unit = this.fulfillments?.[0]?.lineItems?.[0]?.weightUnit;
    if (unit) {
      return unit;
    }
    return 'g';
  }

  getShipment() {
    const fulfillment = this.getFulfillment();
    if (fulfillment) {
      return fulfillment.shipment;
    }
    return null;
  }

  //Phí ship trả HVC
  getShippingFeePaidToThreePls() {
    const deliveryFee = this.fulfillments?.[0].shipment?.deliveryFee;
    if (deliveryFee) {
      return NumberUtils.formatCurrency(deliveryFee);
    }
    return '-';
  }

  //dịch vụ
  getDeliveryTransportType() {
    const deliveryTransportType =
      this.fulfillments?.[0].shipment?.deliveryTransportType;
    if (deliveryTransportType) {
      return deliveryTransportType;
    }
    return '-';
  }

  getFulfillmentStatus() {
    const status = this.fulfillments?.[0].status;
    if (status) {
      return FulfillmentStatus.getName(status);
    }
    return '-';
  }

  getFulfillmentCode() {
    const fulfillment = this.getFulfillment();
    if (fulfillment) {
      return fulfillment.code;
    }

    return '-';
  }
}
