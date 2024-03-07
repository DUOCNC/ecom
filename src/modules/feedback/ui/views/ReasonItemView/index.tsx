import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {ic_tick} from 'assets/images';
import {AnswerEntity} from 'modules/feedback/models/entities';

interface ReasonItemProps {
  answer: AnswerEntity;
  selected: boolean;
  onCheckedChange: (value: AnswerEntity) => void;
}

const ReasonItemView: React.FC<ReasonItemProps> = (props: ReasonItemProps) => {
  const {answer, selected, onCheckedChange} = props;

  const onPressChange = () => {
    onCheckedChange(answer);
  };

  return (
    <TouchableOpacity onPress={onPressChange}>
      <View style={[style.item, selected && style.selected]}>
        <Typography
          style={style.text}
          numberOfLines={1}
          text={answer.getValueText()}
        />
        {selected && <Image source={ic_tick} />}
      </View>
    </TouchableOpacity>
  );
};

export default ReasonItemView;
