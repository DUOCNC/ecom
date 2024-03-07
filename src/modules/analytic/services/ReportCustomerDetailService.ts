import {StringUtils} from 'common';
import moment from 'moment';
import {FormatDatePattern} from 'utils/DateUtils';
import {CustomerVisitorApi} from '../api';
import AnalyticApi from '../api/AnalyticApi';
import {ReportCustomerHourConfig} from '../config';
import {ReportCustomerTab} from '../enums/ReportConfig';
import {
  CustomerVisitorEntity,
  ReportCustomerDetailEntity,
} from '../models/entities';
import {ReportQueryRequest} from '../models/requests';
import {ReportCustomerDetailResponse} from '../models/responses';
import BaseService from './BaseService';

export default abstract class ReportCustomerDetailService extends BaseService {
  protected analyticApi: AnalyticApi;
  constructor() {
    super();
    this.analyticApi = new AnalyticApi();
  }

  protected getQueries(
    request: ReportQueryRequest,
  ): [string, string, string, string, string] {
    const q = this.getQuery({
      ...request,
      from_date: request.view_date,
      to_date: request.view_date,
    });
    //requests
    const today = new Date();
    const qToday = this.getQuery({
      ...request,
      from_date: moment(today).format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today).format(FormatDatePattern['YYYY-MM-DD']),
    });
    const qYesterday = this.getQuery({
      ...request,
      from_date: moment(today)
        .subtract(1, 'd')
        .format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today)
        .subtract(1, 'd')
        .format(FormatDatePattern['YYYY-MM-DD']),
    });
    const qThisMonth = this.getQuery({
      ...request,
      from_date: moment(today)
        .startOf('month')
        .format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today).format(FormatDatePattern['YYYY-MM-DD']),
    });
    const qLastMonth = this.getQuery({
      ...request,
      from_date: moment(today)
        .subtract(1, 'M')
        .startOf('month')
        .format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today)
        .subtract(1, 'M')
        .endOf('month')
        .format(FormatDatePattern['YYYY-MM-DD']),
    });

    return [q, qToday, qYesterday, qThisMonth, qLastMonth];
  }

  protected getQuery(request: ReportQueryRequest) {
    return StringUtils.format(
      "SHOW total_sales, customers BY pos_location_name FROM offline_sales SINCE {0} UNTIL {1} WHERE pos_location_name IN ('{2}')",
      request.from_date,
      request.to_date,
      request.pos_location_name,
    );
  }

  protected getDayFromStartMonth(month: number) {
    const today = new Date();
    const thisMonth = moment(today).get('M');
    if (month === thisMonth) {
      const fromDate = moment().startOf('M');
      const toDate = moment(today);
      return toDate.diff(fromDate, 'days') + 1;
    }
    return moment(month).daysInMonth();
  }
  abstract getReportCustomerDetail(
    request: ReportQueryRequest,
    success: (data: ReportCustomerDetailEntity) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ): void;
}

