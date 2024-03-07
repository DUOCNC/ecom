import {
  ic_bill_info,
  ic_customer,
  ic_marketing,
  ic_package_delivery,
  ic_package_delivery1,
  ic_stock,
} from 'assets/images';

export interface DataMenuProps {
  id: number;
  icon: any;
  name: string;
  type: string;
  permission?: string;
  showFeature?: boolean;
}

const ReportGeneralMenu: Array<DataMenuProps> = [
  {
    id: 1,
    icon: ic_package_delivery,
    name: 'Báo cáo bán lẻ',
    type: 'report_general',
  },
  {
    id: 2,
    icon: ic_package_delivery1,
    name: 'Báo cáo đơn hàng',
    type: 'report_general',
  },
  {
    id: 3,
    icon: ic_marketing,
    name: 'Báo cáo marketing',
    type: 'report_general',
  },
  {
    id: 4,
    icon: ic_customer,
    name: 'Báo cáo khách hàng',
    type: 'report_general',
  },
  {
    id: 5,
    icon: ic_bill_info,
    name: 'Báo cáo tài chính',
    type: 'report_general',
  },
  {
    id: 6,
    icon: ic_stock,
    name: 'Báo cáo kho',
    type: 'ic_stock',
  },
];

export default ReportGeneralMenu;
