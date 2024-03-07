import {StringUtils} from 'common';
import moment from 'moment';
import {FormatDatePattern, getBeforeStartEndDateByMonth} from 'utils/DateUtils';
import AnalyticApi from '../api/AnalyticApi';
import ViewTypeConfig from '../config/ViewTypeConfig';
import {ReportViewType} from '../enums';
import ReportRetailEntity, {
  ReportKeyDriverEntity,
  ReportRetailChartDetailEntity,
} from '../models/entities/ReportRetailEntity';
import {ReportQueryRequest} from '../models/requests';
import BaseService from './BaseService';
import ReportRetailDetailFactory from './factory/ReportRetailDetailFactory';
import ReportRetailFactory from './factory/ReportRetailFactory';
import {LocationSelectedProvider} from 'model/providers';
const today = moment(new Date()).format(FormatDatePattern['YYYY/MM/DD']);

class ReportRetailService extends BaseService {
  private analyticApi: AnalyticApi;
  constructor() {
    super();
    this.analyticApi = new AnalyticApi();
  }

  getReportRetailDetail(
    request: ReportQueryRequest,
    activeTab: string,
    locationSelected: LocationSelectedProvider,
    success: (
      data: null | ReportKeyDriverEntity,
      chartDetailData: null | ReportRetailChartDetailEntity,
    ) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    if (locationSelected.locationId !== -1) {
      request.pos_location_name = locationSelected.locationName;
    }
    const q = this.getQueryKeyDriver(request);
    const [lastFromDate, lastToDate] = this.getLastDateByViewType(
      request,
      request.view_type ?? ReportViewType.day,
    );
    let q1 = this.getQueryKeyDriver({
      ...request,
      from_date: lastFromDate,
      to_date: lastToDate,
    });
    this.analyticApi
      .getAnalytic({q: q})
      .then(res => {
        this.analyticApi
          .getAnalytic({q: q1})
          .then(res1 => {
            const reportKeyDriverEntity = new ReportKeyDriverEntity();
            const reportChartDetailEntity =
              ReportRetailDetailFactory.getReportRetailDetail(activeTab);
            reportKeyDriverEntity.setReportKeyDriver(res.data, res1.data);
            reportChartDetailEntity.setReportRetailChartDetail(
              res.data,
              res1.data,
            );
            success(reportKeyDriverEntity, reportChartDetailEntity);
          })
          .catch(error => {
            this.handlerCatch(error, msg => {
              getExpectError(msg);
            });
          });
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
        });
      });
  }

  getReportRetailData(
    request: ReportQueryRequest,
    activeTab: string,
    locationSelected: LocationSelectedProvider,
    success: (data: null | ReportRetailEntity) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    if (locationSelected.locationId !== -1) {
      request.pos_location_name = locationSelected.locationName;
    }
    const q = this.getQuery(request);
    this.analyticApi
      .getAnalytic({q: q})
      .then(res => {
        const reportRetailEntity =
          ReportRetailFactory.getReportRetail(activeTab);
        if (res.data && res.data.result.data) {
          reportRetailEntity.setBarChartData(res.data.result.data);
        }
        success(reportRetailEntity);
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
        });
      });
  }

  private getQuery(request: ReportQueryRequest) {
    const viewTypeKey = ViewTypeConfig.find(
      e => e.getValue() === (request.view_type ?? ReportViewType.day),
    );
    if (request.pos_location_name) {
      return StringUtils.format(
        "SHOW total_sales, customers, average_order_value, orders BY {0} FROM offline_sales SINCE {1} UNTIL {2} WHERE pos_location_name IN ('{3}')",
        viewTypeKey?.getKey(),
        request.from_date,
        request.to_date,
        request.pos_location_name,
      );
    }
    return StringUtils.format(
      'SHOW total_sales, customers, average_order_value, orders BY {0} FROM offline_sales SINCE {1} UNTIL {2}',
      viewTypeKey?.getKey(),
      request.from_date,
      request.to_date,
    );
  }

  private getQueryKeyDriver(request: ReportQueryRequest) {
    const viewTypeKey = ViewTypeConfig.find(
      e => e.getValue() === (request.view_type ?? ReportViewType.day),
    );
    if (request.pos_location_name) {
      return StringUtils.format(
        "SHOW total_sales, customers, average_order_value, orders BY {3} FROM offline_sales SINCE {0} UNTIL {1} WHERE pos_location_name IN ('{2}')",
        request.from_date,
        request.to_date,
        request.pos_location_name,
        viewTypeKey?.getKey(),
      );
    }
    return StringUtils.format(
      'SHOW total_sales, customers, average_order_value, orders BY {2} FROM offline_sales SINCE {0} UNTIL {1}',
      request.from_date,
      request.to_date,
      viewTypeKey?.getKey(),
    );
  }

  private getLastDateByViewType = (
    params: ReportQueryRequest,
    viewType: string,
  ) => {
    let viewDate = new Date(params.view_date ?? today),
      fromDate = moment(viewDate)
        .subtract(1, 'day')
        .format(FormatDatePattern['YYYY-MM-DD']),
      toDate = moment(viewDate)
        .subtract(1, 'day')
        .format(FormatDatePattern['YYYY-MM-DD']);

    switch (viewType) {
      case ReportViewType.week:
        const daysOfWeek = this.getLastStartDateEndDateByDate(viewDate);
        fromDate = daysOfWeek.fromDate;
        toDate = daysOfWeek.toDate;
        break;
      case ReportViewType.month:
        [fromDate, toDate] = getBeforeStartEndDateByMonth(viewDate);
        break;
      case ReportViewType.year:
        const yearAdjacent = moment(viewDate).year() - 1;
        fromDate = `${yearAdjacent}-01-01`;
        toDate = `${yearAdjacent}-12-31`;
        break;
      default:
        break;
    }

    return [fromDate, toDate];
  };

  getLastStartDateEndDateByDate = (date: Date) => {
    return {
      fromDate: moment(date)
        .subtract(1, 'weeks')
        .startOf('isoWeek')
        .format(FormatDatePattern['YYYY-MM-DD']),
      toDate: moment(date)
        .subtract(1, 'weeks')
        .endOf('isoWeek')
        .format(FormatDatePattern['YYYY-MM-DD']),
    };
  };
}

const reportRetailService = new ReportRetailService();

export default reportRetailService;
