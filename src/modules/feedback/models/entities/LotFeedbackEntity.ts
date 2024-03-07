import {LotFeedbackResponse} from 'modules/feedback/models/responses/LotFeedbackResponse';
import {FeedbackStatus} from 'modules/feedback/enums';

export class LotFeedbackEntity {
  totalLot: number;
  totalLotProcessed: number;
  totalLotNotProcessed: number;
  totalVisitor: number;
  totalVisitorProcessed: number;
  totalVisitorNotProcessed: number;
  lastDayTotalVisitor: number;
  lastDayTotalLot: number;
  lastDayTotalVisitorProcessed: number;
  lastDayTotalLotProcessed: number;
  numberOnPageBought: number;
  numberOnPageDeleted: number;
  numberOnPageEmptyAdvisor: number;
  numberOnPageInProgress: number;
  numberOnPageNotBought: number;
  numberOnPagePending: number;
  totalVisitorApplyKeybehavior: number;

  constructor(
    totalLot: number,
    totalLotProcessed: number,
    totalLotNotProcessed: number,
    totalVisitor: number,
    totalVisitorProcessed: number,
    totalVisitorNotProcessed: number,
    lastDayTotalVisitor: number,
    lastDayTotalLot: number,
    lastDayTotalVisitorProcessed: number,
    lastDayTotalLotProcessed: number,
    numberOnPageBought: number,
    numberOnPageDeleted: number,
    numberOnPageEmptyAdvisor: number,
    numberOnPageInProgress: number,
    numberOnPageNotBought: number,
    numberOnPagePending: number,
    totalVisitorApplyKeybehavior: number,
  ) {
    this.totalLot = totalLot;
    this.totalLotProcessed = totalLotProcessed;
    this.totalLotNotProcessed = totalLotNotProcessed;
    this.totalVisitor = totalVisitor;
    this.totalVisitorProcessed = totalVisitorProcessed;
    this.totalVisitorNotProcessed = totalVisitorNotProcessed;
    this.lastDayTotalVisitor = lastDayTotalVisitor;
    this.lastDayTotalLot = lastDayTotalLot;
    this.lastDayTotalVisitorProcessed = lastDayTotalVisitorProcessed;
    this.lastDayTotalLotProcessed = lastDayTotalLotProcessed;
    this.numberOnPageBought = numberOnPageBought;
    this.numberOnPageDeleted = numberOnPageDeleted;
    this.numberOnPageEmptyAdvisor = numberOnPageEmptyAdvisor;
    this.numberOnPageInProgress = numberOnPageInProgress;
    this.numberOnPageNotBought = numberOnPageNotBought;
    this.numberOnPagePending = numberOnPagePending;
    this.totalVisitorApplyKeybehavior = totalVisitorApplyKeybehavior;
  }

  static createEmpty(): LotFeedbackEntity {
    return new LotFeedbackEntity(
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    );
  }

  static fromResponse(response: LotFeedbackResponse): LotFeedbackEntity {
    return new LotFeedbackEntity(
      response.totalLot,
      response.totalLotProcessed,
      response.totalLotNotProcessed,
      response.totalVisitor,
      response.totalVisitorProcessed,
      response.totalVisitorNotProcessed,
      response.lastDayTotalVisitor,
      response.lastDayTotalLot,
      response.lastDayTotalVisitorProcessed,
      response.lastDayTotalLotProcessed,
      response.numberOnPageBought ?? 0,
      response.numberOnPageDeleted ?? 0,
      response.numberOnPageEmptyAdvisor ?? 0,
      response.numberOnPageInProgress ?? 0,
      response.numberOnPageNotBought ?? 0,
      response.numberOnPagePending ?? 0,
      response.totalVisitorApplyKeybehavior ?? 0,
    );
  }

  getTotalLotProcessed(): number {
    return this.totalLotProcessed;
  }

  getTotalLotNotProcessed(): number {
    return this.totalLotNotProcessed;
  }

  getTotalVisitor(): number {
    return this.totalVisitor;
  }

  getTotalVisitorProcessed(): number {
    return this.totalVisitorProcessed;
  }

  getLastDayTotalVisitor(): number {
    return this.lastDayTotalVisitor;
  }

  getLastDayTotalVisitorProcessed(): number {
    return this.lastDayTotalVisitorProcessed;
  }

  getGrowPercent(isStoreOnly: boolean) {
    let countToday = isStoreOnly
      ? this.getTotalVisitor()
      : this.getTotalVisitorProcessed();
    let countYesterday = isStoreOnly
      ? this.getLastDayTotalVisitor()
      : this.getLastDayTotalVisitorProcessed();
    return countToday - countYesterday;
  }

  getAllNumberOfStatus() {
    return (
      this.numberOnPageEmptyAdvisor +
      this.numberOnPagePending +
      this.numberOnPageInProgress +
      this.numberOnPageBought +
      this.numberOnPageNotBought
    );
  }

  getTotalVisitorApplyKeybehavior(): number {
    return this.totalVisitorApplyKeybehavior;
  }

  private getTotalEachStatus() {
    return {
      [FeedbackStatus.EMPTY_ADVISOR]: this.numberOnPageEmptyAdvisor ?? 0,
      [FeedbackStatus.PENDING]: this.numberOnPagePending ?? 0,
      [FeedbackStatus.IN_PROGRESS]: this.numberOnPageInProgress ?? 0,
      [FeedbackStatus.BOUGHT]: this.numberOnPageBought ?? 0,
      [FeedbackStatus.NOT_BUY]: this.numberOnPageNotBought ?? 0,
      DELETED: this.numberOnPageDeleted ?? 0,
      ALL: this.getAllNumberOfStatus(),
    };
  }
  getNumberByStatus(status: FeedbackStatus) {
    if (!status) {
      return 0;
    }
    return this.getTotalEachStatus()[status];
  }
}
