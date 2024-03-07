import {MainStore} from 'reduxs/MainStore';
import {ServiceConfig} from 'config/ServiceConfig';
import {ProductQuery} from 'model/query/ProductQuerys';
import {HttpConfig} from 'config/HttpConfig';
import {Result} from 'model/base/Result';
import {
  CategoryDto,
  CollectionSubDto,
  ProductDto,
} from 'model/dto/ProductService/ProductDto';
import {Paging} from 'model/base/Paging';
import {ResultConfig} from 'config/ResultConfig';
import {logout} from 'reduxs';
import {AppConfig} from 'config/AppConfig';
import {VariantInventoryQuery} from 'model/query/VariantInventoryQuery';
import {VariantDto} from 'model/dto/ProductService/VariantDto';
import {VariantQuery} from 'model/query/VariantQuery';
import {getAnalyticsApi} from 'services/AnalyticService/AnalyticApi';
import moment from 'moment';
import {VariantViewer} from 'model/viewer/ProductViewer';
import {BaseAxios} from 'common';
import { VariantResponse } from 'modules/order/models';

const getProductsApi = (
  request: ProductQuery,
  onSuccess: (data: Paging<ProductDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách sản phẩm cha. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Product}/products`, {
    params: request,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<ProductDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

const getProductApi = (
  id: number,
  onSuccess: (data: ProductDto) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy chi tiết sản phẩm. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Product}/products/${id}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<ProductDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

const getVariantInventoryApi = (
  query: VariantInventoryQuery,
  onSuccess: (variants: Paging<VariantDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy chi tiết sản phẩm. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Product}/variants/inventories`, {
    params: query,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<VariantDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

const getVariantsApi = (
  query: VariantQuery,
  onSuccess: (variants: Paging<VariantResponse>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách sản phẩm. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Product}/variants`, {
    params: query,
  })
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<VariantResponse>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

const getVariantApi = (
  id: number,
  onSuccess: (variant: VariantDto) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách sản phẩm. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Product}/variants/${id}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<VariantDto> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

const getCollectionsApi = (
  onSuccess: (variant: Array<CollectionSubDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy danh sách nhóm hàng. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Product}/collections`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<CollectionSubDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data.items);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

const getVariantBestSellApi = (
  onSuccess: (variant: Array<VariantViewer>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  const [fromDate, toDate] = [
    moment(new Date()).subtract(29, 'days').format('YYYY-MM-DD'),
    moment(new Date()).format('YYYY-MM-DD'),
  ];
  const query = `SHOW net_quantity BY variant_sku,variant_name,product_price FROM sales SINCE ${fromDate} UNTIL ${toDate} ORDER BY total_sales DESC`;

  getAnalyticsApi(
    {q: query},
    res => {
      let variants: Array<VariantViewer> = [];
      if (res && res.result && res.result.data) {
        for (let i = 0; i < res.result.data.length; i++) {
          const e = res.result.data[i];
          variants.push({
            sku: e[0],
            name: e[1],
            retail_price: e[2],
            ordered_item_quantity: e[3],
            variant_prices: [],
            variant_images: [],
          });
        }
      }
      onSuccess(variants);
    },
    onError,
    onFinanly,
  );
};

const getTopCategoryApi = (
  onSuccess: (variant: Array<CategoryDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy top danh mục. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Mobile}/products/categories/top15`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Array<CategoryDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

const getVariantBySkusApi = (
  skus: string,
  onSuccess: (variant: Array<VariantDto>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let defaultErrors = [
    `${AppConfig.DefaultError} lấy sản phẩm. Vui lòng thử lại sau`,
  ];
  BaseAxios.get(`${ServiceConfig.Product}/variants/simple?skus=${skus}`)
    .then(response => {
      if (response.status === HttpConfig.OK) {
        let result: Result<Paging<VariantDto>> = response.data;
        switch (result.code) {
          case ResultConfig.Ok:
            onSuccess(result.data.items);
            break;
          case ResultConfig.Unauthorize:
            MainStore.dispatch(logout());
            break;
          default:
            onError(result.errors || defaultErrors);
            break;
        }
      }
    })
    .catch(() => {
      onError(defaultErrors);
    })
    .finally(() => onFinanly());
};

export {
  getProductsApi,
  getProductApi,
  getVariantInventoryApi,
  getVariantsApi,
  getVariantApi,
  getCollectionsApi,
  getVariantBestSellApi,
  getTopCategoryApi,
  getVariantBySkusApi,
};
