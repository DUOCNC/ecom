import {CustomerResponse} from '../responses';
import CustomerEntity from './CustomerEntity';

export default class OrderCustomerEntity {
  private customerId: number;
  private phone: string;
  private customer: string;
  private point: number;
  private customerGroupId: number | null;
  private customerGroup: string | null;
  private customerLevelId: number | null;
  private customerLevel: string | null;
  private district: string | null;
  private districtId: number | null | string;
  private ward: string | null;
  private wardId: number | null;
  private fullAddress: string | null;
  constructor(
    customerId: number,
    phone: string,
    customer: string,
    point: number,
    customerGroupId: number | null,
    customerGroup: string | null,
    customerLevelId: number | null,
    customerLevel: string | null,
    district: string | null,
    districtId: number | null | string,
    ward: string | null,
    wardId: number | null,
    fullAddress: string | null,
  ) {
    this.customerId = customerId;
    this.phone = phone;
    this.customer = customer;
    this.point = point;
    this.customerGroupId = customerGroupId;
    this.customerGroup = customerGroup;
    this.customerLevel = customerLevel;
    this.customerLevelId = customerLevelId;
    this.district = district;
    this.districtId = districtId;
    this.ward = ward;
    this.wardId = wardId;
    this.fullAddress = fullAddress;
  }

  static create(customer: CustomerEntity) {
    return new OrderCustomerEntity(
      customer.getId(),
      customer.getPhone(),
      customer.getFullName(),
      customer.getPointValue(),
      customer.getCustomerGroupId(),
      customer.getCustomerGroup(),
      customer.getCustomerLevelId(),
      customer.getCustomerLevel(),
      customer.getDistrict(),
      customer.getDistrictId(),
      customer.getWard(),
      customer.getWardId(),
      customer.getFullAddress(),
    );
  }

  static createFromResponse(customer: CustomerResponse) {
    return new OrderCustomerEntity(
      customer.id,
      customer.phone,
      customer.fullName,
      customer.point ?? 0,
      customer.customerGroupId,
      customer.customerGroup,
      customer.customerLevelId,
      customer.customerLevel,
      customer.district,
      customer.districtId,
      customer.ward,
      customer.wardId,
      customer.fullAddress,
    );
  }

  getFullAddress() {
    return this.fullAddress;
  }
  setFullAddress(fullAddress: string) {
    this.fullAddress = fullAddress;
  }
  getWard() {
    return this.ward;
  }
  geWardId() {
    return this.wardId;
  }

  setWard(ward: null | string) {
    this.ward = ward;
  }

  settWardId(wardId: number | null) {
    this.wardId = wardId;
  }

  getDistrictId() {
    return this.districtId;
  }

  getDistrict() {
    return this.district;
  }

  setDistrictId(districtId: number | null | string) {
    this.districtId = districtId;
  }

  settDistrict(district: string | null) {
    this.district = district;
  }

  getFullName() {
    return this.customer.trim();
  }

  getPhone() {
    return this.phone;
  }

  getPoint(): any {
    return this.point;
  }

  getGroup() {
    if (!this.customerGroup) {
      return 'Không có group';
    }
    return this.customerGroup;
  }

  getCustomerIdValue() {
    return this.customerId;
  }

  getCustomerLevelId() {
    return this.customerLevelId;
  }

  getLevel() {
    if (!this.customerLevel) {
      return 'Member';
    }
    return this.customerLevel;
  }

  getCustomerId() {
    return this.customerId;
  }

  getCustomerNotHaveAddress() {
    return {
      customerId: this.customerId,
      phone: this.phone,
      customer: this.customer,
      point: this.point,
      customerGroupId: this.customerGroupId,
      customerGroup: this.customerGroup,
      customerLevelId: this.customerLevelId,
      customerLevel: this.customerLevel,
      district: null,
      districtId: null,
      ward: null,
      wardId: null,
      fullAddress: null,
    };
  }
}
