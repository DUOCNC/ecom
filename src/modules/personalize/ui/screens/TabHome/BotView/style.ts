import {Colors} from 'assets/colors';
import {colors} from 'assets/v2';
import {DimentionUtils} from 'common-ui';
import {StyleSheet} from 'react-native';
import {normalize} from 'utils/DimensionsUtils';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Transparent,
  },
  btTop: {
    width: '100%',
  },
  body: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  view: {
    marginHorizontal: DimentionUtils.scale(16),
    marginBottom: DimentionUtils.scale(16),
  },
  scroll: {
    flex: 1,
  },
  first: {
    marginTop: DimentionUtils.scale(8),
  },
  messageConfirm: {
    paddingHorizontal: normalize(16),
    textAlign: 'center',
  },
  viewBot: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  bot: {
    flexDirection: 'row-reverse',
  },
  botPopup: {
    borderTopStartRadius: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(8),
    backgroundColor: colors.base.white,
    marginTop: DimentionUtils.scale(60),
    height: '70%',
  },
  botViewArrow: {
    flexDirection: 'row-reverse',
    height: DimentionUtils.scale(20),
  },
  botArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.base.white,
    marginRight: DimentionUtils.scale(20),
  },
  botHeader: {
    height: DimentionUtils.scale(62),
  },
  botHeaderContent: {
    marginVertical: DimentionUtils.scale(8),
    marginHorizontal: DimentionUtils.scale(8),
    height: DimentionUtils.scale(46),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  botIconHeader: {
    height: DimentionUtils.scale(30),
    width: DimentionUtils.scale(24),
  },
  botTextHeader: {
    marginLeft: DimentionUtils.scale(12),
  },
  botContent: {
    paddingHorizontal: DimentionUtils.scale(8),
    marginTop: DimentionUtils.scale(8),
  },
  botTaskWorkNow: {
    marginTop: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(22),
    paddingVertical: DimentionUtils.scale(4),
    paddingHorizontal: DimentionUtils.scale(15),
    backgroundColor: colors.primary.o700,
    width: DimentionUtils.scale(96),
    flexDirection: 'row',
    alignItems: 'center',
  },
  botBtnTraining: {width: DimentionUtils.scale(116)},
  botClose: {
    marginTop: DimentionUtils.scale(8),
    borderRadius: DimentionUtils.scale(22),
    paddingVertical: DimentionUtils.scale(4),
    paddingHorizontal: DimentionUtils.scale(15),
    backgroundColor: colors.primary.o700,
    width: DimentionUtils.scale(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {flexDirection: 'row'},
  countdown: {
    marginRight: DimentionUtils.scale(4),
  },
  content: {
    marginBottom: DimentionUtils.scale(20),
  },
});

export {style};
