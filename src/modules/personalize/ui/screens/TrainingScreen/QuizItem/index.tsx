import {colors} from 'assets/v2';
import {DimentionUtils, Typography} from 'common-ui';
import {TaskEntity} from 'modules/personalize/models/entities';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import QuizStatusView from '../QuizStatusView';

interface Props {
  task: TaskEntity;
  onPress?: (task: TaskEntity) => void;
}
const QuizItem: React.FC<Props> = ({task, onPress}) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={quizItemStyle.container}
      onPress={() => {
        onPress && onPress(task);
      }}>
      <View style={[quizItemStyle.row, quizItemStyle.row1]}>
        <View style={quizItemStyle.row}>
          <Typography
            text="Hạn cuối:"
            color={colors.secondary.o500}
            type="h5"
          />
          <Typography
            text={task.getDueDateDis()}
            color={colors.secondary.o500}
            style={quizItemStyle.value}
            type="h5"
          />
        </View>
        {/* status */}
        <QuizStatusView status={task.getStatusValue()} />
      </View>
      <View style={[quizItemStyle.row, quizItemStyle.row1]}>
        <Typography
          text={task.getTitle()}
          type="h4"
          textType="medium"
          lineBreakMode="clip"
          numberOfLines={2}
          lineHeight={22}
        />
      </View>
      <View style={[quizItemStyle.row, quizItemStyle.row1]}>
        <View style={quizItemStyle.row}>
          <Typography
            text="Thời gian hoàn thành:"
            color={colors.secondary.o500}
            type="h5"
          />
          <Typography
            text={task.getTaskResultEntity()?.getFinishAt()}
            color={colors.secondary.o500}
            style={quizItemStyle.value}
            type="h5"
          />
        </View>
      </View>
      <View style={[quizItemStyle.row, quizItemStyle.row1]}>
        <View style={quizItemStyle.row}>
          <Typography text="Điểm:" color={colors.secondary.o500} type="h5" />
          <Typography
            text={task.getTaskResultEntity()?.getRatio()}
            color={colors.secondary.o500}
            style={quizItemStyle.value}
            type="h5"
          />
        </View>
      </View>
      <View style={[quizItemStyle.row, quizItemStyle.row1]}>
        <View style={quizItemStyle.row}>
          <Typography
            text="Số lần làm bài: "
            color={colors.secondary.o500}
            type="h5"
          />
          <Typography
            text={task.getNumberOfTimesTested()}
            color={colors.secondary.o500}
            style={quizItemStyle.value}
            type="h5"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const quizItemStyle = StyleSheet.create({
  container: {
    borderRadius: DimentionUtils.scale(12),
    backgroundColor: colors.base.white,
    padding: DimentionUtils.scale(12),
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: DimentionUtils.scale(2),
  },
  row1: {justifyContent: 'space-between', alignItems: 'center'},
  text: {},
  value: {
    marginLeft: DimentionUtils.scale(4),
  },
});
export default QuizItem;
