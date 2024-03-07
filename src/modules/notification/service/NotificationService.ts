import {NotificationApi} from '../api';
import {NotificationRequest} from '../request';

class NotificationService {
  private readonly notificationApi: NotificationApi;

  constructor() {
    this.notificationApi = new NotificationApi();
  }
  saveFCMToken(
    request: NotificationRequest,
    onSuccess: (result: string) => void,
    onError: (msg: string) => void,
    beginCallApi?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.notificationApi
      .saveToken(request)
      .then(() => {
        onSuccess('success');
      })
      .catch(() => onError('Đã có lỗi xảy ra, vui lòng thử lại'));
  }
}

const notificationService = new NotificationService();

export default notificationService;
