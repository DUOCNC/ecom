import {MainRouteConfig} from 'config/RouteConfig';
import {MetricCustomer} from '../enums';
import {IReportCustomerHour} from '../models/interface';

export const ReportCustomerHourConfig: Array<IReportCustomerHour> = [
  {timeSlot: 1, fromHourCheck: 0, toHourCheck: 12, fromHour: 0, toHour: 24},
  {timeSlot: 2, fromHourCheck: 12, toHourCheck: 20, fromHour: 11, toHour: 12},
  {timeSlot: 3, fromHourCheck: 20, toHourCheck: 24, fromHour: 19, toHour: 20},
];

export const ReportCustomerDetailTitleConfig: Array<{
  type: string;
  title: string;
}> = [
  {type: MetricCustomer.customer, title: 'Khách mua hàng'},
  {type: MetricCustomer.convert_rate, title: 'Tỷ lệ chuyển đổi'},
  {type: MetricCustomer.received, title: 'Khách đã tiếp'},
  {type: MetricCustomer.customer_not_buy, title: 'Khách không mua'},
];

export const ReportCustomerMetricScreenConfig: Array<{
  type: string;
  screen: string;
}> = [
  {type: MetricCustomer.customer, screen: MainRouteConfig.ReportCustomerDetail},
  {
    type: MetricCustomer.customer_not_buy,
    screen: MainRouteConfig.ReportCustomerNotBuy,
  },
  {
    type: MetricCustomer.convert_rate,
    screen: MainRouteConfig.ReportCustomerRate,
  },
  {
    type: MetricCustomer.received,
    screen: MainRouteConfig.ReportCustomerReceived,
  },
  {
    type: MetricCustomer.visitor,
    screen: MainRouteConfig.ReportCustomerVisitor,
  },
];
