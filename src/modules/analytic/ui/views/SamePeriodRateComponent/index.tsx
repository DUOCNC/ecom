import React, {FC, ReactNode, useMemo} from 'react';
import {View} from 'react-native';
import CTTypography from 'components/CTTypography';
import * as Progress from 'react-native-progress';
import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {Font} from 'components/Base/Text';
import {SamePeriodStyled} from './style';
import {ReportCustomerDetailEntity} from 'modules/analytic/models/entities';

interface Props {
  type: 'month' | 'day';
  thisValue: string;
  previousValue: string;
  titleGroup: ReactNode;
  unit: string;
  data?: ReportCustomerDetailEntity;
}

const SamePeriodRateComponent: FC<Props> = ({
  type,
  thisValue,
  previousValue,
  titleGroup,
  unit,
  data,
}) => {
  const dataText = useMemo((): [string, string] => {
    let [title, titlePrevious] = ['Hôm nay', 'Hôm qua'];
    if (type === 'month') {
      title = 'Tháng này';
      titlePrevious = 'Tháng trước';
    }
    return [title, titlePrevious];
  }, [type]);

  /**
   * progress hiện tại, progress quá khứ, ẩn/hiện progress
   */
  const progressData = useMemo((): [number, number, boolean] => {
    let [progressValue, progressPreviousValue, hideProgress] = [0, 0, false];

    let [value, oldValue] = [0, 0];
    if (data) {
      value = data.getTotal()[1] ?? 0;
      oldValue = data.getTotal()[2] ?? 0;
      if (type === 'month') {
        value = data.getTotal()[3] ?? 0;
        oldValue = data.getTotal()[4] ?? 0;
      }
    }
    if (value === 0 && oldValue === 0) {
      hideProgress = true;
      return [0, 0, hideProgress];
    }
    if (value > oldValue) {
      progressValue = 1;
      progressPreviousValue = oldValue / value;
      return [progressValue, progressPreviousValue, false];
    }
    if (oldValue > value) {
      progressPreviousValue = 1;
      progressValue = value / oldValue;

      return [progressValue, progressPreviousValue, false];
    }
    if (value !== 0 && value === oldValue) {
      return [1, 1, false];
    }
    return [progressValue, progressPreviousValue, hideProgress];
  }, [data, type]);

  return (
    <View style={SamePeriodStyled.container}>
      <View style={SamePeriodStyled.descriptionContainer}>{titleGroup}</View>
      <View style={SamePeriodStyled.progressContainer}>
        <CTTypography.Text
          style={SamePeriodStyled.titleNow}
          text={dataText[0]}
          font={Font.Medium}
        />
        <View style={SamePeriodStyled.valueContainer}>
          <CTTypography.Header
            style={SamePeriodStyled.value}
            font={Font.Medium}
            level="4"
            text={thisValue}
          />
          <CTTypography.Text
            font={Font.Medium}
            style={SamePeriodStyled.unit}
            text={unit}
          />
        </View>
        {progressData[0] >= 0.05 && !progressData[2] && (
          <Progress.Bar
            progress={progressData[0]}
            width={null}
            style={SamePeriodStyled.progress}
            height={normalize(8)}
            color={Colors.LightBlue}
            borderColor={Colors.White}
            unfilledColor={Colors.White}
          />
        )}

        <CTTypography.Text
          style={SamePeriodStyled.titlePrevious}
          text={dataText[1]}
          font={Font.Medium}
        />
        <View style={SamePeriodStyled.valueContainer}>
          <CTTypography.Header
            style={SamePeriodStyled.value}
            font={Font.Medium}
            level="4"
            text={previousValue}
          />
          <CTTypography.Text
            font={Font.Medium}
            style={SamePeriodStyled.unit}
            text={unit}
          />
        </View>
        {progressData[1] >= 0.05 && !progressData[2] && (
          <Progress.Bar
            progress={progressData[1]}
            width={null}
            style={SamePeriodStyled.progress}
            height={normalize(8)}
            color={Colors.Gray200}
            borderColor={Colors.White}
            unfilledColor={Colors.White}
          />
        )}
      </View>
    </View>
  );
};
export default SamePeriodRateComponent;
