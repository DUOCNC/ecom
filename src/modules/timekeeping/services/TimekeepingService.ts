import BaseService from 'services/BaseService';
import {TimekeepingApi} from '../api';
import {
  CheckTimeRequest,
  TimeSheetRequest,
  TimekeepingRequest,
} from '../models/request';
import LocationEntity from '../models/entities/LocationEntity';
import {
  TimeSheetEntity,
  TimekeepingEntity,
  WorkdayDateEntity,
} from '../models/entities';
import {AxiosError} from 'axios';
import {showError} from 'utils/ToastUtils';
import {TimekeepingErrorResponse} from '../models/responses';
import moment, {Moment} from 'moment';
import {HttpConfig} from 'config/HttpConfig';
import {CheckTimeEntity} from '../models/entities/CheckTimeEntity';

class TimekeepingService extends BaseService {
  private readonly timekeepingApi: TimekeepingApi;
  constructor() {
    super();
    this.timekeepingApi = new TimekeepingApi();
  }
  getLocationNearest(
    request: TimekeepingRequest,
    success: (data: LocationEntity) => void,
    error: (err: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.timekeepingApi
      .getLocationNearestApi(request)
      .then(res => {
        if (res.data) {
          const locationEntity = LocationEntity.createLocationEntity(res.data);
          success(locationEntity);
        } else {
          error(res.data);
        }
      })
      .catch(error)
      .finally(onFinally);
  }
  timekeepingByGPS(
    request: TimekeepingRequest,
    success: (data: TimekeepingEntity) => void,
    error: (err: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.timekeepingApi
      .timekeepingByGPS(request)
      .then(res => {
        if (res.data) {
          const locationEntity = TimekeepingEntity.createTimekeepingEntity(
            res.data,
          );
          success(locationEntity);
        } else {
          error(res.data);
        }
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.data) {
          const messages = err.response.data.errors.message;
          if (messages && messages.length > 0) {
            const mess = messages[0].split(',')[0];
            error(mess);
            return;
          }
        }
        this.handleErrorTimekeeping(err, error);
      })
      .finally(onFinally);
  }
  private handleErrorTimekeeping(
    error: AxiosError,
    handleError: (err: string) => void,
  ) {
    if (error.code === 'ERR_NETWORK') {
      showError('Mất kết nối internet');
      return;
    }
    if (error.code === 'ERR_BAD_REQUEST' && error.response) {
      const response = error.response as TimekeepingErrorResponse;
      if (response.data.errors.hasOwnProperty('location_not_found')) {
        handleError(response.data.errors['location_not_found'][0]);
        return;
      }
    }
    showError('Đã có lỗi xảy ra vui lòng thử lại.');
  }

  getTimeSheet(
    request: Moment,
    success: (data: TimeSheetEntity) => void,
    error: (err: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    const query: TimeSheetRequest = {
      startDate: this.formatTimeRequest(request.startOf('month')),
      endDate: this.formatTimeRequest(request.endOf('month')),
    };
    beforeCallApi && beforeCallApi();
    this.timekeepingApi
      .getTimekeeping(query)
      .then(res => {
        if (res.data) {
          const timeSheetEntity = TimeSheetEntity.create(res.data);
          success(timeSheetEntity);
        }
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === HttpConfig.NOT_FOUND) {
          error(err.message);
        }
      })
      .finally(onFinally);
  }

  getWorkdayDateEntityByDate(date: string, arr: Array<WorkdayDateEntity>) {
    const workdayDateEntity = arr.find(e => e.getDate() === date);
    if (!workdayDateEntity) {
      return WorkdayDateEntity.createEmpty();
    }
    return workdayDateEntity;
  }

  getTimekeepingToday(
    success: (data: Array<CheckTimeEntity>) => void,
    error: (err: string) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
  ) {
    const query: CheckTimeRequest = {
      startDate: this.formatTimeRequest(moment()),
      endDate: this.formatTimeRequest(moment().add('day', 1)),
    };
    beforeCallApi && beforeCallApi();
    this.timekeepingApi
      .getTimekeepingTodayApi(query)
      .then(res => {
        if (res.data) {
          const timeSheetEntities = CheckTimeEntity.fromCheckTimeResponses(
            res.data,
          );
          success(timeSheetEntities);
        }
      })
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === HttpConfig.NOT_FOUND) {
          error(err.message);
        }
      })
      .finally(onFinally);
  }

  formatTimeRequest(date: Moment) {
    return date.format('YYYY-MM-DD[T]00:00:00.000000[Z]');
  }

  async getTimeFromServer() {
    let time = new Date();
    const res = await this.timekeepingApi.getTimeFromServerApi();
    const timeString = res.data.dateTime;
    time = new Date(timeString);
    return time;
  }
}

const timekeepingService = new TimekeepingService();

export default timekeepingService;
