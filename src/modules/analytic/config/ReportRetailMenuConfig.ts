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
import {EnumReportSaleType} from 'ui/screens/MainStack/Report/ReportConfig';
import {
  ReportRetailDetailItemEntity,
  ReportRetailMenuEntity,
} from '../models/entities';

const ReportRetailMenuConfig: Array<ReportRetailMenuEntity> = [
  new ReportRetailMenuEntity(
    0,
    'Báo cáo theo nhân viên',
    MainRouteConfig.ReportTopSale,
    ic_rp_account,
    true,
  ),
  new ReportRetailMenuEntity(
    1,
    'Báo cáo thi đua',
    MainRouteConfig.ReportEmulationRSM,
    ic_rp_emulation,
    true,
  ),
  new ReportRetailMenuEntity(2, 'Báo cáo theo sản phẩm', '', ic_rp_variant),
  new ReportRetailMenuEntity(3, 'Báo cáo theo khách hàng', '', ic_rp_customer),
  new ReportRetailMenuEntity(
    4,
    'Báo cáo chỉ số điều hành',
    '',
    ic_rp_keydriver,
  ),
];

const ReportTopSellItemConfig: Array<ReportRetailDetailItemEntity> = [
  new ReportRetailDetailItemEntity(
    ic_sale_agent,
    1,
    'Báo cáo theo chuyên gia tư vấn',
    'Thống kê dữ liệu tệp cửa hàng',
    MainRouteConfig.ReportTopSale,
    EnumReportSaleType.assignee,
  ),
  new ReportRetailDetailItemEntity(
    ic_cashier,
    2,
    'Báo cáo theo thu ngân',
    'Thống kê dữ liệu tệp cửa hàng',
    MainRouteConfig.ReportTopSale,
    EnumReportSaleType.cashier,
  ),
];

export {ReportRetailMenuConfig, ReportTopSellItemConfig};
