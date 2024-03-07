export interface TransferTabProp {
  key: string;
  value: string;
}
export const TransferTabConfig = {
  INFO: 'info',
  PRODUCT: 'product',
};

const TransferTabConfigs: Array<TransferTabProp> = [
  {
    key: TransferTabConfig.INFO,
    value: 'Thông tin',
  },
  {
    key: TransferTabConfig.PRODUCT,
    value: 'Sảm phẩm',
  },
];

export {TransferTabConfigs};
