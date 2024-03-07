import {Typography} from 'common-ui';
import React, {FC} from 'react';
import {Image, View} from 'react-native';
import {style} from './style';
import {colors} from 'assets/v2';
import {ic_rp_down, ic_rp_up, icon_user} from 'assets/images';
import {ReportConversionStaffEntity} from 'modules/analytic/models/entities';
interface props {
  user: ReportConversionStaffEntity;
}
const ReportConversionCustomerIndicatorView: React.FC<props> = (
  props: props,
) => {
  const {user} = props;
  const IndicatorItem: FC<{
    name: string;
    value: string;
    rate: string;
    up?: boolean;
  }> = ({name, value, rate, up}) => {
    return (
      <View style={style.item}>
        <View style={style.leftItem}>
          <Typography
            color={colors.secondary.o500}
            style={style.indicatorName}
            text={name}
            type="h5"
          />
          <Typography textType="medium" color={colors.primary.o500} text=": " />
          <Typography
            textType="medium"
            color={colors.primary.o500}
            text={value}
            type="h4"
          />
        </View>
        {up ? (
          <View style={[style.tag.up, style.tag]}>
            <View style={style.row}>
              <Image source={ic_rp_up} style={[style.tag.icon]} />
              <Typography text={rate} type="h5" color={colors.success.o500} />
            </View>
          </View>
        ) : (
          <View style={[style.tag.down, style.tag]}>
            <View style={style.row}>
              <Image source={ic_rp_down} style={style.tag.icon} />
              <Typography text={rate} type="h5" color={colors.error.o500} />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={style.user}>
      <View style={style.icon}>
        <Image source={icon_user} />
      </View>
      <View style={style.right}>
        <View style={style.name}>
          <Typography
            text={user.getAssigneeName()}
            type="h3"
            textType="medium"
          />
        </View>
        <View style={style.indicator}>
          <IndicatorItem
            name="Khách không mua"
            value={user.getTrafficNotBoughtQuantity()}
            rate={user.getTrafficNotBoughtQuantityGrowthRatio()}
            up={user.getTrafficNotBoughtQuantityGrowthRatioDirection()}
          />
          <IndicatorItem
            name="Khách đã tiếp"
            value={user.getTrafficAssigneeQuantity()}
            rate={user.getTrafficAssigneeQuantityGrowthRatio()}
            up={user.getTrafficAssigneeQuantityGrowthRatioDirection()}
          />
          <IndicatorItem
            name="Khách mua hàng"
            value={user.getCustomerPurchase()}
            rate={user.getCustomerPurchaseGrowthRatio()}
            up={user.getCustomerPurchaseGrowthRatioDirection()}
          />
          <IndicatorItem
            name="CRV Khách đã tiếp"
            value={user.getCrAssigneePurchase()}
            rate={user.getCrAssigneePurchaseGrowthRatio()}
            up={user.getCrAssigneePurchaseGrowthRatioDirection()}
          />
        </View>
      </View>
    </View>
  );
};
export default ReportConversionCustomerIndicatorView;
