import {
  ic_cashier,
  ic_rp_account,
  ic_rp_customer,
  ic_rp_emulation,
  ic_rp_keydriver,
  ic_rp_variant,
  ic_sale_agent,
} from 'assets/images';
import {MainRouteConfig} from 'config/RouteConfig';
import {ReportItemViewer, ReportMenuViewer} from 'model/viewer/ReportViewer';

enum EnumReportSaleType {
  assignee = 'assignee',
  cashier = 'cashier',
}

enum EnumReportExpectedSalary {
  assignee = 36,
  staff = 45,
  leadShop = 35,
  probationaryLeadShop = 43,
}

enum ReportViewType {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}

enum EReportTabButton {
  revenue,
  customer,
  average,
}

interface ISalaryPosition {
  positionId: number;
  rate: number;
}
interface IReportTabButton {
  id: number;
  title: string;
  key: string;
}
interface IReportViewType {
  value: string;
  display: string;
  subDisplay: string;
  key: string;
}

interface IReportRetailKeyDriver {
  id: number;
  title: string;
}
interface IReportChartDetailTab {
  tab: number;
  title: string;
}

const ReportRetailItemConfig: ReportItemViewer[] = [
  {
    icon: ic_sale_agent,
    id: 1,
    title: 'Báo cáo theo nhân viên tư vấn',
    subTitle: 'Hiển thị báo cáo khối cửa hàng',
    screen: MainRouteConfig.ReportSaleAssignee,
    type: EnumReportSaleType.assignee,
  },
  {
    icon: ic_cashier,
    id: 2,
    title: 'Báo cáo theo nhân viên thu ngân',
    subTitle: 'Hiển thị báo cáo khối cửa hàng',
    screen: MainRouteConfig.ReportSaleAssignee,
    type: EnumReportSaleType.cashier,
  },
];

const ReportTopSellItemConfig: ReportItemViewer[] = [
  {
    icon: ic_sale_agent,
    id: 1,
    title: 'Báo cáo theo chuyên gia tư vấn',
    subTitle: 'Thống kê dữ liệu tệp cửa hàng',
    screen: MainRouteConfig.ReportTopSale,
    type: EnumReportSaleType.assignee,
  },
  {
    icon: ic_cashier,
    id: 2,
    title: 'Báo cáo theo thu ngân',
    subTitle: 'Thống kê dữ liệu tệp cửa hàng',
    screen: MainRouteConfig.ReportTopSale,
    type: EnumReportSaleType.cashier,
  },
];

const ReportRetailMenuConfig: ReportMenuViewer[] = [
  {
    icon: ic_rp_account,
    id: 0,
    title: 'Báo cáo theo nhân viên',
    screen: MainRouteConfig.ReportTopSale,
    showFeature: true,
  },
  {
    icon: ic_rp_emulation,
    id: 1,
    title: 'Báo cáo thi đua',
    screen: MainRouteConfig.ReportEmulationRSM,
    showFeature: false,
  },
  {
    icon: ic_rp_variant,
    id: 2,
    title: 'Báo cáo theo sản phẩm',
    screen: '',
  },
  {
    icon: ic_rp_customer,
    id: 3,
    title: 'Báo cáo theo khách hàng',
    screen: '',
  },
  {
    icon: ic_rp_keydriver,
    id: 4,
    title: 'Báo cáo chỉ số điều hành',
    screen: '',
  },
];

const ReportTabButtonCf: Array<IReportTabButton> = [
  {
    id: EReportTabButton.revenue,
    title: 'Doanh thu',
    key: 'total_sales',
  },
  {
    id: EReportTabButton.customer,
    title: 'Số khách mua',
    key: 'customers',
  },
  {
    id: EReportTabButton.average,
    title: 'GTTB/đơn',
    key: 'average_order_value',
  },
];

const ReportChartDetailCf: Array<IReportChartDetailTab> = [
  {
    tab: EReportTabButton.revenue,
    title: 'Tổng doanh thu',
  },
  {
    tab: EReportTabButton.customer,
    title: 'Tổng số khách mua',
  },
  {
    tab: EReportTabButton.average,
    title: 'GTTB đơn',
  },
];

const ReportViewTypeCf: Array<IReportViewType> = [
  {
    value: ReportViewType.day,
    display: 'Theo ngày',
    subDisplay: 'Ngày',
    key: 'hour',
  },
  {
    value: ReportViewType.week,
    display: 'Theo tuần',
    subDisplay: 'Tuần',
    key: 'day',
  },
  {
    value: ReportViewType.year,
    display: 'Theo năm',
    subDisplay: 'Năm',
    key: 'month',
  },
];

const ReportViewTypeFullCf: Array<IReportViewType> = [
  {
    value: ReportViewType.day,
    display: 'Theo ngày',
    subDisplay: 'Ngày',
    key: 'hour',
  },
  {
    value: ReportViewType.week,
    display: 'Theo tuần',
    subDisplay: 'Tuần',
    key: 'day',
  },
  {
    value: ReportViewType.month,
    display: 'Theo tháng',
    subDisplay: 'Tháng',
    key: 'month',
  },
  {
    value: ReportViewType.year,
    display: 'Theo năm',
    subDisplay: 'Năm',
    key: 'month',
  },
];

const ReportKeyDriverCf: Array<IReportRetailKeyDriver> = [
  {id: 1, title: 'GTTB/khách'},
  {id: 2, title: 'Số đơn'},
];

const SalaryPositionIdsCf: Array<ISalaryPosition> = [
  {positionId: EnumReportExpectedSalary.assignee, rate: 3},
  {positionId: EnumReportExpectedSalary.staff, rate: 0.5},
  {positionId: EnumReportExpectedSalary.leadShop, rate: 0.8},
  {positionId: EnumReportExpectedSalary.probationaryLeadShop, rate: 0.6},
];

interface ReportBestSaleItemViewCf {
  key: string;
  column: string;
  type: 'currency' | 'number';
}

interface ISubActiveTab {
  tab: number;
  configs: Array<ReportBestSaleItemViewCf>;
}

const SubItemActiveTabConfig: Array<ISubActiveTab> = [
  {
    tab: EReportTabButton.revenue,
    configs: [
      {key: 'Số đơn', column: 'orderCount', type: 'number'},
      {key: 'Tổng bán', column: 'grossSales', type: 'currency'},
      {key: 'Tổng trả', column: 'returns', type: 'currency'},
    ],
  },
  {
    tab: EReportTabButton.customer,
    configs: [
      {key: 'Doanh thu', column: 'totalSales', type: 'currency'},
      {key: 'GTTB/ khách', column: 'averageCustomerSpent', type: 'currency'},
      {key: 'Số đơn', column: 'orderCount', type: 'number'},
    ],
  },
  {
    tab: EReportTabButton.average,
    configs: [
      {key: 'Doanh thu', column: 'totalSales', type: 'currency'},
      {key: 'Số đơn', column: 'orderCount', type: 'number'},
      {key: 'Số khách', column: 'customers', type: 'number'},
    ],
  },
];

export {
  ReportTopSellItemConfig,
  ReportRetailItemConfig,
  ReportRetailMenuConfig,
  ReportTabButtonCf,
  ReportViewTypeCf,
  ReportViewTypeFullCf,
  ReportKeyDriverCf,
  ReportChartDetailCf,
  SalaryPositionIdsCf,
  SubItemActiveTabConfig,
  EnumReportSaleType,
  EReportTabButton,
  ReportViewType,
  EnumReportExpectedSalary,
};
