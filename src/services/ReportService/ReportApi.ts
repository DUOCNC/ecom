import {ServiceConfig} from 'config/ServiceConfig';
import {ReportBestSale, ReportVisitor} from 'model/dto/ReportService/ReportDto';
import {ReportOfflineSalesParams} from 'services/ReportService/ReportParams';
import {ReportQuery} from 'model/query/ReportQuery';
import ReportUtils, {keysToCamelCase} from './ReportUtils';
import moment from 'moment';
import {
  FormatDatePattern,
  getBeforeStartEndDateByMonth,
  getDaysInYearByDate,
  getLastStartDateEndDateByDate,
  getStartDateEndDatByDate,
} from 'utils/DateUtils';
import {getAnalyticsApi} from 'services/AnalyticService/AnalyticApi';
import {
  EnumReportSaleType,
  EReportTabButton,
  ReportViewType,
} from 'ui/screens/MainStack/Report/ReportConfig';
import NumberUtils from 'utils/NumberUtils';
import _ from 'lodash';
import {BaseAxios} from 'common';

const today = moment(new Date()).format(FormatDatePattern['YYYY/MM/DD']);

const getAverageOrderValue = (
  params: ReportQuery,
  viewType: string,
  onSuccess: (
    data: number,
    orders: number,
    rateAverage: number | undefined,
    rateOrder: number | undefined,
  ) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let q = ReportUtils.getQueryAverage(params);
  const [lastFromDate, lastToDate] = getLastDateByViewType(params, viewType);
  let q1 = ReportUtils.getQueryAverage({
    ...params,
    from_date: lastFromDate,
    to_date: lastToDate,
  });
  let [averageOrderValue, orders, customers] = [0, 0, 0];
  let [averageOrderValueOld, ordersOld, customersOld] = [0, 0, 0];

  getAnalyticsApi(
    {q: q},
    rs => {
      const arrTotalSale = rs.result.data.map(e => e[0]);
      [averageOrderValue, orders, customers] = [
        0,
        rs.result.summary[1] ?? 0,
        rs.result.summary[2] ?? 0,
      ];
      if (arrTotalSale.length > 0 && customers) {
        averageOrderValue = arrTotalSale.reduce((a, b) => a + b, 0) / customers;
      }

      getAnalyticsApi(
        {q: q1},
        rs1 => {
          const arrTotalSale1 = rs1.result.data.map(e => e[0]);
          [averageOrderValueOld, ordersOld, customersOld] = [
            0,
            rs1.result.summary[1] ?? 0,
            rs1.result.summary[2] ?? 0,
          ];

          if (arrTotalSale1.length > 0 && customersOld) {
            averageOrderValueOld =
              arrTotalSale1.reduce((a, b) => a + b, 0) / customersOld;
          }

          if (averageOrderValue === Infinity || isNaN(averageOrderValue)) {
            averageOrderValue = 0;
          }
          let rateAverage = undefined,
            rateOrder = undefined;
          if (
            averageOrderValue !== Infinity &&
            averageOrderValueOld &&
            !isNaN(averageOrderValueOld)
          ) {
            rateAverage =
              ((averageOrderValue - averageOrderValueOld) /
                averageOrderValueOld) *
              100;
          }
          if (orders === Infinity || isNaN(orders)) {
            orders = 0;
          }
          if (ordersOld) {
            rateOrder = ((orders - ordersOld) / Math.abs(ordersOld)) * 100;
          }
          //GTTB/khách, số đơn, tăng trưởng GTTB/khách, tăng trưởng đơn
          onSuccess(averageOrderValue, orders, rateAverage, rateOrder);
          return;
        },
        () => {
          onSuccess(0, 0, 0, 0);
        },
        onFinanly,
      );
    },
    onError,
    onFinanly,
  );
};

