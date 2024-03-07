import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingTop: DimentionUtils.scale(16),
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
    flex: 1,
  },
  actionItem: {
    borderBottomWidth: 1,
    borderColor: colors.secondary.o200,
    flexDirection: 'row',
    paddingVertical: DimentionUtils.scale(12),
    paddingLeft: DimentionUtils.scale(24),
  },
  iconAction: {
    marginRight: DimentionUtils.scale(8),
  },
  text: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default style;
