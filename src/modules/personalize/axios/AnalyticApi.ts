import {BaseApi, BaseAxios} from 'common';
import {AnalyticResponse} from '../models';
import {QueryRequest} from '../models/requests/QueryRequest';

class AnalyticApi extends BaseApi {
  private readonly BaseUrlApi = '/api/analytics';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getAnalytic(query: QueryRequest) {
    let url = this.getUrl('/query');
    return BaseAxios.get<AnalyticResponse<any>>(url, {
      params: query,
      timeout: 3 * 60 * 1000,
    });
  }
}

export default AnalyticApi;
