import {ReportTabButton} from '../enums';
import ReportTabEntity from '../models/entities/ReportTabEntity';

const RevenueTabConfig: Array<ReportTabEntity> = [
  new ReportTabEntity(ReportTabButton.revenue, 'Doanh thu', 'total_sales'),
  new ReportTabEntity(ReportTabButton.customer, 'Số khách mua', 'customer'),
  new ReportTabEntity(ReportTabButton.average, 'AOV', 'average_order_value'),
  new ReportTabEntity(ReportTabButton.crv, 'CRV', 'crv'),
];

export default RevenueTabConfig;
