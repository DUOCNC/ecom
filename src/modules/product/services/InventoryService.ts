import {HistorySearchApi, InventoryApi} from '../api';
import {
  CreateHistorySearchRequest,
  HistorySearchEntity,
  InventoryEntity,
  InventoryRequest,
  InventoryResponse,
} from '../models';
import BaseService from './BaseService';
import {StoreEntity} from 'modules/product/models';
import {getDistance} from 'geolib';
import {AppConfig} from 'config/AppConfig';
import {StoreResponseWithDistance} from 'model/responses/StoreResponse';
import {ErrorType} from 'common-ui';
import {
  AccountProvider,
  Location,
  LocationSelectedProvider,
} from 'model/providers';
import {ShowroomInventoryRequest} from 'modules/product/models/request/InventoryRequest';
import {ShowroomInventoryResponse} from 'modules/product/models/responses/ShowroomInventoryResponse';
import ShowroomInventoryEntity from 'modules/product/models/entities/ShowroomInventoryEntity';
import {VariantQueryRequest, VariantResponse} from 'modules/order/models';
import {Pageable} from 'common';
import {ProductApi} from 'modules/order/api';
import BinLocationEntity from '../models/entities/BinLocationEntity';
import {VariantLocationQueryRequest} from 'modules/order/models/request/VariantQueryRequest';
import {enumBinLocation} from 'common/enums';
import {showSuccess} from 'utils/ToastUtils';
import {useAuth} from 'providers/contexts/AuthContext';
import {BinLocationResponse} from '../models/responses/InventoryResponse';

class InventoryService extends BaseService {
  inventoryApi: InventoryApi;
  private readonly maxStore = 10;
  private readonly HistoryKey = 'inventory';
  private historySearchApi: HistorySearchApi;
  private productApi: ProductApi;

  constructor() {
    super();
    this.inventoryApi = new InventoryApi();
    this.historySearchApi = new HistorySearchApi();
    this.productApi = new ProductApi();
  }

