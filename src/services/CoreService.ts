import {Result} from 'common';
import {CoreApi} from 'api';
import {StoreResponse} from 'model';
import {MainStore} from 'reduxs/MainStore';
import BaseService from './BaseService';
import {loadingStore, saveStores} from 'reduxs';
import {ErrorType} from 'common-ui';

class CoreService extends BaseService {
  private readonly coreApi: CoreApi;
  constructor() {
    super();
    this.coreApi = new CoreApi();
  }

  private getStoreApi(
    onSuccess: (result: Result<Array<StoreResponse>>) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.coreApi
      .getStores()
      .then(res => {
        onSuccess(res.data);
      })
      .catch(e => {
        this.handlerCatch(e, onError);
      });
  }

  loadStores(onError: (code: ErrorType, msg: string) => void) {
    this.getStoreApi(
      res => {
        if (this.notSuccessResult(res)) {
          this.handleResponse(res);
          return;
        }
        MainStore.dispatch(saveStores(res.data));
      },
      () => {
        MainStore.dispatch(loadingStore());
      },
      (code, msg) => onError(code, msg),
    );
  }
}

const coreService = new CoreService();

export default coreService;
