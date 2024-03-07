import {ReportEmulationRequest} from '../models/requests';
import BaseService from './BaseService';
import {ReportEmulationEntity} from '../models/entities';
import ReportEmulationFactory from './factory/ReportEmulationFactory';
import {ErrorType} from 'common-ui';
import {ReportViewType} from '../enums';
import moment from 'moment';
import {
  FormatDatePattern,
  getDaysInYearByDate,
  getStartDateEndDatByDate,
} from 'utils/DateUtils';
import ReportEmulationApi from '../api/ReportEmulationApi';
import {ReportQuery} from 'model/query/ReportQuery';
import {CRVViewType} from 'modules/analytic/config/ReportConfig';
const today = moment(new Date()).format(FormatDatePattern['YYYY/MM/DD']);
class ReportEmulationService extends BaseService {
  private analyticApi: ReportEmulationApi;
  constructor() {
    super();
    this.analyticApi = new ReportEmulationApi();
  }

  getReportData(
    params: ReportQuery,
    ydCode: string | undefined,
    activeTab: string,
    viewType: string,
    type: 'rsm' | 'asm' | 'store',
    success: (data: ReportEmulationEntity) => void,
    onError: (code: ErrorType, error?: string) => void,
    beforeCallApi?: () => void,
    crvType?: CRVViewType,
    finish?: () => void,
  ) {
    let request: ReportEmulationRequest = {
      viewDate: params.view_date,
      beginDate: params.from_date,
      endDate: params.to_date,
      departmentLv2: params.pos_location_department_lv2,
      departmentLv3: params.pos_location_department_lv3,
      timeType: viewType,
      ydCode: ydCode,
    };
    let report = ReportEmulationFactory.getReportEmulation(activeTab);
    if (type === 'asm') {
      report = ReportEmulationFactory.getReportEmulationASM(activeTab);
    }
    if (type === 'store') {
      report = ReportEmulationFactory.getReportEmulationPOS(activeTab);
    }
    if (viewType === ReportViewType.week) {
      [request.beginDate, request.endDate] = getStartDateEndDatByDate(
        new Date(request.viewDate ?? today),
      );
    }
    if (viewType === ReportViewType.year) {
      [request.beginDate, request.endDate] = getDaysInYearByDate(
        new Date(request.viewDate ?? today),
      );
    }
    let q = report.getQuery(request, crvType);
    beforeCallApi && beforeCallApi();
    this.analyticApi
      .getAnalytic(q)
      .then(res => {
        if (res.data && res.data.data) {
          report.setReportData(res.data.data, crvType);
          success(report);
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
}

const reportEmulationService = new ReportEmulationService();

export default reportEmulationService;