export class ReportCustomerNotBuyDetailService extends ReportCustomerDetailService {
  constructor() {
    super();
  }
  getReportCustomerDetail(
    request: ReportQueryRequest,
    success: (data: ReportCustomerDetailEntity) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const customerVisitorDetailService =
      new ReportCustomerVisitorDetailService();
    const customerBuyDetailService = new ReportCustomerBuyDetailService();
    let customerBuyDetailEntity = new ReportCustomerDetailEntity();
    let customerVisitorDetailEntity = new ReportCustomerDetailEntity();
    customerBuyDetailService.getReportCustomerDetail(
      request,
      (res: ReportCustomerDetailEntity) => {
        customerBuyDetailEntity = res;
        customerVisitorDetailService.getReportCustomerDetail(
          request,
          async (resVisitor: ReportCustomerDetailEntity) => {
            customerVisitorDetailEntity = resVisitor;
            const [
              customerTotal,
              customerToday,
              customerYesterday,
              customerThisMonth,
              customerLastMonth,
            ] = customerBuyDetailEntity.getTotal();
            const [
              visitorTotal,
              visitorToday,
              visitorYesterday,
              visitorThisMonth,
              visitorLastMonth,
            ] = customerVisitorDetailEntity.getTotal();
            let customerRes: ReportCustomerDetailResponse = {
              totalValue: this.getValue(visitorTotal, customerTotal),
              totalToday: this.getValue(visitorToday, customerToday),
              totalYesterday: this.getValue(
                visitorYesterday,
                customerYesterday,
              ),
              totalThisMonth: this.getValue(
                visitorThisMonth,
                customerThisMonth,
                'thisMonth',
              ),
              totalLastMonth: this.getValue(
                visitorLastMonth,
                customerLastMonth,
                'lastMonth',
              ),
            };
            const reportCustomerNotBuyDetail = new ReportCustomerDetailEntity();
            if (customerRes.totalValue) {
              //danh thu bỏ lỡ (lấy dthu trung bình trước đó * khách không mua)
              const hourNow = moment().hours();
              let reportCustomerConfig = ReportCustomerHourConfig.find(e => {
                return e.fromHourCheck <= hourNow && hourNow < e.toHourCheck;
              });
              if (!reportCustomerConfig) {
                reportCustomerConfig = ReportCustomerHourConfig[0];
              }
              if (reportCustomerConfig.timeSlot === 1) {
                const view_date = moment(request.view_date)
                  .subtract(1, 'd')
                  .format(FormatDatePattern['YYYY-MM-DD']);
                this.analyticApi
                  .getAnalytic({
                    q: this.getQuery({
                      ...request,
                      from_date: view_date,
                      to_date: view_date,
                    }),
                  })
                  .then(resPeriod => {
                    let [totalSale, customer] = [0, 0];
                    if (resPeriod) {
                      const {summary} = resPeriod.data.result;
                      [totalSale, customer] = [
                        summary[1] ?? 0,
                        summary[2] ?? 0,
                      ];
                      if (customer !== 0 && customerRes.totalValue) {
                        if (totalSale / customer > 0) {
                          customerRes.totalMissRevenue = parseFloat(
                            (
                              (totalSale / customer) *
                              customerRes.totalValue
                            ).toFixed(2),
                          );
                        }
                      }
                    }
                    reportCustomerNotBuyDetail.setReportCustomerDetailEntity(
                      customerRes,
                    );
                    success(reportCustomerNotBuyDetail);
                  });
              } else {
                const queryDetailHour = this.getQueryDetailHour(request);
                this.analyticApi
                  .getAnalytic({q: queryDetailHour})
                  .then(resDetailHour => {
                    let resultResponse = resDetailHour.data.result;
                    let [totalSale, customer] = [0, 0];
                    resultResponse.data = resultResponse.data.filter(e => {
                      e[0] = moment(new Date(e[0])).hours();
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
                    if (customer !== 0 && customerRes.totalValue) {
                      customerRes.totalMissRevenue =
                        (totalSale / customer) * (customerRes.totalValue ?? 0);
                    }
                    reportCustomerNotBuyDetail.setReportCustomerDetailEntity(
                      customerRes,
                    );
                    success(reportCustomerNotBuyDetail);
                  });
              }
            } else {
              reportCustomerNotBuyDetail.setReportCustomerDetailEntity(
                customerRes,
              );
              success(reportCustomerNotBuyDetail);
            }
          },
          getExpectError,
        );
      },
      getExpectError,
    );
  }
  private getValue(
    visitor: number | undefined,
    customer: number | undefined,
    typeMonth?: 'thisMonth' | 'lastMonth',
  ) {
    let customerNotBuy = (visitor ?? 0) - (customer ?? 0);
    if (customerNotBuy < 0) {
      return 0;
    }
    if (typeMonth) {
      let days = this.getDayFromStartMonth(moment().get('M'));

      if (typeMonth === 'lastMonth') {
        days = this.getDayFromStartMonth(
          moment().get('M') === 1 ? 12 : moment().get('M') - 1,
        );
      }
      customerNotBuy = Math.round(customerNotBuy / days);
    }
    return customerNotBuy;
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

export class ReportCustomerRateDetailService extends ReportCustomerDetailService {
  constructor() {
    super();
  }

  getReportCustomerDetail(
    request: ReportQueryRequest,
    success: (data: ReportCustomerDetailEntity) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const customerVisitorDetailService =
      new ReportCustomerVisitorDetailService();
    const customerBuyDetailService = new ReportCustomerBuyDetailService();
    let customerBuyDetailEntity = new ReportCustomerDetailEntity();
    let customerVisitorDetailEntity = new ReportCustomerDetailEntity();
    customerBuyDetailService.getReportCustomerDetail(
      request,
      (res: ReportCustomerDetailEntity) => {
        customerBuyDetailEntity = res;
        customerVisitorDetailService.getReportCustomerDetail(
          request,
          (resVisitor: ReportCustomerDetailEntity) => {
            customerVisitorDetailEntity = resVisitor;
            const [
              customerTotal,
              customerToday,
              customerYesterday,
              customerThisMonth,
              customerLastMonth,
            ] = customerBuyDetailEntity.getTotal();
            const [
              visitorTotal,
              visitorToday,
              visitorYesterday,
              visitorThisMonth,
              visitorLastMonth,
            ] = customerVisitorDetailEntity.getTotal();
            let customerRes: ReportCustomerDetailResponse = {
              totalValue: this.getRateValue(customerTotal, visitorTotal),
              totalToday: this.getRateValue(customerToday, visitorToday),
              totalYesterday: this.getRateValue(
                customerYesterday,
                visitorYesterday,
              ),
              totalThisMonth: this.getRateValue(
                customerThisMonth,
                visitorThisMonth,
              ),
              totalLastMonth: this.getRateValue(
                customerLastMonth,
                visitorLastMonth,
              ),
            };
            const reportCustomerRateDetail = new ReportCustomerDetailEntity();
            reportCustomerRateDetail.setReportCustomerDetailEntity(customerRes);
            success(reportCustomerRateDetail);
          },
          getExpectError,
        );
      },
      getExpectError,
    );
  }

  private getRateValue(
    customer: number | undefined,
    visitor: number | undefined,
  ) {
    if (visitor === undefined) {
      return undefined;
    }
    if (visitor === 0 && customer && customer > 0) {
      return undefined;
    }
    if (visitor === 0 && customer === 0) {
      return 0;
    }

    return parseFloat((((customer ?? 0) / visitor) * 100).toFixed(2));
  }
}

export class ReportCustomerVisitorDetailService extends ReportCustomerDetailService {
  private customerVisitorApi: CustomerVisitorApi;
  constructor() {
    super();
    this.customerVisitorApi = new CustomerVisitorApi();
  }
  getReportCustomerDetail(
    request: ReportQueryRequest,
    success: (data: ReportCustomerDetailEntity) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const [q, qToday, qYesterday, qThisMonth, qLastMonth] =
      this.getParamRequest(request);
    let customerRes: ReportCustomerDetailResponse = {
      totalValue: 0,
      totalToday: 0,
      totalThisMonth: 0,
      totalYesterday: 0,
      totalLastMonth: 0,
    };
    const reportCustomerDetail = new ReportCustomerDetailEntity();

    const customerVisitorTotal = CustomerVisitorEntity.createWithParam(q);
    this.customerVisitorApi
      .get(customerVisitorTotal.getQuery(request.source))
      .then(res => {
        if (res.data) {
          customerVisitorTotal.setCustomerVisitor(res.data);

          customerRes.totalValue = customerVisitorTotal
            .getCustomerVisitor()
            .getValue();
        }
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
        });
      });
    const customerVisitorToday = CustomerVisitorEntity.createWithParam(qToday);

    this.customerVisitorApi
      .get(customerVisitorToday.getQuery(request.source))
      .then(res => {
        if (res.data) {
          customerVisitorToday.setCustomerVisitor(res.data);

          customerRes.totalToday = customerVisitorToday
            .getCustomerVisitor()
            .getValue();

          const customerVisitorYesterday =
            CustomerVisitorEntity.createWithParam(qYesterday);

          this.customerVisitorApi
            .get(customerVisitorYesterday.getQuery(request.source))
            .then(resYesterday => {
              if (resYesterday.data) {
                customerVisitorYesterday.setCustomerVisitor(resYesterday.data);
                customerRes.totalYesterday = customerVisitorYesterday
                  .getCustomerVisitor()
                  .getValue();

                const customerVisitorThisMonth =
                  CustomerVisitorEntity.createWithParam(qThisMonth);

                this.customerVisitorApi
                  .get(customerVisitorThisMonth.getQuery(request.source))
                  .then(resMonth => {
                    if (resMonth.data) {
                      const days = this.getDayFromStartMonth(moment().get('M'));
                      customerVisitorThisMonth.setCustomerVisitor(
                        resMonth.data,
                      );
                      customerRes.totalThisMonth = Math.round(
                        customerVisitorThisMonth
                          .getCustomerVisitor()
                          .getValue(),
                      );
                      customerRes.thisMonth = Math.round(
                        customerVisitorThisMonth
                          .getCustomerVisitor()
                          .getValue() / days,
                      );
                      const customerVisitorLastMonth =
                        CustomerVisitorEntity.createWithParam(qLastMonth);

                      this.customerVisitorApi
                        .get(customerVisitorLastMonth.getQuery(request.source))
                        .then(resLastMonth => {
                          if (resLastMonth.data) {
                            const daysLastMonth = this.getDayFromStartMonth(
                              moment().get('M') === 1
                                ? 12
                                : moment().get('M') - 1,
                            );
                            customerVisitorLastMonth.setCustomerVisitor(
                              resLastMonth.data,
                            );

                            customerRes.totalLastMonth = Math.round(
                              customerVisitorLastMonth
                                .getCustomerVisitor()
                                .getValue(),
                            );
                            customerRes.lastMonth = Math.round(
                              customerVisitorLastMonth
                                .getCustomerVisitor()
                                .getValue() / daysLastMonth,
                            );
                            reportCustomerDetail.setReportCustomerDetailEntity(
                              customerRes,
                            );
                            success(reportCustomerDetail);
                          }
                        })
                        .catch(error => {
                          this.handlerCatch(error, msg => {
                            getExpectError(msg);
                          });
                        });
                    }
                  })
                  .catch(error => {
                    this.handlerCatch(error, msg => {
                      getExpectError(msg);
                    });
                  });
              }
            })
            .catch(error => {
              this.handlerCatch(error, msg => {
                getExpectError(msg);
              });
            });
        }
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
        });
      });
  }

