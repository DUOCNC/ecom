import {DimentionUtils, Typography} from 'common-ui';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RequestProps} from './type';
import {useReasonData} from 'modules/approval/hooks';
import {style} from './style';
import CustomerLabel from './CustomerLabel';
import {AbsenceReason} from 'modules/approval/models/response/reasons';
import SelectApplicationView from '../SelectApplicationView';
import {RequestDetail, RequestDetailItem} from './RequestDetail';
import {colors} from 'assets/v2';
import ApplicationDatePicker from '../ApplicationDate';
import moment from 'moment';

const Absence: React.FC<RequestProps> = ({
  isEditting,
  hrmData,
  requestType,
  dateFormat,
  disabledDate,
  detail,
  onSetDetailItem,
  onRemoveDetailItem,
  onAddDetailItem,
  Controller,
  control,
}) => {
  const {reasons} = useReasonData<AbsenceReason>(requestType);

  // @TODO: Hardcoded checking manual leave

  const optionsReason = reasons.map(r => {
    return {
      value: r.title,
      label: r.title,
    };
  });

  return (
    <View style={styleAbsence.container}>
      <View style={[style.row, style.rowTime]}>
        <View style={style.label}>
          <CustomerLabel text="Thời gian" require />
        </View>
      </View>
      <RequestDetail
        onAddDetailItem={onAddDetailItem}
        detail={detail}
        onRemoveDetailItem={onRemoveDetailItem}>
        {detail.map((detailItem, i) => {
          const selectedReason = reasons.find(
            r => r.title === detailItem.reason,
          );
          return (
            <RequestDetailItem key={detailItem.key}>
              <View style={style.box}>
                <View style={styleAbsence.item1}>
                  <Typography
                    style={styleAbsence.label}
                    text="Ngày"
                    color={colors.secondary.o500}
                  />
                  <View style={styleAbsence.col1}>
                    <Controller
                      name="date_start"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <ApplicationDatePicker
                          type="date"
                          value={
                            detailItem.date
                              ? new Date(detailItem.date_start)
                              : new Date()
                          }
                          onValueChange={v => {
                            onChange(v);
                            onSetDetailItem(
                              detailItem.key,
                              'date_start',
                              moment(v),
                            );
                          }}
                        />
                      )}
                    />
                  </View>
                </View>
                <View style={styleAbsence.item2}>
                  <Typography
                    style={styleAbsence.label}
                    text="Từ"
                    color={colors.secondary.o500}
                  />
                  <View style={styleAbsence.col1}>
                    <Controller
                      name="time_start"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <ApplicationDatePicker
                          type="time"
                          value={
                            detailItem.date
                              ? new Date(detailItem.time_start)
                              : new Date()
                          }
                          onValueChange={v => {
                            onChange(v);
                            onSetDetailItem(
                              detailItem.key,
                              'time_start',
                              moment(v),
                            );
                          }}
                        />
                      )}
                    />
                  </View>
                </View>
                <View style={styleAbsence.item2}>
                  <Typography
                    style={styleAbsence.label}
                    text="Đến"
                    color={colors.secondary.o500}
                  />
                  <View style={styleAbsence.col1}>
                    <Controller
                      name="time_end"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <ApplicationDatePicker
                          type="time"
                          value={
                            detailItem.date
                              ? new Date(detailItem.time_end)
                              : new Date()
                          }
                          onValueChange={v => {
                            onChange(v);
                            onSetDetailItem(
                              detailItem.key,
                              'time_end',
                              moment(v),
                            );
                          }}
                        />
                      )}
                    />
                  </View>
                </View>
                <View style={styleAbsence.item2}>
                  <View style={style.label}>
                    <CustomerLabel text="Lý do" />
                  </View>
                  <View style={style.value}>
                    <Controller
                      name="reason"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <SelectApplicationView
                          title="Chọn lý do"
                          value={detailItem.reason}
                          dataSource={optionsReason}
                          onChangeValue={v => {
                            onChange(v);
                            onSetDetailItem(detailItem.key, 'reason', v);
                          }}
                        />
                      )}
                    />
                  </View>
                </View>
                <View style={[style.row]}>
                  <Typography
                    style={style.label}
                    text="Tính công"
                    color={colors.secondary.o500}
                  />
                  <Typography
                    text={
                      selectedReason?.hasAttendance === '1'
                        ? 'Có'
                        : selectedReason
                        ? 'Không'
                        : '-'
                    }
                  />
                </View>
                <View style={styleAbsence.row}>
                  <Typography
                    style={style.label}
                    text="Yc chốt"
                    color={colors.secondary.o500}
                  />
                  <Typography
                    text={
                      selectedReason?.hasAttendance === '1'
                        ? 'Có'
                        : selectedReason
                        ? 'Không'
                        : '-'
                    }
                  />
                </View>
              </View>
            </RequestDetailItem>
          );
        })}
      </RequestDetail>
    </View>
  );
};

const styleAbsence = StyleSheet.create({
  container: {flex: 1},
  row: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(20),
    alignItems: 'center',
  },
  text: {},
  item1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DimentionUtils.scale(10),
    justifyContent: 'space-between',
  },
  col1: {flex: 1, maxWidth: DimentionUtils.scale(116)},
  col2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  label: {
    width: DimentionUtils.scale(124),
  },
});
export default Absence;
