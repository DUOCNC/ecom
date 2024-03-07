import {Colors} from 'assets/colors';
import {ReportViewType} from 'modules/analytic/enums';
import {
  BarChartItemEntity,
  BaseAnalyticEntity,
} from 'modules/analytic/models/entities';
import React, {useMemo} from 'react';
import {Dimensions, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {ReportRetailChartStyle} from './style';
import TooltipChart from './TooltipChart';
const {width: SCREEN_WIDTH} = Dimensions.get('screen');

interface IProps {
  barData: Array<BarChartItemEntity>;
  viewType: string;
}

const ReportRetailChart = (props: IProps) => {
  let {barData, viewType} = props;
  const maxValue = Math.max(...barData.map(o => o.getValue()));
  const yAxisLabelTexts = useMemo(() => {
    return BaseAnalyticEntity.getYAxisLabelTexts(maxValue) ?? [];
  }, [maxValue]);

  return (
    <View style={ReportRetailChartStyle.container}>
      <BarChart
        height={140}
        frontColor={Colors.BgChart}
        data={barData}
        barWidth={20}
        labelWidth={40}
        labelsExtraHeight={40}
        yAxisLabelWidth={66}
        yAxisLabelTexts={yAxisLabelTexts}
        maxValue={maxValue}
        stepValue={maxValue / yAxisLabelTexts.length}
        noOfSections={yAxisLabelTexts.length - 1}
        renderTooltip={(item: BarChartItemEntity, index: number) => {
          return (
            <TooltipChart
              key={index}
              amount={item.getValue()}
              first={index === 0}
              last={index === barData.length - 1}
            />
          );
        }}
        leftShiftForTooltip={2}
        // leftShiftForLastIndexTooltip={24}
        xAxisColor={Colors.Background}
        xAxisTextNumberOfLines={2}
        yAxisColor={Colors.White}
        xAxisLabelTextStyle={[
          ReportRetailChartStyle.labelX,
          viewType !== ReportViewType.week && {top: 0},
        ]}
        yAxisTextStyle={{color: Colors.SubText}}
        barBorderRadius={3}
        rulesType="solid"
        rulesColor={Colors.Gray200}
        spacing={barData && barData.length < 4 ? SCREEN_WIDTH / 6 : 24}
        initialSpacing={barData && barData.length < 4 ? SCREEN_WIDTH / 6 : 24}
        width={SCREEN_WIDTH - 50}
        sideWidth={SCREEN_WIDTH - 50}
      />
      {/* <View style={[TooltipChartStyle.line, TooltipChartStyle.pt16]}>
        <View style={TooltipChartStyle.iconAmount} />
        <CTTypography.Text
          text="Doanh thu thực đạt"
          style={TooltipChartStyle.textAmount}
        />
      </View> */}
    </View>
  );
};

export default ReportRetailChart;
