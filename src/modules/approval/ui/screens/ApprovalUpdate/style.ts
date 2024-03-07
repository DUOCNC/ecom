import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {Dimensions, StyleSheet} from 'react-native';

const WIDTH = Dimensions.get('screen').width;

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {flex: 1, padding: DimentionUtils.scale(16)},
  btnUpdate: {
    width: DimentionUtils.scale(56),
    height: DimentionUtils.scale(30),
  },
  row: {
    flexDirection: 'row',
    marginTop: DimentionUtils.scale(8),
    alignItems: 'center',
    width: '100%',
  },
  label: {
    width: DimentionUtils.scale(100),
  },
  value: {
    flex: 1,
  },
  mt20: {
    marginTop: DimentionUtils.scale(20),
  },
  desc: {
    width: WIDTH - DimentionUtils.scale(32),
    paddingHorizontal: DimentionUtils.scale(8),
    marginRight: DimentionUtils.scale(4),
  },
  viewBottom: {
    paddingHorizontal: DimentionUtils.scale(16),
    paddingVertical: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(22),
  },
  noteInput: {
    height: DimentionUtils.scale(80),
    borderRadius: DimentionUtils.scale(5),
    borderWidth: DimentionUtils.scale(1),
    borderColor: colors.secondary.o200,
    paddingHorizontal: DimentionUtils.scale(12),
    paddingVertical: DimentionUtils.scale(10),
    width: '100%',
  },
});
