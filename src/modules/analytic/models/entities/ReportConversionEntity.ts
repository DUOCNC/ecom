import {NumberUtils, StringUtils} from 'common';
import {ConversionRequest} from '../requests';
import {ReportConversionResponse} from '../responses';
import BaseAnalyticEntity from './BaseAnalyticEntity';

export default class ReportConversionEntity extends BaseAnalyticEntity {
  private trafficReceptionistQuantity: number;
  private trafficAssigneeQuantity: number;
  private customerPurchase: number;
  private crAssigneePurchase: number;
  private crReceptionistPurchase: number;
  private trafficNotBoughtQuantity: number;
  private numberSlotCreated: number;
  private numberSlotAssign: number;
  private numberSlotBought: number;
  private numberSlotNotBought: number;
  private crSlotCreatedBought: number;
  private crSlotAssignBought: number;
  private trafficReceptionistQuantityGrowthRatio: number;
  private trafficAssigneeQuantityGrowthRatio: number;
  private customerPurchaseGrowthRatio: number;
  private crAssigneePurchaseGrowthRatio: number;
  private crReceptionistPurchaseGrowthRatio: number;
  private trafficNotBoughtQuantityGrowthRatio: number;
  private numberSlotCreatedGrowthRatio: number;
  private numberSlotAssignGrowthRatio: number;
  private numberSlotBoughtGrowthRatio: number;
  private numberSlotNotBoughtGrowthRatio: number;
  private crSlotCreatedBoughtGrowthRatio: number;
  private crSlotAssignBoughtGrowthRatio: number;

  constructor(data: ReportConversionResponse) {
    super();
    this.trafficReceptionistQuantity = data.trafficReceptionistQuantity;
    this.trafficAssigneeQuantity = data.trafficAssigneeQuantity;
    this.customerPurchase = data.customerPurchase;
    this.crAssigneePurchase = data.crAssigneePurchase;
    this.crReceptionistPurchase = data.crReceptionistPurchase;
    this.trafficNotBoughtQuantity = data.trafficNotBoughtQuantity;
    this.numberSlotCreated = data.numberSlotCreated;
    this.numberSlotAssign = data.numberSlotAssign;
    this.numberSlotBought = data.numberSlotBought;
    this.numberSlotNotBought = data.numberSlotNotBought;
    this.crSlotCreatedBought = data.crSlotCreatedBought;
    this.crSlotAssignBought = data.crSlotAssignBought;
    this.trafficReceptionistQuantityGrowthRatio =
      data.trafficReceptionistQuantityGrowthRatio;
    this.trafficAssigneeQuantityGrowthRatio =
      data.trafficAssigneeQuantityGrowthRatio;
    this.customerPurchaseGrowthRatio = data.customerPurchaseGrowthRatio;
    this.crAssigneePurchaseGrowthRatio = data.crAssigneePurchaseGrowthRatio;
    this.crReceptionistPurchaseGrowthRatio =
      data.crReceptionistPurchaseGrowthRatio;
    this.trafficNotBoughtQuantityGrowthRatio =
      data.trafficNotBoughtQuantityGrowthRatio;
    this.numberSlotCreatedGrowthRatio = data.numberSlotCreatedGrowthRatio;
    this.numberSlotAssignGrowthRatio = data.numberSlotAssignGrowthRatio;
    this.numberSlotBoughtGrowthRatio = data.numberSlotBoughtGrowthRatio;
    this.numberSlotNotBoughtGrowthRatio = data.numberSlotNotBoughtGrowthRatio;
    this.crSlotCreatedBoughtGrowthRatio = data.crSlotCreatedBoughtGrowthRatio;
    this.crSlotAssignBoughtGrowthRatio = data.crSlotAssignBoughtGrowthRatio;
  }
  getTrafficReceptionistQuantityValue(): number {
    return this.trafficReceptionistQuantity;
  }

  getTrafficReceptionistQuantity(): string {
    return NumberUtils.formatNumber(this.trafficReceptionistQuantity);
  }

  setTrafficReceptionistQuantity(value: number): void {
    this.trafficReceptionistQuantity = value;
  }

  getTrafficAssigneeQuantityValue(): number {
    return this.trafficAssigneeQuantity;
  }

  getTrafficAssigneeQuantity(): string {
    return NumberUtils.formatNumber(this.trafficAssigneeQuantity);
  }

  setTrafficAssigneeQuantity(value: number): void {
    this.trafficAssigneeQuantity = value;
  }

  getCustomerPurchaseValue(): number {
    return this.customerPurchase;
  }

