import {AwardResponse} from '../responses';

export class AwardEntity {
  public createdBy: string;
  public createdAt: string;
  public updatedBy: string;
  public updatedAt: string;
  public id: number;
  public title: string;
  public subTitle: string;
  public reason: string;
  public awardDate: string;
  public awardFor: string;
  public type: string;
  public version: number;

  constructor(data: AwardResponse) {
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.updatedBy = data.updatedBy;
    this.updatedAt = data.updatedAt;
    this.id = data.id;
    this.title = data.title;
    this.subTitle = data.subTitle;
    this.reason = data.reason;
    this.awardDate = data.awardDate;
    this.awardFor = data.awardFor;
    this.type = data.type;
    this.version = data.version;
  }

  static fromResponseArray(data: AwardResponse[]): AwardEntity[] {
    return data.map(item => new AwardEntity(item));
  }

  public getTitle(): string {
    return this.title;
  }

  public getId(): number {
    return this.id;
  }

  private setTitle(value: string) {
    this.title = value;
  }

  public getSubTitle(): string {
    return this.subTitle;
  }

  private setSubTitle(value: string) {
    this.subTitle = value;
  }

  public getAwardFor(): string {
    return this.awardFor;
  }

  private setAwardFor(value: string) {
    this.awardFor = value;
  }
}
