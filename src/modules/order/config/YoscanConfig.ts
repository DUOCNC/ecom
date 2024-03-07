
export interface SubStatusColorYoscan {
  code: string;
  name: string;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
}

const SubStatusesYoscan: Array<SubStatusColorYoscan> = [
  {
    code: 'READY',
    textColor: '#E6A114',
    backgroundColor: '#FFF7E7',
    name: 'Chưa quét',
    borderColor: '#FFDF9B',
  },
  {
    code: 'USED',
    name: 'Đã quét',
    borderColor: '#B1F0D8',
    textColor: '#0DB473',
    backgroundColor: '#F3FCF9',
  },
  {
    code: 'EXPIRED',
    borderColor: '#FFB8B8',
    textColor: '#EE4747',
    backgroundColor: '#FFF6F6',
    name: 'Hết hạn',
  },
];

export {SubStatusesYoscan};
