import {BaseApi, BaseAxios, Pageable, Result, StringUtils} from 'common';
import {TransferRequest} from '../models/request';
import {TransferResponse} from '../models/response';

class TransferApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/inventory-transfer-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getTransfers(req: TransferRequest) {
    let url = this.getUrl('inventory-transfers');
    return BaseAxios.get<Result<Pageable<TransferResponse>>>(url, {
      params: req,
    });
  }

  getTransferDetail(id: number) {
    let url = this.getUrl(StringUtils.format('inventory-transfers/{0}', id));
    return BaseAxios.get<Result<TransferResponse>>(url);
  }

  confirmArrived(id: number) {
    let url = this.getUrl(
      StringUtils.format('inventory-transfers/{0}/arrived', id),
    );
    return BaseAxios.put<Result<TransferResponse>>(url);
  }
}

export default TransferApi;
