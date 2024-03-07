import React, {FC, ReactNode, useMemo} from 'react';
import {Image, View} from 'react-native';
import CTTypography from 'components/CTTypography';
import {SamePeriodStyled} from 'modules/analytic/ui/views/SamePeriodComponent/style';
import * as Progress from 'react-native-progress';
import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';
import {Font} from 'components/Base/Text';
import {ic_attention} from 'assets/images';

interface Props {
  type: 'month' | 'day';
  disPlayThisValue: string;
  disPlayPreviousValue: string;
  thisValue: number | undefined;
  previousValue: number | undefined;
  titleGroup: ReactNode;
  unit: string;
}

const SamePeriodComponent: FC<Props> = ({
  type,
  disPlayThisValue,
  disPlayPreviousValue,
  thisValue,
  previousValue,
  titleGroup,
  unit,
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
    let [value, oldValue] = [thisValue ?? 0, previousValue ?? 0];
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
  }, [previousValue, thisValue]);

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
          {disPlayThisValue === 'warning' ? (
            <Image
              style={SamePeriodStyled.iconAttention}
              source={ic_attention}
              width={normalize(20)}
              height={normalize(20)}
            />
          ) : (
            <CTTypography.Header
              style={SamePeriodStyled.value}
              font={Font.Medium}
              level="4"
              text={disPlayThisValue}
            />
          )}
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
          {disPlayPreviousValue === 'warning' ? (
            <Image
              style={SamePeriodStyled.iconAttention}
              source={ic_attention}
              width={normalize(20)}
              height={normalize(20)}
            />
          ) : (
            <CTTypography.Header
              style={SamePeriodStyled.value}
              font={Font.Medium}
              level="4"
              text={disPlayPreviousValue}
            />
          )}
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
export default SamePeriodComponent;
