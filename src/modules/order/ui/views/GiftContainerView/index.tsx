import {ic_right} from 'assets/images';
import {Typography} from 'common-ui';
import {OrderEntity, OrderLineEntity} from 'modules/order/models';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import React, {createRef} from 'react';
import {colors} from 'assets/v2';
import GiftPopupView, {GiftPopupRef} from '../GiftPopupView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from 'ui/screens/MainStack';
import {MainRouteConfig} from 'config/RouteConfig';
import GiftProgramLineItemView from 'modules/order/ui/views/GiftProgramLineItemView';

interface Props {
  lineItem: OrderLineEntity | undefined;
  lineIndex: number;
  isNew: boolean;
  onQuantityChange: (newQuantity: number, index: number) => void;
  onChangeGifts: (items: Array<OrderLineEntity>) => void;
  order: OrderEntity;
  onPressDeleteProgram: () => void;
}
const GiftContainerView: React.FC<Props> = ({
  lineItem,
  lineIndex,
  isNew,
  onChangeGifts,
  order,
  onPressDeleteProgram,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const giftPopupRef = createRef<GiftPopupRef>();
  const openGift = () => {
    if (lineItem) {
      navigation.navigate(MainRouteConfig.PickGift, {
        lineItem: lineItem,
        lineIndex: lineIndex,
        isNew: isNew,
        order,
      });
    }
  };
  const onSelectedGift = (selected: Array<OrderLineEntity>) => {
    onChangeGifts(selected);
  };

  return (
    <View style={style.container}>
      <TouchableOpacity onPress={openGift}>
        <View style={style.title}>
          <Typography
            textType="medium"
            text="Chọn làm quà tặng"
            type="h3"
            color={colors.secondary.o900}
          />
          <View style={style.iconRight}>
            <Image source={ic_right} />
          </View>
        </View>
      </TouchableOpacity>
      <View>
        {lineItem && lineItem.getGiftProgram() && (
          <View style={style.giftProgramLineItemViewContainer}>
            <GiftProgramLineItemView
              item={lineItem.getGiftProgram()}
              onDelete={onPressDeleteProgram}
            />
          </View>
        )}
      </View>
      <GiftPopupView ref={giftPopupRef} onFinishSelect={onSelectedGift} />
    </View>
  );
};

export default GiftContainerView;
