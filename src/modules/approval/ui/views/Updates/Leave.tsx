import {DimentionUtils, Typography} from 'common-ui';
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RequestProps} from './type';
import {useReasonData, useUserFurloughs} from 'modules/approval/hooks';
import {style} from './style';
import CustomerLabel from './CustomerLabel';
import {Furlough, LeaveReason} from 'modules/approval/models/response/reasons';
import SelectApplicationView from '../SelectApplicationView';
import {RequestDetail, RequestDetailItem} from './RequestDetail';
import {colors} from 'assets/v2';
import {timeShifts} from 'modules/approval/config';
import ApplicationDatePicker from '../ApplicationDate';
import {IDetailCreateHrm} from 'modules/approval/models/response';
import moment from 'moment';

function calcUsedFurlough(detailItem: IDetailCreateHrm): number {
  const startDate = moment(detailItem.date_end),
    endDate = moment(detailItem.date_start);

  let usedFurloughs =
    startDate?.startOf('day').diff(endDate?.startOf('day'), 'days') + 1;
  if (detailItem.shifts_start === timeShifts[1].value) {
    usedFurloughs -= 0.5;
  }
  if (detailItem.shifts_end === timeShifts[0].value) {
    usedFurloughs -= 0.5;
  }

  return usedFurloughs;
}

const Leave: React.FC<RequestProps> = ({
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
  const {furloughs} = useUserFurloughs() || {};
  const {furloughTotalClosed = 0} = furloughs || ({} as Furlough);
  const selectedReason = reasons.find(r => r.title === reason);

  const leaveWithPayment =
    selectedReason?.hasAttendance === '1' ? 'Có' : 'Không';

  // @TODO: Hardcoded checking manual leave
  const isManualLeave = selectedReason?.title === 'Nghỉ phép năm';

  const optionsReason = reasons.map(r => {
    return {
      value: r.title,
      label: r.title,
    };
  });

  const totalAvailableFurlough = useMemo(() => {
    if (!isEditting) return furloughTotalClosed;

    const addons =
      hrmData?.detail?.reduce(
        (total, item) => total + calcUsedFurlough(item as IDetailCreateHrm),
        0,
      ) || 0;

    return furloughTotalClosed + addons;
  }, [isEditting, furloughTotalClosed, hrmData?.detail]);

  const detailFurloughs = useMemo(() => {
    let totalFurloughsUsed = 0;

    return detail.map(detailItem => {
      const recentlyUsedFurloughs = calcUsedFurlough(detailItem);

      totalFurloughsUsed += recentlyUsedFurloughs || 0;

      const furloughsLeft = Math.max(
        totalAvailableFurlough - totalFurloughsUsed,
        0,
      );

      return {recentlyUsedFurloughs, furloughsLeft};
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAvailableFurlough, detail, isManualLeave]);

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
      <View style={style.row}>
        <View style={style.label}>
          <CustomerLabel text="Tính công" />
        </View>
        <View style={style.value}>
          <Typography text={leaveWithPayment} />
        </View>
      </View>
      <View style={[style.row, style.rowTime]}>
        <View style={style.label}>
          <CustomerLabel text="Thời gian" require />
        </View>
      </View>
      <RequestDetail
        detail={detail}
        onAddDetailItem={onAddDetailItem}
        onRemoveDetailItem={onRemoveDetailItem}>
        {detail.map((detailItem, i) => (
          <RequestDetailItem key={detailItem.key}>
            <View style={style.box}>
              <View style={styleLeave.item1}>
                <Typography
                  style={styleLeave.label}
                  text="Từ"
                  color={colors.secondary.o500}
                />
                <View style={styleLeave.col1}>
                  <Controller
                    name="shifts_start"
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <SelectApplicationView
                        title="Chọn ca"
                        value={detailItem.shifts_start}
                        dataSource={timeShifts}
                        onChangeValue={v => {
                          onChange(v);
                          onSetDetailItem(detailItem.key, 'shifts_start', v);
                        }}
                      />
                    )}
                  />
                </View>
                <View style={styleLeave.col2}>
                  <ApplicationDatePicker
                    type="date"
                    value={
                      detailItem.date_start
                        ? new Date(detailItem.date_start)
                        : new Date()
                    }
                    onValueChange={value => {
                      onSetDetailItem(
                        detailItem.key,
                        'date_start',
                        moment(value),
                      );
                    }}
                  />
                </View>
              </View>
              <View style={styleLeave.item2}>
                <Typography
                  style={styleLeave.label}
                  text="Đến"
                  color={colors.secondary.o500}
                />
                <View style={styleLeave.col1}>
                  <Controller
                    name="shifts_end"
                    control={control}
                    render={({field: {onChange, onBlur, value}}) => (
                      <SelectApplicationView
                        title="Chọn ca"
                        value={detailItem.shifts_end}
                        dataSource={timeShifts}
                        onChangeValue={v => {
                          onChange(!v);
                          onSetDetailItem(detailItem.key, 'shifts_end', v);
                        }}
                      />
                    )}
                  />
                </View>
                <View style={styleLeave.col2}>
                  <ApplicationDatePicker
                    type="date"
                    value={
                      detailItem.date_end
                        ? new Date(detailItem.date_end)
                        : new Date()
                    }
                    onValueChange={value => {
                      onSetDetailItem(
                        detailItem.key,
                        'date_end',
                        moment(value),
                      );
                    }}
                  />
                </View>
              </View>
              {isManualLeave && (
                <>
                  <View style={style.row}>
                    <View style={style.label}>
                      <CustomerLabel text="Phép dư" />
                    </View>
                    <View style={style.value}>
                      <Typography
                        text={
                          Number.isNaN(detailFurloughs[i].furloughsLeft)
                            ? '-'
                            : detailFurloughs[i].furloughsLeft
                        }
                      />
                    </View>
                  </View>
                  <View style={style.row}>
                    <View style={style.label}>
                      <CustomerLabel text="Phép nghỉ" />
                    </View>
                    <View style={style.value}>
                      <Typography
                        text={
                          Number.isNaN(detailFurloughs[i].recentlyUsedFurloughs)
                            ? '-'
                            : detailFurloughs[i].recentlyUsedFurloughs
                        }
                      />
                    </View>
                  </View>
                </>
              )}
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
  },
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: DimentionUtils.scale(10),
  },
  col1: {flex: 1, maxWidth: DimentionUtils.scale(130)},
  col2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  label: {
    width: DimentionUtils.scale(40),
  },
});
export default Leave;
