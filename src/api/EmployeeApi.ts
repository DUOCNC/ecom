import {BaseApi, Result, StringUtils} from 'common';
import BaseAxiosPegasus from 'common/base/BaseAxiosPegasus';
import {} from 'model/responses';
import {EmployeeResponse} from 'model/responses/EmployeeResponse';

class EmployeeApi extends BaseApi {
  private readonly BaseUrlApi = '/api/employees';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getEmployeeDetail(code: string) {
    let url = this.getUrl(StringUtils.format('detail/{0}', code.toUpperCase()));
    return BaseAxiosPegasus.get<Result<EmployeeResponse>>(url);
  }
}

export const employeeApi = new EmployeeApi();

export default EmployeeApi;
