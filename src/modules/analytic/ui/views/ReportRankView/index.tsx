import ReportRankEntity from 'modules/analytic/models/entities/ReportRankEntity';
import React, {FC, useMemo} from 'react';
import {Image, View} from 'react-native';
import {style} from './style';
import {DimentionUtils, Typography} from 'common-ui';
import {ReportTabButton} from 'modules/analytic/enums';
import {
  ic_customer,
  ic_money1,
  ic_rank1,
  ic_rank2,
  ic_rank3,
} from 'assets/images';
import {colors} from 'assets/v2';

interface props {
  data: Array<ReportRankEntity>;
  activeTab: string;
}

const ValueRankCom: FC<{
  text: string;
  color: string;
  activeTab: string;
}> = ({text, color, activeTab}) => {
  return (
    <View style={style.rankValue}>
      <Typography text={text} textType="medium" color={color} />
      {activeTab !== ReportTabButton.crv && (
        <Image
          source={
            activeTab !== ReportTabButton.customer ? ic_money1 : ic_customer
          }
          style={[
            {tintColor: color, marginLeft: DimentionUtils.scale(2)},
            activeTab === ReportTabButton.customer && style.icCustomer,
          ]}
        />
      )}
    </View>
  );
};

const ReportRankView: FC<props> = ({data, activeTab}) => {
  return (
    <View style={style.rank}>
      <View style={[style.rank.rank2, style.rankColumn]}>
        <Image source={ic_rank2} />
        <View style={[style.rank2Bottom, style.rankBottom]}>
          <Typography
            text={data && data[1] && data[1].getName()}
            ellipsizeMode="tail"
            numberOfLines={2}
            color={colors.base.white}
            style={[style.rankText]}
          />
          <ValueRankCom
            text={data && data[1] ? data[1].getAmountRankSymbol(activeTab) : ''}
            color="#2F54EB"
            activeTab={activeTab}
          />
        </View>
      </View>
      <View style={[style.rank.rank1, style.rankColumn]}>
        <Image source={ic_rank1} />
        <View style={[style.rank1Bottom, style.rankBottom]}>
          <Typography
            text={data && data[0] ? data[0].getName() : ''}
            ellipsizeMode="tail"
            numberOfLines={2}
            style={[style.rankText, style.rank1Text]}
          />
          <ValueRankCom
            activeTab={activeTab}
            text={data && data[0] ? data[0].getAmountRankSymbol(activeTab) : ''}
            color="#FAAD14"
          />
        </View>
      </View>
      <View style={[style.rank.rank3, style.rankColumn]}>
        <Image source={ic_rank3} />
        <View style={[style.rank3Bottom, style.rankBottom]}>
          <Typography
            text={data && data[2] ? data[2].getName() : ''}
            ellipsizeMode="tail"
            numberOfLines={2}
            color={colors.base.white}
            style={[style.rankText]}
          />
          <ValueRankCom
            activeTab={activeTab}
            text={data && data[2] ? data[2].getAmountRankSymbol(activeTab) : ''}
            color={style.rank3Text.color}
          />
        </View>
      </View>
    </View>
  );
};

export default ReportRankView;
