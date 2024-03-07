import {colors} from 'assets/v2';
import {StringUtils} from 'common';
import {DimentionUtils, Typography} from 'common-ui';
import {TaskEntity} from 'modules/personalize/models/entities';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  task: TaskEntity;
}
const UserSelectionView: React.FC<Props> = ({task}) => {
  return (
    <View style={style.container}>
      <Typography
        color={colors.secondary.o600}
        text={StringUtils.format('Đã trả lời: {0}', task.getUserSelected())}
      />
      {/* <View style={style.row}>
        {task.getUserSelections().map((e, index) => (
          <React.Fragment key={index}>
            <Typography
              color={colors.secondary.o600}
              text={StringUtils.format('{0}: {1}', e.title, e.value)}
            />
            {index !== task.getUserSelections().length - 1 && (
              <Typography text=", " style={style.text} />
            )}
          </React.Fragment>
        ))}
      </View> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  row: {flexDirection: 'row', paddingTop: DimentionUtils.scale(8)},
  text: {},
});
export default UserSelectionView;
