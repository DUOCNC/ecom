import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    paddingHorizontal: DimentionUtils.scale(16),
  },
  header: {
    paddingTop: DimentionUtils.scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtTitle: {
    marginLeft: DimentionUtils.scale(8),
    flex: 1,
  },
  content: {
    marginTop: DimentionUtils.scale(8),
  },
  pStyle: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: DimentionUtils.scale(14),
    padding: 0,
    margin: 0,
    lineHeight: DimentionUtils.scale(18),
  },
  body: {
    fontSize: DimentionUtils.scaleFont(14),
    paddingLeft: DimentionUtils.scale(32),
    paddingRight: DimentionUtils.scale(16),
    color: colors.secondary.o900,
  },
});

export default style;
