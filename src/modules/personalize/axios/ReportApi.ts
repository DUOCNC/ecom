import {BaseApi, BaseAxios, Result} from 'common';
import {
  PersonnelResponse,
  ReportSaleResponse,
} from 'modules/personalize/models/responses';
import {
  PersonnelRequest,
  ReportSaleRequest,
} from 'modules/personalize/models/requests';
import {ReportSaleOrderResponse} from '../models/responses/ReportSaleResponse';

class ReportApi extends BaseApi {
  private readonly BaseUrlApi = '/api/reports';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getPersonalSalary(request: PersonnelRequest) {
    let url = this.getUrl('employee/salary-realtime');
    return BaseAxios.get<Result<Array<PersonnelResponse>>>(url, {
      params: request,
    });
  }

  getReportSaleApi(request: ReportSaleRequest) {
    let url = this.getUrl('mobi/scorecard');
    const queries = [];
    if (request.assigneeCode) {
      queries.push(`assigneeCode=${request.assigneeCode}`);
    }
    if (request.currentDate) {
      queries.push(`currentDate=${request.currentDate}`);
    }
    if (request.listStoreId) {
      queries.push(`listStoreId=${request.listStoreId}`);
    }
    url = url + (queries.length > 0 ? '?' + queries.join('&') : '');
    return BaseAxios.get<ReportSaleResponse<ReportSaleOrderResponse>>(url);
  }
}

export default ReportApi;
