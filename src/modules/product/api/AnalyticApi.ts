import {BaseApi} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {AnalyticResponse, QueryRequest} from '../models';

class AnalyticApi extends BaseApi {
  private readonly BaseUrlApi = '/api/analytics';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getAnalytic(query: QueryRequest) {
    let url = this.getUrl('query');
    return BaseAxios.get<AnalyticResponse<any>>(url, {
      params: query,
      timeout: 3 * 60 * 1000,
    });
  }
}

export default AnalyticApi;
