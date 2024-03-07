import {Typography} from 'common-ui';
import {AccountJobEntity} from 'modules/personalize/models';
import React from 'react';
import {View} from 'react-native';
import style from './style';
import {StringUtils} from 'common';

interface Props {
  accountJob: AccountJobEntity;
}

const AccountJobView: React.FC<Props> = ({accountJob}) => {
  return (
    <View style={style.container}>
      <View style={style.row}>
        <Typography
          style={style.title}
          type="h3"
          textType="regular"
          color="#8F9096"
          text="Phòng ban"
        />
        <Typography
          style={style.value}
          type="h3"
          textType="medium"
          text={StringUtils.format(': {0}', accountJob.getDepartment())}
        />
      </View>
      <View style={[style.row, style.marginTop]}>
        <Typography
          style={style.title}
          type="h3"
          textType="regular"
          color="#8F9096"
          text="Vị trí"
        />
        <Typography
          style={style.value}
          type="h3"
          textType="medium"
          text={StringUtils.format(': {0}', accountJob.getPosition())}
        />
      </View>
    </View>
  );
};

export default AccountJobView;
