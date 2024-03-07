import ExpectSalaryTabEntity from 'modules/personalize/models/entities/ExpectSalaryTabEntity';
import ExpectSalaryView from 'modules/personalize/ui/views/ExpectSalaryView';
import AdditionalInformationView from 'modules/personalize/ui/views/AdditionalInformationView';
import RoleSalaryExpectEntity from 'modules/personalize/models/entities/RoleSalaryExpectEntity';
import {PersonnelEntity} from 'modules/personalize/models/entities';
import {ExpectPosition} from 'modules/personalize/enums';

const ExpectSalaryTabConfig: Array<ExpectSalaryTabEntity> = [
  new ExpectSalaryTabEntity(1, 'Lương dự kiến', ExpectSalaryView),
  new ExpectSalaryTabEntity(2, 'Thông tin bổ sung', AdditionalInformationView),
];

export const roleSalaryExpect = (data: PersonnelEntity) => {
  const dataSalaryAssignee = [
    data.getTotalBaseSalary(),
    data.getActualSalePersonalSalary(),
    data.getMealAllowance(),
    data.getActualRegionalAllowance(),
    data.getAddOther(),
    data.getAdditionalWareHouse(),
    data.getAdditionalKpiSalary(),
    data.getAdditionalActualLeadShopSalary(),
    data.getAdditionalActualCashierSalary(),
  ];
  const dataSalaryLeadShop = [
    data.getTotalBaseSalary(),
    data.getActualLeadShopSalary(),
    data.getKpiSalary(),
    data.getMealAllowance(),
    data.getActualRegionalAllowance(),
    data.getAddOther(),
    data.getAdditionalActualSalePersonalSalary(),
    data.getAdditionalActualWarehouseSalary(),
  ];
  const dataSalaryLeadShopProbation = [
    data.getTotalBaseSalary(),
    data.getMealAllowance(),
    data.getActualRegionalAllowance(),
    data.getAddOther(),
    data.getAdditionalActualCashierSalary(),
    data.getAdditionalActualSalePersonalSalary(),
    data.getAdditionalKpiSalary(),
  ];
  const dataSalaryCashier = [
    data.getTotalBaseSalary(),
    data.getActualSalePersonalSalary(),
    data.getActualCashierSalary(),
    data.getKpiSalary(),
    data.getMealAllowance(),
    data.getActualRegionalAllowance(),
    data.getAddOther(),
    data.getAdditionalActualLeadShopSalary(),
  ];
  const dataSalaryWarehouse = [
    data.getTotalBaseSalary(),
    data.getActualSalePersonalSalary(),
    data.getActualWarehouseSalary(),
    data.getKpiSalary(),
    data.getMealAllowance(),
    data.getActualRegionalAllowance(),
    data.getAddOther(),
  ];
  const dataSalaryReception = [
    data.getTotalBaseSalary(),
    data.getActualSalePersonalSalary(),
    data.getStandardSalary(),
    data.getMealAllowance(),
    data.getActualRegionalAllowance(),
    data.getAddOther(),
  ];
  return [
    new RoleSalaryExpectEntity(
      ExpectPosition.leadShop,
      'Cửa hàng trưởng',
      dataSalaryLeadShop,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.probationaryLeadShop,
      'Cửa hàng trưởng thử việc',
      dataSalaryLeadShop,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.traineeLeadShop,
      'Cửa hàng trưởng học việc',
      dataSalaryLeadShopProbation,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.assignee,
      'Chuyên gia tư vấn',
      dataSalaryAssignee,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.probationaryAssignee,
      'Chuyên gia tư vấn thử việc',
      dataSalaryAssignee,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.cashier,
      'Nhân viên thu ngân',
      dataSalaryCashier,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.probationaryCashier,
      'Nhân viên thu ngân thử việc',
      dataSalaryCashier,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.wareHouser,
      'Nhân viên kho(CH)',
      dataSalaryWarehouse,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.probationaryWareHouser,
      'Nhân viên kho thử việc(CH)',
      dataSalaryWarehouse,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.reception,
      'Tiếp đón khách hàng',
      dataSalaryReception,
    ),
    new RoleSalaryExpectEntity(
      ExpectPosition.probationaryReception,
      'Tiếp đón khách hàng thử việc',
      dataSalaryReception,
    ),
  ];
};
export const roleDeduct = (data: PersonnelEntity) => {
  return [
    data.getSocialInsuranceFee(),
    data.getUnionCorporationFee(),
    data.getViolate(),
    data.getAdvancePayment(),
    data.getPhoneCharges(),
    data.getLostGoods(),
    data.getTax(),
    data.getDeductionOther(),
  ];
};

export default ExpectSalaryTabConfig;
