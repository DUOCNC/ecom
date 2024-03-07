import {CustomerDto} from 'model/dto/CustomerService/CustomerDto';
import NumberUtils from 'utils/NumberUtils';
import {SubStatuses} from 'config/DataSourceConfig/OrderSource';

const CustomerUtils = {
  getPoint: (point: number | null) => {
    return point === null ? 0 : NumberUtils.formatNumber(point);
  },
  getTotalFinishedOrder: (
    total_finished_order: number | null,
    total_returned_order: number | null,
  ) => {
    if (total_finished_order == null) {
      return 0;
    }
    if (total_returned_order == null) {
      return total_finished_order;
    }
    return total_finished_order - total_returned_order;
  },
  detailSearch: (customerDto: CustomerDto) => {
    let key = '';
    if (customerDto.phone !== null) {
      key = customerDto.phone;
    }
    if (customerDto.fullName !== null) {
      key = key + ' - ' + customerDto.fullName;
    }
    if (key === '') {
      key = 'Không có tên';
    }
    return key;
  },
  getRemainAmount: (amount: number | null) => {
    if (amount === null) {
      return '0đ';
    }
    return NumberUtils.formatCurrency(amount);
  },
  getCustomerStringOrNull: (customer_group: string | null) => {
    if (customer_group === null || customer_group === '') {
      return 'Không có thông tin';
    }
    return customer_group;
  },
  getCustomerNumberOrNull: (value: number | null) => {
    if (value === null) {
      return 0;
    }
    return value;
  },
  getStatusDetail: (status: string) => {
    return status === 'active' ? 'Hoạt động' : 'Không hoạt động';
  },
  getSubStatus: (code: string) => {
    let index = SubStatuses.findIndex(value => value.code === code);
    if (index === -1) {
      return null;
    }
    return SubStatuses[index];
  },
};

export {CustomerUtils};
