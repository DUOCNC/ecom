import Typography from '../../Typography';
import React from 'react';
import {View} from 'react-native';
import ScreenHeader from '../ScreenHeader';
import style from './style';
import {ScreenHeaderBackProps} from 'common-ui/types';

const ScreenHeaderAction: React.FC<ScreenHeaderBackProps> = ({
  title,
  right,
  children,
  error,
}) => {
  return (
    <ScreenHeader>
      <View style={style.container}>
        <View style={style.containerLeft} />
        <View style={style.containerCenter}>
          <Typography type="h3" textType="medium" text={title} />
        </View>
        <View style={style.containerRight}>{right}</View>
      </View>
      {!error && children}
    </ScreenHeader>
  );
};

export default ScreenHeaderAction;
