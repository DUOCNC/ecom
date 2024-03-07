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
  },
  content: {
    marginTop: DimentionUtils.scale(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: DimentionUtils.scale(36),
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
  image: {
    width: DimentionUtils.scale(24),
    height: DimentionUtils.scale(24),
  },
  btnImage: {
    paddingTop: DimentionUtils.scale(4),
    paddingRight: DimentionUtils.scale(8),
  },
});

export default style;
