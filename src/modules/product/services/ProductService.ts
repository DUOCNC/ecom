import {
  AnalyticApi,
  CategoryMappingApi,
  HistorySearchApi,
  ProductApi,
} from '../api';
import BaseService from './BaseService';
import {MainStore} from 'reduxs/MainStore';
import {
  changeStore,
  initStore,
  loadingCategoryResponse,
  saveCategoryResponse,
} from '../redux';
import {
  CategoryEntity,
  CategoryResponse,
  HistorySearchEntity,
  ProductEntity,
  ProductResponse,
  TopVariantEntity,
  VariantQueryRequest,
  VariantResponse,
  VariantImageEntity,
  CareLabelEntity,
  VariantEntity,
  VariantColorEntity,
  CreateHistorySearchRequest,
} from '../models';
import {DateUtils, Pageable, StringUtils} from 'common';
import {DateFormatPattern} from 'common/enums';
import {ImageRequireSource} from 'react-native';
import {Source} from 'react-native-fast-image';
import CareLabelConfigs from '../config/CareLabelConfig';
import {ErrorType} from 'common-ui';
import {Location, LocationSelectedProvider} from 'model/providers';
import {MaterialEntity} from '../models/entities/MaterialEntity';
import { getMediaUrl } from 'utils/MediaUtils';

class ProductService extends BaseService {
  private categoryMappingApi: CategoryMappingApi;
  private analyticApi: AnalyticApi;
  private productApi: ProductApi;
  private historySearchApi: HistorySearchApi;
  private careLabelConfigs: Array<CareLabelEntity>;
  private readonly HistoryKey = 'variant';
  constructor() {
    super();
    this.categoryMappingApi = new CategoryMappingApi();
    this.analyticApi = new AnalyticApi();
    this.productApi = new ProductApi();
    this.historySearchApi = new HistorySearchApi();
    this.careLabelConfigs = CareLabelConfigs;
  }

  /**
   * Get query 30 ngày gần nhất
   * @returns Query
   */
  private getQueryTopProductIn30Day(location: LocationSelectedProvider) {
    let currentDate = new Date();
    let fromDate = DateUtils.getDatePrevious(currentDate, 29);
    if (location.locationId !== -1) {
      return StringUtils.format(
        'SHOW net_quantity BY variant_sku, variant_name FROM sales SINCE {0} UNTIL {1} WHERE pos_location_name IN ("{2}") ORDER BY total_sales DESC',
        DateUtils.format(fromDate, DateFormatPattern.YYYYMMDD),
        DateUtils.format(currentDate, DateFormatPattern.YYYYMMDD),
        location.locationName,
      );
    }
    return StringUtils.format(
      'SHOW net_quantity BY variant_sku, variant_name FROM sales SINCE {0} UNTIL {1} ORDER BY total_sales DESC',
      DateUtils.format(fromDate, DateFormatPattern.YYYYMMDD),
      DateUtils.format(currentDate, DateFormatPattern.YYYYMMDD),
    );
  }

