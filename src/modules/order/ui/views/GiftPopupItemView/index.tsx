import {Typography} from 'common-ui';
import {OrderLineEntity} from 'modules/order/models';
import {Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './style';
import {ic_gift, ic_tick} from 'assets/images';

export interface Props {
  selected: boolean;
  item: OrderLineEntity;
  onCheckedChange: (selected: boolean, item: OrderLineEntity) => void;
}
const GiftPopupItemView: React.FC<Props> = ({
  selected,
  item,
  onCheckedChange,
}) => {
  const onPressChange = () => {
    onCheckedChange(!selected, item);
  };
  return (
    <TouchableOpacity onPress={onPressChange}>
      <View style={[style.row, selected && style.selected]}>
        <View style={style.icon}>
          <Image source={ic_gift} />
        </View>
        <Typography
          style={style.text}
          numberOfLines={1}
          text={item.getVariantName()}
        />
        {selected && <Image source={ic_tick} />}
      </View>
    </TouchableOpacity>
  );
};
export default GiftPopupItemView;
