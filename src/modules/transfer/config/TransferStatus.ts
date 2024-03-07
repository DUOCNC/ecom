export interface TransferStatus {
  code: string;
  name: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

const TransferStatus: Array<TransferStatus> = [
  {
    code: 'requested',
    textColor: '#747C87',
    backgroundColor: '#F3F4F5',
    name: 'Yêu cầu',
    borderColor: '#D3D5D7',
  },
  {
    code: 'confirmed',
    name: 'Chờ chuyển',
    borderColor: '#FFDF9B',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
  },
  {
    code: 'transferring',
    borderColor: '#99CFFF',
    textColor: '#0074DA',
    backgroundColor: '#F2F9FF',
    name: 'Đang chuyển',
  },
  {
    code: 'arrived',
    borderColor: '#4949F2',
    textColor: '#4949F2',
    backgroundColor: '#ECECFF',
    name: 'Hàng về',
  },
  {
    code: 'pending',
    borderColor: '#EF6820',
    textColor: '#EF6820',
    backgroundColor: '#FEFAF5',
    name: 'Chờ xử lý',
  },
  {
    code: 'received',
    borderColor: '#B1F0D8',
    textColor: '#0DB473',
    backgroundColor: '#F3FCF9',
    name: 'Đã nhận',
  },
  {
    code: 'canceled',
    borderColor: '#EF6820',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    name: 'Đã hủy',
  },
];

export {TransferStatus};
