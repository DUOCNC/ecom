import {ErrorType} from 'common-ui';
import NewsApi from '../api/NewsApi';
import {NewsBannerRequest, NewsRequest} from '../model/request';
import BaseService from 'services/BaseService';
import {NewsEntity} from '../model/entities';
import {
  NewsBannerResponse,
  NewsCategoryResponse,
  NewsResponse,
} from '../model/response';
import NewsCategoryEntity from '../model/entities/NewsCategoryEntity';
import {Metadata} from 'common';
import NewsBannerEntity from '../model/entities/NewsBannerEntity';

class NewsService extends BaseService {
  private newsApi: NewsApi;
  constructor() {
    super();
    this.newsApi = new NewsApi();
  }

  getNews(
    request: NewsRequest,
    success: (data: Array<NewsEntity>, meta: Metadata) => void,
    error: (mess: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.newsApi
      .getNews(request)
      .then(response => {
        if (response.data && response.data.data) {
          const data = response.data.data;
          if (data.items.length > 0) {
            const news = data.items.map((item: NewsResponse) => {
              return new NewsEntity(item);
            });
            success(news, data.metadata);
          } else {
            error('NotfoundReport', 'Không có bài viết nào');
          }
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  getNewsCategories(
    success: (data: Array<NewsCategoryEntity>) => void,
    error: (mess: ErrorType) => void,
    beginCallApi?: () => void,
    onFinally?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.newsApi
      .getNewsCategories()
      .then(response => {
        if (response.data && response.data.data) {
          const items = response.data.data.items;
          if (items.length > 0) {
            const newsCategories = items.map((item: NewsCategoryResponse) => {
              return new NewsCategoryEntity(item);
            });
            success(newsCategories);
          } else {
            error('NotfoundReport');
          }
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinally);
  }
  getHotNews(
    success: (data: Array<NewsEntity>) => void,
    error: (mess: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.newsApi
      .getHotNews()
      .then(response => {
        if (response.data && response.data.data) {
          const data = response.data.data;
          if (data.items && data.items.length > 0) {
            const news = data.items.map((item: NewsResponse) => {
              return new NewsEntity(item);
            });
            success(news);
          } else {
            error('NotfoundReport', 'Không có bài viết nào');
          }
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  getNewsDetail(
    id: number,
    success: (data: NewsEntity) => void,
    error: (mess: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.newsApi
      .getNewsDetail(id)
      .then(response => {
        if (response.data && response.data.data) {
          const data = response.data.data;
          const news = new NewsEntity(data);
          success(news);
        } else {
          error('NotfoundReport', 'Không tìm thấy bài viết');
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  getNewsOther(
    categoryId: number,
    success: (data: Array<NewsEntity>) => void,
    error: (mess: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.newsApi
      .getNews({categoryId: categoryId, limit: 10})
      .then(response => {
        if (response.data && response.data.data) {
          const data = response.data.data;
          if (data.items.length > 0) {
            const news = data.items.map((item: NewsResponse) => {
              return new NewsEntity(item);
            });
            success(news);
          } else {
            error('NotfoundReport', 'Không có bài viết nào');
          }
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }

  getNewsBanners(
    request: NewsBannerRequest,
    success: (data: Array<NewsBannerEntity>) => void,
    error: (mess: ErrorType, msg: string) => void,
    beginCallApi?: () => void,
    onFinish?: () => void,
  ) {
    beginCallApi && beginCallApi();
    this.newsApi
      .getNewsBanners(request)
      .then(response => {
        if (response.data && response.data.data) {
          const data = response.data.data;
          if (data.items.length > 0) {
            const news = data.items
              .filter(e => e.bannerUrl)
              .map((item: NewsBannerResponse) => {
                return new NewsBannerEntity(item);
              });
            success(news);
          } else {
            error('NotfoundReport', 'Không có banner nào');
          }
        }
      })
      .catch(e => {
        this.handlerCatch(e);
      })
      .finally(onFinish);
  }
}

const newsService = new NewsService();

export default newsService;
