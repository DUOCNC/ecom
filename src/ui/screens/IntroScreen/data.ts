import {introduce_one, introduce_three, introduce_two} from 'assets/images';

export interface DataIntro {
  id: number;
  image: any;
  text: string;
  subText: string;
}

const dataIntro: Array<DataIntro> = [
  {
    id: 1,
    image: introduce_one,
    text: 'Yody ra mắt ứng dụng nội bộ',
    subText: 'Phiên bản đầu tiên dành riêng cho Chuyên gia tư vấn',
  },
  {
    id: 2,
    image: introduce_two,
    text: 'Thông tin sản phẩm',
    subText:
      'Chỉ với một thao tác, dễ dàng tra cứu thông tin chi tiết sản phẩm',
  },
  {
    id: 3,
    image: introduce_three,
    text: 'Doanh thu cá nhân',
    subText: 'Cung cấp thông tin lương theo doanh thu dự kiến trong tháng',
  },
];

export {dataIntro};
