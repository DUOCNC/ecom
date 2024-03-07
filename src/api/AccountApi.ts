import {BaseApi, BaseAxios, Result, StringUtils} from 'common';
import {AccountRequest, AccountResponse} from 'model';
import {LoginRequest} from 'model/request/LoginRequest';
import {
  AccountResponseV2,
  AssigneeResponse,
  LoginResponse,
} from 'model/responses';

class AccountApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/account-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getProfileV2() {
    return BaseAxios.get<AccountResponseV2>('/admin/account.json');
  }

  getProfile() {
    let url = this.getUrl('me');
    return BaseAxios.get<Result<AccountResponse>>(url);
  }

  getAccountCode(
    accountRequest: AccountRequest,
    departmentIds?: number | null,
  ) {
    let url = 'admin/users.json';
    if (departmentIds) {
      url = StringUtils.format(
        'admin/users.json?departmentIds={0}',
        departmentIds,
      );
    }
    return BaseAxios.get<Array<AssigneeResponse>>(url, {
      params: accountRequest,
    });
  }

  postLoginApi(request: LoginRequest) {
    let url = this.getUrl('login');
    return BaseAxios.post<Result<LoginResponse>>(url, request);
  }
}

export default AccountApi;
