import {BaseApi, Pageable, Result} from 'common';
import BaseAxios from 'common/base/BaseAxios';
import {InventoryResponse, InventoryRequest} from '../models';
import {ShowroomInventoryResponse} from 'modules/product/models/responses/ShowroomInventoryResponse';
import {ShowroomInventoryRequest} from 'modules/product/models/request/InventoryRequest';
import {
  BinLocationResponse,
  BinTargetResponse,
} from 'modules/product/models/responses/InventoryResponse';

class InventoryApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/inventory-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getInventory(req: InventoryRequest) {
    let url = this.getUrl('inventories');
    return BaseAxios.get<Result<Array<InventoryResponse>>>(url, {
      params: req,
    });
  }

  getShowRoomInventory(req: ShowroomInventoryRequest, storeId?: number) {
    let url = this.getUrl(`inventories/${storeId}/bin-location/listing`);
    return BaseAxios.get<Result<Array<ShowroomInventoryResponse>>>(url, {
      params: req,
    });
  }
  getBinLocation(req: {page: number; limit: number}, storeId: number) {
    let url = this.getUrl(`${storeId}/bin-location`);
    return BaseAxios.get<Result<Pageable<BinLocationResponse>>>(url, {
      params: req,
    });
  }
  updateBinTransfer(res: any, storeId: number) {
    const url = this.getUrl(`${storeId}/bin-transfer`);
    return BaseAxios.post(url, res);
  }
  geShowTargetByVariant(
    locationId: number,
    params: {
      variant_ids: number;
    },
  ) {
    const url = this.getUrl(`inventories/${locationId}/bin-target/listing`);
    return BaseAxios.get<Result<BinTargetResponse[]>>(url, {params});
  }
}

export default InventoryApi;
