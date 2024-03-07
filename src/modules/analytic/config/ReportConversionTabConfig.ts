import {ReportConversionTab} from '../enums/ReportConfig';
import ReportConversionTabEntity from '../models/entities/ReportConversionTabEntity';

const ReportConversionTabConfig: Array<ReportConversionTabEntity> = [
  new ReportConversionTabEntity(ReportConversionTab.customer, 'Theo khách'),
  new ReportConversionTabEntity(ReportConversionTab.feedback, 'Theo lốt'),
];

export default ReportConversionTabConfig;
