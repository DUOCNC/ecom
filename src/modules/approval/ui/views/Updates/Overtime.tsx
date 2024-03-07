import {DimentionUtils, Typography} from 'common-ui';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RequestProps} from './type';
import {useReasonData, useTimekeepingLocation} from 'modules/approval/hooks';
import {style} from './style';
import CustomerLabel from './CustomerLabel';
import {LeaveReason} from 'modules/approval/models/response/reasons';
import SelectApplicationView from '../SelectApplicationView';
import {RequestDetail, RequestDetailItem} from './RequestDetail';
import {colors} from 'assets/v2';
import ApplicationDatePicker from '../ApplicationDate';
import moment from 'moment';

const Overtime: React.FC<RequestProps> = ({
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
  const {optionsTimekeepingLocation} = useTimekeepingLocation();

  return (
    <View style={styleOvertime.container}>
      <View style={[style.row, style.rowTime]}>
        <View style={style.label}>
          <CustomerLabel text="Thời gian" require />
        </View>
      </View>
      <RequestDetail
        onAddDetailItem={onAddDetailItem}
        detail={detail}
        onRemoveDetailItem={onRemoveDetailItem}>
        {detail.map((detailItem, i) => (
          <RequestDetailItem key={detailItem.key}>
            <View style={style.box}>
              <View style={styleOvertime.item1}>
                <Typography
                  style={styleOvertime.label}
                  text="Ngày"
                  color={colors.secondary.o500}
                />
                <View style={styleOvertime.col1}>
                  <Controller
                    name="date"
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <ApplicationDatePicker
                        type="date"
                        value={
                          detailItem.date
                            ? new Date(detailItem.date)
                            : new Date()
                        }
                        onValueChange={v => {
                          onChange(v);
                          onSetDetailItem(detailItem.key, 'date', moment(v));
                        }}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styleOvertime.item2}>
                <Typography
                  style={styleOvertime.label}
                  text="Từ"
                  color={colors.secondary.o500}
                />
                <View style={styleOvertime.col1}>
                  <Controller
                    name="start_time"
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <ApplicationDatePicker
                        type="time"
                        value={
                          detailItem.date
                            ? new Date(detailItem.start_time)
                            : new Date()
                        }
                        onValueChange={v => {
                          onChange(v);
                          onSetDetailItem(
                            detailItem.key,
                            'start_time',
                            moment(v),
                          );
                        }}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styleOvertime.item2}>
                <Typography
                  style={styleOvertime.label}
                  text="Đến"
                  color={colors.secondary.o500}
                />
                <View style={styleOvertime.col1}>
                  <Controller
                    name="end_time"
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <ApplicationDatePicker
                        type="time"
                        value={
                          detailItem.date
                            ? new Date(detailItem.end_time)
                            : new Date()
                        }
                        onValueChange={v => {
                          onChange(v);
                          onSetDetailItem(
                            detailItem.key,
                            'end_time',
                            moment(v),
                          );
                        }}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styleOvertime.row}>
                <View style={styleOvertime.label}>
                  <CustomerLabel text="Nơi chấm công" />
                </View>
                <View style={style.value}>
                  <Controller
                    name="gps_location_ids"
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <SelectApplicationView
                        title="Chọn địa điểm chấm công"
                        value={detailItem.gps_location_ids}
                        dataSource={optionsTimekeepingLocation}
                        onChangeValue={v => {
                          onChange(v);
                          onSetDetailItem(
                            detailItem.key,
                            'gps_location_ids',
                            v,
                          );
                        }}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styleOvertime.row}>
                <View style={styleOvertime.label}>
                  <CustomerLabel text="Chốt" />
                </View>
                <View>
                  <Typography text="Có" />
                </View>
              </View>
            </View>
          </RequestDetailItem>
        ))}
      </RequestDetail>
    </View>
  );
};

const styleOvertime = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    paddingTop: DimentionUtils.scale(8),
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
export default Overtime;
