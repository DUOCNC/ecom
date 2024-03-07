import BaseAxios from 'common/base/BaseAxios';
import {PerformanceRequest} from '../models';
import {
  EmployeeRevenueResponse,
  PerformanceResponse,
} from '../models/responses';
import {RevenueRequest} from '../models/requests';
import {StringUtils} from 'common';

class PerformanceApi {
  constructor() {}

  getPerformance(request: PerformanceRequest) {
    return BaseAxios.get<PerformanceResponse>(
      'api/reports/employee/performance',
      {
        params: request,
      },
    );
  }
  getEmployeeRevenue(request: RevenueRequest) {
    let url = StringUtils.format(
      'api/reports/employee/rank-revenue?beginDate={0}&endDate={1}',
      request.beginDate,
      request.endDate,
    );
    if (request.storeName) {
      url = StringUtils.format('{0}&storeName={1}', url, request.storeName);
    }
    if (request.rsm) {
      url = StringUtils.format('{0}&rsmName={1}', url, request.rsm);
    }
    return BaseAxios.get<EmployeeRevenueResponse>(url);
  }
}

export default PerformanceApi;
