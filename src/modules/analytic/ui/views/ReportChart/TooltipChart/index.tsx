import CTTypography from 'components/CTTypography';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';
import NumberUtils from 'utils/NumberUtils';
import {TooltipChartStyle} from '../style';
interface IProps {
  amount: number;
  last: boolean;
  first: boolean;
}
const TooltipChart = (props: IProps) => {
  const {amount, last, first} = props;
  const [widthTooltip, setWithTooltip] = useState<number>(0);

  const marginLeft = useMemo(() => {
    return normalize(12) - widthTooltip / normalize(2);
  }, [widthTooltip]);

  return (
    <View
      onLayout={event => {
        setWithTooltip(event.nativeEvent.layout.width);
      }}
      style={[
        TooltipChartStyle.container,
        !first && !last && {marginLeft: marginLeft},
        last && {marginLeft: marginLeft * 2},
        last === first && first && TooltipChartStyle.isOneBar,
      ]}>
      <View style={TooltipChartStyle.line}>
        <CTTypography.Text
          text={`${NumberUtils.formatNumber(amount)}`}
          style={TooltipChartStyle.textAmount}
        />
      </View>
      <View
        style={[
          TooltipChartStyle.icon,
          last && {
            right: normalize(10),
            marginLeft: -normalize(widthTooltip),
          },
          last === first && TooltipChartStyle.isOneBar.ic,
          first && {left: normalize(10)},
        ]}
      />
    </View>
  );
};

export default TooltipChart;
