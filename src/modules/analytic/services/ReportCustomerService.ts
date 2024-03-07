import {StringUtils} from 'common';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';
import AnalyticApi from '../api/AnalyticApi';
import {ReportCustomerHourConfig} from '../config';
import {ResultResponse} from '../models';
import {CustomerVisitorEntity, ReportCustomerEntity} from '../models/entities';
import {ReportQueryRequest} from '../models/requests';
import BaseService from './BaseService';

class ReportCustomerService extends BaseService {
  private analyticApi: AnalyticApi;
  constructor() {
    super();
    this.analyticApi = new AnalyticApi();
  }

  getReportCustomer(
    request: ReportQueryRequest,
    customerVisitor: CustomerVisitorEntity,
    customerReceived: CustomerVisitorEntity,
    success: (data: ReportCustomerEntity) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const q = this.getQuery(request);
    const q1 = this.getQuery({
      ...request,
      view_date: moment(request.view_date)
        .subtract(1, 'd')
        .format(FormatDatePattern['YYYY-MM-DD']),
    });
    let reportCustomerEntity = new ReportCustomerEntity();
    this.analyticApi
      .getAnalytic({q: q})
      .then(res => {
        if (res.data) {
          const hourNow = moment().hours();
          let reportCustomerConfig = ReportCustomerHourConfig.find(e => {
            return e.fromHourCheck <= hourNow && hourNow < e.toHourCheck;
          });
          if (!reportCustomerConfig) {
            reportCustomerConfig = ReportCustomerHourConfig[0];
          }
          if (reportCustomerConfig.timeSlot === 1) {
            this.analyticApi.getAnalytic({q: q1}).then(resPeriod => {
              reportCustomerEntity.setReportCustomerEntity(
                res.data.result,
                customerVisitor,
                customerReceived,
                resPeriod.data.result,
              );
              success(reportCustomerEntity);
              return;
            });
          } else {
            const queryDetailHour = this.getQueryDetailHour(request);
            let resultResponse: ResultResponse | null = null;

            this.analyticApi
              .getAnalytic({q: queryDetailHour})
              .then(resDetailHour => {
                //tạo ResultResponse theo type
                resultResponse = resDetailHour.data.result;
                let [totalSale, customer] = [0, 0];
                resultResponse.data = resultResponse.data.filter(e => {
                  e[0] = moment(new Date(e[0])).get('hours');
                  if (
                    reportCustomerConfig &&
                    reportCustomerConfig.fromHour <= e[0] &&
                    e[0] < reportCustomerConfig.toHour
                  ) {
                    totalSale += e[1] ?? 0;
                    customer += e[2] ?? 0;
                    return e;
                  }
                });
                resultResponse.summary = [0, totalSale, customer];
                if (totalSale === 0) {
                  resultResponse = null;
                }
                reportCustomerEntity.setReportCustomerEntity(
                  res.data.result,
                  customerVisitor,
                  customerReceived,
                  resultResponse,
                );
                success(reportCustomerEntity);
                return;
              })
              .finally(() => {
                reportCustomerEntity.setReportCustomerEntity(
                  res.data.result,
                  customerVisitor,
                  customerReceived,
                  resultResponse,
                );
                success(reportCustomerEntity);
              });
          }
        }
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
        });
      });
  }
  private getQuery(request: ReportQueryRequest) {
    return StringUtils.format(
      "SHOW total_sales, customers BY pos_location_name FROM offline_sales SINCE {0} UNTIL {1} WHERE pos_location_name IN ('{2}')",
      request.view_date,
      request.view_date,
      request.pos_location_name,
    );
  }

  private getQueryDetailHour(request: ReportQueryRequest) {
    return StringUtils.format(
      "SHOW total_sales, customers OVER hour FROM offline_sales SINCE {0} UNTIL {1} WHERE pos_location_name IN ('{2}')",
      request.view_date,
      request.view_date,
      request.pos_location_name,
    );
  }
}

const reportCustomerService = new ReportCustomerService();

export default reportCustomerService;
