import {ReportTabButton} from '../enums';
import ReportChartDetailEntity from '../models/entities/ReportChartDetailEntity';

const ReportChartDetailConfig: Array<ReportChartDetailEntity> = [
  new ReportChartDetailEntity(ReportTabButton.revenue, 'Tổng doanh thu'),
  new ReportChartDetailEntity(ReportTabButton.customer, 'Tổng số khách mua'),
  new ReportChartDetailEntity(ReportTabButton.average, 'GTTB đơn'),
];

export default ReportChartDetailConfig;
