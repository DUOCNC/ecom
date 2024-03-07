import {AnalyticResponse} from '../responses';
import NumberUtils from 'utils/NumberUtils';
import BarChartEntity from './BarChartEntity';
import {IReportRetail, IReportRetailDetail} from '../interface';
import {BaseAnalyticEntity} from '.';

export default abstract class ReportRetailEntity
  extends BaseAnalyticEntity
  implements IReportRetail
{
  private barChartData: Array<BarChartEntity>;
  constructor() {
    super();
    this.barChartData = [];
  }

  setBarChartData(arr: Array<any[]> | null) {
    if (arr == null) {
      return [];
    }
    this.barChartData = this.getBarChartData(arr);
  }

  abstract getBarChartData(arr: Array<any[]> | null): Array<BarChartEntity>;

  getDataChart() {
    return this.barChartData;
  }
}

export class ReportRetailRevenueEntity extends ReportRetailEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<any[]> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      let value = e[1];
      if (value <= 0) {
        continue;
      }
      data.push(new BarChartEntity(e[0], value));
    }
    return data;
  }
}

export class ReportRetailCustomerEntity extends ReportRetailEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<any[]> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      let value = e[2];
      if (value <= 0) {
        continue;
      }
      data.push(new BarChartEntity(e[0], value));
    }
    return data;
  }
}

export class ReportRetailAverageEntity extends ReportRetailEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<any[]> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      let value = e[3];
      if (value <= 0) {
        continue;
      }
      data.push(new BarChartEntity(e[0], value));
    }
    return data;
  }
}

/**
 * Key Driver
 */
export class ReportKeyDriverEntity {
  private averageCustomer: number;
  private order: number;
  private averageCustomerRate: number;
  private orderRate: number;

  constructor() {
    this.averageCustomer = 0;
    this.order = 0;
    this.averageCustomerRate = 0;
    this.orderRate = 0;
  }

  setReportKeyDriver(
    report: AnalyticResponse<any>,
    reportOld?: AnalyticResponse<any>,
  ) {
    if (report.result.summary !== null) {
      let summaryData = report.result.summary;
      if (summaryData[1] && summaryData[2] && summaryData[2] !== 0) {
        this.setAverageCustomer(summaryData[1] / summaryData[2]);
      }

      this.setOrder(summaryData[4]);
      if (reportOld && reportOld.result.data.length !== null) {
        let summaryDataOld = reportOld.result.summary;
        if (summaryDataOld[1] && summaryDataOld[2] && summaryDataOld[2] !== 0) {
          this.setAverageCustomerRate(
            this.averageCustomer,
            summaryDataOld[1] / summaryDataOld[2],
          );
        }

        this.setOrderRate(summaryData[4], summaryDataOld[4]);
      }
    }
  }

  private setAverageCustomer(averageCustomer: number | null) {
    if (averageCustomer == null) {
      return;
    }
    this.averageCustomer = parseFloat(averageCustomer.toFixed(1));
  }
  private setOrder(order: number | null) {
    if (order == null) {
      return;
    }
    this.order = parseFloat(order.toFixed(1));
  }

  private setOrderRate(order: number | null, orderOld: number | null) {
    if (order == null || orderOld == null || orderOld === 0) {
      return;
    }
    this.orderRate = ((order - orderOld) / Math.abs(orderOld)) * 100;
  }

  private setAverageCustomerRate(acr: number | null, acrOld: number | null) {
    if (acr == null || acrOld === null || acrOld === 0) {
      return;
    }
    this.averageCustomerRate = ((acr - acrOld) / Math.abs(acrOld)) * 100;
  }

  getAverageCustomer() {
    return NumberUtils.formatCurrency(this.averageCustomer);
  }
  getOrder() {
    return NumberUtils.formatNumber(this.order);
  }
  getAverageCustomerRate() {
    return NumberUtils.formatCurrency(this.averageCustomerRate);
  }
  getOrderRate() {
    return NumberUtils.formatCurrency(this.orderRate);
  }

  getKeyDriverItem() {
    let arr: Array<ReportRetailKeyDriverItemEntity> = [];

    if (!this.averageCustomer || !this.order) {
      return arr;
    }
    arr.push(
      new ReportRetailKeyDriverItemEntity(
        this.averageCustomer,
        this.averageCustomerRate,
        'currency',
      ),
      new ReportRetailKeyDriverItemEntity(this.order, this.orderRate, null),
    );
    return arr;
  }
}

