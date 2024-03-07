import {NumberUtils, StringUtils} from 'common';
import {ConversionRequest} from '../requests';
import {ReportConversionStaffResponse} from '../responses';
import BaseAnalyticEntity from './BaseAnalyticEntity';

export default class ReportConversionStaffEntity extends BaseAnalyticEntity {
  private assigneeName: string;
  private trafficAssigneeQuantity: number;
  private customerPurchase: number;
  private crAssigneePurchase: number;
  private trafficNotBoughtQuantity: number;
  private trafficAssigneeQuantityGrowthRatio: number;
  private customerPurchaseGrowthRatio: number;
  private crAssigneePurchaseGrowthRatio: number;
  private trafficNotBoughtQuantityGrowthRatio: number;

  constructor(data: ReportConversionStaffResponse) {
    super();
    this.assigneeName = data.assigneeName;
    this.trafficAssigneeQuantity = data.trafficAssigneeQuantity;
    this.customerPurchase = data.customerPurchase;
    this.crAssigneePurchase = data.crAssigneePurchase;
    this.trafficNotBoughtQuantity = data.trafficNotBoughtQuantity;
    this.trafficAssigneeQuantityGrowthRatio =
      data.trafficAssigneeQuantityGrowthRatio;
    this.customerPurchaseGrowthRatio = data.customerPurchaseGrowthRatio;
    this.crAssigneePurchaseGrowthRatio = data.crAssigneePurchaseGrowthRatio;
    this.trafficNotBoughtQuantityGrowthRatio =
      data.trafficNotBoughtQuantityGrowthRatio;
  }

  public getAssigneeName(): string {
    return this.assigneeName;
  }

  private setAssigneeName(value: string): void {
    this.assigneeName = value;
  }

  public getTrafficAssigneeQuantityValue(): number {
    return this.trafficAssigneeQuantity;
  }

  public getTrafficAssigneeQuantity(): string {
    return NumberUtils.formatNumber(this.trafficAssigneeQuantity);
  }

  private setTrafficAssigneeQuantity(value: number): void {
    this.trafficAssigneeQuantity = value;
  }

  public getCustomerPurchaseValue(): number {
    return this.customerPurchase;
  }

  public getCustomerPurchase(): string {
    return NumberUtils.formatNumber(this.customerPurchase);
  }

  private setCustomerPurchase(value: number): void {
    this.customerPurchase = value;
  }

  public getCrAssigneePurchaseValue(): number {
    return this.crAssigneePurchase;
  }

  public getCrAssigneePurchase(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crAssigneePurchase),
    );
  }

  private setCrAssigneePurchase(value: number): void {
    this.crAssigneePurchase = value;
  }

  public getTrafficNotBoughtQuantityValue(): number {
    return this.trafficNotBoughtQuantity;
  }

  public getTrafficNotBoughtQuantity(): string {
    return NumberUtils.formatNumber(this.trafficNotBoughtQuantity);
  }

  public setTrafficNotBoughtQuantity(value: number): void {
    this.trafficNotBoughtQuantity = value;
  }

  public getTrafficAssigneeQuantityGrowthRatioValue(): number {
    return this.trafficAssigneeQuantityGrowthRatio;
  }

  public getTrafficAssigneeQuantityGrowthRatioDirection(): boolean {
    return this.trafficAssigneeQuantityGrowthRatio >= 0;
  }

  public getTrafficAssigneeQuantityGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.trafficAssigneeQuantityGrowthRatio),
    );
  }

  private setTrafficAssigneeQuantityGrowthRatio(value: number): void {
    this.trafficAssigneeQuantityGrowthRatio = value;
  }

  public getCustomerPurchaseGrowthRatioValue(): number {
    return this.customerPurchaseGrowthRatio;
  }

  public getCustomerPurchaseGrowthRatioDirection(): boolean {
    return this.customerPurchaseGrowthRatio >= 0;
  }

  public getCustomerPurchaseGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.customerPurchaseGrowthRatio),
    );
  }

  private setCustomerPurchaseGrowthRatio(value: number): void {
    this.customerPurchaseGrowthRatio = value;
  }

  public getCrAssigneePurchaseGrowthRatioValue(): number {
    return this.crAssigneePurchaseGrowthRatio;
  }

  public getCrAssigneePurchaseGrowthRatioDirection(): boolean {
    return this.crAssigneePurchaseGrowthRatio >= 0;
  }

  public getCrAssigneePurchaseGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crAssigneePurchaseGrowthRatio),
    );
  }

  private setCrAssigneePurchaseGrowthRatio(value: number): void {
    this.crAssigneePurchaseGrowthRatio = value;
  }

  public getTrafficNotBoughtQuantityGrowthRatioValue(): number {
    return this.trafficNotBoughtQuantityGrowthRatio;
  }

  public getTrafficNotBoughtQuantityGrowthRatioDirection(): boolean {
    return this.trafficNotBoughtQuantityGrowthRatio >= 0;
  }

  public getTrafficNotBoughtQuantityGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.trafficNotBoughtQuantityGrowthRatio),
    );
  }

  private setTrafficNotBoughtQuantityGrowthRatio(value: number): void {
    this.trafficNotBoughtQuantityGrowthRatio = value;
  }

  public static createEmpty(): ReportConversionStaffEntity {
    return new ReportConversionStaffEntity({
      assigneeName: '',
      trafficAssigneeQuantity: 0,
      customerPurchase: 0,
      crAssigneePurchase: 0,
      trafficNotBoughtQuantity: 0,
      trafficAssigneeQuantityGrowthRatio: 0,
      customerPurchaseGrowthRatio: 0,
      crAssigneePurchaseGrowthRatio: 0,
      trafficNotBoughtQuantityGrowthRatio: 0,
    });
  }

  public fromResponse(
    response: ReportConversionStaffResponse,
  ): ReportConversionStaffEntity {
    return new ReportConversionStaffEntity(response);
  }

  getQuery(request: ConversionRequest) {
    return this.objectToUrlParams(request);
  }
}
