import {PaymentSource} from 'config/DataSourceConfig/PaymentSource';
import {PaymentConfig} from 'config/DataSourceConfig/PaymentConfig';
import {OrderPaymentSubRequest} from 'model/request/OrderRequest';

const PaymentUtils = {
  getDefaultPayment: (customer_id: number | null, method: string) =>
    ({
      note: '',
      paid_amount: 0,
      status: '',
      amount: 0,
      customer_id: customer_id,
      payment_method_id: PaymentSource[method].id,
      payment_method_code: PaymentSource[method].code,
      payment_method: PaymentSource[method].name,
      type: '',
      reference: '',
      point: null,
      return_amount: 0,
      source: '',
    } as OrderPaymentSubRequest),
  getTotalPaidAmount: (
    payments: Array<OrderPaymentSubRequest>,
    ignoreMethod: string,
  ) => {
    return payments
      .filter(payment => payment.payment_method_code !== ignoreMethod)
      .map(payment => payment.paid_amount)
      .reduce((a, b) => a + b, 0);
  },
  getPaidCash: (payments: Array<OrderPaymentSubRequest>) => {
    let paymentAfterFilter = payments.filter(
      payment => payment.payment_method_code === PaymentConfig.Cash,
    );
    return paymentAfterFilter.length === 0
      ? 0
      : paymentAfterFilter[0].paid_amount;
  },
  getPaidCard: (payments: Array<OrderPaymentSubRequest>) => {
    let paymentAfterFilter = payments.filter(
      payment => payment.payment_method_code === PaymentConfig.Card,
    );
    return paymentAfterFilter.length === 0
      ? 0
      : paymentAfterFilter[0].paid_amount;
  },
  getPaidQR: (payments: Array<OrderPaymentSubRequest>) => {
    let paymentAfterFilter = payments.filter(
      payment => payment.payment_method_code === PaymentConfig.QrPay,
    );
    return paymentAfterFilter.length === 0
      ? 0
      : paymentAfterFilter[0].paid_amount;
  },
  getReferenceCard: (payments: Array<OrderPaymentSubRequest>) => {
    let paymentAfterFilter = payments.filter(
      payment => payment.payment_method_code === PaymentConfig.Card,
    );
    return paymentAfterFilter.length === 0
      ? ''
      : paymentAfterFilter[0].reference;
  },
  getReferenceQR: (payments: Array<OrderPaymentSubRequest>) => {
    let paymentAfterFilter = payments.filter(
      payment => payment.payment_method_code === PaymentConfig.QrPay,
    );
    return paymentAfterFilter.length === 0
      ? ''
      : paymentAfterFilter[0].reference;
  },
  getPaidPoint: (payments: Array<OrderPaymentSubRequest>) => {
    let paymentAfterFilter = payments.filter(
      payment => payment.payment_method_code === PaymentConfig.Point,
    );
    return paymentAfterFilter.length === 0 ? 0 : paymentAfterFilter[0].point;
  },
  getPaidPointAmount: (payments: Array<OrderPaymentSubRequest>) => {
    let paymentAfterFilter = payments.filter(
      payment => payment.payment_method_code === PaymentConfig.Point,
    );
    return paymentAfterFilter.length === 0 ? 0 : paymentAfterFilter[0].amount;
  },
  calculatePayment: (
    payments: Array<OrderPaymentSubRequest>,
    total: number,
  ) => {
    let indexCash = payments.findIndex(
      payment => payment.payment_method_code === PaymentConfig.Cash,
    );
    if (indexCash !== -1) {
      const totalPaidAmount = PaymentUtils.getTotalPaidAmount(
        payments,
        PaymentConfig.Cash,
      );
      payments[indexCash].amount = total - totalPaidAmount;
      let returnAmount =
        payments[indexCash].paid_amount - payments[indexCash].amount;
      payments[indexCash].return_amount = returnAmount > 0 ? returnAmount : 0;
    }
  },
};

export default PaymentUtils;