  getCustomerPurchase(): string {
    return NumberUtils.formatNumber(this.customerPurchase);
  }

  setCustomerPurchase(value: number): void {
    this.customerPurchase = value;
  }

  getCrAssigneePurchaseValue(): number {
    return this.crAssigneePurchase;
  }

  getCrAssigneePurchase(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crAssigneePurchase),
    );
  }

  setCrAssigneePurchase(value: number): void {
    this.crAssigneePurchase = value;
  }

  getCrReceptionistPurchaseValue(): number {
    return this.crReceptionistPurchase;
  }

  getCrReceptionistPurchase(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crReceptionistPurchase),
    );
  }

  setCrReceptionistPurchase(value: number): void {
    this.crReceptionistPurchase = value;
  }

  getTrafficNotBoughtQuantityValue(): number {
    return this.trafficNotBoughtQuantity;
  }

  getTrafficNotBoughtQuantity(): string {
    return NumberUtils.formatNumber(this.trafficNotBoughtQuantity);
  }

  setTrafficNotBoughtQuantity(value: number): void {
    this.trafficNotBoughtQuantity = value;
  }

  getNumberSlotCreatedValue(): number {
    return this.numberSlotCreated;
  }

  getNumberSlotCreated(): string {
    return NumberUtils.formatNumber(this.numberSlotCreated);
  }

  setNumberSlotCreated(value: number): void {
    this.numberSlotCreated = value;
  }

  getNumberSlotAssignValue(): number {
    return this.numberSlotAssign;
  }

  getNumberSlotAssign(): string {
    return NumberUtils.formatNumber(this.numberSlotAssign);
  }

  setNumberSlotAssign(value: number): void {
    this.numberSlotAssign = value;
  }

  getNumberSlotBoughtValue(): number {
    return this.numberSlotBought;
  }

  getNumberSlotBought(): string {
    return NumberUtils.formatNumber(this.numberSlotBought);
  }

  setNumberSlotBought(value: number): void {
    this.numberSlotBought = value;
  }

  getNumberSlotNotBoughtValue(): number {
    return this.numberSlotNotBought;
  }

  getNumberSlotNotBought(): string {
    return NumberUtils.formatNumber(this.numberSlotNotBought);
  }

  setNumberSlotNotBought(value: number): void {
    this.numberSlotNotBought = value;
  }

  getCrSlotCreatedBoughtValue(): number {
    return this.crSlotCreatedBought;
  }

  getCrSlotCreatedBought(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crSlotCreatedBought),
    );
  }

  setCrSlotCreatedBought(value: number): void {
    this.crSlotCreatedBought = value;
  }

  getCrSlotAssignBoughtValue(): number {
    return this.crSlotAssignBought;
  }

  getCrSlotAssignBought(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crSlotAssignBought),
    );
  }

  setCrSlotAssignBought(value: number): void {
    this.crSlotAssignBought = value;
  }
  getTrafficReceptionistQuantityGrowthRatioValue(): number {
    return this.trafficReceptionistQuantityGrowthRatio;
  }
  getTrafficReceptionistQuantityGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.trafficReceptionistQuantityGrowthRatio),
    );
  }

  setTrafficReceptionistQuantityGrowthRatio(value: number): void {
    this.trafficReceptionistQuantityGrowthRatio = value;
  }
  getTrafficAssigneeQuantityGrowthRatioValue(): number {
    return this.trafficAssigneeQuantityGrowthRatio;
  }
  getTrafficAssigneeQuantityGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.trafficAssigneeQuantityGrowthRatio),
    );
  }

  setTrafficAssigneeQuantityGrowthRatio(value: number): void {
    this.trafficAssigneeQuantityGrowthRatio = value;
  }

  getCustomerPurchaseGrowthRatioValue(): number {
    return this.customerPurchaseGrowthRatio;
  }

  getCustomerPurchaseGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.customerPurchaseGrowthRatio),
    );
  }

  setCustomerPurchaseGrowthRatio(value: number): void {
    this.customerPurchaseGrowthRatio = value;
  }
  getCrAssigneePurchaseGrowthRatioValue(): number {
    return this.crAssigneePurchaseGrowthRatio;
  }
  getCrAssigneePurchaseGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crAssigneePurchaseGrowthRatio),
    );
  }

  setCrAssigneePurchaseGrowthRatio(value: number): void {
    this.crAssigneePurchaseGrowthRatio = value;
  }

  getCrReceptionistPurchaseGrowthRatioValue(): number {
    return this.crReceptionistPurchaseGrowthRatio;
  }
  getCrReceptionistPurchaseGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crReceptionistPurchaseGrowthRatio),
    );
  }

  setCrReceptionistPurchaseGrowthRatio(value: number): void {
    this.crReceptionistPurchaseGrowthRatio = value;
  }

  getTrafficNotBoughtQuantityGrowthRatioValue(): number {
    return this.trafficNotBoughtQuantityGrowthRatio;
  }
  getTrafficNotBoughtQuantityGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.trafficNotBoughtQuantityGrowthRatio),
    );
  }

  setTrafficNotBoughtQuantityGrowthRatio(value: number): void {
    this.trafficNotBoughtQuantityGrowthRatio = value;
  }

  getNumberSlotCreatedGrowthRatioValue(): number {
    return this.numberSlotCreatedGrowthRatio;
  }

  getNumberSlotCreatedGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.numberSlotCreatedGrowthRatio),
    );
  }

  setNumberSlotCreatedGrowthRatio(value: number): void {
    this.numberSlotCreatedGrowthRatio = value;
  }

  getNumberSlotAssignGrowthRatioValue(): number {
    return this.numberSlotAssignGrowthRatio;
  }

  getNumberSlotAssignGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.numberSlotAssignGrowthRatio),
    );
  }

  setNumberSlotAssignGrowthRatio(value: number): void {
    this.numberSlotAssignGrowthRatio = value;
  }

  getNumberSlotBoughtGrowthRatioValue(): number {
    return this.numberSlotBoughtGrowthRatio;
  }

  getNumberSlotBoughtGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.numberSlotBoughtGrowthRatio),
    );
  }

  setNumberSlotBoughtGrowthRatio(value: number): void {
    this.numberSlotBoughtGrowthRatio = value;
  }

  getNumberSlotNotBoughtGrowthRatioValue(): number {
    return this.numberSlotNotBoughtGrowthRatio;
  }
  getNumberSlotNotBoughtGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.numberSlotNotBoughtGrowthRatio),
    );
  }

  setNumberSlotNotBoughtGrowthRatio(value: number): void {
    this.numberSlotNotBoughtGrowthRatio = value;
  }

  getCrSlotCreatedBoughtGrowthRatioValue(): number {
    return this.crSlotCreatedBoughtGrowthRatio;
  }
  getCrSlotCreatedBoughtGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crSlotCreatedBoughtGrowthRatio),
    );
  }

  setCrSlotCreatedBoughtGrowthRatio(value: number): void {
    this.crSlotCreatedBoughtGrowthRatio = value;
  }

  getCrSlotAssignBoughtGrowthRatioValue(): number {
    return this.crSlotAssignBoughtGrowthRatio;
  }

  getCrSlotAssignBoughtGrowthRatio(): string {
    return StringUtils.format(
      '{0}%',
      NumberUtils.formatNumber(this.crSlotAssignBoughtGrowthRatio),
    );
  }

  setCrSlotAssignBoughtGrowthRatio(value: number): void {
    this.crSlotAssignBoughtGrowthRatio = value;
  }

  fromResponse(data: ReportConversionResponse): ReportConversionEntity {
    return new ReportConversionEntity(data);
  }

  static createEmpty(): ReportConversionEntity {
    const emptyData: ReportConversionResponse = {
      trafficReceptionistQuantity: 0,
      trafficAssigneeQuantity: 0,
      customerPurchase: 0,
      crAssigneePurchase: 0,
      crReceptionistPurchase: 0,
      trafficNotBoughtQuantity: 0,
      numberSlotCreated: 0,
      numberSlotAssign: 0,
      numberSlotBought: 0,
      numberSlotNotBought: 0,
      crSlotCreatedBought: 0,
      crSlotAssignBought: 0,
      trafficReceptionistQuantityGrowthRatio: 0,
      trafficAssigneeQuantityGrowthRatio: 0,
      customerPurchaseGrowthRatio: 0,
      crAssigneePurchaseGrowthRatio: 0,
      crReceptionistPurchaseGrowthRatio: 0,
      trafficNotBoughtQuantityGrowthRatio: 0,
      numberSlotCreatedGrowthRatio: 0,
      numberSlotAssignGrowthRatio: 0,
      numberSlotBoughtGrowthRatio: 0,
      numberSlotNotBoughtGrowthRatio: 0,
      crSlotCreatedBoughtGrowthRatio: 0,
      crSlotAssignBoughtGrowthRatio: 0,
    };

    return new ReportConversionEntity(emptyData);
  }

  getQuery(request: ConversionRequest) {
    return this.objectToUrlParams(request);
  }
}
