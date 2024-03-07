const PaymentStatusConfig = {
  PAID: 'paid',
  UNPAID: 'unpaid',
  PARTIAL_PAID: 'partial_paid',
  REFUNDING: 'refunding',
  REFUNDED: 'refunded',
};

const PaymentStatusSource = [
  {
    value: PaymentStatusConfig.PAID,
    display: 'Đã thanh toán',
    textColor: '#0DB473',
    backgroundColor: '#F3FCF9',
    borderColor: '#B1F0D8',
  },
  {
    value: PaymentStatusConfig.UNPAID,
    display: 'Chưa thanh toán',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
  },
  {
    value: PaymentStatusConfig.PARTIAL_PAID,
    display: 'Đã trả 1 phần',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
  },
  {
    value: PaymentStatusConfig.REFUNDING,
    display: 'Đang hoàn lại',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
  },
  {
    value: PaymentStatusConfig.REFUNDED,
    display: 'Đã hoàn lại',
    textColor: '#0DB473',
    backgroundColor: '#F3FCF9',
    borderColor: '#B1F0D8',
  },
];

const findPaymentSource = (value: string) => {
  return PaymentStatusSource.find(item => item.value === value);
};

export {PaymentStatusSource, findPaymentSource, PaymentStatusConfig};
