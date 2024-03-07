import {Typography} from 'common-ui';
import React from 'react';
import {View, Image} from 'react-native';
import style from './style';
import {ic_top_award} from 'assets/images';
import {colors} from 'assets/v2';
import {AwardEntity} from 'modules/performance/models/entities';

interface Props {
  item: AwardEntity;
}

const AwardItemView: React.FC<Props> = ({item}) => {
  return (
    <View style={style.container}>
      <Image source={ic_top_award} />
      <View style={style.right}>
        <View style={style.header}>
          <Typography
            type="h3"
            numberOfLines={2}
            text={item.getSubTitle()}
            color={colors.secondary.o900}
          />
        </View>
        <Typography
          color={colors.primary.o500}
          style={style.txt}
          ellipsizeMode="tail"
          numberOfLines={2}
          text={item.getTitle()}
        />
      </View>
    </View>
  );
};

export default AwardItemView;
