import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {CustomerDiscountEntity} from 'modules/order/models/entities';
import {bg_promotion_h96, ic_copy} from 'assets/images';
import {colors} from 'assets/v2';
import {Text, Typography} from 'common-ui';
import {showSuccess} from 'utils/ToastUtils';
import {StringUtils} from 'common';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  discount: CustomerDiscountEntity;
}

const CustomerDiscountItemView: React.FC<Props> = ({discount}) => {
  const handleCopy = () => {
    if (discount && discount.getCode()) {
      Clipboard.setString(discount.getCode());
      showSuccess(StringUtils.format('Đã sao chép mã {0}', discount.getCode()));
    }
  };
  return (
    <ImageBackground style={style.image} source={bg_promotion_h96}>
      <View style={style.container}>
        <View style={style.containerStyle}>
          <View style={style.text}>
            <Text
              size={14}
              color={colors.primary.o500}
              fontWeight={'500'}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={style.txtTitle}
              text={discount.getTitle()}
            />
            <Typography
              text={discount.getTitleByMethod()}
              type="h5"
              color={colors.secondary.o500}
            />
            <View style={[style.row, style.pt4, style.itemDiscount]}>
              <Typography
                text="Giá trị giảm: "
                type="h5"
                color={colors.secondary.o500}
              />
              <Typography
                text={discount.getDiscountValue()}
                textType="medium"
                color={colors.primary.o500}
              />
            </View>
            <View style={[style.row, style.pt4, style.itemDiscount]}>
              <Typography
                text="Hạn sử dụng: "
                type="h5"
                color={colors.secondary.o500}
              />
              <Typography
                text={discount.getDueDate()}
                textType="medium"
                color={colors.primary.o500}
              />
            </View>
          </View>
          <View style={style.viewSelect}>
            <TouchableOpacity onPress={handleCopy}>
              <Image
                source={ic_copy}
                style={{tintColor: colors.secondary.o400}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CustomerDiscountItemView;
