import {ReportViewType} from 'modules/analytic/enums';
import {IReportRetail} from '../interface';
import {ConversionRequest} from '../requests';
import {ReportConversionChartResponse} from '../responses';
import BarChartEntity, {BarChartItemEntity} from './BarChartEntity';
import BaseAnalyticEntity from './BaseAnalyticEntity';
import TranslateUtils from 'utils/TranslateUtils';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';
import {DateFormatPattern} from 'common/enums';

export default abstract class ReportConversionChartEntity
  extends BaseAnalyticEntity
  implements IReportRetail
{
  private barChartData: Array<BarChartEntity>;
  constructor() {
    super();
    this.barChartData = [];
  }

  setBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    this.barChartData = this.getBarChartData(arr);
  }

  abstract getBarChartData(
    arr: Array<ReportConversionChartResponse> | null,
  ): Array<BarChartEntity>;

  getDataChart() {
    return this.barChartData;
  }
  getQuery(request: ConversionRequest) {
    return this.objectToUrlParams(request);
  }

  getLabelByViewType(viewType: string, label: string) {
    if (viewType === ReportViewType.week) {
      const date = moment(label, 'DD/MM/YYYY');
      return ` ${TranslateUtils.t(date.format('ddd'))}   ${date.format(
        FormatDatePattern['DD/MM'],
      )}`;
    }
    if (viewType === ReportViewType.month) {
      const date = moment(label, 'DD/MM/YYYY');
      return date.format(FormatDatePattern['DD/MM']);
    }

    return label;
  }

  getTemplateChart(viewType: string, date?: string) {
    let template: Array<BarChartItemEntity> = [];
    const viewDate = date ? new Date(date) : new Date();
    switch (viewType) {
      case ReportViewType.day:
        this.getHoursByDay().forEach(e => {
          template.push(new BarChartItemEntity(e, 0));
        });

        break;
      case ReportViewType.week:
        const week = this.getStartDateEndDatByDate(viewDate);
        for (let i = 0; i < 7; i++) {
          const element = moment(new Date(week[0]))
            .add(i, 'd')
            .format(DateFormatPattern.DDMMYYYY);
          template.push(
            new BarChartItemEntity(
              this.getLabelByViewType(viewType, element),
              0,
            ),
          );
        }
        break;
      case ReportViewType.month:
        const month = this.getStartDateEndDateInMonth(viewDate);
        for (let i = 0; i < this.getDaysInMonth(viewDate); i++) {
          const element = moment(new Date(month[0]))
            .add(i, 'd')
            .format(DateFormatPattern.DDMMYYYY);
          template.push(
            new BarChartItemEntity(
              this.getLabelByViewType(viewType, element),
              0,
            ),
          );
        }
        break;
      case ReportViewType.year:
        for (let i = 1; i <= 12; i++) {
          let label = '';
          if (i < 10) {
            label = `0${i}/${moment(date).format('YY')}`;
          } else {
            label = `${i}/${moment(date).format('YY')}`;
          }
          template.push(new BarChartItemEntity(label, 0));
        }
        break;
    }

    return template;
  }
}

export class TrafficReceptionistQuantityEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.trafficReceptionistQuantity));
    }
    return data;
  }
}

export class TrafficAssigneeQuantityEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.trafficAssigneeQuantity));
    }
    return data;
  }
}

export class CustomerPurchaseEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.customerPurchase));
    }
    return data;
  }
}

export class CrAssigneePurchaseEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.crAssigneePurchase));
    }
    return data;
  }
}

export class CrReceptionistPurchaseEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.crReceptionistPurchase));
    }
    return data;
  }
}

export class TrafficNotBoughtQuantityEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.trafficNotBoughtQuantity));
    }
    return data;
  }
}

export class NumberSlotCreatedEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.numberSlotCreated));
    }
    return data;
  }
}

export class NumberSlotAssignEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.numberSlotAssign));
    }
    return data;
  }
}

export class NumberSlotBoughtEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.numberSlotBought));
    }
    return data;
  }
}

export class NumberSlotNotBoughtEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.numberSlotNotBought));
    }
    return data;
  }
}

export class CrSlotCreatedBoughtEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.crSlotCreatedBought));
    }
    return data;
  }
}

export class CrSlotAssignBoughtEntity extends ReportConversionChartEntity {
  constructor() {
    super();
  }
  getBarChartData(arr: Array<ReportConversionChartResponse> | null) {
    if (arr == null) {
      return [];
    }
    let data: Array<BarChartEntity> = [];
    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      data.push(new BarChartEntity(e.time, e.crSlotAssignBought));
    }
    return data;
  }
}
