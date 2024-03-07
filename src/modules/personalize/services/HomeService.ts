import {StringUtils} from 'common';
import {MyWorkConfig} from '../config';
import ArticleConfigs from '../config/ArticleConfigs';
import {
  ArticleEntity,
  CustomerVisitorEntity,
  MyWorkEntity,
  ReportEntity,
} from '../models';
import BaseService from './BaseService';
import {AnalyticApi, CustomerVisitorApi} from '../axios';
import {StoreActiveEntity} from '../models';
import {Location, LocationSelectedProvider} from 'model/providers';

class HomeService extends BaseService {
  private readonly works: Array<MyWorkEntity>;
  private readonly articles: Array<ArticleEntity>;
  private analyticApi: AnalyticApi;
  private customerVisitorApi: CustomerVisitorApi;

  constructor() {
    super();
    this.works = MyWorkConfig;
    this.articles = ArticleConfigs;
    this.analyticApi = new AnalyticApi();
    this.customerVisitorApi = new CustomerVisitorApi();
  }

  getWorks(hideFeature: boolean) {
    return this.works
      .filter(work => !hideFeature || !work.isFeature())
      .sort((m1, m2) => m1.getPosition() - m2.getPosition());
  }

  getWorksSimple(hideFeature: boolean) {
    return this.works
      .filter(work => !hideFeature || !work.isFeature())
      .filter(
        w =>
          [
            'location',
            'hrm_training',
            'expected_salary',
            'feedback',
            'help',
            'wall_feedback',
            'report_expected_salary',
            'single_work',
            'yody_news',
            'approval',
          ].findIndex(e => e === w.getId()) !== -1,
      )
      .sort((m1, m2) => m1.getPosition() - m2.getPosition());
  }

  getArticles() {
    return this.articles;
  }

  getReport(
    location: LocationSelectedProvider,
    onSuccess: (report: ReportEntity) => void,
    onFinalReport: () => void,
  ) {
    let q =
      'SHOW total_sales, orders, return_count, average_order_value, total_sales_pos_o2o, pre_total_sales_o2o  BY pos_location_name FROM offline_sales SINCE today UNTIL today';
    let storeId = location.locationId;
    if (storeId !== -1) {
      q = StringUtils.format(
        'SHOW total_sales, orders, return_count, average_order_value, total_sales_pos_o2o, pre_total_sales_o2o  BY pos_location_name FROM offline_sales WHERE pos_location_id IN ({0}) SINCE today UNTIL today',
        storeId,
      );
    }
    this.analyticApi
      .getAnalytic({q: q})
      .then(response => {
        const reportEntity = new ReportEntity();
        reportEntity.setReport(response.data);
        onSuccess(reportEntity);
      })
      .catch(error => this.handlerCatch(error))
      .finally(onFinalReport);
  }

  private getCustomerVisitorApi(
    date: Date,
    ids: Array<number>,
    assigneeCode: string,
    assigneeName: string,
    onResponse: (visitor: CustomerVisitorEntity) => void,
    onFinally: () => void,
    source?: string,
  ) {
    let customerVisitor = CustomerVisitorEntity.createWithParam(
      date,
      ids,
      assigneeCode,
      assigneeName,
      source,
    );
    this.customerVisitorApi
      .get(customerVisitor.getQuery())
      .then(response => {
        if (response.data.length > 0) {
          customerVisitor.setDataVisitor(response.data[0]);
        }
        onResponse(customerVisitor);
      })
      .catch(e => this.handlerCatch(e))
      .finally(onFinally);
  }

  getCustomerVisitorCurrent(
    id: number,
    assigneeCode: string,
    assigneeName: string,
    onResponse: (visitor: CustomerVisitorEntity) => void,
    onFinnaly: () => void,
  ) {
    this.getCustomerVisitorApi(
      new Date(),
      [id],
      assigneeCode,
      assigneeName,
      onResponse,
      onFinnaly,
    );
  }

  getCustomerGoStoreCurrent(
    id: number,
    assigneeCode: string,
    assigneeName: string,
    onResponse: (visitor: CustomerVisitorEntity) => void,
    onFinnaly: () => void,
  ) {
    this.getCustomerVisitorApi(
      new Date(),
      [id],
      assigneeCode,
      assigneeName,
      onResponse,
      onFinnaly,
      'receptionist',
    );
  }

  updateVisitor(
    storeActive: number,
    visitor: CustomerVisitorEntity,
    onResponse: (visitor: CustomerVisitorEntity) => void,
    onFinally: () => void,
    onError: () => void,
    isCustomerGoStore?: boolean,
  ) {
    let isCustomerGoStoreRequest = Boolean(isCustomerGoStore);
    let request = visitor.getRequestUpdate(
      storeActive,
      isCustomerGoStoreRequest,
    );
    if (request == null) {
      return;
    }
    this.customerVisitorApi
      .post(request)
      .then(response => {
        let newVisitor = CustomerVisitorEntity.copy(visitor);
        newVisitor.setDataVisitor(response.data);
        onResponse(newVisitor);
        onFinally();
      })
      .catch(e => {
        onError();
        this.handlerCatch(e);
      });
  }

  getStoreActiveEntity(storeDefault: LocationSelectedProvider) {
    return StoreActiveEntity.createFromStoreActive(storeDefault);
  }

  getStoreEntities(
    storeList: Array<Location>,
    keyword: string,
    requireStoreId: boolean,
  ) {
    let arr = storeList.filter(store => {
      if (keyword.trim() === '') {
        return true;
      }
      return StringUtils.search(keyword, store.name);
    });
    if (keyword.trim() === '' && arr.length !== 1 && !requireStoreId) {
      arr.unshift(Location.createAllStore());
    }
    return arr;
  }

  getStoreEntitiesForSupport(storeList: Array<Location>, keyword: string) {
    return storeList.filter(store => {
      if (keyword.trim() === '') {
        return true;
      }
      return StringUtils.search(keyword, store.name);
    });
  }
}

const homeService = new HomeService();

export default homeService;
