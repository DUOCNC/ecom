import {RolePositionId} from './RolePositionId';

export default class Decentralization {
  private readonly positionId: number;
  private listPositionPosOrder: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.cashier,
    RolePositionId.probationaryCashier,
    RolePositionId.wareHouser,
    RolePositionId.probationaryWareHouser,
  ];
  private listPositionReturnOrder: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.cashier,
    RolePositionId.probationaryCashier,
    RolePositionId.wareHouser,
    RolePositionId.probationaryWareHouser,
  ];
  private listPositionCreatePosOrder: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.probationaryAssignee,
    RolePositionId.cashier,
    RolePositionId.probationaryCashier,
  ];
  private listPositionReportGeneral: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.cashier,
    RolePositionId.probationaryCashier,
  ];
  private listPositionReportAssignee: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
  ];
  private listPositionReportCashier: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.cashier,
  ];
  private listPositionRevenue: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.cashier,
    RolePositionId.probationaryCashier,
    RolePositionId.wareHouser,
    RolePositionId.probationaryWareHouser,
  ];
  private listPositionExpectSalary: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.probationaryAssignee,
    RolePositionId.cashier,
    RolePositionId.probationaryCashier,
    RolePositionId.wareHouser,
    RolePositionId.probationaryWareHouser,
    RolePositionId.reception,
    RolePositionId.probationaryReception,
  ];
  private listPositionConvert: Array<number> = [
    RolePositionId.leadShop,
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.assignee,
    RolePositionId.probationaryAssignee,
    RolePositionId.cashier,
    RolePositionId.probationaryCashier,
    RolePositionId.wareHouser,
    RolePositionId.probationaryWareHouser,
  ];
  private listPositionFeedback: Array<number> = [
    RolePositionId.reception,
    RolePositionId.probationaryReception,
  ];
  private listPositionEditFeedback: Array<number> = [
    RolePositionId.probationaryLeadShop,
    RolePositionId.traineeLeadShop,
    RolePositionId.leadShop,
  ];

  constructor(positionId: number | null) {
    if (positionId) {
      this.positionId = positionId;
    } else {
      this.positionId = -1;
    }
  }

  isViewListPosOrderScreen = () => {
    return this.listPositionPosOrder.includes(this.positionId);
  };
  isViewListReturnOrderScreen = () => {
    return this.listPositionReturnOrder.includes(this.positionId);
  };
  isViewCreatePosOrderScreen = () => {
    return this.listPositionCreatePosOrder.includes(this.positionId);
  };
  isViewReportGeneralScreen = () => {
    return this.listPositionReportGeneral.includes(this.positionId);
  };
  isViewReportAssigneeScreen = () => {
    return this.listPositionReportAssignee.includes(this.positionId);
  };
  isViewReportCashierScreen = () => {
    return this.listPositionReportCashier.includes(this.positionId);
  };
  isViewRevenue = () => {
    return this.listPositionRevenue.includes(this.positionId);
  };
  isViewExpectSalaryScreen = () => {
    return this.listPositionExpectSalary.includes(this.positionId);
  };
  isViewConvertScreen = () => {
    return this.listPositionConvert.includes(this.positionId);
  };
  isViewFeedback = () => {
    return this.listPositionFeedback.includes(this.positionId);
  };
  isEditFeedBack = () => {
    return this.listPositionEditFeedback.includes(this.positionId);
  };
}
