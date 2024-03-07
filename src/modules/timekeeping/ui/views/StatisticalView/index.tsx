import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Typography} from 'common-ui';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from 'assets/v2';
import {Moment} from 'moment';
import moment from 'moment';
import {Calendar, DateData} from 'react-native-calendars';
import {DayProps} from 'react-native-calendars/src/calendar/day';
import {dayStyle, timeSheetStyle} from './style';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import {WorkDayStatus} from 'modules/timekeeping/enums';
import {
  TimeSheetEntity,
  WorkdayDateEntity,
} from 'modules/timekeeping/models/entities';
import {DateFormatPattern} from 'common/enums';
import {timekeepingService} from 'modules/timekeeping/services';
import {FormatDatePattern} from 'utils/DateUtils';

export type TimeSheetViewRef = {};

const AttendanceDay: React.FC<
  React.PropsWithChildren<
    DayProps & {
      date?: DateData | undefined;
    }
  >
> = ({date, marking}) => {
  if (
    !date ||
    !marking ||
    !marking.customContainerStyle ||
    !marking.workdayDateEntity
  ) {
    return (
      <View
        style={[
          dayStyle.day,
          dayStyle.dayEmpty,
          moment(date?.dateString).day() === 0 && {borderRightWidth: 1},
        ]}
      />
    );
  }

  let markingStyle = StyleSheet.flatten(marking.customContainerStyle);
  markingStyle = {
    ...dayStyle.day,
    borderTopColor: markingStyle.borderColor,
    borderTopWidth: markingStyle.borderTopWidth,
    borderRightWidth: markingStyle.borderRightWidth,
  };
  if (marking.accessibilityLabel === WorkDayStatus.TODAY) {
    return (
      <View style={[markingStyle, dayStyle.today]}>
        <Typography text={date.day} />
        <View style={[dayStyle.actualWork, dayStyle.todayActualWork]}>
          <Typography
            text={marking.workdayDateEntity.getCalWorkHour()}
            color={colors.base.white}
          />
        </View>
      </View>
    );
  }
  if (marking.accessibilityLabel === WorkDayStatus.COMPLETE) {
    return (
      <View style={[markingStyle]}>
        <Typography text={date.day} />
        <View style={[dayStyle.actualWork, dayStyle.completeActualWork]}>
          <Typography
            text={marking.workdayDateEntity.getCalWorkHour()}
            color={colors.success.o500}
          />
        </View>
      </View>
    );
  }
  if (marking.accessibilityLabel === WorkDayStatus.LEAVE) {
    return (
      <View style={[markingStyle]}>
        <Typography text={date.day} />
        <View style={[dayStyle.actualWork, dayStyle.leaveActualWork]}>
          <Typography
            text={marking.workdayDateEntity.getCalWorkHour()}
            color={colors.error.o500}
          />
        </View>
      </View>
    );
  }
  if (marking.accessibilityLabel === WorkDayStatus.NOT_ENOUGH_WORKING_HOURS) {
    return (
      <View style={[markingStyle]}>
        <Typography text={date.day} />
        <View style={[dayStyle.actualWork, dayStyle.notEnoughActualWork]}>
          <Typography
            text={marking.workdayDateEntity.getCalWorkHour()}
            color={colors.warning.o500}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={markingStyle}>
      <Typography text={date.day} />
      <View style={[dayStyle.actualWork]}>
        <Typography
          text={marking.workdayDateEntity.getCalWorkHour()}
          color={colors.secondary.o400}
        />
      </View>
    </View>
  );
};

interface TimeSheetProps {
  onChangeMonth: (viewDate: Moment) => void;
  viewDate: Moment;
  timeSheet: TimeSheetEntity;
}

// Tính toán ngày tháng cho 6 tháng gần nhất
const months: Array<Moment> = [];
for (let i = 0; i < 6; i++) {
  const month = moment().subtract(i, 'months');
  months.unshift(month);
}

export type TimeSheetComponent = ForwardRefRenderFunction<
  TimeSheetViewRef,
  TimeSheetProps
>;

const StatisticalView: TimeSheetComponent = (
  {onChangeMonth, viewDate, timeSheet},
  ref,
) => {
  const [currentDate, setCurrentDate] = useState<Moment>(viewDate);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const calendarRef = useRef(null);
  const minDate = months[0]; // Tháng hiện tại là tháng đầu tiên
  const maxDate = months[months.length - 1]; // Tháng hiện tại là tháng cuối cùng
  useImperativeHandle(ref, () => ({}));
  // Tính toán các thông tin liên quan đến chấm công
  const startDate = moment(viewDate).startOf('month');
  const numDays = moment(viewDate).daysInMonth();
  const days = [];
  // Tạo mảng các ngày trong tháng
  for (let i = 0; i < numDays; i++) {
    const date = moment(startDate).add(i, 'days');
    days.push(date);
  }

  // Đánh dấu các ngày có đủ 8 giờ làm việc
  const markedDates: any = {};

  days.forEach(date => {
    const workdayDateEntity = timekeepingService.getWorkdayDateEntityByDate(
      date.format(DateFormatPattern.YYYYMMDD),
      timeSheet.dates,
    );
    let borderRightWidth = 0;
    if (date.day() === 0) {
      borderRightWidth = 1;
    }
    markedDates[date.format('YYYY-MM-DD')] = {
      customContainerStyle: {
        borderColor: workdayDateEntity.getBorderCoder(),
        borderTopWidth: 2,
        borderRightWidth: borderRightWidth,
      },
      accessibilityLabel: workdayDateEntity.getWorkStatus(),
      selected: true,
      workdayDateEntity: workdayDateEntity,
    };
  });
  const handleMonthChange = (dateObject: DateData) => {
    let selectedDate = moment(dateObject.dateString); // Tạo đối tượng Date từ year và month được truyền vào
    // Kiểm tra xem tháng hiện tại có nằm trong khoảng được cho phép hay không
    if (selectedDate.isBefore(minDate)) {
      selectedDate = minDate;
      setCurrentDate(selectedDate);
    } else if (selectedDate.isAfter(maxDate)) {
      selectedDate = maxDate;
      setCurrentDate(selectedDate);
    }

    onChangeMonth(selectedDate);
  };
  const handleDayPress = (date?: DateData, wd?: WorkdayDateEntity) => {
    if (!date || !wd) {
      return;
    }
    wd.setDate(date.dateString);
    navigation.navigate(MainRouteConfig.TimeSheetDetail, {
      workdayDateEntity: wd,
    });
  };

  const CustomHeader = () => {
    return (
      <View style={timeSheetStyle.headerTitle}>
        <View style={timeSheetStyle.headerLeft}>
          <View style={timeSheetStyle.headerText}>
            <Typography text="T2" />
          </View>
          <View style={timeSheetStyle.headerText}>
            <Typography text="T3" />
          </View>
          <View style={timeSheetStyle.headerText}>
            <Typography text="T4" />
          </View>
        </View>
        <View style={timeSheetStyle.headerRight}>
          <View style={timeSheetStyle.headerText}>
            <Typography text="T5" />
          </View>
          <View style={timeSheetStyle.headerText}>
            <Typography text="T6" />
          </View>
          <View style={timeSheetStyle.headerText}>
            <Typography text="T7" />
          </View>
          <View style={timeSheetStyle.headerText}>
            <Typography text="CN" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <Calendar
      enableSwipeMonths
      ref={calendarRef}
      current={currentDate.format(FormatDatePattern['YYYY/MM/DD'])}
      hideArrows
      customHeaderTitle={<CustomHeader />}
      hideDayNames
      firstDay={1}
      markedDates={markedDates}
      markingType={'custom'}
      dayComponent={props => (
        <TouchableOpacity
          onPress={() => {
            handleDayPress(props.date, props.marking?.workdayDateEntity);
          }}>
          <AttendanceDay date={props.date} marking={props.marking} />
        </TouchableOpacity>
      )}
      onMonthChange={handleMonthChange}
      disableMonthChange={minDate.month === maxDate.month}
    />
  );
};

export default forwardRef(StatisticalView);