  private getInventoriesApi(
    inventoryRequest: InventoryRequest,
    onResult: (arr: Array<InventoryResponse>) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.inventoryApi
      .getInventory(inventoryRequest)
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          return;
        }
        onResult(res.data.data);
      })
      .catch(e => this.handlerCatch(e, onError))
      .finally(() => onFinally && onFinally());
  }

  private getShowroomInventoriesApi(
    inventoryShowroomRequest: ShowroomInventoryRequest,
    onResult: (arr: Array<ShowroomInventoryResponse>) => void,
    beforeCallApi?: () => void,
    onError?: (code: ErrorType, msg: string) => void,
    onFinally?: () => void,
    storeId?: number,
  ) {
    beforeCallApi && beforeCallApi();
    this.inventoryApi
      .getShowRoomInventory(inventoryShowroomRequest, storeId)
      .then(res => {
        if (this.notSuccessResult(res.data)) {
          this.handleResponse(res.data);
          return;
        }
        onResult(res.data.data);
      })
      .catch(e => this.handlerCatch(e, onError))
      .finally(() => onFinally && onFinally());
  }

  mappingInventoryToStoreEntity(
    variantIds: Array<number>,
    storeIds: Array<number>,
    onSuccess: (store: Array<StoreEntity>) => void,
    allStore: Location[] | null,
    limit?: number | null,
    isClearNotAvailable?: boolean,
  ) {
    this.getInventoriesApi(
      {
        variantIds: variantIds,
        isDetail: true,
        storeIds: storeIds,
      },
      inventories => {
        let storeIdsInventory = inventories.map(inventory => inventory.storeId);
        let storeInventoriesEmpty = storeIds
          .filter(id => !storeIdsInventory.includes(id))
          .map(storeId => {
            return InventoryEntity.createEmptyInventoryResponse(
              storeId,
              variantIds[0],
            );
          });
        let storeInventoriesFull = inventories.concat(storeInventoriesEmpty);

        let availableVariantStore = storeInventoriesFull
          .filter(inventoryVariantItem => {
            if (isClearNotAvailable) {
              return inventoryVariantItem.available > 0;
            }
            return true;
          })
          .map(inventoryVariantItem => {
            let storeEntity: StoreEntity | undefined;
            let inventory: InventoryEntity;
            if (inventoryVariantItem.available) {
              inventory =
                InventoryEntity.createFromResponse(inventoryVariantItem);
            } else {
              inventory = InventoryEntity.createEmpty(
                inventoryVariantItem.storeId,
                inventoryVariantItem.variantId,
              );
            }
            let store =
              allStore &&
              allStore.find(
                storeItem => storeItem.id === inventoryVariantItem.storeId,
              );
            storeEntity = store
              ? StoreEntity.createFromResponse(store)
              : StoreEntity.createEmpty(store);
            storeEntity.setInventory(inventory);
            return storeEntity;
          });
        // availableVariantStore.sort(    //cmt do không sort theo tồn cửa hàng nữa
        //   (a, b) =>
        //     b.getInventory().getAvailableTypeNumber() -
        //     a.getInventory()?.getAvailableTypeNumber(),
        // );
        if (limit) {
          onSuccess(availableVariantStore.slice(0, limit));
          return;
        }
        onSuccess(availableVariantStore);
      },
    );
  }

  getInventories(
    variantId: number,
    locationSelected: LocationSelectedProvider,
    locations: Array<Location>,
    onSuccess: (inventory: InventoryEntity) => void,
  ) {
    let variantIds = [variantId];
    let storeIds = [locationSelected.locationId];
    if (locationSelected.locationId === -1) {
      storeIds = locations.map(item => item.id);
    }
    this.getInventoriesApi(
      {
        variantIds: variantIds,
        isDetail: false,
        storeIds: storeIds,
      },
      arr => {
        let inventory = InventoryEntity.createEmpty(
          storeIds.length > 1 ? null : storeIds[0],
          variantId,
        );
        if (arr.length > 0) {
          inventory = InventoryEntity.createFromResponse(arr[0]);
        }
        onSuccess(inventory);
      },
    );
  }

  getShowroomInventories(
    variantId: [number],
    locationSelected: LocationSelectedProvider,
    onSuccess: (inventory: ShowroomInventoryEntity) => void,
  ) {
    let variantIds = variantId.join(',');
    let storeId = locationSelected.locationId;
    this.getShowroomInventoriesApi(
      {
        variantIds: variantIds,
      },
      arr => {
        let inventory = ShowroomInventoryEntity.createEmpty(storeId);
        if (arr.length > 0) {
          inventory = ShowroomInventoryEntity.createFromResponse(arr[0]);
        }
        onSuccess(inventory);
      },
      () => {},
      () => {},
      () => {},
      storeId,
    );
  }

  getInventoriesByListId(
    variantIds: Array<number>,
    locationSelected: LocationSelectedProvider,
    locations: Array<Location>,
    onSuccess: (inventories: Array<InventoryEntity>) => void,
  ) {
    let storeIds = [locationSelected.locationId];
    if (locationSelected.locationId === -1) {
      storeIds = locations.map(item => item.id);
    }
    this.getInventoriesApi(
      {
        variantIds: variantIds,
        isDetail: false,
        storeIds: storeIds,
      },
      arr => {
        let inventories = arr.map(item =>
          InventoryEntity.createFromResponse(item),
        );
        let variantIdNotExist = variantIds.filter(variantId => {
          let index = inventories.findIndex(
            inventory => inventory.getVariantId() === variantId,
          );
          return index === -1;
        });
        variantIdNotExist.forEach(variantId =>
          inventories.push(InventoryEntity.createEmpty(null, variantId)),
        );
        onSuccess(inventories);
      },
    );
  }

  getStoresWithInventories(
    variantId: number,
    locationSelected: LocationSelectedProvider,
    locations: Array<Location>,
    allLocation: Array<Location>,
    onSuccess: (stores: StoreEntity[]) => void,
    limit: number | null,
    isClearNotAvailable?: boolean,
  ) {
    let variantIds = [variantId];
    if (locationSelected.locationId === -1) {
      let listStoreId = locations.map(storeItem => storeItem.id);
      this.mappingInventoryToStoreEntity(
        variantIds,
        listStoreId,
        onSuccess,
        allLocation,
        limit,
        isClearNotAvailable,
      );
      return;
    }
    let storeSelect = allLocation.find(
      store => store.id === locationSelected.locationId,
    );
    let storeDistanceDto: Array<StoreResponseWithDistance> = [];
    if (storeSelect && storeSelect.latitude && storeSelect.longitude) {
      const {latitude, longitude} = storeSelect;
      storeDistanceDto = allLocation
        .filter(store => store.id !== locationSelected.locationId)
        .filter(store => store.latitude != null)
        .filter(store => store.longitude != null)
        .map(store => {
          let sLatitude = store.latitude ? store.latitude : -1;
          let sLongitude = store.longitude ? store.longitude : -1;
          let m = getDistance(
            {
              latitude: latitude,
              longitude: longitude,
            },
            {latitude: sLatitude, longitude: sLongitude},
            1,
          );
          let km = m / 1000;
          return {...store, km: km} as StoreResponseWithDistance;
        })
        .filter(item => item.km <= AppConfig.StoreMaxDistance)
        .sort((s1, s2) => s1.km - s2.km)
        .slice(0, this.maxStore);
    }
    if (storeDistanceDto.length === this.maxStore) {
      let storeIds = storeDistanceDto.map(store => store.id);
      this.mappingInventoryToStoreEntity(
        variantIds,
        storeIds,
        onSuccess,
        allLocation,
        limit,
        isClearNotAvailable,
      );
      return;
    }
    let storeIds = storeDistanceDto.map(store => store.id);
    let recordMissNumber = this.maxStore - storeIds.length;
    let cityId = storeSelect && storeSelect.cityId ? storeSelect.cityId : -1;
    const storeIdInCity = allLocation
      .filter(store => store.id !== locationSelected.locationId)
      .filter(store => store.cityId)
      .filter(store => store.cityId === cityId)
      .filter(
        store => storeIds.findIndex(storeId => storeId === store.id) === -1,
      )
      .map(store => store.id)
      .slice(0, recordMissNumber);
    storeIds = storeIds.concat(storeIdInCity);
    if (storeIds.length === this.maxStore) {
      let listStoreId = storeDistanceDto.map(storeItem => storeItem.id);
      this.mappingInventoryToStoreEntity(
        variantIds,
        listStoreId,
        onSuccess,
        allLocation,
        limit,
        isClearNotAvailable,
      );
      return;
    }
    recordMissNumber = this.maxStore - storeDistanceDto.length;
    let departmentH3Id =
      storeSelect && storeSelect.departmentH3Id
        ? storeSelect.departmentH3Id
        : -1;
    const storeInAsm = allLocation
      .filter(store => store.id !== locationSelected.locationId)
      .filter(store => store.departmentH3Id)
      .filter(store => store.departmentH3Id === departmentH3Id)
      .filter(
        store => storeIds.findIndex(storeId => storeId === store.id) === -1,
      )
      .map(store => store.id)
      .slice(0, recordMissNumber);
    storeIds = storeIds.concat(storeInAsm);
    this.mappingInventoryToStoreEntity(
      variantIds,
      storeIds,
      onSuccess,
      allLocation,
      limit,
      isClearNotAvailable,
    );
  }

  searchWithCity(
    cityId: number | undefined,
    variantId: number,
    allStore: Array<Location>,
    onSuccess: (store: Array<StoreEntity>) => void,
    beforeCallApi: () => void,
    onError: (code: ErrorType, msg: string) => void,
    onFinally: () => void,
  ) {
    let storeIds: Array<number> = [];
    let stores = allStore;
    if (cityId) {
      stores = allStore.filter(store => store.cityId === cityId);
      storeIds = stores.map(store => store.id);
    }
    this.getInventoriesApi(
      {
        isDetail: true,
        storeIds: storeIds,
        variantIds: [variantId],
      },
      inventories => {
        let storeInventories = stores.map(store => {
          let storeEntity = StoreEntity.createFromResponse(store);
          let index = inventories.findIndex(
            inventory => inventory.storeId === store.id,
          );
          if (index === -1) {
            return storeEntity;
          }
          storeEntity.setInventory(
            InventoryEntity.createFromResponse(inventories[index]),
          );
          return storeEntity;
        });
        storeInventories.sort(
          (a, b) =>
            b.getInventory().getTotalStockValue() -
            a.getInventory().getTotalStockValue(),
        );
        onSuccess(storeInventories);
      },
      beforeCallApi,
      onError,
      onFinally,
    );
  }

  addHistory(keyword: string) {
    let data: CreateHistorySearchRequest = {
      data: '',
      keyword: keyword,
      type: this.HistoryKey,
    };
    this.historySearchApi.addHistory(data).catch(e => this.handlerCatch(e));
  }

  getHistory(
    page: number,
    onSuccess: (
      rsData: Array<HistorySearchEntity>,
      rsPage: number,
      rsCanLoadMore: boolean,
    ) => void,
  ) {
    this.historySearchApi
      .getHistory({
        type: this.HistoryKey,
        limit: 10,
        page: page,
      })
      .then(response => {
        let result = response.data;
        if (this.notSuccessResult(result)) {
          this.handleResponse(result);
          return;
        }

        let {metadata, items} = result.data;
        let historySearch = items.map(item => HistorySearchEntity.create(item));
        let totalPage = Math.ceil(metadata.total / metadata.limit);
        let rsCanLoadMore = metadata.page + 1 <= totalPage;
        onSuccess(historySearch, metadata.page, rsCanLoadMore);
      })
      .catch(e => {
        console.log(e);
        this.handlerCatch(e);
      });
  }
  private deleteHistoryApi(idHistory: number) {
    this.historySearchApi
      .deleteHistory(idHistory)
      .catch(e => this.handlerCatch(e));
  }
  deleteHistory(
    itemDelete: HistorySearchEntity,
    histories: HistorySearchEntity[],
  ) {
    if (histories.length === 0) {
      console.warn('Xóa item lỗi. Danh sách tìm kiếm trống');
      return histories;
    }
    if (itemDelete.getId() <= 0) {
      console.warn('Xóa item lỗi. ID lịch sử tìm kiếm có vấn đề');
      return histories;
    }
    let index = histories.findIndex(
      item => item.getId() === itemDelete.getId(),
    );
    if (index === -1) {
      console.warn(
        'Xóa item lỗi. Không tìm thấy id lịch sử tìm kiếm trong danh sách',
      );
      return histories;
    }
    this.deleteHistoryApi(itemDelete.getId());
    histories.splice(index, 1);
    return [...histories];
  }
  getBinLocation(
    page: number,
    locationId: number,
    beforeCallApi: () => void,
    onSuccess: (
      result: BinLocationEntity[],
      page: number,
      canLoadMore: boolean,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi();
    this.inventoryApi
      .getBinLocation({page, limit: 20}, locationId)
      .then(res => {
        let metadata = res?.data?.data?.metadata;
        if (metadata.total === 0) {
          onError(
            'SearchNotfound',
            'Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác',
          );
          return;
        }
        let result = (res?.data?.data?.items || []).map(
          item => new BinLocationEntity(item),
        );
        let totalPage = Math.ceil(metadata.total / metadata.limit);
        let canLoadMore = metadata.page + 1 <= totalPage;
        onSuccess(result, metadata.page, canLoadMore);
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(() => onFinally && onFinally());
  }
  private getVariantsByLocationApi(
    variantQuery: VariantLocationQueryRequest,
    beforeCallApi?: () => void,
    onSuccess?: (variants: Pageable<VariantResponse>) => void,
    onError?: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.productApi
      .getVariantsByLocation(variantQuery)
      .then(response => {
        const result = response.data;
        if (this.notSuccessResult(result)) {
          this.handleResponse(result);
        }
        onSuccess && onSuccess(result.data);
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(() => onFinally && onFinally());
  }
  getSuggestions(
    key: false | string,
    store_id: number,
    onSuccess: (rsSuggestion: Array<string>) => void,
  ) {
    if (key === false) {
      onSuccess([]);
      return;
    }
    this.getVariantsByLocationApi(
      {info: key, status: 'active', store_id},
      undefined,
      pageVariants => {
        let rs: Array<string> = [];
        if (pageVariants.items.length > 0) {
          rs = pageVariants.items.map(item => item.name);
        }
        onSuccess(rs);
      },
    );
  }

  getVariantsByBinLocation(
    key: false | string,
    store_id: number,
    onSuccess: (rsSuggestion: BinLocationEntity[]) => void,
  ) {
    if (key === false) {
      onSuccess([]);
      return;
    }
    this.getVariantsByLocationApi(
      {info: key, status: 'active', store_id},
      undefined,
      pageVariants => {
        const promise = new Promise(function (resolve, reject) {
          let res: BinLocationEntity[] = [];
          pageVariants.items.forEach(item => {
            BinLocationEntity.convertVariantResponseToBinLocationResponse(
              item,
              store_id,
              dataRes => {
                res.push(new BinLocationEntity(dataRes));
              },
            );
          });
          setTimeout(() => {
            resolve(res);
          }, 900);
        });
        //@ts-ignore
        promise.then((res: BinLocationEntity[]) => {
          onSuccess(res);
        });
      },
    );
  }
  updateBinLocationToStore(
    binLocation: BinLocationEntity[],
    from_bin_code: enumBinLocation,
    to_bin_code: enumBinLocation,
    storeId: number,
    profile: AccountProvider | null,
    onSuccess?: (res: any) => void,
    beforeCallApi?: () => void,
    onFinally?: () => void,
    onError?: (code: ErrorType, error: string) => void,
  ) {
    beforeCallApi && beforeCallApi();

    const items = (binLocation || []).map(item => {
      const bin_locations = [
        {
          bin_code: enumBinLocation.showroom,
          variant_id: item?.getVariantId(),
          remain: item?.getShowroom() || 0,
          store_id: storeId,
        },
        {
          bin_code: enumBinLocation.storage,
          variant_id: item.getVariantId(),
          remain: item?.getStorage() || 0,
          store_id: storeId,
        },
      ];
      return {
        ...item,
        bin_locations,
        image_url: item.getVariantImage(),
      };
    });
    const data = {
      from_bin_code,
      to_bin_code,
      items,
      action_by: profile?.code,
      updated_by: profile?.code,
      updated_name: profile?.fullName,
    };
    this.inventoryApi
      .updateBinTransfer(data, storeId)
      .then(result => {
        showSuccess('Tạo vị trí bin thành công');
        onSuccess && onSuccess(result);
      })
      .catch(error => this.handlerCatch(error, onError))
      .finally(() => onFinally && onFinally());
  }
}

const inventoryService = new InventoryService();

export default inventoryService;
