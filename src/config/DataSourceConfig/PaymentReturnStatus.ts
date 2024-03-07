const PaymentStatusConfig = {
  PAID: 'paid',
  UNPAID: 'unpaid',
  PARTIAL_PAID: 'partial_paid',
  REFUNDING: 'refunding',
  REFUNDED: 'refunded',
};

const PaymentReturnStatusSource = [
  {
    value: PaymentStatusConfig.PAID,
    display: 'Đã hoàn tiền',
    textColor: '#0DB473',
    backgroundColor: '#F3FCF9',
    borderColor: '#B1F0D8',
  },
  {
    value: PaymentStatusConfig.UNPAID,
    display: 'Chưa hoàn tiền',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    borderColor: '#FFB8B8',
  },
  {
    value: PaymentStatusConfig.PARTIAL_PAID,
    display: 'Hoàn tiền 1 phần',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    borderColor: '#FFDF9B',
  },
];

const findPaymentReturnStatus = (value: string) => {
  return PaymentReturnStatusSource.find(item => item.value === value);
};

export {
  PaymentReturnStatusSource,
  findPaymentReturnStatus,
  PaymentStatusConfig,
};