const getConversionRate = async (
  query: ReportQuery,
  viewType: string,
  onSuccess: (data: string, growthRate: number | undefined) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  let [numberOfVisitors, customers, numberOfVisitorsOld, customersOld, rate] = [
    0, 0, 0, 0, 0,
  ];
  let growthRate: number | undefined;
  const queryRequest = _.cloneDeep(query);
  let q = ReportUtils.getQueryCustomers(queryRequest);
  const [lastFromDate, lastToDate] = getLastDateByViewType(
    queryRequest,
    viewType,
  );
  let q1 = ReportUtils.getQueryCustomers({
    ...queryRequest,
    from_date: lastFromDate,
    to_date: lastToDate,
  });

  const paramAdjacent = {
    from: lastFromDate,
    to: lastToDate,
  };
  const params: ReportOfflineSalesParams = {
    from: query.from_date ?? today,
    to: query.to_date ?? today,
  };

  numberOfVisitors = await getCustomerVisitors(params);
  numberOfVisitorsOld = await getCustomerVisitors(paramAdjacent);
  getAnalyticsApi(
    {q: q},
    rs => {
      if (rs) {
        if (rs.result.summary[0] && numberOfVisitors) {
          customers = rs.result.summary[0];

          rate = (customers / numberOfVisitors) * 100;
          getAnalyticsApi(
            {q: q1},
            rs1 => {
              if (rs1) {
                if (
                  rs1.result.summary[0] &&
                  numberOfVisitorsOld &&
                  customers &&
                  numberOfVisitors
                ) {
                  customersOld = rs1.result.summary[0];
                  if (
                    customers !== 0 &&
                    customersOld !== 0 &&
                    numberOfVisitors !== 0 &&
                    numberOfVisitorsOld !== 0
                  ) {
                    const rate1 = (customers / numberOfVisitors) * 100;
                    const rate2 = (customersOld / numberOfVisitorsOld) * 100;
                    growthRate =
                      parseFloat(rate1.toFixed(1)) -
                      parseFloat(rate2.toFixed(1));
                    if (rate === 100) {
                      onSuccess(rate.toString(), growthRate);
                      return;
                    }
                    onSuccess(rate.toFixed(1), growthRate);
                    return;
                  }
                } else {
                  onSuccess(rate !== 0 ? rate.toFixed(1) : '', growthRate);
                  return;
                }
              }
            },
            () => {
              onSuccess('', growthRate);
            },
            onFinanly,
          );
        } else {
          onSuccess('', growthRate);
          return;
        }
      }
    },
    () => {
      onSuccess('', growthRate);
      return;
    },
    onFinanly,
  );
};

const getCustomerVisitors = async (params: ReportOfflineSalesParams) => {
  let numberOfVisitors = 0;
  const url = `${ServiceConfig.Report.Visitor}/key-drivers/sum`;
  const response = await BaseAxios.get(url, {
    params: params,
  });
  if (response) {
    numberOfVisitors = response.data.reduce(
      (sum: number, obj: ReportVisitor) => sum + keysToCamelCase(obj).value,
      0,
    );
  }

  return numberOfVisitors;
};

//thời gian liền kề, tính % tăng trưởng
const getLastDateByViewType = (params: ReportQuery, viewType: string) => {
  let viewDate = new Date(params.view_date ?? today),
    fromDate = moment(viewDate)
      .subtract(1, 'day')
      .format(FormatDatePattern['YYYY-MM-DD']),
    toDate = moment(viewDate)
      .subtract(1, 'day')
      .format(FormatDatePattern['YYYY-MM-DD']);

  switch (viewType) {
    case ReportViewType.week:
      const daysOfWeek = getLastStartDateEndDateByDate(viewDate);
      fromDate = daysOfWeek.fromDate;
      toDate = daysOfWeek.toDate;
      break;
    case ReportViewType.month:
      [fromDate, toDate] = getBeforeStartEndDateByMonth(viewDate);
      break;
    case ReportViewType.year:
      const yearAdjacent = viewDate.getFullYear() - 1;
      fromDate = `${yearAdjacent}-01-01`;
      toDate = `${yearAdjacent}-12-31`;
      break;
    default:
      break;
  }

  return [fromDate, toDate];
};

