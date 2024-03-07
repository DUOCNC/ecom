import {NumberUtils, StringUtils} from 'common';
import {BaseAnalyticEntity, ReportRankEntity} from '.';
import {ReportEmulationRequest} from '../requests';
import {
  ReportEmulationItemResponse,
  ReportEmulationResponse,
} from '../responses';
import {CRVViewType} from 'modules/analytic/config/ReportConfig';

export default abstract class ReportEmulationEntity extends BaseAnalyticEntity {
  private reportEmulationItems: Array<ReportRankEntity>;
  protected summary: ReportEmulationItemEntity;
  protected viewType: 'rsm' | 'am' | 'store' | string;
  constructor() {
    super();
    this.reportEmulationItems = [];
    this.summary = ReportEmulationItemEntity.createEmpty();
    this.viewType = 'rsm';
  }

  abstract createEmpty(): ReportEmulationEntity;

  abstract getReportData(
    arr: ReportEmulationResponse | null,
    sort?: CRVViewType,
  ): Array<ReportRankEntity>;

  setReportData(res: ReportEmulationResponse | null, sort?: CRVViewType) {
    if (res === null) {
      return;
    }
    this.viewType = res.viewType;
    if (res.items && res.items.length > 0) {
      this.reportEmulationItems = this.getReportData(res, sort);
    }
    if (res.summary) {
      this.summary = ReportEmulationItemEntity.create(res.summary);
    }
  }

  getReportEmulationItems() {
    return this.reportEmulationItems;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTotal(sort: CRVViewType) {
    return NumberUtils.formatCurrency(this.getTotalValue());
  }

  getTotalValue(): number {
    return this.summary.getRevenue();
  }

  abstract getGrowthRatio(): string;

  abstract getGrowthRatioValue(sort: CRVViewType): number;

  getViewType() {
    return this.viewType;
  }

  getDepartmentName() {
    return this.summary.getDepartmentName();
  }
}

export class ReportEmulationRevenueEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationRevenueEntity();
  }
  getReportData(data: ReportEmulationResponse | null) {
    if (data == null || data.items === null) {
      return [];
    }
    let items: Array<ReportRankEntity> = [];
    for (let i = 0; i < data.items.length; i++) {
      const e = data.items[i];
      let value = e.revenue;
      if (value < 0) {
        continue;
      }
      items.push(new ReportRankEntity(e.departmentName, value));
    }
    return items;
  }

  getQuery(request: ReportEmulationRequest) {
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=sales&timeType={2}',
      request.beginDate,
      request.endDate,
      request.timeType,
    );
  }

  getTotalValue(): number {
    return this.summary.getRevenue();
  }

  getGrowthRatio() {
    return NumberUtils.formatCurrency(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getSalesGrowthRatio();
  }
}

export class ReportEmulationCustomerEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationCustomerEntity();
  }
  getReportData(data: ReportEmulationResponse | null) {
    if (data == null || data.items === null) {
      return [];
    }
    let items: Array<ReportRankEntity> = [];
    for (let i = 0; i < data.items.length; i++) {
      const e = data.items[i];
      let value = e.numberCustomers;
      if (value < 0) {
        continue;
      }
      items.push(new ReportRankEntity(e.departmentName, value));
    }
    return items;
  }

  getTotal() {
    return NumberUtils.formatNumber(this.summary.getNumberCustomers());
  }

  getQuery(request: ReportEmulationRequest) {
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=customer_purchase&timeType={2}',
      request.beginDate,
      request.endDate,
      request.timeType,
    );
  }

  getGrowthRatio() {
    return NumberUtils.formatNumber(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getCustomersGrowthRatio();
  }
}

export class ReportEmulationAverageEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationAverageEntity();
  }
  getReportData(res: ReportEmulationResponse | null) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      data.push(new ReportRankEntity(e.departmentName, e.averageOrderValue));
    }
    return data;
  }

  getTotalValue(): number {
    return this.summary.getAverageOrderValue();
  }

  getQuery(request: ReportEmulationRequest) {
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort={2}&timeType={3}',
      request.beginDate,
      request.endDate,
      request.sort,
      request.timeType,
    );
  }

  getGrowthRatio() {
    return NumberUtils.formatCurrency(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getAovGrowthRatio();
  }
}

