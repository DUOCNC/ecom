import {StoreDefault} from 'reduxs/User/DefaultStoreReducer';

export interface IReportCustomerHour {
  timeSlot: number;
  fromHourCheck: number;
  toHourCheck: number;
  fromHour: number;
  toHour: number;
}

export interface IReportCustomerDetailParam {
  customer_metric_type: string;
  view_date: string;
  store_active: StoreDefault;
}
