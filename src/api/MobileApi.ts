import {BaseApi, BaseAxios, Result} from 'common';
import {
  MobileConfigResponse,
  MobileVersionRequest,
  NextVersionResponse,
} from 'model';
import {LogActionRequest} from 'model/request';
import {LoginRequest} from 'model/request/LoginRequest';
import {LogActionResponse} from 'model/responses';

class MobileApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/mobile-service';

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

  fakeLogin(request: LoginRequest) {
    let url = this.getUrl('public/login');
    return BaseAxios.post(url, request);
  }

  logActionApi(request: LogActionRequest) {
    let url = this.getUrl('action-log');
    return BaseAxios.post<Result<LogActionResponse>>(url, request);
  }
}

export default MobileApi;
