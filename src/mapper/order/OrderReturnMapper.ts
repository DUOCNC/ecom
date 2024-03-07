import {findPaymentReturnStatus} from 'config/DataSourceConfig/PaymentReturnStatus';
import {DetailCustomerDto} from 'model/dto/CustomerService/DetailCustomerDto';
import {OrderReturnDto} from 'model/dto/OrderService/OrderReturnDto';
import {CustomerViewer} from 'model/viewer/CustomerViewer';
import {OrderReturnViewer} from 'model/viewer/OrderReturnViewer';
import DateUtils, {FormatDatePattern} from 'utils/DateUtils';
import NumberUtils from 'utils/NumberUtils';
import LineItemMapper from './LintItemMapper';
import PaymentMapper from './PaymentMapper';

const OrderReturnMapper = {
  mapView: (order: OrderReturnDto | null) => {
    if (order === null) {
      return null;
    }
    let source = order.source ? order.source : '';
    let channel = order.channel ? order.channel : '';
    let quantity = order.items
      .map(item => item.quantity)
      .reduce((a, b) => a + b, 0);
    let items = order.items.map(item => LineItemMapper.mapLineItemViewer(item));
    let paymentView = findPaymentReturnStatus(order.paymentStatus);
    let payments = order.payments.map(item => PaymentMapper.mapPayment(item));
    return {
      order_id: order.orderId,
      order_code: order.orderCode,
      total: NumberUtils.formatCurrency(order.total),
      source: source,
      channel: channel,
      reason: order.subReason ? order.subReason.name : '',
      store: order.store,
      refund_date: DateUtils.format(
        order.returnDate,
        FormatDatePattern['DD/MM/YYYY - HH:mm'],
      ),
      return_status: order.received,
      return_status_name: order.received ? 'Đã nhận hàng' : 'Chưa nhận hàng',
      note:
        order.note && order.note.trim.length > 0
          ? order.note
          : 'Không có ghi chú',
      store_phone: order.storePhoneNumber,
      store_full_address: order.storeFullAddress,
      quantity: `${quantity} sản phẩm`,
      items: items,
      point_refund: `${order.pointRefund ?? 0} điểm`,
      amount: NumberUtils.formatCurrency(order.moneyAmount),
      bgPayment: paymentView?.backgroundColor,
      borderPayment: paymentView?.borderColor,
      txtPayment: paymentView?.textColor,
      payment: paymentView?.display,
      payments: payments,
    } as OrderReturnViewer;
  },
  mapCustomer: (customer: DetailCustomerDto | null) => {
    if (customer === null) {
      return null;
    }
    return {
      id: customer.id,
      name: customer.fullName,
      haveCustomerLevel: customer.customerLevel !== null,
      customerLevel: customer.customerLevel ? customer.customerLevel : '',
      phone: customer.phone,
      loyalty: customer.point == null ? 0 : customer.point.toString(),
    } as CustomerViewer;
  },
};

export default OrderReturnMapper;