export class ReportEmulationCRVEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationAverageEntity();
  }

  getReportData(res: ReportEmulationResponse | null, sort: CRVViewType) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      if (sort === 'cr_slot_created') {
        data.push(new ReportRankEntity(e.departmentName, e.crSlotCreated));
      }
      if (sort === 'cr_traffic_assignee') {
        data.push(new ReportRankEntity(e.departmentName, e.crTrafficAssignee));
      }
    }
    return data;
  }

  getTotalValue(sort: CRVViewType = CRVViewType.customer): number {
    if (sort === CRVViewType.customer) {
      return this.summary.getCrTrafficAssignee();
    }
    if (sort === CRVViewType.lot) {
      return this.summary.getCrSlotCreated();
    }
    return 0;
  }

  getTotal(sort: CRVViewType = CRVViewType.customer): string {
    return StringUtils.format(`${this.getTotalValue(sort) ?? '--'}%`);
  }

  getQuery(request: ReportEmulationRequest, sort?: CRVViewType) {
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort={2}&timeType={3}',
      request.beginDate,
      request.endDate,
      sort,
      request.timeType,
    );
  }

  getGrowthRatioValue(sort: CRVViewType = CRVViewType.customer) {
    if (sort === CRVViewType.customer) {
      return this.summary.getCrTrafficAssigneeGrowthRatio();
    }
    if (sort === CRVViewType.lot) {
      return this.summary.getCrSlotCreatedGrowthRatio();
    }
    return 0;
  }

  getGrowthRatio(): string {
    return '';
  }
}

//ASM
export class ReportEmulationRevenueASMEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationRevenueASMEntity();
  }
  getReportData(res: ReportEmulationResponse | null) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      let value = e.revenue;
      if (value < 0) {
        continue;
      }
      data.push(new ReportRankEntity(e.departmentName, value));
    }
    return data;
  }

  getQuery(request: ReportEmulationRequest) {
    const qDepartmentLv2 = request.departmentLv2
      ? StringUtils.format('&departmentLv2={0}', request.departmentLv2)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=sales&timeType={2}{3}',
      request.beginDate,
      request.endDate,
      request.timeType,
      qDepartmentLv2,
    );
  }

  getGrowthRatio() {
    return NumberUtils.formatCurrency(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getSalesGrowthRatio();
  }
}

export class ReportEmulationCustomerASMEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationCustomerASMEntity();
  }
  getReportData(res: ReportEmulationResponse | null) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      let value = e.numberCustomers;
      if (value < 0) {
        continue;
      }
      data.push(new ReportRankEntity(e.departmentName, value));
    }
    return data;
  }

  getTotal() {
    return NumberUtils.formatNumber(this.summary.getNumberCustomers());
  }

  getQuery(request: ReportEmulationRequest) {
    const qDepartmentLv2 = request.departmentLv2
      ? StringUtils.format('&departmentLv2={0}', request.departmentLv2)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=customer_purchase&timeType={2}{3}',
      request.beginDate,
      request.endDate,
      request.timeType,
      qDepartmentLv2,
    );
  }

  getGrowthRatio() {
    return NumberUtils.formatNumber(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getCustomersGrowthRatio();
  }
}

export class ReportEmulationAverageASMEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationAverageASMEntity();
  }
  getReportData(res: ReportEmulationResponse | null) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      data.push(new ReportRankEntity(e.departmentName, e.averageOrderValue));
    }
    return data;
  }

  getTotalValue(): number {
    return this.summary.getAverageOrderValue();
  }

  getQuery(request: ReportEmulationRequest) {
    const qDepartmentLv2 = request.departmentLv2
      ? StringUtils.format('&departmentLv2={0}', request.departmentLv2)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=aov&timeType={2}{3}',
      request.beginDate,
      request.endDate,
      request.timeType,
      qDepartmentLv2,
    );
  }

  getGrowthRatio() {
    return NumberUtils.formatCurrency(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getAovGrowthRatio();
  }
}

export class ReportEmulationCRVASMEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationAverageEntity();
  }

  getReportData(res: ReportEmulationResponse | null, sort: CRVViewType) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      if (sort === 'cr_slot_created') {
        data.push(new ReportRankEntity(e.departmentName, e.crSlotCreated));
      }
      if (sort === 'cr_traffic_assignee') {
        data.push(new ReportRankEntity(e.departmentName, e.crTrafficAssignee));
      }
    }
    return data;
  }

  getTotalValue(sort: CRVViewType = CRVViewType.customer): number {
    if (sort === CRVViewType.customer) {
      return this.summary.getCrTrafficAssignee();
    }
    if (sort === CRVViewType.lot) {
      return this.summary.getCrSlotCreated();
    }
    return 0;
  }

  getTotal(sort: CRVViewType = CRVViewType.customer): string {
    return StringUtils.format(`${this.getTotalValue(sort) ?? '--'}%`);
  }

  getQuery(request: ReportEmulationRequest, sort?: CRVViewType) {
    const qDepartmentLv2 = request.departmentLv2
      ? StringUtils.format('&departmentLv2={0}', request.departmentLv2)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort={2}&timeType={3}{4}',
      request.beginDate,
      request.endDate,
      sort,
      request.timeType,
      qDepartmentLv2,
    );
  }

  getGrowthRatioValue(sort: CRVViewType = CRVViewType.customer) {
    if (sort === CRVViewType.customer) {
      return this.summary.getCrTrafficAssigneeGrowthRatio();
    }
    if (sort === CRVViewType.lot) {
      return this.summary.getCrSlotCreatedGrowthRatio();
    }
    return 0;
  }

  getGrowthRatio(): string {
    return '';
  }
}

