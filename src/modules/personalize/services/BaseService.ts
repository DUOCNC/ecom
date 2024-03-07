import {Result} from 'common';
import {MainErrorType} from '../enums';
import keycloak from 'config/KeycloakConfig';
import AuthenticationUtils from '../../../common/authentication/AuthenticationUtils';
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
        AuthenticationUtils.remove().then(() => this.logout());
        return;
      }
      onError &&
        onError(
          MainErrorType.ServerError,
          this.DefaultError,
          error.response.status,
        );
    } else if (error.request) {
      if (error.code === 'ECONNABORTED') {
        onError && onError(MainErrorType.TIMEOUT, '', error.response.status);
        return;
      }
      onError &&
        onError(
          MainErrorType.ServerError,
          this.DefaultError,
          error.response.status,
        );
    } else {
      onError &&
        onError(
          MainErrorType.ServerError,
          this.DefaultError,
          error.response.status,
        );
    }
  }

  protected handleResponse<T>(response: Result<T>) {
    if (response.code === 40100000) {
      AuthenticationUtils.remove().then(() => this.logout());
      return;
    }
  }

  protected notSuccessResult<T>(response: Result<T>) {
    return response.code !== 20000000;
  }

  protected logout() {
    if (keycloak) {
      keycloak.clearToken();
    }
  }
}
