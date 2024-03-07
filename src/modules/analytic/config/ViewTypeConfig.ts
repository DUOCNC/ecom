import {ReportViewType} from '../enums';
import ViewTypeEntity from '../models/entities/ViewTypeEntity';

const ViewTypeConfig: Array<ViewTypeEntity> = [
  new ViewTypeEntity(ReportViewType.day, 'Theo ngày', 'ngày', 'hour'),
  new ViewTypeEntity(ReportViewType.week, 'Theo tuần', 'tuần', 'day'),
  new ViewTypeEntity(ReportViewType.month, 'Theo tháng', 'tháng', 'day'),
  new ViewTypeEntity(ReportViewType.year, 'Theo năm', 'năm', 'month'),
];

export default ViewTypeConfig;
