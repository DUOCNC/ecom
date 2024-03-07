import {Colors} from 'assets/colors';
import {DimentionUtils, Typography} from 'common-ui';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AssignEnum} from './assignEnum';
import {colors} from 'assets/v2';

interface Props {
  assign: AssignEnum;
  onPress: (key: AssignEnum) => void;
}
const AssignTabView: React.FC<Props> = ({assign, onPress}) => {
  return (
    <View style={style.container}>
      <View style={style.row}>
        <TouchableOpacity
          style={[
            style.option,
            assign !== AssignEnum.mySelf && style.optionTransparent,
          ]}
          onPress={() => {
            onPress(AssignEnum.mySelf);
          }}>
          <Typography
            type="h4"
            textType="medium"
            color={
              assign === AssignEnum.mySelf
                ? colors.base.white
                : colors.primary.o500
            }
            text="Đơn của bạn"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.option,
            assign !== AssignEnum.assignToMe && style.optionTransparent,
          ]}
          onPress={() => {
            onPress(AssignEnum.assignToMe);
          }}>
          <Typography
            type="h4"
            textType="medium"
            color={
              assign === AssignEnum.assignToMe
                ? Colors.White
                : colors.primary.o500
            }
            text="Đơn bạn duyệt"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {},
  row: {
    marginTop: DimentionUtils.scale(10),
    flexDirection: 'row',
    backgroundColor: Colors.Gray200,
    borderRadius: DimentionUtils.scale(8),
  },
  text: {},
  option: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.Primary,
    paddingBottom: DimentionUtils.scale(8),
    paddingTop: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(8),
    color: Colors.White,
  },
  optionTransparent: {
    backgroundColor: 'transparent',
  },
});
export default AssignTabView;
