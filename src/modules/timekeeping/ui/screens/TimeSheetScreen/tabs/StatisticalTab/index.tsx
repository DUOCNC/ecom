import React, {createRef, useEffect, useState} from 'react';
import {ErrorType, Layout, Typography} from 'common-ui';
import {Animated, Image, View, RefreshControl} from 'react-native';
import {style, styleTimeItem} from './style';
import {ic_actual_work, ic_actual_work_hour} from 'assets/images';
import {colors} from 'assets/v2';
import moment, {Moment} from 'moment';
import {StringUtils} from 'common';
import {
  MonthSelectorRef,
  MonthSelectorView,
  TimeSheetViewRef,
  TimeSheetView,
} from '../../../../views';
import {timekeepingService} from 'modules/timekeeping/services';
import {TimeSheetEntity} from 'modules/timekeeping/models/entities';
import StatisticalView from 'modules/timekeeping/ui/views/StatisticalView';
interface TimeWorkProps {
  title: string;
  value: string | number;
}

const TimeWorkItem: React.FC<TimeWorkProps> = ({title, value}) => {
  return (
    <View style={styleTimeItem.item}>
      <Typography text={title} />
      <Typography text={value} textType="medium" type="h3" />
    </View>
  );
};

const TimeSheetTab: React.FC = ({}) => {
  const {ScrollView} = Animated;
  const [monthActive, setMonthActive] = useState<Moment>(moment());
  const [loading, setLoading] = useState<boolean>(false);
  const timeSheetViewRef = createRef<TimeSheetViewRef>();
  const monthSelectorRef = createRef<MonthSelectorRef>();
  const [error, setError] = useState<ErrorType | false>(false);
  const [msgError, setMsgError] = useState<string | undefined>(undefined);
  const [timeSheet, setTimeSheet] = useState<TimeSheetEntity>(
    TimeSheetEntity.createEmpty(),
  );
  const [isRefreshing, setRefreshing] = useState(false);

  const onSuccess = (ts: TimeSheetEntity) => {
    setError(false);
    setTimeSheet(ts);
  };
  const onError = () => {
    setError('NotfoundReport');
    setMsgError('');
  };

  useEffect(() => {
    timekeepingService.getTimeSheet(
      monthActive,
      onSuccess,
      onError,
      () => {
        setError(false);
        setLoading(true);
      },
      () => {
        setLoading(false);
      },
    );
  }, [monthActive]);

  const handleMonthChange = (date: Moment) => {
    setLoading(true);
    setError('NotfoundReport');
    setMonthActive(date);
  };

  const onRefresh = () => {
    timekeepingService.getTimeSheet(
      monthActive,
      onSuccess,
      onError,
      () => {
        setRefreshing(true);
      },
      () => {
        setLoading(false);
        setRefreshing(false);
      },
    );
  };

  return (
    <Layout.Screen barStyle="dark-content">
      <Layout.SafeAreaContainer edges={['bottom', 'left', 'right']}>
        <Layout.Error subTitle={msgError} error={error}>
          <Layout.Loading loading={loading}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
              showsVerticalScrollIndicator={false}
              style={style.container}>
              <View style={style.viewMonth}>
                <MonthSelectorView
                  viewDate={monthActive}
                  ref={monthSelectorRef}
                  onChangeMonth={handleMonthChange}
                />
              </View>
              <View style={style.tableSheet}>
                <Typography
                  text={StringUtils.format(
                    'BẢNG CÔNG THÁNG {0}/{1}',
                    monthActive.get('month') + 1,
                    monthActive.get('year'),
                  )}
                  type="h3"
                  textType="medium"
                  style={style.title}
                />

                <StatisticalView
                  timeSheet={timeSheet}
                  ref={timeSheetViewRef}
                  viewDate={monthActive}
                  onChangeMonth={handleMonthChange}
                />
              </View>
              <Typography
                text={StringUtils.format(
                  'THỐNG KÊ THÁNG {0}/{1}',
                  monthActive.get('month') + 1,
                  monthActive.get('year'),
                )}
                type="h3"
                textType="medium"
                style={style.title}
              />
              <View style={style.error}>
                <View style={style.box}>
                  <View style={style.boxSquare}>
                    <Image source={ic_actual_work} style={style.boxIcon} />
                    <Typography text="Công thực tế" />
                    <View style={style.boxValue}>
                      <Typography
                        text={StringUtils.format(
                          '{0}/',
                          timeSheet.getCalWorkday(),
                        )}
                        textType="medium"
                      />
                      <Typography
                        text={timeSheet.getNumberWorkday()}
                        textType="medium"
                        color={colors.secondary.o500}
                      />
                    </View>
                  </View>
                  <View style={style.boxSquare}>
                    <Image source={ic_actual_work_hour} style={style.boxIcon} />
                    <Typography text="Giờ làm thực tế" />
                    <View style={style.boxValue}>
                      <Typography
                        text={StringUtils.format(
                          '{0}',
                          timeSheet.getCalWorkHour(),
                        )}
                        textType="medium"
                      />
                    </View>
                  </View>
                </View>
                <View style={style.timeWorkDetail}>
                  <Typography
                    text="Công làm việc"
                    textType="medium"
                    type="h3"
                  />
                  <TimeWorkItem
                    title="Công làm việc"
                    value={timeSheet.getCalWorkday()}
                  />
                  <TimeWorkItem
                    title="Giờ làm việc thực tính"
                    value={timeSheet.getCalWorkHour()}
                  />
                  <TimeWorkItem
                    title="Số công chuẩn"
                    value={timeSheet.getNumberWorkday()}
                  />
                  <TimeWorkItem
                    title="Số lần đi muộn"
                    value={timeSheet.getLate()}
                  />
                  <TimeWorkItem
                    title="Số lần về sớm"
                    value={timeSheet.getSoon()}
                  />
                  <TimeWorkItem
                    title="Số phút đi muộn"
                    value={timeSheet.getLateMinute()}
                  />
                  <TimeWorkItem
                    title="Số phút về sớm"
                    value={timeSheet.getSoonMinute()}
                  />
                  <TimeWorkItem
                    title="Số công nghỉ không lý do"
                    value={timeSheet.getLeaveNoReason()}
                  />
                  <TimeWorkItem
                    title="Số lần quên check in/out"
                    value={timeSheet.getNoCheckInOut()}
                  />
                  <TimeWorkItem
                    title="Giờ làm việc thực tính ban đêm"
                    value={timeSheet.getCalWorkHourNight()}
                  />
                  <TimeWorkItem
                    title="Giờ làm việc thực tính ban ngày"
                    value={timeSheet.getCalWorkHourLight()}
                  />
                  <TimeWorkItem
                    title="Công làm thêm"
                    value={timeSheet.getWorkdayOvertime()}
                  />
                  <TimeWorkItem
                    title="Giờ làm thêm"
                    value={timeSheet.getWorkHourOvertime()}
                  />
                  <TimeWorkItem
                    title="Công ăn làm thêm"
                    value={timeSheet.getCalMealDayOvertime()}
                  />
                  <TimeWorkItem
                    title="Công ăn theo ca"
                    value={timeSheet.getCalMealDayShift()}
                  />
                  <TimeWorkItem
                    title="Công ăn"
                    value={timeSheet.getCalMealDay()}
                  />
                  <TimeWorkItem
                    title="Tiền phạt đi muộn"
                    value={timeSheet.getCalFineLate()}
                  />
                  <TimeWorkItem
                    title="Tiền phạt về sớm"
                    value={timeSheet.getCalFineSoon()}
                  />
                  <TimeWorkItem
                    title="Tiền phạt nghỉ không lý do"
                    value={timeSheet.getCalFineLeaveNoReason()}
                  />
                  <TimeWorkItem
                    title="Tiền phạt quên check in/out"
                    value={timeSheet.getCalFineNoCheckInOut()}
                  />
                  <TimeWorkItem
                    title="Tiền phạt chấm công"
                    value={timeSheet.getCalFine()}
                  />
                  <TimeWorkItem
                    title="Công phạt đi muộn"
                    value={timeSheet.getCalWorkdayLate()}
                  />
                  <TimeWorkItem
                    title="Công phạt về sớm"
                    value={timeSheet.getCalWorkdaySoon()}
                  />
                  <TimeWorkItem
                    title="Công phạt nghỉ không lý do"
                    value={timeSheet.getCalWorkdayLeaveNoReason()}
                  />
                  <TimeWorkItem
                    title="Công phạt quên check in/out"
                    value={timeSheet.getCalWorkdayNoCheckInOut()}
                  />
                </View>
              </View>
            </ScrollView>
          </Layout.Loading>
        </Layout.Error>
      </Layout.SafeAreaContainer>
    </Layout.Screen>
  );
};

export default TimeSheetTab;
