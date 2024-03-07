import {ProductApi} from '../api';
import BaseService from './BaseService';
import {VariantEntity, VariantQueryRequest, VariantResponse} from '../models';
import {Pageable} from 'common';
import {ErrorType} from 'common-ui';
import {LocationSelectedProvider} from 'model/providers';

class ProductService extends BaseService {
  private productApi: ProductApi;
  private readonly HistoryKey = 'variant';
  constructor() {
    super();
    this.productApi = new ProductApi();
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

  getVariantByBarcode(
    locationSelected: LocationSelectedProvider,
    variantQuery: VariantQueryRequest,
    onSuccess: (variantEntities: VariantEntity) => void,
    onError: (code: ErrorType, error: string) => void,
    onFinally?: () => void,
  ) {
    this.productApi
      .getVariants({
        storeIds: [locationSelected.locationId],
        info: variantQuery.info,
        limit: 1,
        page: 1,
        saleable: variantQuery.saleable,
      })
      .then(response => {
        const result = response.data;
        if (result.data) {
          const resultVariantEntity = VariantEntity.create(
            result.data.items[0],
          );
          onSuccess(resultVariantEntity);
        }
      })
      .catch(() => onError)
      .finally(onFinally);
  }
}

const productService = new ProductService();

export default productService;
