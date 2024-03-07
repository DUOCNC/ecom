import {BaseRequest} from './BaseRequest';

export interface ConversionRequest extends BaseRequest {
  viewDate?: string;
  beginDate?: string;
  endDate?: string;
  timeType: 'day' | 'week' | 'month' | string;
  storeName?: string;
  sort?: string;
  sortType?: string;
  searchAssignee?: string;
  storeId?: number;
}
