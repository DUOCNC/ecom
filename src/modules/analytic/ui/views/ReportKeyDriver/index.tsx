import {ic_attention, ic_rp_down, ic_rp_up} from 'assets/images';
import {Font} from 'components/Base/Text';
import CTTypography from 'components/CTTypography';
import ReportRetailKeyDriverConfig from 'modules/analytic/config/ReportRetailKeyDriverConfig';
import {ReportRetailKeyDriverItemEntity} from 'modules/analytic/models/entities/ReportRetailEntity';
import React, {FC} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ScrollKeyDriverStyle} from './style';

interface Props {
  loadingOrder: boolean;
  loadingRate?: boolean;
  data: Array<ReportRetailKeyDriverItemEntity> | undefined;
}

const ScrollKeyDriver: FC<Props> = (props: Props) => {
  const {data, loadingOrder, loadingRate} = props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {ReportRetailKeyDriverConfig.map((e, i) => {
        let growthRate = data && data[i] && data[i].getGrowthRate();
        return (
          <View key={i} style={[ScrollKeyDriverStyle.button]}>
            <View>
              <CTTypography.Text
                level="2"
                text={e.getTitle()}
                style={[ScrollKeyDriverStyle.text]}
                font={Font.Medium}
              />
            </View>
            {loadingOrder || loadingRate ? (
              <ActivityIndicator size="small" />
            ) : (
              <View style={ScrollKeyDriverStyle.subText}>
                {data && data[i] && data[i].getRate() ? (
                  <CTTypography.Text
                    text={`${data[i].getRate()}${i === 2 ? '%' : ''}`}
                    style={ScrollKeyDriverStyle.rate}
                    level="2"
                    font={Font.Medium}
                  />
                ) : (
                  <View style={ScrollKeyDriverStyle.rate}>
                    <CTTypography.Text
                      text={`0${i === 0 ? 'đ' : ''}`}
                      style={ScrollKeyDriverStyle.rate}
                      level="2"
                      font={Font.Medium}
                    />
                  </View>
                )}
                {data && growthRate ? (
                  growthRate >= 0 ? (
                    <View
                      style={[
                        ScrollKeyDriverStyle.tag,
                        ScrollKeyDriverStyle.tag.tagUp,
                      ]}>
                      <Image
                        source={ic_rp_up}
                        style={ScrollKeyDriverStyle.tag.iconTag}
                      />
                      <View>
                        <CTTypography.Text
                          text={`${data[i].getRateText()}`}
                          style={ScrollKeyDriverStyle.growthRate}
                          level="3"
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      style={[
                        ScrollKeyDriverStyle.tag,
                        ScrollKeyDriverStyle.tag.tagDown,
                      ]}>
                      <Image
                        source={ic_rp_down}
                        style={ScrollKeyDriverStyle.tag.iconTag}
                      />
                      <View>
                        <CTTypography.Text
                          text={`${data[i].getRateText()}`}
                          style={ScrollKeyDriverStyle.tag.red}
                          level="3"
                        />
                      </View>
                    </View>
                  )
                ) : (
                  <Image source={ic_attention} />
                )}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ScrollKeyDriver;
