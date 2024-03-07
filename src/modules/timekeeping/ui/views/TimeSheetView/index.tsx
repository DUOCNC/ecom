import React, {useCallback, useMemo} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {completeStyle, futureStyle, leaveStyle, todayStyle} from './style';
import {Typography} from 'common-ui';
import {WorkDayStatus} from 'modules/timekeeping/enums';
import {colors} from 'assets/v2';
import {WorkdayDateEntity} from 'modules/timekeeping/models/entities';
import moment from 'moment';
import {ic_exclamation_circle} from 'assets/images';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {StringUtils} from 'common';
import {AppConfig} from 'config/AppConfig';

interface Props {
  type: WorkDayStatus;
  data: WorkdayDateEntity;
}
const TimeSheetView = ({type, data}: Props) => {
  const style = useMemo(() => {
    if (type === WorkDayStatus.COMPLETE) {
      return completeStyle;
    }
    if (type === WorkDayStatus.LEAVE) {
      return leaveStyle;
    }
    if (type === WorkDayStatus.NOT_ENOUGH_WORKING_HOURS) {
      return completeStyle;
    }
    if (type === WorkDayStatus.TODAY) {
      return todayStyle;
    }
    if (type === WorkDayStatus.FUTURE) {
      return futureStyle;
    }
    return completeStyle;
  }, [type]);
  const isWarning = useMemo(() => {
    if (data?.getCalWorkHourValue() >= 8) {
      return false;
    }
    const isDisplayType =
      type !== WorkDayStatus.FUTURE && type !== WorkDayStatus.TODAY;

    return (!data.getCheckin() || !data.getCheckout()) && isDisplayType;
  }, [data, type]);

  const colorCalWorkHour = useMemo(() => {
    if (type === WorkDayStatus.COMPLETE) {
      return colors.success.o500;
    }
    if (type === WorkDayStatus.LEAVE) {
      return colors.warning.o500;
    }
    if (type === WorkDayStatus.TODAY) {
      return colors.success.o500;
    }
    if (type === WorkDayStatus.NOT_ENOUGH_WORKING_HOURS) {
      return colors.success.o500;
    }
    return colors.secondary.o900;
  }, [type]);

  const getTitleDate = useMemo(() => {
    const dateTitleEng = moment(data.getDate()).format('dddd');
    switch (dateTitleEng) {
      case 'Monday': {
        return 'Thứ 2';
      }
      case 'Tuesday': {
        return 'Thứ 3';
      }
      case 'Wednesday': {
        return 'Thứ 4';
      }
      case 'Thursday': {
        return 'Thứ 5';
      }
      case 'Friday': {
        return 'Thứ 6';
      }
      case 'Saturday': {
        return 'Thứ 7';
      }
      case 'Sunday': {
        return 'CN';
      }
      default:
        return '';
    }
  }, [data]);
  const getDate = useMemo(() => {
    return moment(data.getDate()).format('DD/MM');
  }, [data]);

  const getCode = useMemo(() => {
    if (data.getShifts() && data.getShifts().length > 0) {
      let codes = data.getShifts().map(e => e.code);
      let str = codes.join(', ');
      if (codes.length > 3) {
        str = StringUtils.format('{0},...', codes.slice(0, 3).join(','));
      }
      return str;
    }
    return '';
  }, [data]);

  const onPressCreate = useCallback(async () => {
    if (await InAppBrowser.isAvailable()) {
      let urlTask = StringUtils.format(
        '{0}{1}',
        AppConfig.BaseUrlV2,
        'admin/single-word/create',
      );
      InAppBrowser.openAuth(urlTask, AppConfig.redirectUrl, {
        showTitle: true,
        modalEnabled: true,
      });
    }
  }, []);

  return (
    <View style={style.container}>
      <View style={style.dateCol}>
        <Typography
          style={style.dateName}
          text={getTitleDate}
          color={
            type === WorkDayStatus.FUTURE
              ? colors.secondary.o400
              : colors.secondary.o900
          }
          textType="medium"
        />
        <Typography
          text={getDate}
          color={
            type === WorkDayStatus.FUTURE
              ? colors.secondary.o400
              : colors.secondary.o500
          }
          textType="medium"
        />
      </View>
      <View style={style.calWorkCol}>
        <Typography
          text={data.getCalWorkHour()}
          textAlign="center"
          textType="medium"
          color={
            type === WorkDayStatus.FUTURE
              ? colors.secondary.o300
              : colorCalWorkHour
          }
        />
      </View>
      <View style={style.informationCol}>
        <View style={style.row}>
          <Typography
            text={` ${data.getCheckinTimeSheetTab()}`}
            textAlign="left"
            color={
              type === WorkDayStatus.FUTURE
                ? colors.secondary.o400
                : colors.secondary.o500
            }
          />
          <Typography
            text=" | "
            textAlign="left"
            color={
              type === WorkDayStatus.FUTURE
                ? colors.secondary.o400
                : colors.secondary.o500
            }
          />
          <Typography
            text={`${data.getCheckoutTimeSheetTab()}`}
            textAlign="left"
            color={
              type === WorkDayStatus.FUTURE
                ? colors.secondary.o400
                : colors.secondary.o500
            }
          />
          {isWarning && (
            <Image style={style.icon} source={ic_exclamation_circle} />
          )}
        </View>

        <Typography
          text={getCode}
          textAlign="left"
          color={
            type === WorkDayStatus.FUTURE
              ? colors.secondary.o400
              : colors.secondary.o500
          }
          style={style.code}
        />
      </View>
      <View style={style.buttonCol}>
        {type === WorkDayStatus.TODAY && (
          <Typography
            text="Hôm nay"
            color={colors.blue.o500}
            textType="medium"
            textAlign="right"
          />
        )}
        {type === WorkDayStatus.FUTURE && <View style={style.empty} />}
        {isWarning && (
          <TouchableOpacity style={style.buttonCreate} onPress={onPressCreate}>
            <Typography
              text="Tạo đơn"
              type="h5"
              color={colors.secondary.o900}
              textAlign="center"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TimeSheetView;
