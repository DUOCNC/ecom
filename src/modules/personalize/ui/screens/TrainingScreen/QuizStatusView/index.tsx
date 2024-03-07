import {colors} from 'assets/v2';
import {DimentionUtils, Typography} from 'common-ui';
import {QuizStatus} from 'modules/personalize/enums';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  status: string;
}
const QuizStatusView: React.FC<Props> = ({status}) => {
  if (QuizStatus.Unfinished === status) {
    return (
      <View style={[style.container, style.unfinished]}>
        <Typography
          text="Chưa hoàn thành"
          type="h5"
          color={colors.warning.o500}
        />
      </View>
    );
  }
  if (QuizStatus.Expire === status) {
    return (
      <View style={[style.container, style.expire]}>
        <Typography text="Hết hạn" type="h5" color={colors.error.o500} />
      </View>
    );
  }
  if (QuizStatus.Finished === status) {
    return (
      <View style={[style.container, style.finish]}>
        <Typography text="Hoàn thành" type="h5" color={colors.success.o500} />
      </View>
    );
  }
  return <View />;
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1,
    height: DimentionUtils.scale(20),
    paddingHorizontal: DimentionUtils.scale(12),
  },
  unfinished: {
    backgroundColor: colors.warning.o50,
    borderColor: colors.warning.o200,
  },
  expire: {
    backgroundColor: colors.error.o50,
    borderColor: colors.error.o200,
  },
  finish: {
    backgroundColor: colors.success.o50,
    borderColor: colors.success.o200,
  },
  row: {flexDirection: 'row', paddingTop: DimentionUtils.scale(8)},
  text: {},
});
export default QuizStatusView;
