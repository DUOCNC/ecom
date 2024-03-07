import {NotificationRequest} from '../request';
import {NotificationResponse} from '../response';
import BaseAxiosPegasus from 'common/base/BaseAxiosPegasus';

class NotificationApi {
  constructor() {}

  saveToken(request: NotificationRequest) {
    return BaseAxiosPegasus.post<NotificationResponse>(
      'api/user-devices',
      request,
    );
  }
}
export default NotificationApi;
