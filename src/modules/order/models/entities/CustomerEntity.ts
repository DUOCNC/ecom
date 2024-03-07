import {DistrictEntity} from 'model';
import {CustomerResponse} from '../responses';
import {NumberUtils} from 'common';

export default class CustomerEntity {
  private id: number;
  private fullName: string;
  private phone: string;
  private point: number | null;
  private totalFinishedOrder: number | null;
  private totalReturnedOrder: number | null;
  private customerGroupId: number | null;
  private customerGroup: string | null;
  private customerLevelId: number | null;
  private customerLevel: string | null;
  private district: string | null;
  private districtId: number | null;
  private ward: string | null;
  private wardId: number | null;
  private fullAddress: string | null;
  private constructor(
    id: number,
    fullName: string | null,
    phone: string | null,
    point: number | null,
    totalFinishedOrder: number | null,
    totalReturnedOrder: number | null,
    customerGroupId: number | null,
    customerGroup: string | null,
    customerLevelId: number | null,
    customerLevel: string | null,
    district: string | null,
    districtId: number | null,
    ward: string | null,
    wardId: number | null,
    fullAddress: string | null,
  ) {
    this.id = id;
    this.fullName = fullName == null ? '' : fullName;
    this.phone = phone == null ? '' : phone;
    this.point = point;
    this.totalFinishedOrder = totalFinishedOrder;
    this.totalReturnedOrder = totalReturnedOrder;
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

  static createFromResponse(response: CustomerResponse) {
    return new CustomerEntity(
      response.id,
      response.fullName,
      response.phone,
      response.point,
      response.totalFinishedOrder,
      response.totalReturnedOrder,
      response.customerGroupId,
      response.customerGroup,
      response.customerLevelId,
      response.customerLevel,
      response.district,
      response.districtId,
      response.ward,
      response.wardId,
      response.fullAddress,
    );
  }

  getFullAddress() {
    return this.fullAddress;
  }

  getWard() {
    return this.ward;
  }

  getWardId() {
    return this.wardId;
  }

  getDistrictId() {
    return this.districtId;
  }

  getDistrict(): string | null {
    return this.district;
  }

  getId() {
    return this.id;
  }

  getKey(): string {
    return this.id.toString();
  }

  getFullName() {
    return this.fullName;
  }

  getPhone() {
    return this.phone.trim();
  }

  getPoint() {
    if (!this.point) {
      return '0';
    }
    return NumberUtils.formatNumber(this.point);
  }

  getTotalFinishOrderValue() {
    if (this.totalFinishedOrder == null) {
      return 0;
    }
    return this.totalFinishedOrder;
  }

  getTotalReturnedOrderValue() {
    if (this.totalReturnedOrder == null) {
      return 0;
    }
    return this.totalReturnedOrder;
  }

  getTotalBuy() {
    let totalBuy =
      this.getTotalFinishOrderValue() + this.getTotalReturnedOrderValue();
    return NumberUtils.formatNumber(totalBuy);
  }

  getGroup() {
    if (!this.customerGroup) {
      return 'Không có nhóm';
    }
    return this.customerGroup.trim();
  }

  getPointValue() {
    if (this.point == null) {
      return 0;
    }
    return this.point;
  }

  getCustomerGroupId() {
    return this.customerGroupId;
  }

  getCustomerGroup() {
    return this.customerGroup;
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

  getCustomerLevel() {
    return this.customerLevel;
  }
}
