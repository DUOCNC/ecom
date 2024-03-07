import {PaymentConfig} from 'config/DataSourceConfig/PaymentConfig';

const PaymentSource = {
  [PaymentConfig.Point]: {
    id: 1,
    code: PaymentConfig.Point,
    name: 'Tiêu điểm',
  },
  [PaymentConfig.Cash]: {
    id: 2,
    code: PaymentConfig.Cash,
    name: 'Tiền mặt',
  },
  [PaymentConfig.BankTransfer]: {
    id: 3,
    code: PaymentConfig.BankTransfer,
    name: 'Chuyển khoản',
  },
  [PaymentConfig.QrPay]: {
    id: 4,
    code: PaymentConfig.QrPay,
    name: 'QR Pay',
  },
  [PaymentConfig.Card]: {
    id: 6,
    code: PaymentConfig.Card,
    name: 'Quẹt thẻ',
  },
  [PaymentConfig.Momo]: {
    id: 7,
    code: PaymentConfig.Momo,
    name: 'Momo',
  },
  [PaymentConfig.VnPay]: {
    id: 8,
    code: PaymentConfig.VnPay,
    name: 'VNPay',
  },
};

export {PaymentSource};
