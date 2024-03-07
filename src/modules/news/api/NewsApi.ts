import {BaseApi, Pageable, Result, StringUtils} from 'common';
import BaseAxiosPegasus from 'common/base/BaseAxiosPegasus';
import {
  NewsBannerResponse,
  NewsCategoryResponse,
  NewsResponse,
} from '../model/response';
import {NewsBannerRequest, NewsRequest} from '../model/request';

class NewsApi extends BaseApi {
  private readonly BaseUrlApi = '/api';

  constructor() {
    super();
  }

  getBaseUrl() {
    return this.BaseUrlApi;
  }

  getNews(request: NewsRequest) {
    if (request.categoryId === -1) {
      request.categoryId = undefined;
    }
    request.isShow = true;
    let url = this.getUrl('news/display');
    return BaseAxiosPegasus.get<Result<Pageable<NewsResponse>>>(url, {
      params: request,
    });
  }

  getHotNews() {
    const request: NewsRequest = {};
    request.isShow = true;
    request.isHotNews = true;
    request.limit = 100;
    request.page = 1;
    let url = this.getUrl('news/display');
    return BaseAxiosPegasus.get<Result<Pageable<NewsResponse>>>(url, {
      params: request,
    });
  }

  getNewsCategories() {
    return BaseAxiosPegasus.get<Result<Pageable<NewsCategoryResponse>>>(
      this.getUrl('news-categories?limit=500&page=1&is_show=true'),
    );
  }

  getNewsDetail(id: number) {
    return BaseAxiosPegasus.get<Result<NewsResponse>>(
      this.getUrl(StringUtils.format('news/{0}', id)),
    );
  }

  getNewsBanners(request: NewsBannerRequest) {
    let url = this.getUrl('news-banners');
    return BaseAxiosPegasus.get<Result<Pageable<NewsBannerResponse>>>(url, {
      params: request,
    });
  }
}

export default NewsApi;