const getReportRetailDetailApi = (
  params: ReportQuery,
  activeTab: number,
  viewType: string,
  screen: string,
  onSuccess: (value: string, rate: number) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  params.from_date = params.from_date;
  params.to_date = params.to_date;

  let q = ReportUtils.getReportDetailRetailChart(params, screen);
  const [lastFromDate, lastToDate] = getLastDateByViewType(params, viewType);

  let q1 = ReportUtils.getReportDetailRetailChart(
    {
      ...params,
      from_date: lastFromDate,
      to_date: lastToDate,
    },
    screen,
  );

  let [totalSales, customers, averageOrderValue] = [0, 0, 0],
    [totalSalesOld, customersOld, averageOrderValueOld] = [0, 0, 0],
    value = '0',
    rate = 0;
  getAnalyticsApi(
    {q: q},
    rs => {
      if (rs) {
        totalSales = rs.result.summary[2] ?? 0;
        customers = rs.result.summary[3] ?? 0;
        const orders = rs.result.summary[4] ?? 0;
        averageOrderValue = orders ? totalSales / orders : 0;

        const objValue = [totalSales, customers, averageOrderValue];
        if (activeTab === EReportTabButton.customer) {
          value = NumberUtils.formatNumber(objValue[activeTab]);
        } else {
          value = NumberUtils.formatCurrency(objValue[activeTab]);
        }
        getAnalyticsApi(
          {q: q1},
          rs1 => {
            if (rs1) {
              [totalSalesOld, customersOld, averageOrderValueOld] = [
                rs1.result.summary[2] ?? 0,
                rs1.result.summary[3] ?? 0,
                0,
              ];
              let rateAverageOrderValue = 0,
                rateTotalSales = 0,
                rateCustomers = 0;
              if (totalSalesOld && rs1.result.summary[4]) {
                averageOrderValueOld = totalSalesOld / rs1.result.summary[4];
                rateAverageOrderValue =
                  ((parseFloat(averageOrderValue.toFixed(0)) -
                    parseFloat(averageOrderValueOld.toFixed(0))) /
                    parseFloat(averageOrderValueOld.toFixed(0))) *
                  100;
              }
              if (customersOld || customersOld !== 0) {
                rateCustomers =
                  ((customers - customersOld) / Math.abs(customersOld)) * 100;
              }

              if (totalSalesOld || totalSalesOld !== 0) {
                rateTotalSales =
                  ((totalSales - totalSalesOld) / Math.abs(totalSalesOld)) *
                  100;
              }
              const objRate = [
                rateTotalSales,
                rateCustomers,
                rateAverageOrderValue,
              ];
              rate = objRate[activeTab];
              onSuccess(value, rate);
            }
          },
          onError,
          onFinanly,
        );
      }
    },
    onError,
    onFinanly,
  );
};

const getReportTopSaleApi = (
  params: ReportQuery,
  activeTab: number,
  typeReport: string,
  viewType: string,
  onSuccess: (total: string, res: Array<ReportBestSale>) => void,
  onError: (errors: Array<string>) => void,
  onFinanly: () => void,
) => {
  if (viewType === ReportViewType.week) {
    [params.from_date, params.to_date] = getStartDateEndDatByDate(
      new Date(params.view_date ?? today),
    );
  }
  if (viewType === ReportViewType.year) {
    [params.from_date, params.to_date] = getDaysInYearByDate(
      new Date(params.view_date ?? today),
    );
  }
  let q = ReportUtils.getQueryBestSaler(params, activeTab);
  if (typeReport === EnumReportSaleType.cashier) {
    q = ReportUtils.getQueryStaff(params, activeTab);
  }
  getAnalyticsApi(
    {
      q: q,
    },
    result => {
      if (result.result.data) {
        let res: Array<ReportBestSale> = [];
        let total: string = '';
        let data = result.result.data;

        data?.filter(e => {
          res.push({
            assigneeCode: e[0],
            assigneeName: e[1],
            orderCount: e[2],
            returnCount: e[3],
            totalSales: e[4],
            averageOrderValue: e[5],
            customers: e[6],
            averageCustomerSpent: e[7],
            returns: e[8],
            grossSales: e[9],
          });
        });
        if (result.result.summary) {
          const [totalSale, customers, orderCounts] = [
            result.result.summary[4],
            result.result.summary[6],
            result.result.summary[2],
          ];
          total = totalSale
            ? NumberUtils.formatCurrency(parseFloat(totalSale.toFixed(1)))
            : '';
          if (activeTab === EReportTabButton.customer) {
            total = customers ? NumberUtils.formatNumber(customers) : '';
          }
          if (activeTab === EReportTabButton.average) {
            total =
              totalSale && orderCounts && orderCounts !== 0
                ? NumberUtils.formatCurrency(
                    parseFloat((totalSale / orderCounts).toFixed(1)),
                  )
                : '';
          }
        }
        onSuccess(total, res);
      }
    },
    onError,
    onFinanly,
  );
};

export {
  getAverageOrderValue,
  getConversionRate,
  getReportRetailDetailApi,
  getReportTopSaleApi,
};
