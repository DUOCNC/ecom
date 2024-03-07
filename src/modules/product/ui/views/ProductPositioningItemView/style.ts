import {StyleSheet} from 'react-native';
import {DimentionUtils} from 'common-ui';
import {colors} from 'assets/v2';
import {normalize} from 'utils/DimensionsUtils';
import {Colors} from 'assets/colors';

const style = StyleSheet.create({
  container: {
    padding: DimentionUtils.scale(16),
    flexDirection: 'row',
    flex: 1,
  },
  containerImage: {
    width: DimentionUtils.scale(80),
    height: DimentionUtils.scale(100),
    marginRight: DimentionUtils.scale(12),
  },
  image: {
    flex: 1,
    borderRadius: DimentionUtils.scale(5),
  },
  containerInfo: {
    flex: 1,
  },
  txt: {
    width: '100%',
  },
  marginTop: {
    marginTop: DimentionUtils.scale(4),
  },
  row: {
    flexDirection: 'row',
  },
  borderRight: {
    paddingRight: DimentionUtils.scale(4),
    marginRight: DimentionUtils.scale(4),
    borderRightWidth: DimentionUtils.scale(1),
    borderRightColor: colors.secondary.o500,
    lineHeight: DimentionUtils.scale(8),
  },
  containerCount: {
    height: normalize(48),
    backgroundColor: Colors.Transparent,
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: normalize(100),
  },
  btn: {
    width: normalize(24),
    height: normalize(24),
    borderWidth: normalize(1),
    borderColor: Colors.Gray200,
    borderRadius: normalize(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    flex: 1,
    paddingHorizontal: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icBtn: {
    width: normalize(14),
  },
  iconDisable: {
    tintColor: Colors.Gray200,
  },
  checkBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default style;