  private getParamRequest(request: ReportQueryRequest) {
    request.source = request.source ?? ReportCustomerTab.receptionist;
    const q = {
      ...request,
      from_date: request.view_date,
      to_date: request.view_date,
    };
    //requests
    const today = new Date();
    const qToday = {
      ...request,
      from_date: moment(today).format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today).format(FormatDatePattern['YYYY-MM-DD']),
    };
    const qYesterday = {
      ...request,
      from_date: moment(today)
        .subtract(1, 'd')
        .format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today)
        .subtract(1, 'd')
        .format(FormatDatePattern['YYYY-MM-DD']),
    };
    const qThisMonth = {
      ...request,
      from_date: moment(today)
        .startOf('month')
        .format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today).format(FormatDatePattern['YYYY-MM-DD']),
    };
    const qLastMonth = {
      ...request,
      from_date: moment(today)
        .subtract(1, 'M')
        .startOf('month')
        .format(FormatDatePattern['YYYY-MM-DD']),
      to_date: moment(today)
        .subtract(1, 'M')
        .endOf('month')
        .format(FormatDatePattern['YYYY-MM-DD']),
    };

    return [q, qToday, qYesterday, qThisMonth, qLastMonth];
  }
}

export class ReportCustomerBuyDetailService extends ReportCustomerDetailService {
  constructor() {
    super();
  }

