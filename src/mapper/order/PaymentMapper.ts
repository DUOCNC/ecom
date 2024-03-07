import {PaymentSubDto} from 'model/dto/OrderService/PaymentSubDto';
import {PaymentViewer} from 'model/viewer/PaymentViewer';
import NumberUtils from 'utils/NumberUtils';

const PaymentMapper = {
  mapPayment: (payment: PaymentSubDto) => {
    return {
      id: payment.id.toString(),
      name: payment.paymentMethod,
      amount: NumberUtils.formatCurrency(payment.amount),
    } as PaymentViewer;
  },
};

export default PaymentMapper;
