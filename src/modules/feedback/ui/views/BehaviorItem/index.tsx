import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {ic_tick} from 'assets/images';
import {
  BehaviorEntity,
  KeyBehaviorEntity,
  KeyBehaviorRequest,
} from 'modules/feedback/models/entities/BehaviorEntity';
import CountView from '../CountView';

interface BehaviorItemProps {
  answer: BehaviorEntity;
  selected: boolean;
  onCheckedChange: (value: BehaviorEntity) => void;
  totalNumberPerson: number;
  valuePerson: KeyBehaviorRequest | undefined;
  handleSetValuePersonByKeyBehaviorId: (
    data: KeyBehaviorRequest,
    value: number,
  ) => void;
}

const BehaviorItemView: React.FC<BehaviorItemProps> = (
  props: BehaviorItemProps,
) => {
  const {
    answer,
    selected,
    onCheckedChange,
    totalNumberPerson,
    valuePerson,
    handleSetValuePersonByKeyBehaviorId,
  } = props;

  const onPressChange = () => {
    onCheckedChange(answer);
  };

  const onKeyboardPress = (number: number) => {
    valuePerson && handleSetValuePersonByKeyBehaviorId(valuePerson, number);
  };

  return (
    <TouchableOpacity>
      <View style={[style.item, selected && style.selected]}>
        <TouchableOpacity onPress={onPressChange} style={style.itemText}>
          <Typography
            style={style.text}
            lineHeight={24}
            numberOfLines={1}
            text={answer.getValue()}
          />
        </TouchableOpacity>
        {selected && <Image source={ic_tick} />}
      </View>
    </TouchableOpacity>
  );
};

export default BehaviorItemView;
