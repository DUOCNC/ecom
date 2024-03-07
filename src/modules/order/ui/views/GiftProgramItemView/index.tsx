import {Typography} from 'common-ui';
import {Image, TouchableOpacity, View} from 'react-native';
import React, {useMemo} from 'react';
import style from './style';
import {ic_gift, ic_gift_grey} from 'assets/images';
import CTRadio from 'components/Form/CTRadio';
import {colors} from 'assets/v2';
import {SuggestedDiscountGiftEntity} from 'modules/order/models/entities/GiftProgramEntity';

export interface Props {
  selected: boolean;
  item: SuggestedDiscountGiftEntity;
  disabled: boolean;
  onCheckedChange: (
    selected: boolean,
    item: SuggestedDiscountGiftEntity,
  ) => void;
}
const GiftProgramItemView: React.FC<Props> = ({
  selected,
  item,
  onCheckedChange,
  disabled,
}) => {
  const onPressChange = () => {
    onCheckedChange(!selected, item);
  };

  const textColor = useMemo(() => {
    if (disabled) {
      return colors.secondary.o300;
    }
    if (selected) {
      return colors.primary.o500;
    }
    return colors.secondary.o500;
  }, [selected, disabled]);
  return (
    <TouchableOpacity disabled={disabled} onPress={onPressChange}>
      <View style={[style.row, selected && style.selected]}>
        <View style={style.icon}>
          <Image
            source={selected ? ic_gift : ic_gift_grey}
            style={[disabled && style.disabled]}
          />
        </View>
        <Typography
          style={[style.text]}
          numberOfLines={1}
          textType="medium"
          color={textColor}
          text={item.getTitle()}
        />
        <CTRadio selected={selected} />
      </View>
    </TouchableOpacity>
  );
};
export default GiftProgramItemView;
