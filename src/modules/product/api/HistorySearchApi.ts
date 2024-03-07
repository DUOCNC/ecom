import {BaseApi, Result, Pageable, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {
  CreateHistorySearchRequest,
  HistorySearchRequest,
  HistorySearchResponse,
} from '../models';

class HistorySearchApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/mobile-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getHistory(query: HistorySearchRequest) {
    let url = this.getUrl('histories/search');
    return BaseAxios.get<Result<Pageable<HistorySearchResponse>>>(url, {
      params: query,
    });
  }

  addHistory(data: CreateHistorySearchRequest) {
    let url = this.getUrl('histories/search');
    return BaseAxios.post<Result<Pageable<HistorySearchResponse>>>(url, data);
  }

  deleteHistory(idHistory: number) {
    let url = this.getUrl(
      StringUtils.format('histories/search/{0}', idHistory),
    );
    return BaseAxios.delete<Result<HistorySearchResponse>>(url);
  }
}

export default HistorySearchApi;