//POS
export class ReportEmulationRevenuePOSEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationRevenuePOSEntity();
  }
  getReportData(res: ReportEmulationResponse | null) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      let value = e.revenue;
      if (value < 0) {
        continue;
      }
      data.push(new ReportRankEntity(e.departmentName, value));
    }
    return data;
  }

  getQuery(request: ReportEmulationRequest) {
    const qDepartmentLv3 = request.departmentLv3
      ? StringUtils.format('&departmentLv3={0}', request.departmentLv3)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=sales&timeType={2}{3}',
      request.beginDate,
      request.endDate,
      request.timeType,
      qDepartmentLv3,
    );
  }
  getTotalValue(): number {
    return this.summary.getRevenue();
  }

  getGrowthRatio() {
    return NumberUtils.formatCurrency(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getSalesGrowthRatio();
  }
}

export class ReportEmulationCustomerPOSEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationCustomerPOSEntity();
  }
  getReportData(res: ReportEmulationResponse | null) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      let value = e.numberCustomers;
      if (value < 0) {
        continue;
      }
      data.push(new ReportRankEntity(e.departmentName, value));
    }
    return data;
  }

  getTotal() {
    return NumberUtils.formatNumber(this.summary.getNumberCustomers());
  }

  getQuery(request: ReportEmulationRequest) {
    const qDepartmentLv3 = request.departmentLv3
      ? StringUtils.format('&departmentLv3={0}', request.departmentLv3)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=customer_purchase&timeType={2}{3}',
      request.beginDate,
      request.endDate,
      request.timeType,
      qDepartmentLv3,
    );
  }

  getGrowthRatio() {
    return NumberUtils.formatNumber(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getCustomersGrowthRatio();
  }
}

export class ReportEmulationAveragePOSEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationAveragePOSEntity();
  }
  getReportData(res: ReportEmulationResponse | null) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      let value = e.averageOrderValue;
      if (value < 0) {
        continue;
      }
      data.push(new ReportRankEntity(e.departmentName, value));
    }
    return data;
  }
  getTotalValue(): number {
    return this.summary.getAverageOrderValue();
  }

  getQuery(request: ReportEmulationRequest) {
    const qDepartmentLv3 = request.departmentLv3
      ? StringUtils.format('&departmentLv3={0}', request.departmentLv3)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort=aov&timeType={2}{3}',
      request.beginDate,
      request.endDate,
      request.timeType,
      qDepartmentLv3,
    );
  }

  getGrowthRatio() {
    return NumberUtils.formatCurrency(this.getGrowthRatioValue());
  }

  getGrowthRatioValue() {
    return this.summary.getAovGrowthRatio();
  }
}

export class ReportEmulationCRVPOSEntity extends ReportEmulationEntity {
  constructor() {
    super();
  }
  createEmpty() {
    return new ReportEmulationAverageEntity();
  }

  getReportData(res: ReportEmulationResponse | null, sort: CRVViewType) {
    if (res == null || res.items === null) {
      return [];
    }
    let data: Array<ReportRankEntity> = [];
    for (let i = 0; i < res.items.length; i++) {
      const e = res.items[i];
      if (sort === 'cr_slot_created') {
        data.push(new ReportRankEntity(e.departmentName, e.crSlotCreated));
      }
      if (sort === 'cr_traffic_assignee') {
        data.push(new ReportRankEntity(e.departmentName, e.crTrafficAssignee));
      }
    }
    return data;
  }

  getTotalValue(sort: CRVViewType = CRVViewType.customer): number {
    if (sort === CRVViewType.customer) {
      return this.summary.getCrTrafficAssignee();
    }
    if (sort === CRVViewType.lot) {
      return this.summary.getCrSlotCreated();
    }
    return 0;
  }

  getTotal(sort: CRVViewType = CRVViewType.customer): string {
    return StringUtils.format(`${this.getTotalValue(sort) ?? '--'}%`);
  }

