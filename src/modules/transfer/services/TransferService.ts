import BaseService from 'services/BaseService';
import TransferApi from '../api/TransferApi';
import {TransferRequest} from '../models/request';
import TransferEntity from '../models/entities/TransferEntity';
import {ErrorType} from 'common-ui';
import {Metadata} from 'common';

class TransferService extends BaseService {
  private transferApi: TransferApi;
  constructor() {
    super();
    this.transferApi = new TransferApi();
  }
  getTransfers(
    request: TransferRequest,
    success: (data: Array<TransferEntity>, metaData: Metadata) => void,
    errors: (error: ErrorType, msg: string) => void,
    before?: () => void,
    onFinally?: () => void,
  ) {
    before && before();
    this.transferApi
      .getTransfers(request)
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
        }
        const result = res.data.data;
        if (result.metadata.total === 0) {
          errors('SearchNotfound', 'Không tìm thấy phiếu chuyển nào');
          return;
        }
        let resultTransfer = result.items.map(t => TransferEntity.create(t));
        success(resultTransfer, result.metadata);
      })
      .catch(error => this.handlerCatch(error, errors))
      .finally(() => {
        onFinally && onFinally();
      });
  }

  getTransferDetail(
    id: number,
    onSuccess: (entity: TransferEntity) => void,
    onError: (err: ErrorType, msg: string) => void,
    before?: () => void,
    onFinally?: () => void,
  ) {
    before && before();
    this.transferApi
      .getTransferDetail(id)
      .then(res => {
        if (res.data && res.data.data) {
          const transfer = TransferEntity.create(res.data.data);
          onSuccess(transfer);
        } else {
          onError('SearchNotfound', 'Không tìm thấy phiếu chuyển');
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(() => {
        onFinally && onFinally();
      });
  }

  confirmArrived(
    id: number,
    onSuccess: (entity: TransferEntity) => void,
    onError: (err: ErrorType, msg: string) => void,
    before?: () => void,
    onFinally?: () => void,
  ) {
    before && before();
    this.transferApi
      .confirmArrived(id)
      .then(res => {
        if (res.data && res.data.data) {
          const transfer = TransferEntity.create(res.data.data);
          onSuccess(transfer);
        } else {
          onError('SearchNotfound', 'Không tìm thấy phiếu chuyển');
        }
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(() => {
        onFinally && onFinally();
      });
  }
}
const transferService = new TransferService();
export default transferService;
