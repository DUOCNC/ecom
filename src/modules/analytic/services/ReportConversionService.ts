import {ConversionRequest, ReportQueryRequest} from '../models/requests';
import BaseService from './BaseService';
import {
  ReportConversionEntity,
  ReportConversionStaffEntity,
} from '../models/entities';
import {ErrorType} from 'common-ui';
import {ReportViewType} from '../enums';
import {
  FormatDatePattern,
  getStartDateEndDatByDate,
  getStartEndDateByMonth,
} from 'utils/DateUtils';
import {ReportConversionApi} from '../api';
import moment from 'moment';
import {Metadata} from '../models/base/Metadata';
import ReportConversionFactory from './factory/ReportConversionFactory';
import {ReportConversionChartResponse} from '../models/responses';
import {ReportConversionChart} from '../models/interface';
const today = moment(new Date()).format(FormatDatePattern['YYYY/MM/DD']);

class ReportConversionService extends BaseService {
  private analyticApi: ReportConversionApi;
  constructor() {
    super();
    this.analyticApi = new ReportConversionApi();
  }

  getReportData(
    params: ReportQueryRequest,
    viewType: string,
    success: (data: ReportConversionEntity) => void,
    onError: (code: ErrorType, error?: string) => void,
    beforeCallApi?: () => void,
    finish?: () => void,
  ) {
    const request: ConversionRequest = {
      beginDate: params.from_date,
      endDate: params.to_date,
      timeType: viewType,
      viewDate: params.view_date,
      storeId: params.store_id === -1 ? undefined : params.store_id,
    };
    const report = ReportConversionEntity.createEmpty();
    if (viewType === ReportViewType.week) {
      [request.beginDate, request.endDate] = getStartDateEndDatByDate(
        new Date(request.viewDate ?? today),
      );
    }
    if (viewType === ReportViewType.month) {
      [request.beginDate, request.endDate] = getStartEndDateByMonth(
        new Date(request.viewDate ?? today),
      );
    }
    let q = report.getQuery(request);
    beforeCallApi && beforeCallApi();
    this.analyticApi
      .getAnalytic(q)
      .then(res => {
        if (res.data && res.data.data) {
          success(report.fromResponse(res.data.data));
          return;
        }
        onError('NotfoundReport', '');
      })
      .catch(error => {
        this.handlerCatch(error, (code, msg) => {
          onError(code as ErrorType, msg);
        });
      })
      .finally(finish);
  }

  getStaffService(
    params: ReportQueryRequest,
    viewType: string,
    success: (
      data: Array<ReportConversionStaffEntity>,
      metadata: Metadata,
      canLoadMore: boolean,
    ) => void,
    onError: (code: ErrorType, error?: string) => void,
    beforeCallApi?: () => void,
    finish?: () => void,
  ) {
    const request: ConversionRequest = {
      beginDate: params.from_date,
      endDate: params.to_date,
      timeType: viewType,
      viewDate: params.view_date,
      searchAssignee: params.assignee_name?.trim(),
      pageIndex: params.page,
      pageSize: params.size,
      storeId: params.store_id === -1 ? undefined : params.store_id,
      sort: 'assignee_name',
    };
    const report = ReportConversionStaffEntity.createEmpty();
    if (viewType === ReportViewType.week) {
      [request.beginDate, request.endDate] = getStartDateEndDatByDate(
        new Date(request.viewDate ?? today),
      );
    }
    if (viewType === ReportViewType.month) {
      [request.beginDate, request.endDate] = getStartEndDateByMonth(
        new Date(request.viewDate ?? today),
      );
    }
    let q = report.getQuery(request);
    beforeCallApi && beforeCallApi();
    this.analyticApi
      .getStaffApi(q)
      .then(res => {
        if (res.data && res.data.data) {
          const {meta, data} = res.data;
          if (data.length === 0) {
            onError('SearchNotfound', '');
            return;
          }
          let totalPage = Math.ceil(meta.total / meta.pageIndex);
          let canLoadMore = meta.pageSize + 1 <= totalPage;

          success(
            data.map(e => new ReportConversionStaffEntity(e)),
            {
              pageIndex: meta.pageIndex,
              pageSize: meta.pageSize,
              total: meta.total,
            },
            canLoadMore,
          );
          return;
        }
        onError('SearchNotfound', '');
      })
      .catch(error => {
        this.handlerCatch(error, (code, msg) => {
          onError(code as ErrorType, msg);
        });
      })
      .finally(finish);
  }

  getConversionChart(
    params: ReportQueryRequest,
    viewType: string,
    metric: string,
    success: (data: Array<ReportConversionChart>) => void,
    onError: (code: ErrorType, error?: string) => void,
    beforeCallApi?: () => void,
    finish?: () => void,
  ) {
    const request: ConversionRequest = {
      beginDate: params.from_date,
      endDate: params.to_date,
      timeType: viewType,
      viewDate: params.view_date,
      pageIndex: params.page,
      pageSize: params.size,
      storeId: params.store_id === -1 ? undefined : params.store_id,
      sort: 'dimension',
      sortType: 'asc',
    };
    const report = ReportConversionFactory.getReportConversion(metric);
    if (viewType === ReportViewType.week) {
      [request.beginDate, request.endDate] = getStartDateEndDatByDate(
        new Date(request.viewDate ?? today),
      );
    }
    if (viewType === ReportViewType.month) {
      [request.beginDate, request.endDate] = getStartEndDateByMonth(
        new Date(request.viewDate ?? today),
      );
    }
    let q = report.getQuery(request);
    beforeCallApi && beforeCallApi();
    this.analyticApi
      .getConversionChart(q)
      .then(res => {
        if (res.data && res.data.data) {
          const {data} = res.data;
          if (data.length === 0) {
            onError('NotfoundReport', '');
            return;
          }
          success(this.getReportConversionChart(res.data.data));
          return;
        }
        onError('NotfoundReport', '');
      })
      .catch(error => {
        this.handlerCatch(error, (code, msg) => {
          onError(code as ErrorType, msg);
        });
      })
      .finally(finish);
  }

  private getReportConversionChart(
    chartResponse: Array<ReportConversionChartResponse>,
  ) {
    const keys = Object.keys({
      trafficReceptionistQuantity: 0,
      trafficAssigneeQuantity: 0,
      customerPurchase: 0,
      crAssigneePurchase: 0,
      crReceptionistPurchase: 0,
      trafficNotBoughtQuantity: 0,
      numberSlotCreated: 0,
      numberSlotAssign: 0,
      numberSlotBought: 0,
      numberSlotNotBought: 0,
      crSlotCreatedBought: 0,
      crSlotAssignBought: 0,
    });

    return keys.map(p => {
      const entity = ReportConversionFactory.getReportConversion(p);
      entity.setBarChartData(chartResponse);
      return {
        key: p,
        entity: entity,
      };
    });
  }
}

const reportConversionService = new ReportConversionService();

export default reportConversionService;
