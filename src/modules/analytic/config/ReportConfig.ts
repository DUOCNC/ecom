enum ReportViewType {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
}
export enum CRVViewType {
  customer = 'cr_traffic_assignee',
  lot = 'cr_slot_created',
}

interface IReportViewType {
  value: string;
  display: string;
  subDisplay: string;
  key: string;
}

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
    value: ReportViewType.month,
    display: 'Theo tháng',
    subDisplay: 'Tháng',
    key: 'month',
  },
];

export {ReportViewTypeCf, ReportViewType};
