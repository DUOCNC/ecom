import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import {ReportRetailFilterStyle} from './style';
import _ from 'lodash';
import moment from 'moment';
import {
  FormatDatePattern,
  getDaysInYearByDate,
  getStartDateEndDatByDate,
  getStartEndDateByMonth,
} from 'utils/DateUtils';
import CSelectType from './CSelectType';
import {ReportQuery} from 'model/query/ReportQuery';
import CTDatePicker from 'components/CTDatePicker';
import {ViewTypeConfig} from 'modules/analytic/config';
import {ReportViewType} from 'modules/analytic/enums';
import {IReportRetailQuery} from 'modules/analytic/models/interface';

const ReportFilterView: FC<IReportRetailQuery> = (
  props: IReportRetailQuery,
) => {
  const {onPress, pViewType, pDate} = props;
  const viewType = pViewType ?? ReportViewType.day;
  const vDate = pDate ? new Date(pDate) : new Date();

  const handleChange = useCallback(
    (date: Date, type: string) => {
      let q: ReportQuery = {};
      const viewDate = _.cloneDeep(date);
      q.view_date = moment(date).format(FormatDatePattern['YYYY-MM-DD']);
      q.view_type = type;
      switch (type) {
        case ReportViewType.day:
          q.from_date = moment(date).format(FormatDatePattern['YYYY-MM-DD']);
          q.to_date = moment(date).format(FormatDatePattern['YYYY-MM-DD']);
          break;
        case ReportViewType.week:
          [q.from_date, q.to_date] = getStartDateEndDatByDate(viewDate);
          break;
        case ReportViewType.month:
          [q.from_date, q.to_date] = getStartEndDateByMonth(viewDate);
          break;
        case ReportViewType.year:
          [q.from_date, q.to_date] = getDaysInYearByDate(viewDate);
          break;
        default:
          break;
      }
      onPress(q, type);
    },
    [onPress],
  );

  return (
    <View style={ReportRetailFilterStyle.container}>
      <View style={ReportRetailFilterStyle.date}>
        <CTDatePicker
          type="date"
          value={vDate}
          onValueChange={value => {
            handleChange(value, viewType);
          }}
        />
      </View>
      <CSelectType
        title="Thống kê theo"
        value={pViewType}
        dataSource={ViewTypeConfig}
        onChangeValue={value => {
          handleChange(vDate, value);
        }}
      />
    </View>
  );
};

export default ReportFilterView;
