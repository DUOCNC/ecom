import {BaseApi, BaseAxios, Result} from 'common';
import {StoreResponse} from 'model';

class CoreApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/core-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getStores() {
    let url = this.getUrl('stores/public');
    return BaseAxios.get<Result<Array<StoreResponse>>>(url);
  }
}

export default CoreApi;
