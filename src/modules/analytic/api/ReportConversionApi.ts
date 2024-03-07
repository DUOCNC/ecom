import {BaseApi, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {
  ReportConversionChartResponse,
  ReportConversionResponse,
  ReportConversionStaffResponse,
  ReportResponse,
} from '../models/responses';
import {Paging} from '../models/base/Paging';

class ReportConversionApi extends BaseApi {
  private readonly BaseUrlApi = '/api/reports';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getAnalytic(q: string) {
    let url = this.getUrl('customer/conversion-overview');
    return BaseAxios.get<ReportResponse<ReportConversionResponse>>(
      StringUtils.format('{0}?{1}', url, q),
    );
  }

  getStaffApi(q: string) {
    let url = this.getUrl('customer/conversion-by-staff');
    return BaseAxios.get<Paging<ReportConversionStaffResponse>>(
      StringUtils.format('{0}?{1}', url, q),
    );
  }

  getConversionChart(q: string) {
    let url = this.getUrl('customer/conversion-chart');
    return BaseAxios.get<Paging<ReportConversionChartResponse>>(
      StringUtils.format('{0}?{1}', url, q),
    );
  }
}

export default ReportConversionApi;
