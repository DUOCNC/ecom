import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: DimentionUtils.scale(1),
  },
  header: {
    padding: DimentionUtils.scale(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.secondary.o200,
    borderBottomWidth: DimentionUtils.scale(1),
  },
  body: {
    paddingTop: DimentionUtils.scale(20),
    paddingHorizontal: DimentionUtils.scale(16),
  },
  icClose: {
    position: 'absolute',
    left: DimentionUtils.scale(16),
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  iconClose: {
    width: DimentionUtils.scale(13),
    height: DimentionUtils.scale(13),
  },
  contact: {
    position: 'absolute',
    right: DimentionUtils.scale(16),
  },
  contactText: {
    color: Colors.Primary,
  },
  contactDisable: {
    color: Colors.Gray400,
  },
  itemDetail: {
    flex: 1,
    height: DimentionUtils.scale(40),
    justifyContent: 'space-between',
    paddingHorizontal: DimentionUtils.scale(24),
  },
  line: {
    marginVertical: DimentionUtils.scale(16),
  },
});

const quizItemStyle = StyleSheet.create({
  container: {
    borderRadius: DimentionUtils.scale(12),
    backgroundColor: colors.base.white,
    padding: DimentionUtils.scale(12),
  },
  row: {
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(2),
  },
  row1: {justifyContent: 'space-between', alignItems: 'center'},
  text: {},
  value: {
    marginLeft: DimentionUtils.scale(4),
  },
  content: {
    marginTop: DimentionUtils.scale(8),
    marginLeft: DimentionUtils.scale(20),
  },
  extend: {
    alignContent: 'center',
    alignItems: 'center',
  },
  extendRow: {marginVertical: DimentionUtils.scale(4), flexDirection: 'row'},
});

export {style, quizItemStyle};
