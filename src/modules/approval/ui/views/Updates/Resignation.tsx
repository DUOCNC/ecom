import {DimentionUtils, Typography} from 'common-ui';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RequestProps} from './type';
import {useReasonData} from 'modules/approval/hooks';
import {style} from './style';
import CustomerLabel from './CustomerLabel';
import {LeaveReason} from 'modules/approval/models/response/reasons';
import SelectApplicationView from '../SelectApplicationView';
import {RequestDetail, RequestDetailItem} from './RequestDetail';
import {colors} from 'assets/v2';
import ApplicationDatePicker from '../ApplicationDate';
import moment from 'moment';

const Resignation: React.FC<RequestProps> = ({
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
  const [reason, setReason] = useState<string>('');
  const {reasons} = useReasonData<LeaveReason>(requestType);

  // @TODO: Hardcoded checking manual leave

  const optionsReason = reasons.map(r => {
    return {
      value: r.title,
      label: r.title,
    };
  });

  useEffect(() => {
    if (hrmData?.reason) setReason(hrmData.reason);
  }, [hrmData?.reason]);

  return (
    <View style={styleLeave.container}>
      <View style={style.row}>
        <View style={style.label}>
          <CustomerLabel text="Lý do" require />
        </View>
        <View style={style.value}>
          <Controller
            name="reason"
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <SelectApplicationView
                title="Chọn lý do"
                value={reason}
                dataSource={optionsReason}
                onChangeValue={v => {
                  onChange(v);
                  setReason(v);
                }}
              />
            )}
          />
        </View>
      </View>
      <View style={[style.row, style.rowTime]}>
        <View style={style.label}>
          <CustomerLabel text="Thời gian" require />
        </View>
      </View>
      <RequestDetail detail={detail} onRemoveDetailItem={onRemoveDetailItem}>
        {detail.map((detailItem, i) => (
          <RequestDetailItem key={detailItem.key}>
            <View style={style.box}>
              <View style={styleLeave.item1}>
                <Typography
                  style={styleLeave.label}
                  text="Ngày nộp đơn"
                  color={colors.secondary.o500}
                />
                <View style={styleLeave.col1}>
                  <Controller
                    name="date_of_application"
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <ApplicationDatePicker
                        type="date"
                        value={
                          detailItem.date
                            ? new Date(detailItem.date_of_application)
                            : new Date()
                        }
                        onValueChange={v => {
                          onChange(v);
                          onSetDetailItem(
                            detailItem.key,
                            'date_of_application',
                            moment(v),
                          );
                        }}
                      />
                    )}
                  />
                </View>
              </View>
              <View style={styleLeave.item2}>
                <Typography
                  style={styleLeave.label}
                  text="Ngày thôi việc"
                  color={colors.secondary.o500}
                />
                <View style={styleLeave.col1}>
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
            </View>
          </RequestDetailItem>
        ))}
      </RequestDetail>
    </View>
  );
};

const styleLeave = StyleSheet.create({
  container: {},
  row: {flexDirection: 'row', paddingTop: DimentionUtils.scale(8)},
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
    width: DimentionUtils.scale(120),
  },
});
export default Resignation;
