import {Colors} from 'assets/colors';

export interface SubStatusColor {
  code: string;
  name: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

const SubStatuses: Array<SubStatusColor> = [
  {
    code: 'first_call_attempt',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    name: 'Gọi điện lần 1',
    borderColor: '#FFDF9B',
  },
  {
    code: 'awaiting_coordinator_confirmation',
    name: 'Mới',
    borderColor: '#99CFFF',
    textColor: '#0074DA',
    backgroundColor: '#F2F9FF',
  },
  {
    code: 'coordinator_confirmed',
    borderColor: '#4949F2',
    textColor: '#3F3FC8',
    backgroundColor: '#ECECFF',
    name: 'Đã xác nhận',
  },
  {
    code: 'merchandise_picking',
    borderColor: '#99CFFF',
    textColor: '#0074DA',
    backgroundColor: '#F2F9FF',
    name: 'Đang đóng gói',
  },
  {
    code: 'awaiting_shipper',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
    name: 'Chờ thu gom',
  },
  {
    code: 'merchandise_packed',
    borderColor: '#99CFFF',
    textColor: '#0074DA',
    backgroundColor: '#F2F9FF',
    name: 'Đã đóng gói',
  },
  {
    code: 'shipping',
    textColor: '#0DB473',
    backgroundColor: '#F3FCF9',
    borderColor: '#B1F0D8',
    name: 'Đang chuyển',
  },
  {
    code: 'shipped',
    textColor: '#0DB473',
    backgroundColor: '#F3FCF9',
    borderColor: '#B1F0D8',
    name: 'Thành công',
  },
  {
    code: 'second_call_attempt',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
    name: 'Gọi lần 2',
  },
  {
    code: 'third_call_attempt',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    name: 'Gọi lần 3',
    borderColor: '#FFDF9B',
  },
  {
    code: 'require_warehouse_change',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Đổi kho hàng',
  },
  {
    code: 'returning',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Đang hoàn',
  },
  {
    code: 'returned',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Đã hoàn',
  },
  {
    code: 'awaiting_saler_confirmation',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
    name: 'Chờ xử lý',
  },
  {
    code: 'coordinator_confirming',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
    name: 'Đang xác nhận',
  },
  {
    code: 'out_of_stock',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    name: 'Hết hàng',
    borderColor: '#FFDF9B',
  },
  {
    code: 'delivery_fail',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Thất bại',
  },
  {
    code: 'compensate',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Đền bù',
  },
  {
    code: 'customer_cancelled',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Khách hủy',
  },
  {
    code: 'system_cancelled',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Hệ thống hủy',
  },
  {
    code: 'customer_confirming',
    textColor: Colors.White,
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
    name: 'Chờ khách xác nhận',
  },
  {
    code: 'confirm_returned',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
    name: 'Xác nhận hoàn',
  },
  {
    code: 'delivery_service_cancelled',
    textColor: '#747C87',
    backgroundColor: '#F3F4F5',
    borderColor: '#D3D5D7',
    name: 'HVC hủy',
  },
];

export {SubStatuses};
