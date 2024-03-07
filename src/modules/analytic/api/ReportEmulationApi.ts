import {BaseApi, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {ReportEmulationResponse, ReportResponse} from '../models/responses';

class ReportEmulationApi extends BaseApi {
  private readonly BaseUrlApi = '/api/reports';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getAnalytic(q: string) {
    let url = this.getUrl('employee/emulation');
    return BaseAxios.get<ReportResponse<ReportEmulationResponse>>(
      StringUtils.format('{0}?{1}', url, q),
    );
  }
}

export default ReportEmulationApi;
