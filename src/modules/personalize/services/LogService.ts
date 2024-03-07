import BaseService from './BaseService';
import {MobileApi} from 'api';
import {LogActionRequest} from 'modules/order/models/request/LogActionRequest';

class LogService extends BaseService {
  private readonly mobileApi: MobileApi;
  constructor() {
    super();
    this.mobileApi = new MobileApi();
  }

  saveLog(request: LogActionRequest) {
    this.mobileApi.logActionApi(request).then(response => {
      if (
        this.notSuccessResult(response.data) &&
        response.data.errors &&
        response.data.errors.length > 0
      ) {
      }
    });
  }
}

const logService = new LogService();

export default logService;
