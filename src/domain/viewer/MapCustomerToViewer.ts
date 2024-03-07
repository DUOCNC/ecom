import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import {DetailCustomerViewer} from 'model/viewer/DetailCustomerViewer';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';

export const noData = '-';

export const showNullData = (value?: string | number | null) => {
  return value != null && value !== '' ? value : noData;
};
export const GENDER_OPTIONS = [
  {
    label: 'Nam',
    value: 'male',
  },
  {
    label: 'Nữ',
    value: 'female',
  },
  {
    label: 'Khác',
    value: 'other',
  },
];

export default function MapCustomerToViewer(
  customer: DetailCustomerDto | null,
) {
  let defaultNoInfo: string = '-';
  if (customer === null) {
    return null;
  }
  let totalFinishedOrder = 0;
  let averageOrderValue = 0;
  let totalPaidAmount = 0;
  let firstOrderTime = defaultNoInfo;
  let storeOfFirstOrderOffline = defaultNoInfo;
  let lastOrderTime = defaultNoInfo;
  let storeOfLastOrderOffline = defaultNoInfo;
  let numberOfDaysWithoutPurchase = defaultNoInfo;
  let totalReturnedOrder = 0;
  let totalRefundedAmount = 0;
  if (customer.report) {
    let report = customer.report;
    if (report.totalFinishedOrder) {
      totalFinishedOrder = report.totalFinishedOrder;
    }
    if (report.averageOrderValue) {
      averageOrderValue = report.averageOrderValue;
    }
    if (report.totalPaidAmount) {
      totalPaidAmount = report.totalPaidAmount;
    }
    if (report.firstOrderTime) {
      firstOrderTime = DateUtils.format(
        report.firstOrderTime,
        FormatDatePattern['DD/MM/YYYY'],
      );
    }
    if (report.storeOfFirstOrderOffline) {
      storeOfFirstOrderOffline = report.storeOfFirstOrderOffline;
    }
    if (report.lastOrderTime) {
      lastOrderTime = DateUtils.format(
        report.lastOrderTime,
        FormatDatePattern['DD/MM/YYYY'],
      );
    }
    if (report.storeOfLastOrderOffline) {
      storeOfLastOrderOffline = report.storeOfLastOrderOffline;
    }
    if (report.numberOfDaysWithoutPurchase) {
      numberOfDaysWithoutPurchase = NumberUtils.formatNumber(
        report.numberOfDaysWithoutPurchase,
      );
    }
  }
  return {
    id: customer.id,
    fullName: customer.fullName,
    point: customer.point === null ? '0' : customer.point.toString(),
    customerLevel: customer.customerLevel
      ? customer.customerLevel
      : 'Chưa có hạng',
    birthday: customer.birthday
      ? DateUtils.format(customer.birthday, FormatDatePattern['DD/MM/YYYY'])
      : defaultNoInfo,
    phone: customer.phone,
    customerType: customer.customerType ? customer.customerType : defaultNoInfo,
    customerGroup: customer.customerGroup
      ? customer.customerGroup
      : defaultNoInfo,
    cardNumber: customer.cardNumber ? customer.cardNumber : defaultNoInfo,
    assignedStore: customer.assignedStore
      ? customer.assignedStore
      : defaultNoInfo,
    totalFinishedOrder: NumberUtils.formatNumber(totalFinishedOrder),
    averageOrderValue: NumberUtils.formatCurrency(averageOrderValue),
    totalPaidAmount: NumberUtils.formatCurrency(totalPaidAmount),
    firstOrderTime: firstOrderTime,
    storeOfFirstOrderOffline: storeOfFirstOrderOffline,
    lastOrderTime: lastOrderTime,
    storeOfLastOrderOffline: storeOfLastOrderOffline,
    numberOfDaysWithoutPurchase: numberOfDaysWithoutPurchase,
    totalReturnedOrder: NumberUtils.formatNumber(totalReturnedOrder),
    totalRefundedAmount: NumberUtils.formatCurrency(totalRefundedAmount),
    gender: GENDER_OPTIONS.find(e => e.value === customer.gender)?.label ?? '-',
    email: showNullData(customer.email),
    weddingDate: showNullData(
      customer.weddingDate
        ? DateUtils.format(
            customer.weddingDate.toString(),
            FormatDatePattern['DD/MM/YYYY'],
          )
        : null,
    ),
    company: showNullData(customer.company),
    identityNumber: showNullData(customer.identityNumber),
    taxCode: showNullData(customer.taxCode),
    responsibleStaff: showNullData(customer.responsibleStaff),
    description: showNullData(customer.description),
  } as DetailCustomerViewer;
}
