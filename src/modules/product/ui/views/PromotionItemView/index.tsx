import {bg_promotion} from 'assets/images';
import {colors} from 'assets/v2';
import {Text, Typography} from 'common-ui';
import {PromotionEntity, VariantEntity} from 'modules/product/models';
import React, {useMemo} from 'react';
import {View, ImageBackground} from 'react-native';
import style from './style';

interface Props {
  promotion: PromotionEntity;
  variant: VariantEntity;
  vertical: boolean;
}

const PromotionItemView: React.FC<Props> = ({promotion, variant, vertical}) => {
  const imageContainerStyle =
    vertical === true ? style.imageVertical : style.image;
  const containerStyle = vertical ? style.containerStyle : style.container;

  const applyPos = useMemo(() => {
    if (
      promotion.getPrerequisiteSalesChannelNames().length === 0 ||
      promotion
        .getPrerequisiteSalesChannelNames()
        .findIndex(e => e.toLocaleLowerCase() === 'pos') !== -1
    ) {
      return true;
    }
    return false;
  }, [promotion]);

  const applyOnline = useMemo(() => {
    if (
      promotion.getPrerequisiteSalesChannelNames().length === 0 ||
      promotion
        .getPrerequisiteSalesChannelNames()
        .findIndex(e => e.toLocaleLowerCase() !== 'pos') !== -1
    ) {
      return true;
    }
    return false;
  }, [promotion]);

  return (
    <ImageBackground style={imageContainerStyle} source={bg_promotion}>
      <View style={containerStyle}>
        <Text
          size={vertical ? 14 : 10}
          color={colors.primary.o500}
          fontWeight={'500'}
          numberOfLines={2}
          ellipsizeMode="tail"
          style={vertical ? style.txtTitleVertical : style.txtTitle}
          text={promotion.getTitle()}
        />
        <View style={[style.channel, !vertical && style.channelHorizontal]}>
          {applyPos && (
            <View
              style={[
                style.channelPos,
                !vertical && style.channelPosHorizontal,
              ]}>
              <Typography
                text="Cửa hàng"
                type={vertical ? 'h5' : 'h6'}
                color={colors.success.o500}
              />
            </View>
          )}
          {applyOnline && (
            <View
              style={[
                style.channelOnline,
                !vertical && style.channelOnlineHorizontal,
              ]}>
              <Typography
                text="Online"
                type={vertical ? 'h5' : 'h6'}
                color={colors.error.o500}
              />
            </View>
          )}
        </View>
        <Text
          size={vertical ? 12 : 10}
          color={colors.secondary.o500}
          style={style.txtPromotion}
          fontWeight={'400'}
          text={
            <>
              Giá sau CK dự kiến:{' '}
              <Text
                size={vertical ? 12 : 10}
                fontWeight={'500'}
                color={colors.primary.o500}
                text={promotion.getPriceAfterDiscount(
                  variant.getRetailPriceValue(),
                )}
              />
            </>
          }
        />
        <Text
          size={vertical ? 10 : 8}
          style={style.txtPromotion}
          color={colors.secondary.o500}
          fontWeight={'400'}
          text={promotion.getDueDate()}
        />
      </View>
    </ImageBackground>
  );
};

export default PromotionItemView;