  private getVariantApi(
    id: number,
    beforeCallApi?: () => void,
    onSuccess?: (variants: VariantResponse) => void,
    onError?: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.productApi
      .getVariant(id)
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

  private getProductApi(
    id: number,
    beforeCallApi?: () => void,
    onSuccess?: (variants: ProductResponse) => void,
    onError?: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.productApi
      .getProduct(id)
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

  private getVariantsApi(
    variantQuery: VariantQueryRequest,
    beforeCallApi?: () => void,
    onSuccess?: (variants: Pageable<VariantResponse>) => void,
    onError?: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    this.productApi
      .getVariants(variantQuery)
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

  /**
   * Get Category Respoonse
   */
  getCategory() {
    MainStore.dispatch(loadingCategoryResponse());
    this.categoryMappingApi
      .getTop15()
      .then(response => {
        let result = response.data;
        this.handleResponse(result);
        MainStore.dispatch(saveCategoryResponse(result.data));
      })
      .catch(error => this.handlerCatch(error));
  }

  /**
   * Handle Category Response -> Category Entity
   * @param data Category Response lấy từ api
   * @returns Array List category entity
   */
  getCategoryEntity(data: CategoryResponse[] | null) {
    if (data == null) {
      return [];
    }
    return data.map(item => new CategoryEntity(item));
  }

  /**
   * Get top sản phẩm bán chạy
   */
  getTopVariants(
    locationSelected: LocationSelectedProvider,
    locations: Array<Location>,
    onSuccess: (variantEntities: Array<TopVariantEntity>) => void,
    beforeCallApi: () => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally: () => void,
  ) {
    let storeIds = locations.map(store => store.id);
    if (locationSelected.locationId !== -1) {
      storeIds = [locationSelected.locationId];
    }
    beforeCallApi();
    const query = this.getQueryTopProductIn30Day(locationSelected);
    this.analyticApi
      .getAnalytic({q: query})
      .then(response => {
        const analyticResponse = response.data;
        let topVariantEntities = analyticResponse.result.data
          .map(value => TopVariantEntity.create(value[0], value[1], value[2]))
          .filter(variant => variant.getSku() !== '')
          .slice(0, 15);
        const arraySku = topVariantEntities.map(variant => variant.getSku());
        if (arraySku.length === 0) {
          onSuccess([]);
          return;
        }
        this.getVariantsApi(
          {skus: arraySku, storeIds: storeIds},
          beforeCallApi,
          pageVariant => {
            pageVariant.items.forEach(variant => {
              let topVariants = topVariantEntities.find(
                value => value.getSku() === variant.sku,
              );
              if (topVariants === undefined) {
                return;
              }
              topVariants.setVariant(variant);
            });
            topVariantEntities = topVariantEntities.filter(topVariant =>
              topVariant.nonNullVariant(),
            );
            onSuccess(topVariantEntities);
          },
          onError,
          onFinally,
        );
      })
      .catch(e => this.handlerCatch(e))
      .finally(onFinally);
  }

  getAllVariant(
    locationSelected: LocationSelectedProvider,
    assigneeStores: Array<Location>,
    beforeCallApi: () => void,
    onSuccess: (variantEntities: Array<VariantEntity>) => void,
    onError: (error: ErrorType, msg: string) => void,
    onFinally: () => void,
  ) {
    let storeIds = assigneeStores.map(store => store.id);
    if (locationSelected.locationId !== -1) {
      storeIds = [locationSelected.locationId];
    }
    beforeCallApi();
    this.getVariantsApi(
      {storeIds: storeIds, limit: 20},
      beforeCallApi,
      pageVariant => {
        let resultVariantEntity = pageVariant.items.map(variant =>
          VariantEntity.create(variant),
        );
        onSuccess(resultVariantEntity);
      },
      onError,
      onFinally,
    );
  }

  getVariants(
    storeIds: Array<number>,
    variantQuery: VariantQueryRequest,
    beforeCallApi: () => void,
    onSuccess: (
      variantEntities: Array<VariantEntity>,
      page: number,
      canLoadMore: boolean,
    ) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi();
    this.getVariantsApi(
      {...variantQuery, storeIds: storeIds},
      beforeCallApi,
      pageVariant => {
        if (pageVariant.metadata.total === 0) {
          onError(
            'SearchNotfound',
            'Có vẻ như bạn đã nhập sai tìm kiếm, vui lòng tìm kiếm với từ khóa khác',
          );
          return;
        }
        let resultVariantEntity = pageVariant.items.map(variant =>
          VariantEntity.create(variant),
        );
        let metadata = pageVariant.metadata;
        let totalPage = Math.ceil(metadata.total / metadata.limit);
        let canLoadMore = metadata.page + 1 <= totalPage;
        onSuccess(resultVariantEntity, metadata.page, canLoadMore);
      },
      onError,
      onFinally,
    );
  }

  initStore(id: number, name: string) {
    MainStore.dispatch(initStore({id: id, name: name}));
  }

  setStore(id: number, name: string) {
    MainStore.dispatch(changeStore({id: id, name: name}));
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

  addHistory(keyword: string) {
    let data: CreateHistorySearchRequest = {
      data: '',
      keyword: keyword,
      type: this.HistoryKey,
    };
    this.historySearchApi.addHistory(data).catch(e => this.handlerCatch(e));
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

  getSuggestions(
    key: false | string,
    onSuccess: (rsSuggestion: VariantEntity[]) => void,
  ) {
    if (key === false) {
      onSuccess([]);
      return;
    }
    this.getVariantsApi(
      {info: key, limit: 20, page: 1},
      undefined,
      pageVariants => {
        let rs: Array<VariantEntity> = [];
        if (pageVariants.items.length > 0) {
          rs = pageVariants.items.map(item => VariantEntity.create(item));
        }
        onSuccess(rs);
      },
    );
  }

  getVariant(
    id: number,
    beforeCallApi: () => void,
    onSuccess: (variantEntities: VariantEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi();
    this.getVariantApi(
      id,
      beforeCallApi,
      res => {
        let resultVariantEntity = VariantEntity.create(res);
        onSuccess(resultVariantEntity);
      },
      onError,
      onFinally,
    );
  }

  getProduct(
    id: number,
    beforeCallApi: () => void,
    onSuccess: (product: ProductEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi();
    this.getProductApi(
      id,
      beforeCallApi,
      res => {
        let productEntity = ProductEntity.createFromResponse(res);
        onSuccess(productEntity);
      },
      onError,
      onFinally,
    );
  }

  getImageSources(variantImages: Array<VariantImageEntity>) {
    return variantImages
      .map(variant => variant.getUrl())
      .filter(url => url !== '')
      .map(url => ({uri: url} as Source | ImageRequireSource));
  }

  getCareLabels(value: Array<string>) {
    return this.careLabelConfigs.filter(careLabel => {
      let index = value.findIndex(item => item === careLabel.getId());
      return index !== -1;
    });
  }

  getColors(product: ProductEntity) {
    let result: Array<VariantColorEntity> = [];
    product.getVariants().forEach(variant => {
      let index = result.findIndex(
        item => item.getColorId() === variant.getColorId(),
      );
      if (index === -1) {
        result.push(VariantColorEntity.createFromVariant(variant));
        return;
      }
      result[index].addVariant(variant);
    });
    return result;
  }

  public getMainMaterials(
    product: ProductEntity,
    beforeCallApi?: () => void,
    onSuccess?: (results: Array<MaterialEntity>) => void,
    onFinally?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    let materials = [];
    if (product.getFirstAttributeId() === 0) {
      return;
    }
    this.productApi
      .getMaterials(product.getAttributeIds())
      .then(response => {
        const result = response.data;
        if (this.notSuccessResult(result)) {
          this.handleResponse(result);
        }
        const {data} = result;
        materials = data.items.map(e => MaterialEntity.create(e));
        onSuccess && onSuccess(materials);
      })
      .catch(() => {
        onSuccess && onSuccess([]);
      })
      .finally(() => onFinally && onFinally());
  }
}

const productService = new ProductService();

export default productService;
