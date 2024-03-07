import {MobileApi} from 'api';
import {ErrorType} from 'common-ui';
import {AppConfig} from 'config/AppConfig';
import {saveVersion} from 'reduxs';
import {MainStore} from 'reduxs/MainStore';
import BaseService from './BaseService';

class MobileService extends BaseService {
  private readonly mobileApi: MobileApi;
  constructor() {
    super();
    this.mobileApi = new MobileApi();
  }

  getVersion(
    onResult: () => void,
    onError: (code: ErrorType, msg: string) => void,
  ) {
    this.mobileApi
      .getNextVersion({
        currentVersion: AppConfig.Version,
        os: AppConfig.OS,
      })
      .then(response => {
        if (this.notSuccessResult(response.data)) {
          this.handleResponse(response.data);
          onError('Error', '');
          return;
        }
        const result = response.data;
        const {nextVersion, current} = result.data;
        if (nextVersion && nextVersion.requireUpdate) {
          onError('VersionError', 'Không thể kiểm tra version');
          return;
        }
        MainStore.dispatch(
          saveVersion({
            current: current,
            next: result.data.nextVersion,
          }),
        );
        onResult();
      })
      .catch(e =>
        this.handlerCatch(e, (code, msg) => {
          onError(code, msg);
        }),
      );
  }
}

const mobileService = new MobileService();

export default mobileService;
