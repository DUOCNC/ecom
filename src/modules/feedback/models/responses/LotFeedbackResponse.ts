export interface LotFeedbackResponse {
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
}
