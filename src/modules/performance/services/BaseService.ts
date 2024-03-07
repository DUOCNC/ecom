import {Result} from 'common';
import {ErrorType} from 'common-ui';

export default class BaseService {
  protected readonly DefaultError =
    'Bạn vui lòng thử lại hoặc liên hệ với bộ phận hỗ trợ để được giải quyết.';
  protected handlerCatch(
    error: any,
    onError?: (code: ErrorType, msg: string, errCode: number | null) => void,
  ) {
    if (error.response) {
      if (error.response.status === 401) {
        this.logout();
        return;
      }
      onError && onError('Error', this.DefaultError, error.response.status);
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        onError && onError('Timeout', '', error.response.status);
        return;
      }
      onError && onError('Error', this.DefaultError, error.response.status);
    } else {
      onError && onError('Error', this.DefaultError, error.response.status);
    }
  }

  protected handleResponse<T>(response: Result<T>) {
    if (response.code === 40100000) {
      this.logout();
      return;
    }
  }

  protected notSuccessResult<T>(response: Result<T>) {
    return response.code !== 20000000;
  }

  protected logout() {}
}