  getReportCustomerDetail(
    request: ReportQueryRequest,
    success: (data: ReportCustomerDetailEntity) => void,
    getExpectError: (error: string) => void,
    beforeCallApi?: () => void,
  ) {
    beforeCallApi && beforeCallApi();
    const [q, qToday, qYesterday, qThisMonth, qLastMonth] = super.getQueries(
      request,
    );

    let customerRes: ReportCustomerDetailResponse = {
      totalValue: 0,
      totalToday: 0,
      totalThisMonth: 0,
      totalYesterday: 0,
      totalLastMonth: 0,
    };
    const reportCustomerDetail = new ReportCustomerDetailEntity();
    this.analyticApi
      .getAnalytic({q: q})
      .then(res => {
        let {summary} = res.data.result;
        if (summary[2] !== null) {
          customerRes.totalValue = summary[2];
        }
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
          return;
        });
      });

    this.analyticApi
      .getAnalytic({q: qToday})
      .then(res => {
        let {summary} = res.data.result;
        if (summary[2]) {
          customerRes.totalToday = summary[2];
        }
        this.analyticApi
          .getAnalytic({q: qYesterday})
          .then(res1 => {
            let summaryYesterday = [...res1.data.result.summary];
            if (summaryYesterday[2] != null) {
              customerRes.totalYesterday = summaryYesterday[2];
            }
            reportCustomerDetail.setReportCustomerDetailEntity({
              ...customerRes,
            });

            this.analyticApi
              .getAnalytic({q: qThisMonth})
              .then(resMonth => {
                const days = this.getDayFromStartMonth(moment().get('M'));
                let summaryMonth = resMonth.data.result.summary;
                summaryMonth[2] = summaryMonth[2] ?? 0;
                customerRes.totalThisMonth = Math.round(summaryMonth[2]);
                customerRes.thisMonth = Math.round(summaryMonth[2] / days);
                reportCustomerDetail.setReportCustomerDetailEntity(customerRes);

                this.analyticApi
                  .getAnalytic({q: qLastMonth})
                  .then(resLathMonth => {
                    const daysLastMonth = this.getDayFromStartMonth(
                      moment().get('M') === 1 ? 12 : moment().get('M') - 1,
                    );
                    let summaryLastMonth = resLathMonth.data.result.summary;
                    summaryLastMonth[2] = summaryLastMonth[2] ?? 0;
                    customerRes.totalLastMonth = Math.round(
                      summaryLastMonth[2],
                    );
                    customerRes.lastMonth = Math.round(
                      summaryLastMonth[2] / daysLastMonth,
                    );
                    reportCustomerDetail.setReportCustomerDetailEntity(
                      customerRes,
                    );
                    success(reportCustomerDetail);
                  })
                  .catch(error => {
                    this.handlerCatch(error, msg => {
                      getExpectError(msg);
                      return;
                    });
                  });
              })
              .catch(error => {
                this.handlerCatch(error, msg => {
                  getExpectError(msg);
                  return;
                });
              });
          })
          .catch(error => {
            this.handlerCatch(error, msg => {
              getExpectError(msg);
              return;
            });
          });
      })
      .catch(error => {
        this.handlerCatch(error, msg => {
          getExpectError(msg);
          return;
        });
      });
  }
}
