import {NumberUtils, StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {ReportViewType} from 'modules/analytic/enums';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';
import TranslateUtils from 'utils/TranslateUtils';
import {BarChartItemEntity} from './BarChartEntity';

export default class BaseAnalyticEntity {
  public readonly hoursInDay: Array<number>;
  constructor() {
    this.hoursInDay = [
      8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    ];
  }
  getLabelByViewType(viewType: string, label: string) {
    if (viewType === ReportViewType.week) {
      return ` ${TranslateUtils.t(moment(label).format('ddd'))}   ${moment(
        label,
      ).format(FormatDatePattern['DD/MM'])}`;
    }
    if (viewType === ReportViewType.month) {
      return moment(label).format(FormatDatePattern['DD/MM']);
    }
    if (viewType === ReportViewType.year) {
      return moment(label).format(FormatDatePattern['MM/YY']);
    }

    return moment(label).format(FormatDatePattern['HH:mm']);
  }
  getStartDateEndDatByDate(date: Date) {
    return [
      moment(date).startOf('isoWeek').format(FormatDatePattern['YYYY-MM-DD']),
      moment(date).endOf('isoWeek').format(FormatDatePattern['YYYY-MM-DD']),
    ];
  }
  getStartDateEndDateInMonth(date: Date) {
    return [
      moment(date).startOf('month').format(FormatDatePattern['YYYY-MM-DD']),
      moment(date).endOf('month').format(FormatDatePattern['YYYY-MM-DD']),
    ];
  }
  protected getDaysInMonth(date: Date) {
    return moment(date).daysInMonth();
  }
  static getYAxisLabelTexts(max: number) {
    let yAxisLabelTexts: number[] = [0];
    const step = parseFloat((max / 5).toFixed(2));
    for (let index = 1; index < 5; index++) {
      const nextStep = yAxisLabelTexts[index - 1] + step;
      yAxisLabelTexts.push(nextStep);
    }
    yAxisLabelTexts.push(max);
    let res = yAxisLabelTexts.map((e: number, index: number) => {
      if (index === 0) {
        return e.toString();
      }
      return `${NumberUtils.getAmountSymbol(parseFloat(e.toFixed(2)))}`;
    });
    res = [...new Set(res)];
    return res;
  }
  getHoursByDay() {
    return this.hoursInDay.map(e => {
      if (e < 10) {
        return StringUtils.format('0{0}:00', e);
      }
      return StringUtils.format('{0}:00', e);
    });
  }

  protected objectToUrlParams(obj: any) {
    const params = Object.keys(obj)
      .filter(key => obj[key] !== undefined)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');

    return params;
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
            .format(DateFormatPattern.YYYYMMDD);
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
            .format(DateFormatPattern.YYYYMMDD);
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
