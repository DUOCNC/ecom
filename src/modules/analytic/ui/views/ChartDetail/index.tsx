import {ic_attention, ic_rp_down, ic_rp_up} from 'assets/images';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import {ReportRetailDetailChartViewer} from 'model/viewer/ReportViewer';
import {ViewTypeConfig} from 'modules/analytic/config';
import ReportChartDetailConfig from 'modules/analytic/config/ReportChartDetailConfig';
import React, {FC, useMemo} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {ChartDetailStyle} from './style';

interface Props {
  activeTab: string;
  viewType?: string;
  data: ReportRetailDetailChartViewer | undefined;
  loading: boolean;
}

const ChartDetail: FC<Props> = (props: Props) => {
  const {viewType, activeTab, data, loading} = props;
  const viewTypeDisplay = useMemo(() => {
    if (!viewType) {
      return 'ngày';
    }
    return ViewTypeConfig.find(e => e.getValue() === viewType)?.getSubDisplay();
  }, [viewType]);

  const rateText = useMemo(() => {
    let res = '';
    if (!data || !data.rate || data.rate === 0) {
      return res;
    }
    res = Math.abs(parseFloat(data.rate.toFixed(1))).toString();
    return `${res}%`;
  }, [data]);

  return (
    <>
      {ReportChartDetailConfig.filter(e => e.getTab() === activeTab).map(
        (e, i) => {
          return (
            <View key={i} style={ChartDetailStyle.container}>
              <View style={ChartDetailStyle.left}>
                <CTTypography.Text
                  style={ChartDetailStyle.left.text}
                  text={`${e.getTitle()} ${viewTypeDisplay}`}
                />
                <View style={ChartDetailStyle.rate}>
                  {loading ? (
                    <ActivityIndicator size="small" />
                  ) : data && data.rate ? (
                    <>
                      {data.rate > 0 ? (
                        <Image source={ic_rp_up} />
                      ) : (
                        <Image source={ic_rp_down} />
                      )}
                      <CTTypography.Text
                        level="3"
                        style={
                          data.rate > 0
                            ? ChartDetailStyle.left.up
                            : ChartDetailStyle.left.down
                        }
                        text={rateText}
                      />
                    </>
                  ) : (
                    <Image source={ic_attention} />
                  )}
                </View>
              </View>
              {loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <CTTypography.Text
                  style={ChartDetailStyle.right}
                  text={`${data && data.value}`}
                  font={Font.Medium}
                />
              )}
            </View>
          );
        },
      )}
    </>
  );
};

export default ChartDetail;
