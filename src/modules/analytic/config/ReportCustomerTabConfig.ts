import {ReportCustomerTab} from '../enums/ReportConfig';
import {ReportCustomerTabEntity} from '../models/entities';

const ReportCustomerTabConfig: Array<ReportCustomerTabEntity> = [
  new ReportCustomerTabEntity(ReportCustomerTab.receptionist, 'Theo khách vào'),
  new ReportCustomerTabEntity(ReportCustomerTab.assignee, 'Theo khách tiếp'),
];

export default ReportCustomerTabConfig;