  getQuery(request: ReportEmulationRequest, sort?: CRVViewType) {
    const qDepartmentLv3 = request.departmentLv3
      ? StringUtils.format('&departmentLv3={0}', request.departmentLv3)
      : '';
    return StringUtils.format(
      'beginDate={0}&endDate={1}&sort={2}&timeType={3}{4}',
      request.beginDate,
      request.endDate,
      sort,
      request.timeType,
      qDepartmentLv3,
    );
  }

  getGrowthRatioValue(sort: CRVViewType = CRVViewType.customer) {
    if (sort === CRVViewType.customer) {
      return this.summary.getCrTrafficAssigneeGrowthRatio();
    }
    if (sort === CRVViewType.lot) {
      return this.summary.getCrSlotCreatedGrowthRatio();
    }
    return 0;
  }

  getGrowthRatio(): string {
    return '';
  }
}

//--------

export class ReportEmulationItemEntity {
  constructor(
    private departmentName: string,
    private revenue: number,
    private averageOrderValue: number,
    private numberCustomers: number,
    private salesGrowthRatio: number,
    private aovGrowthRatio: number,
    private customersGrowthRatio: number,
    private trafficAssigneeQuantity: number,
    private crTrafficAssignee: number,
    private crTrafficAssigneeGrowthRatio: number,
    private crSlotCreated: number,
    private crSlotCreatedGrowthRatio: number,
    private numberSlotCreated: number,
    private numberSlotBought: number,
  ) {}

  static createEmpty(): ReportEmulationItemEntity {
    return new ReportEmulationItemEntity(
      '',
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

  static create(data: ReportEmulationItemResponse): ReportEmulationItemEntity {
    const {
      departmentName,
      revenue,
      averageOrderValue,
      numberCustomers,
      salesGrowthRatio,
      aovGrowthRatio,
      customersGrowthRatio,
      trafficAssigneeQuantity,
      crTrafficAssignee,
      crTrafficAssigneeGrowthRatio,
      crSlotCreated,
      crSlotCreatedGrowthRatio,
      numberSlotCreated,
      numberSlotBought,
    } = data;

    return new ReportEmulationItemEntity(
      departmentName,
      revenue,
      averageOrderValue,
      numberCustomers,
      salesGrowthRatio,
      aovGrowthRatio,
      customersGrowthRatio,
      trafficAssigneeQuantity,
      crTrafficAssignee,
      crTrafficAssigneeGrowthRatio,
      crSlotCreated,
      crSlotCreatedGrowthRatio,
      numberSlotCreated,
      numberSlotBought,
    );
  }

  getDepartmentName(): string {
    return this.departmentName;
  }

  getCrTrafficAssignee(): number {
    return this.crTrafficAssignee;
  }

  getCrTrafficAssigneeGrowthRatio(): number {
    return this.crTrafficAssigneeGrowthRatio;
  }

  getCrSlotCreated(): number {
    return this.crSlotCreated;
  }

  getCrSlotCreatedGrowthRatio(): number {
    return this.crSlotCreatedGrowthRatio;
  }

  getTrafficAssigneeQuantity(): number {
    return this.trafficAssigneeQuantity;
  }

  getNumberSlotCreated(): number {
    return this.numberSlotCreated;
  }

  getNumberSlotBought(): number {
    return this.numberSlotBought;
  }

  setDepartmentName(departmentName: string) {
    this.departmentName = departmentName;
  }

  getRevenue(): number {
    return this.revenue;
  }

  setRevenue(revenue: number) {
    this.revenue = revenue;
  }

  getAverageOrderValue(): number {
    return this.averageOrderValue;
  }

  setAverageOrderValue(averageOrderValue: number) {
    this.averageOrderValue = averageOrderValue;
  }

  getNumberCustomers(): number {
    return this.numberCustomers;
  }

  setNumberCustomers(numberCustomers: number) {
    this.numberCustomers = numberCustomers;
  }

  getSalesGrowthRatio(): number {
    return this.salesGrowthRatio;
  }

  setSalesGrowthRatio(salesGrowthRatio: number) {
    this.salesGrowthRatio = salesGrowthRatio;
  }

  getAovGrowthRatio(): number {
    return this.aovGrowthRatio;
  }

  setAovGrowthRatio(aovGrowthRatio: number) {
    this.aovGrowthRatio = aovGrowthRatio;
  }

  getCustomersGrowthRatio(): number {
    return this.customersGrowthRatio;
  }

  setCustomersGrowthRatio(customersGrowthRatio: number) {
    this.customersGrowthRatio = customersGrowthRatio;
  }
}
