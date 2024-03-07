import {IReportRetailQuery} from 'model/query/ReportRetailQuery';
import React, {FC, useEffect, useState} from 'react';
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
import {useAuth} from 'providers/contexts/AuthContext';
import {
  ReportViewType,
  ReportViewTypeCf,
} from 'modules/analytic/config/ReportConfig';

const ReportRetailFilter: FC<IReportRetailQuery> = (
  props: IReportRetailQuery,
) => {
  const {onPress, pViewType, pDate, departmentLv2, departmentLv3, loading} =
    props;
  const [date, setDate] = useState<Date>(pDate ? new Date(pDate) : new Date());
  const [type, setType] = useState<string>(pViewType ?? ReportViewType.day);
  const {locationSelected} = useAuth();

  useEffect(() => {
    let q: ReportQuery = {};
    const viewDate = _.cloneDeep(date);
    q.pos_location_name = undefined;
    if (locationSelected.locationId !== -1) {
      q.pos_location_name = locationSelected.locationName;
    }
    if (departmentLv2) {
      q.pos_location_department_lv2 = departmentLv2;
    }
    if (departmentLv3) {
      q.pos_location_department_lv3 = departmentLv3;
    }
    q.view_date = moment(date).format(FormatDatePattern['YYYY-MM-DD']);
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
  }, [
    type,
    date,
    onPress,
    locationSelected.locationId,
    locationSelected.locationName,
    departmentLv2,
    departmentLv3,
  ]);

  if (loading) {
    return <View />;
  }
  return (
    <View style={ReportRetailFilterStyle.container}>
      <View style={ReportRetailFilterStyle.date}>
        <CTDatePicker
          type="date"
          value={date}
          onValueChange={d => setDate(d)}
        />
      </View>
      <CSelectType
        title="Thống kê theo"
        value={type}
        dataSource={ReportViewTypeCf}
        onChangeValue={setType}
      />
    </View>
  );
};

export default ReportRetailFilter;
