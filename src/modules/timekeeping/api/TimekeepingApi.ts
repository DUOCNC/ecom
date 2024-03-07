import {BaseApi, StringUtils} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {
  CheckTimeRequest,
  TimeSheetRequest,
  TimekeepingRequest,
} from '../models/request';
import {
  CheckTimeResponse,
  LocationResponse,
  TimeSheetResponse,
  TimekeepingResponse,
} from '../models/responses';

class TimekeepingApi extends BaseApi {
  private readonly BaseUrlApi = '/admin/v2';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getLocationNearestApi(query: TimekeepingRequest) {
    let url = this.getUrl('timekeeping_locations/nearest.json');
    return BaseAxios.get<LocationResponse>(url, {
      params: query,
    });
  }

  timekeepingByGPS(query: TimekeepingRequest) {
    let url = this.getUrl('timekeepings.json');
    return BaseAxios.post<TimekeepingResponse>(url, query);
  }

  getTimekeeping(query: TimeSheetRequest) {
    let url = StringUtils.format(
      '{0}?dateStart={1}&dateEnd={2}',
      this.getUrl('timekeepings.json'),
      query.startDate,
      query.endDate,
    );
    return BaseAxios.get<TimeSheetResponse>(url);
  }
  getTimekeepingTodayApi(query: CheckTimeRequest) {
    let url = StringUtils.format(
      '{0}?dateStart={1}&dateEnd={2}&sort=time,desc&page=0&size=50',
      this.getUrl('timekeepings/check_time.json'),
      query.startDate,
      query.endDate,
    );
    return BaseAxios.get<Array<CheckTimeResponse>>(url);
  }
  getTimeFromServerApi() {
    return BaseAxios.get<{
      dateTime: string;
    }>(
      'https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Ho_Chi_Minh&outputFormat=JSON',
    );
  }
}

export default TimekeepingApi;
