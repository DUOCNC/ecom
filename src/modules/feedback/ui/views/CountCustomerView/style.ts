import {Colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    paddingVertical: DimentionUtils.scale(24),
    paddingHorizontal: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(12),
    marginBottom: DimentionUtils.scale(30),
  },
  headerLeft: {
    flex: 1,
  },
  textTotal: {
    paddingTop: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: DimentionUtils.scale(16),
    paddingTop: DimentionUtils.scale(3),
  },
  description: {
    marginTop: DimentionUtils.scale(8),
  },
  icGrow: {
    width: DimentionUtils.scale(12),
    marginRight: DimentionUtils.scale(5),
    height: DimentionUtils.scale(12),
  },
  text: {
    flex: 1,
  },
  count: {
    flex: 1,
  },
  buttonSubmit: {
    marginTop: DimentionUtils.scale(16),
    borderRadius: DimentionUtils.scale(8),
  },
  box: {
    borderRadius: DimentionUtils.scale(12),
  },
  view: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(16),
  },
});

export default style;
