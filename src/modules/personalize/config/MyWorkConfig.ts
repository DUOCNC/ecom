import {
  action_report_retail,
  ic_action_location,
  ic_application_form,
  ic_customer_360,
  ic_customer_convert,
  ic_manage_slot,
  ic_pos_create,
  ic_salary_expected,
  ic_task_management,
  ic_training,
  ic_yody_news,
  ic_transfer_action,
  product_positioning,
} from 'assets/images';
import {MainRouteConfig} from 'config/RouteConfig';
import {MyWorkEntity} from '../models';
import {MyWorkConfigType} from 'modules/personalize/enums/MyWorkConfigType';

const MyWorkConfig: Array<MyWorkEntity> = [
  new MyWorkEntity(
    'location',
    ic_action_location,
    'Chấm công định vị',
    false,
    1,
    MainRouteConfig.TimeSheet,
    false,
    MyWorkConfigType.General,
    true,
  ),
  new MyWorkEntity(
    'task_management',
    ic_task_management,
    'Quản lý công việc',
    false,
    3,
    MainRouteConfig.TaskManagement,
    false,
    MyWorkConfigType.General,
  ),
  new MyWorkEntity(
    'approval',
    ic_application_form,
    'Đơn từ',
    false,
    3.1,
    MainRouteConfig.Approval,
    false,
    MyWorkConfigType.General,
    true,
  ),
  new MyWorkEntity(
    'expected_salary',
    ic_salary_expected,
    'Lương dự kiến',
    false,
    4,
    MainRouteConfig.ExpectedSalary,
    false,
    MyWorkConfigType.General,
  ),
  new MyWorkEntity(
    'pos_create',
    ic_pos_create,
    'Tạo đơn YOSCAN',
    false,
    5,
    MainRouteConfig.PosCreate,
    true,
    MyWorkConfigType.Retail,
  ),
  new MyWorkEntity(
    'report_retail',
    action_report_retail,
    'Báo cáo bán lẻ',
    false,
    6,
    MainRouteConfig.ReportRetail,
    false,
    MyWorkConfigType.Retail,
  ),
  new MyWorkEntity(
    'feedback_user',
    ic_manage_slot,
    'Quản lý lốt khách',
    false,
    7,
    MainRouteConfig.FeedbackRecord,
    true,
    MyWorkConfigType.Retail,
  ),
  new MyWorkEntity(
    'report_conversion',
    ic_customer_convert,
    'Báo cáo chuyển đổi',
    false,
    8,
    MainRouteConfig.ReportConversion,
    false,
    MyWorkConfigType.Retail,
  ),

  new MyWorkEntity(
    'product_positioning',
    product_positioning,
    'Chuyển vị trí sản phẩm',
    false,
    9,
    MainRouteConfig.ProductPositioning,
    false,
    MyWorkConfigType.Retail,
  ),
  new MyWorkEntity(
    'hrm_training',
    ic_training,
    'Đào tạo',
    false,
    10,
    MainRouteConfig.Training,
    false,
    MyWorkConfigType.Retail,
  ),
  new MyWorkEntity(
    'customer_portrait',
    ic_customer_360,
    'Khách hàng 360',
    false,
    12,
    MainRouteConfig.SearchCustomer,
    false,
    MyWorkConfigType.Retail,
  ),
  new MyWorkEntity(
    'yody_news',
    ic_yody_news,
    'YODY News',
    false,
    13,
    MainRouteConfig.News,
    false,
    MyWorkConfigType.General,
  ),
  new MyWorkEntity(
    'transfer',
    ic_transfer_action,
    'Phiếu chuyển hàng',
    false,
    13,
    MainRouteConfig.Transfer,
    true,
    MyWorkConfigType.Retail,
  ),
];

export default MyWorkConfig;
