import moment from 'moment';
import {LoyaltyResponse} from '../responses';
import {DateFormatPattern} from 'common/enums';

export default class LoyaltyEntity {
  private id: number;
  private customerId: number;
  private loyaltyLevelId: number;
  private loyaltyLevel: string;
  private point: number;
  private totalOrderCount: number;
  private totalMoneySpend: number;
  private totalSubtractLockPoint: number | null;
  private grossSale: number;
  private levelChangeTime: Date;
  private moneyMaintainCurrentLevel: number;
  private remainAmountToLevelUp: number | null;
  private moneySpendInYear: number;
  private createdDate: Date;
  private createdBy: string;
  private updatedDate: Date;
  private updatedBy: string;
  private card: any | null;

  constructor(data: LoyaltyResponse) {
    this.id = data.id;
    this.customerId = data.customerId;
    this.loyaltyLevelId = data.loyaltyLevelId;
    this.loyaltyLevel = data.loyaltyLevel;
    this.point = data.point;
    this.totalOrderCount = data.totalOrderCount;
    this.totalMoneySpend = data.totalMoneySpend;
    this.totalSubtractLockPoint = data.totalSubtractLockPoint;
    this.grossSale = data.grossSale;
    this.levelChangeTime = new Date(data.levelChangeTime);
    this.moneyMaintainCurrentLevel = data.moneyMaintainCurrentLevel;
    this.remainAmountToLevelUp = data.remainAmountToLevelUp;
    this.moneySpendInYear = data.moneySpendInYear;
    this.createdDate = new Date(data.createdDate);
    this.createdBy = data.createdBy;
    this.updatedDate = new Date(data.updatedDate);
    this.updatedBy = data.updatedBy;
    this.card = data.card;
  }

  static createEmpty(): LoyaltyEntity {
    return new LoyaltyEntity({
      id: 0,
      customerId: 0,
      loyaltyLevelId: 0,
      loyaltyLevel: '',
      point: 0,
      totalOrderCount: 0,
      totalMoneySpend: 0,
      totalSubtractLockPoint: null,
      grossSale: 0,
      levelChangeTime: moment().format(DateFormatPattern.YYYYMMDD),
      moneyMaintainCurrentLevel: 0,
      remainAmountToLevelUp: null,
      moneySpendInYear: 0,
      createdDate: moment().format(DateFormatPattern.YYYYMMDD),
      createdBy: '',
      updatedDate: moment().format(DateFormatPattern.YYYYMMDD),
      updatedBy: '',
      card: null,
    });
  }

  getCustomerId() {
    return this.customerId;
  }

  getLoyaltyLevelId() {
    return this.loyaltyLevelId;
  }

  getLevel() {
    if (!this.loyaltyLevel) {
      return 'Member';
    }
    return this.loyaltyLevel;
  }

  getPoint() {
    return this.point;
  }
}
