import {BaseApi, BaseAxios, Result} from 'common';
import {
  MobileConfigResponse,
  MobileVersionRequest,
  NextVersionResponse,
} from 'model';

class MobileApi extends BaseApi {
  private readonly BaseUrlApi = '/mobile-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getConfig() {
    let url = this.getUrl('public/configs');
    return BaseAxios.get<Result<MobileConfigResponse>>(url);
  }

  getNextVersion(request: MobileVersionRequest) {
    let url = this.getUrl('public/version/next-version');
    return BaseAxios.get<Result<NextVersionResponse>>(url, {
      params: request,
    });
  }
}

export default MobileApi;
