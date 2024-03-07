import {BaseApi, BaseAxios, Result} from 'common';
import {CategoryResponse} from '../models';

class CategoryMappingApi extends BaseApi {
  private readonly BaseUrlApi = '/unicorn/mobile-service';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getTop15() {
    let url = this.getUrl('products/categories/top15');
    return BaseAxios.get<Result<Array<CategoryResponse>>>(url);
  }
}

export default CategoryMappingApi;
