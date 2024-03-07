import React from 'react';
import {View} from 'react-native';
import style from './style';
import {Typography} from 'common-ui';
import {colors} from 'assets/v2';

const TagNewView: React.FC = () => {
  return (
    <View style={style.container}>
      <View style={style.tag}>
        <Typography
          text="Mới"
          textType="medium"
          color={colors.warning.o500}
          type="h5"
        />
      </View>
    </View>
  );
};

export default TagNewView;