export abstract class ReportRetailChartDetailEntity
  implements IReportRetailDetail
{
  protected value: number;
  private rate: number;

  constructor() {
    this.value = 0;
    this.rate = 0;
  }

  setValue(value: number | null) {
    if (value === null) {
      return;
    }
    this.value = value;
  }
  setRate(value: number | null, valueOld: number | null) {
    if (!value || !valueOld || valueOld === 0) {
      return;
    }
    this.rate = ((value - valueOld) / valueOld) * 100;
  }

  setReportRetailChartDetail(
    report: AnalyticResponse<any>,
    reportOld: AnalyticResponse<any>,
  ) {
    this.getDataDetail(report, reportOld);
  }

  abstract getDataDetail(
    report: AnalyticResponse<any>,
    reportOld: AnalyticResponse<any>,
  ): void;

  getValue() {
    return NumberUtils.formatCurrency(this.value);
  }

  getRate() {
    return this.rate;
  }
}

export class ReportRetailRevenueDetailEntity extends ReportRetailChartDetailEntity {
  constructor() {
    super();
  }
  getDataDetail(
    report: AnalyticResponse<any>,
    reportOld: AnalyticResponse<any>,
  ) {
    if (report.result.summary != null) {
      const summary = report.result.summary;
      if (!summary[1]) {
        return;
      }
      this.setValue(parseFloat(summary[1].toFixed(1)));
      if (reportOld.result.summary != null) {
        const summaryOld = reportOld.result.summary;
        if (!summaryOld[1] || summaryOld[1] === 0) {
          return;
        }
        this.setRate(
          parseFloat(summary[1].toFixed(1)),
          parseFloat(summaryOld[1].toFixed(1)),
        );
      }
    }
  }
}

export class ReportRetailCustomerDetailEntity extends ReportRetailChartDetailEntity {
  constructor() {
    super();
  }
  getDataDetail(
    report: AnalyticResponse<any>,
    reportOld: AnalyticResponse<any>,
  ) {
    if (report.result.summary != null) {
      const summary = report.result.summary;
      if (!summary[2] || summary[2] === 0) {
        return;
      }
      this.setValue(parseFloat(summary[2].toFixed(1)));
      if (reportOld.result.summary != null) {
        const summaryOld = reportOld.result.summary;
        if (!summaryOld[2] || summaryOld[2] === 0) {
          return;
        }

        this.setRate(
          parseFloat(summary[2].toFixed(1)),
          parseFloat(summaryOld[2].toFixed(1)),
        );
      }
    }
  }

  getValue() {
    return NumberUtils.formatNumber(this.value);
  }
}

export class ReportRetailAverageDetailEntity extends ReportRetailChartDetailEntity {
  constructor() {
    super();
  }
  getDataDetail(
    report: AnalyticResponse<any>,
    reportOld: AnalyticResponse<any>,
  ) {
    if (report.result.summary != null) {
      const summary = report.result.summary;
      if (!summary[1] || !summary[4] || summary[4] === 0) {
        return;
      }
      this.setValue(parseFloat((summary[1] / summary[4]).toFixed(1)));
      if (!summary[1] || summary[1] === 0) {
        return;
      }
      if (reportOld.result.summary != null) {
        const summaryOld = reportOld.result.summary;
        if (!summaryOld[1] || !summaryOld[4] || summaryOld[4] === 0) {
          return;
        }

        this.setRate(
          parseFloat((summary[1] / summary[4]).toFixed(1)),
          parseFloat((summaryOld[1] / summaryOld[4]).toFixed(1)),
        );
      }
    }
  }
}

export class ReportRetailKeyDriverItemEntity {
  private rate: number;
  private growthRate: number | undefined;
  private valueType: string | null;

  constructor(
    rate: number,
    growthRate: number | undefined,
    valueType: string | null,
  ) {
    this.rate = rate;
    this.growthRate = growthRate;
    this.valueType = valueType;
  }
  getRate() {
    if (this.valueType === 'currency') {
      return NumberUtils.formatCurrency(this.rate);
    }
    return NumberUtils.formatNumber(this.rate);
  }

  getGrowthRate() {
    return this.growthRate;
  }

  getRateText() {
    let res = '';
    if (!this.growthRate) {
      return res;
    }
    res = Math.abs(parseFloat(this.growthRate.toFixed(1))).toString();
    return `${res}%`;
  }
}
